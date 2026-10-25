// « Télécharger » — Hub Complet des Applications & Lecteurs par Système (brief pp. 41–44). Three anchored groups
// (Android / iOS & Apple / Windows PC & Mac), every card in the HTML. Only Android cards carry a Downloader code.
import type { ReactNode } from 'react'
import { Apple, Bot, Laptop, Monitor, Terminal, type LucideIcon } from 'lucide-react'
import { Container, IconTile, Reveal, SectionHeader } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import { FACTS, type AppId } from '@/lib/facts'
import { AndroidAppCard, PartnerCodesCard, StoreCard } from './AppCards'
import { SystemNav, type SystemLink } from './SystemNav'
import { versionFamily } from './versions'

const SYSTEM_IDS = { android: 'android', apple: 'ios-apple', computers: 'ordinateurs' } as const

const ANDROID_APPS: { id: AppId; monogram: string }[] = [
  { id: 'ontv', monogram: 'ON' },
  { id: 'max', monogram: 'MX' },
  { id: 'ibo', monogram: 'IBO' },
  { id: 'x9', monogram: '9X' },
  { id: 'prime', monogram: 'PR' },
]
const PLAYER_MONOGRAMS = { iboPlayer: 'IBO', hotPlayer: 'HOT', iboSmarter: 'IS' } as const
const PARTNER_CODE_MONOGRAMS = { iboPlayerPro: 'PRO', hotPlayer: 'HOT', bobPlayer: 'BOB' } as const
const DESKTOP: { key: 'windows' | 'mac' | 'linux'; icon: LucideIcon }[] = [
  { key: 'windows', icon: Monitor },
  { key: 'mac', icon: Apple },
  { key: 'linux', icon: Terminal },
]

function CardGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
}

function SubTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <p className="font-display text-sm font-bold uppercase tracking-wider text-ink">{title}</p>
      {note ? <p className="text-sm font-medium text-slate">{note}</p> : null}
    </div>
  )
}

function Group({
  id,
  icon: Icon,
  title,
  count,
  intro,
  children,
}: {
  id: string
  icon: LucideIcon
  title: string
  count: string
  intro: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[4.5rem] border-t border-line pt-12 first:border-t-0 first:pt-0">
      <div className="mb-8 flex items-start gap-4 sm:gap-5">
        <IconTile className="hidden size-14 rounded-2xl sm:inline-flex">
          <Icon aria-hidden />
        </IconTile>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 id={`${id}-title`} className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">
              {title}
            </h3>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">{count}</span>
          </div>
          <p className="mt-2 max-w-3xl text-slate">{intro}</p>
        </div>
      </div>
      <div className="flex flex-col gap-10">{children}</div>
    </section>
  )
}

