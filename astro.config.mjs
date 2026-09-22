import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';

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
    // Keep redirect stubs and internal studio tooling out of the public sitemap.
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        // Redirect stubs and retired sections stay out of the public sitemap.
        if (/^\/(?:blog|visuals|talks|tags|topics|publications|diagrams|ideas|work)(?:\/.*)?\/?$/.test(pathname)) return false;
        return !/^\/(?:contact|now)\/?$/.test(pathname);
      },
    }),
    mdx(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeKatex,
      ],
    }),
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
