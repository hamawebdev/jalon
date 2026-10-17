import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { FACTS } from '@/lib/facts'
import { BRAND, MAIN_NAV, WHATSAPP_CHAT_HREF, WHATSAPP_LABEL, WHATSAPP_LINK_PROPS, isCurrent } from '@/lib/site'
import { cn } from '@/lib/utils'
import {
  Button,
  CartCount,
  WhatsAppButton,
  Wordmark,
  headerClass,
  headerNavLinkClass,
  navCurrentClass,
} from '@/components/brand'
import { CART_DRAWER_ID, SIDE_MENU_ID, cartCount, cartLabel, useChrome } from './chrome-context'

// Sticky header (chrome-header): a full-width paper bar that turns white, with its hairline and the lift shadow,
// after 8px of scroll. The lockup on the left, the five menu links centred from lg, then the cart; below lg the
// menu trigger, and on phones the WhatsApp circle (the floating WhatsApp button is hidden there).
// Phone fit: the lockup (173px) and three 44px circles share a 328px row at 360px, so below lg the row gap is 8px
// and below sm the buttons sit 6px apart (325px). Under 360px (22.5rem) they cannot fit with both gutters
// whatever the gaps, so the wordmark goes without its descriptor there. The labelled « Menu » pill (90px) needs
// 46px more than the circle: it takes over from 420px (26.25rem), where the row has room for it.
// Large text on a small phone (QA closing r2: 22 and 24px text on a 320px screen): the short row is 15.8125rem
// (gutters 2rem, wordmark 4.3125rem, gap 0.5rem, three circles and their gaps 9rem) and every part of it follows
// the text size, so below a 15.8125rem screen the WhatsApp circle goes; it stays in the menu, pinned to its foot.
// At 16 to 20px text no phone is that narrow, so nothing changes there.
export function SiteHeader() {
  const { pathname } = useLocation()
  const { cartOpen, setCartOpen, sideOpen, setSideOpen, cartItems } = useChrome()
  const [scrolled, setScrolled] = useState(false)
  const count = cartCount(cartItems)
  const portal = FACTS.account.portal

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header id="Header" data-section="chrome-header" className={cn(headerClass.base, scrolled ? headerClass.scrolled : 'bg-paper')}>
      <div className={cn(headerClass.inner, 'lg:grid lg:grid-cols-[1fr_auto_1fr]')}>
        <Link
          to="/"
          aria-label={`${BRAND}, accueil`}
          className="-my-2 inline-flex min-h-11 items-center self-center justify-self-start rounded-control py-2"
        >
          <span aria-hidden="true">
            <Wordmark size="header" descriptor className="max-[22.5rem]:hidden" />
            <Wordmark size="header" className="min-[22.5rem]:hidden" />
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={isCurrent(pathname, item.to) ? 'page' : undefined}
                  className={cn(headerNavLinkClass, navCurrentClass)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:ml-0 lg:justify-self-end">
          {portal && (
            <a
              href={portal}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mon compte (nouvel onglet)"
              className={cn(headerNavLinkClass, 'mr-2 max-sm:hidden')}
            >
              Mon compte
            </a>
          )}
          <WhatsAppButton
            {...(WHATSAPP_CHAT_HREF ? WHATSAPP_LINK_PROPS : {})}
            label={WHATSAPP_CHAT_HREF ? WHATSAPP_LABEL : 'Écrire sur WhatsApp'}
            href={WHATSAPP_CHAT_HREF}
            iconOnly
            size="sm"
            className="max-[15.8125rem]:hidden md:hidden"
          />
          <Button
            variant="icon"
            aria-label={cartLabel(count)}
            aria-haspopup="dialog"
            aria-expanded={cartOpen}
            aria-controls={CART_DRAWER_ID}
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <i className="ti ti-shopping-cart" aria-hidden="true" />
            {count > 0 && <CartCount count={count} />}
          </Button>
          <Button
            variant="icon"
            aria-label="Ouvrir le menu"
            aria-haspopup="dialog"
            aria-expanded={sideOpen}
            aria-controls={SIDE_MENU_ID}
            className="min-[26.25rem]:hidden"
            onClick={() => setSideOpen(true)}
          >
            <i className="ti ti-menu-2" aria-hidden="true" />
          </Button>
          <Button
            variant="quiet"
            size="sm"
            iconStart="ti-menu-2"
            aria-haspopup="dialog"
            aria-expanded={sideOpen}
            aria-controls={SIDE_MENU_ID}
            className="max-[26.25rem]:hidden lg:hidden"
            onClick={() => setSideOpen(true)}
          >
            Menu
          </Button>
        </div>
      </div>
    </header>
  )
}
