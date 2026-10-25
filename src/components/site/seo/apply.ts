// Browser side of the head: on every client-side navigation, puts the page's head (./head.ts) into the document.
// Only <title>, <html lang> and the tags marked data-seo are touched; whatever else is in <head> (styles, scripts,
// the preview's noindex tags) stays. Owner: seo.
import { headTags, type HeadData } from './head'

let applied: string | null = null

export function applyHead(head: HeadData): void {
  if (document.title !== head.title) document.title = head.title
  document.documentElement.lang = head.htmlLang

  const html = headTags(head).join('')
  const current = document.head.querySelectorAll('[data-seo]')
  if (html === applied && current.length) return
  const anchor = current[0] ?? null
  const template = document.createElement('template')
  template.innerHTML = html
  // <script> nodes parsed by a template do not run; JSON-LD is data, so that is what we want.
  document.head.insertBefore(template.content, anchor)
  current.forEach((el) => el.remove())
  // The client preview pins its own noindex (scripts/preview-noindex.mjs): it wins over the page's robots tag.
  if (document.head.querySelector('meta[name="robots"]:not([data-seo])')) {
    document.head.querySelector('meta[name="robots"][data-seo]')?.remove()
  }
  applied = html
}
