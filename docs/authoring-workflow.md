# Authoring & Visual Production Workflow

This guide is the master reference for writing, illustrating, verifying, and publishing deep-tech essays using **Obsidian**, **Excalidraw**, and **Astro**.

---

## 1. Quickstart: Writing a New Post

### Option A: Using the CLI (Recommended)
Run from your terminal:
```bash
npm run new
```
Options:
* `--dry-run`: Preview generated MDX content without writing to disk.
* `--no-open`: Avoid attempting to spawn VS Code.
* `npm run new "Post Title" -d "Description" --tags "CUDA, Memory"`

This scaffolds a complete post from `src/content/blog/_template.mdx` with correct frontmatter, first-principles section headings, `<Exhibit />` examples, and Primary Citations table.

### Option B: In Obsidian
1. In Obsidian, duplicate [`src/content/blog/_template.mdx`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/content/blog/_template.mdx).
2. Rename it to `my-topic-slug.mdx`.
3. Set `draft: false` when ready for production publication.

---

## 2. Frontmatter Schema & Rules

Every post begins with this block:

```yaml
---
title: "PagedAttention: How Virtual Memory Manages the KV Cache"
description: "A first-principles breakdown of KV caching, MQA/GQA, and fixed-size block paging."
pubDate: 2026-08-24
tags: ["LLM Inference", "KV-Cache", "PagedAttention", "AI Architecture"]
draft: false
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Title Case. Use exact technical terminology; avoid clickbait. |
| `description` | Yes | 1–2 crisp sentences summarizing the mechanism (SEO and preview card). |
| `pubDate` | Yes | `YYYY-MM-DD` format. |
| `tags` | Yes | Array of Title Case strings (e.g. `["CUDA", "Memory"]`). |
| `draft` | No | Default `true`. Set `false` when ready to publish. |
| `updatedDate` | No | Optional `YYYY-MM-DD` if substantially revised. |

---

## 3. Mathematical Notation (KaTeX)

Mathematical equations are rendered statically with KaTeX:
- **Inline math**: `$M_{\mathrm{KV/token}}$` or `\(E=mc^2\)`
- **Display math**: Place `$$...$$` on its own lines:
  ```latex
  $$
  \operatorname{Attention}(Q, K, V) = \operatorname{softmax}\!\left(\frac{QK^{\mathsf T}}{\sqrt{d_k}}\right)V
  $$
  ```
- **Formula note container**: Add an explanatory breakdown below key formulas:
  ```html
  <p class="formula-note"><strong>How to read it.</strong> <code>QKᵀ</code> compares query against keys; division by <code>√dₖ</code> preserves scale...</p>
  ```

---

## 4. Drawing Diagrams with the Studio Palette

To ensure all diagrams look authored by the same studio:

1. In Obsidian, create an Excalidraw drawing in your post's directory or `public/diagrams/`:
   `public/diagrams/<post-slug>/my-diagram.excalidraw.md` (or `.svg`).
2. Open [`public/templates/studio-starter.excalidraw`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/public/templates/studio-starter.excalidraw) in Obsidian Excalidraw.
3. Copy-paste pre-styled elements:
   - **Signal Blue (`#1F66E5`)**: Active step, highlighted flow, key bottleneck.
   - **Verified Green (`#168663`)**: Checked state, deterministic result, cache hit.
   - **Constraint Amber (`#D97706`)**: Memory limit, lock contention, latency ceiling.
   - **Failure Red (`#D64545`)**: OOM, cache miss, dropped packet.
   - **Ink Navy (`#13213A`)**: Structural boxes, labels, and text.
   - **Canvas Surface (`#F4F7FB`)**: Background.
4. **Auto-Export:** With the Obsidian Excalidraw plugin set to **Auto-export SVG**, saving your drawing automatically generates `my-diagram.svg`.

---

## 5. Embedding Figures & Interactive Walkthroughs

