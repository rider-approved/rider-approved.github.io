import { test, expect } from '@playwright/test';
import { parseProductId } from '../src/lib/parseProductId';

test('parseProductId splits a three-segment id', () => {
  expect(parseProductId('kawasaki-eliminator-500/tires/michelin-road-6')).toEqual({
    section: 'kawasaki-eliminator-500',
    category: 'tires',
    product: 'michelin-road-6',
  });
});

test('parseProductId throws on a malformed id', () => {
  expect(() => parseProductId('kawasaki-eliminator-500/tires')).toThrow();
});
