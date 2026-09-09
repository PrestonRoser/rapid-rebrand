# Development workflow

The loop for this site, start to finish. Astro 7 and Tailwind v4, static output, deployed on
Cloudflare Pages. `main` is production; any other pushed branch gets a preview URL.

Project root: `~/Projects/rapid-rebrand`

---

## 0. One-time orientation

| Thing                                   | Where                                                                  |
| --------------------------------------- | ---------------------------------------------------------------------- |
| Routes                                  | `src/pages/*.astro`, one file per URL (`about.astro` becomes `/about`) |
| Reusable UI                             | `src/components/*.astro`                                               |
| Page shell (`<head>`, nav, footer)      | `src/layouts/Layout.astro`                                             |
| Design tokens + global CSS              | `src/styles/global.css` (`@theme` block for colors/fonts/spacing)      |
| Static files (images, fonts, favicon)   | `public/` → served at site root (`public/logo.svg` → `/logo.svg`)      |
| Build output (never edit, never commit) | `dist/` (git-ignored)                                                  |
| Dev server URL                          | http://localhost:4321                                                  |

Node: `>=22.12` (see `package.json` `engines`).

---

## 1. Start clean

```bash
cd ~/Projects/rapid-rebrand
git checkout main
git pull --ff-only origin main
npm install                        # only if package.json changed since last time
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

Leave it running in its own terminal tab. It hot-reloads: save a file and the browser updates.
Only restart the dev server when you change `astro.config.mjs` or install a package.

## 4. Create / edit

Decide where the change lives:

| You want to…                                           | Touch                                                                            |
| ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Add a page                                             | new file in `src/pages/`, importing `Layout`                                     |
| Change text/layout on one page                         | that page's file in `src/pages/`                                                 |
| Change something on every page (nav, footer, `<head>`) | `src/layouts/Layout.astro` or a component it renders                             |
| Build a reusable block                                 | new file in `src/components/`, `import` it where needed                          |
| Adjust colors / fonts / spacing scale                  | `@theme` tokens in `src/styles/global.css`, which apply everywhere               |
| Add an image                                           | drop in `public/images/`, reference as `/images/name.webp`, set `width`/`height` |

Work against `localhost:4321` as you go. Keep to the tokens and shared classes in
`src/styles/global.css` rather than introducing one-off styles.

## 5. Verify (before every commit)

Run these in order. All must pass.

```bash
# 1. Formatting
npm run format:check     # or `npm run format` to auto-fix

# 2. Production build. This is exactly what Cloudflare runs, and the real gate.
npm run build

# 3. Type and content check: broken links, invalid props, TS errors
npm run check            # first run downloads the language server and can be slow;
                         # if it hangs, Ctrl-C and re-run once. The build above is authoritative.

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

## 8. Check the preview deployment

Cloudflare builds the branch and publishes a **preview URL** on its own subdomain. This is a real
deployment, just not production. Open a PR and the Pages check appears on it:

```bash
gh pr create --fill
```

The reliable place to find the link is the dashboard: **Workers & Pages → rapid-rebrand →
Deployments**. **Review the preview URL.** It is the last gate before production.

## 9. Ship to production

```bash
gh pr merge --squash --delete-branch
```

The moment `main` updates, Cloudflare rebuilds and publishes to the production URL. Done.

## 10. Reset

```bash
git checkout main
git pull --ff-only origin main
```

---

## First-time Cloudflare Pages setup (once)

1. Create the GitHub repo and push `main`:
   ```bash
   gh repo create rapid-rebrand --private --source=. --remote=origin --push
   ```
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, then pick
   `rapid-rebrand`.
3. Framework preset **Astro**. Build command `npm run build`, output directory `dist`. A static
   build needs no environment variables, but set `NODE_VERSION` to `22` so the build image matches
   `.nvmrc`.
4. Confirm the production branch is `main` under **Settings → Builds & deployments**.
5. Add the custom domain when ready under **Custom domains**. Cloudflare issues the certificate.

Cloudflare Pages allows commercial use on its free tier, which matters here because the site is for
a real business. Check the current terms before switching hosts.

After that, steps 8 and 9 are the whole deploy story: push a branch, open a PR, merge.

---

## The short version

```
git checkout main && git pull --ff-only origin main
git checkout -b feat/thing
npm run dev                              # build against localhost:4321
npm run format:check && npm run build && npm run check && npm run preview   # all pass + eyeball
git add -A && git commit -m "feat: thing"
git push -u origin feat/thing
gh pr create --fill                      # review the Cloudflare preview link
gh pr merge --squash --delete-branch     # → live in production
```

---

## Troubleshooting

| Symptom                                            | Check                                                                                                |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Tailwind classes do nothing                        | `src/styles/global.css` has `@import "tailwindcss";` and `Layout.astro` imports `global.css`         |
| Styles stale after config change                   | restart `npm run dev` (config changes aren't hot-reloaded)                                           |
| Build fails on the host but works locally          | Node version mismatch. Set `NODE_VERSION` to `22` in the Pages project and build on a clean `npm ci` |
| `dist/` or `node_modules/` showing in `git status` | check `.gitignore`; both should be listed                                                            |
| Image causes layout shift                          | add explicit `width` and `height` attributes                                                         |
| Port 4321 in use                                   | `npm run dev -- --port 4322`                                                                         |
