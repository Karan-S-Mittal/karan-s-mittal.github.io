# Soft Architecture — Personal Design System & Engineering Specification

**Owner:** Karan Mittal  
**Version:** 1.0  
**Status:** Implementation-ready  
**Primary use:** Personal website, long-form technical essays, case studies, diagrams, speaking pages, social derivatives, and future design-system components.

---

## 0. Purpose of This Document

This is the single source of truth for implementing **Soft Architecture**, Karan Mittal's personal design language.

The system should communicate:

> **Complex systems rendered into clarity through gentle, precise structure.**

It is not a generic pastel portfolio. It is not a generic "AI network" aesthetic. It is not a decorative design kit.

The identity comes from a consistent transformation:

**ambiguity → structure → system → evidence**

Every visual, interaction, component, diagram, and content pattern should reinforce that transformation.

When implementing or extending this system, prefer semantic consistency over visual novelty.

---

## 0.1 Coding Agent Operating Directive

When this document is supplied to a coding agent, treat it as a **design and implementation contract**, not as loose inspiration.

The agent should:

1. Inspect the existing codebase before changing architecture or dependencies.
2. Preserve the project's current framework unless a migration is explicitly requested.
3. Implement foundations before page-level polish.
4. Reuse semantic tokens and primitives instead of inventing local styles.
5. Prefer accessible HTML/CSS and progressive enhancement over animation-heavy solutions.
6. Keep architecture diagrams semantic and data-driven where practical.
7. Add or update visual/accessibility tests alongside components.
8. Avoid adding a dependency when the same outcome is reasonable with the existing stack.
9. Document any intentional deviation from this specification.
10. Never silently introduce a new color, radius, shadow, motion pattern, typeface, or diagram primitive.

### Required implementation loop

For each meaningful UI change:

```text
inspect existing implementation
        ↓
map requirement to design-system rule
        ↓
reuse / extend semantic primitive
        ↓
implement responsive + accessible states
        ↓
verify visually at canonical breakpoints
        ↓
verify interaction + keyboard + reduced motion
        ↓
document intentional deviations
```

### Priority when rules conflict

```text
accessibility
    ↓
semantic clarity
    ↓
content legibility
    ↓
system consistency
    ↓
visual novelty
```

If a requested visual effect conflicts with legibility or accessibility, preserve the underlying intent using the simplest compliant treatment.

---

# 1. Brand Foundation

## 1.1 Name

**Soft Architecture**

## 1.2 Core Feeling

Walking into a quiet engineering studio where complex systems are made legible through precise structure, gentle color, and deliberate restraint.

## 1.3 Core Tension

**Approachable precision.**  
Technical enough to signal deep engineering competence.  
Warm enough to remain human, readable, and personal.

## 1.4 Primary Positioning

> **I turn ambiguous AI problems into deterministic systems.**

This is both copy and visual metaphor.

## 1.5 Visual Narrative

The visual system should repeatedly express this progression:

```text
AMBIGUITY

 ·        ·
       ·
   ·         ·


          ↓


STRUCTURE

 ●────────●
 │        │
 ●───●────●
     │
     ●


          ↓


SYSTEM

INPUT → MODEL → DECISION → OUTPUT
```

The design itself should demonstrate the work: distillation, architecture, integration, and evidence.

---

# 2. The Five Commandments

These rules override individual component preferences.

## 2.1 Complexity is concentrated

Dense information gets one intentional place to exist.

Everything around it should breathe.

Do not distribute visual noise uniformly across a page.

## 2.2 Decoration must become information

Lines, dots, planes, motion, colors, and annotations should communicate relationships, boundaries, emphasis, sequence, or state.

Avoid purely decorative technical motifs.

## 2.3 Warmth accents precision

Blue and ink carry structure.

Pink and lavender add warmth, attention, and editorial emphasis.

Warm accents should never dominate the composition.

## 2.4 Evidence interrupts assertion

Whenever possible, show the architecture, decision, constraint, measurement, or outcome instead of merely claiming expertise.

## 2.5 Motion explains relationships

Nothing moves simply because it can.

Motion should reveal order, connection, transition, or causality.

---

# 3. Color System

## 3.1 Core Palette

| Token | Value | Role |
|---|---:|---|
| `anchor.500` | `#2676AA` | Primary brand blue; headings, links, active states, diagram nodes |
| `anchor.600` | `#246FA0` | Hover / stronger interactive blue |
| `anchor.100` | `#DCEEFF` | Subtle blue background |
| `surface.blue` | `#A2D2FF` | Soft fills, ambient shadows, secondary visual planes |
| `canvas.blue` | `#BDE0FE` | Large tinted sections, hero ambience |
| `signal.warm` | `#FFAFCC` | Attention, highlighted nodes, editorial marks |
| `signal.emphasis` | `#FFC8DD` | Soft emphasis plane; never default CTA |
| `signal.lavender` | `#CDB4DB` | Meta labels, secondary edges, inferred/async connections |
| `ink.900` | `#1A1A2E` | Primary text, dark CTA planes |
| `ink.600` | `#4A4A6A` | Secondary body copy |
| `page` | `#F8F9FC` | Global page background |
| `card` | `#FFFFFF` | Card / component surface |
| `border` | `#E8ECF4` | Default border |

### Important correction

The original `#2980B9` is visually good but marginal for small white-on-blue text.

Use **`#2676AA`** as the primary interactive blue by default.

---

## 3.2 Semantic Tokens

Never hardcode palette values inside components if a semantic token can express the intent.

