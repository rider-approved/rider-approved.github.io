// tailwind.config.mjs
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  // The theme switches via :root[data-theme="dark"] (tokens.css), NOT via the
  // OS prefers-color-scheme. Without this, `dark:` variants key off the OS and
  // silently disagree with the site's own toggle.
  darkMode: ['selector', ':root[data-theme="dark"]'],
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        line: 'var(--line)',
        'line-subtle': 'var(--line-subtle)',
        accent: 'var(--accent)',
        'accent-text': 'var(--accent-text)',
        'accent-ink': 'var(--accent-ink)',
        primary: 'var(--text)',
        body: 'var(--text-body)',
        muted: 'var(--text-muted)',
        warn: 'var(--warn)',
      },
      fontSize: {
        micro: ['0.719rem', { lineHeight: '1.3', letterSpacing: '0.15em' }],
        label: ['0.813rem', { lineHeight: '1.3', letterSpacing: '0.13em' }],
        meta: ['0.844rem', { lineHeight: '1.5' }],
        'body-sm': ['0.969rem', { lineHeight: '1.6' }],
        'body-base': ['1.031rem', { lineHeight: '1.68' }],
        verdict: ['1.094rem', { lineHeight: '1.6' }],
        h3: ['1.313rem', { lineHeight: '1.25' }],
        h1: ['2rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        display: ['2.75rem', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
      },
      borderRadius: { card: '3px', chip: '2px' },
      minHeight: { tap: '48px' },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // `font-display` — the condensed face for headings and labels. Unrelated
        // to the CSS `font-display` descriptor, which these @fontsource imports
        // already set to swap.
        display: ['Barlow Condensed', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [typography],
};
