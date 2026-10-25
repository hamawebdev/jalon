// Entry point. Loads the dictionary of the page's language first, so the first render needs no suspension, then
// hydrates the prerendered HTML of the page (scripts/prerender.mjs) or, on the dev server and on 404.html, renders
// from scratch. Owner: seo.
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { loadDict } from './i18n/load.ts'
import { parsePath } from './i18n/routes.ts'
import { PENDING_MODE } from './lib/mode.ts'

const base = import.meta.env.BASE_URL.replace(/\/*$/, '/')
if (base !== '/' && `${window.location.pathname}/`.toLowerCase() === base.toLowerCase()) {
  const { pathname, search, hash } = window.location
  window.history.replaceState(window.history.state, '', `${pathname}/${search}${hash}`)
}

const root = document.getElementById('root')!
const routerPath = '/' + window.location.pathname.slice(base.length)
// The prerendered page says which route it was rendered for. Hydrate only that route: 404.html is served for every
// unknown address (in any language), and a page renamed or removed since the build must not be hydrated as another.
const prerendered = root.dataset.path === routerPath && root.firstElementChild !== null

document.documentElement.dataset.pendingMode = PENDING_MODE
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Scroll-in animations hide content below the fold until it is reached. What is already on screen in the
  // prerendered page stays visible: no flash between the first paint and hydration.
  if (prerendered) {
    for (const el of root.querySelectorAll<HTMLElement>('.reveal')) {
      const box = el.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) el.classList.add('is-visible')
    }
  }
  document.documentElement.classList.add('js-motion')
}

await loadDict(parsePath(routerPath).lang)

const app = (
  <StrictMode>
    <BrowserRouter basename={base === '/' ? undefined : base}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (prerendered) {
  hydrateRoot(root, app)
} else {
  root.textContent = ''
  createRoot(root).render(app)
}