```css
:root {
  /* primitives */
  --blue-100: #dceeff;
  --blue-300: #bde0fe;
  --blue-400: #a2d2ff;
  --blue-500: #2676aa;
  --blue-600: #246fa0;

  --pink-300: #ffc8dd;
  --pink-400: #ffafcc;
  --lavender-400: #cdb4db;

  --ink-900: #1a1a2e;
  --ink-600: #4a4a6a;

  --neutral-000: #ffffff;
  --neutral-050: #f8f9fc;
  --neutral-150: #e8ecf4;

  /* text */
  --text-primary: var(--ink-900);
  --text-secondary: var(--ink-600);
  --text-inverse: var(--neutral-000);
  --text-link: var(--blue-500);

  /* surfaces */
  --surface-page: var(--neutral-050);
  --surface-card: var(--neutral-000);
  --surface-subtle: var(--blue-100);
  --surface-ambient: var(--blue-300);
  --surface-inverse: var(--ink-900);

  /* borders */
  --border-default: var(--neutral-150);
  --border-accent: var(--blue-500);
  --border-muted: var(--lavender-400);

  /* interaction */
  --interactive-primary: var(--blue-500);
  --interactive-primary-hover: var(--blue-600);
  --interactive-focus: var(--blue-500);

  /* editorial / signals */
  --signal-warm: var(--pink-400);
  --signal-emphasis: var(--pink-300);
  --signal-secondary: var(--lavender-400);

  /* diagrams */
  --diagram-node-primary: var(--blue-500);
  --diagram-node-attention: var(--pink-400);
  --diagram-edge-primary: var(--blue-500);
  --diagram-edge-secondary: var(--lavender-400);
  --diagram-plane: var(--blue-100);
}
```

---

## 3.3 Color Usage Rules

### Blue
Use for:
- structural hierarchy;
- links;
- primary action;
- graph nodes;
- section indices;
- active navigation;
- key data labels.

### Pink
Use for:
- one point of attention;
- one exceptional node;
- editorial underline;
- bottleneck / decision / constraint;
- small active markers.

Do not use pink as the default primary button.

### Lavender
Use for:
- inferred relationships;
- secondary graph edges;
- metadata;
- optional / async connections;
- low-priority structural cues.

### Ink
Use for:
- body text;
- high authority surfaces;
- final decisions;
- CTA / conclusion planes.

---

# 4. Typography

## 4.1 Typefaces

**Primary:** Google Sans Flex  
**Mono:** JetBrains Mono

No third font unless there is a strong, documented reason.

---

## 4.2 Core Type Scale

| Role | Weight | Size | Line Height |
|---|---:|---:|---:|
| Display | 600–700 | 48–64px | 1.10–1.15 |
| H1 | 600–700 | 42–56px | 1.15 |
| H2 | 550–650 | 30–40px | 1.20 |
| H3 | 500–600 | 22–30px | 1.25 |
| Body Large | 400 | 18–20px | 1.65 |
| Body | 400 | 16–18px | 1.65–1.75 |
| Meta | 500 | 12–14px | 1.4 |
| Mono | 400–600 | 12–14px | 1.5 |
| Evidence Metric | 600–700 | 36–64px | 1.05 |

---

## 4.3 Variable Font Behavior

Google Sans Flex should be treated as a variable instrument, not only a weight ladder.

Suggested intent:

- **Display:** slightly tighter / more architectural
- **Body:** neutral and comfortable
- **Pull quote:** slightly wider / softer
- **Evidence metric:** compact and assertive

Do not exaggerate axes. The reader should feel the typography is considered, not experimental.

---

## 4.4 Reading Rules

Long-form essay body:

```css
.article-body {
  font-size: 18px;
  line-height: 1.7;
  max-width: 680px;
}
```

Paragraph spacing:

```css
.article-body p + p {
  margin-top: 1.5rem;
}
```

Avoid:
- ultra-light weights;
- narrow body copy;
- center-aligned long text;
- more than ~75 characters per line for article prose.

---

# 5. Spacing System

Use a 4 / 8 derived spacing scale.

```text
space-1    4px
space-2    8px
space-3    12px
space-4    16px
space-5    24px
space-6    32px
space-7    48px
space-8    64px
space-9    96px
space-10   128px
```

CSS:

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;
}
```

Do not introduce arbitrary spacing values without a concrete layout reason.

---

# 6. Layout System

## 6.1 Canonical Widths

```text
reading       680px
content       960px
architecture 1200px
wide          1440px
```

Semantic interpretation:

- **680px** — thought
- **960px** — explanation
- **1200px** — system
- **1440px** — environment / composition

---

## 6.2 Essay Rhythm

Prose remains narrow.

Complex system diagrams expand outward.

```text
                    680px prose
                  ┌────────────┐
                  │            │
                  │  writing   │
                  │            │
          ┌────────────────────────────┐
          │        960px diagram       │
          └────────────────────────────┘
                  │            │
                  │  writing   │
                  └────────────┘
```

The page should physically widen when the idea becomes systemic.

---

## 6.3 Grid

Desktop:
- 12-column grid
- 24–32px gutter
- max content width 1200–1280px for primary pages

Tablet:
- 8 columns
- 20–24px gutter

Mobile:
- 4 columns
- 16–20px gutter

Avoid cards being forced into equal-height grids if content does not support it.

---

# 7. Density Rhythm

Pages should intentionally move through visual density.

Canonical sequence:

```text
QUIET
↓
EXPLANATION
↓
COMPLEXITY
↓
EVIDENCE
↓
QUIET
```

Homepage example:

1. Hero — very sparse
2. Capabilities — moderate
3. Selected system — dense
4. Case-study proof — moderate
5. Writing — quiet
6. Dark CTA — high contrast, low complexity

Do not let every section compete at the same visual volume.

---

# 8. Surface & Component Language

## 8.1 Cards / Planes

```css
.card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(162, 210, 255, 0.12);
}
```

Hover:

- translateY(-2px)
- slightly stronger blue-tinted shadow
- no scale transform

---

## 8.2 Meta Label

Canonical form:

```text
01 · KNOWLEDGE SYSTEMS
```

Rules:
- number → blue
- separator → lavender
- category → secondary ink
- JetBrains Mono
- uppercase
- 0.05em tracking

---

## 8.3 Buttons

### Primary

- blue background
- white text
- radius 8px
- no exaggerated pill unless context requires it
- subtle 1px lift on hover

### Secondary

- transparent or white
- border
- ink text
- blue hover

### Never
- scale on hover
- bouncing
- glowing neon
- large gradients inside buttons

---

## 8.4 Dark CTA Plane

Background:
`#1A1A2E`

