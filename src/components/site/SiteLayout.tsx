// The frame of every page: trust banner, header, page, footer. Scrolls to the top on a new page and to the
// section on a #hash link. Owner: lead.
import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { LangProvider, useT } from '@/i18n/context'
import type { Lang } from '@/i18n/locales'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { TrustBanner } from './TrustBanner'

function useScrollOnNavigate() {
  // `key` changes on every navigation, also a click on a link to the page already shown (footer « Boutique » on the
  // Boutique page, the logo on the home page): that click scrolls back to the top or to the section too.
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    // The section may be in a page chunk that is still loading: try for a short while.
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const timer = window.setInterval(() => {
      const el = document.getElementById(id)
      if (el || ++tries > 40) {
        window.clearInterval(timer)
        el?.scrollIntoView({ block: 'start' })
      }
    }, 50)
    return () => window.clearInterval(timer)
  }, [pathname, hash, key])
}

function Frame() {
  const t = useT()
  useScrollOnNavigate()
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {t.chrome.skipToContent}
      </a>
      <TrustBanner />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

export function SiteLayout({ lang }: { lang: Lang }) {
  return (
    <Suspense fallback={null}>
      <LangProvider lang={lang}>
        <Frame />
      </LangProvider>
    </Suspense>
  )
}
