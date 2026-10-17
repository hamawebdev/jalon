import {
  ButtonLink,
  ChannelMosaic,
  Chip,
  DeviceFrame,
  FeatureCard,
  FeatureGrid,
  Kw,
  Marker,
  Pending,
  Reveal,
  Section,
  SectionHead,
  anyInScope,
  type Zone,
} from '@/components/brand'
import { FACTS, present, type DeviceFamily } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { NB } from '../../product/facts-text'
import { ANCHORS, ROUTES } from '../data'

const HEAD = {
  eyebrow: 'Appareils',
  titleStart: 'Vérifiez ',
  titleKeyword: 'votre appareil',
  titleEnd: ' avant de choisir.',
  lead: `Repérez le vôtre ci-dessous${NB}: chaque fiche dit ce qu’il faut pour regarder.`,
  apps: 'Applications conseillées',
  cta: 'Vérifier mon appareil',
}

/**
 * A family whose entries a card lists: all of them, or, for a family that spans two cards, only its TV boxes
 * (`boxes: 'only'`) or all but them (`boxes: 'except'`).
 */
type Source = { family: DeviceFamily; boxes?: 'only' | 'except' }

/**
 * A TV box: an entry that names a TV, a box or a key (« boîtier télé », « … TV », « box », or a word that starts with
 * « tv », such as the box's own system) and no phone or tablet. Each word stands alone (« Téléphones » holds no
 * « télé »): no letter (\p{L}, accented ones included) on either side. No lookbehind, which older browsers cannot parse.
 */
const TV_BOX = /(?:^|[^\p{L}])(?:tv\p{L}*|télés?|box|bo[iî]tiers?|cl[ée]s?)(?![\p{L}])/iu
const HANDHELD = /phone|pad|tablet/i
const isTvBox = (entry: string) => TV_BOX.test(entry) && !HANDHELD.test(entry)

/**
 * The four home cards and the device families each one groups (GLOSSARY §3). The apple family is the one family
 * that spans two cards (GLOSSARY §3 names it for its phones, its tablets and its TV box): its TV boxes go with the
 * keys and boxes, the rest with the phones and tablets, so no box is listed under « Téléphone et tablette ».
 */
const CARDS: { icon: string; title: string; text: string; sources: Source[] }[] = [
  { icon: 'ti-device-tv', title: 'Télé connectée', text: 'Une application, installée depuis la boutique de la télé.', sources: [{ family: 'tv' }] },
  {
    icon: 'ti-device-tv-old',
    title: 'Clé ou box TV',
    text: 'Un boîtier branché en HDMI, pour une télé sans applications.',
    sources: [{ family: 'box' }, { family: 'apple', boxes: 'only' }],
  },
  {
    icon: 'ti-device-mobile',
    title: 'Téléphone et tablette',
    text: 'Une application, installée depuis la boutique de l’appareil.',
    sources: [{ family: 'android' }, { family: 'apple', boxes: 'except' }],
  },
  { icon: 'ti-device-laptop', title: 'Ordinateur', text: 'Un lecteur vidéo, installé sur l’ordinateur.', sources: [{ family: 'ordinateur' }] },
]

/** Models or systems a card lists (devices.supported), in its families' order; `null` while the owner has not listed them. */
function cardTags(sources: Source[]): string[] | null {
  const supported = FACTS.devices.supported
  if (!supported) return null
  return sources.flatMap(({ family, boxes }) => (supported[family] ?? []).filter((entry) => boxes == null || isTvBox(entry) === (boxes === 'only')))
}

/** Once the owner lists the supported families, a card stays only if it has a model or system to list. */
const VISIBLE_CARDS = FACTS.devices.supported ? CARDS.filter((c) => present(cardTags(c.sources))) : CARDS

/** Recommended apps: the owner's own app first, then the third-party players, as their stores name them. */
function appNames(): string[] | null {
  const own = FACTS.apps.own
  const third = FACTS.apps.thirdParty
  if (!present(own) && !third) return null
  const names = [...(present(own) ? [own.name] : []), ...Object.values(third ?? {}).flatMap((apps) => (apps ?? []).map((a) => a.name))]
  return [...new Set(names)]
}

/**
 * Every-screen still life: a TV with its box, a tablet and a phone, all showing the channel mosaic. Decorative
 * only (no text nodes).
 */
