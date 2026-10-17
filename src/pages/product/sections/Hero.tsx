import type { MouseEvent } from 'react'
import { Breadcrumb, Carte, Kw, Pending, RadioCard, Section, checkIconClass, inScope } from '@/components/brand'
import type { IconText } from '@/components/brand'
import { FACTS, formatCount, formatEuro, planFactKey, present, type Plan, type ScreenOption } from '@/lib/facts'
import { BRAND, routeHref } from '@/lib/site'
import { cn } from '@/lib/utils'
import { BuyPlate } from '../BuyPlate'
import { CarteStage } from '../CarteStage'
import { type PlanProduct, isFeatured, screensLabel } from '../data'
import { F, NB, planInclusions, planPrices } from '../facts-text'
import { Fact, PageLink, ScorePill, WaText } from '../shared'

const COPY = {
  crumbs: 'Fil d’Ariane',
  tab: 'Notre conseil',
  cta: 'Commander ma formule',
  payment: `Moyens de paiement${NB}:`,
  screens: 'Écrans en même temps',
  lead: 'La télé en direct et à la demande, sur vos appareils, avec une équipe qui vous aide à chaque étape.',
}

/** Inclusions of the buy box: the same lines as the home offer card (planInclusions), with the chosen screen count. */
function inclusions(screens: number | null) {
  return planInclusions(screens).map((row) => (
    <>
      {row.label}
      {NB}: <Fact value={row.value} what={row.what} fact={row.fact} figure={row.figure} />
    </>
  ))
}

/**
 * Guarantee row of a plan's buy box; the trial item only when there is a trial (PLANS §3.6), and in launch mode
 * only with its duration.
 */
const GUARANTEES: IconText[] = [
  {
    icon: 'ti-clock',
    label: (
      <>
        Activation{NB}: <Fact value={FACTS.delivery.delay} what="délai" fact="delivery.delay" />
      </>
    ),
  },
  {
    icon: 'ti-brand-whatsapp',
    label: (
      <>
        Aide sur WhatsApp{NB}: <Fact value={FACTS.support.hours} what="horaires" fact="support.hours" />
      </>
    ),
  },
  {
    icon: 'ti-calendar',
    label: (
      <>
        Fin de formule{NB}: <Fact value={F.endOfTerm} what="renouvellement automatique ou non" fact="plans.autoRenew" />
      </>
    ),
  },
  ...(present(FACTS.trial.offered) && inScope('trial.terms.duration')
    ? [
        {
          icon: 'ti-gift',
          label: (
            <>
              Essai{NB}: <Fact value={FACTS.trial.terms.duration} what="durée de l’essai" fact="trial.terms.duration" />
            </>
          ),
        },
      ]
    : []),
]

/** Selling points under the lead. */
const POINTS = [
  <>
    Vos accès arrivent par <Fact value={F.deliveryChannel} what="canal d’envoi" fact="delivery.channel" /> après le paiement.
  </>,
  <>
    Les guides d’installation, appareil par appareil, sont sur la <PageLink to="/applications/">page Applications</PageLink>.
  </>,
  <>
    Un blocage{NB}? Écrivez-nous sur <WaText />, on cherche avec vous.
  </>,
]

/** Rating pill, only with a sourced rating (proof.rating); stars only at 5/5 (ScorePill). */
function HeroRating() {
  const rating = FACTS.proof.rating
  if (!rating) return null
  const value = rating.value.toLocaleString('fr-FR', { maximumFractionDigits: 1 })
  return (
    <ScorePill score={rating.value} className="mt-6">
      {value}/5 · {formatCount(rating.count)}{NB}avis sur {rating.source}
    </ScorePill>
  )
}

/**
 * Screens selector, only when the owner sells multi-screen options (plans.screens.options): radio cards whose
 * choice sets the price and the « Écrans en même temps » line.
 */
function ScreensSelector({
  product,
  options,
  value,
  onChange,
}: {
  product: PlanProduct
  options: ScreenOption[]
  value: number | null
  onChange: (n: number) => void
}) {
  return (
    <fieldset className="m-0 grid gap-2.5 border-0 p-0">
      <legend className="mb-3 font-sans text-meta font-semibold text-z-muted">{COPY.screens}</legend>
      {options.map((o) => {
        const price = formatEuro(o.prices[product.plan.id] ?? null)
        return (
          <RadioCard
            key={o.screens}
            name={`ecrans-${product.slug}`}
            checked={value === o.screens}
            onChange={() => onChange(o.screens)}
            label={screensLabel(o.screens)}
            aside={price ? <span className="money">{price}</span> : <Pending what="prix" fact="plans.screens.options" />}
          />
        )
      })}
    </fieldset>
  )
}

