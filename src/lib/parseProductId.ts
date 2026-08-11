// src/lib/parseProductId.ts
//
// This function lives in its own module because it must be importable from Playwright tests.
// src/lib/catalog.ts imports 'astro:content', a virtual module that only resolves inside Astro's build,
// making it unreachable from test runners. By isolating parseProductId here, tests can import it directly.

export function parseProductId(id: string): { section: string; category: string; product: string } {
  const parts = id.split('/');
  if (parts.length !== 3) {
    throw new Error(`Malformed product id "${id}" — expected <section>/<category>/<product>.`);
  }
  return { section: parts[0], category: parts[1], product: parts[2] };
}
