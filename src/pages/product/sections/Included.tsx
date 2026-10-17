import type { ReactNode } from 'react'
import { FeatureCard, FeatureGrid, Kw, Reveal, Section, SectionHead, type Zone } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { comfortsConfirmed, productIncludedShown } from '../bands'
import { NB } from '../facts-text'

const HEAD = {
  eyebrow: 'Au quotidien',
  titleStart: 'Ce que vous trouvez ',
  titleKeyword: 'dans l’application',
  titleEnd: '.',
}

type Comfort = { icon: string; title: string; text: ReactNode; shown: boolean }

/** Each card is a claim about the service or the app: it shows only once its own fact confirms it (../bands.ts). */
function comforts(): Comfort[] {
  const confirmed = comfortsConfirmed()
  const { epg, catchup, vod } = FACTS
  return [
    {
      icon: 'ti-calendar-event',
      title: 'Le programme, chaîne par chaîne',
      text: <>Ce qui passe maintenant et ensuite, sur {epg.available} de programme.</>,
      shown: confirmed.guide,
    },
    {
      icon: 'ti-history',
      title: 'Programmes à revoir',
      text: (
        <>
          Une émission manquée se revoit{NB}: {catchup.days}.
        </>
      ),
      shown: confirmed.catchup,
    },
    {
      icon: 'ti-users',
      title: 'Un profil par personne',
      text: <>Chacun retrouve ses chaînes favorites et ses programmes en cours.</>,
      shown: confirmed.profiles,
    },
    {
      icon: 'ti-lock',
      title: 'Code parental',
      text: <>Un code protège les programmes que vous réservez aux adultes.</>,
      shown: confirmed.parentalCode,
    },
    {
      icon: 'ti-language',
      title: 'Langues et sous-titres',
      text: (
        <>
          Audio et sous-titres{NB}: {vod.languages}, selon le programme.
        </>
      ),
      shown: confirmed.languages,
    },
    {
      icon: 'ti-player-play',
      title: 'Reprendre où vous en étiez',
      text: <>Un film interrompu reprend au même moment, même sur un autre appareil.</>,
      shown: confirmed.resume,
    },
  ]
}

/**
 * product-included: the viewing comforts the owner confirms. Never a pending card: the section stays hidden until
 * at least three cards have their fact (copy produit.md). Hidden today.
 */
export function Included({ zone = 'band' }: { zone?: Zone }) {
  if (!productIncludedShown()) return null
  const cards = comforts().filter((c) => c.shown)
  return (
    <Section zone={zone} dataSection="product-included">
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
        />
      </Reveal>
      <Reveal index={1} className="mt-head">
        <FeatureGrid cols={3}>
          {cards.map((c) => (
            <FeatureCard key={c.title} root="li" icon={c.icon} title={c.title} text={c.text} />
          ))}
        </FeatureGrid>
      </Reveal>
    </Section>
  )
}
