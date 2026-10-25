// The 3 pricing cards (brief pp. 19–22): Premium 1 Écran (white), Duo 2 Écrans (violet, « LE PLUS POPULAIRE »,
// lifted, gold button), Famille 3 Écrans (white). Every button opens WhatsApp with the plan's message. Owner: pricing.
import { useId } from 'react'
import { CircleCheck } from 'lucide-react'
import { Fact, WhatsAppButton } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import { FACTS, PLANS, type Plan } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { planMessage } from '@/lib/whatsapp'
import { planApps } from './plans'

function useFeatures() {
  const t = useT()
  const { num, percent } = useFormat()
  const f = t.pricing.plans.features
  return (plan: Plan): string[] => [
    plan.screens === 1 ? f.codesOne(num(plan.months)) : f.codesMany(num(plan.screens)),
    f.quality,
    f.antiFreeze,
    f.replay(num(FACTS.counts.replayDays)),
    (plan.screens === 1 ? f.support : f.supportVip)(percent(100)),
    f.links,
    f.assistance,
    f.warranty,
    f.apps(planApps()),
  ]
}

function PlanCard({ plan }: { plan: Plan }) {
  const t = useT()
  const p = t.pricing.plans
  const { num, price } = useFormat()
  const features = useFeatures()(plan)
  const featured = plan.id === FACTS.featuredPlan
  const name = p.names[plan.id]
  const headingId = `${useId()}-plan`

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        'relative flex flex-col rounded-3xl p-6 transition-all duration-300 sm:p-8',
        featured
          ? 'bg-gradient-to-b from-primary to-primary-deep text-white shadow-glow ring-1 ring-primary max-lg:mt-4 lg:-my-6 lg:py-12'
          : 'border border-line bg-white shadow-card hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow',
      )}
    >
      {featured ? (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-pill">
          {p.popular}
        </span>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id={headingId} className={cn('text-xl font-bold sm:text-2xl', featured && 'text-white')}>
          {name}
        </h3>
        {featured ? (
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {p.limited}
          </span>
        ) : null}
      </div>

      <Fact value={plan.price} what={`plans.${plan.id}.price`}>
        {(value) => (
          <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{price(value)}</span>
            <span className={cn('text-base font-medium', featured ? 'text-white/80' : 'text-slate')}>
              {p.per(num(plan.months))}
            </span>
          </p>
        )}
      </Fact>
      <Fact value={plan.monthly} what={`plans.${plan.id}.monthly`}>
        {(value) => (
          <p className={cn('mt-1 text-sm font-semibold', featured ? 'text-gold' : 'text-primary')}>
            {p.perMonth(price(value))}
          </p>
        )}
      </Fact>

      {plan.price != null ? (
        <WhatsAppButton
          message={planMessage(plan.id)}
          variant={featured ? 'gold' : 'secondary'}
          size="lg"
          className="mt-7 w-full"
        >
          {p.cta}
        </WhatsAppButton>
      ) : null}

      <ul
        aria-label={p.featuresLabel(name)}
        className={cn('mt-8 space-y-3 border-t pt-7 text-[15px]', featured ? 'border-white/20' : 'border-line')}
      >
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <CircleCheck
              aria-hidden
              className={cn('mt-0.5 size-5 shrink-0', featured ? 'text-white' : 'text-primary')}
            />
            <span className={featured ? 'text-white/90' : 'text-ink'}>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

/** The three plans side by side (stacked on phones), the featured one lifted in the middle. */
export function PlanCards({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-3 lg:items-center lg:gap-7', className)}>
      {PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  )
}
