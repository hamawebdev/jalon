import { useState, type ReactNode, type SyntheticEvent } from 'react'
import { cn } from '@/lib/utils'
import { Chip, IconTile } from './Labels'
import { stepDiscClass } from './recipes'
import type { IconName } from './types'

/**
 * Open state of a native <details>, repeated as an explicit aria-expanded on its <summary> (same value the
 * platform exposes; tests and scripts can read it as an attribute).
 */
function useDetailsOpen(defaultOpen?: boolean) {
  const [open, setOpen] = useState(!!defaultOpen)
  const onToggle = (e: SyntheticEvent<HTMLDetailsElement>) => setOpen(e.currentTarget.open)
  return { open, onToggle }
}

/**
 * The row's focus ring, drawn inside the row (the list clips its rows to its rounded corners, so a ring outside
 * would be cut): 2px in the zone focus colour, 4px in, its corners concentric with the container's.
 */
const ROW_FOCUS =
  'relative focus-visible:outline-none focus-visible:after:pointer-events-none focus-visible:after:absolute focus-visible:after:inset-1 ' +
  "focus-visible:after:rounded-[calc(var(--radius-card)-4px)] focus-visible:after:border-2 focus-visible:after:border-z-focus focus-visible:after:content-['']"

/**
 * FAQ list: one container for all the rows, not a card per question. A card (zone fill, hairline, card radius)
 * whose rows are divided by hairlines and clipped to its corners. Each row closes with a hairline; the inner
 * wrapper pushes the last one under the container's edge, so rows may be wrapped or hidden freely by the page.
 */
export function FaqList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-card border border-z-line bg-z-card', className)}>
      <div className="-mb-px">{children}</div>
    </div>
  )
}

type FaqItemProps = {
  question: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  /**
   * Wrap the question in a heading element. Leave it unset for FAQ rows: VoiceOver and some NVDA/Chrome
   * combinations flatten <summary> into a button, so a heading inside it drops out of heading navigation.
   * Keep the outline through the section H2 instead.
   */
  headingAs?: 'h3' | 'h4'
  className?: string
}

/**
 * FAQ row on native <details>: find-in-page still opens answers, aria-expanded comes from the platform, the answer
 * stays in the DOM, and several rows may stay open. The row is at least 64px and is the whole tap target; hover
 * takes the zone's raised fill. The sign is a 28px blue-tint disc holding a plus, on the question's first line;
 * open, the disc turns Bleu repère and the plus's upright bar lies down to a minus (180ms). Height animates over
 * 200ms where supported.
 */
export function FaqItem({ question, children, defaultOpen, headingAs, className }: FaqItemProps) {
  const Q = headingAs ?? 'span'
  const { open, onToggle } = useDetailsOpen(defaultOpen)
  return (
    <details open={defaultOpen} onToggle={onToggle} className={cn('brand-disclosure group border-b border-z-line', className)}>
      <summary
        aria-expanded={open}
        className={cn(
          'flex min-h-16 cursor-pointer list-none items-start justify-between gap-4 px-5 py-[18px] font-sans text-faq text-z-fg',
          'transition-colors duration-150 ease-calm hover:bg-z-raised active:bg-band nuit:active:bg-nuit-raised',
          ROW_FOCUS,
        )}
      >
        <Q className="font-sans text-faq text-z-fg">{question}</Q>
        <span
          aria-hidden="true"
          className={cn(
            'relative grid size-7 shrink-0 place-items-center rounded-full bg-nuit-100 text-nuit-700 transition-colors duration-180 ease-calm',
            'group-open:bg-nuit-700 group-open:text-plate nuit:bg-nuit-raised nuit:text-signal-300 nuit:group-open:bg-signal-300 nuit:group-open:text-nuit',
            "before:absolute before:h-0.5 before:w-3 before:rounded-full before:bg-current before:content-['']",
            "after:absolute after:h-3 after:w-0.5 after:rounded-full after:bg-current after:transition-transform after:duration-180 after:ease-calm after:content-[''] group-open:after:rotate-90",
          )}
        />
      </summary>
      {/* 64px on the right: the answer never runs under the sign. At most 62 characters wide. */}
      <div className="box-content max-w-[62ch] pr-16 pb-5 pl-5 font-sans text-copy text-z-body">{children}</div>
    </details>
  )
}

