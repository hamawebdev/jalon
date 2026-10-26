// Home section: installation hub in the brief's order: 9-device selector, app matrix (#applications), device guides, 4 technical questions, help banner. Owner: install. Anchor: HOME_ANCHORS.install
import { Headset, MonitorSmartphone, Timer, type LucideIcon } from 'lucide-react'
import { Reveal, Section, SectionHeader } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import { HOME_ANCHORS } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { AppMatrix } from '../install/AppMatrix'
import { DeviceHub } from '../install/DeviceHub'
import { HelpBanner } from '../install/HelpBanner'
import { TechQuestions } from '../install/TechQuestions'

export function Install() {
  const t = useT().install
  const { num } = useFormat()
  const minutes = num(FACTS.counts.installMinutes)
  const kpis: { icon: LucideIcon; value: string; label: string }[] = [
    { icon: Timer, value: t.kpis.fast.value(minutes), label: t.kpis.fast.label },
    { icon: MonitorSmartphone, value: t.kpis.compat.value, label: t.kpis.compat.label },
    { icon: Headset, value: t.kpis.support.value, label: t.kpis.support.label },
  ]
  return (
    <Section id={HOME_ANCHORS.install}>
      <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle(minutes)} className="sm:mb-10" />
      <Reveal>
        <ul className="mx-auto mb-10 grid max-w-4xl grid-cols-1 gap-3 sm:mb-14 sm:grid-cols-3 sm:gap-4">
          {kpis.map(({ icon: Icon, value, label }) => (
            <li key={label} className="flex items-center gap-4 rounded-3xl border border-line bg-white px-5 py-4 shadow-card sm:flex-col sm:items-start sm:gap-3 sm:p-6">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary [&_svg]:size-5">
                <Icon aria-hidden />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-2xl leading-tight font-bold text-ink sm:text-3xl">{value}</span>
                <span className="text-sm font-medium text-slate">{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
      <DeviceHub between={<AppMatrix />} />
      <TechQuestions />
      <HelpBanner />
    </Section>
  )
}
