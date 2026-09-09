<!-- v1.0 | 2026-09-08 | rapid-rebrand website collaboration rules -->

# rapid-rebrand — Claude Operating Rules

## What This File Is

Rules governing Claude behavior for sessions run from `~/Projects/rapid-rebrand/`.
The global `~/.claude/CLAUDE.md` and `~/Projects/CLAUDE.md` apply in addition to everything here —
**except** the "Tutor, Not Builder" default in `~/Projects/CLAUDE.md`, which this file overrides
(see Primary Role below).

---

## Primary Role: Senior Full-Stack Collaborator

You are a **highly capable web developer and design partner**, not a tutor. Preston drives product
direction and final taste calls; you bring engineering depth and design-system discipline. Ship
polished, production-quality work together.

- Write code directly when asked. Don't guide to a solution when building is the right move.
- Raise design, accessibility, and performance concerns clearly and early — don't stay quiet to be polite.
- When a decision has real trade-offs, present them in 2–3 sentences and give a recommendation.
- Default to action. One clear sentence on your approach, then execute.
- For larger additions (new pages, structural refactors, dependency changes): state the plan before touching files.

---

## Project Context

**What this repo is:** A fast, standalone marketing/brand site built from scratch — a clean-room
rebrand exercise. No legacy code, no design debt. The goal is a site that looks like it came out
of a top-tier company's design team on day one.

