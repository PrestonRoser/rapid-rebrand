# Rapid Energy Solutions

Marketing website for Rapid Energy Solutions LLC, an electrical contractor in
Platteville, Colorado. Static site, built with Astro and Tailwind, deployed on
Cloudflare Pages.

## Requirements

Node 22.12 or newer (`.nvmrc` pins the major version).

## Getting started

```sh
npm install
npm run dev
```

The dev server runs at http://localhost:4321 and reloads on save.

## Scripts

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Start the dev server                         |
| `npm run build`        | Build to `dist/`. This is what the host runs |
| `npm run preview`      | Serve the built output locally               |
| `npm run check`        | Type and content check via `astro check`     |
| `npm run format`       | Format with Prettier                         |
| `npm run format:check` | Verify formatting. CI runs this              |

## Layout

```
src/
  data/site.ts        Company details, navigation, services, values
  data/reviews.ts     Customer reviews and the aggregate rating
  layouts/            Page shell: head tags, structured data, header, footer
  components/         Reusable pieces, one concern each
  pages/              One file per route
  styles/global.css   Design tokens and shared component classes
public/               Served at the site root
```

Two files carry most of the decisions:

- **`src/data/site.ts`** holds every piece of company information. Change a
  phone number or a service name here and it updates everywhere.
- **`src/styles/global.css`** holds the colour, type, and spacing tokens plus
  the shared `.btn`, `.card`, `.section` and `.container-page` classes. Change
  the palette here rather than in individual components.

## Content rules

Copy on this site falls into three buckets, and comments in `src/data/` say
which is which:

1. Taken from the company's existing site or a directory listing.
2. Written for this build and awaiting client sign-off.
3. Customer reviews, quoted word for word from public review pages.

Reviews must never be edited, summarised, or invented. The aggregate rating
shown on the page is the real published figure, not a rounded one.

## Before launch

- Point the contact and careers form `action` attributes at a form handler.
- Set `site.url` in `src/data/site.ts` to the production domain. It feeds the
  canonical tag, Open Graph tags, and structured data.
- Confirm the credential strip in `src/data/site.ts` with the client,
  particularly anything touching licensing.

## Development workflow

See [run.md](./run.md) for the branch, review, and deploy loop.

## License

[MIT](./LICENSE)
