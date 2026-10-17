import { useState, type MouseEvent } from 'react'
import { scoped, type Zone } from '@/components/brand'
import { useChrome } from '@/components/site/chrome-context'
import { renewalPath } from '@/lib/facts'
import { productIncludedShown, productQualityShown, productReviewsShown } from './bands'
import { type PlanProduct, baseScreenOption, planCartLine, planWithScreens, screenOptions } from './data'
import { FAQ_CHANGE, FAQ_DELAY, FAQ_DEVICES, FAQ_QUALITY, FAQ_SCREENS, faqEnd } from './faq'
import { alternate } from './grounds'
import { Related } from './Related'
import { Description } from './sections/Description'
import { Faq } from './sections/Faq'
import { PlanFinalCta } from './sections/FinalCta'
import { Guarantees } from './sections/Guarantees'
import { Hero } from './sections/Hero'
import { Included } from './sections/Included'
import { Quality } from './sections/Quality'
import { Reviews } from './sections/Reviews'
import { PageLink } from './shared'
import { StickyBar } from './StickyBar'

/**
 * product-faq rows (FAQ-TOPICS 29, 9, 14, 25, 15, 16). The devices question comes first and open, as on the home
 * page: « will it work on my TV? » is the buyer's first doubt. The contact question is left to the commitments
 * and the WhatsApp button, which already answer it. Launch mode drops the quality row until its levels exist.
 */
const FAQ_ROWS = scoped([
  FAQ_DEVICES,
  FAQ_DELAY,
  FAQ_SCREENS,
  FAQ_QUALITY,
  FAQ_CHANGE,
  faqEnd(
    <>
      Pour continuer, renouvelez sur la <PageLink to={renewalPath()}>page Renouvellement</PageLink> avec votre identifiant.
    </>,
  ),
])

/**
 * The bands under the hero and its commitments (both on paper), with the grounds each can stand on, the one it was
 * drawn for first. The three optional bands come and go with the owner's facts, so the grounds are worked out
 * from the bands that render: no two neighbours share one.
 */
const BANDS = [
  { key: 'description', grounds: ['plate', 'band'] },
  { key: 'included', grounds: ['band', 'plate'], shown: productIncludedShown },
  { key: 'quality', grounds: ['paper', 'plate'], shown: productQualityShown },
  { key: 'reviews', grounds: ['band', 'plate'], shown: productReviewsShown },
  { key: 'faq', grounds: ['paper', 'plate'] },
  { key: 'finalCta', grounds: ['band', 'paper'] },
  { key: 'related', grounds: ['paper', 'plate'] },
] as const satisfies readonly { key: string; grounds: readonly Zone[]; shown?: () => boolean }[]

type BandKey = (typeof BANDS)[number]['key']

function grounds(): Partial<Record<BandKey, Zone>> {
  const rendered = BANDS.filter((band) => !('shown' in band) || band.shown())
  const zones = alternate(
    rendered.map((band) => band.grounds),
    'paper',
  )
  return Object.fromEntries(rendered.map((band, i) => [band.key, zones[i]]))
}

/**
 * A plan page (/abonnements/3-mois/ …). The commitments come right under the hero, before « Pour qui »: the answer
 * to « and if it does not work at home? » sits within a scroll of the price. Buying puts the plan in the order
 * and opens /commande/ (the chrome's orderPlan: one plan per order, no cart drawer on the way); nothing is
 * submitted. product-trust is left out (copy produit.md: the hero already shows its figures); product-included
 * and product-reviews render only once their facts exist. With multi-screen options, the count chosen in the buy
 * box sets the price of the buy box, the closing call, the phone bar and the order line.
 */
export function PlanLanding({ product }: { product: PlanProduct }) {
  const { orderPlan } = useChrome()
  const zone = grounds()
  const options = screenOptions()
  const [screens, setScreens] = useState(() => baseScreenOption()?.screens ?? null)
  const option = options?.find((o) => o.screens === screens) ?? null
  const sold = planWithScreens(product.plan, option)
  const buy = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    orderPlan(planCartLine(product.plan, option))
  }
  return (
    <div className="w-full overflow-x-clip bg-paper font-sans leading-[1.65] text-ink-body antialiased">
      <Hero product={product} sold={sold} options={options} screens={screens} onScreens={setScreens} onBuy={buy} />
      <Guarantees />
      <Description product={product} zone={zone.description} />
      <Included zone={zone.included} />
      <Quality zone={zone.quality} />
      <Reviews zone={zone.reviews} />
      <Faq
        id="product-faq"
        dataSection="product-faq"
        eyebrow="Questions fréquentes"
        title={['Questions sur ', 'cette formule', '']}
        rows={FAQ_ROWS}
        zone={zone.faq}
      />
      <PlanFinalCta product={product} sold={sold} priceFact={option ? 'plans.screens.options' : null} onBuy={buy} zone={zone.finalCta} />
      <Related product={product} zone={zone.related} />
      <StickyBar product={product} sold={sold} priceFact={option ? 'plans.screens.options' : null} onBuy={buy} />
    </div>
  )
}
