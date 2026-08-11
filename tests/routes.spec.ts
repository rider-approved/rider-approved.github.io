import { test, expect } from '@playwright/test';

test('landing page is served at the root, with no redirect', async ({ page }) => {
  const response = await page.goto('');
  expect(response?.status()).toBe(200);
  await expect(page).not.toHaveURL(/\/(pt|en)\//);
});

test('section page is served without a locale prefix', async ({ page }) => {
  const response = await page.goto('kawasaki-eliminator-500/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('main h1')).toContainText('Eliminator');
});

test('category page is served without a locale prefix', async ({ page }) => {
  const response = await page.goto('kawasaki-eliminator-500/tires/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('main h1')).toContainText('Pneus');
});

test('no placeholder products are rendered', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/bancos/');
  await expect(page.getByText('Em breve')).toHaveCount(0);
});