Use a soft radial blue glow:

```css
background:
  radial-gradient(
    circle at 85% 15%,
    rgba(162, 210, 255, 0.15),
    transparent 34%
  ),
  #1a1a2e;
```

Rules:
- white heading
- soft blue description
- blue primary button
- no pink primary CTA

Darkness represents a **decision / conclusion / conversion plane**.

---

# 9. Navigation

Preferred:
- minimal text links or floating pill;
- active item in blue;
- tiny warm accent dot / underline;
- restrained motion.

Avoid:
- oversized glassmorphism;
- excessive blur;
- animated menu gimmicks;
- large sticky sidebars unless content requires them.

---

# 10. Architecture Grammar

This is a defining part of the identity.

**No decorative topology.**

Every network, edge, node, plane, or graph visible above low background opacity must map to meaning.

---

## 10.1 Primitive 1 — Node

Represents something that exists.

Examples:
- model
- service
- datastore
- queue
- user
- API
- concept
- agent

Visual:

```text
●
```

Default:
- blue

Attention:
- pink

---

## 10.2 Primitive 2 — Solid Edge

Represents:
- direct relationship
- synchronous flow
- explicit dependency
- high-confidence connection

```text
────────
```

---

## 10.3 Primitive 3 — Dashed Edge

Represents:
- async relationship
- inferred relationship
- optional path
- secondary dependency
- eventual consistency
- external / indirect coupling

```text
- - - - -
```

Prefer lavender.

---

## 10.4 Primitive 4 — Warm Node

Represents:
- bottleneck
- decision
- constraint
- human intervention
- failure point
- insight

Only one or a very small number should appear in a diagram.

---

## 10.5 Primitive 5 — Plane

Represents:
- system boundary
- conceptual stage
- ownership boundary
- execution environment
- trust boundary

```text
╭────────────────────╮
│ inference plane    │
╰────────────────────╯
```

Use light blue background, subtle border, large internal padding.

---

# 11. Canonical Diagram Vocabulary

The implementation should eventually support these semantic elements:

1. `SystemNode`
2. `ServiceNode`
3. `ModelNode`
4. `DataStoreNode`
5. `HumanNode`
6. `AgentNode`
7. `QueueNode`
8. `BoundaryPlane`
9. `DirectEdge`
10. `AsyncEdge`
11. `AttentionNode`
12. `MetricBadge`
13. `DecisionAnnotation`
14. `ConstraintAnnotation`
15. `ExternalSystemNode`

Do not invent a new visual treatment for every diagram.

---

# 12. Architecture Annotation

Create a reusable editorial component that feels like a technical note rather than a callout box.

Example:

```text
┌─ 03 / MEMORY
│
│ KV blocks do not need to occupy
│ contiguous physical memory.
│
└─ consequence → higher utilization
```

Usage:
- essays
- talks
- case studies
- diagrams
- social cards

Styling:
- JetBrains Mono index
- thin blue rule
- compact title
- normal body type
- optional warm consequence line

Suggested component:

```tsx
<ArchitectureAnnotation
  index="03"
  label="MEMORY"
  consequence="higher utilization"
>
  KV blocks do not need to occupy contiguous physical memory.
</ArchitectureAnnotation>
```

---

# 13. Evidence Objects

Evidence Objects are compact proof fragments.

They are not generic metric cards.

They should connect:
**constraint → decision → result**

Example:

```text
01 / CONTRACT

119 API endpoints
↓
one response-model contract
↓
consistent OpenAPI surface
```

Example:

```text
02 / SCALE

500M rows
────────────
Parquet + DuckDB
< 1 sec targeted aggregation
```

Example:

```text
03 / DECISION

RAG
 ↓
GraphRAG

WHY
Cross-document relationships
were part of the question.
```

Reusable interface:

```tsx
<EvidenceObject
  index="02"
  label="SCALE"
  metric="500M rows"
  method="Parquet + DuckDB"
  outcome="< 1 sec targeted aggregation"
/>
```

---

# 14. Case Study System

Every major case study should follow the same reasoning spine.

## 14.1 01 / Ambiguity

What was not understood yet?

What was the actual uncertainty?

## 14.2 02 / Constraint

What made the problem difficult?

Examples:
- latency
- data quality
- legacy APIs
- cost
- organizational friction
- scale
- unclear ownership

## 14.3 03 / Model

What mental model made the problem manageable?

Include one diagram where useful.

## 14.4 04 / System

What architecture emerged?

Show the system.

## 14.5 05 / Decision

What was deliberately not built?

What tradeoff was accepted?

This is mandatory for serious technical case studies.

## 14.6 06 / Evidence

What changed?

Prefer:
- measured results;
- reduced complexity;
- fewer failure modes;
- improved maintainability;
- scale handled;
- response time;
- cost;
- operational clarity.

## 14.7 07 / Aftermath

What would be changed today?

What did the project teach?

Never pretend every historic design remains ideal.

---

# 15. Long-Form Essay System

## 15.1 Reading Column

Max width: **680px**

Body:
- 18px
- 1.7 line height
- 24px paragraph rhythm

---

## 15.2 Diagram Breakouts

Two modes:

### Inline
680px max

### Architecture breakout
900–960px centered

Use a subtle blue plane if extra separation is required.

---

## 15.3 Code Blocks

```css
.code-block {
  background: #1a1a2e;
  color: #f8f9fc;
  border-radius: 12px;
  border-left: 3px solid var(--blue-500);
}
```

Use JetBrains Mono.

Avoid rainbow-heavy syntax themes.

---

## 15.4 Pull Quotes

- 24px
- Google Sans Flex 500
- blue left border
- generous vertical breathing room
- no decorative quote glyph required

---

## 15.5 Section Breaks

Replace generic `<hr>` where possible with a faint topology strip:

