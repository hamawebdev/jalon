// Server entry for prerendering (built by scripts/prerender.mjs with `vite build --ssr`, never shipped to browsers).
// Renders one route of the app to HTML — body and head — the same way the browser will hydrate it (src/main.tsx).
// Owner: seo.
/* oxlint-disable react/only-export-components -- a build-time entry, never hot-reloaded */
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import App from './App.tsx'
import { buildHead, headHtml, type MetaPageId } from './components/site/seo/head.ts'
import { loadDict } from './i18n/load.ts'
import { DEFAULT_LANG, type Lang } from './i18n/locales.ts'
import { allRoutes } from './i18n/routes.ts'
import { FACTS } from './lib/facts.ts'
import { PENDING_MODE } from './lib/mode.ts'

export { PENDING_MODE }
export const SITE_DOMAIN = FACTS.brand.domain

/** Every page to prerender, plus the 404 page (written as 404.html, French). */
export function prerenderRoutes(): { page: MetaPageId; lang: Lang; path: string }[] {
  // The 404 page is rendered at an address no route answers.
  return [...allRoutes(), { page: 'notFound', lang: DEFAULT_LANG, path: '/404/' }]
}

export interface Rendered {
  /** The app's HTML, to put inside <div id="root">. */
  html: string
  /** The <title> and data-seo tags of the page's head. */
  head: string
  htmlLang: string
  /** Errors React reported while rendering (a section that threw is left to the browser to render). */
  errors: string[]
}

async function streamToString(stream: AsyncIterable<Uint8Array | string>): Promise<string> {
  const decoder = new TextDecoder()
  let out = ''
  for await (const chunk of stream) out += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true })
  return out + decoder.decode()
}

/**
 * Renders a page. `path` is the router path ('/en/shop/'), `base` the deploy base path ('/' or '/<repo>/'), so the
 * links React Router writes carry the same base as in the browser.
 */
export async function render(page: MetaPageId, lang: Lang, path: string, base: string): Promise<Rendered> {
  const dict = await loadDict(lang)
  // The same basename as BrowserRouter gets in src/main.tsx.
  const basename = base === '/' ? undefined : base
  const location = base.replace(/\/$/, '') + path
  const errors: string[] = []
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={location} basename={basename}>
        <App />
      </StaticRouter>
    </StrictMode>,
    {
      onError(error) {
        errors.push(error instanceof Error ? `${error.message}\n${error.stack ?? ''}` : String(error))
      },
    },
  )
  // A Node Readable at run time (react-dom/static resolves to static.node in the server build).
  const html = await streamToString(prelude as unknown as AsyncIterable<Uint8Array | string>)
  const head = buildHead(page, lang, dict)
  return { html, head: headHtml(head), htmlLang: head.htmlLang, errors }
}
