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
      expect(await p.screenshot({ fullPage: true, animations: 'disabled' })).toMatchSnapshot(
        `${page.name}-${vp.name}.png`,
        { maxDiffPixelRatio: 0.02 },
      );
    });
  }
}
