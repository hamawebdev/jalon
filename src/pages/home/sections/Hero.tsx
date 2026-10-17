import type { ReactNode } from 'react'
import {
  ButtonA,
  Eyebrow,
  GuideGrid,
  Kw,
  NowStrip,
  Plaque,
  Section,
  Stars,
  TextA,
  TextLink,
} from '@/components/brand'
import { FACTS, featuredPlan, formatCount, planFactKey, present } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { cn } from '@/lib/utils'
import { BuyPlate } from '../../product/BuyPlate'
import { F, NB, fullStars, planInclusions, planPrices } from '../../product/facts-text'
import { Fact, ScorePill } from '../../product/shared'
import { ANCHORS, ROUTES } from '../data'

const HERO = {
  eyebrow: 'Abonnement TV par internet',
  titleStart: 'Toute votre télé, ',
  titleKeyword: 'au même endroit',
  titleEnd: '.',
  lead: 'Le direct, le sport, les films et les séries, dans une application à installer sur votre télé, votre box ou votre téléphone. On vous accompagne de l’activation à la première soirée.',
  cta: 'Choisir ma formule',
  check: 'Vérifier mon appareil',
  renewLead: `Déjà chez ${BRAND}${NB}?`,
  renew: 'Renouveler mon abonnement',
  plaque: 'On vous accompagne',
  now: 'choisir sa formule',
  next: 'installer l’application',
}

/** Average rating as French text (« 4,8 »). */
const ratingText = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })

/**
 * The offer card: the featured plan, one click from its product page. Its button is secondary: « Choisir ma
 * formule » is the view's one filled button; the card stays the advised offer through its firm Bleu repère edge.
 */
function OfferCard({ className }: { className?: string }) {
  const plan = featuredPlan()
  const prices = planPrices(plan)
  const months = `${plan.months}${NB}mois`
  return (
    <BuyPlate
      as="p"
      plan={`Notre conseil${NB}: formule ${months}`}
      price={prices.price}
      pricePending={{ what: 'prix', fact: planFactKey(plan.id, 'price') }}
      old={prices.old}
      unit={`prix total pour ${months}`}
      perMonth={prices.perMonth}
      saving={prices.saving}
      savingSpoken={prices.savingSpoken}
      features={planInclusions().map((row) => (
        <>
          {row.label}
          {NB}: <Fact value={row.value} what={row.what} fact={row.fact} figure={row.figure} />
        </>
      ))}
      cta={{ label: 'Choisir cette formule', to: ROUTES.featured, ariaLabel: `Choisir cette formule de ${months}` }}
      ctaVariant="secondary"
      guarantees={[
        {
          icon: 'ti-clock',
          label: (
            <>
              Activation{NB}: <Fact value={FACTS.delivery.delay} what="délai" fact="delivery.delay" />
            </>
          ),
        },
        { icon: 'ti-brand-whatsapp', label: 'Aide sur WhatsApp' },
        { icon: 'ti-book', label: 'Guide d’installation' },
      ]}
      guaranteesAs="row"
      className={className}
    />
  )
}

/** Rating pill, only with a sourced rating (proof.rating); stars only at 5/5 (ScorePill). */
function HeroRating() {
  const rating = FACTS.proof.rating
  if (!rating) return null
  return (
    // A block wrapper (the pill is an inline-flex <p>), so the eyebrow starts on its own line.
    <div className="mb-7 md:mb-8">
      <ScorePill score={rating.value}>
        {ratingText(rating.value)}/5 · {formatCount(rating.count)}{NB}avis sur {rating.source}
      </ScorePill>
    </div>
  )
}

/** One figure of the proof strip; only figures the owner has given. */
/** `text`: a phrase rather than a figure (the support hours): set in the title size, never as a giant figure. */
type ProofCell = { key: string; value: string; label: ReactNode; stars?: boolean; text?: boolean }

function proofCells(): ProofCell[] {
  const { rating, customers, countries } = FACTS.proof
  const cells: ProofCell[] = []
  if (rating) {
    cells.push({
      key: 'rating',
      value: `${ratingText(rating.value)}/5`,
      // The kit's stars are always five: they stand beside a 5/5 only (fullStars); any other score is written alone.
      stars: fullStars(rating.value),
      label: (
        <>
          Note moyenne sur <TextA href={rating.url}>{rating.source}</TextA>
        </>
      ),
    })
  }
  if (customers) cells.push({ key: 'customers', value: formatCount(customers.value) ?? '', label: `Foyers abonnés au ${customers.asOf}` })
  if (F.liveCount) cells.push({ key: 'live', value: F.liveCount, label: 'Chaînes en direct' })
  if (countries != null) cells.push({ key: 'countries', value: formatCount(countries) ?? '', label: `Pays où l’on regarde ${BRAND}` })
  if (present(FACTS.support.hours)) cells.push({ key: 'hours', value: FACTS.support.hours, label: 'Aide sur WhatsApp', text: true })
  return cells
}

