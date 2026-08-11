// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/products',
    // Default generateId slugifies the full path; we need the directory path verbatim.
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      brand: z.string().optional(),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            kind: z.enum(['product', 'lifestyle']).default('product'),
            position: z.string().optional(),
          })
        )
        .default([]),
      verdict: z.object({
        text: z.string(),
        by: z.string(),
        bike: z.string().optional(),
        km: z.number().optional(),
      }),
      buyLinks: z
        .array(
          z.object({
            label: z.string(),
            url: z.string().url(),
            price: z.number().optional(),
            checkedAt: z.coerce.date().optional(),
            featured: z.boolean().default(false),
          })
        )
        .default([]),
      specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      adaptation: z.array(z.string()).default([]),
      testimonials: z
        .array(
          z.object({
            text: z.string(),
            by: z.string(),
            bike: z.string().optional(),
            km: z.number().optional(),
          })
        )
        .default([]),
      video: z.object({ url: z.string().url(), creditPartner: z.string().optional() }).optional(),
      moreInfo: z
        .object({
          fullSpecs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
          manual: z.array(z.object({ label: z.string(), url: z.string().url() })).optional(),
          compatibility: z.string().optional(),
          warranty: z.string().optional(),
          extra: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
        })
        .optional(),
      date: z.coerce.date(),
    }),
});

export const collections = { products };