```text
●────────●  - - -  ●────●
```

Only 3–4 nodes.

Keep opacity low.

---

# 16. Architecture Figure Component

Diagrams are a first-class content type.

Suggested contract:

```tsx
<ArchitectureFigure
  id="fig-07"
  title="Continuous batching changes the scheduling problem"
  description="Requests join and leave the active batch dynamically."
  source="Karan Mittal"
>
  {/* diagram */}
</ArchitectureFigure>
```

Suggested visual metadata:

```text
FIG 07

        [architecture diagram]

Continuous batching changes
the scheduling problem.

KM · 2026
```

A figure should be:
- linkable;
- reusable;
- exportable;
- printable;
- legible outside the article context.

---

# 17. Diagram Library

Plan a future route:

```text
/diagrams
```

Example taxonomy:

```text
RETRIEVAL

○ Vector Retrieval
○ GraphRAG Traversal
○ Hybrid Retrieval Contract


INFERENCE

○ Continuous Batching
○ KV Cache Lifecycle
○ Prefill vs Decode
○ Disaggregated Serving


AGENTS

○ Tool Execution Loop
○ State Ownership
○ Multi-agent Coordination
```

Each diagram should:
- have a canonical ID;
- link to the article where it originates;
- optionally link to talks where reused;
- be exportable for slides/social;
- retain the same architecture grammar.

Treat diagrams as intellectual assets, not disposable illustrations.

---

# 18. Motion System — "Ink, Not Bounce"

## 18.1 Scroll Reveal

```text
opacity: 0 → 1
translateY: 16px → 0
duration: ~500ms
easing: ease-out
```

---

## 18.2 Node Draw

Only animate when the drawing itself explains a relationship.

Duration:
1.2–2.0s depending on complexity.

Do not animate ambient networks every time they enter view.

---

## 18.3 Hover

Allowed:
- 1–2px lift
- subtle shadow deepening
- opacity shift
- line emphasis

Not allowed:
- spring
- bounce
- scale
- excessive glow
- arbitrary rotation

---

## 18.4 Semantic Motion Rules

### Ambient topology
Static.

### Concept entering the narrative
May draw itself.

### User interacting with a diagram
Edges may increase opacity or emphasis.

### Active system state
One relevant path may illuminate.

### Hover
Never replay full draw animation.

---

## 18.5 Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Refine implementation to avoid harming essential state transitions.

---

# 19. Responsive Behavior

Responsive design must preserve information hierarchy, not merely shrink it.

## 19.1 Hero

Desktop:
- large display;
- topology can extend into surrounding whitespace.

Mobile:
- reduce topology density;
- never let network lines intersect core copy;
- maximum 3–4 ambient nodes if background topology remains.

---

## 19.2 Diagrams

If a diagram becomes illegible:
1. simplify labels;
2. stack planes;
3. switch to horizontal scroll only as last resort;
4. provide accessible text explanation.

Never compress a 1200px architecture diagram into unreadable 360px text.

---

## 19.3 Evidence Objects

Desktop:
- may use horizontal reasoning chain.

Mobile:
- stack vertically.

Preserve sequence using arrows or rules.

---

# 20. Accessibility

Accessibility is part of the system.

Minimum goals:

- WCAG AA contrast for normal text;
- visible keyboard focus;
- semantic HTML;
- complete keyboard navigation;
- reduced-motion support;
- meaningful alt text;
- diagrams accompanied by explanatory text;
- no meaning encoded only through color.

---

## 20.1 Focus Style

Example:

```css
:focus-visible {
  outline: 2px solid var(--interactive-focus);
  outline-offset: 3px;
}
```

Do not remove outlines without replacing them.

---

## 20.2 Diagram Accessibility

Every complex diagram should have one of:

- concise `aria-label` plus nearby prose;
- `<figcaption>`;
- accessible text equivalent;
- optional "Diagram explanation" disclosure for complex systems.

Example:

```html
<figure aria-labelledby="fig-07-title">
  ...
  <figcaption id="fig-07-title">
    Continuous batching allows requests to enter and leave
    the active batch dynamically.
  </figcaption>
</figure>
```

---

# 21. Dark Mode Policy

Do **not** implement dark mode in v1 unless there is a concrete product need.

Darkness is currently semantic.

Use dark planes for:
- conclusion;
- decision;
- final CTA;
- code;
- high-authority content.

Interpretation:

```text
light = exploration / explanation / thought

dark = decision / conclusion / conversion
```

Do not dilute this relationship by automatically mirroring every page into dark mode.

---

# 22. Homepage Narrative

The homepage should answer three timelines.

## 22.1 First 5 seconds

Visitor should understand:
- name;
- domain;
- positioning;
- seriousness.

Hero:

**Karan Mittal**

> I turn ambiguous AI problems into deterministic systems.

Optional supporting sentence:
AI systems, knowledge architecture, inference engineering, and technical leadership.

---

## 22.2 First 30 seconds

Visitor should understand:
- what Karan can do;
- evidence exists;
- work is systems-oriented;
- writing demonstrates thinking.

Suggested order:

1. Hero
2. Capabilities
3. One selected system
4. Evidence
5. Selected work
6. Writing

---

## 22.3 First 3 minutes

Visitor should be able to:
- inspect a case study;
- understand decision-making quality;
- read an essay;
- inspect diagrams;
- see talks;
- contact Karan.

---

# 23. Homepage Structure

## 23.1 Hero

Contents:
- name;
- positioning;
- short supporting statement;
- primary action;
- faint semantic topology.

No large portrait required.

---

## 23.2 Capabilities

Four capability planes:

1. Knowledge Systems
2. Performance / Inference
3. Infrastructure
4. Technical Leadership

Each:
- meta label;
- one-line distillation;
- optional tiny architecture primitive.

Do not turn this into a skills keyword wall.

---

## 23.3 Selected System

Show one strong architecture example directly on the homepage.

This should be denser than the surrounding sections.

Purpose:
prove system thinking immediately.

