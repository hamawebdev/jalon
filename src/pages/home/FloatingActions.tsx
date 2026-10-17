import { BuyBar } from '@/components/brand'
import { featuredPlan, planFactKey } from '@/lib/facts'
import { NB, planPrices } from '../product/facts-text'
import { ROUTES } from './data'
import { barAccentClass, barLabel } from './FloatingActions.parts'

/**
 * home-floating-buybar: the featured plan on phones (price, what it is for, and the way to its product page, so the
 * visitor sees what the plan contains before paying). It starts hidden: the first screen keeps one main action. It
 * shows once the hero offer card has been scrolled past, and steps aside again while the plan grid is on screen
 * (both carry data-buybar-watch).
 */
export function MobileBuyBar() {
  const plan = featuredPlan()
  const prices = planPrices(plan)
  const months = `${plan.months}${NB}mois`
  return (
    <BuyBar
      dataSection="home-floating-buybar"
      startHidden
      old={prices.old}
      price={prices.price}
      pricePending={{ what: 'prix', fact: planFactKey(plan.id, 'price') }}
      label={`${barLabel(plan.months)}${prices.saving ? ` · ${prices.saving}` : ''}`}
      labelVisible
      cta={{ label: 'Choisir cette formule', to: ROUTES.featured, ariaLabel: `Choisir cette formule de ${months}` }}
      className={barAccentClass}
    />
  )
}
