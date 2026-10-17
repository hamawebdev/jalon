import { Chip, Kw, Reveal, Section, SectionHead, Stars, Testimonial, type Zone } from '@/components/brand'
import { FACTS, formatCount } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { cn } from '@/lib/utils'
import { NB, fullStars } from '../../product/facts-text'

const HEAD = {
  eyebrow: 'Avis clients',
  titleStart: 'Ce qu’en disent ',
  titleKeyword: 'nos abonnés',
  titleEnd: '.',
}

/** Topics a review may carry, in chip order (copy home.md › home-reviews). */
const TOPICS = ['Installation', 'Aide', 'Image', 'Formules', 'À la demande', 'Sport', 'En déplacement', 'Prix']

const fr = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })

/** Width and columns of the figure strip for one, two or three figures. */
const FIGURE_GRID = ['max-w-[260px]', 'max-w-[510px] sm:grid-cols-2', 'max-w-[760px] sm:grid-cols-3']

/**
 * home-reviews: real reviews only (proof.reviews, with their source and the authors' consent), quotes as written.
 * Without them the band is not rendered: never a placeholder quote (APPROVAL §2.4). Hidden today.
 */
export function HomeReviews({ zone = 'band' }: { zone?: Zone }) {
  const reviews = FACTS.proof.reviews
  if (!reviews || reviews.items.length === 0) return null
  const { rating, customers, recommendRate } = FACTS.proof

  const figures = [
    rating && {
      key: 'rating',
      value: `${fr(rating.value)}/5`,
      // The kit's stars are always five: they stand beside a 5/5 only (fullStars); any other score is written alone.
      stars: fullStars(rating.value) ? `Note${NB}: ${fr(rating.value)} sur 5` : undefined,
      label: `Note moyenne, ${formatCount(rating.count)}${NB}avis`,
    },
    customers && { key: 'customers', value: formatCount(customers.value), label: `Foyers abonnés au ${customers.asOf}` },
    recommendRate && {
      key: 'recommend',
      value: `${fr(recommendRate.value)}${NB}%`,
      label: `Recommandent ${BRAND}, selon ${recommendRate.survey}`,
    },
  ].filter(Boolean) as { key: string; value: string; label: string; stars?: string }[]

  const topics = TOPICS.filter((t) => reviews.items.some((r) => r.topic === t))

  return (
    <Section zone={zone} dataSection="home-reviews">
      <SectionHead
        eyebrow={HEAD.eyebrow}
        title={
          <>
            {HEAD.titleStart}
            <Kw>{HEAD.titleKeyword}</Kw>
            {HEAD.titleEnd}
          </>
        }
        lead={`Des avis publiés avec l’accord de leurs auteurs. Source${NB}: ${reviews.source}.`}
      />

      {figures.length > 0 && (
        // One card, one column per figure (two figures share a narrower card, so no empty cell closes the row), a
        // hairline between figures: across on phones, upright from sm. T28: was an open strip between two rules.
        <ul className={cn('m-0 mt-head grid list-none rounded-card border border-z-line bg-z-card p-0 max-sm:px-5', FIGURE_GRID[figures.length - 1])}>
          {figures.map((f) => (
            <li key={f.key} className="flex flex-col gap-2 border-z-line py-5 not-first:border-t sm:px-6 sm:not-first:border-t-0 sm:not-first:border-l">
              <span className="flex items-center gap-2.5">
                <span className="price-num text-stat-md text-z-fg">{f.value}</span>
                {f.stars && <Stars label={f.stars} />}
              </span>
              <span className="font-sans text-meta font-semibold text-z-muted">{f.label}</span>
            </li>
          ))}
        </ul>
      )}

      <Reveal as="ul" className="m-0 mt-12 grid list-none gap-grid p-0 md:grid-cols-2 lg:grid-cols-3">
        {reviews.items.map((r, i) => (
          <li key={`${r.name}-${i}`} className={cn(reviews.items.length % 2 === 1 && i === reviews.items.length - 1 && 'md:col-span-2 lg:col-span-1')}>
            <Testimonial
              className="h-full"
              // The kit's stars draw the review's own score (4 = four full, one outlined), named for screen readers:
              // every rated card opens on its stars, so the quotes start on one line across a row. The score is not
              // written again in the caption.
              rating={r.rating != null ? `Note${NB}: ${fr(r.rating)} sur 5` : undefined}
              score={r.rating ?? undefined}
              quote={r.quote}
              name={r.name}
              meta={
                <>
                  {/* Place · date (copy home.md › home-reviews). The no-break space ties each dot to the part before
                      it, so a line never starts with a separator. */}
                  {[r.place, r.date].filter(Boolean).join(`${NB}· `)}
                  {r.topic && (
                    // The review's topic as its tag, on a line of its own under the place and date: the caption has
                    // one shape whatever the card's width (no tag that sometimes follows the date, sometimes not).
                    <span className="mt-2 flex">
                      <Chip size="sm">{r.topic}</Chip>
                    </span>
                  )}
                </>
              }
            />
          </li>
        ))}
      </Reveal>

      {topics.length > 0 && (
        <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0">
          {topics.map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
