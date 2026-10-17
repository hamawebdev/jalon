import { FactScope, IconTile, Kw, Section, SectionHead, scoped, useReveal, type FactDeps, type Zone } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { cn } from '@/lib/utils'
import { F, NB } from '../../product/facts-text'
import { REFUND_PLEDGE, type Pledge as SharedPledge } from '../../product/pledges'
import { Fact } from '../../product/shared'

const HEAD = {
  eyebrow: `Pourquoi ${BRAND}`,
  titleStart: 'Ce sur quoi ',
  titleKeyword: 'vous pouvez compter',
  titleEnd: '.',
  lead: 'Ce que nous nous engageons à tenir, du paiement à la fin de votre abonnement.',
}

/** `facts`: the optional owner facts the whole promise rests on (copy « omit card »); read by scoped(). */
type Pledge = SharedPledge & { facts?: FactDeps }

/**
 * Each promise rests on a fact or a page rule (« Le prix total, d’emblée »: every price is a total, PLANS §3.3).
 * The five that rest on a required fact or a rule come first; « Hors de chez vous » rests on an optional one and
 * goes in launch mode until the owner gives it. The refund promise is the plan pages' own (same words, same link).
 */
const PROMISES: Pledge[] = scoped<Pledge>([
  {
    icon: 'ti-message-circle',
    title: 'Une équipe qui vous guide',
    text: (
      <>
        Sur WhatsApp, <Fact value={FACTS.support.hours} what="horaires du support" fact="support.hours" tail="." />
        <FactScope facts="support.responseTime">
          {' '}
          Réponse habituelle{NB}: <Fact value={FACTS.support.responseTime} what="délai de réponse" fact="support.responseTime" tail="." />
        </FactScope>
      </>
    ),
  },
  {
    icon: 'ti-clock',
    title: 'Un délai annoncé',
    text: (
      <>
        Délai entre le paiement et l’envoi de vos accès{NB}:{' '}
        <Fact value={FACTS.delivery.delay} what="délai d’activation" fact="delivery.delay" tail="." /> Au-delà, écrivez-nous.
      </>
    ),
  },
  {
    icon: 'ti-receipt',
    title: 'Le prix total, d’emblée',
    text: <>Chaque prix couvre toute la durée. Vous voyez le total avant de payer.</>,
  },
  {
    icon: 'ti-calendar',
    title: 'Une fin d’abonnement claire',
    text: (
      <>
        À la fin de la durée payée{NB}: <Fact value={F.endOfTerm} what="renouvellement automatique ou non" fact="plans.autoRenew" tail="." />{' '}
        Vous le savez avant de commander.
      </>
    ),
  },
  REFUND_PLEDGE,
  {
    icon: 'ti-plane',
    title: 'Hors de chez vous',
    facts: 'usage.abroad',
    text: (
      <>
        À l’étranger{NB}: <Fact value={FACTS.usage.abroad} what="conditions d’usage à l’étranger" fact="usage.abroad" tail="." />{' '}
        Demandez-nous avant de partir.
      </>
    ),
  },
])

/**
 * The ledger is 6 columns wide from lg: three cells a row; a last row of two shares the width, a last row of one
 * takes it all, so no empty cell shows the hairline ground. On tablet (two a row) an odd last cell spans both.
 */
function cellSpan(index: number, count: number) {
  const rest = count % 3
  const lastRow = index >= count - (rest || 3)
  const lg = !lastRow || rest === 0 ? 'lg:col-span-2' : rest === 2 ? 'lg:col-span-3' : 'lg:col-span-6'
  return cn(count % 2 === 1 && index === count - 1 && 'md:col-span-2', lg)
}

/**
 * One cell of the hairline ledger. The cell keeps its fill at all times; only its content reveals, so the 1px
 * hairline gutters never show through while the content fades in.
 */
function WhyItem({ item, index, className }: { item: Pledge; index: number; className?: string }) {
  const { ref, className: revealClass, style } = useReveal<HTMLDivElement>(index)
  return (
    <li className={cn('bg-z-card', className)}>
      <div
        ref={ref}
        style={style}
        className={cn(
          revealClass,
          // minmax(0,1fr): on a very narrow screen (256px, a 320px phone zoomed to 125 %) the text column's longest
          // piece would widen the ledger's one column, and the clipped ledger would cut every cell's right side.
          'grid h-full grid-cols-[40px_minmax(0,1fr)] content-start gap-x-4 px-5 py-6 md:grid-cols-1 md:p-card lg:px-9 lg:pt-10 lg:pb-11',
        )}
      >
        <IconTile icon={item.icon} className="row-span-2 md:row-span-1 md:mb-6" />
        <h3 className="font-display text-title text-z-fg">{item.title}</h3>
        <p className="col-start-2 mt-2 max-w-[38ch] font-sans text-small text-z-soft md:col-start-1 md:mt-2.5">{item.text}</p>
      </div>
    </li>
  )
}

/** home-why: split head, then the promises as one hairline ledger (paper cells on the plate band). */
export function HomeWhy({ zone = 'plate' }: { zone?: Zone }) {
  return (
    <Section zone={zone} dataSection="home-why">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-grid">
        <SectionHead
          className="lg:col-span-7"
          eyebrow={HEAD.eyebrow}
          title={
            <>
              {HEAD.titleStart}
              <Kw>{HEAD.titleKeyword}</Kw>
              {HEAD.titleEnd}
            </>
          }
        />
        {/* As in home-features: the lead closes the head on the right, with no rule beside it. */}
        <p className="max-w-[56ch] font-sans text-lead text-z-soft lg:col-span-5 lg:col-start-8 lg:max-w-[36ch] lg:justify-self-end">
          {HEAD.lead}
        </p>
      </div>

      <ul className="m-0 mt-head grid list-none gap-px overflow-hidden rounded-panel border border-z-line bg-hairline p-0 md:grid-cols-2 lg:grid-cols-6">
        {PROMISES.map((item, i) => (
          <WhyItem key={item.title} item={item} index={i % 3} className={cellSpan(i, PROMISES.length)} />
        ))}
      </ul>
    </Section>
  )
}
