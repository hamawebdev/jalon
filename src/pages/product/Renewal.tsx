import { useState, type MouseEvent } from 'react'
import {
  Breadcrumb,
  BuyBar,
  Carte,
  FactScope,
  Kw,
  Pending,
  RadioCard,
  Reveal,
  Section,
  SectionHead,
  TextA,
  cardClass,
  scoped,
} from '@/components/brand'
import type { IconText } from '@/components/brand'
import { useChrome } from '@/components/site/chrome-context'
import { FACTS, featuredPlan, formatEuro, perMonthLine, renewalName } from '@/lib/facts'
import { BRAND, routeHref } from '@/lib/site'
import { cn } from '@/lib/utils'
import { barAccentClass, barLabel } from '../home/FloatingActions.parts'
import { BuyPlate } from './BuyPlate'
import { CarteStage } from './CarteStage'
import { type RenewalChoice, renewalCartLine, renewalChoices } from './data'
import { type FaqRow, faqEnd } from './faq'
import { RenewalFinalCta } from './sections/FinalCta'
import { Faq } from './sections/Faq'
import { F, NB } from './facts-text'
import { Fact, WaText } from './shared'
import { type PathStep, StepPath } from './StepPath'

const COPY = {
  crumbs: 'Fil d’Ariane',
  titleStart: 'Renouvelez votre ',
  titleKeyword: 'abonnement',
  titleEnd: '.',
  lead: `Choisissez la durée, indiquez votre identifiant à la commande${NB}: nous prolongeons le même accès.`,
  plan: 'Renouvellement',
  selector: 'Durée du renouvellement',
  cta: 'Renouveler mon abonnement',
  payment: `Moyens de paiement${NB}:`,
}

/** Anchor of the duration selector (renewal-final-cta and the FAQ link back to it). */
const SELECTOR_ID = 'duree'

