# Instrumented Editorial — Working Design Language

**Status:** Active · Canonical Specification
**Site role:** Present Karan Mittal as an engineer-scientist who makes consequential systems inspectable.

## The idea

> **A technical journal where every important idea can be inspected.**

The visual system combines the authority of an editorial publication with the precision of an engineering instrument. Pages are quiet; exhibits are active. The repeated explanatory sequence is:

`Premise → Mechanism → Constraint → Evidence → Decision`

## Principles

1. **Explain before decorating.** Every visual element must clarify structure, state, sequence, evidence, or emphasis.
2. **Inspection is the signature interaction.** Readers manipulate a meaningful input and observe a meaningful result.
3. **Evidence has a visible address.** Claims connect to source, measurement, or implementation detail through a verification ledger.
4. **Quiet surrounds density.** Prose stays narrow; exhibits may widen when the mechanism needs space.
5. **Hierarchy comes from type, rules, and space.** Cards, tint, radii, and shadows are supporting tools rather than the default composition.
6. **Dark mode preserves meaning.** The hierarchy and semantic palette survive theme changes.

## Type

| Role | Typeface | Token | Use |
| --- | --- | --- | --- |
| Display & Title | Plus Jakarta Sans | `--font-display` | Page H1s, section titles, card headers, diagram titles |
| Interface & Body | Inter | `--font-sans` | Navigation, long-form reading prose, controls |
| Diagram Labels | Inter | `--font-diagram` | Technical node labels, annotations, state flags |
| Instrument | JetBrains Mono | `--font-mono` | Measurements, offsets, addresses, metadata, code |

- Reading column: **700px**, 18px body, 1.72–1.8 line height.
- Technical labels and metadata: **13px minimum**; dense diagram labels may use 12px only when geometry cannot support 13px.
- Display H1: 48–90px depending on viewport; H2: 34–52px.
- **Tufte data-ink discipline**: Kill unnecessary boxed containers; structure hierarchy with whitespace, hairline rules (`--ie-rule`), and Plus Jakarta Sans weights before adding cards.
- **Direct leader annotations**: Label subtleties directly with leader callouts (`← zero allocation here`) rather than detached legends.
- **Mechanistic primitives**: Use `<MemoryGrid />` for memory frames and tensor strides; use `<StepScrubber />` for interactive phase exploration.

## Colour

| Role | Light | Dark | Meaning |
| --- | --- | --- | --- |
| Canvas | `#F8F9FC` | `#0C0A09` | Page field |
| Surface | `#FFFFFF` | `#181C22` | Exhibit and code-adjacent plane |
| Ink | `#1A1A2E` | `#F3F4F6` | Text and direct structure |
| Secondary ink | `#4A4A6A` | `#D5D9DF` | Body and supporting explanation |
| Muted | `#5B6470` | `#AEB6C2` | Metadata, dimensions, inferred state |
| Rule | `#E8ECF4` | `#27272A` | Dividers and boundaries |
| Anchor blue | `#2676AA` | `#8DAAFF` | Links, active state, direct flow |
| Constraint rust | `#A63D17` | `#FFB36B` | Bottleneck, caveat, failure, decision |
| Verified green | `#157F5F` | `#5FD3A6` | Confirmed/validated state, success path, evidence-supported node |

Use `--ie-*` or mapped semantic tokens.

There is intentionally no separate failure color: constraint rust covers constraint, caveat, **and** failure. Do not add a fifth hue for failure/error states — route them through `--ie-rust` / `--ie-rust-soft`.

## Layout contract

- **680px:** reading and argumentative prose.
- **960px:** governing central spine across Header, Pages (Home, About, Work, Blog, Talks, Contact), and Footer.
- **1200px:** wide interactive inspection exhibits and system maps.
- No permanent background grid. Use local axes or measurement marks only inside exhibits.
- Prefer ruled registers, ledgers, and editorial lists to arrays of independent cards.

## Exhibit grammar

All meaningful figures use `<Exhibit />` with an exhibit number, descriptive title, technical badge, and accessible caption.

- 1–1.5px rules; 4–8px functional radii; no ambient shadows.
- Solid ink/blue paths are direct or synchronous.
- Dashed muted paths are async, inferred, optional, or eventual.
- Rust marks a constraint; use one dominant rust locus per figure.
- Labels use Inter; values, indices, and addresses use JetBrains Mono.
- Colour must be redundant with shape, label, line style, or position.
- Use leader callouts for surprising behaviour: `← notice zero allocation here`.

## Page rhythm

`QUIET PREMISE → EXPLANATORY PROSE → DENSE MECHANISM → CONSTRAINT → EVIDENCE → QUIET DECISION`

The homepage opens with a clear proposition and a system trace, then presents selected work as a ledger. Essays use a narrow reading column, wide numbered exhibits, an optional progress rail, and a primary-source verification ledger.

## Interaction and motion

- Animate state changes, causal paths, and transitions—not decoration.
- Prefer 120–180ms transitions for controls and 250–450ms for explanatory state changes.
- No bounce, spring, hover scale, particle fields, or ambient topology.
- Pause canvases when off-screen and respect `prefers-reduced-motion`.

## Acceptance checklist

Before calling a page or exhibit complete:

1. The explanatory sequence is legible without relying on colour.
2. Prose and exhibit widths follow the 700 / 1040 / 1280 system.
3. Every exhibit has a title, badge, caption, and accessible explanation.
4. Claims and performance numbers connect to primary evidence.
5. Desktop light, desktop dark, and mobile layouts have been inspected.
6. `npm run prebuild` and `npm run build` complete without errors.
7. Visual baselines are updated only after the new language is approved.