function ScreenLineup({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <div className="pointer-events-none relative aspect-[16/11] w-full">
        <DeviceFrame kind="tv" className="absolute top-0 right-0 w-[78%]">
          <ChannelMosaic osd={false} />
        </DeviceFrame>
        {/* set-top box beside the TV stand, with its status square */}
        <span className="absolute top-[74%] right-[5%] flex h-[6%] w-[28%] items-center justify-end rounded-tag bg-ink pr-[4%] shadow-lift">
          <Marker size={6} />
        </span>
        <DeviceFrame kind="tablet" className="absolute bottom-0 left-0 w-[36%]" screenClassName="p-[2px]">
          <ChannelMosaic cols={4} rows={3} selected={0} osd={false} icons={['ti-movie', 'ti-world', 'ti-music']} />
        </DeviceFrame>
        <DeviceFrame
          kind="phone"
          className="absolute bottom-0 left-[39%] w-[13%] rounded-[18px] p-1 [&>span]:top-1.5 [&>span]:h-1.5"
          screenClassName="rounded-[14px] pt-3"
        >
          <ChannelMosaic cols={2} rows={5} selected={0} osd={false} icons={[]} />
        </DeviceFrame>
      </div>
    </div>
  )
}

/**
 * home-devices: the device families as cards (models from devices.supported), the recommended apps, and the way
 * to the setup guides. Its id is the target of the hero's « Vérifier mon appareil »; it also holds the #telecharger
 * anchor while there is no own-app band (home-app). Launch mode: without any app to name, the chips go with their
 * heading and the button stands alone under the cards.
 */
export function HomeDevices({ zone = 'plate' }: { zone?: Zone }) {
  const apps = appNames()
  const showApps = anyInScope(['apps.own', 'apps.thirdParty'])
  return (
    <Section zone={zone} dataSection="home-devices" id={ANCHORS.devices}>
      {!present(FACTS.apps.own) && <span id={ANCHORS.download} aria-hidden="true" className="absolute top-0 left-0 scroll-mt-[88px]" />}
      <div className="grid gap-y-10 md:grid-cols-12 md:items-end md:gap-x-grid">
        <SectionHead
          className="md:col-span-7"
          eyebrow={HEAD.eyebrow}
          title={
            <>
              {HEAD.titleStart}
              <Kw>{HEAD.titleKeyword}</Kw>
              {HEAD.titleEnd}
            </>
          }
          lead={HEAD.lead}
        />
        <Reveal className="max-md:hidden md:col-span-5 lg:col-start-8">
          <ScreenLineup className="ml-auto w-full max-w-[440px] pb-1.5" />
        </Reveal>
      </div>

      <Reveal className="mt-head">
        {/* Four families: four columns from xl. Fewer once the owner lists them: three share the row from lg, two or
            one keep the two-column grid, so no empty column trails the cards. */}
        <FeatureGrid cols={VISIBLE_CARDS.length >= 4 ? 4 : VISIBLE_CARDS.length === 3 ? 3 : 2} className="gap-4">
          {VISIBLE_CARDS.map((card) => {
            const tags = cardTags(card.sources)
            return (
              <FeatureCard key={card.title} root="li" icon={card.icon} title={card.title} text={card.text} tags={tags ?? undefined}>
                {tags == null && <Pending variant="block" what="appareils compatibles" fact="devices.supported" className="mt-4" />}
              </FeatureCard>
            )
          })}
        </FeatureGrid>
      </Reveal>

      {/* With apps to name: one card closing the grid (the apps, then the way to the guides), in place of a rule,
          with the device cards' own padding so its heading stands on their left edge. Without: the button alone
          under the cards. */}
      <Reveal
        className={cn(
          'grid gap-y-6 lg:grid-cols-12 lg:items-center lg:gap-x-grid',
          showApps ? 'mt-4 rounded-card border border-z-line bg-z-card p-4 md:mt-grid md:px-card md:py-7' : 'mt-10',
        )}
      >
        {showApps && (
          <div className="lg:col-span-8">
            <h3 className="font-display text-title text-z-fg">{HEAD.apps}</h3>
            {apps ? (
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                {apps.map((name) => (
                  <li key={name}>
                    <Chip icon="ti-apps">{name}</Chip>
                  </li>
                ))}
              </ul>
            ) : (
              <Pending variant="block" what="applications conseillées" fact="apps.thirdParty" className="mt-4" />
            )}
          </div>
        )}
        <div className={showApps ? 'lg:col-span-4 lg:justify-self-end' : 'lg:col-span-12'}>
          <ButtonLink to={ROUTES.apps} variant="secondary" size="lg" iconEnd="arrow" full className="sm:w-auto">
            {HEAD.cta}
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  )
}
