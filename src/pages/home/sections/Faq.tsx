import { ButtonLink, FaqItem, FaqList, Kw, Reveal, Section, SectionHead, scoped, type Zone } from '@/components/brand'
import { FACTS, present } from '@/lib/facts'
import {
  FAQ_ABROAD,
  FAQ_CONTACT,
  FAQ_DELAY,
  FAQ_DEVICES,
  FAQ_PAYMENT,
  FAQ_RENEW,
  FAQ_SCREENS,
  FAQ_TRIAL,
  type FaqRow,
} from '../../product/faq'
import { NB } from '../../product/facts-text'
import { PageLink } from '../../product/shared'
import { ROUTES } from '../data'

const HEAD = {
  eyebrow: 'Questions',
  titleStart: 'Ce qu’on nous demande ',
  titleKeyword: 'avant de commander',
  titleEnd: '.',
  cta: 'Voir toutes les questions',
}

/**
 * The home shortlist (FAQ-TOPICS 29, 9, 14, 2, 19, 36, 17, 42); the trial row only with a trial. Launch mode drops
 * the rows whose question rests on a missing optional fact (« étranger » today).
 */
const ROWS: FaqRow[] = scoped([
  FAQ_DEVICES,
  FAQ_DELAY,
  FAQ_SCREENS,
  FAQ_PAYMENT,
  ...(present(FACTS.trial.offered) ? [FAQ_TRIAL] : []),
  FAQ_ABROAD,
  FAQ_RENEW,
  FAQ_CONTACT,
])

/**
 * home-faq: the head sticky from lg on the left, the short answers on the right (the first one open), and the way
 * to every other answer on /aide/.
 */
export function HomeFaq({ zone = 'paper' }: { zone?: Zone }) {
  return (
    <Section zone={zone} dataSection="home-faq" containerClassName="grid gap-y-head lg:grid-cols-12 lg:gap-x-grid">
      <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start lg:pr-10 xl:pr-16">
        <Reveal>
          <SectionHead
            eyebrow={HEAD.eyebrow}
            title={
              <>
                {HEAD.titleStart}
                <Kw>{HEAD.titleKeyword}</Kw>
                {HEAD.titleEnd}
              </>
            }
            lead={
              <>
                Les réponses courtes sont ici{NB}; toutes les autres sont sur la <PageLink to={ROUTES.help}>page Aide</PageLink>.
              </>
            }
          />
          <ButtonLink to={ROUTES.help} variant="secondary" size="md" iconEnd="arrow" className="mt-8 max-lg:hidden">
            {HEAD.cta}
          </ButtonLink>
        </Reveal>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <FaqList>
          {ROWS.map((row, i) => (
            <FaqItem key={row.id} question={row.q} defaultOpen={i === 0}>
              <p>{row.a}</p>
            </FaqItem>
          ))}
        </FaqList>
        <ButtonLink to={ROUTES.help} variant="secondary" size="md" iconEnd="arrow" full className="mt-8 sm:w-auto lg:hidden">
          {HEAD.cta}
        </ButtonLink>
      </div>
    </Section>
  )
}
