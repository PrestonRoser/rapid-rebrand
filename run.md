<!-- v1.0 | 2026-09-08 | create / run / verify / ship workflow for rapid-rebrand -->

# run.md — Working Process

The full loop for this site, in linear order. Framework: **Astro 7 + Tailwind v4**, static
output, deployed on **Vercel** (`main` = production, any other pushed branch = preview URL).

Project root: `~/Projects/rapid-rebrand`

---

## 0. One-time orientation

| Thing                                   | Where                                                             |
| --------------------------------------- | ----------------------------------------------------------------- |
| Routes                                  | `src/pages/*.astro` — one file per URL (`about.astro` → `/about`) |
| Reusable UI                             | `src/components/*.astro`                                          |
| Page shell (`<head>`, nav, footer)      | `src/layouts/Layout.astro`                                        |
| Design tokens + global CSS              | `src/styles/global.css` (`@theme` block for colors/fonts/spacing) |
| Static files (images, fonts, favicon)   | `public/` → served at site root (`public/logo.svg` → `/logo.svg`) |
| Build output (never edit, never commit) | `dist/` (git-ignored)                                             |
| Dev server URL                          | http://localhost:4321                                             |

Node: `>=22.12` (see `package.json` `engines`).

---

## 1. Start clean

```bash
cd ~/Projects/rapid-rebrand
git checkout main
git pull --ff-only origin main     # once a remote is added; skip until then
npm install                         # only if package.json changed since last time
```

## 2. Branch per change

Never build on `main`. One branch per logical unit of work:

```bash
git checkout -b feat/hero-section    # feat/… , fix/… , content/… , design/…
```

## 3. Run it locally

```bash
npm run dev
```

Leave it running in its own terminal tab. It **hot-reloads** — save a file, the browser updates.
Only restart the dev server when you change `astro.config.mjs` or install a package.

## 4. Create / edit

Decide where the change lives:

| You want to…                                           | Touch                                                                            |
| ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Add a page                                             | new file in `src/pages/` — import `Layout`, fill the `<slot />`                  |
| Change text/layout on one page                         | that page's file in `src/pages/`                                                 |
| Change something on every page (nav, footer, `<head>`) | `src/layouts/Layout.astro` or a component it renders                             |
| Build a reusable block                                 | new file in `src/components/`, `import` it where needed                          |
| Adjust colors / fonts / spacing scale                  | `@theme` tokens in `src/styles/global.css` — change once, applies everywhere     |
| Add an image                                           | drop in `public/images/`, reference as `/images/name.webp`, set `width`/`height` |

Work against `localhost:4321` as you go. Keep to the design system in `CLAUDE.md`.

## 5. Verify (before every commit)

Run these in order. All must pass.

```bash
# 1. Formatting
npm run format:check     # or `npm run format` to auto-fix

# 2. Production build — this is exactly what Vercel runs. The real gate.
npm run build

# 3. Type + content check — broken links, invalid props, TS errors
npm run check            # first run downloads the language server and can be slow;
                         # if it hangs, Ctrl-C and re-run once — the build above is authoritative

# 4. Preview the built output (not the dev server)
npm run preview          # serves dist/ at http://localhost:4321
```

Then eyeball the preview:

- **Responsive:** resize from ~320px up to ~1440px. No horizontal scroll, no overlap, nav collapses cleanly.
- **Keyboard:** Tab through the page. Every interactive element is reachable and has a visible focus ring.
- **Reduced motion:** with the OS "reduce motion" setting on, nothing animates distractingly.
- **Content:** no lorem ipsum, no placeholder links (`href="#"`), all images have real `alt` text.
- **Console:** no errors or warnings in the browser devtools.

Optional deeper check:

```bash
# Lighthouse on the built site (target ≥95 perf / a11y / best-practices / SEO)
npm run preview &
npx lighthouse http://localhost:4321 --view --preset=desktop
kill %1
```

## 6. Commit

```bash
git add -A
git status                 # confirm dist/ and node_modules/ are NOT listed
git commit -m "feat: add hero section with primary CTA"
```

Commit messages: `type: imperative summary` (`feat:`, `fix:`, `content:`, `design:`, `chore:`).

## 7. Push

```bash
git push -u origin feat/hero-section
```

## 8. Check the Vercel preview

Within ~1 minute Vercel builds the branch and produces a **preview URL** (real deployment, not
production). Get it from:

```bash
gh pr create --fill        # Vercel's bot comments the preview link on the PR
```

or the Vercel dashboard → project → Deployments. **Review the preview URL** — this is the last
gate before production.

## 9. Ship to production

```bash
gh pr merge --squash --delete-branch
```

The moment `main` updates, Vercel deploys it to the production domain (~1 min). Done.

## 10. Reset

```bash
git checkout main
git pull --ff-only origin main
```

---

## First-time Vercel setup (once)

1. Create the GitHub repo and push `main`:
   ```bash
   gh repo create rapid-rebrand --private --source=. --remote=origin --push
   ```
2. In the Vercel dashboard: **New Project → import `rapid-rebrand`**. Framework preset auto-detects
   Astro. Build command `astro build`, output dir `dist/`. No env vars needed for a static site.
3. Confirm production branch is `main` (Settings → Git).
4. Add the custom domain when ready (Settings → Domains).

After that, step 8–9 above is the whole deploy story — push a branch, open a PR, merge.

---

## The short version

```
git checkout main && git pull --ff-only origin main
git checkout -b feat/thing
npm run dev                              # build against localhost:4321
npm run format:check && npm run build && npm run check && npm run preview   # all pass + eyeball
git add -A && git commit -m "feat: thing"
git push -u origin feat/thing
gh pr create --fill                      # review Vercel preview link
gh pr merge --squash --delete-branch     # → live in production
```

---

## Troubleshooting

| Symptom                                            | Check                                                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Tailwind classes do nothing                        | `src/styles/global.css` has `@import "tailwindcss";` and `Layout.astro` imports `global.css`    |
| Styles stale after config change                   | restart `npm run dev` (config changes aren't hot-reloaded)                                      |
| Build fails on Vercel but works locally            | Node version mismatch — match `package.json` `engines`; run `npm run build` on a clean `npm ci` |
| `dist/` or `node_modules/` showing in `git status` | check `.gitignore` — both should be listed                                                      |
| Image causes layout shift                          | add explicit `width` and `height` attributes                                                    |
| Port 4321 in use                                   | `npm run dev -- --port 4322`                                                                    |
