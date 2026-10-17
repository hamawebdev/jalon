import { Kw, Reveal, Section, SectionHead, type Zone } from '@/components/brand'
import { type PlanProduct, isFeatured } from '../data'
import { F, NB } from '../facts-text'
import { Fact } from '../shared'

const EYEBROW = 'Pour qui'
const ADVICE = 'C’est la durée que nous conseillons.'
const COPY = { included: 'Ce que comprend la formule' }

const LABEL = 'font-sans text-meta font-semibold text-z-muted'
/** The values are typed as the end of a sentence (« les chaînes en direct, … »): alone on their line they start with a capital. */
const VALUE = 'm-0 mt-1 font-sans text-copy text-z-body first-letter:uppercase'

/**
 * product-description: who this duration suits (words per plan, produit.md), then what every plan contains and
 * what happens at the end of the term, in one card. The site's split head from lg: the heading on the left, the
 * text on the right, level with the heading.
 */
export function Description({ product, zone = 'plate' }: { product: PlanProduct; zone?: Zone }) {
  const { pitch, plan } = product
  return (
    <Section zone={zone} dataSection="product-description" containerClassName="grid gap-y-head lg:grid-cols-12 lg:gap-x-grid">
      <Reveal className="lg:col-span-5">
        <SectionHead
          eyebrow={EYEBROW}
          title={
            <>
              {pitch.before}
              <Kw>{pitch.keyword}</Kw>
              {pitch.after}
            </>
          }
        />
      </Reveal>

      <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
        <Reveal index={1}>
          <p className="max-w-[56ch] font-sans text-lead text-z-soft">
            {pitch.lead}
            {isFeatured(plan) && <> {ADVICE}</>}
          </p>
        </Reveal>
        {/* The two facts every buyer checks, as one card with a single hairline (label over value): a tinted block
            parts them from the pitch, where a rule and one long sentence did. */}
        <Reveal index={2} className="mt-8 max-w-[66ch]">
          <dl className="m-0 grid rounded-card border border-z-line bg-z-card px-5 md:px-6">
            <div className="border-z-line py-4 not-first:border-t md:py-5">
              <dt className={LABEL}>{COPY.included}</dt>
              <dd className={VALUE}>
                <Fact value={F.includedList} what="contenu des formules" fact="plans.features.included" tail="." />
              </dd>
            </div>
            <div className="border-z-line py-4 not-first:border-t md:py-5">
              <dt className={LABEL}>
                À la fin des {plan.months}
                {NB}mois
              </dt>
              <dd className={VALUE}>
                <Fact value={F.endOfTerm} what="renouvellement automatique ou non" fact="plans.autoRenew" tail="." />
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
