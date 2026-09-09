# rapid-rebrand

Marketing website for **Rapid Energy Solutions LLC** — an electrical contractor in Platteville,
Colorado. A clean-room enhancement of the company's existing site, built from scratch with
**Astro + Tailwind CSS**. Static output, deployed on Vercel.

Company info and navigation live in [`src/data/site.ts`](./src/data/site.ts); brand colors and
type live in [`src/styles/global.css`](./src/styles/global.css) (`@theme` block).

## Stack

| Layer     | Tech                                                        |
| --------- | ----------------------------------------------------------- |
| Framework | Astro 7 (static output)                                     |
| Styling   | Tailwind CSS v4 (`@tailwindcss/vite`)                       |
| Language  | TypeScript (`astro/tsconfigs/strict`)                       |
| Hosting   | Vercel — `main` = production, other branches = preview URLs |

## Quick start

```sh
npm install
npm run dev        # http://localhost:4321
```

## Project structure

```text
src/
  layouts/    Layout.astro — <head>, global styles, page shell
  pages/      one .astro file per route (index.astro → /)
  components/ reusable .astro components
  styles/     global.css — Tailwind entry + design tokens
public/       static assets, served at site root
```

## Scripts

| Command                | Action                                      |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Dev server at `localhost:4321` (hot reload) |
| `npm run build`        | Production build to `./dist/`               |
| `npm run preview`      | Serve the built site locally                |
| `npm run check`        | Type + content check (`astro check`)        |
| `npm run format`       | Format all files with Prettier              |
| `npm run format:check` | Verify formatting without writing           |

## Workflow

The full create → run → verify → ship loop is in [`run.md`](./run.md).
Collaboration rules and the design system live in [`CLAUDE.md`](./CLAUDE.md).

## License

[MIT](./LICENSE) © Preston Roser