type HeroProps = {
  product: PlanProduct
  /** The plan as sold with the chosen screens option (the plan itself with a single-screen offer). */
  sold: Plan
  /** Multi-screen options, or null (no selector). */
  options: ScreenOption[] | null
  /** The chosen screen count (null without options). */
  screens: number | null
  onScreens: (n: number) => void
  onBuy: (e: MouseEvent<HTMLElement>) => void
}

/**
 * product-hero, as a product page: the title block, then the Carte d'accès on its stage (a band tile, the « product
 * shot » of a subscription), then the lead and the selling points as a check list; the sticky buy box holds the
 * right column from lg (its CTA is the view's one filled button). On phone: title, Carte, buy box, lead.
 */
export function Hero({ product, sold, options, screens, onScreens, onBuy }: HeroProps) {
  const { plan } = product
  const prices = planPrices(sold)
  const months = `${plan.months}${NB}mois`

  return (
    <Section zone="paper" dataSection="product-hero" rhythm="hero" container="wide">
      <div className="grid gap-y-10 md:grid-cols-2 md:grid-rows-[auto_auto_1fr] md:gap-x-10 lg:grid-cols-12 lg:gap-x-grid xl:gap-x-10">
        {/* Title block */}
        <div className="min-w-0 md:col-span-2 lg:col-span-7 lg:row-start-1 lg:pr-4">
          <Breadcrumb
            label={COPY.crumbs}
            items={[{ label: 'Accueil', to: '/' }, { label: 'Formules', to: '/abonnements/' }, { label: product.name }]}
          />
          <HeroRating />
          <h1 className="mt-5 font-display text-display-lg text-z-fg">
            Formule <Kw>{months}</Kw>
          </h1>
        </div>

        <CarteStage className="md:col-start-1 md:row-start-2 lg:col-span-7 lg:row-start-2">
          <Carte
            months={String(plan.months)}
            plan={product.name}
            variant="plan"
            label={`Carte d’accès ${BRAND}, formule ${months}`}
            className="max-w-[340px] md:max-w-[380px] lg:max-w-[400px]"
          />
        </CarteStage>

        {/* Buy box: under the Carte on phone, the right column from md (sticky from lg). */}
        {/* The plan line is a paragraph: the h1 just above already names the plan, an h2 would say it twice. */}
        <BuyPlate
          sticky
          as="p"
          tab={isFeatured(plan) ? COPY.tab : null}
          plan={product.name}
          price={prices.price}
          pricePending={{ what: 'prix', fact: options ? 'plans.screens.options' : planFactKey(plan.id, 'price') }}
          old={prices.old}
          unit={`prix total pour ${months}`}
          note={<Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" />}
          perMonth={prices.perMonth}
          saving={prices.saving}
          savingSpoken={prices.savingSpoken}
          selector={options ? <ScreensSelector product={product} options={options} value={screens} onChange={onScreens} /> : null}
          features={inclusions(options ? screens : FACTS.plans.screens.count)}
          cta={{ label: COPY.cta, href: routeHref('/commande/'), onClick: onBuy }}
          guarantees={GUARANTEES}
          payment={{ label: COPY.payment, methods: F.paymentBadges }}
          className="min-w-0 self-start md:col-start-2 md:row-span-2 md:row-start-2 lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1"
        />

        {/* Lead and selling points under the stage: one text column, the points as a check list (no rule, no cell). */}
        <div className="min-w-0 md:col-start-1 md:row-start-3 lg:col-span-7 lg:row-start-3">
          <p className="max-w-[56ch] font-sans text-lead text-z-soft">{COPY.lead}</p>
          <ul className="m-0 mt-6 grid max-w-[60ch] list-none gap-y-3 p-0 font-sans text-copy text-z-body">
            {POINTS.map((point, i) => (
              <li key={i} className="flex gap-3">
                {/* The 20px tick centred on the first line of the copy size (the kit's 2px offset is for 16px text). */}
                <i className={cn(checkIconClass, 'mt-1')} aria-hidden="true" />
                <span className="min-w-0">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
