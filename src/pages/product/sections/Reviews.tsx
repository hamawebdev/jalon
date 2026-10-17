import { Kw, Reveal, Section, SectionHead, Testimonial, type Zone } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { NB } from '../facts-text'

/** A score as French writes it (4,5). */
const score = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })

const COPY = {
  eyebrow: 'Avis d’abonnés',
  titleStart: 'Leur avis, ',
  titleKeyword: 'sans retouche',
  titleEnd: '.',
  row: 'Avis d’abonnés',
}

/**
 * product-reviews: three real reviews (proof.reviews, with their source and the authors' consent), quotes as written
 * and set roman. Without them the section is not rendered (APPROVAL §2.4). Hidden today.
 */
export function Reviews({ zone = 'band' }: { zone?: Zone }) {
  const reviews = FACTS.proof.reviews
  if (!reviews || reviews.items.length === 0) return null
  const items = reviews.items.slice(0, 3)
  return (
    <Section zone={zone} dataSection="product-reviews">
      <SectionHead
        eyebrow={COPY.eyebrow}
        title={
          <>
            {COPY.titleStart}
            <Kw>{COPY.titleKeyword}</Kw>
            {COPY.titleEnd}
          </>
        }
      />
      {/* Phone: a scroll-snap row with a peek of the next card (focusable to scroll by keyboard); tablet 2-up; desktop 3-up. */}
      <Reveal className="mt-head">
        <ul
          aria-label={COPY.row}
          tabIndex={0}
          className={cn(
            'm-0 flex list-none gap-4 p-0 md:grid md:grid-cols-2 md:gap-grid lg:grid-cols-3',
            'max-md:-mx-gutter max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:scroll-px-gutter max-md:px-gutter max-md:pb-3',
          )}
        >
          {items.map((r, i) => (
            <li
              key={`${r.name}-${i}`}
              className={cn(
                'flex shrink-0 snap-start max-md:w-[calc(100vw-2*var(--spacing-gutter)-36px)]',
                items.length % 2 === 1 && i === items.length - 1 && 'md:col-span-2 lg:col-span-1',
              )}
            >
              {/* As on the home page: the kit's stars draw the review's own score (4 = four full, one outlined), named
                  for screen readers, so every rated card opens on its stars and the quotes start on one line. The
                  caption is the place and the date (copy produit.md › product-reviews): the score is not repeated. */}
              <Testimonial
                className="w-full"
                rating={r.rating != null ? `Note${NB}: ${score(r.rating)} sur 5` : undefined}
                score={r.rating ?? undefined}
                quote={r.quote}
                name={r.name}
                meta={[r.place, r.date].filter(Boolean).join(', ')}
              />
            </li>
          ))}
        </ul>
      </Reveal>
      <p className="mt-8 font-sans text-meta text-z-muted">
        Avis recueillis sur {reviews.source}, publiés avec l’accord de leurs auteurs.
      </p>
    </Section>
  )
}
