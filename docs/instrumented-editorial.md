# Instrumented Editorial — Design Language

**Status:** Prototype · selected 2026-09-01  
**Supersedes:** Soft Architecture v1 and Calm Editorial v2  
**Core idea:** A technical journal where every important idea can be inspected.

## Position

The site is a public engineering studio, not a product dashboard or a conventional portfolio. Prose behaves like a research notebook. Exhibits behave like instruments. Evidence sits next to the claim it supports.

The recurring explanatory sequence is:

`Premise → Mechanism → Constraint → Evidence → Decision`

## Principles

1. **Quiet pages, active exhibits.** The reading surface recedes; diagrams and simulations carry visual density.
2. **Boundaries must be real.** A card exists only when an object is independently selectable, reusable, or stateful.
3. **Colour represents state.** Blue means active or selected. Rust means constraint, failure, or contention. Neutral ink carries structure.
4. **Interaction answers a question.** Scrub time, step state, change one input, compare implementations, pause, or isolate. No ambient motion.
5. **Evidence stays adjacent.** Primary sources, benchmark conditions, and implementation anchors appear near the claim.
6. **Working artifacts are publishable.** Notes, prototypes, experiments, and revisions are first-class studio output.

## Typography

- **IBM Plex Sans:** body, navigation, interface, diagram labels.
- **IBM Plex Serif:** essay titles and rare editorial statements.
- **IBM Plex Mono:** code, metadata, measurements, citations, addresses, and state labels.
- **IBM Plex Math:** mathematical extensions when required.

Body copy is 17–18px with 1.65–1.72 line height. Prose is constrained to 700px. Display text uses controlled weight rather than oversized scale.

## Palette

| Role | Light | Dark | Meaning |
| --- | --- | --- | --- |
| Canvas | `#F7F5EF` | `#111318` | Reading environment |
| Surface | `#FFFFFF` | `#181C22` | Independent object or instrument |
| Ink | `#171A1F` | `#F3F4F6` | Structure and primary text |
| Muted | `#5B6470` | `#AEB6C2` | Secondary annotation |
| Active blue | `#2857D9` | `#8DAAFF` | Current path, link, selected state |
| Constraint rust | `#A63D17` | `#FFB36B` | Failure, bottleneck, invalid state |
| Rule | `#D8D6CF` | `#2B3038` | Boundaries and measurement lines |

Do not use colour as the only carrier of meaning. Pair it with labels, line patterns, shape, or position.

## Layout

- `700px` — prose, citations, mathematical explanation.
- `1040px` — architecture exhibits, evidence comparisons, benchmarks.
- `1280px` — interactive simulations and system maps.

Global surfaces remain flat and quiet. Grids, crosshairs, rulers, registration marks, and coordinate labels belong inside exhibits only.

## Component grammar

- **System trace:** inspectable state path with direct and constraint states.
- **Exhibit:** large mechanism with label, title, state badge, and explanatory caption.
- **Evidence rail:** source, conditions, metric, and direct verification link.
- **Working note:** dated artifact in a ruled ledger, not a card.
- **Case-study spine:** premise, mechanism, constraint, evidence, decision.
- **Instrument control:** compact step, scrub, compare, isolate, pause, or reset action.

Corners are 4–8px. Pills are reserved for categorical status. Shadows are rare and never define ordinary hierarchy.

## Diagram states

- Solid graphite line — direct or physical relationship.
- Dashed neutral line — inferred, asynchronous, eventual, or optional relationship.
- Blue path — active state currently being explained.
- Rust path — contention, failure, bottleneck, or invalid state.
- Outline-only object — inactive or not yet introduced.
- Filled object — active or owned state.

## Motion

Default diagrams are stable or paused. Motion begins through a meaningful reader action and must be reversible. Reduced-motion mode removes continuous motion while preserving every state and explanation.

## Prototype scope

Instrumented Editorial is first validated on the homepage and the PagedAttention essay. Existing content and interactive engines are preserved. Other pages retain their current implementation until the prototype is reviewed.
