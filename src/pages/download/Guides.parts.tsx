import { useState, type ReactNode, type SyntheticEvent } from 'react'
import { useLocation } from 'react-router'
import { Chip, GuideTip, IconTile, stepDiscClass } from '@/components/brand'
import { cn } from '@/lib/utils'

/**
 * One device guide (apps-guides), on the kit's GuideAccordion recipe (tile 44, display title, device tags,
 * chevron, steps numbered in 32px discs, the tip). Two additions the page needs: an anchor `id`
 * (other pages link to /applications/#guide-tv) that opens the guide when the address targets it, and tags that
 * may hold a <Pending> marker while the owner has not listed the models.
 */
export function DeviceGuide({
  id,
  icon,
  title,
  tags,
  steps,
  tip,
  defaultOpen,
}: {
  id: string
  icon: string
  title: string
  tags: ReactNode[]
  steps: ReactNode[]
  tip?: ReactNode
  defaultOpen?: boolean
}) {
  const { hash } = useLocation()
  const targeted = hash === `#${id}`
  const [open, setOpen] = useState(!!defaultOpen || targeted)
  const onToggle = (e: SyntheticEvent<HTMLDetailsElement>) => setOpen(e.currentTarget.open)

  // A link to this guide opens it, also when the page is already on screen (state adjusted while rendering
  // when the address starts targeting the guide, so no extra effect pass).
  const [wasTargeted, setWasTargeted] = useState(targeted)
  if (targeted !== wasTargeted) {
    setWasTargeted(targeted)
    if (targeted) setOpen(true)
  }

  return (
    <details
      id={id}
      open={open}
      onToggle={onToggle}
      className="brand-disclosure group scroll-mt-[88px] rounded-card border border-z-line bg-z-card"
    >
      {/* The tile and the chevron sit on the title's first line, not on the middle of the row: on a phone the
          device tags (or a « À compléter » marker) wrap under the title and the row grows by several lines. The
          title's line box is padded to the tile's 44px, so its first line is centred on the tile however it wraps;
          the chevron has a 44px box. Tags on the title's line stay centred on it; wrapped tags follow 9px below. */}
      <summary
        aria-expanded={open}
        className="flex min-h-16 cursor-pointer list-none items-start gap-4 rounded-card p-5 transition-colors duration-150 ease-calm hover:bg-z-raised active:bg-band group-open:hover:bg-transparent md:px-6"
      >
        {/* Under 19em (never at the default 16px font from 320px; under 380px with a 20px font) the decorative
            tile gives its room to the title and the device tags, so a « À compléter » tag still fits the row. */}
        <IconTile icon={icon} size={44} className="max-[19em]:hidden" />
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4">
          <h3 className="py-[calc((2.75rem-1lh)/2)] font-display text-title text-z-fg">{title}</h3>
          {tags.length > 0 && (
            <span className="flex flex-wrap items-center gap-2">
              {tags.map((t, i) =>
                typeof t === 'string' ? (
                  <Chip key={t} size="sm">
                    {t}
                  </Chip>
                ) : (
                  <span key={i}>{t}</span>
                ),
              )}
            </span>
          )}
        </span>
        <i
          className="ti ti-chevron-down grid h-11 shrink-0 place-items-center text-[20px] text-nuit-700 transition-transform duration-200 ease-calm group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <ol className="m-0 list-none p-0">
          {steps.map((s, i) => (
            <li key={i} className="grid grid-cols-[32px_1fr] items-start gap-4 border-t border-z-line py-3.5">
              {/* The 32px disc is centred on the first line of the step (29px): 2px up. */}
              <span
                aria-hidden="true"
                data-label={String(i + 1)}
                className={cn(stepDiscClass.base, stepDiscClass.plain, '-mt-0.5 before:content-[attr(data-label)]')}
              />
              <div className="font-sans text-copy text-z-body">{s}</div>
            </li>
          ))}
        </ol>
        {tip != null && <GuideTip>{tip}</GuideTip>}
      </div>
    </details>
  )
}
