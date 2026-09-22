#!/usr/bin/env node
/**
 * scripts/capture-page.js
 * Headless visual verification for any built route, in both themes.
 *
 * Serves ./dist, loads the route, and writes light and dark screenshots to
 * test-results/. Pass a selector to frame a single figure instead of the page.
 *
 * Usage:
 *   npm run shot <route> [selector] [--mobile]
 *   npm run shot /about/
 *   npm run shot /about/ "figure"
 *   npm run shot -- / --mobile   (390×844 phone viewport, files prefixed m-;
 *                                npm needs the -- to pass the flag through)
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const outDir = path.join(root, 'test-results');
const PORT = 4399;

const args = process.argv.slice(2);
const mobile = args.includes('--mobile');
const [route = '/', selector] = args.filter((arg) => arg !== '--mobile');

if (!fs.existsSync(distDir)) {
  console.error('❌ No dist/ directory. Run `npm run build` first.');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// Route -> a filename safe to use in test-results/.
const name = (mobile ? 'm-' : '') + (route.replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '-') || 'home');

server.listen(PORT, async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 900 },
      deviceScaleFactor: 2,
    });
    const response = await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
    if (!response || !response.ok()) {
      console.error(`❌ ${route} returned ${response ? response.status() : 'no response'}.`);
      process.exitCode = 1;
      return;
    }
    await page.evaluate(() => document.fonts.ready);

    const target = selector ? page.locator(selector).first() : page;
    if (selector) {
      if ((await page.locator(selector).count()) === 0) {
        console.error(`❌ Selector ${selector} not found on ${route}.`);
        process.exitCode = 1;
        return;
      }
      // The sticky header would otherwise paint over a framed figure.
      await page.addStyleTag({ content: '#site-header { visibility: hidden; }' });
    }
    const shot = (file) =>
      target.screenshot({ path: file, ...(selector ? {} : { fullPage: true }), animations: 'disabled' });

    for (const theme of ['light', 'dark']) {
      await page.evaluate((t) => document.documentElement.classList.toggle('dark', t === 'dark'), theme);
      const file = path.join(outDir, `${name}-${theme}.png`);
      await shot(file);
      console.log(`✓ ${theme}: ${path.relative(root, file)}`);
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) console.warn(`⚠️  ${route} overflows horizontally by ${overflow}px.`);
  } finally {
    await browser.close();
    server.close();
  }
});