---

## 23.4 Selected Work

2–3 case studies.

Use the standard reasoning spine.

Show:
- ambiguity;
- system;
- decision;
- evidence.

---

## 23.5 Writing

Recent essays:
- date;
- title;
- two-line excerpt;
- category.

No oversized thumbnail requirement.

Writing should feel editorial.

---

## 23.6 Speaking

Talk cards:
- topic;
- event;
- date;
- slide/video link if available.

Do not over-design.

---

## 23.7 Contact

Dark conclusion plane.

Primary message:
**Start a Project**

Secondary:
email / scheduling link.

No long contact form.

---

# 24. Design-System Component Inventory

## Foundation

- `Container`
- `Section`
- `Stack`
- `Cluster`
- `Grid`
- `Text`
- `Heading`
- `MetaLabel`

## Navigation

- `SiteNav`
- `NavLink`
- `MobileNav`

## Actions

- `Button`
- `TextLink`
- `IconLink`

## Surfaces

- `Card`
- `DarkPlane`
- `TintedPlane`

## Content

- `ArticleHeader`
- `ArticleBody`
- `PullQuote`
- `CodeBlock`
- `SectionBreak`
- `ArchitectureAnnotation`
- `EvidenceObject`

## Diagram

- `ArchitectureFigure`
- `SystemNode`
- `ModelNode`
- `DataStoreNode`
- `HumanNode`
- `AgentNode`
- `QueueNode`
- `BoundaryPlane`
- `DirectEdge`
- `AsyncEdge`
- `AttentionNode`
- `MetricBadge`

## Portfolio

- `CapabilityCard`
- `CaseStudyCard`
- `CaseStudySection`
- `TalkCard`
- `EssayCard`

---

# 25. Component State Contract

Every interactive component must define:

- default
- hover
- focus-visible
- active
- disabled, if applicable
- loading, if applicable
- reduced-motion behavior

Do not implement only the default visual state.

---

# 26. Visual Regression System

Treat brand consistency like software quality.

The design system should be testable.

Recommended checks:

## 26.1 Story / Fixture Coverage

Create isolated fixtures for:
- buttons;
- cards;
- evidence objects;
- annotations;
- nav;
- architecture primitives;
- article typography;
- dark CTA;
- case-study sections.

---

## 26.2 Screenshot Matrix

Capture at minimum:

```text
375 × 812
768 × 1024
1440 × 900
```

Optional:
```text
1920 × 1080
```

---

## 26.3 Regression Requirements

A visual change must be intentionally reviewed if it affects:

- spacing;
- type wrapping;
- button dimensions;
- card radius;
- architecture line weight;
- node position;
- page density;
- dark CTA composition.

---

## 26.4 Accessibility Tests

Automate where possible:
- contrast;
- missing accessible names;
- heading order;
- keyboard focus;
- landmarks;
- reduced-motion behavior.

---

# 27. Code Quality Rules

The design system is not separate from implementation quality.

## 27.1 Tokens First

Do not write:

```css
color: #2676aa;
```

inside ten components.

Write:

```css
color: var(--text-link);
```

---

## 27.2 No Duplicate Magic Numbers

Repeated values belong in tokens.

Examples:
- radii;
- spacing;
- shadows;
- content widths;
- durations;
- line thickness.

---

## 27.3 Component APIs Should Be Semantic

Prefer:

```tsx
<EvidenceObject tone="decision" />
```

over:

```tsx
<EvidenceObject pinkBorder={true} />
```

Prefer:

```tsx
<ArchitectureEdge relation="async" />
```

over:

```tsx
<ArchitectureEdge dashed={true} color="lavender" />
```

The code should preserve the meaning behind the design.

---

# 28. Diagram Data Model

Architecture diagrams should preferably be data-driven rather than hardcoded SVG fragments when reasonable.

Example:

```ts
type NodeKind =
  | "system"
  | "service"
  | "model"
  | "datastore"
  | "human"
  | "agent"
  | "queue"
  | "external";

type EdgeKind =
  | "direct"
  | "async"
  | "inferred"
  | "optional";

interface ArchitectureNode {
  id: string;
  label: string;
  kind: NodeKind;
  attention?: boolean;
}

interface ArchitectureEdge {
  from: string;
  to: string;
  kind: EdgeKind;
  label?: string;
}
```

This allows:
- consistent styling;
- accessible text generation;
- future export;
- reuse across site and slides.

---

# 29. Design-System Folder Strategy

Suggested structure:

```text
src/
  design-system/
    tokens/
      color.css
      spacing.css
      typography.css
      motion.css
      layout.css

    primitives/
      Button/
      Card/
      MetaLabel/
      Text/
      Section/

    editorial/
      ArchitectureAnnotation/
      EvidenceObject/
      PullQuote/
      SectionBreak/

    architecture/
      ArchitectureFigure/
      nodes/
      edges/
      planes/
      types.ts

    portfolio/
      CapabilityCard/
      CaseStudyCard/
      TalkCard/
      EssayCard/

    tests/
      visual/
      accessibility/
```

Adapt naming to the actual framework, but preserve the conceptual separation.

---

# 30. Content Principles

The site should sound like the visual system looks.

## 30.1 Prefer

- precise;
- observant;
- systems-oriented;
- evidence-backed;
- technically literate;
- calm;
- self-aware.

## 30.2 Avoid

- "10x";
- "ninja";
- "visionary";
- hype-heavy AI language;
- exaggerated claims;
- walls of buzzwords;
- generic "I build scalable solutions";
- artificial thought-leader tone.

## 30.3 Copy Pattern

Prefer:

> The problem looked like retrieval. The failure mode was actually ownership of state.

over:

> I built an innovative next-generation RAG platform.

---

# 31. Social Derivatives

The design language should be reusable outside the website.

Canonical formats:

- article quote card;
- diagram card;
- architecture annotation card;
- evidence object card;
- talk announcement card.

All should reuse:
- same typography;
- same nodes;
- same line weights;
- same semantic colors;
- same annotation style.

