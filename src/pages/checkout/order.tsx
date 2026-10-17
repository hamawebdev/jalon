// Order data shared by the checkout states: the buyer's draft and the OrderSummary lines (no component here).
import { TextLink } from '@/components/brand'
import { CartThumb } from '@/components/site/CartDrawer'
import { cartTotal, formatEuro, type CartItem } from '@/components/site/chrome-context'
import { renewalPath } from '@/lib/facts'
import type { Values } from './fields'

/** What the buyer typed, kept when they come back to the form (« Modifier ma commande »). */
export type Draft = { values: Values; notes: string; method: string; cgv: boolean; immediate: boolean }

export const EMPTY_DRAFT: Draft = { values: {}, notes: '', method: '', cgv: false, immediate: false }

/**
 * Where the buyer goes to order something else than this line: the plans for a plan, the renewal page for a
 * renewal. A line that is neither (the reseller pack) has no such page.
 */
export function changeLink(item: CartItem): { to: string; label: string } | null {
  if (item.kind === 'renew') return { to: renewalPath(), label: 'Changer de durée' }
  if (item.months != null) return { to: '/abonnements/', label: 'Changer de formule' }
  return null
}

/**
 * Order lines and total for the kit's OrderSummary (a null price renders <Pending>). With `change`, each line
 * carries its way back under its name (the form; not the states that follow the submit).
 */
export function summaryProps(items: CartItem[], { change = false }: { change?: boolean } = {}) {
  const total = cartTotal(items)
  const missing = items.find((i) => i.price == null)
  return {
    lines: items.map((item) => {
      const link = change ? changeLink(item) : null
      return {
        thumb: <CartThumb item={item} />,
        name: item.name,
        meta: link ? (
          <TextLink to={link.to} standalone className="-my-2.5 font-medium">
            {link.label}
          </TextLink>
        ) : undefined,
        price: formatEuro(item.price),
        pricePending: { what: 'prix', fact: item.priceFact },
      }
    }),
    total: { label: 'Total', value: formatEuro(total), pending: { what: 'prix', fact: missing?.priceFact } },
  }
}
