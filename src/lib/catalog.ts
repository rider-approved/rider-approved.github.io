// src/lib/catalog.ts
import { getCollection, type CollectionEntry } from 'astro:content';
import { catalog } from '../config/catalog';
import { parseProductId } from './parseProductId';
export { parseProductId }; // Exported here for convenience; defined separately to allow Playwright test access.

export type Product = CollectionEntry<'products'>;

export async function getAllProducts(): Promise<Product[]> {
  return getCollection('products');
}

export async function getProductsIn(section: string, category: string): Promise<Product[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.id.startsWith(`${section}/${category}/`))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getProduct(
  section: string,
  category: string,
  product: string
): Promise<Product | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.id === `${section}/${category}/${product}`);
}

export async function countsByCategory(section: string): Promise<Record<string, number>> {
  const all = await getAllProducts();
  const counts: Record<string, number> = {};
  for (const category of catalog.find((s) => s.slug === section)?.categories ?? []) {
    counts[category.slug] = 0;
  }
  for (const p of all) {
    const { section: s, category } = parseProductId(p.id);
    if (s === section && category in counts) counts[category] += 1;
  }
  return counts;
}

export async function getLatest(limit: number): Promise<Product[]> {
  const all = await getAllProducts();
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, limit);
}

/** Spec §3.5 — only values that are computable and true. */
export async function getStats(): Promise<{ products: number; reviews: number; categories: number }> {
  const all = await getAllProducts();
  const reviews = all.reduce((sum, p) => sum + 1 + p.data.testimonials.length, 0);
  const populated = new Set(all.map((p) => {
    const { section, category } = parseProductId(p.id);
    return `${section}/${category}`;
  }));
  return { products: all.length, reviews, categories: populated.size };
}
