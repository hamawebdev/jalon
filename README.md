# Jalon · abonnement TV

The website of **Jalon**, a French TV subscription service: plans and prices, the plan pages, the apps and setup
guides per device, help, contact, the order page and the legal pages. All copy is in French (fr-FR).

Built with Vite, React 19, TypeScript, Tailwind CSS v4 and React Router. It is a single-page app with a local cart
and a front-end order page: nothing is charged on the site.

## Scripts

| Command | What it does |
|---|---|
| `npm install` | Install the dependencies. |
| `npm run dev` | Start the dev server (http://localhost:5173/), in review mode: every missing fact shows its marker. |
| `npm run launch-check` | List the required facts still missing from `src/lib/facts.data.ts`. Fails while one is missing. |
| `npm run build` | Type-check and build the site into `dist/`, in launch mode. |
| `npm run static-head` | After a build: write one entry page per route into `dist/`, each with its own `<head>`. |
| `npm run sitemap` | After the entry pages: write `dist/sitemap.xml` and the `Sitemap` line of `dist/robots.txt`, once the domain is set. |
| `npm run preview` | Serve the built site locally. |
| `npm run lint` | Lint with oxlint. |
| `npm run icons` | Regenerate the icon font subset after adding an icon (`npm run icons:check` only checks it; the build runs the check). |

`BASE_PATH` sets the base path at build time (`/` by default; the GitHub Pages workflow builds under `/<repo>/`).

## Going live

The site shows only what the owner has stated. Going live is filling in the facts, then letting the workflow publish.

1. **Fill in `src/lib/facts.data.ts`.** It is the one file to edit, and it holds values only: each line says what to
   type. The facts marked `★ REQUIRED` are the ones the site cannot go live without (offer and prices, how to
   order and pay, contact, the company's legal identity, the legally required terms). Leave `null` where you are
   not sure: never keep a template value.
2. **Run `npm run launch-check`.** It lists the required facts still missing, in the order to answer them, and
   where each one shows on the site. It exits with an error while one is missing, and with success once none is.
3. **Look at the site in both display modes** (`VITE_PENDING`, read once by the brand kit):

   | Mode | How | A missing required fact | A missing optional fact |
   |---|---|---|---|
   | review | `npm run dev` (the default there), or `VITE_PENDING=review` | « À compléter » marker | « À compléter » marker |
   | launch | `npm run build` (the default there), or `VITE_PENDING=launch npm run dev` | « À compléter » marker | leaves no trace: its row, sentence, card or section is not shown |

   In launch mode an unanswered yes/no fact counts as « no »: the reseller page, the trial, the announcements
   channel and the like stay off the site, with every link to them, until the answer is yes.
4. **Push.** The workflow (`.github/workflows/deploy.yml`) then does, in this order:
   - `npm run launch-check`: the deploy stops here while a required fact is missing, so a site with holes is never
     published;
   - `npm run lint` and `npm run build` (launch mode);
   - `npm run static-head` and `npm run sitemap` (see « Deploying »);
   - the upload to GitHub Pages.
5. **With a custom domain**, also:
   - set `site.domain` in `src/lib/facts.data.ts` (a required fact): canonical URLs, absolute preview images,
     structured data and the sitemap all wait for it;
   - set the repository variable `BASE_PATH` to `/` (Settings › Secrets and variables › Actions › Variables),
     because the site is then served from the domain root and no longer from `/<repo>/`.

To try the whole chain on your machine: `npm run launch-check && npm run build && npm run static-head && npm run sitemap`,
then `npm run preview`.

**Client preview, until the launch.** Every push to `main` runs `.github/workflows/preview.yml`, which publishes the
site to the same GitHub Pages address in review mode (every missing fact shows its marker) without the launch check,
and with `noindex, nofollow` on every page (`scripts/preview-noindex.mjs`). The deploy above runs on pushes to
`redesign/premium-brand`. For the real launch, disable the preview workflow first (Actions › Client preview ›
Disable workflow), or it replaces the launched site at the next push to `main`.

## Deploying

The site is a single-page app on a static host. After `npm run build`, two scripts finish the job on `dist/`.
Deploying somewhere else than GitHub Pages? Run the same two commands after the build.

**`npm run static-head`** (`scripts/static-head.mjs`) writes one `index.html` per route, so each address answers
with HTTP 200, and `404.html` for every other address. Each entry page is the built `index.html` with that route's
own `<head>`:

- its title, description and social tags, and `noindex` on the order page and on `404.html`. Link previews
  (WhatsApp, Facebook, X) and many crawlers read the served HTML and never run the app;
- one `modulepreload` link per script the route's page needs, read from Vite's build manifest, so the page's code
  downloads with the entry scripts instead of after them;
- once `site.domain` is set: the canonical URL, the absolute preview image URL and the page's structured data
  (JSON-LD). A block is written only from real, complete facts: the site name on the home page, the company once
  its legal name exists, the breadcrumb of the plan pages, a plan's price once it exists, and on `/aide/` the
  questions whose answer has no missing fact. No rating or review block without a sourced rating.

There is no route list to maintain: the script reads the routes, titles and descriptions from the app itself
(`PAGE_META` in `src/lib/site.ts` and the plan pages), and each route's page from the `<Route>` lines of
`src/App.tsx`. A new route needs its `<Route>` there and its title and description in `PAGE_META`, nothing else. A
page hidden until the owner says yes (the reseller page, `/revendeur/`) gets no entry page, so its address answers
with the 404 page and HTTP 404. The script can run again on the same folder; `--dist <folder>` points it at another
build.

**`npm run sitemap`** (`scripts/sitemap.mjs`) writes `dist/sitemap.xml` from the same route list, without the
`noindex` pages and the hidden pages, each at its canonical address, and adds the `Sitemap:` line to
`dist/robots.txt`. Both wait for `site.domain`: without it there is no sitemap and no `Sitemap:` line.

**`robots.txt`** (`public/robots.txt`) allows every page. The order page is not disallowed there on purpose: it is
kept out of search results by the `noindex` in its own HTML, which a crawler must be allowed to read. Crawlers only
read `robots.txt` at the root of a host: under `https://<owner>.github.io/<repo>/` it is ignored, so it starts
working with the custom domain. Until then the `noindex` in the served HTML is the only control.

Both scripts follow `VITE_PENDING` like the build does: run all three with the same value (unset in the workflow,
so launch mode).

## Where things live

| Path | What |
|---|---|
| `src/lib/facts.data.ts` | The owner's facts, values only: plans, prices, delivery, support, company and legal details. A fact not given yet is `null`. Never put an invented value here. |
| `src/lib/facts.ts` | The types, the list of required facts (`REQUIRED_FACTS`) and the helpers that format facts. It re-exports `FACTS`. |
| `src/components/brand/` | The Jalon brand kit: tokens in use, the wordmark, buttons, cards, the `Pending` marker, the display mode (`mode.ts`) and the scope helpers that decide what a missing fact hides (`FactScope`, `scope.ts`), `identity.ts` (name forms and `pageTitle()`). |
| `src/components/site/` | The site chrome: header, mobile menu, cart drawer, footer, the WhatsApp button, per-route title and description (`page-meta.ts`), structured data (`structured-data.ts`) and what the entry pages are made of (`static-head.ts`, build time only). |
| `src/lib/site.ts` | Navigation, contact links and the route → title and description map. |
| `src/pages/` | One component per route (`App.tsx` lists them) and the sections of each page. |
| `scripts/` | `launch-check.mjs`, `static-head.mjs`, `sitemap.mjs` and `subset-icons.mjs`. |
| `public/` | Favicon, app icons, web manifest, `robots.txt` and the social preview image (`og.png`). |
| `.team/` | The rebrand team's workspace: identity (`brand/`), page inventory (`structure/`), copy and facts sheet (`copy/`), builders' and QA notes, task board. Not part of the site. |

## Facts and placeholders

Facts come from the owner only. Until a fact is given, the review site shows « À compléter · … » in its place
(`<Pending>` in JSX, `pendingText()` in titles, meta and aria-labels). On the published site (launch mode) only a
required fact keeps that marker, and the deploy refuses to publish while one is missing; an optional fact leaves
no trace, and nothing replaces it with a guess. Sections that only exist with a fact (trial, reviews, ratings,
multi-screen options…) stay hidden in both modes. Fill `src/lib/facts.data.ts` and the site updates everywhere at
once. `.team/copy/FACTS.md` says where each fact is used.
