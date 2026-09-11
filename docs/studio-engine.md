# Studio Engine

**Status:** Retired internal routes; verification script and tokens retained  
**Visuals Directory:** `/visuals/`  
**Purpose:** Make the visual system fast to inspect, repair, verify, and publish without allowing each essay to invent a new visual system.

## The operating decision

The studio is not only a design language. It is a loop:

1. Observe one concrete visual or explanatory failure.
2. Convert the diagnosis into a reusable rule.
3. Repair the shared token, primitive, component, or generator.
4. Apply the repair to the affected exhibit.
5. Verify the rendered result at desktop and narrow widths, in both themes.
6. Run the production preflight and build.

A local patch is incomplete when the same failure can still be produced elsewhere.

## Sources of truth

| Layer | Source | Responsibility |
| --- | --- | --- |
| Identity and semantics | `docs/design-language.md` | Voice, palette meanings, typography, geometry, interaction rules |
| Agent behaviour | `.agents/skills/explanatory-studio/SKILL.md` and `AGENTS.md` | Research, primary-source verification, exhibit and syndication protocol |
| Runtime tokens | `src/styles/global.css` | The values actually used by pages and components |
| Reusable primitives | `src/components/` | Tool panels, exhibit frames, flows, charts, walkthroughs, and article chrome |
| Diagram geometry | `src/lib/diagram-routing/` | Deterministic connector paths and clearance rules |
| Visuals gallery | `src/pages/visuals/index.astro` | Public gallery of architecture diagrams and standalone download pages |
| Automated preflight | `scripts/studio-check.js` | Detect invalid SVG markup, legacy language, and incomplete exhibit metadata |
| Production renderer | `scripts/render-exhibits.js` | Convert editable SVG sources into light/dark high-resolution WebP assets |

## The component ladder

Choose the lowest level that explains the mechanism:

1. **Studio panel** — repeated interface-like content with a stable indexed header, semantic status light, body, and optional property/footer rows.
2. **Static exhibit** — architecture, memory layout, before/after comparison, or a fixed causal path.
3. **Stepped walkthrough** — a small state sequence where the reader benefits from isolating each transition.
4. **Simulation** — only when changing an input and observing the resulting behaviour is the lesson.

Static SVG remains the source format for most diagrams. High-resolution WebP is the delivery format when predictable rendering and mobile inspection matter. Equations remain live KaTeX.

`src/components/StudioPanel.astro` is the shared web primitive for tool-like blocks. `src/components/AlgorithmFlow.astro` extends the same grammar for connected causal steps. Structure comes from quiet headers, grouped property rows, small state lights, precise active boundaries, and hairlines rather than nested cards or ornamental effects.

New or materially changed components enter `/studio/components/` before site-wide adoption. The showroom distinguishes production components from candidate primitives and tests the live component container at full, reading, and mobile widths. Responsive behaviour belongs to the component container when the same component can appear inside different page geometries; the showroom must not rely on viewport width alone.

## The visual issue contract

Every issue should name four things:

- **Surface:** exhibit, article, site shell, typography, or automation.
- **Location:** page, post slug, component, or exhibit number.
- **Failure:** the visible or explanatory breakdown.
- **Desired invariant:** what must remain true after the repair, including narrow widths and both themes.

The issue builder in `/studio/` produces this brief and appends the studio repair sequence automatically.

## Automation boundary

`npm run build` is the deployment-equivalent path. It now performs:

1. Tag synchronisation.
2. Studio preflight.
3. Light/dark exhibit rendering.
4. Astro production compilation.

`npm run studio:check` can be run independently while editing. Warnings identify incomplete exhibit metadata; blocking errors stop legacy styling or invalid SVG markup from entering the build.

## Next engine layers

The foundation deliberately stops before building a browser-based diagram editor. The next valuable layers are:

1. A manifest that registers every exhibit, its source, post, semantic states, outputs, and verification status.
2. Screenshot regression fixtures for the control-room primitives at wide, reading, and mobile widths.
3. A citation ledger that maps each article claim to a primary source and flags unreferenced numerical claims.
4. A syndication generator that derives carousel frames and cross-post metadata from the same exhibit manifest.

The manifest comes before more components: it is the missing link between the current production pieces and a genuinely inspectable publishing system.
