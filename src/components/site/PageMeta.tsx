// Keeps the page's <head> (title, description, canonical, hreflang alternates, Open Graph / Twitter tags, JSON-LD)
// and <html lang> in step with the route in the browser. Prerendered pages carry the same head from the start
// (src/entry-server.tsx, scripts/prerender.mjs): both come from buildHead() in ./seo/head.ts. Owner: seo.
import { useEffect } from 'react'
import { useLang, useT } from '@/i18n/context'
import { applyHead } from './seo/apply'
import { buildHead, type MetaPageId } from './seo/head'

export function PageMeta({ page }: { page: MetaPageId }) {
  const t = useT()
  const lang = useLang()
  useEffect(() => {
    applyHead(buildHead(page, lang, t))
  }, [t, lang, page])
  return null
}
