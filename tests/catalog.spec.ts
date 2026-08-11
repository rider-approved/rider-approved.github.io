import { test, expect } from '@playwright/test';
import { catalog, getSection, getCategory, RESERVED_SLUGS } from '../src/config/catalog';
import { formatBRL, isStale } from '../src/lib/price';
import pt from '../src/i18n/pt.json' assert { type: 'json' };

test('no section uses a reserved slug', () => {
  for (const section of catalog) {
    expect(RESERVED_SLUGS).not.toContain(section.slug);
  }
});

test('every category has a label key and an icon', () => {
  for (const section of catalog) {
    for (const category of section.categories) {
      expect(category.labelKey).toMatch(/^category\./);
      expect(category.icon.length).toBeGreaterThan(0);
    }
  }
});

test('category slugs are unique within a section', () => {
  for (const section of catalog) {
    const slugs = section.categories.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  }
});

test('getSection and getCategory resolve known entries', () => {
  expect(getSection('kawasaki-eliminator-500')?.slug).toBe('kawasaki-eliminator-500');
  expect(getSection('nope')).toBeUndefined();
  expect(getCategory('kawasaki-eliminator-500', 'tires')?.slug).toBe('tires');
  expect(getCategory('kawasaki-eliminator-500', 'nope')).toBeUndefined();
});

test('formatBRL renders Brazilian currency', () => {
  expect(formatBRL(1890).replace(/ /g, ' ')).toBe('R$ 1.890,00');
});

test('isStale is false for recent dates and true past the threshold', () => {
  const recent = new Date(Date.now() - 5 * 86400000);
  const old = new Date(Date.now() - 45 * 86400000);
  expect(isStale(recent)).toBe(false);
  expect(isStale(old)).toBe(true);
  expect(isStale(undefined)).toBe(false);
});

test('both plural forms of the overflow label exist', () => {
  const dict = pt as Record<string, string>;
  expect(dict['nav.showAll.one']).toContain('{n}');
  expect(dict['nav.showAll.other']).toContain('{n}');
  // Portuguese: singular "categoria", plural "categorias".
  expect(dict['nav.showAll.one']).toMatch(/categoria$/);
  expect(dict['nav.showAll.other']).toMatch(/categorias$/);
  expect(dict['nav.showAll']).toBeUndefined();
});
