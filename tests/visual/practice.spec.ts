import { test, expect } from '@playwright/test';

// Follow the client journey without submitting the third-party contact form.
for (const viewport of [{ width: 375, height: 812 }, { width: 1440, height: 900 }]) {
  test(`public work leads to engagement and contact @ ${viewport.width}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ animations: 'disabled', path: testInfo.outputPath('home-light.png') });
    await page.locator('#theme-toggle').click();
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(12, 10, 9)');
    await page.screenshot({ animations: 'disabled', path: testInfo.outputPath('home-dark.png') });
    await page.locator('#theme-toggle').click();

    await page.goto('/work/');
    await page.getByRole('link', { name: 'Ways to work together' }).click();
    await expect(page.locator('#engagements')).toBeInViewport();
    await page.getByRole('link', { name: 'Start a conversation', exact: false }).click();
    await expect(page).toHaveURL(/\/contact\/?$/);
    await expect(page.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', /^mailto:/);
    await expect(page.getByText('What happens next', { exact: true })).toBeVisible();
    await page.locator('#theme-toggle').click();
    await expect(page.locator('#tally-iframe')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await page.screenshot({ animations: 'disabled', path: testInfo.outputPath('contact-dark.png'), fullPage: true });
  });
}
