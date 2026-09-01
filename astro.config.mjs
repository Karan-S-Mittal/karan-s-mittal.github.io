import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkAutoTag } from './src/plugins/remarkAutoTag.js';

// GitHub Pages user site config
// If using a custom domain later, update 'site' to 'https://yourdomain.com'
// and add a public/CNAME file containing 'yourdomain.com'.
export default defineConfig({
  site: 'https://karan-s-mittal.github.io',
  base: '/',
  // Link prefetch on hover/viewport — perceived-instant navigation, zero JS cost
  prefetch: { prefetchAll: true },
  integrations: [
    // Keep redirect stubs and internal studio tooling out of the public sitemap.
    sitemap({ filter: (page) => !/karan-s-mittal\.github\.io\/(?:contact|now|studio(?:\/.*)?)\/?$/.test(page) }),
    mdx(),
    react(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkAutoTag],
      rehypePlugins: [
        rehypeSlug,
        rehypeKatex,
        // Astro already slugs headings; this makes them linkable (spec §16 ethos)
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: { class: 'heading-anchor', ariaHidden: true, tabIndex: -1 },
            content: { type: 'text', value: '#' },
          },
        ],
      ],
    }),
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
