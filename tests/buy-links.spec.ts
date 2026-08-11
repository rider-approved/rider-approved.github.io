import { test, expect } from '@playwright/test';

const PRODUCT = 'kawasaki-eliminator-500/tires/michelin-road-6/';

test('the buy section is anchored at #comprar', async ({ page }) => {
  await page.goto(PRODUCT);
  await expect(page.locator('#comprar')).toBeAttached();
});

// No real product carries a price yet, so the product page asserts the
// undated case. Fresh-vs-stale price rendering is covered on /styleguide
// (Task 17), where sample data is a showcase rather than content.
test('a buy link with no checkedAt shows no price at all', async ({ page }) => {
  await page.goto(PRODUCT);
  const link = page.locator('.buy-link').first();
  await expect(link).toBeVisible();
  await expect(link.locator('.buy-price')).toHaveCount(0);
});

test('affiliate disclosure is present next to the buy links', async ({ page }) => {
  await page.goto(PRODUCT);
  await expect(page.locator('#comprar .affiliate-disclosure')).toBeVisible();
});

test('buy links open in a new tab with rel protection', async ({ page }) => {
  await page.goto(PRODUCT);
  const link = page.locator('.buy-link a').first();
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
});
