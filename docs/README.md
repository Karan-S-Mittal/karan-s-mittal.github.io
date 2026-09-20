# Studio Documentation & Guidelines

This directory contains the central design, visual, and authoring guidelines for the **Explanatory Systems Studio**.

---

## 📚 Core Documents

| Document | Purpose & Contents |
|---|---|
| [**`design-language.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/design-language.md) | **Visual Design & Philosophy**<br>• Core identity ("Soft Architecture")<br>• Semantic color tokens (blue, rust, verified green, ink)<br>• Typography: Plus Jakarta Sans display, Inter body & diagram labels, JetBrains Mono metrics & code<br>• Tufte data-ink discipline, mechanistic layout primitives |
| [**`diagram-framework.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/diagram-framework.md) | **Diagram Framework & Primitives**<br>• Composition guidelines and reusable diagram primitives (`MemoryGrid`, `StepScrubber`)<br>• Blueprint arrows, terminal pins, vector brand marks |
| [**`authoring-workflow.md`**](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/docs/authoring-workflow.md) | **Content & Production Workflow**<br>• Code-first diagram authoring<br>• Using the `<Exhibit />` component<br>• Primary Citations & Verifications protocol<br>• Multi-platform syndication (LinkedIn Carousels & Medium) |

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
| **Post Template** | [`src/content/blog/_template.mdx`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/content/blog/_template.mdx)<br>• Master Markdown/MDX scaffold for new essays<br>• Scaffold with `npm run new` |
| **Exhibit Component** | [`src/components/editorial/Exhibit.astro`](file:///Users/kshyam/Developer/current/karan-s-mittal.github.io/src/components/editorial/Exhibit.astro)<br>• Reusable numbered frame component with badges, captions, and responsive breakout |
