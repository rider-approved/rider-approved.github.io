import { test, expect } from '@playwright/test';

test('transparency page is reachable from a product buy block', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/michelin-road-6/');
  await page.locator('.affiliate-disclosure a').click();
  await expect(page).toHaveURL(/transparency/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('footer links to transparency with a Portuguese label', async ({ page }) => {
  await page.goto('');
  const link = page.locator('footer a[href$="transparency"]');
  await expect(link).toHaveText('Transparência');
});
