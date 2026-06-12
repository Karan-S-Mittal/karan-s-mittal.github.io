#!/usr/bin/env node
/**
 * sync-tags.js
 * Scans all content files for frontmatter tags and writes src/data/autoTags.json.
 * Preserves manually added aliases on re-runs.
 */

import { readFile, writeFile, access } from 'fs/promises';
import fg from 'fast-glob';
const { glob } = fg;
import matter from 'gray-matter';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTFILE = join(ROOT, 'src', 'data', 'autoTags.json');

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function slugify(tag) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
  // 1. Load existing dictionary to preserve aliases
  let existing = [];
  if (await fileExists(OUTFILE)) {
    const raw = await readFile(OUTFILE, 'utf-8');
    existing = JSON.parse(raw);
  }

  const aliasMap = new Map();
  for (const entry of existing) {
    aliasMap.set(entry.name.toLowerCase(), entry.aliases || []);
  }

  // 2. Scan all content files for tags
  const files = await glob('src/content/**/*.md', { cwd: ROOT, absolute: true });
  const tagSet = new Set();

  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    const { data } = matter(content);
    if (Array.isArray(data.tags)) {
      data.tags.forEach((t) => tagSet.add(t.trim()));
    }
  }

  // 3. Build new dictionary
  const tags = Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  const dictionary = tags.map((name) => ({
    name,
    slug: slugify(name),
    aliases: aliasMap.get(name.toLowerCase()) || [],
  }));

  // 4. Write output
  await writeFile(OUTFILE, JSON.stringify(dictionary, null, 2) + '\n', 'utf-8');

  console.log(`✓ Synced ${dictionary.length} tag(s) → ${OUTFILE.replace(ROOT + '/', '')}`);
  if (dictionary.length === 0) {
    console.log('  No tags found in content frontmatter yet.');
  }
}

main().catch((err) => {
  console.error('Error syncing tags:', err.message);
  process.exit(1);
});
