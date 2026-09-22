#!/usr/bin/env node
/**
 * scripts/capture-social.js
 * Generates OpenGraph / social preview images (1200x630) for diagrams and flagship essays.
 * Uses headless Chromium over the built `dist/` directory.
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const outDir = path.join(root, 'public', 'social');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const targets = [
  {
    slug: 'semiconductor-traceability',
    url: '/diagrams/semiconductor-traceability/',
    selector: '.visual-sheet',
    filename: 'semiconductor-traceability.png',
  },
  {
    slug: 'developer-platform-stack',
    url: '/diagrams/developer-platform-stack/',
    selector: '.visual-sheet',
    filename: 'developer-platform-stack.png',
  },
  {
    slug: 'code-review-topologies',
    url: '/diagrams/code-review-topologies/',
    selector: '.visual-sheet',
    filename: 'code-review-topologies.png',
  },
  {
    slug: 'version-control-stack',
    url: '/writing/version-control-stack/',
    selector: '.figure-sheet',
    filename: 'version-control-stack.png',
  },
];

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 4398;

server.listen(PORT, async () => {
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    for (const target of targets) {
      const targetUrl = `http://localhost:${PORT}${target.url}`;
      console.log(`Navigating to ${targetUrl}...`);
      await page.goto(targetUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);

      const targetPath = path.join(outDir, target.filename);
      const el = await page.$(target.selector);

      if (el) {
        await el.screenshot({ path: targetPath });
        console.log(`✓ Saved social card: ${target.filename}`);
      } else {
        await page.screenshot({ path: targetPath, clip: { x: 0, y: 0, width: 1200, height: 630 } });
        console.log(`✓ Saved page social card: ${target.filename}`);
      }
    }

    await browser.close();
  } catch (err) {
    console.error('Error generating social images:', err);
  } finally {
    server.close();
  }
});