/** Tip callout: a blue-tint note with 12px corners, Bleu repère text and edge (the info notice's look), bulb icon. No side rail. */
export function GuideTip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('mt-4 flex gap-3 rounded-control border border-nuit-700/30 bg-nuit-100 px-4 py-3.5 font-sans text-small text-nuit-700', className)}>
      <i className="ti ti-bulb mt-0.5 shrink-0 text-[20px] text-nuit-700" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

/**
 * A value to type or read aloud (URL, code, reference): mono 500 15px on band, ink, breaks anywhere. Mono
 * keeps O/0 and I/l apart. Never below 14px. On a band ground pass className="bg-paper".
 */
export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        'rounded-tag bg-band px-1.5 py-0.5 font-mono text-[0.9375rem] leading-[1.45] font-medium text-ink break-anywhere nuit:bg-nuit-raised nuit:text-on-nuit',
        className,
      )}
    >
      {children}
    </code>
  )
}

type GuideAccordionProps = {
  icon: IconName
  title: ReactNode
  /** Device tags as small chips (content strings: shown on every width, wrapping under the title on phone). */
  tags?: string[]
  /** Hide the tags below md, only when they would wrap past two lines on phone. */
  hideTagsOnPhone?: boolean
  steps: ReactNode[]
  tip?: ReactNode
  defaultOpen?: boolean
  as?: 'h3' | 'h4'
  className?: string
  /** Extra content after the steps and tip. */
  children?: ReactNode
}

/** Guide accordion card: tile 44, display title, device tags, chevron; steps numbered in 32px discs, an optional tip. */
export function GuideAccordion({ icon, title, tags, hideTagsOnPhone, steps, tip, defaultOpen, as: H = 'h3', className, children }: GuideAccordionProps) {
  const { open, onToggle } = useDetailsOpen(defaultOpen)
  return (
    <details open={defaultOpen} onToggle={onToggle} className={cn('brand-disclosure group rounded-card border border-z-line bg-z-card', className)}>
      <summary
        aria-expanded={open}
        className="flex min-h-16 cursor-pointer list-none items-center gap-4 rounded-card p-5 transition-colors duration-150 ease-calm hover:bg-z-raised active:bg-band group-open:hover:bg-transparent md:px-6 nuit:active:bg-nuit-raised"
      >
        <IconTile icon={icon} size={44} />
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2">
          <H className="font-display text-title text-z-fg">{title}</H>
          {tags && tags.length > 0 && (
            <span className={cn('flex flex-wrap gap-2', hideTagsOnPhone && 'max-md:hidden')}>
              {tags.map((t) => (
                <Chip key={t} size="sm">
                  {t}
                </Chip>
              ))}
            </span>
          )}
        </span>
        <i
          className="ti ti-chevron-down shrink-0 text-[20px] text-nuit-700 transition-transform duration-200 ease-calm group-open:rotate-180 nuit:text-signal-300"
          aria-hidden="true"
        />
      </summary>
      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <ol className="m-0 list-none p-0">
          {steps.map((s, i) => (
            <li key={i} className="grid grid-cols-[32px_1fr] items-start gap-4 border-t border-z-line py-3.5">
              <span
                aria-hidden="true"
                data-label={String(i + 1)}
                className={cn(stepDiscClass.base, stepDiscClass.plain, 'before:content-[attr(data-label)]')}
              />
              <div className="font-sans text-copy text-z-body">{s}</div>
            </li>
          ))}
        </ol>
        {tip != null && <GuideTip>{tip}</GuideTip>}
        {children}
      </div>
    </details>
  )
}
