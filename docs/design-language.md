# Explanatory Systems Studio

**Status:** Active design language · Technical Blueprint selected 2026-08-24  
**Replaces:** Warm Editorial + Interactive Explainer (2026-08-22)  
**Site role:** Establish Karan Mittal as a trustworthy engineer-scientist for teams building consequential data and AI systems.

## The idea

The site should feel like a **future-facing engineering studio**: calm, exacting, and unusually good at making difficult systems intelligible.

It is not a generic AI consultancy, a product-SaaS landing page, or a literary journal. Its central promise is simple:

> Complex systems can be made visible, inspectable, and dependable.

The reference blend is the explanatory rigor of Bartosz Ciechanowski and 3Blue1Brown, the pedagogical directness of StatQuest, and the disciplined technical presentation of GitHub Next. The result should be authored rather than corporate: an engineer's point of view, backed by evidence.

## Principles

1. **Explanation is the signature.** Every major visual should reveal how a system behaves, not decorate a page.
2. **Precision earns trust.** Use clear hierarchy, accurate language, measured spacing, and semantic color.
3. **Show the model.** Prefer a concrete system map, sequence, or experiment to an abstract claim.
4. **Make the important idea active.** Interactivity and motion exist only when they expose cause and effect.
5. **Keep the shell quiet.** Pages frame the work; they should never compete with the technical content.
6. **Be human at the point of explanation.** Use brief annotations such as “notice what changes here” to guide attention, while keeping the underlying geometry clean.

## Visual foundations

### Color

The site is light-first. Its base is a cool white workspace rather than warm paper; its structure is deep navy ink rather than black. One signal color directs attention, while additional colors have fixed technical meanings.

| Token | Value | Meaning |
| --- | --- | --- |
| Canvas | `#F4F7FB` | Page background |
| Surface | `#FFFFFF` | Diagram and content surface |
| Ink | `#13213A` | Headlines, primary structure, diagram strokes |
| Text | `#293852` | Body copy |
| Muted | `#68768B` | Metadata, supporting labels |
| Line | `#D6DEE9` | Hairlines, guides, inactive connections |
| Signal | `#1F66E5` | Current step, primary flow, key idea |
| Model | `#7C3AED` | Learned/modelled state |
| Verified | `#168663` | Guaranteed, checked, deterministic result |
| Constraint | `#D97706` | Cost, limit, contention, warning |
| Failure | `#D64545` | Error or rejected path |

Only one saturated colour should lead a diagram at a time. Secondary semantic colours appear only when their meaning matters; they are never used as decoration.

Light diagrams can be quiet without becoming faint: node boundaries and flow lines remain ink- or mid-grey-weighted against the pale canvas. Dark mode uses neutral charcoal surfaces and grey structure; blue is reserved for active state and direction, not used as the overall background cast.

### Type

Use **Inter** for interface, headings, and prose, with **Geist Mono** for labels, measurements, tags, and code. This follows the ui.com/apple.com lineage: a neutral grotesque for prose, a quiet geometric mono for evidence.

- Headlines: Inter, semibold, tracking tightened as size grows.
- Body: Inter, regular, 17–18px, generous 1.65–1.75 line height.
- Metadata and diagrams: Geist Mono, small and measured; avoid all-caps except for concise identifiers.
- Numbers are evidence. Align and tabulate them where comparison matters.

### Space and shape

- Use a broad page frame (roughly 1120px) and a comfortable reading measure (roughly 680px).
- Let diagrams break beyond the prose measure when comprehension requires it.
- Prefer open compositions, rules, and clear zones over grids of cards.
- Diagram nodes remain nearly square at 4–6px. Interface surfaces may use 8–12px radii to distinguish editable instruments from explanatory geometry.
- Avoid heavy shadows as a structural device. Use hairlines and contrast first; a single low-opacity window shadow may separate an interactive panel from the canvas.

### Tool-panel grammar

Reusable blocks should feel like parts of one engineering instrument, not independent website cards.

The reference model combines three professional-interface traits:

