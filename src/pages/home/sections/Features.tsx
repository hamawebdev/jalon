import type { ReactNode } from 'react'
import { FactScope, FeatureCard, FeatureGrid, Kw, Reveal, Section, SectionHead, scoped, type FactDeps } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { F, NB } from '../../product/facts-text'
import { Fact, PageLink } from '../../product/shared'
import { ROUTES } from '../data'

const HEAD = {
  eyebrow: 'Dans l’abonnement',
  titleStart: 'L’abonnement, ',
  titleKeyword: 'point par point',
  titleEnd: '.',
  lead: 'L’essentiel de ce que vous obtenez, avant même de choisir une durée.',
}

/** `facts`: the optional owner facts the whole cell rests on (copy « omit card »); read by scoped(). */
type Cell = { icon: string; title: string; text: ReactNode; facts?: FactDeps }

/**
 * Launch mode (copy home.md › home-features): the two counts give way to their fact-free wording, and a cell
 * that only states a missing optional fact goes. « Vos appareils » rests on a required fact and always stays.
 */
const CELLS: Cell[] = scoped<Cell>([
  {
    icon: 'ti-device-tv',
    title: 'Le direct',
    text: (
      <FactScope facts="channels.live.count" fallback="Vos chaînes, à l’heure de leur diffusion.">
        <Fact value={F.liveCount} what="nombre" fact="channels.live.count" figure unit="chaînes" tail="," /> à l’heure de
        leur diffusion.
      </FactScope>
    ),
  },
  {
    icon: 'ti-movie',
    title: 'À la demande',
    text: (
      <FactScope facts="vod.count" fallback="Des films et des séries, sans horaire à respecter.">
        <Fact value={F.vodCount} what="nombre" fact="vod.count" figure unit="films" /> et séries, sans horaire à respecter.
      </FactScope>
    ),
  },
  {
    icon: 'ti-sparkles',
    title: 'Qualité d’image',
    facts: 'quality.levels',
    text: (
      <>
        <Fact value={F.qualities} what="qualités d’image" fact="quality.levels" tail="," /> selon le programme et votre connexion.
      </>
    ),
  },
  // « À revoir » goes if the owner says there is no catch-up (catchup.days === false).
  ...(FACTS.catchup.days === false
    ? []
    : [
        {
          icon: 'ti-history',
          title: 'À revoir',
          facts: 'catchup.days',
          text: (
            <>
              Un programme manqué{NB}? Rattrapez-le{NB}:{' '}
              <Fact value={FACTS.catchup.days} what="durée et chaînes concernées" fact="catchup.days" tail="." />
            </>
          ),
        },
      ]),
  {
    icon: 'ti-devices',
    title: 'Vos appareils',
    text: (
      <>
        Fonctionne sur <Fact value={F.devices} what="appareils compatibles" fact="devices.supported" tail="." /> Les guides sont sur la{' '}
        <PageLink to={ROUTES.apps}>page Applications</PageLink>.
      </>
    ),
  },
  {
    icon: 'ti-key',
    title: 'Accès égarés',
    facts: 'delivery.resend',
    text: (
      <>
        Pour les recevoir à nouveau{NB}: <Fact value={FACTS.delivery.resend} what="renvoi des accès" fact="delivery.resend" tail="." />
      </>
    ),
  },
])

/** The last tile spans the rest of its row (2 columns from md, 3 from lg), so the block never ends on a gap. */
function lastCellSpan(count: number) {
  const md = count % 2 === 1 ? 'md:col-span-2' : ''
  const lg = ['lg:col-span-1', 'lg:col-span-3', 'lg:col-span-2'][count % 3]
  return `${md} ${lg}`
}

/**
 * home-features: a split head, then what a subscription gives as the kit's feature tiles: paper tiles with 20/24px
 * corners on the white band, 16px apart on phones and the grid gap from md, titles on one line across a row (the
 * card's subgrid). It replaces the ruled sheet of the first identity (square cells over a hairline ground, flush
 * with the head), the last sharp block of the page (T28; Inspo: bento-grid tiles of milanote-com and canvasapp-com).
 */
export function HomeFeatures() {
  return (
    <Section zone="plate" dataSection="home-features">
      <Reveal className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-grid">
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
        <p className="max-w-[56ch] font-sans text-lead text-z-soft lg:col-span-5 lg:col-start-8 lg:max-w-[36ch] lg:justify-self-end">
          {HEAD.lead}
        </p>
      </Reveal>

      <Reveal className="mt-head">
        <FeatureGrid cols={3} className="gap-4">
          {CELLS.map((c, i) => (
            <FeatureCard
              key={c.title}
              root="li"
              icon={c.icon}
              title={c.title}
              text={c.text}
              className={i === CELLS.length - 1 ? lastCellSpan(CELLS.length) : undefined}
            />
          ))}
        </FeatureGrid>
      </Reveal>
    </Section>
  )
}
