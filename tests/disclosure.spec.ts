import { test, expect } from '@playwright/test';

test('disclosure is collapsed by default and expands on click', async ({ page }) => {
  await page.goto('styleguide');
  const d = page.locator('.disclosure').first();
  await expect(d.locator('.disclosure-body')).toBeHidden();
  await d.locator('.disclosure-summary').click();
  await expect(d.locator('.disclosure-body')).toBeVisible();
});

test('disclosure summary meets the minimum tap target', async ({ page }) => {
  await page.goto('styleguide');
  const box = await page.locator('.disclosure-summary').first().boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(48);
});

// Price freshness lives here rather than on a product page: no real product
// carries a price, and inventing one to test with would put fabricated data
// in content. The styleguide is an explicit component showcase, so sample
// values are honest there.
test('a fresh price is asserted', async ({ page }) => {
  await page.goto('styleguide');
  const fresh = page.locator('.buy-link[data-stale="false"]').first();
  await expect(fresh.locator('.buy-price')).toBeVisible();
  await expect(fresh).not.toContainText('pode ter mudado');
});

test('a stale price is struck through and softened', async ({ page }) => {
  await page.goto('styleguide');
  const stale = page.locator('.buy-link[data-stale="true"]').first();
  await expect(stale).toContainText('pode ter mudado');
  await expect(stale).toContainText('Confira no site');
});

test('spec table and adaptation notes render when populated', async ({ page }) => {
  await page.goto('styleguide');
  await expect(page.locator('.spec-table').first()).toBeVisible();
  await expect(page.locator('.adaptation-notes').first()).toBeVisible();
});
