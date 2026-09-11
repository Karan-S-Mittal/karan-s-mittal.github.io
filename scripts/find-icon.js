#!/usr/bin/env node
/**
 * scripts/find-icon.js
 * CLI search tool to find vector icons from @lucide/astro and BrandIcon.astro.
 * Supports full run parameters, flags, multi-word queries, and filtering.
 *
 * Usage:
 *   npm run icon <query> [options]
 *   node scripts/find-icon.js <query> [options]
 *
 * Options:
 *   -a, --all        Show all matches without truncating
 *   -n, --limit <n>  Limit number of matches (default: 20)
 *   -b, --brand      Search only BrandIcon.astro brands
 *   -l, --lucide     Search only @lucide/astro icons
 *   -e, --exact      Exact match only
 *   -h, --help       Show help message
 *
 * Examples:
 *   npm run icon terminal
 *   npm run icon git branch
 *   npm run icon code --all
 *   npm run icon docker --brand
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// Parse CLI arguments
const rawArgs = process.argv.slice(2);

let showHelp = false;
let showAll = false;
let brandOnly = false;
let lucideOnly = false;
let exactMatch = false;
let limit = 20;
const queryTerms = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '-h' || arg === '--help') {
    showHelp = true;
  } else if (arg === '-a' || arg === '--all') {
    showAll = true;
  } else if (arg === '-b' || arg === '--brand') {
    brandOnly = true;
  } else if (arg === '-l' || arg === '--lucide') {
    lucideOnly = true;
  } else if (arg === '-e' || arg === '--exact') {
    exactMatch = true;
  } else if (arg === '-n' || arg === '--limit') {
    const nextVal = parseInt(rawArgs[i + 1], 10);
    if (!isNaN(nextVal)) {
      limit = nextVal;
      i++;
    }
  } else if (!arg.startsWith('-')) {
    queryTerms.push(arg);
  }
}

const query = queryTerms.join(' ').trim().toLowerCase();

if (showHelp || (!query && rawArgs.length === 0)) {
  console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║                   Studio Vector Icon Finder                           ║
╚═══════════════════════════════════════════════════════════════════════╝

Usage:
  npm run icon <query> [options]
  node scripts/find-icon.js <query> [options]

Parameters & Options:
  <query>          Search term or keyword (e.g. terminal, git, search)
  -a, --all        Show all results without truncating
  -n, --limit <n>  Set maximum results to display (default: 20)
  -b, --brand      Search only BrandIcon.astro marks
  -l, --lucide     Search only @lucide/astro monoline icons
  -e, --exact      Perform exact keyword match
  -h, --help       Display this help screen

Examples:
  npm run icon terminal
  npm run icon git branch
  npm run icon refresh -n 5
  npm run icon claude --brand
  npm run icon cpu --all
`);
  process.exit(0);
}

if (!query) {
  console.error('\n⚠️  Please provide a search term. Example: npm run icon terminal\n');
  process.exit(1);
}

// 1. Search BrandIcon.astro supported brands (unless --lucide specified)
let brandMatches = [];
if (!lucideOnly) {
  const brandIconPath = path.join(root, 'src/components/diagram/icons/BrandIcon.astro');
  if (fs.existsSync(brandIconPath)) {
    const content = fs.readFileSync(brandIconPath, 'utf-8');
    const brandListMatch = content.match(/interface Props \{[\s\S]*?name:\s*([\s\S]*?);/);
    if (brandListMatch) {
      const names = brandListMatch[1]
        .split('|')
        .map((s) => s.trim().replace(/['"]/g, ''))
        .filter(Boolean);

      brandMatches = names.filter((name) => {
        const lower = name.toLowerCase();
        if (exactMatch) return lower === query;
        // All query tokens must be found or single multi-word substring
        const words = query.split(/\s+/);
        return words.every((w) => lower.includes(w));
      });
    }
  }
}

// 2. Search Lucide icons (unless --brand specified)
let lucideMatches = [];
if (!brandOnly) {
  const lucideIndexPath = path.join(root, 'node_modules/@lucide/astro/src/icons/index.ts');
  if (fs.existsSync(lucideIndexPath)) {
    const content = fs.readFileSync(lucideIndexPath, 'utf-8');
    const regex = /export \{ default as ([A-Za-z0-9]+) \} from '\.\/([^']+)';/g;
    let match;
    const words = query.split(/\s+/);

    while ((match = regex.exec(content)) !== null) {
      const componentName = match[1];
      const kebabName = match[2];
      const compLower = componentName.toLowerCase();
      const kebabLower = kebabName.toLowerCase();

      let isMatch = false;
      if (exactMatch) {
        isMatch = compLower === query || kebabLower === query;
      } else {
        isMatch = words.every((w) => compLower.includes(w) || kebabLower.includes(w));
      }

      if (isMatch) {
        lucideMatches.push({ componentName, kebabName });
      }
    }
  }
}

// Print results
console.log(`\n🔍 Search results for: "${query}"\n`);

if (brandMatches.length > 0) {
  console.log(`📌 BrandIcon.astro (${brandMatches.length} match${brandMatches.length > 1 ? 'es' : ''}):`);
  brandMatches.forEach((name) => {
    console.log(`   <BrandIcon name="${name}" size={16} />`);
  });
  console.log('');
}

if (lucideMatches.length > 0) {
  const displayCount = showAll ? lucideMatches.length : Math.min(limit, lucideMatches.length);
  console.log(
    `⚡ @lucide/astro (${lucideMatches.length} match${lucideMatches.length > 1 ? 'es' : ''}${
      !showAll && lucideMatches.length > limit ? `, showing top ${displayCount}` : ''
    }):`
  );

  lucideMatches.slice(0, displayCount).forEach(({ componentName }) => {
    console.log(`   import { ${componentName} } from '@lucide/astro';`);
    console.log(`   <${componentName} size={16} stroke-width={1.5} />`);
  });

  if (!showAll && lucideMatches.length > displayCount) {
    console.log(`   ...and ${lucideMatches.length - displayCount} more matches. Use --all to see all.`);
  }
  console.log('');
}

if (brandMatches.length === 0 && lucideMatches.length === 0) {
  console.log(`❌ No direct matches found for "${query}".`);
  console.log(`Browse online directories:`);
  console.log(`  • Lucide Icons: https://lucide.dev/icons?search=${encodeURIComponent(query)}`);
  console.log(`  • Simple Icons: https://simpleicons.org/?q=${encodeURIComponent(query)}\n`);
}
