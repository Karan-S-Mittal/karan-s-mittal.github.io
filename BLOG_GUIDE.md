# Blog Writing Guide

A quick reference for writing posts on this Astro blog.

---

## Creating a New Post (Quick)

Run the scaffold command and follow the prompts:

```bash
npm run new
```

This creates a new post file with correct frontmatter and opens it in VS Code.

## Creating a New Post (Manual)

1. Create a file in `src/content/blog/`
2. Use `.md` for plain Markdown or `.mdx` if you need components/images
3. Add frontmatter at the top
4. Write content below the frontmatter
5. Run `npm run build` to verify

---

## Frontmatter Schema

Every post needs this block at the very top:

```yaml
---
title: "Your Post Title"
description: "One or two sentences summarizing the post. Used for SEO and previews."
pubDate: 2026-06-05
tags: ["Tag One", "Tag Two", "AI Architecture"]
draft: false
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Sentence case recommended |
| `description` | Yes | Keep under 160 characters |
| `pubDate` | Yes | `YYYY-MM-DD` format |
| `tags` | No | Array of strings. Use Title Case consistently |
| `draft` | No | `true` hides the post from production builds |
| `updatedDate` | No | Add if you significantly revise a post later |

---

## Copy-Paste Template

Save this as `src/content/blog/my-new-post.md`:

```markdown
---
title: "Your Post Title"
description: "A short summary for previews and SEO."
pubDate: 2026-06-05
tags: ["RAG", "AI Architecture"]
draft: false
---

Write your intro paragraph here. Keep it punchy.

## First Section

Your content. Use `##` for H2 headings and `###` for H3.
The Table of Contents automatically picks these up.

- Bullet points
- Work great
- For lists

1. Numbered lists
2. Also work

> Blockquotes look clean with a left blue border.

```python
# Code blocks get copy buttons automatically
def hello():
    return "world"
```

## Another Section

Link to [another post](/blog/deterministic-rag-intro/) or [external site](https://example.com).

**Bold** for emphasis. *Italic* sparingly.

---

## Markdown Quick Reference

| Element | Syntax |
|---|---|
| Heading 2 | `## Section Title` |
| Heading 3 | `### Subsection` |
| Bold | `**bold text**` |
| Italic | `*italic text*` |
| Inline code | `` `code` `` |
| Code block | ` ```lang ` |
| Link | `[text](url)` |
| Image | `![alt](url)` |
| Blockquote | `> quoted text` |
| Horizontal rule | `---` |

---

## Using Images

### Plain Markdown (works in `.md` and `.mdx`)

```markdown
![Alt text](/images/my-diagram.png)
```

Place images in the `public/` folder (e.g., `public/images/my-diagram.png`).

### Astro Image Component (`.mdx` only)

For optimized images with automatic sizing:

```mdx
import { Image } from 'astro:assets';
import myDiagram from './my-diagram.png';

<Image src={myDiagram} alt="Description" />
```

With `.mdx`, place the image next to the post file in `src/content/blog/`.

---

## Using MDX (Interactive Components)

If you need more than text — charts, diagrams, interactive demos — use `.mdx`:

```mdx
---
title: "Interactive Post"
description: "Using MDX for rich content."
pubDate: 2026-06-05
tags: ["Visualization"]
---

import MyChart from '../../components/MyChart.astro';

## Data Viz

<MyChart data={[1, 4, 2, 8]} />

Regular markdown still works below.
```

---

## Auto-Tagging

Any word in your post body that matches an existing tag is automatically linked to that tag's archive page. For example, typing `GraphRAG` in a paragraph becomes a link to `/tags/graphrag/`.

**What gets linked:**
- Tag names in paragraph text (case-insensitive)
- Aliases you define in `src/data/autoTags.json`

**What does NOT get linked:**
- Text inside code blocks or inline code
- Text inside existing links
- Text inside headings

### Adding Tag Aliases

Edit `src/data/autoTags.json` to add aliases:

```json
{
  "name": "GraphRAG",
  "slug": "graphrag",
  "aliases": ["Graph RAG", "graph rag"]
}
```

Then run `npm run sync-tags` to ensure the dictionary is up to date.

---

## Design System

Posts render inside the site's graph-paper notebook theme:

- **Headings** (`#`–`##`) are set in Fraunces (serif); body text is Inter; dates/labels use the mono voice.
- **Callouts**: wrap a note in `<div class="callout">…</div>` (MDX, or raw HTML in `.md`) for an accent-left-border panel.
- **Blockquotes** render as accent-bordered pull quotes — use them for the one claim you want remembered.
- The site has light/dark themes; never hardcode colours in post content or inline styles.

---

## Tips

- **Tags**: Use consistent casing. `"GraphRAG"` not `"graphrag"`.
- **Cross-links**: Link to other posts with relative paths: `/blog/slug-name/`.
- **Slug**: The file name becomes the URL slug. Use kebab-case: `my-post-title.md`.
- **Preview**: Run `npm run dev` and visit `http://localhost:4321/blog/`.
- **TOC**: The Table of Contents auto-generates from `##` and `###` headings. You need at least 3 headings for it to appear.
- **Drafts**: Set `draft: true` to hide a post from production. It still shows in local dev.

---

## File Structure

```
src/content/blog/
├── deterministic-rag-intro.md
├── my-new-post.md
└── another-post.mdx
```

---

## Building & Deploying

```bash
# Preview locally
npm run dev

# Regenerate tag dictionary from frontmatter
npm run sync-tags

# Scaffold a new post (opens in VS Code)
npm run new

# Build static site
npm run build

# The site auto-deploys to GitHub Pages on every push to main
```
