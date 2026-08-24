---
name: explanatory-studio
description: Author, illustrate, verify, and syndicate deep-tech engineering essays and exhibits for Karan Mittal's Explanatory Systems Studio. Use when writing technical blog posts, designing Excalidraw diagrams, structuring primary citations, or creating LinkedIn carousels.
---

# Explanatory Systems Studio Skill

This skill guides AI agents in researching, verifying, illustrating, and writing publication-grade deep-tech essays for Karan Mittal's personal site and distribution channels.

---

## 1. Persona & Tone

- **Voice**: Engineer-Scientist, innovator, and systems optimizer.
- **Mental Model**: Explain *mechanisms*, *bottlenecks*, *memory layouts*, and *state transitions* directly rather than talking about abstract concepts.
- **Style**: Precise, grounded, and pedagogical (like Bartosz Ciechanowski, 3Blue1Brown, and StatQuest).

---

## 2. The Primary Citation & Fact-Checking Protocol

Before writing or proposing any architectural claim or performance number:
1. **Locate Ground Truth**:
   - Query arXiv, IEEE, or official whitepapers for algorithm specs.
   - Inspect open-source source code (e.g. CUDA kernels, C++ engines, Rust drivers) for exact implementation lines.
   - Check official vendor architecture whitepapers (NVIDIA, AMD, Intel, ARM).
2. **Format Citation Table**:
   Every technical post must conclude with a `Primary Citations & Verifications` table linking directly to these primary URLs.

---

## 3. Visual Exhibit Construction

Every major visual must use the `<Exhibit />` component from `src/components/Exhibit.astro`:

```mdx
import Exhibit from '../../components/Exhibit.astro';

<Exhibit 
  exhibit="01" 
  title="KV Cache Fragmentation under Naive Attention"
  badge="BASELINE SYSTEM"
  caption="Notice how contiguous reservation for max sequence length creates 60-80% internal fragmentation.">

  ![Diagram Name](./diagrams/my-diagram.svg)

</Exhibit>
```

### Studio Color Tokens:
- **Canvas / Surface**: `#F4F7FB` (Light) / `#111820` (Dark)
- **Ink / Structure**: `#13213A` (Primary lines & labels)
- **Signal (`#1F66E5`)**: Active step, highlighted flow, current buffer, key insight.
- **Model (`#7C3AED`)**: Neural weights, model layers, learned embeddings.
- **Verified (`#168663`)**: Deterministic outputs, cache hits, validated bounds.
- **Constraint (`#D97706`)**: Headroom limits, memory pressure, lock contention.
- **Failure (`#D64545`)**: OOM threshold, cache miss, packet drop.
- **Muted (`#68768B`)**: Dimensions, byte offsets, secondary annotations.

Theme contrast rule: light diagrams may use a pale canvas, but nodes, rules, and flow lines must remain visibly inked. Dark diagrams use neutral charcoal surfaces and grey structure; blue is reserved for the active signal path rather than tinting the whole canvas.

---

## 4. Multi-Platform Syndication Workflow

When completing a post, generate the syndication outline:
- **LinkedIn Visual Carousel (4:5 Ratio / 1080x1350)**:
  - Slide 1: Hook & Core Problem Statement.
  - Slide 2: Exhibit 01 (The Failure Mode).
  - Slide 3: The Root Cause Breakdown.
  - Slide 4: Exhibit 02 (The Architectural Fix).
  - Slide 5: Benchmark / Verification Table.
  - Slide 6: Summary Takeaways + Link to full interactive essay on website.
- **Medium / Substack**:
  - Full Markdown text with embedded SVGs and canonical link header.

## 5. Layout, spacing, and text-fit contract

Every exhibit must be laid out from explicit geometry rather than adjusted by eye after export.

- Use a consistent internal canvas inset: 32 SVG units for the outer drawing area and 16 units for node content. Keep the same inset on sibling nodes.
- Use a repeatable gap scale: 16 units between adjacent nodes, 24 units between explanatory zones, and 32 units between major rows. Do not let labels or arrows define accidental spacing.
- Treat text as a first-class layout object. A label must fit inside its block with at least 16 units of horizontal breathing room on each side and 12 units of vertical room above and below. If it does not fit, shorten it, split it into `<tspan>` lines, or enlarge the block before export.
- Diagram nodes are text containers, not paragraph boxes: use Inter for short titles, Geist Mono for formulas/identifiers, and keep each node to a title plus one or two supporting lines. Move explanations into captions instead of shrinking or overflowing node text.
- Reserve at least 16 SVG units between sibling nodes for connectors. Connector labels get their own line above or below the path and must not share a baseline with node content.
- Never place a connector through a node, label, or explanatory sentence. Route it through reserved whitespace and terminate it at the node boundary.
- Connectors must start at the midpoint of the source block edge and terminate at the midpoint of the destination block edge. Use `src/lib/diagram-routing.js` when a diagram has multiple routed flows: its deterministic clearance rule keeps lanes away from node rectangles and rounds each turn. Preserve the orthogonal reading direction underneath the curves; never use diagonal shortcuts, corner anchors, or floating arrows.
- Arrowheads are directional evidence: use a single filled ink marker across the system. Active paths may use the signal stroke, but their arrowhead remains ink so direction stays legible in both themes.
- Keep titles, badges, and captions in their own zones. Exhibit headers must wrap cleanly on narrow screens; badges must never squeeze a title into an overlap.
- Use the shared table padding tokens for every prose table: `--table-cell-pad-block` and `--table-cell-pad-inline`. Tables may scroll horizontally on small screens, but text must never be clipped or forced into unreadable cells.
- Use `$...$` or `$$...$$` for mathematical expressions. Do not put equations, asymptotic notation, or variable relationships in backticks; reserve backticks for literal identifiers and code.
- Verify every exhibit at the default desktop width and at a narrow reading width. Check the rendered SVG/WebP, not only the source coordinates.

### Preflight checklist

Before calling an exhibit complete:

1. Measure the longest label against its node width and inner padding.
2. Check that no path crosses a node or text region.
3. Confirm a uniform inset and gap rhythm across sibling panels.
4. Inspect the exported asset at desktop and mobile widths.
5. Confirm tables wrap or scroll intentionally, with identical cell padding across header and body cells.
