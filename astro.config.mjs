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
import fs from 'node:fs';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { normalizeTag, tagSlug } from './src/utils/tags.js';

const tagCounts = new Map();
for (const file of fg.sync('src/content/blog/*.mdx', { ignore: ['src/content/blog/_*.mdx'] })) {
  const { data } = matter(fs.readFileSync(file, 'utf8'));
  if (data.draft === true) continue;
  for (const tag of data.tags || []) {
    const key = normalizeTag(tag);
    tagCounts.set(key, (tagCounts.get(key) || 0) + 1);
  }
}

const indexableTagPaths = new Set(
  [...tagCounts]
    .filter(([, count]) => count >= 2)
    .map(([tag]) => `/tags/${tagSlug(tag)}/`),
);

// GitHub Pages user site config
// If using a custom domain later, update 'site' to 'https://yourdomain.com'
// and add a public/CNAME file containing 'yourdomain.com'.
export default defineConfig({
  site: 'https://karan-s-mittal.github.io',
  base: '/',
  // Link prefetch on hover/viewport — perceived-instant navigation, zero JS cost
  prefetch: { prefetchAll: true },
  vite: {
    build: {
      // The two route-scoped visual-engine bundles include Three.js/Mafs and
      // remain lazy-loaded. Their measured ceiling is ~532 kB minified.
      chunkSizeWarningLimit: 600,
    },
  },
  integrations: [
    // Keep redirect stubs and internal studio tooling out of the public sitemap.
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        if (/^\/tags\/[^/]+\/$/.test(pathname)) return indexableTagPaths.has(pathname);
        return !/^\/(?:contact|now|studio(?:\/.*)?|case-studies\/soft-architecture)\/?$/.test(pathname);
      },
    }),
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