Do not create a separate "social media aesthetic."

---

# 32. Presentation Derivatives

When used in slides:

- increase whitespace;
- preserve diagram grammar;
- use fewer elements per frame;
- retain blue structure + warm attention;
- use dark slides only for conclusion / transition / emphasis;
- avoid turning website cards into slide cards mechanically.

The language should transfer; the layout should adapt.

---

# 33. Agent Implementation Instructions

When a coding agent uses this document:

## 33.1 Preserve Intent

Do not reinterpret the system into:
- glassmorphism;
- cyberpunk;
- neon AI;
- generic SaaS;
- Material Design clone;
- Apple clone;
- maximal pastel.

---

## 33.2 Build in This Order

1. primitives / semantic tokens
2. typography specimen
3. layout containers
4. hero
5. meta labels
6. cards
7. architecture grammar
8. evidence object
9. annotation component
10. case-study structure
11. article template
12. dark CTA
13. visual tests
14. accessibility pass

---

## 33.3 Before Creating a New Component

Ask:

1. Does an existing primitive already express this?
2. Is this component semantic or merely a styling wrapper?
3. Will it recur at least twice?
4. Does it introduce a new visual language?
5. Can it be represented using existing tokens?

If the new component requires new colors, motion, or shape grammar, treat that as a design-system change—not a local implementation detail.

---

# 34. Anti-Patterns

Never introduce these without explicit approval:

- neon gradients;
- blurred glowing orbs as primary identity;
- dense random node backgrounds;
- animated particle fields;
- exaggerated glass panels;
- huge border-radius everywhere;
- capsule buttons by default;
- spring animation;
- hover scale;
- constant scroll-trigger animation;
- generic metric-card dashboards;
- oversized hero badges;
- massive logo clouds;
- technology logo walls;
- random pink CTA buttons;
- deep shadows;
- pure black body copy;
- gray generic box shadows;
- decorative graph edges with no meaning.

---

# 35. Hero Acceptance Criteria

The hero is correct when:

- the positioning is understood without scrolling;
- the node motif remains secondary to the copy;
- there are no more than ~5–7 meaningful nodes;
- typography is the strongest element;
- background does not resemble a generic AI stock graphic;
- one action is clearly primary;
- mobile version remains calm;
- no decorative movement is necessary to make it interesting.

---

# 36. Article Template Acceptance Criteria

A complete article template must demonstrate:

- 680px reading width;
- H1/H2/H3 rhythm;
- inline diagram;
- breakout architecture figure;
- code block;
- pull quote;
- architecture annotation;
- evidence object;
- semantic section break;
- mobile behavior;
- accessible diagram caption;
- reduced-motion behavior.

---

# 37. Diagram Acceptance Criteria

A diagram is approved when:

- every visible node represents something;
- every edge has a relationship meaning;
- dashed and solid edges are semantically distinct;
- pink identifies a true attention point;
- line weight is consistent;
- labels remain readable at intended viewport;
- accompanying text explains the diagram;
- the diagram still works without animation;
- it could be reused in an article, slide, or social post.

---

# 38. Case Study Acceptance Criteria

A major case study must include:

- ambiguity;
- constraint;
- mental model;
- architecture;
- at least one deliberate tradeoff;
- evidence;
- retrospective / aftermath.

A case study is not complete if it only lists:
- tech stack;
- features;
- screenshots;
- generic outcome.

---

# 39. Visual QA Checklist

Before merge:

- [ ] Semantic tokens used
- [ ] No unnecessary raw hex values
- [ ] Spacing comes from scale
- [ ] Contrast verified
- [ ] Keyboard focus visible
- [ ] Reduced motion verified
- [ ] Mobile composition reviewed
- [ ] No accidental layout density spike
- [ ] No meaningless node/edge decoration
- [ ] Pink usage remains sparse
- [ ] Shadows remain blue-tinted
- [ ] Dark planes remain semantic
- [ ] Typography wraps intentionally
- [ ] Screenshot regression reviewed
- [ ] Diagram has accessible explanation

---

# 40. Recommended First Build Milestone

The first implementation milestone should not be the entire site.

Build a **Soft Architecture specimen page** containing:

1. color tokens;
2. type scale;
3. spacing scale;
4. buttons;
5. card;
6. meta label;
7. architecture primitives;
8. architecture annotation;
9. evidence object;
10. article paragraph;
11. pull quote;
12. code block;
13. one architecture figure;
14. dark CTA.

If this specimen feels coherent, build the site from it.

If it does not, fix the system before multiplying components.

---

# 41. Recommended First Diagram

Build one architecture figure that demonstrates the grammar.

Suggested subject:

**LLM inference request lifecycle**

Example structure:

```text
request
   ↓
router ───── cache
   ↓
scheduler
   ↓
GPU
   ↓
stream
```

Possible semantics:

- solid line: synchronous flow
- dashed line to cache: optional path
- pink node: scheduling bottleneck / decision point
- plane: inference runtime boundary

Use this one figure to validate:
- node styling;
- edge styling;
- labels;
- annotation;
- responsive behavior;
- animation;
- export quality.

---

# 42. Recommended First Case Study

Pick one project where the system changed materially over time.

The page should make the reader understand:

```text
What looked ambiguous
       ↓
What the real constraint was
       ↓
What model made it legible
       ↓
What system was built
       ↓
What was deliberately excluded
       ↓
What changed
       ↓
What I would do differently now
```

The page itself should visually perform the same transformation.

---

# 43. Future Extensions

Not required for v1, but the system should be capable of supporting:

- diagram library;
- talk slide exports;
- article figure exports;
- social cards;
- RSS / editorial archive;
- design-system documentation;
- component explorer;
- automatic architecture figure numbering;
- data-driven diagrams;
- downloadable SVG figures;
- public design-system specimen page;
- accessibility snapshots;
- visual regression pipeline.

---

# 44. Definition of Done for Soft Architecture v1.0

