import { ButtonLink, Kw, Pending, PlatePanel, Reveal, Section, TextLink, type Zone } from '@/components/brand'
import { FACTS, featuredPlan, formatEuro, fromPlan, planFactKey } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { DurationRuler } from '../../product/DurationRuler'
import { NB } from '../../product/facts-text'
import { ROUTES } from '../data'

const CTA = {
  titleStart: 'Il ne reste qu’à ',
  titleKeyword: 'choisir la durée',
  titleEnd: '.',
  text: 'Ensuite, on vous accompagne pas à pas, jusqu’à la première soirée.',
  primary: 'Choisir ma formule',
  renewLead: `Déjà chez ${BRAND}${NB}?`,
  renew: 'Renouveler mon abonnement',
}

/**
 * « Dès … pour … mois »: the plan with the lowest total price, computed once every price of the plan list is known
 * (fromPlan() in facts.ts); until then « Dès » and the pending price, without the duration.
 */
function FromPrice() {
  const plan = fromPlan()
  const price = plan ? formatEuro(plan.price) : null
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-2 font-sans text-small font-semibold text-z-accent">
      Dès{' '}
      {plan && price ? (
        <>
          <span className="price-num text-stat-lg text-z-fg">{price}</span> pour {plan.months}
          {NB}mois
        </>
      ) : (
        <Pending variant="block" what="prix" fact={planFactKey(FACTS.plans.list[0].id, 'price')} />
      )}
    </p>
  )
}

/**
 * home-cta: the closing call on a sign plate. Left: the headline, one line and one button (this view's one filled
 * button), with the way to the renewal page as a quiet line for existing customers, as in the hero. Right: the
 * from-price over the duration ruler on a paper block, so the plate reads as one statement instead of a centred
 * column in an empty frame. The plate carries data-buybar-watch: the phone buy bar steps aside while its button is on screen.
 */
export function HomeCta({ zone = 'paper' }: { zone?: Zone }) {
  return (
    <Section zone={zone} dataSection="home-cta">
      <PlatePanel data-buybar-watch="" className="grid gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-grid">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-display text-display-sm text-z-fg md:text-display-md">
              {CTA.titleStart}
              <Kw>{CTA.titleKeyword}</Kw>
              {CTA.titleEnd}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-5 max-w-[46ch] font-sans text-lead text-z-soft">{CTA.text}</p>
          </Reveal>
          <div className="mt-9">
            <ButtonLink to={ROUTES.plans} variant="primary" size="lg" iconEnd="arrow" full className="sm:w-auto">
              {CTA.primary}
            </ButtonLink>
            {/* As in the hero: the link is a 44px tap box that wraps as a whole. Its negative margin keeps one line at
                the text's height; the row gap gives that margin back once the link wraps under the question, so its
                box starts below that line instead of over it (larger text settings, narrow phones). */}
            <p className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2.5 font-sans text-small text-z-soft">
              <span>{CTA.renewLead}</span>
              <TextLink to={ROUTES.renew} standalone className="-my-2.5 font-semibold">
                {CTA.renew}
              </TextLink>
            </p>
          </div>
        </div>

        {/* A paper block inside the white plate (tone, not a rule, parts it from the pitch). 12px corners: a block
            inside a panel whose padding is wider than its radius. On the tint the ruler's ticks take the deeper
            hairline, as on a band. */}
        <div className="rounded-control bg-z-card p-5 [--z-line:var(--color-hairline-deep)] md:p-8 lg:col-span-5">
          <FromPrice />
          {/* The square on the plan the from-price names, or on the recommended plan until every price is known. */}
          <DurationRuler at={(fromPlan() ?? featuredPlan()).months} className="mt-8" />
        </div>
      </PlatePanel>
    </Section>
  )
}
