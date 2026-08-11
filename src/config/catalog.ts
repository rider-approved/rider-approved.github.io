// src/config/catalog.ts
export const RESERVED_SLUGS = ['styleguide', 'transparency', 'community'] as const;

const ICONS = {
  wheel: '<circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="9"/>',
  helmet: '<path d="M8 40a24 24 0 0 1 48 0v6H8z"/><path d="M20 40a12 12 0 0 1 30-6"/>',
  exhaust: '<path d="M6 26h34l18 8-18 8H6z"/><circle cx="50" cy="34" r="4"/>',
  seat: '<path d="M8 40c0-10 12-16 26-16s22 4 22 10-8 8-18 8H8z"/>',
  chain: '<circle cx="18" cy="32" r="10"/><circle cx="46" cy="32" r="10"/><path d="M18 22h28"/><path d="M18 42h28"/>',
  mirror: '<ellipse cx="32" cy="22" rx="16" ry="12"/><path d="M32 34v22"/><path d="M22 56h20"/>',
  spray: '<rect x="20" y="20" width="24" height="36" rx="4"/><path d="M26 20V10h12v10"/><path d="M50 14h6"/>',
  paint: '<path d="M12 26h30v22a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8z"/><path d="M42 32h8V16H30"/>',
  bulb: '<circle cx="32" cy="26" r="16"/><path d="M24 46h16"/><path d="M26 54h12"/>',
  box: '<rect x="10" y="20" width="44" height="30" rx="3"/><path d="M10 32h44"/>',
  glove: '<path d="M20 54V26a5 5 0 0 1 10 0v-6a5 5 0 0 1 10 0v6a5 5 0 0 1 10 0v18a10 10 0 0 1-10 10z"/>',
  jacket: '<path d="M22 12l10 6 10-6 12 8-4 12v22H14V32l-4-12z"/><path d="M32 18v34"/>',
} as const;

export interface Category {
  slug: string;
  labelKey: string;
  icon: string;
}

export interface Section {
  slug: string;
  labelKey: string;
  categories: Category[];
}

export const catalog: Section[] = [
  {
    slug: 'kawasaki-eliminator-500',
    labelKey: 'section.eliminator',
    categories: [
      { slug: 'acessorios-extras', labelKey: 'category.acessorios-extras', icon: ICONS.box },
      { slug: 'kit-relacao', labelKey: 'category.kit-relacao', icon: ICONS.chain },
      { slug: 'tires', labelKey: 'category.tires', icon: ICONS.wheel },
      { slug: 'exhaust', labelKey: 'category.exhaust', icon: ICONS.exhaust },
      { slug: 'bancos', labelKey: 'category.bancos', icon: ICONS.seat },
      { slug: 'retrovisores', labelKey: 'category.retrovisores', icon: ICONS.mirror },
      { slug: 'limpeza', labelKey: 'category.limpeza', icon: ICONS.spray },
      { slug: 'pintura', labelKey: 'category.pintura', icon: ICONS.paint },
      { slug: 'lampada-farol', labelKey: 'category.lampada-farol', icon: ICONS.bulb },
    ],
  },
  {
    slug: 'rider',
    labelKey: 'section.rider',
    categories: [
      { slug: 'capacetes', labelKey: 'category.capacetes', icon: ICONS.helmet },
      { slug: 'luvas', labelKey: 'category.luvas', icon: ICONS.glove },
      { slug: 'jaquetas', labelKey: 'category.jaquetas', icon: ICONS.jacket },
    ],
  },
];

export function getSection(slug: string): Section | undefined {
  return catalog.find((s) => s.slug === slug);
}

export function getCategory(sectionSlug: string, categorySlug: string): Category | undefined {
  return getSection(sectionSlug)?.categories.find((c) => c.slug === categorySlug);
}

// Fail loudly at import time rather than producing a silently shadowed route.
for (const section of catalog) {
  if ((RESERVED_SLUGS as readonly string[]).includes(section.slug)) {
    throw new Error(`Section slug "${section.slug}" is reserved by a static route.`);
  }
}
