import { useCallback, useId, useRef } from 'react'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { Button, ButtonLink, Carte, IconTile, Pending, drawerClass, overlayClass, overlayClosedClass } from '@/components/brand'
import { CART_DRAWER_ID, cartTotal, formatEuro, useChrome, type CartItem } from './chrome-context'
import { closedPanel, usePanelFocus } from './SiteLayout.focus'

/** A line's Carte thumbnail, from the months and kind the product page passed (never parsed from the id). */
export function CartThumb({ item }: { item: CartItem }) {
  if (item.months == null) return null
  return <Carte size="thumb" months={String(item.months)} plan={item.name} variant={item.kind ?? 'plan'} />
}

// A row on the sheet, not a card in a card: the thumbnail, then the name and the amount on one baseline (the amount
// on the right edge), then « Retirer ». When the two do not fit side by side (a pending marker is far wider than a
// price) the amount moves under the name, still on the right edge, so the name keeps its words whole and the
// marker never squeezes it, in a phone-width sheet as in the 420px one.
function CartLine({ item, onRemove }: { item: CartItem; onRemove: () => void }) {
  return (
    <li className="flex items-start gap-4 border-b border-hairline py-5 last:border-b-0">
      <CartThumb item={item} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h3 className="min-w-0 font-display text-title text-ink">{item.name}</h3>
          <p className="ml-auto max-w-full text-right">
            {item.price == null ? (
              <Pending what="prix" fact={item.priceFact} />
            ) : (
              <span className="price-num text-price-sm text-ink">{formatEuro(item.price)}</span>
            )}
          </p>
        </div>
        {/* A 44px target; the negative bottom margin gives back what the box adds under the line. */}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Retirer ${item.name} du panier`}
          className="-mb-2.5 inline-flex min-h-11 items-center rounded-tag font-sans text-meta font-medium text-ink-soft underline decoration-1 underline-offset-3 transition-colors duration-150 ease-calm hover:text-ink hover:decoration-2"
        >
          Retirer
        </button>
      </div>
    </li>
  )
}

// Cart drawer (chrome-cart): the menu's sheet, from the right. A head as tall as the header (« Votre panier » and the
// « Fermer » pill), the lines, then the total and the one action pinned to the bottom. Front-end only: it lists the
// lines added on this visit.
export function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, removeFromCart } = useChrome()
  const total = cartTotal(cartItems)
  const missing = cartItems.find((i) => i.price == null)
  const panel = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const close = useCallback(() => setCartOpen(false), [setCartOpen])
  usePanelFocus(cartOpen, panel, close)
  const empty = cartItems.length === 0

  return (
    <>
      <div className={cn(overlayClass, !cartOpen && overlayClosedClass)} onClick={close} aria-hidden="true" />
      <div
        ref={panel}
        id={CART_DRAWER_ID}
        className={cn(drawerClass, !cartOpen && closedPanel)}
        data-section="chrome-cart"
        role="dialog"
        aria-modal={cartOpen || undefined}
        aria-labelledby={titleId}
        aria-hidden={!cartOpen}
        inert={!cartOpen}
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-hairline px-5 md:px-7 lg:h-[72px]">
          <h2 id={titleId} className="font-display text-title text-ink">
            Votre panier
          </h2>
          <Button variant="quiet" size="sm" iconEnd="ti-x" onClick={close}>
            Fermer
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 md:px-7">
          {empty ? (
            <div className="flex h-full min-h-60 flex-col items-start justify-center py-12">
              <IconTile icon="ti-shopping-cart" size={48} />
              <p className="mt-5 max-w-[30ch] font-sans text-copy text-ink-soft">
                Votre panier est vide. Commencez par choisir une formule.
              </p>
              <ButtonLink to="/abonnements/" variant="secondary" size="md" className="mt-6" onClick={close}>
                Choisir ma formule
              </ButtonLink>
            </div>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <CartLine key={item.id} item={item} onRemove={() => removeFromCart(item.id)} />
              ))}
            </ul>
          )}
        </div>

        {!empty && (
          <div className="shrink-0 border-t border-hairline bg-paper px-5 pt-5 pb-[calc(20px+env(safe-area-inset-bottom))] md:px-7 md:pt-6">
            <dl className="font-sans">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-small font-semibold text-ink">Total</dt>
                <dd className="m-0 grid justify-items-end gap-1.5 text-right">
                  {total == null ? (
                    <Pending variant="block" what="prix" fact={missing?.priceFact} />
                  ) : (
                    <span className="price-num text-price-md text-ink">{formatEuro(total)}</span>
                  )}
                  <span className="text-meta font-medium text-ink-muted">
                    {FACTS.pricing.vat ?? <Pending what="mention TVA" fact="pricing.vat" />}
                  </span>
                </dd>
              </div>
            </dl>
            <ButtonLink to="/commande/" size="lg" iconEnd="arrow" full className="mt-5" onClick={close}>
              Valider mon panier
            </ButtonLink>
          </div>
        )}
      </div>
    </>
  )
}
