#!/usr/bin/env node
/**
 * new-post.js
 * Interactive script to scaffold a new blog post and open it in VS Code.
 */

import { createInterface } from 'readline';
import { writeFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function kebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function today() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log('📝 Create a new blog post\n');

  const title = await ask('Title: ');
  if (!title) {
    console.error('❌ Title is required.');
    rl.close();
    process.exit(1);
  }

  const description = await ask('Description: ');
  const tagsInput = await ask('Tags (comma-separated): ');
  const tags = tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const slug = kebabCase(title);
  const filePath = join(BLOG_DIR, `${slug}.md`);

  if (await fileExists(filePath)) {
    console.error(`❌ File already exists: ${filePath}`);
    rl.close();
    process.exit(1);
  }

  const tagsLine = tags.length > 0
    ? `tags: [${tags.map((t) => `"${t}"`).join(', ')}]`
    : 'tags: []';

  const content = `---
title: "${title}"
description: "${description}"
pubDate: ${today()}
${tagsLine}
draft: true
---

Write your post here.
`;

  await writeFile(filePath, content, 'utf-8');
  console.log(`✓ Created ${filePath.replace(ROOT + '/', '')}`);

  rl.close();

  // Open in VS Code
  console.log('Opening in VS Code...');
  const child = spawn('code', [filePath], {
    stdio: 'inherit',
    detached: true,
  });

  child.on('error', (err) => {
    console.error(`Could not open VS Code: ${err.message}`);
    console.log(`File is ready at: ${filePath}`);
  });
}

main().catch((err) => {
  console.error('Error:', err.message);
  rl.close();
  process.exit(1);
});
