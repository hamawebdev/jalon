# Atlas Pro · atlasprotvofficial.com

The website of **AtlasProTVOfficial**, Distributeur Officiel Agréé of the **Atlas Pro ONTV** IPTV subscription
(atlasprotvofficial.com): the home page (offer, apps, pricing, installation hub, reviews, FAQ), the Boutique
(1-click order configurator), the reseller page, the Télécharger hub (official apps and players by system), contact
and the legal pages.

Nothing is paid on the site. Every buy, activate and renew button opens WhatsApp with a pre-filled French message
(`src/lib/whatsapp.ts`); payment (PayPal, SEPA bank transfer) is arranged there.

Built with Vite, React 19, TypeScript, Tailwind CSS v4 and React Router. Every page is **prerendered** to static
HTML at build time (body and head) and hydrated in the browser, then works as a single-page app.

## Languages

French is the default and lives at the root; six translations live under their prefix, with localised slugs:

| | Prefix | Example |
|---|---|---|
| Français | `/` | `/boutique/` |
| English | `/en/` | `/en/shop/` |
| Deutsch | `/de/` | `/de/shop/` |
| Español | `/es/` | `/es/tienda/` |
| Português | `/pt/` | `/pt/loja/` |
| Italiano | `/it/` | `/it/negozio/` |
| Suomi | `/fi/` | `/fi/kauppa/` |

Languages are in `src/i18n/locales.ts`, pages and slugs in `src/i18n/routes.ts` (build every link with `pathFor()`).
Copy lives in dictionaries: `src/i18n/dict/fr/<area>.ts` is the source, `src/i18n/dict/<lang>/` the translations,
with exactly the same keys. An area not translated yet borrows the French one. Titles and meta descriptions are the
`meta` area (`src/i18n/dict/fr/meta.ts`).

## Scripts

