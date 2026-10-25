// Segmented « choose your system » bar: anchor links to the three groups (all content stays in the HTML).
// Sticks under the 72px header; the group in view is marked as current (observer runs in an effect only).
import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SystemLink {
  id: string
  label: string
  icon: LucideIcon
  count: number
}

export function SystemNav({ label, links }: { label: string; links: SystemLink[] }) {
  const [current, setCurrent] = useState(links[0]?.id)

  const ids = links.map((l) => l.id).join(' ')
  useEffect(() => {
    const sections = ids.split(' ').map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setCurrent(visible[0].target.id)
      },
      { rootMargin: '-160px 0px -55% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return (
    <nav aria-label={label} className="sticky top-[84px] z-20 mx-auto max-w-3xl">
      <ul className="grid grid-cols-3 gap-1 rounded-full border border-line bg-white/90 p-1.5 shadow-card backdrop-blur">
        {links.map(({ id, label: name, icon: Icon, count }) => {
          const active = current === id
          return (
            <li key={id} className="min-w-0">
              <a
                href={`#${id}`}
                aria-current={active ? 'location' : undefined}
                className={cn(
                  'flex min-h-11 items-center justify-center gap-2 rounded-full px-2 py-2 text-center text-[13px] font-semibold leading-tight transition-colors sm:px-4 sm:text-sm',
                  active ? 'bg-primary text-white shadow-glow' : 'text-ink hover:bg-primary-soft hover:text-primary',
                )}
              >
                <Icon aria-hidden className="hidden size-4 shrink-0 sm:block" />
                <span className="min-w-0">{name}</span>
                <span
                  className={cn(
                    'hidden rounded-full px-1.5 text-[11px] font-bold tabular-nums md:inline',
                    active ? 'bg-white/20 text-white' : 'bg-mist text-slate',
                  )}
                >
                  {count}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
