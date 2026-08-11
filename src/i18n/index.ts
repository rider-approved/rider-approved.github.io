// src/i18n/index.ts
// Portuguese-only. The indirection is retained deliberately: extracting hardcoded
// strings from components later is the expensive retrofit, not adding routing back.
import pt from './pt.json';

const translations: Record<string, string> = pt;

export function t(key: string): string {
  return translations[key] ?? key;
}
