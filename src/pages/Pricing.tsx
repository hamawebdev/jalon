import { Kw } from '@/components/brand'
import { PlansFaq } from './pricing/Faq'
import { PlansGrid } from './pricing/Plans'
import { PlansRenewal } from './pricing/Renewal'
import { PlansResellerTeaser } from './pricing/ResellerTeaser'
import { PlansTrial } from './pricing/TrialTeaser'
import { PlansQuestionBand } from './theme/bands'
import { PlansHero } from './theme/heroes'

// /abonnements/ — Formules et prix (copy abonnements.md, INVENTORY §4.2): hero, the plan grid (with the screens
// toggle when the owner sells several screen counts), the renewal line, the trial (only with a trial), the
// reseller teaser, the buying FAQ and the question form.
export default function Pricing() {
  return (
    <div className="overflow-x-clip bg-paper">
      <PlansHero />
      <PlansGrid />
      <PlansRenewal />
      <PlansTrial />
      <PlansResellerTeaser />
      <PlansFaq />
      <PlansQuestionBand
        heading={
          <>
            Vous hésitez entre <Kw>deux durées</Kw>&nbsp;?
          </>
        }
      />
    </div>
  )
}