- **[UniFi Design Center](https://design.ui.com/):** a quiet canvas, object groups, compact telemetry rows, and a precise blue outline for the active surface.
- **[macOS materials](https://developer.apple.com/design/human-interface-guidelines/materials):** sidebar-to-content hierarchy, softly separated grouped rows, and restrained material depth, with Ventura as the visual-era reference.
- **[Figma UI3](https://help.figma.com/hc/en-us/articles/23954856027159-Navigating-UI3-Figma-s-new-UI):** contextual controls and a stable distinction between canvas, navigation, and inspector surfaces.

These are behavioural references, not skins to copy. The Studio keeps Inter/Geist Mono typography, Blueprint colours, semantic engineering states, and explanatory geometry.

- Give each panel one compact header row containing identity, state, and contextual actions or metadata.
- Separate the header, content, property rows, and footer with 1px rules. Do not create nested cards inside cards.
- Use calm, lightly layered surfaces with an 8–12px corner radius. Avoid hover lift, heavy shadow, glossy fills, and decorative top bars.
- Show selection with a precise signal-blue boundary or focus ring. Show passive semantic state with a small status light; reserve rails and connector lines for causal flows. A selected panel may receive a nearly imperceptible signal tint, but never a saturated wash.
- Treat formulas, measurements, and configuration values as property rows: a muted label paired with a mono value.
- Use semantic colour locally. The panel remains neutral; only its state indicator, active control, or verified value receives colour.
- Keep controls compact and predictable. Buttons, tabs, and toggles share height, border, focus, and disabled-state rules.
- Dense is acceptable when hierarchy remains obvious. Every row must answer “what object is this, what state is it in, and what can I do here?”

Use `src/components/StudioPanel.astro` for repeated interface-like content blocks. It owns the status light, indexed header, panel surface, body, and optional action/footer zones. Use `src/components/AlgorithmFlow.astro` when those panels form a causal sequence; do not rebuild either anatomy locally in a page.

### Layout contract

Spacing is part of the explanation, not a final polish pass.

- Use a 32-unit outer inset and a 16-unit node inset in SVG exhibits.
- Use 16 units between adjacent nodes, 24 units between explanatory zones, and 32 units between major rows.
- Reserve a text-safe zone inside every block. Keep at least 16 units of horizontal padding and 12 units of vertical padding around labels. Shorten labels or use explicit `<tspan>` wrapping when the text would exceed that zone.
- Treat every diagram block as a measured text container: titles use Inter, formulas and identifiers use Geist Mono, and a block must be enlarged or split before text reaches its border. Never compress a long sentence into a single-line node.
- Use one semantic hierarchy per block: a short title, one supporting formula or state line, and optional metadata. Long explanations belong in the caption or surrounding prose, not inside the block.
- Route connectors through whitespace and end them at boundaries; never let a path pass through a block, label, or explanatory sentence.
- Connectors start at the midpoint of the source edge and terminate at the midpoint of the destination edge. Use the shared deterministic router in `src/lib/diagram-routing.js`: it reserves a clearance corridor, repels lanes from node rectangles, and rounds each turn. Multi-stage flows may be orthogonal in geometry, but their visible corners should be curved; corner-to-corner, diagonal, or floating arrows are not allowed.
- Reserve a minimum 16-unit connector corridor between sibling blocks. Connector labels sit above or below that corridor and never share the same baseline as node text.
- Use one filled ink arrowhead primitive everywhere. Active flow lines may be signal blue, but the arrowhead stays ink for reliable direction in both themes.
- Keep exhibit titles, badges, canvases, and captions as separate layout zones. Headers wrap; badges do not force titles into collisions.
- All prose tables use the shared `--table-cell-pad-block` and `--table-cell-pad-inline` tokens. On narrow screens, a table may scroll horizontally, but it must retain readable line length and consistent padding.
- Use KaTeX math delimiters for equations and asymptotic notation; use code styling only for literal identifiers, tokens, and source fragments.
- Review rendered output at desktop and narrow reading widths. Source coordinates alone are not sufficient evidence of fit.

## Page language

The homepage is a concise technical brief, not a catalogue.

1. A direct proposition about dependable AI and data systems.
2. One visual proof of how Karan thinks: a small system or explanatory state sequence.
3. Selected work framed as problems, interventions, and outcomes.
4. Essays presented as explainers, not posts.
5. A quiet invitation to discuss a consequential system.

The header remains simple. Navigation uses plain text. Calls to action are links or restrained controls; no glossy buttons, feature cards, gradient hero panels, or decorative metric counters.

## Diagram language

Diagrams are the site’s evidence layer. They should be assembled from a small repeatable vocabulary, not authored as unrelated SVG illustrations.

### Primitives

- **Frame:** an optional title, a short context line, a surface, and an explanatory caption.
- **Boundary:** a lightly outlined region that groups a subsystem.
- **Node:** a component, store, actor, or operation.
- **State capsule:** a compact dynamic value such as a token sequence, queue, or request.
- **Connection:** a directional relationship. A bright segment denotes the active causal path.
- **Measure:** a number, scale, or capacity limit placed next to the concept it qualifies.
- **Annotation:** a short human guide, connected by a fine leader line.
- **Step:** a named state in an explanation. Only the changing elements gain colour or motion.

### Rules

- Use a shared `viewBox`, Geist Mono labels, 1.5px base strokes, rounded line caps, and one arrowhead shape.
- Nodes carry meaning through label and relationship before colour. Never rely on colour alone.
- Use a reading direction—left to right or top to bottom—and make the exceptional path visually obvious.
- Annotate the surprising behavior, not every object.
- Default to static, accessible SVG. Add Canvas only for simulations with many moving marks or continuously evolving state.
- Diagrams must remain understandable without motion and at narrow screen widths.

### Interaction

Interactions follow a strict rule: **a reader changes a meaningful input and observes the resulting behavior.**

Good: scrubbing decoding steps, increasing sequence length, moving a request through a queue, toggling a cache strategy.  
Avoid: decorative parallax, looping ambient motion, draggable nodes with no explanatory purpose, and interactions whose result is not described in nearby prose.

Use three levels of effort:

1. **Static exhibit** — the default for an architecture or concept map.
2. **Stepped exhibit** — reader progresses through a small number of states using scroll or controls.
3. **Simulation** — bespoke Canvas/JavaScript only when behavior over time is the lesson.

## Implementation stance

Astro remains the site shell. The diagram system is a family of local components, backed by design tokens:

- SVG is the default rendering medium.
- D3 is used selectively for maths and interaction: scales, layouts, forces, drag behavior, interpolation, and transitions.
- Observable Plot is used for conventional data charts.
- ELK.js is optional when a large directed graph needs automatic layout; it supplies positions, not visual style.
- No React/React Flow for the public essay system. The site is explaining systems, not presenting an editor.

The first implementation target is the PagedAttention essay. It becomes the proving ground for the primitives, palette, annotations, and one stepped explanatory interaction. Only after it feels coherent should the homepage and remaining essays inherit the system.

## Things we deliberately avoid

- Warm-paper editorial styling and dominant display serifs
- Product-dashboard card grids and blue-gradient AI clichés
- Visual noise masquerading as technical depth
- Every diagram having a different palette, stroke, or label style
- Motion that cannot answer “what changed, and why?”
