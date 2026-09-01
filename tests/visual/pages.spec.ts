import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

// Representative screenshots cover each public layout family. The route matrix
// below separately checks every generated page without producing 150 baselines.
const PAGES = [
  { path: '/', name: 'home' },
  { path: '/blog/', name: 'blog-index' },
  { path: '/blog/paged-attention-kv-cache/', name: 'essay' },
  { path: '/blog/deterministic-rag-intro/', name: 'rag-essay' },
  { path: '/blog/why-go-is-shockingly-good-systems-architecture/', name: 'go-essay' },
  { path: '/work/', name: 'work' },
  { path: '/talks/', name: 'talks' },
  { path: '/about/', name: 'about' },
  { path: '/tags/', name: 'tags' },
  { path: '/case-studies/soft-architecture/', name: 'archive' },
  { path: '/studio/components/', name: 'specimen' },
] as const;

const ROUTES = [
  '/404.html',
  '/',
  '/about/',
  '/blog/',
  '/blog/deterministic-rag-intro/',
  '/blog/linear-regression-ordinary-least-squares/',
  '/blog/paged-attention-kv-cache/',
  '/blog/why-go-is-shockingly-good-systems-architecture/',
  '/blog/xgboost-part-1-gradient-boosting-foundations/',
  '/blog/xgboost-part-2-mathematical-engine/',
  '/blog/xgboost-part-3-systems-microarchitecture/',
  '/case-studies/soft-architecture/',
  '/contact/',
  '/now/',
  '/studio/',
  '/studio/components/',
  '/studio/visuals/',
  '/tags/',
  ...[
    'ai-architecture',
    'algorithms',
    'concurrency',
    'cuda',
    'decision-trees',
    'distributed-systems',
    'garbage-collection',
    'go',
    'gradient-boosting',
    'graphrag',
    'hardware-microarchitecture',
    'kv-cache',
    'linear-algebra',
    'llm-inference',
    'machine-learning-systems',
    'machine-learning',
    'mathematics',
    'memory-hierarchy',
    'memory-management',
    'microarchitecture',
    'mlops',
    'optimization',
    'pagedattention',
    'parallel-systems',
    'quantile-sketch',
    'rag',
    'regression',
    'statistics',
    'systems-engineering',
    'xgboost',
  ].map((tag) => `/tags/${tag}/`),
  '/talks/',
  '/work/',
] as const;

for (const vp of VIEWPORTS) {
  for (const page of PAGES) {
    test(`${page.name} @ ${vp.name}`, async ({ page: p }) => {
      await p.setViewportSize({ width: vp.width, height: vp.height });
      await p.goto(page.path, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      await p.evaluate(async () => {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((resolve) => setTimeout(resolve, 300));
        window.scrollTo(0, 0);
      });

      const layoutContract = await p.evaluate(() => ({
        overflowX: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
        h1Right: document.querySelector('h1')?.getBoundingClientRect().right ?? 0,
        viewportWidth: window.innerWidth,
        tocHashes: [...document.querySelectorAll('.toc-link')]
          .filter((link) => link.textContent?.trim().endsWith('#')).length,
        mobileTocOpen: document.querySelector<HTMLDetailsElement>('.post-mobile-toc')?.open ?? false,
      }));

      expect(layoutContract.overflowX, 'page must not overflow horizontally').toBe(0);
      expect(layoutContract.tocHashes, 'TOC labels must not inherit heading anchor glyphs').toBe(0);

      if (page.name === 'home' && vp.name === 'mobile') {
        expect(layoutContract.h1Right, 'mobile homepage title must fit the viewport')
          .toBeLessThanOrEqual(layoutContract.viewportWidth);
      }

      if (page.name.endsWith('essay') && vp.name === 'mobile') {
        expect(layoutContract.mobileTocOpen, 'mobile essay contents start collapsed').toBe(false);
      }

      expect(await p.screenshot({ fullPage: true, animations: 'disabled' })).toMatchSnapshot(
        `${page.name}-${vp.name}.png`,
        { maxDiffPixelRatio: 0.02 },
      );
    });
  }

  test(`all 50 generated pages satisfy the layout contract @ ${vp.name}`, async ({ page: p }) => {
    test.setTimeout(120_000);
    await p.setViewportSize({ width: vp.width, height: vp.height });

    for (const route of ROUTES) {
      if (route === '/contact/' || route === '/now/') {
        const response = await p.request.get(route);
        const html = await response.text();
        expect(response.ok(), `${route} redirect document must load`).toBe(true);
        expect(html, `${route} redirect must not be indexed`).toContain('noindex, follow');
        expect(html, `${route} redirect must use an absolute canonical URL`)
          .toMatch(/rel="canonical" href="https:\/\//);
        expect(html, `${route} redirect must preserve a non-JavaScript fallback`)
          .toContain('http-equiv="refresh"');
        continue;
      }

      await p.goto(route, { waitUntil: 'domcontentloaded' });
      const contract = await p.evaluate(() => ({
        overflowX: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
        h1Count: document.querySelectorAll('h1').length,
        bodyFont: Number.parseFloat(getComputedStyle(document.body).fontSize),
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        unlabeledControls: [...document.querySelectorAll('input, select, textarea')]
          .filter((control) => !control.getAttribute('aria-label')
            && !control.getAttribute('aria-labelledby')
            && !control.closest('label')).length,
        instrumented: document.body.classList.contains('instrumented'),
        tocHashes: [...document.querySelectorAll('.toc-link')]
          .filter((link) => link.textContent?.trim().endsWith('#')).length,
      }));

      expect(contract.overflowX, `${route} must not overflow horizontally`).toBe(0);
      expect(contract.h1Count, `${route} must expose one primary heading`).toBe(1);
      expect(contract.brokenImages, `${route} must not contain broken images`).toBe(0);
      expect(contract.unlabeledControls, `${route} must label form controls`).toBe(0);
      expect(contract.instrumented, `${route} must use Instrumented Editorial`).toBe(true);
      expect(contract.tocHashes, `${route} TOC labels must stay clean`).toBe(0);
      if (vp.name === 'mobile') {
        expect(contract.bodyFont, `${route} mobile body text must be at least 17px`).toBeGreaterThanOrEqual(17);
      }
    }
  });
}

test('mobile navigation and dense figure inspection remain contained', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/blog/deterministic-rag-intro/', { waitUntil: 'networkidle' });

  const nav = page.locator('.mobile-nav');
  const panel = page.locator('.mobile-nav-panel');
  await expect(panel).toBeHidden();
  await nav.locator('summary').click();
  await expect(panel).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);

  const figureLink = page.locator('.post-hero-media');
  await expect(figureLink).toHaveAttribute('target', '_blank');
  const figureBounds = await figureLink.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(figureBounds.scrollWidth, 'dense diagrams should be inspectable without shrinking to a thumbnail')
    .toBeGreaterThan(figureBounds.clientWidth);
});
