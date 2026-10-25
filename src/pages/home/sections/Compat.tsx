// Home section: « Compatible avec Tous vos Appareils & Écrans » (4 bento cards). Owner: social. Anchor: HOME_ANCHORS.compat
// Brief pp. 23–24: four cards side by side (equal columns), each with a light-violet icon tile, the device family in
// ink, a short description and small grey pills naming brands and devices. Each card leads to the installation hub.
import type { ReactNode } from 'react'
import { ArrowRight, Apple, Box, Tv } from 'lucide-react'
import { Link } from 'react-router'
import { Card, IconTile, Reveal, Section, SectionHeader } from '@/components/kit'
import { useLang, useT } from '@/i18n/context'
import { HOME_ANCHORS, homeAnchor } from '@/i18n/routes'
import type { AppId } from '@/lib/facts'
import { appLabel } from '../social/apps'
import { AndroidIcon } from '../social/icons'

/** The official apps the Android card lists, in the brief's order. */
const ANDROID_APPS: AppId[] = ['ontv', 'max', 'ibo', 'x9', 'prime']

function DeviceCard({
  icon,
  title,
  pills,
  children,
}: {
  icon: ReactNode
  title: string
  pills: string[]
  children: ReactNode
}) {
  const t = useT().social.compat
  const lang = useLang()
  return (
    <Card className="group relative flex h-full flex-col gap-5 p-6 sm:p-7">
      <IconTile className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">{icon}</IconTile>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="text-[15px] leading-relaxed text-slate">{children}</div>
      </div>
      <ul className="mt-auto flex flex-wrap gap-2" aria-label={title}>
        {pills.map((pill) => (
          <li key={pill} className="rounded-full bg-mist px-3 py-1 text-[13px] font-medium text-ink/80">
            {pill}
          </li>
        ))}
      </ul>
      <Link
        to={homeAnchor('install', lang)}
        aria-label={t.guideFor(title)}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
      >
        {t.guide}
        <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </Card>
  )
}

export function Compat() {
  const t = useT().social.compat
  const androidApps = ANDROID_APPS.map((id, i) => appLabel(id, i > 0)).join(', ')
  return (
    <Section id={HOME_ANCHORS.compat} bg="mist">
      <SectionHeader title={t.title} highlight={t.highlight} subtitle={t.subtitle} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        <Reveal className="h-full">
          <DeviceCard icon={<Tv />} title={t.tv.title} pills={t.tv.pills}>
            <p>{t.tv.description}</p>
          </DeviceCard>
        </Reveal>
        <Reveal className="h-full" delay={80}>
          <DeviceCard icon={<AndroidIcon />} title={t.android.title} pills={t.android.pills}>
            <p>
              <strong className="font-semibold text-ink">{t.android.suite}</strong> ({androidApps})
            </p>
            <p className="mt-1.5">
              <strong className="font-semibold text-ink">{t.android.players}</strong> ({t.android.playerNames.join(', ')})
            </p>
          </DeviceCard>
        </Reveal>
        <Reveal className="h-full" delay={160}>
          <DeviceCard icon={<Apple />} title={t.apple.title} pills={t.apple.pills}>
            <p>{t.apple.description}</p>
          </DeviceCard>
        </Reveal>
        <Reveal className="h-full" delay={240}>
          <DeviceCard icon={<Box />} title={t.box.title} pills={t.box.pills}>
            <p>{t.box.description}</p>
          </DeviceCard>
        </Reveal>
      </div>
    </Section>
  )
}
