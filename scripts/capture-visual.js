#!/usr/bin/env node
/**
 * scripts/capture-visual.js
 * Headless visual verification tool for studio diagrams.
 * Starts a minimal local HTTP server, loads the specified visual page,
 * and captures high-resolution screenshots in both light and dark modes.
 *
 * Usage:
 *   node scripts/capture-visual.js [slug]
 *   Example: node scripts/capture-visual.js claude-code-loop
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

const slug = process.argv[2] || 'claude-code-loop';
const outDir = path.join(root, 'test-results');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Minimal static HTTP file server for dist
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

const PORT = 4399;

server.listen(PORT, async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
    const targetUrl = `http://localhost:${PORT}/diagrams/${slug}/`;

    await page.goto(targetUrl);
    await page.waitForTimeout(300);

    // Target the primary diagram canvas or diagram export root
    const targetSelector = `[id^="${slug}"], .claude-loop-canvas, .diagram-canvas`;
    const element = (await page.$(targetSelector)) || (await page.$('#main-content'));

    if (element) {
      // 1. Light mode screenshot
      const lightPath = path.join(outDir, `${slug}-light.png`);
      await element.screenshot({ path: lightPath });
      console.log(`✓ Light screenshot saved: ${lightPath}`);

      // 2. Dark mode screenshot
      await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.waitForTimeout(200);
      const darkPath = path.join(outDir, `${slug}-dark.png`);
      await element.screenshot({ path: darkPath });
      console.log(`✓ Dark screenshot saved: ${darkPath}`);
    } else {
      console.error(`❌ Could not locate diagram element on ${targetUrl}`);
    }

    await browser.close();
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    server.close();
  }
});
