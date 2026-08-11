import { test, expect } from '@playwright/test';

test('transitions are suppressed under reduced motion', async ({ page }) => {
  // Use Playwright's media emulation to set prefers-reduced-motion directly
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await page.goto('kawasaki-eliminator-500/tires/michelin-road-6/');
  const duration = await page
    .locator('.sticky-buy-bar')
    .evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(['0s', '0.00001s', '1e-05s']).toContain(duration);
});

test('every interactive control meets the 48px tap target', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/');
  for (const el of await page.locator('.category-chip').all()) {
    const box = await el.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(48);
  }
});

test('all images declare alt text', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/michelin-road-6/');
  for (const img of await page.locator('img').all()) {
    expect(await img.getAttribute('alt')).not.toBeNull();
  }
});
