---
name: diagram-craft
description: Turn a supplied sketch, diagram, Mermaid flow, or plain-language system description into a simple attributed visual, a compact PNG download page, and a reusable blog component in Karan Mittal's studio.
---

# Simple diagrams for Karan Mittal

Take the supplied flow and create a finished visual. Choose sensible defaults and proceed; ask only when missing information changes the meaning. Keep the files and the result small.

## The result

- One reusable diagram file in `src/components/diagram/<Name>.astro`.
- One tiny download route in `src/pages/visuals/<slug>.astro` using `src/layouts/VisualPage.astro` (automatically discovered and listed in `/visuals/`).
- A short caption and **karansmittal** wordmark inside the artwork, included in every PNG and blog embed.
- No separate preview page, large page heading, specifications panel, or manual gallery entry needed. The download page is where the visual is inspected.

## Workflow: ASCII Blueprint First

Before writing Astro component markup or geometry:
1. **Draft a Block-Focused ASCII Schematic**: Lay out the nodes, relationships, and data flows in a clean box-drawing ASCII diagram. Focus **purely on the functional blocks and directional connectors**. Do NOT add decorative category banners, method tags (e.g. "C4 Topology"), or explanatory headers inside the diagram.
2. **Review with the author**: Align on topology, blocks, labels, junction points, and semantic tokens before generating code.
3. **Build the component**: Translate the approved ASCII blueprint into the standalone Astro diagram.

## Draw it: Minimalism & Block Focus

Preserve supplied nodes, relationships, direction, and meaning. Shorten labels without silently dropping steps. Pick the simplest useful composition: flow, layered architecture, timeline, or comparison.

