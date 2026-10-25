// Home section: « Comment acheter votre abonnement Atlas Pro ONTV » (4 timeline steps). Owner: pricing. Anchor: HOME_ANCHORS.howTo
// Brief pp. 17–19: numbered gradient circles on the left joined by a thin line, white cards on the right with an icon
// in a light square, an H3, the text and a green time pill.
import { MailCheck, Play, ShieldCheck, ShoppingCart, Timer } from 'lucide-react'
import { IconTile, Reveal, Section, SectionHeader } from '@/components/kit'
import { useFormat, useT } from '@/i18n/context'
import { HOME_ANCHORS } from '@/i18n/routes'
import { FACTS, PLANS } from '@/lib/facts'

export function HowTo() {
  const t = useT()
  const h = t.pricing.howTo
  const { num } = useFormat()

  const steps = [
    {
      key: 'choose',
      icon: ShoppingCart,
      title: h.steps.choose.title,
      text: h.steps.choose.text(
        PLANS.map((p) => num(p.screens)),
        num(Math.max(...PLANS.map((p) => p.months))),
      ),
      time: h.steps.choose.time,
    },
    { key: 'pay', icon: ShieldCheck, title: h.steps.pay.title, text: h.steps.pay.text, time: h.steps.pay.time },
    {
      key: 'receive',
      icon: MailCheck,
      title: h.steps.receive.title,
      text: h.steps.receive.text,
      time: h.steps.receive.time,
    },
    {
      key: 'install',
      icon: Play,
      title: h.steps.install.title,
      text: h.steps.install.text(num(FACTS.counts.channels)),
      time: h.steps.install.time,
    },
  ]

  return (
    <Section id={HOME_ANCHORS.howTo}>
      <SectionHeader
        badge={h.badge}
        title={h.title}
        highlight={h.highlight}
        subtitle={h.subtitle(num(FACTS.counts.installMinutes))}
      />
      <ol className="mx-auto flex max-w-3xl flex-col">
        {steps.map(({ key, icon: Icon, title, text, time }, i) => {
          const last = i === steps.length - 1
          return (
            <li key={key} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-7">
              {/* Rail: gradient number circle + connecting line */}
              <div aria-hidden className="relative flex justify-center">
                <span className="relative z-10 flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-deep font-display text-lg font-bold text-white shadow-glow ring-4 ring-canvas sm:size-14 sm:text-xl">
                  {num(i + 1)}
                </span>
                {last ? null : (
                  <span className="absolute bottom-0 top-11 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-line sm:top-14" />
                )}
              </div>

              <Reveal className={last ? '' : 'pb-6 sm:pb-8'} delay={i * 80}>
                <article className="group rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <IconTile className="bg-mist">
                      <Icon />
                    </IconTile>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <h3 className="text-lg font-bold sm:text-xl">
                          <span className="sr-only">{h.step(num(i + 1))} : </span>
                          {title}
                        </h3>
                        <p className="inline-flex items-center gap-1.5 rounded-full bg-status-soft px-3 py-1 text-xs font-bold text-ink">
                          <Timer aria-hidden className="size-3.5 text-status" />
                          <span className="sr-only">{h.timeLabel} : </span>
                          {time}
                        </p>
                      </div>
                      <p className="text-[15px] text-slate sm:text-base">{text}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
