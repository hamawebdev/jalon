// Sticky white header (brief pp. 40–41): logo, the five pages, the language pill dropdown with flags and the violet
// WhatsApp pill (activation / quick renewal). Slightly transparent with a blur once the page scrolls. Phones: a menu
// button opens a sheet with the pages, the languages and the WhatsApp button. Owner: chrome.
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { WhatsAppButton } from '@/components/kit'
import { useLang, useT } from '@/i18n/context'
import { parsePath, pathFor, type PageId } from '@/i18n/routes'
import { activateMessage } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import { useScrolledPast } from './chrome/hooks'
import { LanguageList, LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'

const NAV: Exclude<PageId, 'mentions' | 'confidentialite' | 'conditions'>[] = [
  'home',
  'boutique',
  'revendeur',
  'telecharger',
  'contact',
]

function useCurrentPage(): PageId | null {
  return parsePath(useLocation().pathname).page
}

export function SiteHeader() {
  const t = useT()
  const lang = useLang()
  const current = useCurrentPage()
  const scrolled = useScrolledPast(8)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback((returnFocus: boolean) => {
    setMenuOpen(false)
    if (returnFocus) menuButtonRef.current?.focus()
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 border-b border-line transition-[background-color,box-shadow] duration-300',
          scrolled ? 'bg-white/80 shadow-pill backdrop-blur-lg backdrop-saturate-150' : 'bg-white',
        )}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-site items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link to={pathFor('home', lang)} aria-label={t.chrome.header.homeLink} className="shrink-0 rounded-xl">
            <Logo />
          </Link>

          <nav aria-label={t.chrome.nav.label} className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((page) => {
                const active = page === current
                return (
                  <li key={page}>
                    <Link
                      to={pathFor(page, lang)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'inline-flex h-10 items-center rounded-full px-4 text-[15px] font-semibold transition-colors',
                        active ? 'bg-primary-soft text-primary' : 'text-ink/80 hover:bg-mist hover:text-ink',
                      )}
                    >
                      {t.chrome.nav[page]}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <LanguageSwitcher className="hidden sm:block" />
            <WhatsAppButton
              message={activateMessage()}
              variant="primary"
              size="sm"
              arrow={false}
              className="hidden h-10 sm:inline-flex"
            >
              <span className="hidden xl:inline">{t.chrome.header.whatsapp}</span>
              <span className="xl:hidden">{t.chrome.header.whatsappShort}</span>
            </WhatsAppButton>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={t.chrome.header.menuOpen}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-pill transition-colors hover:bg-mist lg:hidden"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </header>
      {/* Outside <header>: its backdrop-filter would make it the containing block of the fixed sheet. */}
      {menuOpen ? <MobileMenu current={current} onClose={closeMenu} /> : null}
    </>
  )
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function MobileMenu({ current, onClose }: { current: PageId | null; onClose: (returnFocus: boolean) => void }) {
  const t = useT()
  const lang = useLang()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const langTitleId = useId()

  useEffect(() => {
    closeRef.current?.focus()
    const { body, documentElement } = document
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }
    const gutter = window.innerWidth - documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gutter > 0) body.style.paddingRight = `${gutter}px`
    // The sheet is for phones and tablets: close it if the window grows to the desktop layout.
    const wide = window.matchMedia('(min-width: 1024px)')
    const onWide = () => wide.matches && onClose(false)
    wide.addEventListener('change', onWide)
    return () => {
      body.style.overflow = previous.overflow
      body.style.paddingRight = previous.paddingRight
      wide.removeEventListener('change', onWide)
    }
  }, [onClose])

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose(true)
      return
    }
    if (event.key !== 'Tab' || !panelRef.current) return
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const navigate = () => onClose(false)

  return (
    <div className="fixed inset-0 z-50 lg:hidden" onKeyDown={onKeyDown}>
      <div
        aria-hidden
        onClick={() => onClose(true)}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in-0"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-full flex-col sm:max-w-sm overflow-y-auto bg-white shadow-glow motion-safe:animate-in motion-safe:slide-in-from-right-8 motion-safe:fade-in-0"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-4">
          <Link to={pathFor('home', lang)} onClick={navigate} aria-label={t.chrome.header.homeLink} className="rounded-xl">
            <Logo />
          </Link>
          <h2 id={titleId} className="sr-only">
            {t.chrome.header.menuTitle}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label={t.chrome.header.menuClose}
            onClick={() => onClose(true)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:bg-mist"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <nav aria-label={t.chrome.nav.label} className="px-4 pt-5">
          <ul className="flex flex-col gap-1">
            {NAV.map((page) => {
              const active = page === current
              return (
                <li key={page}>
                  <Link
                    to={pathFor(page, lang)}
                    onClick={navigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex h-13 items-center rounded-2xl px-4 font-display text-lg font-semibold transition-colors',
                      active ? 'bg-primary-soft text-primary' : 'text-ink hover:bg-mist',
                    )}
                  >
                    {t.chrome.nav[page]}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="px-4 pt-6">
          <p id={langTitleId} className="mb-3 px-1 text-xs font-bold uppercase tracking-wide text-slate">
            {t.chrome.header.menuLanguages}
          </p>
          <LanguageList onNavigate={navigate} labelledBy={langTitleId} />
        </div>

        <div className="mt-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8">
          <WhatsAppButton message={activateMessage()} variant="primary" size="lg" className="w-full">
            {t.chrome.header.menuWhatsapp}
          </WhatsAppButton>
        </div>
      </div>
    </div>
  )
}
