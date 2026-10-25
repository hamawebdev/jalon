// Home section: « L'Avis de Ceux Qui Regardent Atlas Pro ONTV » (trust bar, 6 reviews with WhatsApp screenshot slot, 8 pills). Owner: social. Anchor: HOME_ANCHORS.reviews
// Brief pp. 33–35. A review shows only once the client has sent its WhatsApp screenshot (FACTS.reviews[i].screenshot):
// review mode shows the others as placeholders, launch mode leaves them out (and the grid, if none is live).
// No review structured data.
import type { ReactNode } from 'react'
import { Clapperboard, Euro, MessageCircle, Rewind, ShieldCheck, Smartphone, Sparkles, Zap } from 'lucide-react'
import { Reveal, Section, SectionHeader } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import type { ReviewVars } from '@/i18n/dict/fr/social'
import { HOME_ANCHORS } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { LAUNCH } from '@/lib/mode'
import { appLabel, ENTRY_PLAN } from '../social/apps'
import { ReviewCard, Stars } from '../social/ReviewCard'

function TrustItem({ value, label, extra }: { value: string; label: string; extra?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-5 text-center sm:py-6">
      <p className="flex items-center gap-2.5 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {extra}
        {value}
      </p>
      <p className="text-sm font-medium text-slate">{label}</p>
    </div>
  )
}

export function Reviews() {
  const t = useT().social.reviews
  const { num, price } = useFormat()
  const { counts } = FACTS

  const vars: ReviewVars = {
    price: ENTRY_PLAN.price != null ? price(ENTRY_PLAN.price) : '',
    ontv: appLabel('ontv'),
    max: appLabel('max'),
    months: num(ENTRY_PLAN.months),
  }
  const reviews = FACTS.reviews.filter((review) => !LAUNCH || review.screenshot)

  const pills: { icon: ReactNode; label: string }[] = [
    { icon: <Sparkles />, label: t.pills.quality },
    { icon: <Zap />, label: t.pills.zapping(num(counts.zappingSeconds)) },
    { icon: <ShieldCheck />, label: t.pills.servers(num(counts.uptime)) },
    ...(ENTRY_PLAN.monthly != null ? [{ icon: <Euro />, label: t.pills.price(price(ENTRY_PLAN.monthly)) }] : []),
    { icon: <Clapperboard />, label: t.pills.catalogue(num(counts.films), num(counts.series)) },
    { icon: <MessageCircle />, label: t.pills.support(num(counts.supportMinutes)) },
    { icon: <Smartphone />, label: t.pills.apps(appLabel('ontv', true), appLabel('max', true)) },
    { icon: <Rewind />, label: t.pills.replay(num(counts.replayDays)) },
  ]

  return (
    <Section id={HOME_ANCHORS.reviews} bg="mist">
      <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />

      {/* Trust bar */}
      <Reveal>
        <div className="mx-auto mb-10 grid max-w-4xl grid-cols-1 divide-y divide-line rounded-3xl border border-line bg-white shadow-card sm:mb-14 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <TrustItem
            value={t.trust.rating(num(counts.rating))}
            label={t.trust.ratingLabel}
            extra={<Stars label={t.stars} className="[&_svg]:size-5" />}
          />
          <TrustItem value={t.trust.customers(num(counts.customers))} label={t.trust.customersLabel} />
          <TrustItem value={t.trust.recommend(num(counts.recommendSupport))} label={t.trust.recommendLabel} />
        </div>
      </Reveal>

      {reviews.length ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} className="h-full" delay={(i % 3) * 80}>
              <ReviewCard review={review} vars={vars} />
            </Reveal>
          ))}
        </div>
      ) : null}

      {/* Bottom band of 8 pills */}
      <ul className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-14 sm:gap-2.5">
        {pills.map((pill) => (
          <li
            key={pill.label}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-pill transition-colors duration-200 hover:border-primary/30 hover:text-primary sm:px-4 sm:text-sm [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-primary"
          >
            {pill.icon}
            {pill.label}
          </li>
        ))}
      </ul>
    </Section>
  )
}
