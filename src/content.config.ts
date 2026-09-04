import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Display-only variant of `title` that may contain `<wbr>` for line-break control.
     *  `title` stays the plain-text value used for SEO/meta/RSS. */
    titleHtml: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    /** Path (from site root) to a social share card or hero header image. */
    image: z.string().optional(),
    /** Editorial caption describing the hero visual. */
    heroCaption: z.string().optional(),
  }),
});

export const collections = { blog };