/**
 * home-proof: verified figures in ruled cells, values exactly as the owner gives them (no « + », no counters).
 * Shown only with at least three of its five figures (INVENTORY §4.1); hidden today.
 */
function ProofStrip() {
  const cells = proofCells()
  if (cells.length < 3) return null
  const rating = FACTS.proof.rating
  return (
    <Section zone="band" dataSection="home-proof" rhythm="sm" container="wide">
      <ul aria-label={`${BRAND} en chiffres`} className="m-0 grid list-none grid-cols-2 p-0 md:flex md:justify-between">
        {cells.map((c) => (
          <li
            key={c.key}
            className={cn(
              'flex flex-col justify-between gap-2.5 border-z-line px-5 py-5 md:flex-1 md:px-4 lg:px-6',
              'max-md:even:border-l max-md:[&:nth-child(n+3)]:border-t max-md:last:odd:col-span-2',
              'md:border-l md:first:border-l-0',
            )}
          >
            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              <span className={c.text ? 'font-display text-title-lg text-z-fg' : 'price-num text-stat-lg text-z-fg'}>{c.value}</span>
              {c.stars && rating && <Stars label={`Note${NB}: ${ratingText(rating.value)} sur 5`} />}
            </span>
            <span className="font-sans text-meta font-semibold text-z-muted">{c.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/**
 * home-hero: the pitch on the left; on the right the offer card of the featured plan in front of the guide grid
 * (the hero's TV-native visual), with the plaque on its corner. A « En ce moment · Ensuite » strip closes the band.
 */
export function HomeHero() {
  return (
    <>
      <Section
        zone="paper"
        dataSection="home-hero"
        rhythm="hero"
        container="wide"
        containerClassName="grid items-center gap-x-grid gap-y-12 md:gap-y-14 lg:grid-cols-12"
      >
        <div className="lg:col-span-7 xl:pr-12">
          <HeroRating />
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
          {/* The keyword never wraps (kit: `h1 .kw`, one stroke), and « au même endroit. » is about 7.3em wide. Where
              the column is narrower than that (a 280px screen, page zoom, a large text setting) the title takes the
              size that fits instead of pushing the hero out sideways; from 300px at the default text size the kit's
              size is always smaller, so nothing changes there. */}
          <h1
            className="mt-5 font-display text-display-xl text-z-fg"
            style={{ fontSize: 'min(var(--text-display-xl), calc((100vw - 2 * var(--spacing-gutter)) / 7.5))' }}
          >
            {HERO.titleStart}
            <Kw>{HERO.titleKeyword}</Kw>
            {HERO.titleEnd}
          </h1>
          <p className="mt-6 max-w-[56ch] font-sans text-lead text-z-soft lg:max-w-[40ch]">{HERO.lead}</p>
          {/* The pair of IDENTITY §6.9: the choice, then the check a newcomer wants first (the devices band below).
              It wraps as whole buttons (never a two-line label) where the column is narrow. */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonA href={`#${ANCHORS.plans}`} variant="primary" size="lg" iconEnd="arrow" full className="sm:w-auto sm:shrink-0">
              {HERO.cta}
            </ButtonA>
            <ButtonA href={`#${ANCHORS.devices}`} variant="secondary" size="lg" full className="sm:w-auto sm:shrink-0">
              {HERO.check}
            </ButtonA>
          </div>
          {/* Existing customers: one quiet line, still on the first screen. The link is a 44px tap box (it wraps
              as a whole under the question where the line is too short); the negative margin keeps the line's height,
              and the row gap gives it back once the link wraps, so the link's box never rides over the question. */}
          <p className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2.5 font-sans text-small text-z-soft">
            <span>{HERO.renewLead}</span>
            <TextLink to={ROUTES.renew} standalone className="-my-2.5 font-semibold">
              {HERO.renew}
            </TextLink>
          </p>
        </div>

        <div className="relative w-full max-w-[560px] lg:col-span-5 lg:max-w-none">
          {/* The guide grid behind the card, peeking above and to the right (lg only). */}
          <GuideGrid className="absolute top-0 -right-[6%] w-full max-lg:hidden" />
          {/* The card reaches into the grid gap only from xl: below it the button pair fills the pitch column, so the
              card keeps to its own column (the full gap stays clear) and takes the width back on its right side. */}
          <OfferCard className="lg:mt-[30%] lg:mr-4 xl:mr-12 xl:-ml-8" />
          {/* The plaque overlaps only the card's left padding, so it never covers the CTA or the guarantee row. */}
          <Plaque
            text={HERO.plaque}
            className="absolute z-[2] md:max-lg:top-24 md:max-lg:-right-40 lg:-bottom-10 lg:-left-36 lg:max-xl:-left-24 lg:max-xl:size-[112px]"
          />
        </div>

        <NowStrip now={HERO.now} next={HERO.next} className="lg:col-span-12" />
      </Section>
      <ProofStrip />
    </>
  )
}
