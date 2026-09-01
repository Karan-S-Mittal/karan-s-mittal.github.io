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
- **Reference Models**: Bartosz Ciechanowski (mechanistic rigor), 3Blue1Brown (visual intuition), GitHub Next (disciplined presentation).
- **Style**: Precise, grounded, authoritative, and pedagogical. Avoid generic AI marketing fluff, hype words, and superficial summaries.

---

## 2. The Verification Standard: Primary Citations Only

Every architectural claim, performance metric, or algorithm breakdown must be verified against **Primary Sources**:
- **Academic Whitepapers / DOIs**: Direct links to arXiv, IEEE, ACM (e.g. `arXiv:2309.06180`).
- **Source Code & Commits**: Direct permalinks to specific lines or commit SHAs in open-source repositories (e.g. `src/runtime/proc.go#L3400`).
- **Official Specifications & RFCs**: IETF RFCs, W3C standards, CUDA/PTX programming guides, ISO docs.
- **Hardware Architecture Whitepapers**: Official vendor technical documentation (NVIDIA, AMD, Intel, Apple Silicon).

### Structured Verification Layout: `<PrimaryVerification />`
Never dump raw unstyled markdown tables for citations. Use the `<PrimaryVerification />` component to present verification evidence as structured cards with badges, claims, authors, and direct permalink buttons:

```mdx
import PrimaryVerification from '../../components/editorial/PrimaryVerification.astro';

<PrimaryVerification
  citations={[
    {
      id: "01",
      badge: "RUNTIME SPECIFICATION",
      claim: "Scalable Go scheduler M:N work-stealing algorithm with 256-slot lock-free local runqueues.",
      source: "Dmitry Vyukov",
      title: "Scalable Go Scheduler Design Document",
      url: "https://go.dev/s/go11sched",
      anchor: "src/runtime/proc.go:findrunnable()"
    },
    ...
  ]}
/>
```

---

## 3. Visual Exhibit Construction: Instrumented Editorial Grammar

All diagrams must adhere to the **Instrumented Editorial** visual grammar (`docs/design-language.md`):

### Semantic Palette:
- **Canvas / Surface**: `#F7F5EF` / `#FFFFFF` (Light), `#111318` / `#181C22` (Dark).
- **Ink / Structure**: `#171A1F` (Light), `#F3F4F6` (Dark).
- **Instrument Blue (`#2857D9`)**: Direct flows, selected controls, links, and active structures.
- **Subtle Plane (`#FBFAF6` / `#1D222A`)**: Subsystem, memory arena, or ownership boundary.
- **Constraint Rust (`#A63D17`)**: Bottlenecks, failures, decisions, and caveats only (max 1 primary rust node per diagram).
- **Muted (`#5B6470`)**: Dimensions, byte offsets, async/inferred edges, annotations, and empty slots.

### Diagram Layout & Geometry Rules:
1. **ViewBox Width**: Use `1040px` for inspection exhibits and `700px` for prose-bound figures; choose the width that preserves legible labels without crowding.
2. **Internal Inset & Padding**: Minimum 16 units of inner padding inside nodes. Text tokens must never touch or crowd rectangle borders.
3. **Typography**:
   - `IBM Plex Sans` for node titles and descriptions.
   - `IBM Plex Mono` for memory addresses, byte offsets, formulas, and code symbols.
   - Explicit `dominant-baseline="central"` on all `<text>` elements.
4. **Authentic Mechanistic Metaphors**:
   - Draw actual ring buffers with slot indices (`[0]`, `[1]`, `...`), SIMD 128-bit vector registers, memory arena bitmaps, and pointer state sets rather than generic placeholder boxes.
5. **Leader Lines**:
   - Use editorial leader callouts to highlight surprising hardware/runtime behaviors:
     `← notice zero allocation on fast path`
     `← 16 slots probed in 1 CPU cycle via SIMD`
6. **Non-Colliding Connector Routing**:
   - Connectors must start and end at block edge midpoints with rounded orthogonal turns. Never pass lines through nodes or labels.

---

---

## 4. Interactive Visual Engine (3Blue1Brown & Ciechanowski Standard)

For deep-tech essays requiring dynamic, continuous mathematical intuition or 3D systems models, use the **Explanatory Visual Engine** (`src/components/visual-engine/`):

