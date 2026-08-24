#!/usr/bin/env node
/**
 * new-post.js
 * Scaffolds a new studio-grade MDX blog post from src/content/blog/_template.mdx.
 *
 * Usage:
 *   npm run new
 *   node scripts/new-post.js --dry-run "My Title" -d "Description" --tags "AI, Systems"
 *   node scripts/new-post.js --no-open "My Title"
 */

import { createInterface } from 'node:readline';
import { readFile, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const TEMPLATE_PATH = join(BLOG_DIR, '_template.mdx');

function parseArgs(args) {
  const flags = {
    dryRun: false,
    noOpen: false,
    title: '',
    description: '',
    tags: [],
  };

  const positional = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--dry-run') {
      flags.dryRun = true;
    } else if (arg === '--no-open') {
      flags.noOpen = true;
    } else if (arg === '-t' || arg === '--title') {
      flags.title = args[++i] || '';
    } else if (arg === '-d' || arg === '--desc' || arg === '--description') {
      flags.description = args[++i] || '';
    } else if (arg === '--tags') {
      const tagStr = args[++i] || '';
      flags.tags = tagStr.split(',').map((s) => s.trim()).filter(Boolean);
    } else if (!arg.startsWith('-')) {
      positional.push(arg);
    }
  }

  if (!flags.title && positional.length > 0) {
    flags.title = positional.join(' ');
  }

  return flags;
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

async function promptUser(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const flags = parseArgs(args);

  let title = flags.title;
  let description = flags.description;
  let tags = flags.tags;

  const isInteractive = !title && process.stdin.isTTY;

  if (isInteractive) {
    console.log('📝 Create a new Explanatory Studio post\n');
    title = await promptUser('Title: ');
    if (!title) {
      console.error('❌ Title is required.');
      process.exit(1);
    }
    description = await promptUser('Description: ');
    const tagsInput = await promptUser('Tags (comma-separated): ');
    tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
  } else if (!title) {
    console.error('❌ Title is required. Pass a title argument or run interactively in a TTY.');
    process.exit(1);
  }

  const slug = kebabCase(title);
  if (!slug) {
    console.error('❌ Could not generate a valid URL slug from title.');
    process.exit(1);
  }

  const mdPath = join(BLOG_DIR, `${slug}.md`);
  const mdxPath = join(BLOG_DIR, `${slug}.mdx`);

  // Check collision against both .md and .mdx files
  if (await fileExists(mdPath)) {
    console.error(`❌ Collision detected: Markdown file already exists: ${mdPath}`);
    process.exit(1);
  }
  if (await fileExists(mdxPath)) {
    console.error(`❌ Collision detected: MDX file already exists: ${mdxPath}`);
    process.exit(1);
  }

  const templateContent = await readFile(TEMPLATE_PATH, 'utf8');

  // Safe substitution with explicit tokens
  const safeTitle = JSON.stringify(title).slice(1, -1);
  const safeDescription = JSON.stringify(description || `A first-principles breakdown of ${title}.`).slice(1, -1);
  const safeTags = JSON.stringify(tags.length > 0 ? tags : ['Systems Engineering']);
  const pubDate = today();

  const generatedContent = templateContent
    .replace('__TITLE__', safeTitle)
    .replace('__DESCRIPTION__', safeDescription)
    .replace('__PUB_DATE__', pubDate)
    .replace('__TAGS__', safeTags)
    .replace('__DRAFT__', 'true');

  if (flags.dryRun) {
    console.log(`[DRY RUN] Target file: ${mdxPath}`);
    console.log('\n--- GENERATED CONTENT ---\n');
    console.log(generatedContent);
    return;
  }

  await writeFile(mdxPath, generatedContent, 'utf8');
  console.log(`✓ Scaffolded new post: ${mdxPath.replace(ROOT + '/', '')}`);

  if (!flags.noOpen && process.env.TERM_PROGRAM !== 'vscode' && !process.env.CI) {
    const child = spawn('code', [mdxPath], {
      stdio: 'ignore',
      detached: true,
    });
    child.on('error', () => {
      // Ignore if code CLI is not installed or not in PATH
    });
    child.unref();
  }
}

main().catch((err) => {
  console.error('Error creating post:', err);
  process.exit(1);
});
