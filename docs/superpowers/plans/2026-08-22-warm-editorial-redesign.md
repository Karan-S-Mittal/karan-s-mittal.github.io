# Warm Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign karan-s-mittal.github.io from a generic consulting-template look into a warm editorial journal (paper background, Fraunces display, one clay accent, ruled lists instead of cards) with an interactive "Exhibit" system for essays, per the approved spec.

**Architecture:** All changes are token/CSS/page-level in the existing Astro static site plus three new components (`Exhibit.astro`, `ScrollExhibit.astro`, `EssaySeries.astro`) and one demo (`KVCacheDemo.astro`). No new dependencies, no hydration framework — interactives are vanilla JS in scoped `<script>` tags. Content collections stay; the blog schema gains two optional fields (`series`, `exhibits`).

**Tech Stack:** Astro 6, vanilla CSS (design tokens in `public/styles/global.css`), vanilla JS.

**Spec:** `docs/superpowers/specs/2026-08-22-warm-editorial-redesign-design.md`

**Testing note:** This repo has no test runner. Verification per task = `npm run build` (must exit 0) plus the grep/visual checks listed. Run `npm run dev` for the visual checks at the end.

---

### Task 1: Design tokens & base styles

**Files:**
- Modify: `public/styles/global.css:1-120` (token blocks), `:340-344` (hr)
- Modify: `src/layouts/Layout.astro:28,34` (theme-color values)
- Modify: `src/components/Header.astro:64` (theme-color values in toggle script)

- [ ] **Step 1: Replace the light-theme token block**

In `public/styles/global.css`, replace the entire `:root { ... }` block (lines 8–88) with:

```css
:root {
  color-scheme: light;

  /* Backgrounds — warm paper */
  --bg: #faf8f4;
  --bg-elevated: #f3f0e9;
  --bg-inset: #ede9e0;

  /* Text — warm ink */
  --text: #211d18;
  --text-secondary: #4a443b;
  --muted: #6e675d;

  /* Accent — burnt clay */
  --accent: #c14a21;
  --accent-hover: #9a3a18;
  --accent-subtle: rgba(193, 74, 33, 0.08);

  /* Links */
  --link: #c14a21;
  --link-hover: #9a3a18;

  /* Borders & dividers — warm hairlines */
  --border: #e5e0d5;
  --border-subtle: rgba(229, 224, 213, 0.6);

  /* Code — warm dark inset */
  --code-bg: #2a231c;
  --code-text: #ede6da;

  /* Talk type hues */
  --type-workshop: #c97a1a;
  --type-panel: #8b5cf6;
  --type-keynote: #dc2626;

  /* Spacing scale — 4px base */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-7: 3rem;      /* 48px */
  --space-8: 4rem;      /* 64px */
  --space-9: 6rem;      /* 96px */

  /* Typography scale — Minor Third (1.2) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */

  /* Radius — paper is rectangular */
  --radius-sm: 4px;
  --radius: 4px;
  --radius-lg: 6px;
  --radius-pill: 999px;

  /* Typography families */
  --font-serif: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;

  /* Layout */
  --max-width: 720px;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.25, 0.1, 0.25, 1);
  --transition: 250ms cubic-bezier(0.25, 0.1, 0.25, 1);
  --transition-slow: 350ms cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

(Deleted tokens: `--grid-line`, `--header-bg`. Both are unused after Task 2.)

- [ ] **Step 2: Replace the dark-theme token block**

Replace the entire `html[data-theme="dark"] { ... }` block (lines 90–120) with:

```css
html[data-theme="dark"] {
  color-scheme: dark;

  --bg: #171410;
  --bg-elevated: #201b15;
  --bg-inset: #2a241c;

  --text: #e8e2d8;
  --text-secondary: #cfc7b8;
  --muted: #9a9182;

  --accent: #e07850;
  --accent-hover: #ef9a78;
  --accent-subtle: rgba(224, 120, 80, 0.12);

  --link: #e07850;
  --link-hover: #ef9a78;

  --border: #332c23;
  --border-subtle: rgba(51, 44, 35, 0.6);

  --code-bg: #221c15;
  --code-text: #e8e2d8;

  --type-workshop: #e8a33d;
  --type-panel: #a78bfa;
  --type-keynote: #f87171;
}
```

- [ ] **Step 3: Warm up the base styles still in global.css**

Make these three edits in `public/styles/global.css`:

Edit A — `hr` rule (lines 340–344), replace with:

```css
hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: var(--space-7) 0;
}
```

Edit B — `h1` block (lines 174–182), replace with:

```css
h1 {
  font-family: var(--font-serif);
  font-size: clamp(var(--text-4xl), 5vw, var(--text-5xl));
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.15;
  color: var(--text);
  margin-bottom: var(--space-4);
}
```

Edit C — `.tag` block (lines 438–454), replace with quiet mono suffixes (no pill background):

```css
.tag {
  display: inline-block;
  padding: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--muted);
  background: transparent;
  white-space: nowrap;
  text-decoration: none;
  transition: color var(--transition-fast);
}
.tag::before {
  content: '#';
  color: var(--border);
  margin-right: 1px;
}
.tag:hover {
  color: var(--accent);
  text-decoration: none;
}
```

- [ ] **Step 4: Update theme-color values**

In `src/layouts/Layout.astro`:
- Line 28: `<meta name="theme-color" content="#fafaf9" />` → `<meta name="theme-color" content="#faf8f4" />`
- Line 34: `theme === 'dark' ? '#0c0a09' : '#fafaf9'` → `theme === 'dark' ? '#171410' : '#faf8f4'`

In `src/components/Header.astro` line 64:
`next === 'dark' ? '#0c0a09' : '#fafaf9'` → `next === 'dark' ? '#171410' : '#faf8f4'`

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0, no errors. Then:
Run: `grep -rn "2563eb\|60a5fa\|grid-line\|header-bg" public/styles/global.css src/`
Expected: no matches (old blue accent and deleted tokens fully gone).

- [ ] **Step 6: Commit**

```bash
git add public/styles/global.css src/layouts/Layout.astro src/components/Header.astro
git commit -m "design: warm editorial tokens — paper bg, clay accent, warm dark theme"
```

---

### Task 2: Header — journal nameplate

**Files:**
- Modify: `src/components/Header.astro` (full rewrite below)

- [ ] **Step 1: Rewrite Header.astro**

Replace the entire file with:

```astro
---
const currentPath = Astro.url.pathname;

const nav = [
  { href: '/blog', label: 'Essays' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function isActive(href: string) {
  return currentPath.startsWith(href);
}
---

<header>
  <div class="header-inner">
    <div class="nameplate">
      <a href="/" class="brand">Karan Mittal</a>
      <span class="nameplate-tag">Deterministic data &amp; AI systems</span>
    </div>
    <nav class="main-nav">
      {nav.map(item => (
        <a href={item.href} class={isActive(item.href) ? 'active' : ''}>
          {item.label}
        </a>
      ))}
    </nav>
    <div class="header-actions">
      <button class="theme-toggle" type="button" aria-label="Toggle dark mode" aria-pressed="false">
        <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>
    </div>
  </div>
</header>

<script>
  const toggle = document.querySelector('.theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function syncToggle() {
    const dark = document.documentElement.dataset.theme === 'dark';
    toggle?.setAttribute('aria-pressed', String(dark));
  }

  syncToggle();

  toggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    themeMeta?.setAttribute('content', next === 'dark' ? '#171410' : '#faf8f4');
    syncToggle();
  });
