import { useEffect, useLayoutEffect, useState, type AnchorHTMLAttributes, type RefObject } from 'react'
import { WHATSAPP_HREF } from '@/lib/site'
import { cn } from '@/lib/utils'
import { CtaButton, WhatsAppButton } from './Button'
import { joinWords, pendingText } from './identity'
import { Pending } from './Pending'
import { OldPrice, PriceLabel } from './Price'
import { SCOPE, WHATSAPP_FACT, fixedRootClass, whatsappPendingClass } from './recipes'
import { markerShown, slotShown } from './scope'
import type { Cta, PendingFact } from './types'

type BubbleProps = {
  /** Accessible name (« Écrire sur WhatsApp »). */
  label: string
  /**
   * The WhatsApp link (from facts). `null` = the number is not given yet: the bubble keeps its place in the
   * pending look, is not a link and carries data-pending="support.whatsapp". Launch mode: that look stays only
   * while the number is a required fact; otherwise there is no bubble.
   */
  href?: string | null
  /** The section hook (chrome-whatsapp once it is mounted in the layout). */
  dataSection?: string
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'>

const BUBBLE =
  'fixed right-6 bottom-6 z-50 grid size-14 place-items-center rounded-full text-[28px] shadow-float max-md:right-4 max-md:bottom-[88px]'

/**
 * Floating WhatsApp bubble: one for the whole site, mounted once in the layout (above the buy bar on phone).
 * A 56px circle, Nuit glyph on WhatsApp green with a white ring. It darkens on hover and press; it never pulses
 * or bounces. Extra props (target, rel …) go on the <a>.
 */
export function WhatsAppBubble({ label, href = WHATSAPP_HREF, dataSection, className, ...rest }: BubbleProps) {
  if (href == null) {
    if (!markerShown(WHATSAPP_FACT)) return null
    return (
      <span
        role="img"
        aria-label={joinWords(label, pendingText('numéro WhatsApp', WHATSAPP_FACT))}
        data-section={dataSection}
        data-pending={WHATSAPP_FACT}
        className={cn(SCOPE, BUBBLE, 'border-2', whatsappPendingClass, className)}
      >
        <i className="ti ti-brand-whatsapp" aria-hidden="true" />
      </span>
    )
  }
  return (
    <a
      {...rest}
      href={href}
      aria-label={label}
      data-section={dataSection}
      className={cn(
        SCOPE,
        BUBBLE,
        'bg-whatsapp text-nuit ring-2 ring-plate transition-colors duration-150 ease-calm hover:bg-whatsapp-hover active:bg-whatsapp-hover',
        className,
      )}
    >
      <i className="ti ti-brand-whatsapp" aria-hidden="true" />
    </a>
  )
}

/** Default selector of the elements the buy bar watches: every <Recap> carries data-buybar-watch. */
const WATCH_SELECTOR = '[data-buybar-watch]'

/**
 * Follows the watched elements. `watch` is a ref or a CSS selector resolved in the DOM (so the Recap and the bar
 * can live in different modules); elements that mount later are picked up.
 * - `observing`: at least one watched element is rendered and has reported its place
 * - `inView`: one of them intersects the viewport
 * - `passed`: one of them lies above the viewport (the visitor scrolled past it)
 * An element that is not rendered (display: none, removed) counts for nothing.
 *
 * The observer reports an element only when it enters or leaves the viewport. A jump (« Revenir en haut de la
 * page », the Home and End keys, an anchor, any scroll under reduced motion) can carry one from above the viewport to
 * below it, or back, without crossing it, and then no report comes. So an off-screen element's side is never
 * stored: it is read from its box each time the answer is worked out, on each report and once per frame while the
 * page scrolls or resizes.
 */
function useWatch(watch: RefObject<HTMLElement | null> | string) {
  const [observing, setObserving] = useState(false)
  const [inView, setInView] = useState(false)
  const [passed, setPassed] = useState(false)
  useLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    // Rendered watched elements, each with whether the observer last saw it on screen.
    const onScreen = new Map<Element, boolean>()
    const settle = () => {
      let anyIn = false
      let anyAbove = false
      for (const [el, seen] of onScreen) {
        if (seen) anyIn = true
        else if (el.getBoundingClientRect().top < 0) anyAbove = true
      }
      setObserving(onScreen.size > 0)
      setInView(anyIn)
      setPassed(anyAbove)
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const box = e.boundingClientRect
        if (!e.target.isConnected || (box.width === 0 && box.height === 0)) onScreen.delete(e.target)
        else onScreen.set(e.target, e.isIntersecting)
      }
      settle()
    })
    let frame = 0
    const onMove = () => {
      if (frame || onScreen.size === 0) return
      frame = requestAnimationFrame(() => {
        frame = 0
        settle()
      })
    }
    window.addEventListener('scroll', onMove, { passive: true })
    window.addEventListener('resize', onMove, { passive: true })
    const attach = () => {
      const els = typeof watch === 'string' ? Array.from(document.querySelectorAll(watch)) : watch.current ? [watch.current] : []
      els.forEach((el) => io.observe(el))
      return els.length > 0
    }
    let mo: MutationObserver | undefined
    if (!attach() && typeof MutationObserver !== 'undefined') {
      mo = new MutationObserver(() => {
        if (attach()) mo?.disconnect()
      })
      mo.observe(document.body, { childList: true, subtree: true })
    }
    return () => {
      io.disconnect()
      mo?.disconnect()
      window.removeEventListener('scroll', onMove)
      window.removeEventListener('resize', onMove)
      cancelAnimationFrame(frame)
      setObserving(false)
      setInView(false)
      setPassed(false)
    }
  }, [watch])
  return { observing, inView, passed }
}

