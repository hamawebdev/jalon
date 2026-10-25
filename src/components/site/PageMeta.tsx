// Keeps <title>, meta description, canonical, hreflang alternates and <html lang> in step with the route in the
// browser. The built entry pages carry the same head from the start (scripts/static-head.mjs). Owner: seo.
import { useEffect } from 'react'
import { useLang, useT } from '@/i18n/context'
import { LOCALES } from '@/i18n/locales'
import type { PageId } from '@/i18n/routes'

export function PageMeta({ page }: { page: PageId | 'notFound' }) {
  const t = useT()
  const lang = useLang()
  useEffect(() => {
    const meta = t.meta.pages[page]
    document.title = meta.title
    document.documentElement.lang = LOCALES[lang].htmlLang
  }, [t, lang, page])
  return null
}
