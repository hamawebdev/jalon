// Language pill dropdown with flags (brief p. 35, « Monday.com Pill Dropdown »), and the plain list the phone menu
// shows. Choosing a language keeps the reader on the same page (and section). No Arabic. Owner: chrome.
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Link } from 'react-router'
import { useLang, useT } from '@/i18n/context'
import { LOCALES } from '@/i18n/locales'
import { cn } from '@/lib/utils'
import { useLanguageLinks } from './chrome/hooks'
import { Flag } from './Flags'

/** Header dropdown: a pill button opening a menu of the 7 languages (menu-button pattern, arrow keys, Escape). */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useT()
  const lang = useLang()
  const links = useLanguageLinks()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const menuId = useId()
  const buttonId = useId()
  // Which item to focus once the menu has opened (index, or -1 for the last one).
  const focusOnOpen = useRef(0)

  useEffect(() => {
    if (!open) return
    const items = itemRefs.current
    const index = focusOnOpen.current < 0 ? items.length - 1 : focusOnOpen.current
    items[index]?.focus()
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const currentIndex = Math.max(
    0,
    links.findIndex((l) => l.current),
  )

  function openMenu(focus: number) {
    focusOnOpen.current = focus
    setOpen(true)
  }

  function close(returnFocus: boolean) {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }

  function onButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openMenu(currentIndex)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      openMenu(-1)
    }
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const items = itemRefs.current.filter((el): el is HTMLAnchorElement => !!el)
    const index = items.indexOf(document.activeElement as HTMLAnchorElement)
    const move = (to: number) => {
      event.preventDefault()
      items[(to + items.length) % items.length]?.focus()
    }
    switch (event.key) {
      case 'ArrowDown':
        return move(index + 1)
      case 'ArrowUp':
        return move(index - 1)
      case 'Home':
        return move(0)
      case 'End':
        return move(items.length - 1)
      case 'Escape':
        event.preventDefault()
        return close(true)
      case 'Tab':
        return setOpen(false)
      default: {
        // Type-ahead: first letter of a language name.
        if (event.key.length === 1 && /\S/.test(event.key)) {
          const key = event.key.toLowerCase()
          const start = index + 1
          for (let i = 0; i < items.length; i++) {
            const j = (start + i) % items.length
            if (links[j]?.name.toLowerCase().startsWith(key)) return move(j)
          }
        }
      }
    }
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={t.chrome.language.button(LOCALES[lang].name)}
        onClick={() => (open ? close(false) : openMenu(currentIndex))}
        onKeyDown={onButtonKeyDown}
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white pl-3 pr-2.5 text-sm font-semibold text-ink shadow-pill transition-colors hover:border-primary/40 hover:bg-primary-soft/50',
          open && 'border-primary/40 bg-primary-soft/50',
        )}
      >
        <Flag lang={lang} className="h-3.5 w-5" />
        <span className="uppercase">{lang}</span>
        <ChevronDown aria-hidden className={cn('size-4 text-slate transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open ? (
        <ul
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 rounded-2xl border border-line bg-white p-1.5 shadow-glow motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95"
        >
          {links.map((link, i) => (
            <li key={link.lang} role="none">
              <Link
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                role="menuitem"
                tabIndex={-1}
                to={link.to}
                hrefLang={link.hrefLang}
                lang={link.hrefLang}
                aria-current={link.current ? 'true' : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-medium text-ink outline-none transition-colors hover:bg-mist focus-visible:bg-primary-soft focus-visible:outline-none',
                  link.current && 'font-semibold text-primary',
                )}
              >
                <Flag lang={link.lang} />
                <span className="flex-1">{link.name}</span>
                {link.current ? <Check aria-hidden className="size-4 text-primary" /> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

/** Plain list of languages for the phone menu: every language visible, the current one marked. */
export function LanguageList({ onNavigate, labelledBy }: { onNavigate?: () => void; labelledBy?: string }) {
  const links = useLanguageLinks()
  return (
    <ul aria-labelledby={labelledBy} className="grid grid-cols-2 gap-2">
      {links.map((link) => (
        <li key={link.lang}>
          <Link
            to={link.to}
            hrefLang={link.hrefLang}
            lang={link.hrefLang}
            aria-current={link.current ? 'true' : undefined}
            onClick={onNavigate}
            className={cn(
              'flex h-12 items-center gap-3 rounded-2xl border px-3.5 text-[15px] font-medium transition-colors',
              link.current ? 'border-primary/40 bg-primary-soft font-semibold text-primary' : 'border-line bg-white text-ink hover:bg-mist',
            )}
          >
            <Flag lang={link.lang} />
            <span className="flex-1 truncate">{link.name}</span>
            {link.current ? <Check aria-hidden className="size-4" /> : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}
