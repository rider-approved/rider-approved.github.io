import { test, expect } from '@playwright/test';

test('landing shows exactly the three honest statistics', async ({ page }) => {
  await page.goto('');
  const labels = await page.locator('.stat-label').allTextContents();
  expect(labels.map((l) => l.trim())).toEqual(['Produtos', 'Análises', 'Categorias']);
});

// The rule is that a statistic which is only approximately true is not shown:
// a rider count cannot be known without accounts, and testimonial km is
// optional. The rule governs the STATS BLOCK, not the page's prose — the
// promise legitimately says "avaliados por pilotos de verdade", which is the
// site's proposition rather than a number.
test('the stats block shows no rider count and no kilometre total', async ({ page }) => {
  await page.goto('');
  const stats = page.locator('.site-stats');
  await expect(stats).toBeVisible();
  await expect(stats.getByText(/pilotos/i)).toHaveCount(0);
  await expect(stats.getByText(/km/i)).toHaveCount(0);
});

test('landing uses the compact card variant for latest additions', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('.product-card[data-variant="compact"]').first()).toBeVisible();
});
