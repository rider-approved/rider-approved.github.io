// src/config/images.ts
export const IMAGE_PROFILES = {
  hero: { width: 1200, height: 750 },
  thumb: { width: 400, height: 300 },
  row: { width: 480, height: 360 },
  compact: { width: 600, height: 450 },
  og: { width: 1200, height: 628 },
} as const;

export type ImageProfile = keyof typeof IMAGE_PROFILES;
