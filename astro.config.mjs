import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// GitHub Pages user site config
// If using a custom domain later, update 'site' to 'https://yourdomain.com'
// and add a public/CNAME file containing 'yourdomain.com'.
export default defineConfig({
  site: 'https://karan-s-mittal.github.io',
  base: '/',
  // Prefetch links as they approach the viewport. This keeps navigation quick
  // without downloading every page on initial load.
  prefetch: { defaultStrategy: 'viewport', prefetchAll: false },
  integrations: [
    sitemap({
      // Only real pages: the legacy routes that just redirect stay out.
      filter: (page) => {
        const path = new URL(page).pathname;
        return !/^\/(?:blog|talks|speaking|tags|topics)(?:\/|$)/.test(path) && path !== '/writing/';
      },
    }),
    mdx(),
  ],
  markdown: {
    // Astro 7 defaults to the Sätteri processor. KaTeX needs the unified
    // pipeline, so opt into it explicitly via @astrojs/markdown-remark.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
