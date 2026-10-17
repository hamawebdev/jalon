import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { PENDING_MODE } from '@/components/brand/mode'
import { enableMotionGate } from '@/components/brand/motion'
// Same hashed files the @font-face rules use: the latin files of the display face (Sofia Sans, regular width) and
// the text face. The mono face is not preloaded: browsers fetch it only on pages that render mono text.
import displayLatin from '@fontsource-variable/sofia-sans/files/sofia-sans-latin-wght-normal.woff2?url'
import textLatin from '@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2?url'
// The icon subset (scripts/subset-icons.mjs), the same hashed file its @font-face names. Its font-display is
// `block`, so cart, menu, arrow and check glyphs are drawn only once the file is there: fetch it with the text faces.
import iconSubset from './assets/icons/tabler-icons-subset.woff2?url'

// Reveal-on-scroll may hide content only when motion is allowed (adds html.js-motion before the first render).
enableMotionGate()

// Which display mode this page runs in (APPROVAL §2c), for QA and the crawl: <html data-pending-mode="review|launch">.
document.documentElement.dataset.pendingMode = PENDING_MODE

// Preload the two critical brand fonts and the icons before React renders, so headings, prices and body copy swap
// in sooner and the icons are there with the first paint (without it the browser asks for them after the first render).
// The built entry pages carry no font preload on purpose: on a slow link, fonts in the first wave hold back the entry
// scripts the first paint waits for (QA CL-01, scripts/static-head.mjs). A file gets a preload here only when the head
// has none for it, so a head that does carry one keeps a single set. Addresses are compared resolved.
const preloaded = new Set(
  Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="preload"][as="font"]'), (link) => link.href),
)
for (const href of [displayLatin, textLatin, iconSubset]) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'font'
  link.type = 'font/woff2'
  link.crossOrigin = 'anonymous'
  link.href = href
  if (!preloaded.has(link.href)) document.head.appendChild(link)
}

// Deploy base path, always with its final slash: "/" at a domain root, "/<repo>/" on GitHub Pages (vite.config.ts).
// react-router uses the basename as given for a link to "/", so keeping the slash makes the home link "/<repo>/",
// like every other internal link, instead of "/<repo>".
const base = import.meta.env.BASE_URL.replace(/\/*$/, '/')
// A basename that ends with a slash does not match the bare "/<repo>" address. Hosts redirect it to the slash;
// where one serves the app there directly, correct the address before the router reads it.
if (base !== '/' && `${window.location.pathname}/`.toLowerCase() === base.toLowerCase()) {
  const { pathname, search, hash } = window.location
  window.history.replaceState(window.history.state, '', `${pathname}/${search}${hash}`)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={base === '/' ? undefined : base}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
