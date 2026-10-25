// Inline SVG flags of the site's languages (no emoji flags, no image files). The colours are the national flags'
// own colours, not theme colours: they are the only hex values allowed in this folder. Owner: chrome.
import { useId, type ReactNode } from 'react'
import type { Lang } from '@/i18n/locales'
import { cn } from '@/lib/utils'

function UnionJack() {
  // Ids must be unique on the page (several switchers can show the same flag) and valid in url(#…).
  const id = `uj${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <clipPath id={id}>
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#${id})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 16" preserveAspectRatio="none" width="100%" height="100%">
      {children}
    </svg>
  )
}

const FLAGS: Record<Lang, () => ReactNode> = {
  fr: () => (
    <Svg>
      <rect width="8" height="16" fill="#0055A4" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#EF4135" />
    </Svg>
  ),
  en: () => <UnionJack />,
  de: () => (
    <Svg>
      <rect width="24" height="5.34" fill="#000" />
      <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
      <rect y="10.66" width="24" height="5.34" fill="#FFCE00" />
    </Svg>
  ),
  es: () => (
    <Svg>
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </Svg>
  ),
  pt: () => (
    <Svg>
      <rect width="24" height="16" fill="#FF0000" />
      <rect width="9.6" height="16" fill="#006600" />
      <circle cx="9.6" cy="8" r="3.6" fill="none" stroke="#FFE000" strokeWidth="1.1" />
      <path d="M8.1 6.2h3v2.6a1.5 1.5 0 0 1-3 0z" fill="#fff" stroke="#FF0000" strokeWidth="0.6" />
    </Svg>
  ),
  it: () => (
    <Svg>
      <rect width="8" height="16" fill="#009246" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#CE2B37" />
    </Svg>
  ),
  fi: () => (
    <Svg>
      <rect width="24" height="16" fill="#fff" />
      <rect x="6.67" width="4" height="16" fill="#002F6C" />
      <rect y="5.82" width="24" height="4.36" fill="#002F6C" />
    </Svg>
  ),
}

/** The flag of a language, 3:2, rounded, with a hairline edge so white stripes stay visible. Decorative. */
export function Flag({ lang, className }: { lang: Lang; className?: string }) {
  const Draw = FLAGS[lang]
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-flex h-4 w-6 shrink-0 overflow-hidden rounded-[4px] after:absolute after:inset-0 after:rounded-[4px] after:ring-1 after:ring-ink/15 after:ring-inset [&>svg]:block',
        className,
      )}
    >
      <Draw />
    </span>
  )
}
