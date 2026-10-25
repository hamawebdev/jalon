// « Vous ne trouvez pas votre réponse ? »: WhatsApp help card beside the questions.
import { Headset } from 'lucide-react'
import { WhatsAppButton } from '@/components/kit'
import { useFormat, useLang, useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { contactMessage } from '@/lib/whatsapp'
import { typo } from './text'

export function HelpCard({ className }: { className?: string }) {
  const t = useT()
  const lang = useLang()
  const { num } = useFormat()
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-6 text-white shadow-glow sm:p-7',
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-white/10"
      />
      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white/15 [&_svg]:size-5">
        <Headset aria-hidden />
      </span>
      <p className="mt-4 font-display text-xl font-bold">{typo(t.faq.help.title, lang)}</p>
      <p className="mt-2 text-[15px] text-white/80">
        {typo(t.faq.help.text(num(FACTS.counts.supportMinutes)), lang)}
      </p>
      <WhatsAppButton message={contactMessage()} wrap className="mt-5 w-full sm:w-auto">
        {t.faq.help.button}
      </WhatsAppButton>
      {FACTS.whatsapp.display ? (
        <p className="mt-3 text-sm font-semibold tracking-wide text-white/90">{FACTS.whatsapp.display}</p>
      ) : null}
    </div>
  )
}
