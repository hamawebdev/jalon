import { createContext, useContext } from 'react'
import { formatEuro as formatEuroFr } from '@/lib/facts'

/** What a cart line sells: a plan, a renewal or a trial. It picks the Carte thumbnail; never parsed from the id. */
export type CartKind = 'plan' | 'renew' | 'trial'

export type CartItem = {
  /** Line id: one line per id. */
  id: string
  /** Line name, as GLOSSARY §1 writes it: « Formule 12 mois », « Renouvellement 6 mois ». */
  name: string
  /**
   * Unit price from FACTS (plans.<id>.price). `null` while the owner has not given it: the line, the subtotal
   * and the total then render <Pending> (APPROVAL §3).
   */
  price: number | null
  qty: number
  /** Duration in months, from the plan data (Carte thumbnail). Without it the line shows no thumbnail. */
  months?: number
  /**
   * Screen count of a plan line sold with screen options (plans.screens.options). The order hand-off picks the
   * payment link of that count when the owner gives one per count (facts.ts handoffFor()); without it, no hand-off.
   */
  screens?: number
  /** Plan, renewal or trial (Carte thumbnail). Default: plan. */
  kind?: CartKind
  /** facts.ts key of the price, rendered as data-pending while the price is null (planFactKey(id, 'price')). */
  priceFact?: string
}

/** Line id of the reseller entry pack (/revendeur/ › reseller-packs): the order hand-off knows the pack by it. */
export const PACK_LINE_ID = 'pack-depart-revendeur'

export type ChromeState = {
  sideOpen: boolean
  setSideOpen: (open: boolean) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  cartItems: CartItem[]
  /** Adds an item to the local cart and opens the cart drawer. Nothing is submitted. */
  addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  /**
   * The buy buttons' action: the cart then holds this one line (a household orders one duration, so a line chosen
   * earlier is replaced), the drawer stays closed and the visitor lands on /commande/, where the form shows the
   * plan and its total. Nothing is submitted.
   */
  orderPlan: (item: Omit<CartItem, 'qty'>) => void
  removeFromCart: (id: string) => void
  setQty: (id: string, qty: number) => void
  /** Empties the cart (after an order is handed over). */
  clearCart: () => void
}

export const ChromeContext = createContext<ChromeState | null>(null)

/** Element ids of the two sheets, for their triggers' aria-controls. */
export const SIDE_MENU_ID = 'menu-principal'
export const CART_DRAWER_ID = 'panier'

export function useChrome() {
  const ctx = useContext(ChromeContext)
  if (!ctx) throw new Error('useChrome must be used inside <SiteLayout>')
  return ctx
}

/** Accessible name of a control that opens the cart, by state (chrome.md › chrome-header). */
export function cartLabel(count: number) {
  if (count === 0) return 'Ouvrir le panier, vide'
  return count === 1 ? 'Ouvrir le panier, 1 article' : `Ouvrir le panier, ${count} articles`
}

/** Number of units in the cart. */
export function cartCount(items: readonly CartItem[]) {
  return items.reduce((sum, i) => sum + i.qty, 0)
}

/** Cart total in euros; `null` while any line has no price yet (the total then renders <Pending>). */
export function cartTotal(items: readonly CartItem[]): number | null {
  let total = 0
  for (const i of items) {
    if (i.price == null) return null
    total += i.price * i.qty
  }
  return Math.round(total * 100) / 100
}

/** French euro amount (« 59 € », « 12,50 € »), from facts.ts. A `null` amount stays `null` (render <Pending>). */
export function formatEuro(amount: number): string
export function formatEuro(amount: number | null): string | null
export function formatEuro(amount: number | null): string | null {
  return formatEuroFr(amount)
}