### Standard & Raster Figures (`<Exhibit />`)
The `<Exhibit />` component handles inline SVG diagrams, standard markdown image slots, and dual light/dark raster WebP images:

```mdx
import Exhibit from '../../components/Exhibit.astro';

<Exhibit 
  exhibit="01" 
  title="Naive recomputation vs KV caching" 
  badge="COMPUTE MODEL" 
  src="/generated/exhibits/naive-vs-kv-cache.light.webp" 
  darkSrc="/generated/exhibits/naive-vs-kv-cache.dark.webp" 
  height={1200} 
  alt="Naive decoding recomputes previous token projections; KV-cached decoding reuses stored keys and values." 
  caption="At the same decoding step, the naive path projects the full sequence again; the cached path reuses the past.">
</Exhibit>
```

### Interactive Stage Walkthroughs (`<InteractiveWalkthrough />`)
For multi-stage mechanical breakdowns (with tab controls, status counters, and no-JS fallbacks):

```mdx
import InteractiveWalkthrough from '../../components/InteractiveWalkthrough.astro';

<InteractiveWalkthrough
  exhibit="04"
  title="The mechanics of PagedAttention"
  badge="PAGEDATTENTION MODEL"
  caption="Logical token blocks map to scattered physical GPU frames..."
  stages={[
    { id: 's1', index: '01', name: 'Logical blocks', desc: '...', targetGroup: 'step-group-s1' },
    { id: 's2', index: '02', name: 'Block table', desc: '...', targetGroup: 'step-group-s2' },
  ]}
>
  <svg class="sys-diagram" viewBox="0 0 800 300">
    <!-- SVG groups with matching data-step-group or id -->
  </svg>
</InteractiveWalkthrough>
```

---

## 6. Auto-Tagging & Table of Contents

- **Auto-Tagging**: Any tag name mentioned in post paragraphs is automatically linked to `/tags/<slug>/`. Aliases can be added in `src/data/autoTags.json`. Code blocks, links, headings, and tables are ignored.
- **Table of Contents (TOC)**: Automatically generated from `##` and `###` headings when a post contains at least 3 headings.

---

## 7. The Primary Citations Protocol

All architectural claims, throughput numbers, and hardware constraints must link to **Primary Sources only**:

```markdown
## Primary Citations & Verifications

| ID | Claim / Component | Primary Source | Reference / Commit |
|---|---|---|---|
| `[1]` | PagedAttention Algorithm | Kwon et al., SOSP 2023 | [arXiv:2309.06180](https://arxiv.org/abs/2309.06180) |
| `[2]` | Kernel Gather Implementation | vLLM Source Code | [`vllm/csrc/attention/attention_kernels.cu`](https://github.com/vllm-project/vllm) |
| `[3]` | Memory Bandwidth Limits | NVIDIA H100 Architecture | [NVIDIA Architecture Whitepaper](https://images.nvidia.com/aem-dam/en-zz/Solutions/data-center/h100/nvidia-h100-tensor-core-gpu-whitepaper.pdf) |
```

---

## 8. Multi-Platform Syndication (LinkedIn & Medium)

1. **LinkedIn Carousel (4:5 Ratio / 1080x1350)**:
   - **Slide 1**: Hook & Problem statement.
   - **Slide 2**: Exhibit 01 (The Failure Mode).
   - **Slide 3**: The Root Cause analysis.
   - **Slide 4**: Exhibit 02 (The Architectural Fix).
   - **Slide 5**: Primary benchmark / comparison table.
   - **Slide 6**: Key takeaways + Link to full interactive essay on your website.
2. **Medium / Substack**:
   - Copy markdown directly.
   - Embed high-res SVG/PNG exhibits.
   - Include a canonical URL header linking back to your blog post.

---

## 9. Build & Verification Commands

```bash
# Start local development server
npm run dev

# Render & verify SVG/WebP exhibits
npm run render-exhibits

# Build static production site
npm run build

# Preview production build locally
npm run preview
```