</script>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease, background-color var(--transition-fast);
  }

  .header-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--space-3) var(--space-5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
  }

  .nameplate {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
    min-width: 0;
  }

  .brand {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--text);
    letter-spacing: -0.01em;
    text-decoration: none;
    white-space: nowrap;
  }
  .brand:hover {
    color: var(--accent);
    text-decoration: none;
  }

  .nameplate-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .main-nav {
    display: flex;
    gap: var(--space-4);
    align-items: center;
  }
  .main-nav a {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    text-decoration: none;
    padding: var(--space-1) 0;
    transition: color var(--transition-fast);
  }
  .main-nav a:hover {
    color: var(--text);
    text-decoration: none;
  }
  .main-nav a.active {
    color: var(--accent);
  }

  .header-actions {
    display: flex;
    align-items: center;
  }

  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    color: var(--muted);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color var(--transition-fast);
  }
  .theme-toggle:hover {
    color: var(--text);
  }

  @media (max-width: 720px) {
    .nameplate-tag {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .header-inner {
      padding: var(--space-3);
      gap: var(--space-2);
    }
    .brand {
      font-size: 0.95rem;
    }
    .main-nav {
      gap: var(--space-3);
      overflow-x: auto;
      scrollbar-width: none;
    }
    .main-nav::-webkit-scrollbar {
      display: none;
    }
    .main-nav a {
      font-size: 0.65rem;
      white-space: nowrap;
    }
  }
</style>

<style is:global>
  /* Icon swap per theme: moon = "switch to dark", sun = "switch to light" */
  html[data-theme="dark"] .theme-toggle .icon-moon {
    display: none;
  }
  html:not([data-theme="dark"]) .theme-toggle .icon-sun {
    display: none;
  }
</style>
```

Key changes vs. old header: nav is Essays/Work/About/Contact (no more pill-style Contact link, no Community item), nameplate tagline added, no backdrop blur — the hairline bottom border appears only on scroll via the existing `header.scrolled` rule in global.css (which stays as-is).

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exit 0.
Run: `grep -n "contact-link\|backdrop-filter" src/components/Header.astro`
Expected: no matches.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro
git commit -m "design: header as journal nameplate, text-link nav"
```

---

### Task 3: Footer — mono small print

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Edit Footer.astro**

Edit A — in the frontmatter socials array, keep as-is. In the footer-nav, rename "Ideas" to "Essays":

```astro
      <nav class="footer-nav">
        <a href="/work">Work</a>
        <a href="/blog">Essays</a>
        <a href="/about">About</a>
        <a href="/talks">Talks</a>
        <a href="/tags">Tags</a>
        <a href="/rss.xml">RSS</a>
      </nav>
```

Edit B — replace the `<style>` block (lines 59–114) with:

```css
<style>
  footer {
    border-top: 1px solid var(--border);
    margin-top: var(--space-9);
  }
  .footer-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--space-5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-4);
  }
  .footer-left {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
  }
  .copyright {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--muted);
    margin: 0;
  }
  .footer-nav {
    display: flex;
    gap: var(--space-4);
  }
  .footer-nav a {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--muted);
    text-decoration: none;
    transition: color var(--transition-fast);
  }
  .footer-nav a:hover {
    color: var(--accent);
    text-decoration: none;
  }
  .footer-right {
    display: flex;
    gap: var(--space-1);
    align-items: center;
  }

  @media (max-width: 640px) {
    .footer-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-3);
      padding: var(--space-5) var(--space-4);
    }
  }
</style>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "design: footer as mono small print"
```

---

### Task 4: The Exhibit system (frame + Excalidraw integration)

**Files:**
- Create: `src/components/Exhibit.astro`
- Modify: `src/components/paged-attention/ExcalidrawContainer.astro` (rewrite)
- Modify: `src/components/paged-attention/ExcalidrawNaiveVsKVCache.astro:9-16` (forward new props)
- Modify: `src/components/paged-attention/ExcalidrawKVEvolution.astro:9-16` (same)
- Modify: `src/components/paged-attention/ExcalidrawMemoryFragmentation.astro:9-16` (same)
- Modify: `src/components/paged-attention/ExcalidrawPagedSteps.astro:10-17` (same)
- Modify: `src/components/paged-attention/ExcalidrawCopyOnWrite.astro:9-16` (same)
- Modify: `src/content/blog/paged-attention-kv-cache.mdx` (re-label the 5 diagram usages)

- [ ] **Step 1: Create Exhibit.astro**

```astro
---
/**
 * Exhibit.astro
 * Numbered figure frame — the site's signature detail.
 * Mono label above ("Exhibit 01 — Title"), hairline frame, caption below.
 * Wraps any content: Excalidraw diagrams, images, code, demos.
 */
interface Props {
  exhibit?: string;
  title?: string;
  caption?: string;
  wide?: boolean;
}

const { exhibit, title, caption, wide = false } = Astro.props;
---

<figure class:list={['exhibit', { wide }]}>
  {exhibit && (
    <p class="exhibit-label">
      Exhibit {exhibit}{title && <span class="exhibit-label-title">&mdash; {title}</span>}
    </p>
  )}
  <div class="exhibit-frame">
    <slot />
  </div>
  {caption && <figcaption class="exhibit-caption">{caption}</figcaption>}
</figure>

<style>
  .exhibit {
    margin: var(--space-6) 0;
    width: 100%;
  }

  .exhibit.wide {
    /* Break out of the reading measure on wide viewports */
  }

  .exhibit-label {
    margin: 0 0 var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .exhibit-label-title {
    color: var(--muted);
    font-weight: 400;
  }

  .exhibit-frame {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-elevated);
    overflow: hidden;
  }

  .exhibit-caption {
    margin-top: var(--space-2);
    font-size: var(--text-sm);
    color: var(--muted);
    line-height: 1.55;
  }

  @media (min-width: 960px) {
    .exhibit.wide {
      width: 110%;
      margin-left: -5%;
    }
  }
</style>
```

- [ ] **Step 2: Rewrite ExcalidrawContainer.astro**

Replace the entire file. The container keeps the Excalidraw dot-grid canvas and pastel palette, but the outer figure/label/caption/frame now come from `Exhibit.astro`:

```astro
---
/**
 * ExcalidrawContainer.astro
 * Excalidraw-style canvas (dot grid, adaptive palette) inside the site's Exhibit frame.
 */
import Exhibit from '../Exhibit.astro';

interface Props {
  caption?: string;
  badge?: string;
  exhibit?: string;
  title?: string;
}

const { caption, badge, exhibit, title } = Astro.props;
---

<Exhibit exhibit={exhibit} title={title} caption={caption}>
  <div class="ex-canvas-frame">
    {badge && <div class="ex-badge">{badge}</div>}
    <slot />
  </div>
</Exhibit>

<style is:global>
  /* Excalidraw CSS Theme Variables — recalibrated to the warm editorial palette */
  :root {
    --ex-bg: transparent;
    --ex-grid-dot: rgba(110, 103, 93, 0.18);
    --ex-border: #e5e0d5;
    --ex-text-main: #211d18;
    --ex-text-muted: #6e675d;
    --ex-card-bg: #faf8f4;
    --ex-card-border: #d8d2c4;

    /* Semantic soft pastels (Light Mode) */
    --ex-blue-bg: #eff6ff;
    --ex-blue-stroke: #3b82f6;
    --ex-blue-text: #1d4ed8;

    --ex-indigo-bg: #eef2ff;
    --ex-indigo-stroke: #6366f1;
    --ex-indigo-text: #4338ca;

    --ex-purple-bg: #faf5ff;
    --ex-purple-stroke: #a855f7;
    --ex-purple-text: #7e22ce;

    --ex-green-bg: #f0fdf4;
    --ex-green-stroke: #22c55e;
    --ex-green-text: #15803d;

    --ex-amber-bg: #fffbeb;
    --ex-amber-stroke: #f59e0b;
    --ex-amber-text: #b45309;

    --ex-rose-bg: #fff1f2;
    --ex-rose-stroke: #f43f5e;
    --ex-rose-text: #be123c;

    --ex-gray-bg: #f3f0e9;
    --ex-gray-stroke: #a8a29e;
    --ex-gray-text: #57534e;
  }

  html[data-theme="dark"] {
    --ex-bg: transparent;
    --ex-grid-dot: rgba(232, 226, 216, 0.1);
    --ex-border: #332c23;
    --ex-text-main: #e8e2d8;
    --ex-text-muted: #9a9182;
    --ex-card-bg: #201b15;
    --ex-card-border: #443b2f;

    /* Semantic soft pastels (Dark Mode) */
    --ex-blue-bg: rgba(59, 130, 246, 0.12);
    --ex-blue-stroke: #60a5fa;
    --ex-blue-text: #93c5fd;

    --ex-indigo-bg: rgba(99, 102, 241, 0.14);
    --ex-indigo-stroke: #818cf8;
    --ex-indigo-text: #c7d2fe;

    --ex-purple-bg: rgba(168, 85, 247, 0.14);
    --ex-purple-stroke: #c084fc;
    --ex-purple-text: #e9d5ff;

    --ex-green-bg: rgba(34, 197, 94, 0.12);
    --ex-green-stroke: #4ade80;
    --ex-green-text: #86efac;

    --ex-amber-bg: rgba(245, 158, 11, 0.12);
    --ex-amber-stroke: #fbbf24;
    --ex-amber-text: #fde68a;

    --ex-rose-bg: rgba(244, 63, 94, 0.14);
    --ex-rose-stroke: #fb7185;
    --ex-rose-text: #fecdd3;

    --ex-gray-bg: #2a241c;
    --ex-gray-stroke: #6e675d;
    --ex-gray-text: #cfc7b8;
  }

  .ex-canvas-frame {
    position: relative;
    background-color: var(--ex-bg);
    background-image: radial-gradient(var(--ex-grid-dot) 1.2px, transparent 1.2px);
    background-size: 20px 20px;
    padding: 1.5rem 1.25rem;
    overflow-x: auto;
  }

  .ex-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    font-family: var(--font-mono, monospace);
    font-size: 0.65rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.15rem 0.5rem;
    color: var(--ex-text-muted);
    border: 1px solid var(--ex-border);
    border-radius: 2px;
    background: var(--ex-card-bg);
  }

  .ex-svg-canvas {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
  }
</style>
```

- [ ] **Step 3: Forward the new props in all five diagram components**

In each of `ExcalidrawNaiveVsKVCache.astro`, `ExcalidrawKVEvolution.astro`, `ExcalidrawMemoryFragmentation.astro`, `ExcalidrawPagedSteps.astro`, `ExcalidrawCopyOnWrite.astro`, make the same two edits (line numbers approximate per file, the pattern is identical):

Edit A — extend the Props interface:

```ts
interface Props {
  caption?: string;
  exhibit?: string;
  title?: string;
}
```

Edit B — destructure and forward. E.g. in `ExcalidrawNaiveVsKVCache.astro`, change:

```ts
const { caption } = Astro.props;
```

to:

```ts
const { caption, exhibit, title } = Astro.props;
```

and change:

```astro
<ExcalidrawContainer caption={caption} badge="Decoding Mechanics">
```

to:

```astro
<ExcalidrawContainer caption={caption} exhibit={exhibit} title={title} badge="Decoding Mechanics">
```

Apply the identical change in the other four files (keep each file's existing `badge` value: "Architecture Evolution", "Memory Bottleneck", "Step-by-Step Architecture", "Zero-Copy Sharing"). Note: `ExcalidrawPagedSteps.astro` has a default caption in its destructuring — keep the default, just add `exhibit, title` to the destructure.

- [ ] **Step 4: Re-label the five diagram usages in the essay**

In `src/content/blog/paged-attention-kv-cache.mdx`, replace these five lines:

Line 76:
```mdx
<ExcalidrawNaiveVsKVCache exhibit="01" title="Naive recomputation vs KV caching" caption="Naive autoregressive recomputation costs O(N²) redundant passes; KV caching projects a single token per step. Notice how the shaded re-computation region disappears." />
```

Line 108:
```mdx
<ExcalidrawKVEvolution exhibit="02" title="Evolution of KV cache heads" caption="Multi-Head Attention keeps one KV pair per head (1:1); Multi-Query shares one across all heads (N:1); Grouped-Query lands between (G:1). Notice the cache footprint shrinking left to right." />
```

Line 139:
```mdx
<ExcalidrawMemoryFragmentation exhibit="03" title="The three sins of contiguous allocation" caption="Over-allocation, internal fragmentation, and external fragmentation — together wasting 60–80% of GPU memory in naive serving. Notice the gaps no request can ever use." />
```

Line 177:
```mdx
<ExcalidrawPagedSteps exhibit="04" title="The mechanics of PagedAttention" caption="Click the steps above to trace how virtual tokens map to scattered physical GPU memory. Notice that the block table is the only contiguous structure." />
```

Line 213:
```mdx
<ExcalidrawCopyOnWrite exhibit="05" title="Zero-copy sharing and copy-on-write" caption="Shared prompt blocks live once in physical HBM with ref_count=2; sequences branch only when their outputs diverge. Notice where the copy is — and isn't." />
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0.
Run: `grep -n "Figure [0-9]" src/content/blog/paged-attention-kv-cache.mdx`
Expected: no matches (old "Figure N:" captions gone).
Run: `grep -c "exhibit=" src/content/blog/paged-attention-kv-cache.mdx`
Expected: `5`

- [ ] **Step 6: Commit**

```bash
git add src/components/Exhibit.astro src/components/paged-attention/ src/content/blog/paged-attention-kv-cache.mdx
git commit -m "design: exhibit frame system for essay figures"
```

---

### Task 5: Homepage — journal front page

**Files:**
- Modify: `src/pages/index.astro` (full rewrite below)

Data notes: `src/data/talks.json` exposes `{ talks: [...] }`; `src/data/communities.json` exposes `{ communities: [...] }` — counts are derived from the data, not hardcoded.

- [ ] **Step 1: Rewrite index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';
import workData from '../data/work.json';
import talksData from '../data/talks.json';
import communitiesData from '../data/communities.json';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 4);

const featuredWork = workData.work.slice(0, 3);
const talkCount = talksData.talks.length;
const communityCount = communitiesData.communities.length;

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
---

<Layout
  title="Karan Mittal | Deterministic Engineering"
  description="Karan Mittal designs dependable data and AI systems for teams working with complexity."
>
  <main class="container">
    <section class="hero" aria-labelledby="home-title">
      <p class="label">Independent consulting · Dextar co-founder</p>
      <h1 id="home-title">Engineering systems you can rely on.</h1>
      <p class="hero-lead">
        I design deterministic data and AI systems for teams working with complexity —
        knowledge engines, production retrieval, and the infrastructure that makes
        ambitious work dependable.
        <a href="/contact" class="hero-cta">Work with me &rarr;</a>
      </p>
    </section>

    <section class="proof-strip" aria-label="Proof in numbers">
      <p><span class="proof-num">{String(talkCount).padStart(2, '0')}</span> talks &amp; workshops on record</p>
      <p><span class="proof-num">{String(communityCount).padStart(2, '0')}</span> technical communities supported</p>
      <p><span class="proof-num">IN</span> building &amp; learning in Central India</p>
    </section>

    <section class="home-section" aria-labelledby="work-heading">
      <div class="section-heading">
        <p class="label">Selected work</p>
        <a href="/work" class="section-more">All work &rarr;</a>
      </div>
      <h2 id="work-heading" class="visually-hidden">Selected work</h2>
      <div class="work-list">
        {featuredWork.map((item, i) => (
          <a href="/work" class="work-row">
            <span class="work-index">{String(i + 1).padStart(2, '0')}</span>
            <span class="work-body">
              <span class="work-title">{item.title}</span>
              <span class="work-summary">{item.summary}</span>
            </span>
            <span class="row-arrow" aria-hidden="true">&rarr;</span>
          </a>
        ))}
      </div>
    </section>

    <section class="home-section" aria-labelledby="essays-heading">
      <div class="section-heading">
        <p class="label">Essays</p>
        <a href="/blog" class="section-more">All essays &rarr;</a>
      </div>
      <h2 id="essays-heading" class="visually-hidden">Essays</h2>
      <div class="writing-list">
        {posts.map(post => (
          <a href={`/blog/${post.id}/`} class="writing-row">
            <time class="writing-date" datetime={post.data.pubDate.toISOString()}>{formatDate(post.data.pubDate)}</time>
            <span class="writing-body">
              <span class="writing-title">{post.data.title}</span>
              <span class="writing-desc">{post.data.description}</span>
            </span>
            {post.data.exhibits && (
              <span class="writing-exhibits">{post.data.exhibits} exhibits</span>
            )}
            <span class="row-arrow" aria-hidden="true">&#8599;</span>
          </a>
        ))}
      </div>
    </section>

    <section class="home-section" aria-labelledby="public-heading">
      <div class="section-heading">
        <p class="label">In public</p>
      </div>
      <h2 id="public-heading" class="visually-hidden">In public</h2>
      <div class="public-list">
        <a href="/talks" class="public-row">
          <span class="public-label">Talks &amp; workshops</span>
          <span class="public-meta">{talkCount} on record &rarr;</span>
        </a>
        <a href="/about#community" class="public-row">
          <span class="public-label">Communities</span>
          <span class="public-meta">{communityCount} supported &rarr;</span>
        </a>
        <a href="https://gdg.community.dev/gdg-cloud-indore/" class="public-row" target="_blank" rel="noopener">
          <span class="public-label">GDG Cloud Indore</span>
          <span class="public-meta">public events &#8599;</span>
        </a>
        <a href="https://www.linkedin.com/in/karansmittal/" class="public-row" target="_blank" rel="noopener">
          <span class="public-label">LinkedIn</span>
          <span class="public-meta">notes &amp; perspectives &#8599;</span>
        </a>
      </div>
    </section>

    <section class="contact-close">
      <h2>Have a system that needs to be right?</h2>
      <p>For consulting engagements involving AI reliability, knowledge systems, performance, or technical strategy.</p>
      <a href="/contact" class="close-link">Start a conversation &rarr;</a>
    </section>
  </main>
</Layout>

<style>
  .visually-hidden {
    position: absolute;
    width: 1px; height: 1px;
    margin: -1px; padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  /* Hero — a statement, not a pitch */
  .hero { padding: var(--space-9) 0 var(--space-8); }
  .hero h1 {
    max-width: 14ch;
    margin-bottom: var(--space-5);
    font-size: clamp(2.5rem, 5.5vw, 3.5rem);
    line-height: 1.12;
  }
  .hero-lead {
    max-width: 580px;
    margin: 0;
    font-size: var(--text-lg);
    line-height: 1.72;
    color: var(--text-secondary);
  }
  .hero-cta {
    display: inline-block;
    margin-left: var(--space-2);
    color: var(--accent);
    font-weight: 500;
    white-space: nowrap;
    text-decoration: none;
  }
  .hero-cta:hover { color: var(--accent-hover); text-decoration: none; }

  /* Proof strip — exhibit voice */
  .proof-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .proof-strip p {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    margin: 0;
    padding: var(--space-3) var(--space-4);
    color: var(--muted);
    font-size: var(--text-sm);
    line-height: 1.4;
  }
  .proof-strip p + p { border-left: 1px solid var(--border); }
  .proof-num {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  /* Sections */
  .home-section { padding: var(--space-8) 0 0; }
  .section-heading {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--space-4);
  }
  .section-heading .label { margin-bottom: 0; }
  .section-more {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: 0.04em;
    text-decoration: none;
  }
  .section-more:hover { color: var(--accent); text-decoration: none; }

  /* Work — annotated rows */
  .work-list { border-top: 1px solid var(--border); }
  .work-row {
    display: grid;
    grid-template-columns: 2.5rem minmax(0, 1fr) auto;
    gap: var(--space-3);
    align-items: baseline;
    padding: var(--space-4) 0;
    border-bottom: 1px solid var(--border);
    color: inherit;
    text-decoration: none;
  }
  .work-row:hover { text-decoration: none; }
  .work-row:hover .work-title { color: var(--accent); }
  .work-index {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
  }
  .work-body { display: grid; gap: var(--space-1); }
  .work-title {
    color: var(--text);
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    font-weight: 600;
    line-height: 1.3;
    transition: color var(--transition-fast);
  }
  .work-summary { color: var(--muted); font-size: var(--text-sm); line-height: 1.5; }

  /* Essays — dated typographic rows */
  .writing-list { border-top: 1px solid var(--border); }
  .writing-row {
    display: grid;
    grid-template-columns: 6rem minmax(0, 1fr) auto auto;
    gap: var(--space-3);
    align-items: baseline;
    padding: var(--space-4) 0;
    border-bottom: 1px solid var(--border);
    color: inherit;
    text-decoration: none;
  }
  .writing-row:hover { text-decoration: none; }
  .writing-row:hover .writing-title { color: var(--accent); }
  .writing-date { color: var(--muted); font-family: var(--font-mono); font-size: var(--text-xs); }
  .writing-body { display: grid; gap: var(--space-1); }
  .writing-title {
    color: var(--text);
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    font-weight: 600;
    line-height: 1.3;
    transition: color var(--transition-fast);
  }
  .writing-desc { color: var(--muted); font-size: var(--text-sm); line-height: 1.5; }
  .writing-exhibits {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .row-arrow { color: var(--muted); }

  /* In public — compact rows */
  .public-list { border-top: 1px solid var(--border); }
  .public-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-4);
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--border);
    color: inherit;
    text-decoration: none;
  }
  .public-row:hover { text-decoration: none; }
  .public-row:hover .public-label { color: var(--accent); }
  .public-label {
    color: var(--text);
    font-family: var(--font-serif);
    font-weight: 600;
    transition: color var(--transition-fast);
  }
  .public-meta {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    white-space: nowrap;
  }

  /* Contact — closing paragraph */
  .contact-close {
    margin-top: var(--space-9);
    padding-top: var(--space-7);
    border-top: 1px solid var(--border);
  }
  .contact-close h2 {
    max-width: 20ch;
    margin: 0 0 var(--space-3);
    font-size: clamp(var(--text-2xl), 3.5vw, var(--text-3xl));
  }
  .contact-close p { max-width: 520px; margin: 0 0 var(--space-4); color: var(--muted); }
  .close-link {
    color: var(--accent);
    font-weight: 500;
    text-decoration: none;
  }
  .close-link:hover { color: var(--accent-hover); text-decoration: none; }

  @media (max-width: 720px) {
    .hero { padding: var(--space-8) 0 var(--space-7); }
    .proof-strip { grid-template-columns: 1fr; }
    .proof-strip p + p { border-left: 0; border-top: 1px solid var(--border); }
    .writing-row { grid-template-columns: 1fr auto; gap: var(--space-1) var(--space-3); }
    .writing-date { grid-column: 1 / -1; }
    .writing-exhibits { display: none; }
  }
</style>
```

Notes: the grayscale portrait, floating principle note, LinkedIn sidebar card, proof cards, and boxed contact panel are all gone. The `WorkCard` import is removed from the homepage (rows are inline); `WorkCard.astro` itself is still used by `/work` and gets restyled in Task 10. `post.data.exhibits` type-errors until Task 7 adds the schema field — build Task 5 and 7 together before committing, or accept a TS warning in dev until then.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exit 0. (If Astro reports `exhibits` as a type error, proceed — Task 7 Step 1 adds it to the schema.)
Run: `grep -n "WorkCard\|btn btn-primary\|hero-aside" src/pages/index.astro`
Expected: no matches.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "design: homepage as journal front page — statement hero, ruled rows"
```

---

### Task 6: Essays index + post rows

**Files:**
- Modify: `src/pages/blog/index.astro`
- Modify: `src/components/BlogPostCard.astro`

- [ ] **Step 1: Edit blog/index.astro**

Edit A — line 24, change the layout title:

```astro
<Layout title="Essays | Karan Mittal">
```

Edit B — line 26, change the PageHeader:

```astro
    <PageHeader label="Essays" title="Essays" description="Long-form writing on systems, retrieval, and the decisions beneath dependable software." />
```

Edit C — lines 36–37, change search copy:

```astro
        placeholder="Search essays..."
        aria-label="Search essays"
```

- [ ] **Step 2: Restyle BlogPostCard.astro and add the exhibits marker**

Replace the component body between the frontmatter and the `<style>` tag (lines 21–38) with:

```astro
<article class="post-card" data-search={searchText}>
  <a href={`/blog/${post.id}/`} class="post-link">
    <h3 class="post-title">{post.data.title}</h3>
    <p class="post-description">{post.data.description}</p>
  </a>

  <div class="post-meta">
    <time datetime={post.data.pubDate.toISOString()}>{formattedDate}</time>
    <span aria-hidden="true" class="meta-sep">·</span>
    <span>{readingTime} min read</span>
    {post.data.exhibits && (
      <>
        <span aria-hidden="true" class="meta-sep">·</span>
        <span class="exhibits-marker">{post.data.exhibits} exhibits</span>
      </>
    )}
    {post.data.updatedDate && (
      <>
        <span aria-hidden="true" class="meta-sep">·</span>
        <span class="updated">Updated {post.data.updatedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </>
    )}
  </div>
</article>
```

Add to the `<style>` block (next to `.updated`):

```css
  .exhibits-marker {
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.65rem;
  }
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exit 0 (the `exhibits` field lands in Task 7; if the dev server complains about types, continue).

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/index.astro src/components/BlogPostCard.astro
git commit -m "design: essays index — journal table of contents"
```

---

### Task 7: Schema fields + EssaySeries component

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/components/EssaySeries.astro`
- Modify: `src/content/blog/paged-attention-kv-cache.mdx` frontmatter (add `exhibits: 6` — five existing diagrams plus the demo added in Task 9)

- [ ] **Step 1: Add optional fields to the blog schema**

Replace `src/content.config.ts` with:

```ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    series: z.object({
      name: z.string(),
      part: z.number(),
    }).optional(),
    exhibits: z.number().optional(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create EssaySeries.astro**

```astro
---
/**
 * EssaySeries.astro
 * Series header for multi-part essays: "Part 2 of 3 — Serving LLMs" + prev/next links.
 * Rendered only when a post sets `series` in frontmatter.
 */
import type { CollectionEntry } from 'astro:content';

interface Props {
  current: CollectionEntry<'blog'>;
  allPosts: CollectionEntry<'blog'>[];
}

const { current, allPosts } = Astro.props;
const series = current.data.series!;

const siblings = allPosts
  .filter((p) => p.data.series?.name === series.name)
  .sort((a, b) => a.data.series!.part - b.data.series!.part);

const index = siblings.findIndex((p) => p.id === current.id);
const prev = index > 0 ? siblings[index - 1] : null;
const next = index < siblings.length - 1 ? siblings[index + 1] : null;
---

<nav class="essay-series" aria-label={`Series: ${series.name}`}>
  <p class="series-kicker">
    Part {series.part} of {siblings.length} &mdash; <span class="series-name">{series.name}</span>
  </p>
  <div class="series-links">
    {prev ? (
      <a href={`/blog/${prev.id}/`} class="series-link">&larr; Part {prev.data.series!.part}: {prev.data.title}</a>
    ) : <span />}
    {next && (
      <a href={`/blog/${next.id}/`} class="series-link series-next">Part {next.data.series!.part}: {next.data.title} &rarr;</a>
    )}
  </div>
</nav>

<style>
  .essay-series {
    margin-bottom: var(--space-6);
    padding: var(--space-3) 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .series-kicker {
    margin: 0;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .series-name { color: var(--accent); }
  .series-links {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
    margin-top: var(--space-2);
  }
  .series-link {
    font-size: var(--text-sm);
    color: var(--muted);
    text-decoration: none;
  }
  .series-link:hover { color: var(--accent); text-decoration: none; }
  .series-next { margin-left: auto; text-align: right; }
</style>
```

- [ ] **Step 3: Add the exhibits count to the paged-attention essay**

In `src/content/blog/paged-attention-kv-cache.mdx` frontmatter, add one line after `tags:` (keep existing fields intact):

```yaml
exhibits: 6
```

(The count is 6: the five re-labeled diagrams plus the interactive demo added in Task 9.)

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: exit 0 with no content-schema errors.
Run: `grep -n "exhibits" src/content/blog/paged-attention-kv-cache.mdx | head -3`
Expected: the frontmatter line `exhibits: 6` plus `exhibit="0N"` usage lines.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/components/EssaySeries.astro src/content/blog/paged-attention-kv-cache.mdx
git commit -m "feat: series + exhibits fields, EssaySeries component"
```

---

### Task 8: Essay template — title block, series header, TOC

**Files:**
- Modify: `src/pages/blog/[...slug].astro`
- Modify: `src/components/TableOfContents.astro` (restyle only)

- [ ] **Step 1: Edit [...slug].astro**

Edit A — frontmatter: import EssaySeries and fetch all posts for series lookup. Replace lines 1–5 with:

```ts
import { type CollectionEntry, getCollection, render } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import TableOfContents from '../../components/TableOfContents.astro';
import EssaySeries from '../../components/EssaySeries.astro';
import { getReadingTime } from '../../utils/readingTime';
```

After the `const formattedDate = ...` block (line 28), add:

```ts
const allPosts = post.data.series ? await getCollection('blog') : [];
```

Edit B — replace the `<header class="post-header">...</header>` block (lines 39–63) with:

```astro
      <header class="post-header">
        {post.data.series && <EssaySeries current={post} allPosts={allPosts} />}

        <div class="post-meta">
          <time datetime={post.data.pubDate.toISOString()}>{formattedDate}</time>
          <span aria-hidden="true" class="meta-sep">·</span>
          <span>{readingTime} min read</span>
          {post.data.tags.length > 0 && (
            <>
              <span aria-hidden="true" class="meta-sep">·</span>
              {post.data.tags.map((tag) => (
                <a href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}/`} class="tag">{tag}</a>
              ))}
            </>
          )}
          {post.data.updatedDate && (
            <>
              <span aria-hidden="true" class="meta-sep">·</span>
              <span class="updated">
                Updated {post.data.updatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </>
          )}
        </div>

        <h1>{post.data.title}</h1>
        <p class="standfirst">{post.data.description}</p>
      </header>
```

(Tags move into the mono kicker line; the separate `.post-tags` div is deleted; a standfirst paragraph is added.)

Edit C — in the `<style>` block, replace `.post-header h1` and `.post-tags` rules with:

```css
  .post-header h1 {
    margin-bottom: var(--space-3);
    color: var(--text);
  }

  .standfirst {
    font-size: var(--text-lg);
    line-height: 1.65;
    color: var(--muted);
    max-width: 60ch;
  }
```

- [ ] **Step 2: Restyle TableOfContents.astro as marginalia**

In `src/components/TableOfContents.astro`, replace the `.toc` rule (lines 32–39) with:

```css
  .toc {
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    background: transparent;
    border: none;
    border-left: 1px solid var(--border);
    border-radius: 0;
    padding: 0 0 0 var(--space-4);
  }
```

All other TOC styles and the script stay unchanged.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exit 0.
Run: `grep -n "post-tags" src/pages/blog/\[...slug\].astro`
Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/[...slug].astro src/components/TableOfContents.astro
git commit -m "design: essay template — kicker meta, standfirst, marginalia TOC"
```

---

### Task 9: Interactives — ScrollExhibit + playable KV-cache demo

**Files:**
- Create: `src/components/ScrollExhibit.astro`
- Create: `src/components/paged-attention/KVCacheDemo.astro`
- Modify: `src/components/paged-attention/ExcalidrawPagedSteps.astro` (append a scroll-event listener to its script)
- Modify: `src/content/blog/paged-attention-kv-cache.mdx` (add scroll recap + demo)

- [ ] **Step 1: Create ScrollExhibit.astro**

Generic scroll driver: observes `[data-scroll-step]` blocks in the slotted prose and dispatches `exhibit:step` events that any figure can listen for. Degrades to plain prose with JS disabled.

```astro
---
/**
 * ScrollExhibit.astro
 * Scroll-linked exhibit driver. Wraps prose blocks marked with data-scroll-step;
 * as each block crosses the reading line, dispatches a CustomEvent('exhibit:step')
 * with detail { target, step } — figures listen and advance themselves.
 */
interface Props {
  target: string;
  steps: string[];
}

const { target, steps } = Astro.props;
---

<div class="scroll-exhibit" data-target={target} data-steps={JSON.stringify(steps)}>
  <slot />
</div>

<script>
  document.querySelectorAll('.scroll-exhibit').forEach((root) => {
    const target = root.getAttribute('data-target');
    const steps = JSON.parse(root.getAttribute('data-steps') || '[]');
    const blocks = Array.from(root.querySelectorAll('[data-scroll-step]'));
    if (!target || !steps.length || !blocks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = blocks.indexOf(entry.target as Element);
        const step = steps[Math.min(idx, steps.length - 1)];
        document.dispatchEvent(new CustomEvent('exhibit:step', { detail: { target, step } }));
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    blocks.forEach((b) => observer.observe(b));
  });
</script>

<style>
  .scroll-exhibit :global([data-scroll-step]) {
    margin-bottom: var(--space-6);
    padding-left: var(--space-4);
    border-left: 1px solid var(--border);
    transition: border-color var(--transition);
  }
</style>
```

- [ ] **Step 2: Make PagedSteps respond to scroll events**

In `src/components/paged-attention/ExcalidrawPagedSteps.astro`, at the end of its existing `<script>` block (the one handling the step tabs), append this listener — it reuses the existing tab logic by clicking the matching tab:

```js
    // Scroll-linked drive: ScrollExhibit dispatches 'exhibit:step' for this figure
    document.addEventListener('exhibit:step', function (e) {
      if (e.detail && e.detail.target === 'ex-paged-steps-svg') {
        var tab = document.querySelector('.ex-step-tab[data-target="' + e.detail.step + '"]');
        if (tab) tab.click();
      }
    });
```

(If the existing script is wrapped in an IIFE, add the listener inside it, after the tab-click wiring. The SVG's id `ex-paged-steps-svg` is defined at line 42 of the component.)

- [ ] **Step 3: Create KVCacheDemo.astro — the playable demo**

A self-contained widget: slider for tokens generated (page size fixed at 4), rendering physical pages with used/free slots and live stats. No dependencies.

```astro
---
/**
 * KVCacheDemo.astro
 * Playable demo: drag the slider to generate tokens and watch paged allocation
 * assign physical pages on demand. Page size fixed at 4 slots.
 */
---

<div class="kv-demo" id="kv-demo">
  <div class="kv-controls">
    <label for="kv-slider" class="kv-label">Tokens generated: <span id="kv-count">1</span></label>
    <input type="range" id="kv-slider" min="1" max="32" value="1" step="1" />
  </div>
  <div class="kv-pages" id="kv-pages" aria-live="polite"></div>
  <p class="kv-stats" id="kv-stats"></p>
</div>

<script>
  (function () {
    var PAGE_SIZE = 4;
    var MAX_PAGES = 8;
    var slider = document.getElementById('kv-slider');
    var pagesEl = document.getElementById('kv-pages');
    var statsEl = document.getElementById('kv-stats');
    var countEl = document.getElementById('kv-count');
    if (!slider || !pagesEl || !statsEl || !countEl) return;

    function render() {
      var tokens = parseInt(slider.value, 10);
      var pagesUsed = Math.ceil(tokens / PAGE_SIZE);
      countEl.textContent = String(tokens);
      pagesEl.innerHTML = '';

      for (var p = 0; p < MAX_PAGES; p++) {
        var page = document.createElement('div');
        var allocated = p < pagesUsed;
        page.className = 'kv-page' + (allocated ? ' allocated' : '');
        for (var s = 0; s < PAGE_SIZE; s++) {
          var slot = document.createElement('div');
          var slotIndex = p * PAGE_SIZE + s;
          slot.className = 'kv-slot' + (allocated && slotIndex < tokens ? ' filled' : '');
          page.appendChild(slot);
        }
        pagesEl.appendChild(page);
      }

      var capacity = pagesUsed * PAGE_SIZE;
      var waste = capacity > 0 ? Math.round(((capacity - tokens) / capacity) * 100) : 0;
      statsEl.textContent = 'physical pages: ' + pagesUsed + ' of ' + MAX_PAGES +
        ' · slots used: ' + tokens + '/' + capacity +
        ' · internal waste: ' + waste + '%';
    }

    slider.addEventListener('input', render);
    render();
  })();
</script>

<style>
  .kv-demo {
    padding: var(--space-5);
    background-image: radial-gradient(var(--ex-grid-dot, rgba(110,103,93,0.18)) 1.2px, transparent 1.2px);
    background-size: 20px 20px;
  }
  .kv-controls {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
    flex-wrap: wrap;
  }
  .kv-label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .kv-label span { color: var(--accent); }
  .kv-demo input[type="range"] {
    flex: 1;
    min-width: 160px;
    accent-color: var(--accent);
  }
  .kv-pages {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-bottom: var(--space-3);
  }
  .kv-page {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    padding: 3px;
    border: 1px dashed var(--border);
    border-radius: 2px;
    opacity: 0.4;
  }
  .kv-page.allocated {
    border-style: solid;
    border-color: var(--ex-indigo-stroke, #6366f1);
    opacity: 1;
  }
  .kv-slot {
    width: 22px;
    height: 22px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 1px;
  }
  .kv-slot.filled {
    background: var(--ex-indigo-bg, #eef2ff);
    border-color: var(--ex-indigo-stroke, #6366f1);
  }
  .kv-stats {
    margin: 0;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--muted);
  }
</style>
```

- [ ] **Step 4: Wire the interactives into the essay**

In `src/content/blog/paged-attention-kv-cache.mdx`:

Edit A — add the import after line 13 (with the other component imports):

```mdx
import Exhibit from '../../components/Exhibit.astro';
import KVCacheDemo from '../../components/paged-attention/KVCacheDemo.astro';
import ScrollExhibit from '../../components/ScrollExhibit.astro';
```

Edit B — immediately after the Exhibit 04 block (the `<ExcalidrawPagedSteps ... />` usage), add the scroll-linked recap:

```mdx
<ScrollExhibit target="ex-paged-steps-svg" steps={['all', 's1', 's2', 's3', 's4']}>
  <div data-scroll-step>
    **The full flow.** Every structure below exists to answer one question: where does this token's KV data physically live?
  </div>
  <div data-scroll-step>
    **Virtual blocks.** The sequence is sliced into fixed-size logical blocks — allocation becomes a paging problem, not a contiguous-memory problem.
  </div>
  <div data-scroll-step>
    **The block table.** Per-sequence translation, exactly like an OS page table. This is the only structure that stays contiguous.
  </div>
  <div data-scroll-step>
    **The GPU memory pool.** Physical frames are scattered and shared. Free frames are just a list — any request can take any frame.
  </div>
  <div data-scroll-step>
    **In-kernel gather.** The attention kernel follows the block table pointers and gathers scattered frames into SRAM. The scatter never reaches the math.
  </div>
</ScrollExhibit>
```

Edit C — after the Exhibit 05 block (the `<ExcalidrawCopyOnWrite ... />` usage), add the playable demo:

```mdx
<Exhibit exhibit="06" title="Playable — paged allocation under your control" caption="Drag the slider to generate tokens. Notice that physical pages appear only when needed, and internal waste never exceeds one page — compare with the contiguous case in Exhibit 03.">
  <KVCacheDemo />
</Exhibit>
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0.
Run: `grep -c "data-scroll-step" src/content/blog/paged-attention-kv-cache.mdx`
Expected: `5` (plus one mention in the ScrollExhibit docs is fine — count the MDX only).

Manual check (dev server): scroll the recap section and confirm the Exhibit 04 diagram steps advance; drag the demo slider and confirm pages allocate.

- [ ] **Step 6: Commit**

```bash
git add src/components/ScrollExhibit.astro src/components/paged-attention/KVCacheDemo.astro src/components/paged-attention/ExcalidrawPagedSteps.astro src/content/blog/paged-attention-kv-cache.mdx
git commit -m "feat: scroll-linked exhibits + playable KV cache demo"
```

---

### Task 10: Work page — annotated ruled blocks

**Files:**
- Modify: `src/components/WorkCard.astro` (restyle only)
- Modify: `src/pages/work.astro`

- [ ] **Step 1: Flatten WorkCard.astro**

In the `<style>` block, replace the `.work-card` and `.work-card.detailed` rules (lines 49–58) with:

```css
  .work-card {
    padding: var(--space-6) 0;
    border-bottom: 1px solid var(--border);
    background: transparent;
  }
  .work-card.detailed {
    padding: var(--space-7) 0;
    background: transparent;
  }
```

Replace the `.detail-grid` rule's `border-top` — change `border-top: 1px solid var(--border);` to `border-top: 1px solid var(--border-subtle);` (keep the rest).

- [ ] **Step 2: Edit work.astro**

Edit A — replace the `.principle` block's box with an editorial aside. In the `<style>` block, replace the `.principle` rule (lines 42–51) with:

```css
  .principle {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-3);
    max-width: 620px;
    margin: calc(var(--space-3) * -1) 0 var(--space-7);
    padding: 0 0 0 var(--space-4);
    border-left: 1px solid var(--accent);
    background: transparent;
  }
```

Edit B — replace the boxed `.engagement` section (HTML lines 30–37) with a closing block:

```astro
    <section class="engagement">
      <p class="label">Consulting</p>
      <h2>Bring the difficult system question.</h2>
      <p>I work with teams navigating knowledge systems, AI reliability, performance constraints, and the transition from prototype to production.</p>
      <a href="/contact" class="engagement-link">Discuss an engagement &rarr;</a>
    </section>
```

and replace its styles (lines 55–68 and the media query at 69–71) with:

```css
  .engagement {
    margin-top: var(--space-8);
    padding-top: var(--space-7);
    border-top: 1px solid var(--border);
  }
  .engagement h2 { margin: 0 0 var(--space-2); font-size: var(--text-2xl); }
  .engagement p:not(.label) { max-width: 510px; margin: 0 0 var(--space-4); color: var(--muted); }
  .engagement-link {
    color: var(--accent);
    font-weight: 500;
    text-decoration: none;
  }
  .engagement-link:hover { color: var(--accent-hover); text-decoration: none; }
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exit 0.
Run: `grep -n "btn-primary" src/pages/work.astro`
Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git add src/components/WorkCard.astro src/pages/work.astro
git commit -m "design: work page — ruled annotated blocks"
```

---

### Task 11: About page — editorial opening

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Add the portrait opening**

Replace the `<blockquote class="hero-quote">...</blockquote>` (lines 17–19) with:

```astro
    <div class="about-opening">
      <img src="/profile-400.jpg" alt="Karan Mittal" width="160" height="160" class="about-portrait" />
      <blockquote class="hero-quote">
        The difficult part of an engineering problem is rarely the tool. It is designing a system people can rely on.
      </blockquote>
    </div>
```

- [ ] **Step 2: Flatten the community cards and CTA**

Edit A — replace the `.community-card` rule (lines 156–162) with:

```css
  .community-card {
    padding: var(--space-5) 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    border-radius: 0;
    text-align: left;
  }
```

and change `.community-logo`'s `margin: 0 auto var(--space-3);` to `margin: 0 0 var(--space-3);`, and `.community-links`'s `justify-content: center;` to `justify-content: flex-start;`.

Edit B — replace the CTA section HTML (lines 84–91) with:

```astro
    <section class="cta-section">
      <h2>Let's build</h2>
      <p>For consulting engagements involving complex data, AI reliability, system performance, or technical strategy.</p>
      <p class="cta-links">
        <a href="/contact" class="cta-link">Discuss an engagement &rarr;</a>
        <a href="https://www.linkedin.com/in/karansmittal/" class="cta-quiet" target="_blank" rel="noopener">LinkedIn &#8599;</a>
      </p>
    </section>
```

and replace the `.cta-section` style block (lines 205–224) with:

```css
  .cta-section {
    margin-top: var(--space-8);
    padding-top: var(--space-7);
    border-top: 1px solid var(--border);
  }
  .cta-section h2 {
    margin-top: 0;
    font-size: var(--text-2xl);
    margin-bottom: var(--space-2);
  }
  .cta-section p {
    color: var(--muted);
    margin-bottom: var(--space-3);
    max-width: 480px;
  }
  .cta-links {
    display: flex;
    gap: var(--space-4);
    align-items: baseline;
  }
  .cta-link {
    color: var(--accent);
    font-weight: 500;
    text-decoration: none;
  }
  .cta-link:hover { color: var(--accent-hover); text-decoration: none; }
  .cta-quiet {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-decoration: none;
  }
  .cta-quiet:hover { color: var(--text); text-decoration: none; }
```

(Delete the now-unused `.cta-actions` rule.)

Edit C — add opening styles to the `<style>` block:

```css
  .about-opening {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: var(--space-5);
    align-items: center;
    margin-bottom: var(--space-6);
  }
  .about-portrait {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    filter: grayscale(100%);
  }
  @media (max-width: 720px) {
    .about-opening { grid-template-columns: 96px 1fr; gap: var(--space-4); }
    .about-portrait { width: 96px; height: 96px; }
  }
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro
git commit -m "design: about page — editorial opening, flattened sections"
```

---

### Task 12: Talks, Now, Tags, Contact — flatten remaining cards

**Files:**
- Modify: `src/pages/talks.astro`
- Modify: `src/pages/now.astro`
- Modify: `src/pages/tags/index.astro`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: talks.astro**

Replace the `.cta-section` HTML (lines 77–81):

```astro
    <section class="cta-section">
      <h2>Work in public</h2>
      <p>Workshops and talks are a way to test engineering ideas in the open. For consulting enquiries, start with the system question.</p>
      <a href="/contact" class="cta-link">Start a conversation &rarr;</a>
    </section>
```

Replace the `.cta-section` styles (lines 156–165) with:

```css
  .cta-section {
    margin-top: var(--space-8);
    padding-top: var(--space-7);
    border-top: 1px solid var(--border);
  }
  .cta-section h2 {
    margin-top: 0;
    font-size: var(--text-2xl);
    margin-bottom: var(--space-2);
  }
  .cta-section p {
    color: var(--muted);
    margin-bottom: var(--space-3);
    max-width: 480px;
    font-size: var(--text-base);
  }
  .cta-link {
    color: var(--accent);
    font-weight: 500;
    text-decoration: none;
  }
  .cta-link:hover { color: var(--accent-hover); text-decoration: none; }
```

and delete the `.cta-section p { margin-left/right: auto }` centered rules and the media-query `.cta-section` padding override (no longer boxed).

- [ ] **Step 2: now.astro**

Replace the `.now-item` rule (lines 88–93) with:

```css
  .now-item {
    padding: var(--space-5) 0;
    background: transparent;
    border: none;
    border-top: 1px solid var(--border);
    border-radius: 0;
  }
```

- [ ] **Step 3: tags/index.astro**

Replace the `.tag-card` rule (lines 50–58) with:

```css
  .tag-card {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: var(--space-3) 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    border-radius: 0;
    text-decoration: none;
    color: inherit;
  }
```

Replace the `.tags-grid` rule (lines 45–49) with:

```css
  .tags-grid {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border);
  }
