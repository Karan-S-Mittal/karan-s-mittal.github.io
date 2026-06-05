# Astro Blog Writing Skill

Use this skill when the user wants to create, edit, or manage blog posts in this Astro-based personal website.

## Project Context

- **Framework**: Astro v4 with content collections
- **Content location**: `src/content/blog/`
- **Schema**: Defined in `src/content/config.ts`
- **Frontmatter fields**: `title`, `description`, `pubDate`, `updatedDate` (optional), `tags` (array), `draft` (boolean, default false)
- **Tags**: Rendered as clickable links to `/tags/{slugified-tag}/`
- **Reading time**: Auto-calculated via `src/utils/readingTime.ts` (200 WPM)
- **RSS**: Auto-generated at `/rss.xml`
- **Sitemap**: Auto-generated via `@astrojs/sitemap`

## Workflow: Create a New Post

1. **Determine slug** from the title (kebab-case, lowercase). Example: "Building GraphRAG Systems" → `building-graphrag-systems.md`
2. **Create file** at `src/content/blog/{slug}.md`
3. **Add frontmatter** exactly matching the schema:
   ```yaml
   ---
   title: "Building GraphRAG Systems"
   description: "How we architect deterministic retrieval pipelines for enterprise knowledge graphs."
   pubDate: 2026-06-04
   tags: ["GraphRAG", "RAG", "AI Architecture"]
   draft: false
   ---
   ```
4. **Validate**:
   - Title is sentence case, not all caps
   - Description is 1–2 sentences, under 160 characters for SEO
   - `pubDate` is a valid ISO date (YYYY-MM-DD)
   - Tags use Title Case consistently (check existing posts for duplicates with different casing)
   - If this is an update to an existing post, add `updatedDate`
5. **Cross-link**: If referencing a previous post, use relative Markdown links: `[earlier post](/blog/deterministic-rag-intro/)`
6. **Build check**: After writing, run `npm run build` to ensure the collection compiles

## Workflow: Publish a Draft

1. Set `draft: false` in the frontmatter
2. Ensure `pubDate` reflects the intended publication date
3. Remove `updatedDate` if it was used during drafting
4. Verify the post appears in the blog index and RSS feed

## Rules

- **Never** change the schema in `src/content/config.ts` without also updating all existing posts
- **Never** use hardcoded colors or font sizes in post Markdown — rely on global styles in `public/styles/global.css`
- **Always** slugify tags consistently: lowercase, spaces → hyphens. The tag display name preserves original casing from frontmatter
- **Always** run `npm run build` after adding or editing posts to validate the content collection
- Prefer Markdown over MDX unless interactive components are absolutely necessary

## Related Files

- `src/content/config.ts` — Zod schema for blog collections
- `src/utils/readingTime.ts` — Reading time calculation
- `src/components/BlogPostCard.astro` — Post preview card
- `src/pages/blog/index.astro` — Blog listing page
- `src/pages/blog/[...slug].astro` — Single post page
- `src/pages/tags/[tag].astro` — Tag filter page
- `src/pages/rss.xml.js` — RSS feed generation
