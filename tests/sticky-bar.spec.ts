import { test, expect } from '@playwright/test';

const PRODUCT = 'kawasaki-eliminator-500/tires/michelin-road-6/';

// A short viewport is required: products currently carry little content, and on a
// tall viewport #comprar may never leave the screen — in which case the bar
// correctly never appears and there is nothing to observe.
test('sticky bar appears once the buy section scrolls out of view above', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 400 });
  await page.goto(PRODUCT);

  const bar = page.locator('.sticky-buy-bar');
  await expect(bar).toHaveAttribute('data-visible', 'false');

  // Use keyboard navigation to scroll (triggers IntersectionObserver, unlike window.scrollTo)
  await page.keyboard.press('End');
  await page.waitForTimeout(100);
  await expect(bar).toHaveAttribute('data-visible', 'true');
});

test('sticky bar hides again when the buy section is back in view', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 400 });
  await page.goto(PRODUCT);

  // Use keyboard navigation to scroll (triggers IntersectionObserver)
  await page.keyboard.press('End');
  await page.waitForTimeout(100);
  await expect(page.locator('.sticky-buy-bar')).toHaveAttribute('data-visible', 'true');

  // Scroll back to top by pressing Home
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('PageUp');
  }
  await page.waitForTimeout(100);
  await expect(page.locator('.sticky-buy-bar')).toHaveAttribute('data-visible', 'false');
});
