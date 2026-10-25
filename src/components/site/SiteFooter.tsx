// Dark footer (brief p. 40, « Footer Officiel AtlasProTVOfficial »): brand column, quick links to the home sections
// and the pages, WhatsApp support, renewal, legal pages, payment methods, and a giant « ATLAS PRO ONTV » watermark.
// Also mounts the floating WhatsApp / back-to-top buttons. Owner: chrome.
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { RefreshCw } from 'lucide-react'
import { WhatsAppIcon } from '@/components/kit'
import { useLang, useT } from '@/i18n/context'
import { homeAnchor, pathFor, type HomeAnchor, type PageId } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { contactMessage, renewalMessage, waLink } from '@/lib/whatsapp'
import { FloatingActions } from './FloatingActions'
import { Logo } from './Logo'

/** The copyright year is fixed (no clock read during render: the pages are prerendered). */
const COPYRIGHT_YEAR = 2026

const SECTIONS = ['hero', 'why', 'apps', 'pricing', 'install', 'reviews', 'faq'] as const satisfies readonly HomeAnchor[]
const PAGES = ['boutique', 'revendeur', 'telecharger', 'contact'] as const satisfies readonly PageId[]
const LEGAL = ['mentions', 'confidentialite', 'conditions'] as const

const linkClass =
  'inline-flex min-h-10 items-center rounded-md py-1 text-[15px] text-white/70 transition-colors hover:text-white focus-visible:text-white sm:min-h-0'

function Column({ title, children, wide }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? 'col-span-2 md:col-span-1 lg:col-span-1' : undefined}>
      <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">{title}</h2>
      {children}
    </div>
  )
}

export function SiteFooter() {
  const t = useT()
  const lang = useLang()
  const f = t.chrome.footer
  const methods = FACTS.payment.methods ?? []

  return (
    <>
      <footer className="relative isolate overflow-hidden bg-ink text-white">
        <div className="mx-auto w-full max-w-site px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.35fr_1fr_0.8fr_1.35fr] lg:gap-10">
            <div className="col-span-2 flex flex-col items-start gap-5 lg:col-span-1">
              <Link to={pathFor('home', lang)} aria-label={f.homeLink} className="rounded-xl">
                <Logo tone="dark" />
              </Link>
              <p className="max-w-sm text-[15px] leading-relaxed text-white/70">{f.tagline}</p>
              {methods.length ? (
                <div>
                  <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-white/50">{f.paymentTitle}</p>
                  <ul className="flex flex-wrap gap-2">
                    {methods.map((method) => (
                      <li
                        key={method}
                        className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white/90"
                      >
                        {f.payment[method]}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <Column title={f.sectionsTitle}>
              <ul className="flex flex-col sm:gap-1">
                {SECTIONS.map((anchor) => (
                  <li key={anchor}>
                    <Link to={homeAnchor(anchor, lang)} className={linkClass}>
                      {f.sections[anchor]}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>

            <Column title={f.pagesTitle}>
              <ul className="flex flex-col sm:gap-1">
                {PAGES.map((page) => (
                  <li key={page}>
                    <Link to={pathFor(page, lang)} className={linkClass}>
                      {t.chrome.nav[page]}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>

            <Column title={f.supportTitle} wide>
              <div className="flex flex-col gap-3">
                {FACTS.whatsapp.display ? (
                  <a
                    href={waLink(contactMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp"
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:border-whatsapp/50 hover:bg-white/10"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                      <WhatsAppIcon className="size-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{f.support}</span>
                      <span className="font-display text-lg font-semibold text-white">{FACTS.whatsapp.display}</span>
                    </span>
                  </a>
                ) : null}
                <a
                  href={waLink(renewalMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  className="flex min-h-10 items-center gap-2 text-[15px] font-semibold text-white transition-colors hover:text-primary-soft"
                >
                  <RefreshCw aria-hidden className="size-4 text-status" />
                  {f.renewal}
                </a>
              </div>
              <h2 className="sr-only">{f.legalTitle}</h2>
              <ul className="mt-5 flex flex-col border-t border-white/10 pt-4">
                {LEGAL.map((page) => (
                  <li key={page}>
                    <Link to={pathFor(page, lang)} className={linkClass}>
                      {f[page]}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <p className="mt-14 border-t border-white/10 pt-6 text-sm text-white/50">
            {f.copyright(COPYRIGHT_YEAR, FACTS.brand.seller)}
          </p>
        </div>

        <p
          aria-hidden
          className="pointer-events-none -mb-[0.2em] select-none whitespace-nowrap px-2 text-center font-display text-[9vw] font-extrabold leading-none tracking-tight text-white/[0.04]"
        >
          {f.watermark}
        </p>
      </footer>
      <FloatingActions />
    </>
  )
}
