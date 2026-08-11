// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  // Served at the domain root, which GitHub Pages only does when the repository
  // is named exactly <owner>.github.io — here, rider-approved/rider-approved.github.io.
  // If the repo is ever renamed to anything else, base must become '/<repo-name>'
  // or every stylesheet, script and image 404s.
  site: 'https://rider-approved.github.io',
  base: '/',
  integrations: [tailwind()],
});
