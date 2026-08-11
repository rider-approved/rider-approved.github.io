import { test, expect } from '@playwright/test';

// These tests used to assert the partner list was empty, which was the right
// guarantee while no partnership existed. Coffee Ride Motorcycle has since
// agreed, so what matters now is that they are credited accurately and linked
// to the real channel.
//
// Deliberately no `import { partners }`: partners.ts now imports an image, which
// Playwright's transform cannot parse. Writing the values out also means an
// accidental edit to the config fails a test instead of silently agreeing
// with itself.
const PARTNER = {
  name: 'Coffee Ride Motorcycle',
  handle: '@CoffeeRideMotorcycle',
  url: 'https://www.youtube.com/@CoffeeRideMotorcycle',
};

test('the footer strip links out to the partner channel', async ({ page }) => {
  await page.goto('');
  const strip = page.locator('.partner-strip');
  await expect(strip).toBeVisible();

  const link = strip.getByRole('link').first();
  await expect(link).toHaveAttribute('href', PARTNER.url);
  await expect(link).toHaveAttribute('rel', /noopener/);
  // The mark alone is an unreadable smudge at this size, so the name must be
  // visible text — which is also what gives the link its accessible name.
  await expect(link).toContainText(PARTNER.name);

  const img = strip.locator('img');
  await expect(img).toHaveAttribute('alt', '');
  // The avatar must be a locally built asset, never a hotlinked platform URL:
  // those rotate and 404 silently, leaving a broken image on every page.
  await expect(img).not.toHaveAttribute('src', /^https?:/);
});

test('the community page names the partner and its handle', async ({ page }) => {
  await page.goto('community');
  const card = page.locator('.partner-list');
  await expect(card).toBeVisible();
  await expect(card).toContainText(PARTNER.name);
  await expect(card).toContainText(PARTNER.handle);
  await expect(card.getByRole('link').first()).toHaveAttribute('href', PARTNER.url);
});

test('youtube facade loads no third-party iframe before click', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/michelin-road-6/');
  await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);
});

test('empty state CTA reaches the community page', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/bancos/');
  await page.locator('.empty-state a').click();
  await expect(page).toHaveURL(/community/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