const GUARANTEES: IconText[] = [
  { icon: 'ti-id-badge-2', label: 'Identifiant demandé à la commande' },
  {
    icon: 'ti-clock',
    label: (
      <>
        Prolongation{NB}: <Fact value={FACTS.delivery.delay} what="délai" fact="delivery.delay" />
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
]

/** renewal-identify: real steps, so real numbers (the kit's step discs, joined by a rail: StepPath). */
const STEPS: PathStep[] = [
  {
    index: '01',
    title: 'Retrouvez votre identifiant',
    text: (
      <>
        <FactScope facts="plans.renewal.identifier">
          Identifiant à indiquer{NB}:{' '}
          <Fact value={FACTS.plans.renewal.identifier} what="identifiant à indiquer et où le trouver" fact="plans.renewal.identifier" tail="." />{' '}
        </FactScope>
        Gardez-le sous la main avant de commander.
      </>
    ),
  },
  {
    index: '02',
    title: 'Indiquez-le à la commande',
    text: (
      <>
        Le champ «{NB}Identifiant de votre abonnement actuel{NB}» vous le demande avant le paiement. Un doute{NB}? Envoyez-nous une
        photo de l’écran sur <WaText />.
      </>
    ),
  },
  {
    index: '03',
    title: 'Continuez à regarder',
    text: (
      <>
        Nous prolongeons votre accès et vous le confirmons par{' '}
        <Fact value={F.deliveryChannel} what="canal d’envoi" fact="delivery.channel" tail="." /> Délai{NB}:{' '}
        <Fact value={FACTS.delivery.delay} what="délai de prolongation" fact="delivery.delay" tail="." />
      </>
    ),
  },
]

/**
 * renewal-faq rows (FAQ-TOPICS shortlist « renouvellement »: 17 in three rows, 9, 16). Launch mode (copy
 * renouvellement.md): two answers take their fact-free wording, and the row on remaining days goes until the
 * owner says what happens to them.
 */
const FAQ_ROWS: FaqRow[] = scoped<FaqRow>([
  {
    id: 'identifiant',
    q: `Quel identifiant dois-je donner${NB}?`,
    a: (
      <>
        <FactScope facts="plans.renewal.identifier" fallback="Celui de votre abonnement actuel.">
          Identifiant à indiquer{NB}:{' '}
          <Fact value={FACTS.plans.renewal.identifier} what="identifiant à indiquer et où le trouver" fact="plans.renewal.identifier" tail="." />
        </FactScope>{' '}
        En cas de doute, envoyez-nous une photo de l’écran sur <WaText />
        {NB}: on vérifie avec vous.
      </>
    ),
  },
  {
    id: 'jours-restants',
    facts: 'plans.renewal.carryOver',
    q: `Mes jours restants sont-ils conservés${NB}?`,
    a: (
      <>
        Temps restant{NB}:{' '}
        <Fact value={FACTS.plans.renewal.carryOver} what="report des jours restants" fact="plans.renewal.carryOver" tail="." /> Si
        vous hésitez sur le bon moment pour renouveler, <WaText>écrivez-nous</WaText>
        {NB}: on regarde votre date de fin avec vous.
      </>
    ),
  },
  {
    id: 'changer-de-duree-renouvellement',
    q: `Puis-je changer de durée en renouvelant${NB}?`,
    a: (
      <>
        <FactScope
          facts={{ 'plans.renewal.durations': F.renewalDurations }}
          fallback={
            <>
              Oui{NB}: le sélecteur <TextA href={`#${SELECTOR_ID}`}>en haut de cette page</TextA> présente les durées proposées, avec
              leur prix.
            </>
          }
        >
          Durées proposées au renouvellement, avec leur prix{NB}:{' '}
          <Fact value={F.renewalDurations} what="durées et prix de renouvellement" fact="plans.renewal.durations" tail="." />
        </FactScope>{' '}
        Le prix affiché est le prix total pour la durée choisie.
      </>
    ),
  },
  {
    id: 'prolongation',
    q: `Quand la prolongation est-elle active${NB}?`,
    a: (
      <>
        Délai entre le paiement et la prolongation{NB}:{' '}
        <Fact value={FACTS.delivery.delay} what="délai de prolongation" fact="delivery.delay" tail="." /> Nous vous la confirmons
        par <Fact value={F.deliveryChannel} what="canal d’envoi" fact="delivery.channel" tail="." />
      </>
    ),
  },
  faqEnd(
    <>
      Pour continuer, choisissez une durée <TextA href={`#${SELECTOR_ID}`}>en haut de cette page</TextA>.
    </>,
  ),
])

/** The duration selector: radio cards (duration and price), keyboard operable, inside the buy box. */
function DurationSelector({
  choices,
  value,
  onChange,
}: {
  choices: RenewalChoice[]
  value: number
  onChange: (months: number) => void
}) {
  return (
    <fieldset id={SELECTOR_ID} className="m-0 grid scroll-mt-28 gap-2.5 border-0 p-0">
      <legend className="mb-3 font-sans text-meta font-semibold text-z-muted">{COPY.selector}</legend>
      {choices.map((c) => {
        const price = formatEuro(c.price)
        return (
          <RadioCard
            key={c.months}
            name="duree-renouvellement"
            value={c.months}
            checked={value === c.months}
            onChange={() => onChange(c.months)}
            label={`${c.months}${NB}mois`}
            aside={price ? <span className="money text-ink">{price}</span> : <Pending what="prix" fact={c.priceFact} />}
          />
        )
      })}
    </fieldset>
  )
}

/**
 * The renewal page (/abonnements/renouvellement/, INVENTORY §4.4): one page for every duration. The chosen
 * duration drives the price, the Carte, the order line and the phone bar. « Renouveler » puts that renewal in the
 * order and opens /commande/ (the chrome's orderPlan), as the plan pages do. No marketing bands, no related cards.
 */
export function RenewalLanding() {
  const { orderPlan } = useChrome()
  const choices = renewalChoices()
  const [months, setMonths] = useState(() => (choices.find((c) => c.months === featuredPlan().months) ?? choices[0]).months)
  const choice = choices.find((c) => c.months === months) ?? choices[0]

  const price = formatEuro(choice.price)
  const duration = `${choice.months}${NB}mois`

  const renew = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    orderPlan(renewalCartLine(choice))
  }
  // « Choisir ma durée »: back to the selector, which takes the focus (on the chosen duration).
  const chooseDuration = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const selector = document.getElementById(SELECTOR_ID)
    if (!selector) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    selector.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
    selector.querySelector<HTMLInputElement>('input:checked')?.focus({ preventScroll: true })
  }

  return (
    <div className="w-full overflow-x-clip bg-paper font-sans leading-[1.65] text-ink-body antialiased">
      <Section zone="paper" dataSection="renewal-hero" rhythm="hero" container="wide">
        <div className="grid gap-y-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-grid xl:gap-x-10">
          <div className="min-w-0 md:col-span-2 lg:col-span-7 lg:row-start-1 lg:pr-4">
            <Breadcrumb
              label={COPY.crumbs}
              items={[{ label: 'Accueil', to: '/' }, { label: 'Formules', to: '/abonnements/' }, { label: COPY.plan }]}
            />
            <h1 className="mt-5 font-display text-display-lg text-z-fg">
              {COPY.titleStart}
              <Kw>{COPY.titleKeyword}</Kw>
              {COPY.titleEnd}
            </h1>
            <p className="mt-6 max-w-[52ch] font-sans text-lead text-z-soft">{COPY.lead}</p>
          </div>

          {/* The renewal Carte (light plate) on its stage, following the selector. From xl the stage runs down to the
              buy box's foot; below xl the buy box is much taller (narrow column), so the stage keeps its size and
              stays in view beside it while the visitor goes through the durations. */}
          <CarteStage className="md:col-start-1 md:row-start-2 md:max-xl:sticky md:max-xl:top-24 md:max-xl:self-start lg:col-span-7 lg:row-start-2">
            <Carte
              months={String(choice.months)}
              plan={renewalName(choice.months)}
              variant="renew"
              label={`Carte d’accès ${BRAND}, renouvellement ${duration}`}
              className="max-w-[340px] md:max-w-[380px] lg:max-w-[400px]"
            />
          </CarteStage>

          {/* The plan line is a paragraph: the h1 above already says what the page sells. */}
          <BuyPlate
            sticky
            as="p"
            plan={COPY.plan}
            price={price}
            pricePending={{ what: 'prix', fact: choice.priceFact }}
            unit={`prix total pour ${duration}`}
            note={<Fact value={FACTS.pricing.vat} what="mention TVA" fact="pricing.vat" />}
            perMonth={perMonthLine({ price: choice.price, months: choice.months })}
            selector={<DurationSelector choices={choices} value={choice.months} onChange={setMonths} />}
            cta={{ label: COPY.cta, href: routeHref('/commande/'), onClick: renew }}
            guarantees={GUARANTEES}
            payment={{ label: COPY.payment, methods: F.paymentBadges }}
            className="min-w-0 self-start md:col-start-2 md:row-start-2 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1"
          />
        </div>
      </Section>

      <Section zone="plate" dataSection="renewal-identify">
        <SectionHead
          title={
            <>
              Pour prolonger le <Kw>bon accès</Kw>
            </>
          }
        />
        <Reveal className="mt-head">
          <StepPath steps={STEPS} />
          <FactScope facts="plans.renewal.carryOver">
            {/* A slim tinted card (16px corners) closing the steps, in place of a ruled line: the icon on the text's
                first line. */}
            <p className={cn(cardClass.inner, 'mt-10 flex gap-3 px-5 py-4 font-sans text-copy text-z-body')}>
              <i className="ti ti-calendar-repeat mt-1 shrink-0 text-[20px] text-z-icon" aria-hidden="true" />
              <span className="min-w-0">
                Temps restant{NB}:{' '}
                <Fact value={FACTS.plans.renewal.carryOver} what="report des jours restants" fact="plans.renewal.carryOver" tail="." />
              </span>
            </p>
          </FactScope>
        </Reveal>
      </Section>

      <Faq dataSection="renewal-faq" title={['Questions sur le ', 'renouvellement', '']} rows={FAQ_ROWS} />
      <RenewalFinalCta onChoose={chooseDuration} months={choice.months} durations={choices.map((c) => c.months)} />

      {/* As the plan pages' bar: hidden until the buy box has been scrolled past, aside while the closing panel shows. */}
      <BuyBar
        dataSection="renewal-stickybar"
        startHidden
        price={price}
        pricePending={{ what: 'prix', fact: choice.priceFact }}
        label={barLabel(choice.months)}
        labelVisible
        cta={{ label: 'Renouveler', ariaLabel: `Renouveler pour ${duration}`, href: routeHref('/commande/'), onClick: renew }}
        className={barAccentClass}
      />
    </div>
  )
}
