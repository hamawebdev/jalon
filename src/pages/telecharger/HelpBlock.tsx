// Closing help block: the brief's WhatsApp assistance banner (p. 32), with links to the home installation hub
// and the Boutique.
import { BookOpen, LifeBuoy, ShoppingBag } from 'lucide-react'
import { Container, PillButton, WhatsAppButton } from '@/components/kit'
import { useLang, useT } from '@/i18n/context'
import { homeAnchor, pathFor } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { helpMessage } from '@/lib/whatsapp'

export function HelpBlock() {
  const t = useT().downloads.help
  const lang = useLang()
  return (
    <section id="aide" className="bg-mist py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-card sm:p-10 lg:p-12">
          <span aria-hidden className="absolute -right-20 -top-20 hidden size-64 rounded-full bg-primary-soft sm:block" />
          <span aria-hidden className="absolute -bottom-24 right-24 size-40 rounded-full bg-status-soft" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="flex flex-col gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-whatsapp text-white">
                <LifeBuoy aria-hidden className="size-6" />
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.title}</h2>
              <p className="max-w-2xl text-slate sm:text-lg">{t.subtitle}</p>
            </div>
            <div className="flex flex-col items-stretch gap-3 sm:items-start lg:items-stretch">
              <WhatsAppButton
                message={helpMessage()}
                size="lg"
                className="h-auto min-h-13 whitespace-normal px-5 py-3 text-center leading-snug sm:px-7 [&>span.truncate]:overflow-visible [&>span.truncate]:whitespace-normal"
              >
                {t.whatsapp}
              </WhatsAppButton>
              {FACTS.whatsapp.display ? (
                <p className="text-center text-sm font-semibold tabular-nums text-slate sm:text-left lg:text-center">
                  {FACTS.whatsapp.display}
                </p>
              ) : null}
              <PillButton to={homeAnchor('install', lang)} variant="secondary" icon={<BookOpen aria-hidden />}>
                {t.guides}
              </PillButton>
            </div>
          </div>
          <p className="relative mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-6 text-sm text-slate">
            <ShoppingBag aria-hidden className="size-4 text-primary" />
            <span>{t.shopLead}</span>
            <PillButton to={pathFor('boutique', lang)} variant="ghost" size="sm" className="-ml-2 px-2">
              {t.shop}
            </PillButton>
          </p>
        </div>
      </Container>
    </section>
  )
}
