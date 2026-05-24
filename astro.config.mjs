import { defineConfig } from 'astro/config';

// GitHub Pages user site config
// If using a custom domain later, update 'site' to 'https://yourdomain.com'
// and add a public/CNAME file containing 'yourdomain.com'.
export default defineConfig({
  site: 'https://karan-s-mittal.github.io',
  base: '/',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
