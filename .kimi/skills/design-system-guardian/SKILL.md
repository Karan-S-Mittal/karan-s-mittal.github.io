# Design System Guardian Skill

Use this skill when the user asks to change styles, colors, spacing, typography, or UI components on this Astro website.

## Design Tokens

All visual styles must reference CSS custom properties defined in `public/styles/global.css`. **No hardcoded values** in component styles except for media query breakpoints.

### Colors
| Token | Light | Dark |
|---|---|---|
| `--bg` | `#fafaf9` | `#0c0a09` |
| `--bg-elevated` | `#f5f5f4` | `#1c1917` |
| `--bg-inset` | `#e7e5e4` | `#292524` |
| `--text` | `#1c1917` | `#e7e5e4` |
| `--text-secondary` | `#44403c` | `#d6d3d1` |
| `--muted` | `#78716c` | `#a8a29e` |
| `--accent` | `#2563eb` | `#60a5fa` |
| `--accent-subtle` | `rgba(217,119,6,0.08)` | `rgba(245,158,11,0.1)` |
| `--border` | `#e7e5e4` | `#292524` |

### Typography
| Token | Value |
|---|---|
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif` |
| `--font-mono` | `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace` |

### Spacing & Radius
| Token | Value |
|---|---|
| `--radius-sm` | `6px` |
| `--radius` | `10px` |
| `--radius-lg` | `14px` |
| `--radius-pill` | `999px` |
| `--max-width` | `720px` |
| `--transition` | `all 0.25s cubic-bezier(0.4, 0, 0.2, 1)` |

## Rules

- **Never** introduce new color hex codes in component `<style>` blocks. Use tokens.
- **Never** use `px` for font sizes inside components. Use `rem` or the existing type scale.
- **Never** add `!important` unless fixing a third-party conflict.
- **Always** support `prefers-color-scheme: dark` when adding new surface colors or shadows.
- **Always** use the existing `.btn`, `.card`, `.tag` utility classes instead of recreating their styles.
- **Always** test responsive behavior at `640px` and `720px` breakpoints.

## Component Patterns

### Cards
Use `.card` or the established card pattern:
```css
.my-card {
  padding: 1.5rem;
  border-radius: var(--radius);
  background: var(--bg-elevated);
  transition: var(--transition);
}
.my-card:hover {
  background: var(--bg-inset);
}
```

### Buttons
Use `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost` from global CSS.

### Tags
Use `.tag` from global CSS. For clickable tags, add `.tag-link` which applies hover states.

## Adding a New Component

1. Create `.astro` file in `src/components/`
2. Accept props via an `interface Props` block
3. Use scoped `<style>` for layout-specific rules only
4. Use global tokens for colors, spacing, radius, transitions
5. Import and use in the target page
6. Run `npm run build` to verify no CSS conflicts

## Related Files

- `public/styles/global.css` — Source of truth for all design tokens and base styles
- `src/layouts/Layout.astro` — Global layout, header/footer, meta
- `src/components/Header.astro` — Navigation patterns
- `src/components/Footer.astro` — Footer patterns
