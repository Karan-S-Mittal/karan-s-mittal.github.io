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
  { path: '/writing/', name: 'writing-index' },
  { path: '/work/', name: 'work' },
  { path: '/speaking/', name: 'speaking' },
  { path: '/about/', name: 'about' },
  { path: '/contact/', name: 'contact' },
  { path: '/now/', name: 'now' },
  { path: '/topics/', name: 'topics' },
  { path: '/ideas/', name: 'ideas' },
  { path: '/writing/version-control-stack/', name: 'systems-essay' },
  { path: '/diagrams/developer-platform-stack/', name: 'diagram-detail' },
] as const;

const ROUTES = [
  '/404.html',
  '/',
  '/about/',
  '/contact/',
  '/ideas/',
  '/diagrams/code-review-topologies/',
  '/diagrams/developer-platform-stack/',
  '/diagrams/semiconductor-traceability/',
  '/now/',
  '/speaking/',
  '/topics/',
  '/work/',
  '/writing/',
  '/writing/version-control-stack/',
] as const;

const LEGACY_REDIRECTS = [
  { from: '/blog/', to: '/writing/' },
  { from: '/blog/exploring-version-control/', to: '/writing/version-control-stack/' },
  { from: '/blog/version-control-stack/', to: '/writing/version-control-stack/' },
  { from: '/publications/', to: '/writing/' },
  { from: '/diagrams/', to: '/ideas/' },
  { from: '/visuals/', to: '/ideas/' },
  { from: '/visuals/platform-stack/', to: '/diagrams/developer-platform-stack/' },
  { from: '/visuals/code-review-topologies/', to: '/diagrams/code-review-topologies/' },
  { from: '/tags/', to: '/topics/' },
  { from: '/tags/git/', to: '/topics/git/' },
  { from: '/talks/', to: '/speaking/' },
] as const;

for (const vp of VIEWPORTS) {
  for (const page of PAGES) {
    test(`${page.name} @ ${vp.name}`, async ({ page: p }) => {
      const pageErrors: string[] = [];
      p.on('pageerror', (error) => pageErrors.push(error.message));
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
        duplicateIds: [...document.querySelectorAll('[id]')]
          .map((element) => element.id)
          .filter((id, index, ids) => ids.indexOf(id) !== index),
        mobileTocOpen: document.querySelector<HTMLDetailsElement>('.post-mobile-toc')?.open ?? false,
      }));

      expect(layoutContract.overflowX, 'page must not overflow horizontally').toBe(0);
      expect(layoutContract.tocHashes, 'TOC labels must not inherit heading anchor glyphs').toBe(0);
      expect(pageErrors, `${page.path} must load without browser page errors`).toEqual([]);

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

  test(`all ${ROUTES.length} generated pages satisfy the layout contract @ ${vp.name}`, async ({ page: p }) => {
    test.setTimeout(120_000);
    await p.setViewportSize({ width: vp.width, height: vp.height });
    const pageErrors: string[] = [];
    p.on('pageerror', (error) => pageErrors.push(error.message));

    for (const route of ROUTES) {
      pageErrors.length = 0;
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
        duplicateIds: [...document.querySelectorAll('[id]')]
          .map((element) => element.id)
          .filter((id, index, ids) => ids.indexOf(id) !== index),
      }));

      expect(contract.overflowX, `${route} must not overflow horizontally`).toBe(0);
      expect(contract.h1Count, `${route} must expose one primary heading`).toBe(1);
      expect(contract.brokenImages, `${route} must not contain broken images`).toBe(0);
      expect(contract.unlabeledControls, `${route} must label form controls`).toBe(0);
      expect(contract.instrumented, `${route} must use Instrumented Editorial`).toBe(true);
      expect(contract.tocHashes, `${route} TOC labels must stay clean`).toBe(0);
      expect(contract.duplicateIds, `${route} must not contain duplicate element IDs`).toEqual([]);
      expect(pageErrors, `${route} must load without browser page errors`).toEqual([]);
      if (vp.name === 'mobile') {
        expect(contract.bodyFont, `${route} mobile body text must be at least 17px`).toBeGreaterThanOrEqual(17);
      }
    }
  });
}

test('runtime smoke: homepage boots and theme switches between explicit light/dark states', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.addInitScript(() => localStorage.removeItem('theme'));
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/', { waitUntil: 'networkidle' });

  expect(pageErrors, 'homepage must not emit browser page errors').toEqual([]);
  await expect(page.locator('#home-title')).toBeVisible();
  await expect(page.locator('#theme-toggle')).toBeVisible();
  await expect(page.locator('.note-row')).toHaveCount(1);

  const lightCanvas = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--ie-canvas').trim());
  expect(lightCanvas.toLowerCase()).toBe('#f8f9fc');

  await page.locator('#theme-toggle').click();
  await expect.poll(() => page.locator('html').evaluate((element) => element.classList.contains('dark'))).toBe(true);
  const darkCanvas = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--ie-canvas').trim());
  expect(darkCanvas.toLowerCase()).toBe('#09090b');

  await page.locator('#theme-toggle').click();
  await expect.poll(() => page.locator('html').evaluate((element) => element.classList.contains('dark'))).toBe(false);
});

for (const redirect of LEGACY_REDIRECTS) {
  test(`legacy route ${redirect.from} resolves to ${redirect.to}`, async ({ page }) => {
    await page.goto(redirect.from, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(new RegExp(`${redirect.to.replaceAll('/', '\\/')}?$`));
  });
}

test('mobile navigation and dense figure inspection remain contained', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/writing/version-control-stack/', { waitUntil: 'networkidle' });

  const nav = page.locator('.mobile-nav');
  const panel = page.locator('.mobile-nav-panel');
  await expect(panel).toBeHidden();
  await nav.locator('summary').click();
  await expect(panel).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);

  await nav.locator('summary').click();
  await expect(panel).toBeHidden();
  await expect(page.locator('.exhibit')).toHaveCount(2);
  const figureBounds = await page.locator('.exhibit').first().evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { left: rect.left, right: rect.right, viewport: window.innerWidth };
  });
  expect(figureBounds.left).toBeGreaterThanOrEqual(0);
  expect(figureBounds.right).toBeLessThanOrEqual(figureBounds.viewport);
});
