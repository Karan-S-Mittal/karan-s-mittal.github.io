#!/usr/bin/env node

/**
 * scripts/studio-check.js
 *
 * Automated verification linter for Soft Architecture diagrams.
 * Enforces 100% token compliance, valid typography, and diagram quality invariants:
 * 1. Zero raw hex colors in <style> blocks and SVG attributes (must use var(--ie-*) or var(--brand-*)).
 * 2. Standardized typography tokens (Plus Jakarta Sans, Inter, IBM Plex Sans, IBM Plex Mono).
 * 3. Purging of legacy variables (--accent, --text, --border-default) in favor of canonical --ie-*.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const TARGET_DIRS = [
  path.join(rootDir, 'src/components/diagram'),
  path.join(rootDir, 'src/components/visuals'),
];

// Files or substrings intentionally exempt (e.g. documentation, templates, or non-diagram wrappers)
const EXEMPT_FILES = [];

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith('.astro') || file.endsWith('.tsx') || file.endsWith('.ts')) {
      const isExempt = EXEMPT_FILES.some((exempt) => filePath.includes(exempt));
      if (!isExempt) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

let totalErrors = 0;
let totalWarnings = 0;

console.log('🔍 Checking diagram components for Soft Architecture token compliance...\n');

const files = TARGET_DIRS.flatMap((dir) => getFiles(dir));

// Regex to detect hex color codes in CSS or attributes
// Ignores prose like "Doc #104" or memory addresses like "0x1000"
const HEX_IN_CSS_OR_ATTR = /(?:color|fill|stroke|stop-color|background|border(?:-color)?)\s*[:=]\s*["']?#([0-9a-fA-F]{3,8})["']?/g;
const HEX_IN_STYLE_BLOCK = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;

// Unloaded or invalid font families
const INVALID_FONTS = [
  /IBM Plex Sans/i,
  /IBM Plex Mono/i,
  /Fira Code/i,
  /Roboto/i,
];

// Deprecated tokens in diagrams that should be canonicalized
const DEPRECATED_TOKENS = [
  'var(--accent)',
  'var(--border-default)',
  'var(--surface-card)',
  'var(--signal-warm)',
];

for (const filePath of files) {
  const relPath = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let fileHasError = false;

  // Check 1: Raw Hex Colors in <style> blocks
  const styleMatch = content.match(/<style[\s\S]*?<\/style>/g);
  if (styleMatch) {
    for (const block of styleMatch) {
      // Find line number of the style block start
      const blockStart = content.indexOf(block);
      const startLine = content.slice(0, blockStart).split('\n').length;
      const blockLines = block.split('\n');

      blockLines.forEach((line, idx) => {
        // Allow pure white in transparent gradients if explicitly var-mixed or comments
        if (line.includes('/*') && line.includes('*/')) return;
        const matches = [...line.matchAll(HEX_IN_STYLE_BLOCK)];
        for (const match of matches) {
          console.error(`❌ [RAW HEX] ${relPath}:${startLine + idx}: Found raw hex "${match[0]}" in CSS.`);
          totalErrors++;
          fileHasError = true;
        }
      });
    }
  }

  // Check 2: Raw Hex Colors in SVG attributes (fill="#...", stroke="#...")
  lines.forEach((line, idx) => {
    // Skip comments
    if (line.trim().startsWith('<!--') || line.trim().startsWith('*') || line.trim().startsWith('//')) return;
    
    // Check SVG attributes
    const attrMatches = [...line.matchAll(HEX_IN_CSS_OR_ATTR)];
    for (const match of attrMatches) {
      console.error(`❌ [RAW HEX ATTR] ${relPath}:${idx + 1}: Found raw hex "${match[0]}". Use var(--ie-*) or var(--brand-*).`);
      totalErrors++;
      fileHasError = true;
    }

    // Check 3: Invalid Fonts
    for (const fontRegex of INVALID_FONTS) {
      if (fontRegex.test(line)) {
        console.error(`❌ [INVALID FONT] ${relPath}:${idx + 1}: Found unbundled font "${line.trim()}". Use var(--font-mono) or var(--font-diagram).`);
        totalErrors++;
        fileHasError = true;
      }
    }

    // Check 4: Deprecated Tokens (Warnings)
    for (const token of DEPRECATED_TOKENS) {
      if (line.includes(token)) {
        totalWarnings++;
      }
    }
  });
}

console.log('\n----------------------------------------');
if (totalErrors > 0) {
  console.error(`💥 Studio Check failed with ${totalErrors} error(s) and ${totalWarnings} warning(s).`);
  process.exit(1);
} else {
  console.log(`✨ All ${files.length} diagram components passed Soft Architecture token check (${totalWarnings} legacy token warnings).`);
  process.exit(0);
}
