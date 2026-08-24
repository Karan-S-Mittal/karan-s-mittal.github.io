# Studio Documentation & Guidelines

This directory contains the central design, visual, and authoring guidelines for the **Explanatory Systems Studio**.

---

## 📚 Core Documents

| Document | Purpose & Contents |
|---|---|
| [**`design-language.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/design-language.md) | **Visual Design & Philosophy**<br>• Core identity ("Soft Architecture")<br>• Semantic color tokens (Anchor blue, Signal warm, Lavender, Ink)<br>• Typography rules (Inter & JetBrains Mono)<br>• Diagram grammar, spacing, and constraints |
| [**`authoring-workflow.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/authoring-workflow.md) | **Content & Production Workflow**<br>• Obsidian vault & Excalidraw setup<br>• Using the `<Exhibit />` component<br>• Primary Citations & Verifications protocol<br>• Multi-platform syndication (LinkedIn Carousels & Medium) |
| [**`studio-engine.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/studio-engine.md) | **Studio Engine**<br>• Visual repair operating loop<br>• Runtime sources of truth<br>• Local control room and issue briefs<br>• Automated preflight and next engine layers |

## Local Inspection Surfaces

- `/studio/` — theme, token, preview, issue-brief, and automation control room.
- `/studio/components/` — live component showroom with full, reading, and mobile container previews.

---

## 🎨 Templates & Starter Assets

| Asset | Location & Usage |
|---|---|
| **Obsidian Post Template** | [`templates/post-template.md`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/templates/post-template.md)<br>• Master Markdown/MDX scaffold for new essays<br>• Also available at [`src/content/blog/_template.mdx`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/content/blog/_template.mdx) |
| **Excalidraw Studio Starter** | [`public/templates/studio-starter.excalidraw`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/public/templates/studio-starter.excalidraw)<br>• Pre-built color swatches for the 8 studio tokens<br>• Ready-to-copy memory page blocks, C4 system nodes, causal flow arrows, and leader line annotations |
| **Exhibit Component** | [`src/components/Exhibit.astro`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/components/Exhibit.astro)<br>• Reusable numbered frame component with badges, captions, and responsive breakout |
