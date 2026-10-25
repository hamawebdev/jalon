// Entry point. Loads the dictionary of the page's language first, so the first render needs no suspension.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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

document.documentElement.dataset.pendingMode = PENDING_MODE
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('js-motion')

const routerPath = '/' + window.location.pathname.slice(base.length)
await loadDict(parsePath(routerPath).lang)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={base === '/' ? undefined : base}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