Soft Architecture v1.0 is complete when:

1. tokens exist in code;
2. typography is implemented;
3. spacing/grid rules are enforced;
4. core components use semantic tokens;
5. architecture grammar exists;
6. evidence objects exist;
7. architecture annotations exist;
8. one complete case study uses the reasoning spine;
9. one complete essay uses the editorial system;
10. one diagram is reusable across contexts;
11. homepage follows the density rhythm;
12. accessibility checks pass;
13. visual regression exists at key breakpoints;
14. the site does not depend on decorative motion;
15. a new page can be designed without inventing a new aesthetic.

---

# 45. Final Design Principle

When uncertain, choose the option that makes the underlying system **more legible**.

Soft Architecture is not about making engineering softer.

It is about making complexity easier to see.


---

# 46. Iconography System

Soft Architecture iconography should feel **constructed, not illustrated**.

The icon system is an extension of the architecture grammar: precise strokes, simple geometry, calm proportions, and minimal semantic detail.

## 46.1 Core Character

Icons should feel:
- architectural;
- monoline;
- open rather than filled;
- slightly technical without looking like developer-tool glyphs;
- geometric but not mechanically perfect;
- legible at 16–24px;
- compatible with diagrams.

Icons should **not** feel:
- playful;
- bubbly;
- hand-drawn;
- emoji-like;
- heavily rounded;
- filled by default;
- cyberpunk;
- skeuomorphic.

---

## 46.2 Canonical Grid

Design on a **24 × 24** grid.

Primary sizes:
- 16px — compact metadata
- 20px — inline actions
- 24px — default UI icon
- 32px — feature / capability icon
- 48px — rare editorial illustration scale

Stroke:
- default: `1.5px`
- small 16px icon: `1.5px`
- 32–48px editorial icon: up to `1.75px`

Stroke caps:
- `round`

Stroke joins:
- `round`

Avoid 2px+ heavy icon strokes unless used for accessibility at very small sizes.

---

## 46.3 Corner Language

Canonical corner radius inside icons:
- 2px equivalent on 24px grid

Use:
- soft square corners;
- small circular nodes;
- open path endings.

Do not reproduce the 16px UI-card radius inside icons.

The icon should feel like a miniature system diagram.

---

## 46.4 Color Rules

Default icon:
`currentColor`

Semantic application:

```text
default          ink.600
strong           ink.900
interactive      anchor.500
active           anchor.500
attention        signal.warm
secondary        signal.lavender
inverse          white
```

Never make multi-color icons by default.

A second color is allowed only when it communicates a state or relationship.

Example:

```text
database outline      blue
attention node         pink
```

---

## 46.5 Canonical Icon Families

Create icons for recurring conceptual categories rather than technologies.

### System
- `system`
- `service`
- `api`
- `pipeline`
- `boundary`
- `workflow`

### Data
- `database`
- `document`
- `graph`
- `vector`
- `cache`
- `stream`

### AI
- `model`
- `agent`
- `retrieval`
- `inference`
- `tool`
- `evaluation`

### Infrastructure
- `compute`
- `gpu`
- `queue`
- `network`
- `cloud`
- `deployment`

### Editorial
- `decision`
- `constraint`
- `evidence`
- `note`
- `diagram`
- `essay`

### Interaction
- `arrow-up-right`
- `arrow-right`
- `copy`
- `download`
- `external-link`
- `menu`
- `close`

---

## 46.6 Semantic Construction Rules

Whenever possible, build icons from the same concepts used in diagrams.

Example:

### Graph
```text
●────●
 ╲
  ●
```

### Retrieval
```text
[document] → ◉
```

### Agent
```text
● → [tool]
↺
```

### Queue
```text
●  ●  ●  → 
```

### Boundary
```text
┌────────┐
│   ●    │
└────────┘
```

This creates continuity between:
- navigation icons;
- capability cards;
- diagrams;
- article annotations;
- social graphics.

---

## 46.7 Technology Logos

Do not replace semantic icons with vendor logos.

Technology logos may appear only when the technology itself is the subject.

Prefer:

```text
Inference
[semantic icon]
```

over:

```text
Inference
[NVIDIA logo]
```

The site should communicate capabilities before tools.

---

## 46.8 Icon Component Contract

Suggested interface:

```tsx
<Icon
  name="graph"
  size={20}
  tone="secondary"
  decorative={false}
/>
```

Suggested semantic tones:

```ts
type IconTone =
  | "default"
  | "strong"
  | "interactive"
  | "attention"
  | "secondary"
  | "inverse";
```

Do not expose arbitrary stroke colors unless implementing a design-system primitive.

---

## 46.9 Accessibility

Decorative icons:
```html
aria-hidden="true"
```

Interactive icon-only controls:
- must have an accessible name;
- minimum interactive target approximately 44 × 44px where practical.

Do not rely on icons alone for unfamiliar concepts.

---

# 47. Evidence Object — Rendered Design Specification

Evidence Objects are a signature Soft Architecture component.

The goal is to make proof feel like **an engineering artifact**, not a KPI dashboard.

## 47.1 Canonical Composition

```text
02 / SCALE

500M
rows processed

───────────────

Parquet + DuckDB

targeted aggregation
< 1 sec
```

But the final component should visually express a causal chain:

```text
CONTEXT
   ↓
METHOD
   ↓
OUTCOME
```

---

## 47.2 Visual Hierarchy

### Eyebrow
```text
02 / SCALE
```

- JetBrains Mono
- 12px
- 600
- uppercase
- index in blue
- slash / separator in lavender
- label in ink.600

### Primary evidence
Example:
```text
500M
rows
```

- Google Sans Flex
- metric: 48–64px
- 650–700
- `ink.900`
- unit / qualifier: 16–18px, `ink.600`

### Connector
A thin structural rule or short vertical relation.

- 1px
- low-opacity blue or lavender
- never full-width dashboard divider by default

### Method
Example:
```text
Parquet + DuckDB
```

- 16px
- medium weight
- `ink.900`

