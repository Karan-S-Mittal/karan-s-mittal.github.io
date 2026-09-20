import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
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
    .map(([tag]) => `/topics/${tagSlug(tag)}/`),
);

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
        if (pathname === '/diagrams/') return false;
        if (pathname === '/topics/') return indexableTagPaths.size > 0;
        if (/^\/topics\/[^/]+\/$/.test(pathname)) return indexableTagPaths.has(pathname);
        if (/^\/(?:blog|visuals|talks|tags|publications)(?:\/.*)?\/?$/.test(pathname)) return false;
        return !/^\/(?:contact|now|studio(?:\/.*)?|case-studies\/soft-architecture)\/?$/.test(pathname);
      },
    }),
    mdx(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkAutoTag],
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
