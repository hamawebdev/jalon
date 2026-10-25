// Atlas Pro mark and wordmark. The mark: a violet rounded tile with a white peak (the « A » of Atlas) whose crossbar is
// a green live dot. Header: « AtlasPro ». Footer: « AtlasProTVOfficial » on the dark background. Owner: chrome.
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn('size-9 shrink-0', className)}>
      <rect width="40" height="40" rx="11" className="fill-primary" />
      <path
        d="M11.5 29 20 11.5 28.5 29"
        fill="none"
        className="stroke-white"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="24" r="2.9" className="fill-status" />
    </svg>
  )
}

/** Mark + wordmark. `tone="dark"` for the dark footer (seller name, white text). */
export function Logo({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  if (tone === 'dark') {
    // « AtlasProTVOfficial »: brand part white, the rest softened.
    const seller = FACTS.brand.seller
    const cut = seller.indexOf('TV')
    return (
      <span className={cn('inline-flex items-center gap-2.5', className)}>
        <LogoMark />
        <span className="font-display text-lg font-bold tracking-tight text-white">
          {cut > 0 ? (
            <>
              {seller.slice(0, cut)}
              <span className="text-white/60">{seller.slice(cut)}</span>
            </>
          ) : (
            seller
          )}
        </span>
      </span>
    )
  }
  const [first, ...rest] = FACTS.brand.name.split(' ')
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-display text-[1.35rem] font-bold leading-none tracking-tight text-ink">
        {first}
        <span className="text-primary">{rest.join(' ')}</span>
      </span>
    </span>
  )
}
