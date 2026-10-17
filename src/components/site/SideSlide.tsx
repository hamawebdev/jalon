import { useCallback, useId, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { FACTS } from '@/lib/facts'
import { MAIN_NAV, WHATSAPP_CHAT_HREF, WHATSAPP_LABEL, WHATSAPP_LINK_PROPS, isCurrent } from '@/lib/site'
import { cn } from '@/lib/utils'
import {
  Button,
  CartCount,
  Pending,
  WhatsAppButton,
  overlayClass,
  overlayClosedClass,
  sideLinkClass,
  sideMenuClass,
} from '@/components/brand'
import { SIDE_MENU_ID, cartCount, cartLabel, cartTotal, formatEuro, useChrome } from './chrome-context'
import { closedPanel, usePanelFocus } from './SiteLayout.focus'

/**
 * A menu row: the kit's side link (display 600 at 24px, 56px tall, the square before the current page) with its
 * pressed fill and focus ring bleeding 12px past the text column at 12px corners. The hairline between rows is drawn
 * by the list item, so it keeps the column's width and never curves with the row's corners.
 */
const menuRowClass = cn(sideLinkClass, '-mx-3 rounded-control border-b-0 px-3')

/** A boxed row above the menu links (the cart, the customer portal): a 40px tile, the label, its trailing value. */
const boxRowClass = cn(
  'flex min-h-14 w-full items-center gap-3 rounded-inner border border-hairline bg-paper py-2 pr-4 pl-2 text-left',
  'transition-[border-color,background-color] duration-150 ease-calm hover:border-hairline-strong hover:bg-plate active:bg-nuit-100',
)
/** 8px corners: the row's 16px less its 8px inset. */
const boxTileClass = 'relative grid size-10 shrink-0 place-items-center rounded-tag bg-nuit-100 text-[20px] text-nuit-700'

// Mobile menu (chrome-side): the same sheet as the cart, from the right with its leading corners rounded. A head as
// tall as the header (« Menu » and the « Fermer » pill, on the body's column), the cart row, the customer portal
// once the owner runs one (the header has no room for it on phones), the five menu links, then the support hours
// and WhatsApp pinned to the bottom. A modal dialog like the cart drawer (role="dialog", aria-modal while open): it
// tells assistive technology to keep the reading inside the panel, as usePanelFocus keeps the keyboard there; focus
// lands on « Fermer » and goes back to the trigger on close.
export function SideSlide() {
  const { pathname } = useLocation()
  const { sideOpen, setSideOpen, setCartOpen, cartItems } = useChrome()
  const count = cartCount(cartItems)
  const total = cartTotal(cartItems)
  const missing = cartItems.find((i) => i.price == null)
  const portal = FACTS.account.portal
  const panel = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const close = useCallback(() => setSideOpen(false), [setSideOpen])
  usePanelFocus(sideOpen, panel, close)

  return (
    <>
      <div className={cn(overlayClass, !sideOpen && overlayClosedClass)} onClick={close} aria-hidden="true" />
      <div
        ref={panel}
        id={SIDE_MENU_ID}
        className={cn(sideMenuClass, 'shadow-float', !sideOpen && closedPanel)}
        role="dialog"
        aria-modal={sideOpen || undefined}
        aria-labelledby={titleId}
        aria-hidden={!sideOpen}
        inert={!sideOpen}
        data-section="chrome-side"
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-hairline px-5">
          <h2 id={titleId} className="font-display text-title text-ink">
            Menu
          </h2>
          <Button variant="quiet" size="sm" iconEnd="ti-x" onClick={close}>
            Fermer
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
          <button
            type="button"
            aria-label={cartLabel(count)}
            onClick={() => {
              setSideOpen(false)
              setCartOpen(true)
            }}
            className={boxRowClass}
          >
            <span className={boxTileClass}>
              <i className="ti ti-shopping-cart" aria-hidden="true" />
              {count > 0 && <CartCount count={count} />}
            </span>
            <span className="min-w-0 flex-1 font-sans text-small font-semibold text-ink">
              Panier <span className="font-medium text-ink-muted">· {count === 0 ? 'vide' : count}</span>
            </span>
            {count > 0 &&
              (total == null ? (
                <Pending what="prix" fact={missing?.priceFact} />
              ) : (
                <span className="money text-[1.0625rem] text-ink">{formatEuro(total)}</span>
              ))}
          </button>

          {/* The customer portal, in a new tab like the header's « Mon compte » (shown there from 640px). */}
          {portal && (
            <a
              href={portal}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mon compte (nouvel onglet)"
              onClick={close}
              className={cn(boxRowClass, 'mt-2.5')}
            >
              <span className={boxTileClass}>
                <i className="ti ti-id-badge-2" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 font-sans text-small font-semibold text-ink">Mon compte</span>
              <i className="ti ti-external-link shrink-0 text-[18px] text-ink-muted" aria-hidden="true" />
            </a>
          )}

          <nav aria-label="Navigation principale" className="mt-6">
            <ul>
              {MAIN_NAV.map((item) => (
                <li key={item.to} className="border-b border-hairline last:border-b-0">
                  <Link
                    to={item.to}
                    aria-current={isCurrent(pathname, item.to) ? 'page' : undefined}
                    className={menuRowClass}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid shrink-0 gap-3 border-t border-hairline px-5 pt-5 pb-[calc(20px+env(safe-area-inset-bottom))]">
          <p className="font-sans text-meta text-ink-soft">
            L’équipe vous répond sur WhatsApp&nbsp;:{' '}
            {FACTS.support.hours ? (
              `${FACTS.support.hours}.`
            ) : (
              <span className="inline-flex max-w-full items-end">
                <Pending what="horaires du support" fact="support.hours" className="min-w-0" />.
              </span>
            )}
          </p>
          <WhatsAppButton
            {...(WHATSAPP_CHAT_HREF ? { ...WHATSAPP_LINK_PROPS, 'aria-label': WHATSAPP_LABEL } : {})}
            label="Écrire sur WhatsApp"
            href={WHATSAPP_CHAT_HREF}
            size="md"
            full
          />
        </div>
      </div>
    </>
  )
}
