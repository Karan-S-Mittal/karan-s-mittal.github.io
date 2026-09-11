# Studio Documentation & Guidelines

This directory contains the central design, visual, and authoring guidelines for the **Explanatory Systems Studio**.

---

## 📚 Core Documents

| Document | Purpose & Contents |
|---|---|
| [**`design-language.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/design-language.md) | **Visual Design & Philosophy**<br>• Core identity ("Soft Architecture")<br>• Semantic color tokens (blue, rust, verified green, ink)<br>• Diagram typography (Inter & IBM Plex Mono)<br>• Diagram grammar, spacing, and constraints |
| [**`authoring-workflow.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/authoring-workflow.md) | **Content & Production Workflow**<br>• Obsidian vault & Excalidraw setup<br>• Using the `<Exhibit />` component<br>• Primary Citations & Verifications protocol<br>• Multi-platform syndication (LinkedIn Carousels & Medium) |
| [**`studio-engine.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/studio-engine.md) | **Studio Engine**<br>• Visual repair operating loop<br>• Runtime sources of truth<br>• Local control room and issue briefs<br>• Automated preflight and next engine layers |

## Shared authoring skills

- [diagram-craft](../.agents/skills/diagram-craft/SKILL.md) — sketch or flow to compact visual, signature, download page, and reusable blog component.
- [explanatory-studio](../.agents/skills/explanatory-studio/SKILL.md) — technical essays, primary citations, and requested syndication.

Read the same Markdown files from any agent. Individual visual pages (`/visuals/<slug>/`) are their own inspection surfaces.

## Visuals & Exhibits Directory

- `/visuals/` — gallery of architectural visuals and diagrams with standalone inspection and 3× PNG export.

## Durable Project Memory

- [`memory/README.md`](./memory/README.md) — current state, durable decisions, and the ordered optimization/pruning backlog used to preserve context across development sessions.

---

## 🎨 Templates & Starter Assets

| Asset | Location & Usage |
|---|---|
| **Obsidian Post Template** | [`templates/post-template.md`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/templates/post-template.md)<br>• Master Markdown/MDX scaffold for new essays<br>• Also available at [`src/content/blog/_template.mdx`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/content/blog/_template.mdx) |
| **Excalidraw Studio Starter** | [`public/templates/studio-starter.excalidraw`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/public/templates/studio-starter.excalidraw)<br>• Pre-built color swatches for the 8 studio tokens<br>• Ready-to-copy memory page blocks, C4 system nodes, causal flow arrows, and leader line annotations |
| **Exhibit Component** | [`src/components/editorial/Exhibit.astro`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/components/editorial/Exhibit.astro)<br>• Reusable numbered frame component with badges, captions, and responsive breakout |