/** Becomes true once the visitor has scrolled (scrollY > 8); a programmatic scrollTo(0, 0) does not count. */
function useHasScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    if (scrolled) return
    const on = () => {
      if (window.scrollY > 8) setScrolled(true)
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [scrolled])
  return scrolled
}

type BuyBarProps = {
  /** Reference price, only if real (owner fact). */
  old?: string | null
  /** Plan price (facts). `null` = not given yet: renders <Pending>. */
  price: string | null
  pricePending?: PendingFact
  /**
   * What the price is for, in a few words: duration and « prix total » (« 12 mois, prix total »). A price never
   * shows without it. sr-only unless `labelVisible`. Keep it short: it shares a phone's width with the button.
   */
  label?: string
  /** Show the label under the price, at every width. Default false (sr-only). */
  labelVisible?: boolean
  /**
   * Start hidden, for a page whose first screen already holds its main button (home). The bar then shows only
   * once the visitor has scrolled past a watched element (the hero offer card), and hides again while any watched
   * element is on screen. Default false: the bar is there from load (plan pages, whose button is further down).
   */
  startHidden?: boolean
  /**
   * Show a WhatsApp square before the button. Default false: the sticky header already carries one on phones.
   * `waLabel`, `waHref` and `waProps` are read only when this is true.
   */
  whatsapp?: boolean
  /** The WhatsApp name (sr-only on the 48px icon button). Needs `whatsapp`. */
  waLabel?: string
  /** The WhatsApp link (from facts); `null` = not given yet (pending look). Needs `whatsapp`. */
  waHref?: string | null
  /** Extra attributes for the WhatsApp link ({ target: '_blank', rel: 'noopener' }). Needs `whatsapp`. */
  waProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>
  /** `to` (router), `href` (plain <a>, e.g. "/checkout/" with onClick) or a button. */
  cta: Cta
  /**
   * What hides the bar while on screen. Default: every element with data-buybar-watch (each Recap has it; add
   * the attribute to any block that carries its own buy buttons, such as a plan grid).
   */
  watch?: RefObject<HTMLElement | null> | string
  dataSection?: string
  className?: string
}

