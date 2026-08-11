import { test, expect } from '@playwright/test';

test('nav shows at most nine chips before expanding', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/');
  expect(await page.locator('.category-chip:visible').count()).toBeLessThanOrEqual(9);
});

test('each chip shows its product count', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/');
  await expect(page.locator('.category-chip').first().locator('.chip-count')).toBeVisible();
});

test('empty categories sort after populated ones', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/');
  const counts = await page.locator('.category-chip .chip-count').allTextContents();
  const nums = counts.map((c) => Number(c.trim()));
  const firstZero = nums.indexOf(0);
  if (firstZero !== -1) {
    expect(nums.slice(firstZero).every((n) => n === 0)).toBe(true);
  }
});

test('nine categories render with no overflow control', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/');
  // kawasaki-eliminator-500 declares exactly 9 categories. Hiding one behind a
  // control costs more attention than the item it conceals.
  await expect(page.locator('.category-chip')).toHaveCount(9);
  await expect(page.locator('.category-more')).toHaveCount(0);
});
