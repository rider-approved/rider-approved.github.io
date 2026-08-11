import { test, expect } from '@playwright/test';

const PRODUCT = 'kawasaki-eliminator-500/tires/michelin-road-6/';

test('product page renders its populated blocks', async ({ page }) => {
  await page.goto(PRODUCT);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Michelin Road 6');
  await expect(page.locator('.verdict')).toBeVisible();
  await expect(page.locator('#comprar')).toBeAttached();
});

// Every product currently carries only a title, verdict and buy link — the
// optional blocks are genuinely empty rather than fabricated. That makes the
// conditional-rendering contract the thing worth asserting here.
test('empty optional blocks render no headings at all', async ({ page }) => {
  await page.goto(PRODUCT);
  for (const heading of ['Especificações', 'Como adaptar / instalar']) {
    await expect(page.getByRole('heading', { name: heading })).toHaveCount(0);
  }
});

test('sticky bar is hidden at the top of the page', async ({ page }) => {
  await page.goto(PRODUCT);
  await expect(page.locator('.sticky-buy-bar')).toHaveAttribute('data-visible', 'false');
});

test('sticky bar button anchors to the buy section', async ({ page }) => {
  await page.goto(PRODUCT);
  await expect(page.locator('.sticky-buy-bar a')).toHaveAttribute('href', /#comprar$/);
});

test('related products are hidden when the product is alone in its category', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/exhaust/akrapovic-slip-on/');
  await expect(page.getByRole('heading', { name: 'Outros produtos desta categoria' })).toHaveCount(0);
});