```

and add a hover accent: append to the style block:

```css
  .tag-card:hover .tag-name { color: var(--accent); }
```

- [ ] **Step 4: contact.astro**

Replace the `.form-panel` rule (line 95) with:

```css
  .form-panel { min-height: 620px; padding: var(--space-6) 0 0; border: none; border-top: 1px solid var(--border); border-radius: 0; background: transparent; }
```

and in the `@media (max-width: 540px)` block, replace the `.form-panel` override with:

```css
    .form-panel { min-height: 600px; margin: 0; padding: var(--space-4) 0 0; }
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0.
Run: `grep -rn "bg-elevated" src/pages/now.astro src/pages/tags/index.astro src/pages/talks.astro src/pages/contact.astro`
Expected: no matches (no remaining boxed surfaces on these pages).

- [ ] **Step 6: Commit**

```bash
git add src/pages/talks.astro src/pages/now.astro src/pages/tags/index.astro src/pages/contact.astro
git commit -m "design: flatten talks, now, tags, contact into typographic pages"
```

---

### Task 13: Docs + full verification

**Files:**
- Modify: `BLOG_GUIDE.md` (append new frontmatter fields)
- All routes (visual verification)

- [ ] **Step 1: Document the new frontmatter**

Append to `BLOG_GUIDE.md`:

```markdown
## Exhibit system & series (added 2026-08)

- `exhibits: <number>` (optional, frontmatter) — count of numbered exhibits in the post. Shows an "N exhibits" marker on the homepage and essays index.
- `series: { name: <string>, part: <number> }` (optional, frontmatter) — groups multi-part essays; renders a "Part X of N" header with prev/next links.
- Wrap any figure in `<Exhibit exhibit="01" title="..." caption="...">...</Exhibit>` (import from `../../components/Exhibit.astro`). Captions should tell the reader what to notice.
- `<ScrollExhibit target="<figure-svg-id>" steps={[...]}>` wraps prose blocks marked `data-scroll-step` and advances the named figure as the reader scrolls.
```

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: exit 0, all pages generated.

- [ ] **Step 3: Full visual pass**

Run: `npm run dev`, then check every route in both themes (toggle in header) at desktop and ≤480px widths:

- `/` — statement hero, proof strip, work rows, essay rows (paged-attention post shows "6 exhibits"), public rows, closing block
- `/blog` — "Essays" header, search works, year groups hairline-ruled
- `/blog/paged-attention-kv-cache/` — series header absent (no `series` set), Exhibits 01–06 labeled, scroll recap advances Exhibit 04, demo slider allocates pages, TOC is a hairline marginalia rail
- `/blog/deterministic-rag-intro/` — renders normally, no exhibits marker
- `/work`, `/about`, `/talks`, `/now`, `/tags`, `/contact` — no boxed cards remain; CTAs are clay text links
- `/tags/llm-inference/` (or any tag) — rows render

Expected: warm paper palette in light, warm dark in dark mode; no royal blue anywhere; no card boxes.

- [ ] **Step 4: Commit**

```bash
git add BLOG_GUIDE.md
git commit -m "docs: exhibit system + series frontmatter"
```

---

## Self-review notes

- Spec coverage: tokens/type/texture (T1), header/footer (T2–3), Exhibit system (T4), homepage (T5), essays index (T6), series + schema (T7), essay template + TOC (T8), scroll exhibits + playable demo + series nav (T9, T7), work (T10), about (T11), talks/now/tags/contact (T12), verification (T13). Code blocks go warm-dark via token change in T1. Dark theme recalibrated in T1.
- No hydration framework added; no new dependencies.
- Known sequencing constraint: Tasks 5–6 reference `post.data.exhibits` before Task 7 adds it to the schema. Execute 5 → 7 → 6 if type errors block the build, or build all three before committing.
