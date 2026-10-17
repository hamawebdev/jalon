import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { WhatsAppBubble, buttonVariants } from '@/components/brand'
import { useHashScroll } from '@/hooks/use-hash-scroll'
import { FACTS, present } from '@/lib/facts'
import { WHATSAPP_CHAT_HREF, WHATSAPP_LABEL, WHATSAPP_LINK_PROPS } from '@/lib/site'
import { cn } from '@/lib/utils'
import { SiteHeader } from './SiteHeader'
import { SideSlide } from './SideSlide'
import { CartDrawer } from './CartDrawer'
import { SiteFooter } from './SiteFooter'
import { ChromeContext, type CartItem, type ChromeState } from './chrome-context'
import { applyMeta, metaFor } from './page-meta'

/**
 * The consent banner, while cookies.tools (owner facts; none today) lists a tool: the kit shows it only for a tool
 * with consent: true (chrome.md › chrome-cookie, APPROVAL §2e), and the mounted banner is what hands the list to
 * every ConsentGate, an essential tool's included (brand HANDOFF §17.3). It is loaded on demand (ConsentMount, a
 * chunk of its own, requested on the first render), so with no tool nothing of it is downloaded, mounted or read from
 * the browser's storage, and every page weighs what it did before the banner existed (QA HC-08).
 */
const CONSENT = present(FACTS.cookies.tools) ? { tools: FACTS.cookies.tools, Mount: lazy(() => import('./ConsentMount')) } : null

export function SiteLayout() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const main = useRef<HTMLElement>(null)
  /** The page the visitor is on, to tell a navigation from the first load (and from a change of anchor). */
  const shownPath = useRef(pathname)
  const [sideOpen, setSideOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  // Polite announcements (chrome.md › chrome-cart live region). Cart changes: the action first and the line name
  // last, so no participle has to agree with a feminine or a masculine name (GLOSSARY §6). Page changes: the title
  // of the page that has just opened.
  const [announce, setAnnounce] = useState('')

  // Title, description and robots of the route (copy meta.md). A layout effect, so a page's own effect
  // (the checkout's per-state title) runs after it and wins.
  useLayoutEffect(() => {
    applyMeta(metaFor(pathname))
  }, [pathname])

  // New page: start at the top, unless the link targets an anchor on it (then scroll to the anchor).
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  useHashScroll(pathname, hash)

  // In-app navigation (not the first load): the keyboard and the screen reader follow the visitor to the new page.
  // Focus moves to <main>, unless the link targets an anchor, and the page title is said by the live region. The
  // title is read a moment later, so a page that refines it (the order page, per state) is announced as titled.
  useEffect(() => {
    if (shownPath.current === pathname) return
    shownPath.current = pathname
    if (!hash) main.current?.focus({ preventScroll: true })
    const timer = window.setTimeout(() => setAnnounce(document.title), 200)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  const skipToContent = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    main.current?.focus({ preventScroll: true })
    main.current?.scrollIntoView({ block: 'start' })
  }, [])

  // One line per subscription (PLANS §3.8): adding a plan that is already in the cart keeps one unit.
  const addToCart = useCallback<ChromeState['addToCart']>((item) => {
    setCartItems((items) => (items.some((i) => i.id === item.id) ? items : [...items, { ...item, qty: 1 }]))
    setAnnounce(`Ajouté au panier\u00a0: ${item.name}.`)
    setCartOpen(true)
  }, [])

  const orderPlan = useCallback<ChromeState['orderPlan']>(
    (item) => {
      setCartItems([{ ...item, qty: 1 }])
      setCartOpen(false)
      navigate('/commande/')
    },
    [navigate],
  )

  const removeFromCart = useCallback(
    (id: string) => {
      const gone = cartItems.find((i) => i.id === id)
      if (gone) setAnnounce(`Retiré du panier\u00a0: ${gone.name}.`)
      setCartItems((items) => items.filter((i) => i.id !== id))
    },
    [cartItems],
  )

  const setQty = useCallback((id: string, qty: number) => {
    setCartItems((items) => items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.round(qty) || 1) } : i)))
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  const value = useMemo<ChromeState>(
    () => ({ sideOpen, setSideOpen, cartOpen, setCartOpen, cartItems, addToCart, orderPlan, removeFromCart, setQty, clearCart }),
    [sideOpen, cartOpen, cartItems, addToCart, orderPlan, removeFromCart, setQty, clearCart],
  )

  return (
    <ChromeContext.Provider value={value}>
      <div className="relative bg-paper" id="Wrapper">
        {/* The first stop of every page: straight to the content, past the header. Hidden until it has focus. */}
        <a
          href="#Content"
          onClick={skipToContent}
          className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[90]')}
        >
          Aller au contenu
        </a>
        <SiteHeader />
        {/* Focusable by script only (the skip link, a page change); it draws no ring of its own. */}
        <main id="Content" ref={main} tabIndex={-1} className="outline-none">
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Outlet />
          </Suspense>
        </main>
        <SiteFooter />
      </div>
      <SideSlide />
      <CartDrawer />
      {CONSENT && (
        <Suspense fallback={null}>
          <CONSENT.Mount tools={CONSENT.tools} />
        </Suspense>
      )}
      {/* The one WhatsApp button of the site (chrome-whatsapp), tablet and desktop; phones have it in the header
          and the menu. While the number is pending the kit shows its pending look instead of a link. */}
      <WhatsAppBubble
        {...(WHATSAPP_CHAT_HREF ? WHATSAPP_LINK_PROPS : {})}
        label={WHATSAPP_CHAT_HREF ? WHATSAPP_LABEL : 'Écrire sur WhatsApp'}
        href={WHATSAPP_CHAT_HREF}
        dataSection="chrome-whatsapp"
        className="max-md:hidden"
      />
      <p className="sr-only" aria-live="polite" role="status">
        {announce}
      </p>
    </ChromeContext.Provider>
  )
}
