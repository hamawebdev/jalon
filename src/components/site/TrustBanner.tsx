// « INFORMATION OFFICIELLE » bar above the header (brief p. 4). The brief's sentence in full on wide screens, a
// shorter one on tablets and phones so it always fits on one line (no marquee). Owner: chrome.
import { BadgeCheck } from 'lucide-react'
import { useFormat, useT } from '@/i18n/context'
import { FACTS } from '@/lib/facts'

export function TrustBanner() {
  const t = useT()
  const b = t.chrome.banner
  const { colon } = useFormat()
  const domain = FACTS.brand.domain ?? ''
  return (
    <aside aria-label={b.label} className="bg-ink text-white">
      <p className="mx-auto flex min-h-9 max-w-[1440px] items-center justify-center gap-2 px-4 py-2 text-center text-[12.5px] leading-snug text-white/85">
        <span aria-hidden className="text-primary-soft">✦</span>
        <span className="min-w-0">
          <strong className="hidden font-bold tracking-wide text-white md:inline">{b.label}
            {colon}
          </strong>
          <span className="md:hidden">{b.short}</span>
          <span className="hidden md:inline xl:hidden">{b.medium(domain)}</span>
          <span className="hidden xl:inline">{b.full(domain)}</span>
        </span>
        <BadgeCheck aria-hidden className="size-4 shrink-0 text-status" />
      </p>
    </aside>
  )
}
