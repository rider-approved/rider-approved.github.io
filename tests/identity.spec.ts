import { test, expect } from '@playwright/test';

test('a fresh visit with no stored preference renders dark', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('choosing light persists across a reload', async ({ page }) => {
  await page.goto('');
  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
});

test('no font is fetched from a third-party host', async ({ page }) => {
  const external: string[] = [];
  page.on('request', (r) => {
    const url = r.url();
    if (/fonts\.(googleapis|gstatic)\.com/.test(url)) external.push(url);
  });
  await page.goto('');
  expect(external).toEqual([]);
});

test('headings render in the condensed display face', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/michelin-road-6/');
  const family = await page
    .locator('h1')
    .first()
    .evaluate((el) => getComputedStyle(el).fontFamily);
  expect(family).toContain('Barlow Condensed');
});

test('body copy stays in Inter', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/michelin-road-6/');
  const family = await page
    .locator('.prose p')
    .first()
    .evaluate((el) => getComputedStyle(el).fontFamily);
  expect(family).toContain('Inter');
  expect(family).not.toContain('Barlow');
});

test('the stripe caps the hero and is decorative', async ({ page }) => {
  await page.goto('');
  const rule = page.locator('.hazard-rule').first();
  await expect(rule).toBeAttached();
  await expect(rule).toHaveAttribute('aria-hidden', 'true');
  expect((await rule.textContent())?.trim()).toBe('');
});

// The empty state used to carry its own stripe as a card top edge, which put
// two stripes back to back: this page's divider, then the card's. The divider
// renders whether or not the category has products, so it is the one that stays.
test('an empty category shows the stripe once, not twice', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/bancos/');
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page.locator('.hazard-rule')).toHaveCount(1);
});

test('the stripe edges the sticky buy bar', async ({ page }) => {
  await page.goto('kawasaki-eliminator-500/tires/michelin-road-6/');
  await expect(page.locator('.sticky-buy-bar .hazard-rule')).toHaveCount(1);
});

test('the grain layer is decorative and carries no text', async ({ page }) => {
  await page.goto('');
  const grain = page.locator('.grain').first();
  await expect(grain).toBeAttached();
  const text = await grain.evaluate((el) => {
    const own = Array.from(el.childNodes)
      .filter((n) => n.nodeType === Node.TEXT_NODE)
      .map((n) => n.textContent ?? '')
      .join('');
    return own.trim();
  });
  expect(text).toBe('');
});

test('grain never sits behind text below 20px', async ({ page }) => {
  for (const path of ['', 'kawasaki-eliminator-500/tires/', 'kawasaki-eliminator-500/tires/michelin-road-6/']) {
    await page.goto(path);
    const offenders = await page.evaluate(() => {
      const bad: { text: string; size: number }[] = [];
      document.querySelectorAll('.grain').forEach((g) => {
        g.querySelectorAll('*').forEach((el) => {
          const own = Array.from(el.childNodes)
            .filter((n) => n.nodeType === Node.TEXT_NODE)
            .map((n) => n.textContent ?? '')
            .join('')
            .trim();
          if (!own) return;
          const size = parseFloat(getComputedStyle(el).fontSize);
          if (size < 20) bad.push({ text: own.slice(0, 40), size });
        });
      });
      return bad;
    });
    expect(offenders, `on /${path}`).toEqual([]);
  }
});
