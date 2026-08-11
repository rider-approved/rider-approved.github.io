import { test, expect } from '@playwright/test';

const PRODUCT = 'kawasaki-eliminator-500/tires/michelin-road-6/';

test('a product without moreInfo renders no accordion section', async ({ page }) => {
  await page.goto(PRODUCT);
  await expect(page.locator('.more-info')).toHaveCount(0);
});

test('a sparse product renders no empty section headings', async ({ page }) => {
  await page.goto(PRODUCT);
  for (const heading of ['Mais informações', 'Em vídeo', 'O que outros pilotos dizem']) {
    await expect(page.getByRole('heading', { name: heading })).toHaveCount(0);
  }
});
