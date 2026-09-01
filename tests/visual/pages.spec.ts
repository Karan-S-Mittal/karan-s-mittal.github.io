import { test, expect } from '@playwright/test';

// Spec §26.2 canonical screenshot matrix
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

// One page per layout archetype (spec §26.1 fixture coverage):
// density rhythm, essay template, portfolio, dark CTA, design-system specimen.
const PAGES = [
  { path: '/', name: 'home' },
  { path: '/blog/paged-attention-kv-cache/', name: 'essay' },
  { path: '/work/', name: 'work' },
  { path: '/talks/', name: 'talks' },
  { path: '/about/', name: 'about' },
  { path: '/studio/components/', name: 'specimen' },
];

for (const vp of VIEWPORTS) {
  for (const page of PAGES) {
    test(`${page.name} @ ${vp.name}`, async ({ page: p }) => {
      await p.setViewportSize({ width: vp.width, height: vp.height });
      await p.goto(page.path, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      // Scroll through to trigger any reveal, then return to top (§18.1)
      await p.evaluate(async () => {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 300));
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

      if (page.name === 'essay' && vp.name === 'mobile') {
        expect(layoutContract.mobileTocOpen, 'mobile essay contents start collapsed').toBe(false);
      }

      expect(await p.screenshot({ fullPage: true, animations: 'disabled' })).toMatchSnapshot(
        `${page.name}-${vp.name}.png`,
        { maxDiffPixelRatio: 0.02 },
      );
    });
  }
}