- **Direct Block Focus (No Decorative Fluff)**: The diagram canvas starts directly with the top-level blocks or flows. Never add decorative inner headers, subtitles, category meta-badges (e.g., `LOCAL AGENT ARCHITECTURE / REACTIVE LOOP`), substrate banners, or runtime footers inside the canvas. The outer page (`VisualPage.astro`) or blog post prose already supplies titles and editorial context.
- **Minimalism & Text Discipline**: Keep text inside blocks minimal, punchy, and high-signal. Use crisp, single-line tags, tokens, or chips rather than paragraphs or long bullet points. Never allow inline `<code>` badges to wrap across lines (`code { white-space: nowrap; }`).
- **Iconography System (Zero Emojis)**:
  - **Strictly No Emojis**: Emojis are forbidden as architectural node icons. They break visual discipline and destroy dark-mode contrast.
  - **Monoline System Icons**: Use `@lucide/astro` (1,400+ vector glyphs, `stroke-width={1.5}`, `currentColor`, size 14–16px).
  - **Brand Logos**: Use `src/components/diagram/icons/BrandIcon.astro` or `simple-icons` for tech vendor vectors (Anthropic, Claude, Docker, Linux, Git, etc.).
  - **Fast CLI Search**: Run `npm run icon <keyword>` (or `./scripts/find-icon.js <query>`) to instantly find matching icons and their exact Astro import syntax. Supports flags `-a` (all), `-n <limit>`, `-b` (brand), `-l` (lucide), `-e` (exact).
  - **Online Directories**: Browse [lucide.dev/icons](https://lucide.dev/icons) and [simpleicons.org](https://simpleicons.org).
- **Typography & Font Tokens**:
  - `Inter` via `var(--font-diagram)` for node titles, descriptions, and labels.
  - `IBM Plex Mono` via `var(--font-mono)` for metrics, code tokens, and tags.
  - Use existing `--ie-type-*` scale; never use Serif headings inside diagram components.
- **Colors & Tokens (100% Token Compliant)**:
  - Canvas: `var(--ie-canvas)`, Surface: `var(--ie-surface)`, Rule: `var(--ie-rule)`.
  - Text: `var(--ie-ink)`, `var(--ie-ink-secondary)`, `var(--ie-muted)`.
  - Flow / Active State: `var(--ie-blue)`.
  - Dominant Constraint: At most one constraint node highlighted in rust (`var(--ie-rust)`), e.g. human permission gate or budget threshold.
  - **Never write a raw hex color.** Every color must resolve through `var(--ie-*)` or `var(--brand-*)`. Both light and dark modes must remain legible.
- **Connectors & Routing Geometry**:
  - **1.5px stroke weight** (`var(--ie-blue)` for active flow, `var(--ie-verified)` for confirmed success, `var(--ie-rust)` for constraints), stealth blueprint arrowheads, tidy bends.
  - **Precision Arrowhead Specification**: Use 8×8 viewBox markers (`refX="7"` or `6.5`, `refY="4"`, `markerWidth="6"`, `markerHeight="6"`, `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`). Compute connector coordinates so arrow tips snap precisely to node borders without clipping or awkward gaps.
  - **High-Contrast Connector Labels & Bridge Pills**: Labels on or along arrows must **never use faint muted text or sub-10px fonts**. Always enclose connector labels in an opaque surface pill (`background: var(--ie-surface); border: 1px solid var(--ie-rule-strong);`) with high-contrast text (`color: var(--ie-ink)` or `var(--ie-blue)`, `font-size: 10.5px–11.5px` / `0.6875rem`, `font-weight: 600`) so lines never collide with text and the label remains immediately legible.
  - **T-junction pins** (`r="3"` dots) only at real splits/merges.
  - **Bridge column widths**: Provide minimum 70–80px spacing for horizontal bridge labels (e.g. `Prompt · Stream`) so labels are never cramped.
  - **Downward bus branches**: Must visually align with the exact centers of target columns below.
- **Canvas & Attribution Standard**:
  - Keep canvas background-less (transparent) or on a clean white surface (`var(--ie-surface)`).
  - Do not wrap the visual in `<Exhibit />`.
  - Place `<VisualAttribution />` (the **karansmittal** wordmark) inside the artwork in the bottom-right corner, enclosed within a standard box with the same rounded corners as other diagram nodes (`var(--radius-card)`), a simple white background (`var(--ie-surface)`), and black/ink font (`var(--ie-ink)`).
- **Export & Interaction**: Keep interaction-only controls out of the image with `data-export-ignore`.

## Small download page

The component owns its diagram, caption, and signature. The shared layout owns page controls and export. A route should be roughly this small:

```astro
---
import VisualPage from '@layouts/VisualPage.astro';
import Diagram from '@components/diagram/MyDiagram.astro';
const title = 'My diagram';
const caption = 'One sentence explaining the flow.';
---
<VisualPage title={title} description={caption} targetId="my-diagram" filename="my-diagram">
  <Diagram />
</VisualPage>
```

To embed in a blog, import that same diagram component and render it directly. Do not embed the download page or duplicate the diagram markup. For external blogs, use the attributed PNG.

## Finish & Verification Workflow

1. **Preflight & Build**: Run `npm run build` (runs `studio:check` to ensure 100% token compliance across all diagrams).
2. **Headless Visual Capture**: Run `node scripts/capture-visual.js <slug>` (or `npm run visual:capture <slug>`) to automatically spin up a headless browser and render high-resolution screenshots in both **Light Mode** and **Dark Mode** into `test-results/<slug>-light.png` and `test-results/<slug>-dark.png`.
3. **Inspect Output**: View the captured PNGs using `view_file` to verify:
   - Readable labels and no clipped or overlapping text.
   - Complete connector paths and proper branch drop alignment.
   - Author signature present in the corner.
   - Contrast and visual hierarchy preserved across both light and dark themes.
4. **Deliver**: Return the visual page link and reusable component path, with a short note on verification.

For unusual visual details, consult `docs/diagram-framework.md`; runtime tokens live in `src/styles/global.css`. This skill is the delivery source of truth. Other agents can read this same Markdown file rather than maintaining divergent copies.