| Command | What it does |
|---|---|
| `npm install` | Install the dependencies (Node 24). |
| `npm run dev` | Dev server (http://localhost:5173/), in review mode: every missing fact shows its « À compléter » marker. No prerender. |
| `npm run build` | The complete site in `dist/`, in launch mode: type-check, client build, server build and prerender of every page in every language plus `404.html`, `sitemap.xml` and the `Sitemap` line of `robots.txt`. |
| `npm run preview` | Serve `dist/` locally (http://localhost:4173/). |
| `npm run launch-check` | List the required facts still missing from `src/lib/facts.data.ts`. Fails while one is missing. |
| `npm run check-site` | After a build: check the built pages against the client's content rules (no Arabic, no platform names, no 4K for live TV, WhatsApp links, complete translations). |
| `npm run lint` | Lint with oxlint. |
| `npm run prerender` / `npm run sitemap` | The last two steps of `npm run build`, on their own (after `vite build`). |
| `node scripts/og-image.mjs` | Regenerate the social image `public/og.png` from `scripts/og-image.html` (needs google-chrome). |

Two environment variables, read at build time:

- `BASE_PATH`: the base path the site is served from (`/` by default; the GitHub Pages workflows use `/<repo>/`
  until the custom domain serves the site).
- `VITE_PENDING`: display mode of missing facts, `review` or `launch` (default: `review` on the dev server, `launch`
  for `npm run build`). The whole build — client and prerender — reads the same value; never mix them.

## How the build works

`npm run build` = `tsc -b && vite build && node scripts/prerender.mjs && node scripts/sitemap.mjs`.

1. **Client build** (`vite build`): the browser bundle in `dist/`, with a build manifest (`dist/.vite/`).
2. **Prerender** (`scripts/prerender.mjs`): builds `src/entry-server.tsx` for Node (`vite build --ssr`), then renders
   each page in each language with React's `prerenderToNodeStream` (it waits for the lazy pages) and writes it to
   `dist/<path>/index.html`:
   - the page's HTML inside `<div id="root" data-path="…">`, which `src/main.tsx` **hydrates**;
   - its head, from `buildHead()` in `src/components/site/seo/head.ts`: title, description, canonical, `hreflang`
     alternates for the 7 languages and `x-default` (French), Open Graph and Twitter tags, `og:locale` and its
     alternates, and JSON-LD (Organization, WebSite, Product with the three offers on home and Boutique,
     BreadcrumbList elsewhere; no rating or review block, the reviews are not verified);
   - `<html lang>`, the display mode, font preloads and `modulepreload` links for the page's chunk and its
     language's dictionary.

   `404.html` (French « page introuvable », `noindex`) answers every other address; the browser renders it again
   in the language of the address. The manifest and the server build are removed at the end.
3. **Sitemap** (`scripts/sitemap.mjs`): `dist/sitemap.xml` with every indexable page in every language, each with
   its `xhtml:link` hreflang alternates, and the `Sitemap:` line of `dist/robots.txt`.

Canonical URLs, hreflang, `og:image`, structured data and the sitemap always use the client's domain
(`brand.domain` in `src/lib/facts.data.ts`) at the root, even when a preview is served from `/<repo>/`. In the
browser, `<PageMeta page="…" />` (one per page) applies the same head on every client-side navigation.

Components must render the same on the server and in the browser: no `window`, `document`, `localStorage`,
`Math.random()` or `Date.now()` during render — only in effects and event handlers. Errors during the prerender are
printed by `npm run build` with the page they happened on.

## Facts

Business facts — prices, counts, app versions, Downloader codes, links, the WhatsApp number, the domain — live in
**`src/lib/facts.data.ts`** and nowhere else (types and the list of required facts in `src/lib/facts.ts`). A fact the
client has not given is `null`: the review site shows « À compléter » in its place, the launched site leaves the item
out. Never type a value the client has not given.

## Going live

1. **Fill in `src/lib/facts.data.ts`** with the client's answers, then run `npm run launch-check` until it passes.
2. **Check the build**: `npm run build && npm run check-site`, then `npm run preview` and look at the pages in both
   display modes (`VITE_PENDING=review npm run build` shows the markers).
3. **Client preview, until the launch.** Every push to `main` runs `.github/workflows/preview.yml`: review mode, no
   launch check, `noindex, nofollow` on every page (`scripts/preview-noindex.mjs`), published to GitHub Pages.
4. **Launch.** Disable the preview workflow (Actions › Client preview › Disable workflow), then run
   `.github/workflows/deploy.yml` by hand (Actions › Launch deploy › Run workflow). It runs the launch check (and
   stops while a required fact is missing), lint, `npm run build` in launch mode and `npm run check-site`, then
   publishes `dist/`.
5. **Custom domain.** Point atlasprotvofficial.com at GitHub Pages (Settings › Pages › Custom domain) and set the
   repository variable `BASE_PATH` to `/` (Settings › Secrets and variables › Actions › Variables), so the site is
   built for the domain root. `robots.txt` and the sitemap only work at the root of the domain.

## Where things live

| Path | What |
|---|---|
| `src/lib/facts.data.ts`, `src/lib/facts.ts` | The client's facts, their types, the launch check list. |
| `src/lib/whatsapp.ts` | Every WhatsApp link and pre-filled message. |
| `src/i18n/` | Languages, routes and slugs, dictionaries (`dict/<lang>/`), formatting of numbers and prices. |
| `src/App.tsx`, `src/pages/` | The routes and one component per page; home sections in `src/pages/home/`. |
| `src/components/kit/` | Shared building blocks (buttons, sections, cards, `Pending`, `Reveal`). |
| `src/components/site/` | The frame (header, footer, trust banner, language switcher) and `PageMeta`; the head and structured data in `seo/`. |
| `src/main.tsx`, `src/entry-server.tsx` | Browser entry (hydration) and server entry (prerender). |
| `scripts/` | `prerender.mjs`, `sitemap.mjs`, `preview-noindex.mjs`, `launch-check.mjs`, `check-site.mjs`, `og-image.mjs`. |
| `public/` | Favicon, app icons, web manifest, `robots.txt`, the social image `og.png`, review screenshots. |
| `docs/` | The client's brief (the spec). |
