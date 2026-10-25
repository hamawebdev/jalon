// Routes: every page in every language (src/i18n/routes.ts), each inside its language's layout.
// A new page needs its id in PAGES and its slugs in SLUGS (src/i18n/routes.ts), its title and description in the
// meta dictionary, and its component below.
import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { Route, Routes } from 'react-router'
import { SiteLayout } from '@/components/site/SiteLayout'
import { DEFAULT_LANG, LANGS, LOCALES } from '@/i18n/locales'
import { PAGES, pathFor, type PageId } from '@/i18n/routes'

const NotFound = lazy(() => import('@/pages/NotFound'))

export const PAGE_COMPONENTS: Record<PageId, LazyExoticComponent<ComponentType>> = {
  home: lazy(() => import('@/pages/Home')),
  boutique: lazy(() => import('@/pages/Boutique')),
  revendeur: lazy(() => import('@/pages/Revendeur')),
  telecharger: lazy(() => import('@/pages/Telecharger')),
  contact: lazy(() => import('@/pages/Contact')),
  mentions: lazy(() => import('@/pages/legal/Mentions')),
  confidentialite: lazy(() => import('@/pages/legal/Confidentialite')),
  conditions: lazy(() => import('@/pages/legal/Conditions')),
}

export default function App() {
  return (
    <Routes>
      {LANGS.map((lang) => (
        <Route key={lang} element={<SiteLayout lang={lang} />}>
          {PAGES.map((page) => {
            const Page = PAGE_COMPONENTS[page]
            return <Route key={page} path={pathFor(page, lang)} element={<Page />} />
          })}
          <Route path={lang === DEFAULT_LANG ? '*' : `${LOCALES[lang].prefix}/*`} element={<NotFound />} />
        </Route>
      ))}
    </Routes>
  )
}