/**
 * Phone buy bar (md:hidden): the price, what it is for, one button (the primary look, as every buy action). Docked
 * to the bottom edge, full width, white, its two top corners at the card radius, a hairline and the bar shadow. It
 * never competes with a block that sells the same thing: it slides away while a watched element (offer card, buy
 * box, plan grid, closing panel: data-buybar-watch) is on screen and comes back when it leaves.
 * - Default: visible from load; the watched elements hide it once the visitor has scrolled.
 * - `startHidden`: hidden from load, shown after the first watched element has been scrolled past.
 * Without IntersectionObserver, or with no watched element on the page: the default bar stays, a `startHidden`
 * bar shows once the visitor has scrolled. While mounted it adds html.has-buybar: index.css then reserves 88px
 * under the footer on phone. While the consent banner's sheet is open, the bar sits on top of the sheet.
 * Launch mode: a price that is a missing optional fact leaves the bar with its label (if visible) and its button.
 * Styling hooks: the two parts carry data-buybar-part="price" (absent when there is neither a price nor a visible
 * label) and data-buybar-part="actions"; target those from `className`, not the children's positions.
 */
export function BuyBar({
  old,
  price,
  pricePending,
  label,
  labelVisible,
  startHidden,
  whatsapp,
  waLabel,
  waHref,
  waProps,
  cta,
  watch = WATCH_SELECTOR,
  dataSection,
  className,
}: BuyBarProps) {
  const { observing, inView, passed } = useWatch(watch)
  const scrolled = useHasScrolled()
  const hidden = startHidden ? (observing ? inView || !passed : !scrolled) : inView && scrolled
  const priceShown = slotShown(price, pricePending?.fact)
  // The price column holds the price and the bar's label. With neither on screen it would only add a gap, so the
  // label (then for screen readers only) moves in front of the actions.
  const columnShown = priceShown || (!!label && !!labelVisible)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.add('has-buybar')
    return () => root.classList.remove('has-buybar')
  }, [])

  return (
    <div
      data-section={dataSection}
      inert={hidden || undefined}
      className={cn(
        fixedRootClass.light,
        'fixed inset-x-0 bottom-0 z-[45] flex items-center gap-3 rounded-t-card border-t border-hairline px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-bar md:hidden',
        // While the consent sheet is open (html.has-consent, --consent-h: <ConsentBanner>), the bar rides on top of
        // it, so the page's main button is never under the sheet. Its lowest 28px (the sheet's corner radius) tuck
        // under the sheet, which sits above it, so no page shows through the sheet's rounded corners.
        '[.has-consent_&]:bottom-[calc(var(--consent-h,0px)-28px)] [.has-consent_&]:pb-10',
        'transition-transform duration-200 ease-calm',
        // 32px further than its own height: the bar's shadow (cast upwards) leaves the screen with it.
        hidden && 'translate-y-[calc(100%+32px)]',
        className,
      )}
    >
      {columnShown && (
        // At most 45% of the bar: a long label or a marker wraps under the price and the button keeps its room.
        <div data-buybar-part="price" className="max-w-[45%] min-w-0 font-sans">
          {price != null && old && <OldPrice className="block text-micro leading-tight text-ink-muted">{old}</OldPrice>}
          {price == null ? (
            <Pending what={pricePending?.what ?? 'prix'} fact={pricePending?.fact} />
          ) : (
            <b className="price-num block text-price-sm text-ink">
              {old && <PriceLabel />}
              {price}
            </b>
          )}
          {label && (
            <span className={labelVisible ? 'block font-sans text-micro font-medium [text-wrap:balance] text-ink-muted' : 'sr-only'}>{label}</span>
          )}
        </div>
      )}
      <div data-buybar-part="actions" className="flex min-w-0 flex-1 items-center justify-end gap-3">
        {!columnShown && label && <span className="sr-only">{label}</span>}
        {whatsapp && waLabel && <WhatsAppButton {...waProps} label={waLabel} href={waHref} iconOnly />}
        <CtaButton cta={cta} variant="primary" size="md" className="min-h-12 flex-1" />
      </div>
    </div>
  )
}
