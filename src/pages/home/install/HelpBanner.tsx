// « Bloqué à une étape ? » — WhatsApp help banner at the foot of the hub.
import { Headset } from 'lucide-react'
import { Fact, WhatsAppButton } from '@/components/kit'
import { useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'
import { helpMessage } from '@/lib/whatsapp'

export function HelpBanner() {
  const t = useT().install.help
  return (
    <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-white sm:mt-20 sm:px-12 sm:py-12">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-10 size-64 rounded-full bg-whatsapp/20 blur-3xl" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-2xl items-start gap-4">
          <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white sm:inline-flex [&_svg]:size-6">
            <Headset aria-hidden />
          </span>
          <div>
            <h3 className="text-2xl leading-tight font-bold text-white sm:text-3xl">{t.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">{t.subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 lg:items-center">
          <WhatsAppButton
            message={helpMessage()}
            size="lg"
            className="h-auto min-h-13 w-full py-3 whitespace-normal sm:w-auto [&_.truncate]:overflow-visible [&_.truncate]:whitespace-normal"
          >
            {t.button}
          </WhatsAppButton>
          <Fact value={FACTS.whatsapp.display} what="whatsapp.display">
            {(display) => <span className="pl-2 text-sm font-medium text-white/70 lg:pl-0">{display}</span>}
          </Fact>
        </div>
      </div>
    </div>
  )
}
