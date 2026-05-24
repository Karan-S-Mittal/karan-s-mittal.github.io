# Personal Website / Blog

A minimal, fast, professional blog built with [Astro](https://astro.build). Deployed automatically to **GitHub Pages** via GitHub Actions.

## Why Astro?
- **Zero JS by default** — Pages ship as static HTML. Fast.
- **MDX support** — Write posts in Markdown. Add components when needed.
- **Auto-generated RSS** — Required for your GitHub profile auto-update workflow.
- **GitHub Pages native** — Deploys automatically on every push.

---

## 🚀 Setup Instructions (GitHub Pages User Site)

### 1. Create the Magic Repo

On GitHub, create a **new public repository** named exactly:

```
Karan-S-Mittal.github.io
```

> ⚠️ This must match your username exactly. GitHub treats this as your user site.

### 2. Move These Files to the New Repo

The contents of this `website/` folder should become the **root** of that new repo.

```bash
# Example workflow after cloning the new repo:
cd Karan-S-Mittal.github.io
cp -r /path/to/this/website/* .
git add .
git commit -m "init: astro blog"
git push origin main
```

### 3. Enable GitHub Pages

1. Go to your new `Karan-S-Mittal.github.io` repo on GitHub.
2. Navigate to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. The workflow file in `.github/workflows/deploy.yml` will handle the rest.

### 4. Your Site is Live

Within 2–3 minutes, your site will be available at:

```
https://karan-s-mittal.github.io
```

Your RSS feed (used by your profile README workflow) will be at:

```
https://karan-s-mittal.github.io/rss.xml
```

---

## ✍️ Add a New Post

1. Create a new `.md` file in `src/content/blog/`.
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   description: "Short summary for RSS and SEO"
   pubDate: 2026-05-26
   ---
   ```
3. Write your content in Markdown below the frontmatter.
4. Commit and push. The site rebuilds automatically.

---

## 🌐 Custom Domain (Optional)

If you own a domain (e.g., `karansmittal.com`):

1. Update `astro.config.mjs`:
   ```js
   export default defineConfig({
     site: 'https://karansmittal.com',
     base: '/',
   });
   ```
2. Create `public/CNAME` containing:
   ```
   karansmittal.com
   ```
3. In your repo **Settings → Pages**, add your custom domain.
4. Configure DNS A/ALIAS records pointing to GitHub Pages IPs.

---

## 🔄 Auto-Deployment

This repo includes `.github/workflows/deploy.yml`. Every time you push to `main`, the site:
1. Installs dependencies (`npm ci`)
2. Builds the static site (`astro build`)
3. Deploys to GitHub Pages

No manual steps required after initial setup.
