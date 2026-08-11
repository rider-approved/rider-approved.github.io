import { test, expect } from '@playwright/test';

const PRODUCT = 'kawasaki-eliminator-500/tires/michelin-road-6/';

test('a product with no photo renders the category placeholder, not a broken image', async ({ page }) => {
  await page.goto(PRODUCT);
  await expect(page.locator('.product-image-placeholder').first()).toBeVisible();
  await expect(page.locator('.product-image img')).toHaveCount(0);
});

test('the placeholder is labelled at hero size', async ({ page }) => {
  await page.goto(PRODUCT);
  await expect(page.locator('.product-image-placeholder').first()).toContainText('Sem foto ainda');
});
