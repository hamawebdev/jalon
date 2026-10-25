// The logo slot of a reseller panel card (brief: « [🖼️ Logo Atlas Pro ONTV] »): an original monogram, a violet
// tile with an « A » whose crossbar is a play mark. No third-party logo. Owner: pages.
import { cn } from '@/lib/utils'

export function PanelMonogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-deep text-white shadow-[0_6px_18px_rgb(80_52_255/0.28)]',
        className,
      )}
    >
      <svg viewBox="0 0 48 48" width="30" height="30" fill="none">
        <path d="M12 37 24 10l12 27" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.5 24.5v8.2l7.3-4.1z" fill="currentColor" />
      </svg>
    </span>
  )
}
