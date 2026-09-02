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

async function main() {
  const files = await fg(sourcePatterns, {
    cwd: root,
    absolute: true,
    onlyFiles: true,
    ignore: ['src/content/blog/_template.mdx'],
  });

  for (const file of files) {
    const source = await readFile(file, 'utf8');
    findInlineSvgProblems(file, source);
    findLegacyLanguage(file, source);
    findIncompleteExhibits(file, source);
  }

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
