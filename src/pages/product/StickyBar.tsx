import type { MouseEvent } from 'react'
import { BuyBar } from '@/components/brand'
import { planFactKey, type Plan } from '@/lib/facts'
import { routeHref } from '@/lib/site'
import { barAccentClass, barLabel } from '../home/FloatingActions.parts'
import type { PlanProduct } from './data'
import { NB, planPrices } from './facts-text'

/**
 * product-stickybar: the plan on phones (price, what it is for, « Commander », the short form of « Commander ma
 * formule »: the same action as the buy box, straight to /commande/ with the plan). The price follows the screens
 * option chosen in the buy box. As on the home page it starts hidden (kit BuyBar `startHidden`): the first screen
 * shows the price once, in the buy box, and no bar slides away at the first scroll. It shows once the buy box has
 * been scrolled past and steps aside while the closing panel is on screen (both carry data-buybar-watch).
 */
export function StickyBar({
  product,
  sold,
  priceFact,
  onBuy,
}: {
  product: PlanProduct
  /** The plan as sold with the chosen screens option. */
  sold: Plan
  /** data-pending key of that price when it is not the plan's own (plans.screens.options). */
  priceFact?: string | null
  onBuy: (e: MouseEvent<HTMLElement>) => void
}) {
  const { plan } = product
  const prices = planPrices(sold)
  return (
    <BuyBar
      dataSection="product-stickybar"
      startHidden
      old={prices.old}
      price={prices.price}
      pricePending={{ what: 'prix', fact: priceFact ?? planFactKey(plan.id, 'price') }}
      label={barLabel(plan.months)}
      labelVisible
      cta={{
        label: 'Commander',
        ariaLabel: `Commander la formule ${plan.months}${NB}mois`,
        href: routeHref('/commande/'),
        onClick: onBuy,
      }}
      className={barAccentClass}
    />
  )
}