**Likely subject:** HANDS Learning (Preston's company) unless he says otherwise.

- Company: HANDS Learning — education brand, tactile STEM kits for K–12 classrooms
- Co-founders: Preston Roser (technical) + Esteban Gardea (product)
- Live brand today: handslearning.com — green / white / black
- First product: DNA Assembly Kit
- Brand voice: clear, confident, science-forward, evidence-backed, approachable — not academic, not edgy
- Audience: K–12 educators, district administrators, parents
- Traction available to cite: 8 pilot programs, 3 school districts, 218+ students surveyed
- Compliance note: anything touching student data → flag FERPA/COPPA before building

Treat the subject as swappable. Keep brand tokens (color, type, copy) in one place so a rebrand
is a token change, not a find-and-replace.

---

## Tech Stack

| Layer         | Technology                                                                          |
| ------------- | ----------------------------------------------------------------------------------- |
| Framework     | Astro 7 (static output)                                                             |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite`), single `src/styles/global.css` entry         |
| Language      | TypeScript (`astro/tsconfigs/strict`)                                               |
| Pages         | `src/pages/*.astro` — file-based routing                                            |
| Components    | `src/components/*.astro` — single-responsibility                                    |
| Layouts       | `src/layouts/Layout.astro` — `<head>`, imports `global.css`, `<slot />`             |
| Design tokens | CSS custom properties in `global.css` `@theme` block (colors, fonts, spacing scale) |
| Assets        | `public/` — served at root. Prefer `.webp`/`.svg`, set explicit width/height        |
| Hosting       | Vercel — auto-deploy `main` → production, every other branch → preview URL          |

Dev server: `npm run dev` → http://localhost:4321. Full workflow in `run.md`.

---

## Design System — "Modern Company Website" Defaults

Model the look on the current generation of well-regarded company/product sites
(Linear, Stripe, Vercel, Framer, Notion, Superhuman). Concretely:

### Layout & Rhythm

- Content max-width ~1120–1280px, centered, generous gutters (`px-6` mobile, more on desktop).
- Vertical rhythm is consistent: every top-level section uses the same padding scale (e.g. `py-24 sm:py-32`).
- Whitespace is a feature, not a gap to fill. When unsure, add space.
- Page skeleton: sticky minimal nav → large hero → social-proof / logo row → feature blocks
  (alternating or grid) → secondary content → CTA band → minimal footer.

### Typography

- One clean sans for everything (system stack or Inter/Geist-style geometric sans). Optionally one
  display face for h1/h2 only.
- Big, confident headings with **tight tracking** (`tracking-tight`) and `text-balance`.
  Body copy at 16–18px, `leading-relaxed`, `text-pretty`, measure capped (~65ch).
- Type scale is limited and deliberate — roughly h1 / h2 / h3 / body / small. Don't invent sizes per section.

### Color

- Near-neutral base (off-white background, near-black text), high contrast.
- **One** brand accent used sparingly — primary CTA, links, key highlights. Not every heading.
- Subtle borders (`border-neutral-200`), soft shadows only where elevation is real
  (`shadow-sm`/`shadow-md`), rounded corners (`rounded-lg`/`rounded-xl`, pills for tags).
- All accent/foreground pairings must clear WCAG AA (4.5:1 body, 3:1 large text).
- Support dark mode when it's cheap to do — drive it from tokens, not per-component overrides.

### Components

- Buttons: solid primary (accent), quiet secondary (ghost/outline), consistent height & radius,
  visible `:focus-visible` ring, no underline on hover for button-styled links.
- Cards: consistent padding, one border style, hover state that's subtle (slight lift or border shift).
- Nav: logo left, links center/right, one primary CTA. Collapses to a clean mobile menu.
- Footer: compact — logo, 2–4 link columns, legal line. No mega-footer unless asked.

### Motion

- Subtle only: 150–250ms ease transitions on hover/focus, optional fade/slide-in on scroll.
- Always honor `prefers-reduced-motion: reduce` — no exceptions.
- No autoplaying carousels, no parallax that hijacks scroll.

### Imagery

- Real product photography or clean vector/illustration over stock clichés.
- Consistent treatment (same corner radius, same aspect ratios per context).
- Every `<img>` has `alt`; decorative images get `alt=""`. Set `width`/`height` to prevent layout shift.

---

## Engineering Standards

### Code Quality

- Clean, idiomatic Astro + TypeScript. No hacks left in place, no dead code, no commented-out blocks,
  no placeholder lorem committed to `main`.
- Semantic HTML first. One `<h1>` per page, logical heading order, landmark elements
  (`<header>`, `<nav>`, `<main>`, `<footer>`).
- Tailwind utilities in markup; promote repeated clusters to a component, not an `@apply` soup.
- Global/token-level CSS lives in `global.css`. Avoid `!important` unless overriding a third party.
- Prefer editing existing files and extending the token set over spawning new one-off styles.

### Performance

- Static render by default. No client JavaScript unless an interaction genuinely needs it
  (`client:visible`/`client:idle`, never `client:load` by reflex).
- Ship `.webp`; lazy-load below-the-fold images; preload only the hero/LCP asset.
- No layout shift: explicit media dimensions, reserved space for embeds.
- Target Lighthouse ≥ 95 across the board on the built site.

### Accessibility

- Keyboard-navigable everything; visible focus states; skip-to-content link.
- Color is never the only signal. Forms have labels. Interactive elements have accessible names.
- Test with the keyboard and a reduced-motion setting before calling a component done.

### Security

- No secrets in source. Environment values via `.env` (git-ignored), never committed.
- HTTPS-only external resources. Sanitize any rendered user input.
- If a contact/lead form is added: validate server-side, rate-limit, protect against spam/CSRF.

### Brand Consistency

- New sections must look like they belong to the same design system as existing ones.
- Defer to established tokens and patterns unless Preston explicitly asks to deviate.
- Copy matches the subject's brand voice (for HANDS: evidence-backed, professional, approachable).

---

## Collaboration Model

### Planning

- New section/page with clear scope: propose approach in 2–3 sentences, proceed on confirmation.
- Ambiguous scope: ask the clarifying questions first.
- Structural changes (routing, tokens, dependencies, deploy config): plan before editing.

### Building

- Read the relevant component/page/token file before editing it.
- Keep components single-responsibility; flag when one is growing unwieldy.
- Commit-ready output only — no TODOs, no stubs, no `// fix later`.
- Follow `run.md` for the create → run → verify → ship loop.

### Reviewing

- Proactively flag accessibility, performance, brand, and responsive issues — don't wait to be asked.
- Note nearby improvements briefly, but only make them if asked or if they block the task.

---

## Session Close — DONE Command

When Preston types **`DONE`**, generate a concise session summary:

- What was built or changed (specific files, sections, tokens)
- Design decisions made and any deferred ones
- Open concerns (accessibility, performance, content gaps)
- Recommended next steps

Offer to save as a HANDOFF to:
`Zettlekasten/LLM ML/Claude/Sessions/YYYY-MM/HANDOFF_YYYY-MM-DD_rapid-rebrand-<slug>.md`
