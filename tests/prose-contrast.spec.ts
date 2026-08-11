import { test, expect } from '@playwright/test';

const PRODUCT = 'kawasaki-eliminator-500/tires/michelin-road-6/';

// Parses "rgb(r, g, b)" / "rgba(r, g, b, a)" into [r,g,b].
function rgb(value: string): [number, number, number] {
  const m = value.match(/(\d+),\s*(\d+),\s*(\d+)/);
  if (!m) throw new Error(`Unparseable colour: ${value}`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function luminance([r, g, b]: [number, number, number]): number {
  const [rl, gl, bl] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrast(fg: string, bg: string): number {
  const [hi, lo] = [luminance(rgb(fg)), luminance(rgb(bg))].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

for (const theme of ['light', 'dark'] as const) {
  test(`review body bold text is readable in the ${theme} theme`, async ({ page }) => {
    await page.goto(PRODUCT);
    await page.evaluate((t) => {
      if (t === 'dark') document.documentElement.dataset.theme = 'dark';
      else delete document.documentElement.dataset.theme;
    }, theme);

    const strong = page.locator('.prose strong').first();
    await expect(strong).toBeVisible();

    const fg = await strong.evaluate((el) => getComputedStyle(el).color);
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });
}
