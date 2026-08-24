import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';
import { createCopyOnWriteRoutes } from '../src/lib/diagram-routing/index.js';

const root = resolve(import.meta.dirname, '..');
const outputDirectory = resolve(root, 'public/generated/exhibits');
const sourceDirectory = resolve(root, 'src/components/paged-attention');

/**
 * Explicit registry of exhibits to guarantee stable output names,
 * prevent accidental collisions, and attach dynamic binding providers.
 */
const exhibitRegistry = [
  {
    id: 'paged-01',
    sourceFile: 'ExcalidrawNaiveVsKVCache.astro',
    outputSlug: 'naive-vs-kv-cache',
  },
  {
    id: 'paged-02',
    sourceFile: 'ExcalidrawKVEvolution.astro',
    outputSlug: 'kv-head-evolution',
  },
  {
    id: 'paged-03',
    sourceFile: 'ExcalidrawMemoryFragmentation.astro',
    outputSlug: 'memory-fragmentation',
  },
  {
    id: 'paged-04',
    sourceFile: 'ExcalidrawPagedSteps.astro',
    outputSlug: 'paged-attention-model',
  },
  {
    id: 'paged-05',
    sourceFile: 'ExcalidrawCopyOnWrite.astro',
    outputSlug: 'copy-on-write',
    bindings: () => createCopyOnWriteRoutes(),
  },
];

/**
 * Soft Architecture raster palette (spec §3) — light only.
 * Darkness is semantic (code, conclusion planes); exhibits are always light.
 * Values mirror the token remaps in public/styles/global.css (--ex-* block).
 */
const theme = {
  canvas: '#f8f9fc',    // page surface (--neutral-050)
  card: '#ffffff',      // node surface (--neutral-000)
  mutedCard: '#eef1f6', // secondary plane
  ink: '#1a1a2e',       // structure & text (--ink-900)
  muted: '#68768b',     // annotations
  border: '#aab4c4',    // visible hairline on white
  signal: '#2676aa',    // primary blue (--blue-500)
  signalText: '#246fa0',// interactive text (--blue-600)
  signalBg: '#dceeff',  // subtle blue fill (--blue-100)
  lavender: '#cdb4db',  // async/inferred edges (--lavender-400)
};

function svgStyles(theme) {
  return `
    .node { fill: ${theme.card}; stroke: ${theme.ink}; stroke-width: 1.8; }
    .node-muted { fill: ${theme.mutedCard}; stroke: ${theme.border}; stroke-width: 1.6; }
    .node-signal { fill: ${theme.signalBg}; stroke: ${theme.signal}; stroke-width: 1.8; }
    .rule { stroke: ${theme.border}; stroke-width: 1.2; }
    .flow { fill: none; stroke: ${theme.ink}; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .flow-signal { fill: none; stroke: ${theme.signal}; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .flow-dashed { fill: none; stroke: ${theme.lavender}; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 4 4; }
    .label { fill: ${theme.muted}; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; letter-spacing: .06em; }
    .label-signal { fill: ${theme.signalText}; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; font-weight: 600; letter-spacing: .06em; }
    .title { fill: ${theme.ink}; font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 600; }
    .body { fill: ${theme.ink}; font-family: 'Inter', sans-serif; font-size: 14px; }
    .body-muted { fill: ${theme.muted}; font-family: 'Inter', sans-serif; font-size: 14px; }
  `.replace(/\s+/g, ' ');
}

function sourceSvg(component, theme, bindings) {
  const match = component.match(/<svg\b[\s\S]*?<\/svg>/);
  if (!match) throw new Error('No SVG source found in exhibit component.');

  const palette = {
    '--ex-bg': theme.canvas,
    '--ex-card-bg': theme.card,
    '--ex-gray-bg': theme.mutedCard,
    '--ex-text-main': theme.ink,
    '--ex-text-muted': theme.muted,
    '--ex-border': theme.border,
    '--ex-blue-stroke': theme.signal,
    '--ex-blue-text': theme.signalText,
    '--ex-blue-bg': theme.signalBg,
  };

  let svg = match[0]
    .replace(' id="ex-paged-steps-svg"', '')
    .replace(/(<svg\b[^>]*>)/, `$1<style>${svgStyles(theme)}</style>`);

  // Generic dynamic path bindings expansion
  if (typeof bindings === 'function') {
    const evaluatedBindings = bindings();
    for (const [name, path] of Object.entries(evaluatedBindings)) {
      svg = svg.replaceAll(`d={${name}}`, `d="${path}"`);
    }
  }

  for (const [token, color] of Object.entries(palette)) {
    svg = svg.replaceAll(`var(${token})`, color);
  }

  return svg;
}

async function main() {
  if (!Array.isArray(exhibitRegistry) || exhibitRegistry.length === 0) {
    throw new Error('Assertion Error: Exhibit registry is empty.');
  }

  await mkdir(outputDirectory, { recursive: true });

  const generatedOutputs = [];

  for (const item of exhibitRegistry) {
    const { sourceFile, outputSlug, bindings } = item;
    if (!outputSlug) {
      throw new Error(`Assertion Error: Missing outputSlug for ${sourceFile}`);
    }

    const sourcePath = resolve(sourceDirectory, sourceFile);
    const component = await readFile(sourcePath, 'utf8');

    const outputPath = resolve(outputDirectory, `${outputSlug}.webp`);
    const svgBuffer = Buffer.from(sourceSvg(component, theme, bindings));

    await sharp(svgBuffer, { density: 288 })
      .resize({ width: 2400 })
      .flatten({ background: theme.canvas })
      .webp({ quality: 90, effort: 5 })
      .toFile(outputPath);

    // Verify file was written and is non-empty
    const fileStat = await stat(outputPath);
    if (fileStat.size === 0) {
      throw new Error(`Assertion Error: Rendered empty file for ${outputPath}`);
    }
    generatedOutputs.push(outputPath);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    format: 'webp',
    width: 2400,
    exhibits: exhibitRegistry.map((item) => item.outputSlug),
  };

  await writeFile(resolve(outputDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`✓ Rendered & verified ${exhibitRegistry.length} SVG exhibits (${generatedOutputs.length} WebP files).`);
}

main().catch((err) => {
  console.error('Error rendering exhibits:', err);
  process.exit(1);
});
