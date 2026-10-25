// Small browser hooks of the site frame. Safe for prerendering: the server snapshot is the top of the page.
import { useSyncExternalStore } from 'react'
import { useLocation } from 'react-router'
import { LANGS, LOCALES, type Lang } from '@/i18n/locales'
import { parsePath, pathFor } from '@/i18n/routes'

function subscribeScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}

/** True once the page is scrolled past `offset` px. Always false on the server. */
export function useScrolledPast(offset: number): boolean {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > offset,
    () => false,
  )
}

export interface LanguageLink {
  lang: Lang
  name: string
  hrefLang: string
  to: string
  current: boolean
}

/** The current page in every language (same section #hash); an unknown page links to that language's home. */
export function useLanguageLinks(): LanguageLink[] {
  const { pathname, hash } = useLocation()
  const { lang: current, page } = parsePath(pathname)
  return LANGS.map((lang) => ({
    lang,
    name: LOCALES[lang].name,
    hrefLang: LOCALES[lang].htmlLang,
    to: page ? `${pathFor(page, lang)}${hash}` : pathFor('home', lang),
    current: lang === current,
  }))
}
