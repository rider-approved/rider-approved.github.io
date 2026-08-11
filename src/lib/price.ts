// src/lib/price.ts
const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatBRL(value: number): string {
  return BRL.format(value);
}

/** A price older than `days` is no longer asserted. See spec §2.5. */
export function isStale(checkedAt: Date | undefined, days = 30): boolean {
  if (!checkedAt) return false;
  return Date.now() - checkedAt.getTime() > days * 86400000;
}

export function formatCheckDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}
