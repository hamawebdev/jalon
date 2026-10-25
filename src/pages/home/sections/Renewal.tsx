// Home section: CTA « Rejoignez Atlas Pro ONTV Aujourd'hui » with new-customer and renewal buttons. Owner: story. Anchor: HOME_ANCHORS.renewal
// Brief pp. 17–18: a wide violet gradient block with white text; a white button (new customer) and a white outline
// button (renewal). Both open WhatsApp.
import { RefreshCw } from 'lucide-react'
import { Reveal, Section, SectionHeader, WhatsAppButton } from '@/components/kit'
import { useT } from '@/i18n/context'
import { HOME_ANCHORS } from '@/i18n/routes'
import { activateMessage, renewalMessage } from '@/lib/whatsapp'
import { WRAP_PILL } from '../story/numbers'

export function Renewal() {
  const r = useT().story.renewal
  return (
    <Section id={HOME_ANCHORS.renewal} className="py-12 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary-deep px-5 py-14 text-center shadow-glow sm:px-12 sm:py-20">
          <span aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full bg-white/10" />
          <span aria-hidden className="absolute -right-16 -bottom-28 size-80 rounded-full border-[40px] border-white/10" />
          <div className="relative">
            <SectionHeader invert title={r.title} subtitle={r.text} className="mb-10 sm:mb-10" />
            <div className="mx-auto flex max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
              <WhatsAppButton message={activateMessage()} variant="white" size="lg" className={WRAP_PILL}>
                {r.subscribe}
              </WhatsAppButton>
              <WhatsAppButton message={renewalMessage()} variant="outlineWhite" size="lg" icon={<RefreshCw />} className={WRAP_PILL}>
                {r.renew}
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
