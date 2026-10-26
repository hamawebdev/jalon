// The client facts the story sections print, formatted for the current language. Every number comes from FACTS.
import { useFormat, useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'

export function useStoryNumbers() {
  const { num } = useFormat()
  const t = useT().story
  const c = FACTS.counts
  const { ontv, max, ibo } = FACTS.apps
  // Versions of the three official apps the copy names; null when one is still missing from the facts.
  const versions =
    ontv.version && max.version && ibo.version
      ? {
          ontv: ontv.version,
          max: max.version,
          ibo: ibo.version,
          /** « 4.0 »: the app generation (major.minor), as the brief's « Atlas Pro ONTV 4.0 ». */
          ontvGeneration: ontv.version.split('.').slice(0, 2).join('.'),
        }
      : null
  // « Atlas Pro ONTV 4.0.2 · Max v7 · IBO v4.3 », leaving out an app whose version is missing.
  const suite = [
    // The brief: « Suite Officielle : atlas pro ontv 4.0, ONTV 4.0.2 · Max v7 · IBO v4.3 ».
    ontv.version && `${t.apps.ontv(ontv.version.split('.').slice(0, 2).join('.'))}, ONTV ${ontv.version}`,
    max.version && t.apps.max(max.version),
    ibo.version && t.apps.ibo(ibo.version),
  ]
    .filter(Boolean)
    .join(' · ')
  return {
    channels: num(c.channels),
    films: num(c.films),
    series: num(c.series),
    episodes: num(c.episodes),
    sportsChannels: num(c.sportsChannels),
    customersK: num(c.customers / 1000),
    uptime: t.fmt.percent(num(c.uptime)),
    supportMinutes: num(c.supportMinutes),
    yearsActive: num(c.yearsActive),
    /** A year: never grouped (« 2018 », not « 2 018 »). */
    founded: String(c.founded),
    versions,
    suite,
  }
}

/** Long labels in PillButton wrap on phones instead of being cut (the kit truncates by default). */
export const WRAP_PILL = 'h-auto min-h-13 whitespace-normal py-3 text-center leading-snug [&_.truncate]:whitespace-normal'
