import { test, expect } from '@playwright/test';

test('category listing uses the row variant', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/');
  await expect(page.locator('.product-card[data-variant="row"]').first()).toBeVisible();
});

test('an empty category renders the empty state and no product cards', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/bancos/');
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page.locator('.product-card')).toHaveCount(0);
});

test('a row card links to its product page', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/');
  await page.locator('.product-card[data-variant="row"] a').first().click();
  await expect(page).toHaveURL(/\/tires\/[^/]+\/$/);
});
