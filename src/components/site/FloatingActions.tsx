// Floating widgets (brief p. 40): the green round WhatsApp button bottom-right and, above it, the violet back-to-top
// button that appears once the page is scrolled. Clear of the phone's bottom edge (safe area). Owner: chrome.
import { ArrowUp } from 'lucide-react'
import { WhatsAppIcon } from '@/components/kit'
import { useT } from '@/i18n/context'
import { cn } from '@/lib/utils'
import { contactMessage, waLink } from '@/lib/whatsapp'
import { useScrolledPast } from './chrome/hooks'

export function FloatingActions() {
  const t = useT()
  const showTop = useScrolledPast(600)

  function toTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={toTop}
        aria-label={t.chrome.floating.top}
        className={cn(
          'pointer-events-auto inline-flex size-11 items-center justify-center rounded-full bg-primary text-white shadow-glow transition-all duration-300 hover:bg-primary-deep',
          showTop ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0',
        )}
      >
        <ArrowUp aria-hidden className="size-5" />
      </button>
      <a
        href={waLink(contactMessage())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.chrome.floating.whatsapp}
        data-cta="whatsapp"
        className="pointer-events-auto inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgb(37_211_102/0.4)] transition-transform duration-200 hover:scale-105 hover:bg-whatsapp-deep"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  )
}
