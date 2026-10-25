// The facts the FAQ answers print, formatted for the reader's language. Every number, price and version of the
// FAQ comes from FACTS through here.
import { useFormat } from '@/i18n/context'
import type { FaqValues } from '@/i18n/dict/fr/faq'
import { FACTS, plan } from '@/lib/facts'

export function useFaqValues(): FaqValues {
  const { num, price } = useFormat()
  const c = FACTS.counts
  const priceOf = (id: 'premium' | 'duo' | 'famille') => {
    const value = plan(id).price
    return value == null ? '' : price(value)
  }
  const ontv = FACTS.apps.ontv.version ?? ''
  return {
    price: { premium: priceOf('premium'), duo: priceOf('duo'), famille: priceOf('famille') },
    screens: {
      premium: num(plan('premium').screens),
      duo: num(plan('duo').screens),
      famille: num(plan('famille').screens),
    },
    months: num(plan('premium').months),
    appCount: num(Object.values(FACTS.apps).filter((app) => app.status !== 'previous').length),
    ontv,
    ontvLine: ontv.split('.').slice(0, 2).join('.'),
    max: FACTS.apps.max.version ?? '',
    ibo: FACTS.apps.ibo.version ?? '',
    channels: num(c.channels),
    sportsChannels: num(c.sportsChannels),
    films: num(c.films),
    series: num(c.series),
    episodes: num(c.episodes),
    replayChannels: num(c.replayChannels),
    replayDays: num(c.replayDays),
    customers: num(c.customers),
    supportMinutes: num(c.supportMinutes),
    uptime: num(c.uptime),
    playerPrice: price(c.playerPricePerYear),
    trialDays: num(c.playerTrialDays),
  }
}
