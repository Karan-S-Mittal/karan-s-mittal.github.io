#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import fg from 'fast-glob';

const root = resolve(import.meta.dirname, '..');
const sourcePatterns = [
  'src/**/*.astro',
  'src/**/*.css',
  'src/**/*.md',
  'src/**/*.mdx',
  // .tsx both defines (--mafs-bg) and consumes tokens; excluding it would
  // make the undefined-token pass report false positives.
  'src/**/*.tsx',
];

const errors = [];
const warnings = [];

function report(collection, file, message) {
  collection.push(`${relative(root, file)} — ${message}`);
}

function findInlineSvgProblems(file, source) {
  const blocks = source.match(/<svg\b[\s\S]*?<\/svg>/g) || [];

  blocks.forEach((svg, index) => {
    if (/<(?:p|em|strong)\b/i.test(svg)) {
      report(errors, file, `inline SVG ${index + 1} contains prose markup that can corrupt SVG text`);
    }

    if (/<text\b[^>]*>[\s\S]*?_[A-Za-z0-9]/.test(svg)) {
      report(warnings, file, `inline SVG ${index + 1} contains a raw underscore; use Unicode or explicit tspans for subscripts`);
    }
  });
}

function findLegacyLanguage(file, source) {
  const legacyPatterns = [
    { pattern: /Fraunces/g, label: 'Fraunces' },
    { pattern: /#c14a21/gi, label: 'legacy clay accent #c14a21' },
    { pattern: /#faf8f4/gi, label: 'legacy warm-paper background #faf8f4' },
  ];

  legacyPatterns.forEach(({ pattern, label }) => {
    if (pattern.test(source)) {
      report(errors, file, `contains ${label}; the active Instrumented Editorial language uses IBM Plex and semantic tokens`);
    }
  });
}

function findIncompleteExhibits(file, source) {
  if (!/\.(?:md|mdx)$/.test(file)) return;

  const componentPattern = /<(Exhibit|AlgorithmFlow|BenchmarkChart|InteractiveWalkthrough)\b([\s\S]*?)(?:\/>|>)/g;
  let match;

  while ((match = componentPattern.exec(source)) !== null) {
    const [, component, props] = match;
    if (!/\bcaption\s*=/.test(props)) {
      report(warnings, file, `<${component}> is missing a caption that tells the reader what to notice`);
    }
    if (component === 'Exhibit' && !/\btitle\s*=/.test(props)) {
      report(warnings, file, '<Exhibit> is missing a title');
    }
  }
}

/**
 * Diagram components must express every colour as a `var(--ie-*)` token so that
 * light and dark mode both work. Raw hex is how the xgboost family drifted onto
 * the Tailwind default palette and stopped rendering in dark mode.
 */
function findRawHexInDiagrams(file, source) {
  if (!/src\/components\/diagram\//.test(relative(root, file).replace(/\\/g, '/'))) return;

  // Only colour-bearing places count. Prose text nodes legitimately contain
  // things like "Doc #104", and fragment refs like url(#arrow) are not colours.
  const colourAttr = /\b(?:fill|stroke|stop-color|flood-color|lighting-color|color|style)\s*=\s*(["'])([\s\S]*?)\1/g;
  const styleBlock = /<style\b[^>]*>([\s\S]*?)<\/style>/g;

  const haystacks = [];
  for (const m of source.matchAll(colourAttr)) haystacks.push(m[2]);
  for (const m of source.matchAll(styleBlock)) haystacks.push(m[1]);

  const hex = haystacks
    .join('\n')
    .replace(/url\(\s*#[^)]*\)/g, '')
    .match(/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3}(?:[0-9a-fA-F]{2})?)?\b/g);
  if (!hex) return;

  const unique = [...new Set(hex.map((value) => value.toLowerCase()))];
  report(
    errors,
    file,
    `contains ${hex.length} raw hex colour(s) (${unique.slice(0, 6).join(', ')}${unique.length > 6 ? ', …' : ''}); ` +
      'diagram colours must be var(--ie-*) tokens so dark mode works. ' +
      'If no token fits, add one to src/styles/global.css for BOTH light and dark first.',
  );
}

/**
 * A bare var() of an undefined custom property makes the WHOLE declaration
 * invalid, so the style silently does nothing. The d65c1b1 CSS consolidation
 * renamed tokens to --ie-* and left 42 such references behind, which is how
 * `font-size: var(--text-xs)` ended up doing nothing on live pages.
 * Usages that supply a fallback are fine and are not reported.
 */
function findUndefinedTokens(files, sources) {
  const defined = new Set();
  for (const source of sources.values()) {
    for (const match of source.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)) defined.add(match[1]);
  }

  for (const file of files) {
    const source = sources.get(file);
    const seen = new Set();
    for (const match of source.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)\s*(,)?/g)) {
      const [, name, hasFallback] = match;
      if (hasFallback || defined.has(name) || seen.has(name)) continue;
      seen.add(name);

      // `var(--good, var(--dead))` never evaluates the inner one, so the
      // declaration still works. That is stale naming, not a broken style.
      const isFallback = /,\s*$/.test(source.slice(0, match.index));
      if (isFallback) {
        report(warnings, file, `var(${name}) sits in fallback position but ${name} is defined nowhere; dead naming, harmless at runtime`);
      } else {
        report(errors, file, `uses var(${name}) with no fallback, but ${name} is defined nowhere; the whole declaration is dropped`);
      }
    }
  }
}


async function main() {
  const files = await fg(sourcePatterns, {
    cwd: root,
    absolute: true,
    onlyFiles: true,
    ignore: ['src/content/blog/_template.mdx'],
  });

  const sources = new Map();
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    sources.set(file, source);
    findInlineSvgProblems(file, source);
    findLegacyLanguage(file, source);
    findIncompleteExhibits(file, source);
    findRawHexInDiagrams(file, source);
  }

  findUndefinedTokens(files, sources);

  console.log(`Studio preflight scanned ${files.length} source files.`);

  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length})`);
    warnings.forEach((warning) => console.log(`  △ ${warning}`));
  }

  if (errors.length > 0) {
    console.error(`\nBlocking issues (${errors.length})`);
    errors.forEach((error) => console.error(`  ✕ ${error}`));
    process.exit(1);
  }

  console.log('\n✓ Studio preflight passed.');
}

main().catch((error) => {
  console.error('Studio preflight failed:', error);
  process.exit(1);
});