export function Hub({ id }: { id: string }) {
  const t = useT().downloads
  const { price } = useFormat()
  const card = t.hub.card
  const groups = t.hub.groups
  const playersPrice = t.hub.playersPrice(price(FACTS.counts.playerPricePerYear), FACTS.counts.playerTrialDays)
  const players = Object.entries(FACTS.players) as [keyof typeof FACTS.players, (typeof FACTS.players)[keyof typeof FACTS.players]][]
  const partnerCodes = (Object.keys(PARTNER_CODE_MONOGRAMS) as (keyof typeof PARTNER_CODE_MONOGRAMS)[]).map((key) => ({
    key,
    name: t.hub.partnerNames[key],
    monogram: PARTNER_CODE_MONOGRAMS[key],
    code: FACTS.playerDownloaderCodes[key],
  }))

  const androidCount = ANDROID_APPS.length + partnerCodes.length
  const appleCount = players.length
  const computersCount = DESKTOP.length + players.length

  const links: SystemLink[] = [
    { id: SYSTEM_IDS.android, label: groups.android.nav, icon: Bot, count: androidCount },
    { id: SYSTEM_IDS.apple, label: groups.apple.nav, icon: Apple, count: appleCount },
    { id: SYSTEM_IDS.computers, label: groups.computers.nav, icon: Laptop, count: computersCount },
  ]

  return (
    <section id={id} className="bg-canvas py-16 sm:py-24">
      <Container>
        <SectionHeader badge={t.hub.badge} title={t.hub.title} subtitle={t.hub.subtitle} />
        <SystemNav label={t.hub.navLabel} links={links} />

        <div className="mt-12 flex flex-col gap-16">
          {/* Android: Downloader codes */}
          <Group
            id={SYSTEM_IDS.android}
            icon={Bot}
            title={groups.android.title}
            count={t.hub.count(androidCount)}
            intro={groups.android.intro}
          >
            <div>
              <SubTitle title={groups.android.officialTitle} />
              <CardGrid>
                {ANDROID_APPS.map(({ id: appId, monogram }, i) => {
                  const app = FACTS.apps[appId]
                  const shown = appId === 'ontv' && app.version ? versionFamily(app.version) : app.version
                  return (
                    <Reveal key={appId} delay={(i % 3) * 60} className="h-full">
                      <AndroidAppCard
                        app={app}
                        monogram={monogram}
                        title={shown ? `${app.name} ${t.suite.versions.short(shown)}` : app.name}
                        systems={appId === 'prime' ? card.systems.androidOnly : card.systems.android}
                        versionLine={appId === 'ontv' && app.version ? t.suite.versions.version(app.version) : undefined}
                      />
                    </Reveal>
                  )
                })}
              </CardGrid>
            </div>
            <PartnerCodesCard title={groups.android.partnersTitle} priceNote={playersPrice} players={partnerCodes} />
          </Group>

          {/* iOS & Apple: no Downloader code */}
          <Group
            id={SYSTEM_IDS.apple}
            icon={Apple}
            title={groups.apple.title}
            count={t.hub.count(appleCount)}
            intro={groups.apple.intro}
          >
            <div>
              <SubTitle title={playersPrice} />
              <CardGrid>
                {players.map(([key, player], i) => (
                  <Reveal key={key} delay={i * 60} className="h-full">
                    <StoreCard
                      monogram={PLAYER_MONOGRAMS[key]}
                      tone="partner"
                      name={player.name}
                      systems={card.systems.ios}
                      buttonName={card.withSystem(player.name, card.buttonSystems.ios)}
                      url={player.ios}
                    />
                  </Reveal>
                ))}
              </CardGrid>
            </div>
          </Group>

          {/* Windows PC & Mac (& Linux): no Downloader code */}
          <Group
            id={SYSTEM_IDS.computers}
            icon={Laptop}
            title={groups.computers.title}
            count={t.hub.count(computersCount)}
            intro={groups.computers.intro}
          >
            <div>
              <SubTitle title={groups.computers.officialTitle} />
              <CardGrid>
                {DESKTOP.map(({ key, icon: Icon }, i) => (
                  <Reveal key={key} delay={i * 60} className="h-full">
                    <StoreCard
                      monogram="AP"
                      tone="official"
                      markBadge={<Icon aria-hidden />}
                      name={FACTS.brand.name}
                      systems={card.systems[key]}
                      buttonName={card.withSystem(FACTS.brand.name, card.buttonSystems[key])}
                      url={FACTS.desktop[key]}
                    />
                  </Reveal>
                ))}
              </CardGrid>
            </div>
            <div>
              <SubTitle title={groups.computers.partnersTitle} note={playersPrice} />
              <CardGrid>
                {players.map(([key, player], i) => (
                  <Reveal key={key} delay={i * 60} className="h-full">
                    <StoreCard
                      monogram={PLAYER_MONOGRAMS[key]}
                      tone="partner"
                      name={player.name}
                      systems={card.systems.windows}
                      caption={key === 'iboPlayer' ? card.windowsRequirement : undefined}
                      buttonName={card.withSystem(player.name, card.buttonSystems.windows)}
                      url={player.windows}
                    />
                  </Reveal>
                ))}
              </CardGrid>
            </div>
          </Group>
        </div>
      </Container>
    </section>
  )
}
