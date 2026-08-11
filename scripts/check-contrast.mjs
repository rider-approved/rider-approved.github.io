// scripts/check-contrast.mjs
// Asserts every text/background token pair meets the WCAG floor in both themes.
import { readFileSync } from 'node:fs';

const CSS = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');

function parseBlock(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = CSS.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  if (!match) throw new Error(`Token block not found: ${selector}`);
  const vars = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})/);
    if (m) vars[m[1]] = m[2];
  }
  return vars;
}

function luminance(hex) {
  const channels = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [foreground, background, minimum]
// `--accent-dim` is deliberately absent from this list. It is decorative only —
// the hazard stripe and the grain tint — and never carries text or acts as an
// interactive surface, so it has no contrast floor to meet. Adding it here would
// fail, and the "fix" would be brightening it back to where it competes with the
// call-to-action, which is the exact problem it was introduced to solve.
const PAIRS = [
  ['--text', '--bg', 7],
  ['--text', '--surface', 7],
  ['--text-body', '--bg', 7],
  ['--text-body', '--surface', 7],
  ['--text-muted', '--bg', 4.5],
  ['--text-muted', '--surface', 4.5],
  ['--accent-text', '--bg', 4.5],
  ['--accent-text', '--surface', 4.5],
  ['--warn', '--bg', 4.5],
  ['--warn', '--surface', 4.5],
  ['--accent-ink', '--accent', 4.5],
];

const THEMES = { light: ':root', dark: ':root[data-theme="dark"]' };
let failed = 0;

for (const [theme, selector] of Object.entries(THEMES)) {
  const light = parseBlock(':root');
  const vars = theme === 'light' ? light : { ...light, ...parseBlock(selector) };
  for (const [fg, bg, min] of PAIRS) {
    if (!vars[fg] || !vars[bg]) {
      console.error(`FAIL ${theme}: missing token ${!vars[fg] ? fg : bg}`);
      failed++;
      continue;
    }
    const r = ratio(vars[fg], vars[bg]);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(
      `${ok ? 'PASS' : 'FAIL'} ${theme.padEnd(5)} ${fg} on ${bg}: ${r.toFixed(2)}:1 (min ${min})`
    );
  }
}

if (failed > 0) {
  console.error(`\n${failed} contrast check(s) failed.`);
  process.exit(1);
}
console.log('\nAll contrast checks passed.');