### Reusable Core Bases:
1. **`BaseThreeElement.ts`** (3D WebGL / GPU instancing):
   - Automatic `OrbitControls`, high-DPI DPR clamping, dynamic CSS token synchronization (`ThemeBridge`), and automatic `IntersectionObserver` pause when off-screen.
   - Comprehensive WebGL memory disposal on unmount.
2. **`BaseCanvasElement.ts`** (2D Canvas high-performance particle & matrix transformation):
   - Zero-allocation object pooling, sub-pixel high-DPI scaling, and `ResizeObserver` responsiveness.
3. **`interpolations.ts`** (Mathematical easing):
   - `smoothstep`, `smootherstep`, `sigmoid`, `easeInOutCubic`, `cubicBezier2D/3D`.

### Flagship Ready-to-Embed Visuals:
- **`<NeuralNet3D layers={[4, 8, 8, 3]} />`**: 3D interactive layered network with forward inference activation pulses, backprop gradient waves, and dynamic weight pruning.
- **`<LinearTransform2D />`**: Interactive 2D matrix transformation with draggable basis vectors $\hat{i}$ and $\hat{j}$, shear, rotation, and live determinant area calculation.
- **`<MatrixComputeSpreadsheet />`**: Tabular Excel/Univer-style weight matrix calculator linked to real-time neural dot product $\mathbf{z} = \mathbf{W}\mathbf{x} + \mathbf{b}$.
- **`<LinearRegressionMafs />`**: Bidirectional 3-way synchronization between Mafs 3B1B coordinate plane, Observable Plot convex loss bowl $J(m, b)$, and Univer spreadsheet.
- **`<DiagramEngineComparison />`**: Side-by-side evaluator comparing **Rough.js (Excalidraw sketch)** and **D3 G2 Bezier Splines (ByteByteGo publication blueprint)**.

### Diagram Archetypes & Guidelines:
1. **ByteByteGo / Alex Xu Style (D3 Bezier & SVG)**:
   - Use `d3.linkHorizontal()` or cubic Bezier paths (`M x1,y1 C cx1,y1 cx2,y2 x2,y2`).
   - Terminate lines on connection pins (`<circle r="3.5">`).
   - Color code state paths: Red `#FDA4AF` (stall/chase) vs Green `#86EFAC` (prefetch/SIMD).
   - Use numbered sequence pills ($①, ②, ③$) and bold performance badges.
2. **Rough.js / Excalidraw Style**:
   - Render on high-DPI scaled `<canvas>` or `<svg>`.
   - Control jitter via `roughness` ($0.4 \to 2.2$) and `fillStyle` (`hachure`, `solid`, `zigzag`).
3. **Mafs & Observable Plot**:
   - Use Mafs for continuous vector fields and draggable geometric control points.
   - Use Observable Plot for statistical loss surfaces, convex paraboloids, and residual histograms.

---

## 5. Multi-Platform Syndication Workflow

When completing a canonical deep-dive, prepare the syndication outline:
- **LinkedIn Visual Carousel (4:5 Ratio / 1080x1350)**:
  - Slide 1: Hook & Core Problem Statement.
  - Slide 2: Exhibit 01 (The Failure Mode).
  - Slide 3: The Root Cause Breakdown.
  - Slide 4: Exhibit 02 (The Architectural Fix).
  - Slide 5: Benchmark / Verification Table.
  - Slide 6: Summary Takeaways + Link to full interactive essay on website.
- **Medium / Substack**:
  - Full Markdown text with embedded SVGs and canonical link header.

---

## 6. Preflight Checklist

Before publishing any essay:
1. Every architectural claim has a verified primary source citation.
2. All exhibits have accessible captions and proper Instrumented Editorial semantic tokens.
3. Interactive canvases pause when off-screen (`IntersectionObserver`).
4. `npm run build` compiles with 0 errors and 0 warnings.


Before calling an essay or diagram complete:
1. Measure the longest label against its node width and inner padding (ensure ≥16px breathing room).
2. Check that no connector path intersects a node or text block.
3. Confirm single ink arrowheads using the active semantic ink token across all flows.
4. Ensure all mathematical notations use `$ ... $` or `$$ ... $$` instead of code backticks.
5. Run `npm run prebuild` (`sync-tags`, `studio:check`, `render-exhibits`) and confirm 0 warnings.
6. Verify rendering in desktop light mode, desktop dark mode, and mobile viewport via screenshots.