Optional mono technical qualifier below.

### Outcome
Example:
```text
< 1 sec
targeted aggregation
```

- outcome metric may use `anchor.500`
- warm pink dot may mark the key finding
- no green "success" convention unless semantic success/failure states are genuinely required

---

## 47.3 Surface

Default:

```css
.evidence-object {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(162, 210, 255, 0.12);
}
```

Recommended padding:
- desktop: 32px
- mobile: 24px

Recommended width:
- compact: 320–420px
- editorial: up to 520px

Do not force evidence objects into generic 3-column dashboard grids.

---

## 47.4 Signature Detail

Every Evidence Object may include one **evidence spine**:

```text
●
│
●
│
●
```

Meaning:

```text
context
method
outcome
```

Rules:
- 1px line;
- 3–4px nodes;
- primary nodes blue;
- final or exceptional node may be pink;
- no decorative branches.

This is the preferred visual signature.

---

## 47.5 Evidence Object Variants

### Scale
Large quantity or load.

### Decision
Choice and why it mattered.

### Constraint
A limitation that shaped the architecture.

### Reliability
Failure mode eliminated or controlled.

### Performance
Latency, throughput, utilization, cost.

### Simplification
Complexity removed.

Variants change **content hierarchy**, not the overall visual language.

---

## 47.6 Example — Scale

```text
02 / SCALE

500M
rows

 ●
 │
 ●   Parquet + DuckDB
 │
 ●   < 1 sec
     targeted aggregation
```

The bottom node is the attention point and may use pink.

---

## 47.7 Example — Decision

```text
03 / DECISION

RAG
 ↓
GraphRAG

 ●  retrieval worked
 │
 ●  relationships became part of the question
 │
 ●  graph traversal became explicit
```

Do not use giant before/after arrows as decoration.

---

# 48. Social Card System

Social content should be an **export of the design system**, not a second brand.

The same visual grammar should work on:
- LinkedIn;
- X;
- Instagram;
- event announcements;
- essay promotion;
- diagram excerpts.

---

## 48.1 Canonical Formats

### Landscape
`1200 × 675`

Use for:
- LinkedIn;
- X;
- article preview;
- talk links.

### Square
`1080 × 1080`

Use for:
- Instagram;
- carousels;
- quote / evidence cards.

### Portrait
`1080 × 1350`

Use for:
- Instagram feed;
- more editorial layouts;
- diagrams requiring vertical flow.

Do not create different visual identities per platform.

---

## 48.2 Social Card Types

Only five canonical content patterns should exist initially.

### A. Essay Card

```text
01 / ESSAY

Why LLM serving
is a scheduling problem

Short supporting line.

        sparse semantic diagram

karan mittal
```

---

### B. Diagram Card

```text
FIG 07 / INFERENCE

      [architecture diagram]

Continuous batching
changes the scheduling problem.

KM · 2026
```

The diagram is the hero.

---

### C. Evidence Card

```text
02 / SCALE

500M rows
      ↓
Parquet + DuckDB
      ↓
< 1 sec

targeted aggregation

KARAN MITTAL
```

This should feel almost like a research figure.

---

### D. Architecture Annotation Card

```text
03 / MEMORY

KV blocks do not need
to occupy contiguous
physical memory.

consequence →
higher utilization
```

The annotation itself is the composition.

---

### E. Talk Card

```text
05 / SPEAKING

The Inference
Engineering Blueprint

Latency · Throughput · FinOps

Machine Learning Indore
24 Aug 2026
```

Use an architecture fragment rather than a generic event decoration.

---

## 48.3 Social Grid

Use a 12-column layout even when rendering to fixed images.

Recommended safe area:
- landscape: 72px
- square: 72px
- portrait: 80px

Allow large whitespace.

Do not try to maximize information density.

---

## 48.4 Typography

Landscape headline:
- 54–72px

Square headline:
- 52–68px

Portrait headline:
- 58–76px

Meta:
- 18–22px mono

Body:
- 24–32px

Never shrink body text to fit excess copy.

Cut the copy.

---

## 48.5 Social Signature

Every card should contain at least **two** of these:

- mono indexed label;
- architecture edge / node;
- soft blue plane;
- warm attention node;
- lower-left or lower-right `KARAN MITTAL` / `KM`;
- semantic diagram fragment.

Do not stamp a large logo onto every card.

Recognition should come from the visual grammar.

---

## 48.6 Background Rules

Default:
`#F8F9FC`

Optional:
- subtle blue plane;
- sparse semantic topology;
- one dark conclusion card in a carousel.

Avoid:
- photographic gradient backgrounds;
- large blurred color blobs;
- arbitrary grain;
- generic AI imagery.

---

## 48.7 Carousel Narrative

When creating a multi-card carousel:

```text
1  thesis
2  context
3  system
4  evidence
5  implication
6  conclusion
```

This mirrors the website's ambiguity-to-system narrative.

A carousel should read like a miniature technical essay.

---

## 48.8 Social Export Component

Suggested API:

```tsx
<SocialCard
  format="landscape"
  type="evidence"
  index="02"
  category="SCALE"
  title="500M rows"
  body="Parquet + DuckDB"
  outcome="< 1 sec targeted aggregation"
/>
```

Rendering should use the same tokens and typography as the site.

Do not maintain manually duplicated Figma-only styles if exports can be generated from the design system.

---

## 48.9 Export Quality

Minimum:
- 2× rendering where platform pipeline benefits;
- crisp SVG architecture elements;
- text never rasterized early;
- sufficient padding for social crops;
- no essential information near edges.

---

# 49. Small-Scale Identity Test

Soft Architecture is visually mature when a viewer can recognize the system from a **small fragment**.

Test these independently:

1. one 24px icon;
2. one Evidence Object;
3. one architecture annotation;
4. one social card;
5. one diagram detail.

They should feel related without requiring:
- a logo;
- the full color palette;
- the person's name;
- a hero gradient.

If they do not, refine the grammar rather than adding decoration.
