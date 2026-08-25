import { defineConfig } from '@playwright/test';

// Visual regression per Soft Architecture spec §26.
// Baselines are committed; run `npm run test:visual` against a production build.
export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: false,
  retries: 0,
  // Baselines are OS-specific (font rasterisation differs); keep them per-platform.
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{platform}/{arg}{ext}',
  use: {
    baseURL: 'http://localhost:4321',
    // Spec §18.5: motion must never affect layout truth
    reducedMotion: 'reduce',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
