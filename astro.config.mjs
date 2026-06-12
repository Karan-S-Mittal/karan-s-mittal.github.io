import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import { remarkAutoTag } from './src/plugins/remarkAutoTag.js';

// GitHub Pages user site config
// If using a custom domain later, update 'site' to 'https://yourdomain.com'
// and add a public/CNAME file containing 'yourdomain.com'.
export default defineConfig({
  site: 'https://karan-s-mittal.github.io',
  base: '/',
  integrations: [sitemap(), mdx()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkAutoTag] }),
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
