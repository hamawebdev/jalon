import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type Ref } from 'react'
import { useLocation } from 'react-router'
import { formatList } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import {
  choicesFor,
  consentToolsOf,
  needsChoice,
  registerConsentTools,
  saveConsent,
  useConsentState,
  type ConsentTool,
} from './consent-store'
import { fixedRootClass } from './recipes'
import { TextLink } from './Type'

/**
 * Every word of the banner (copy writes them; IDENTITY §6). The tools' names, purposes and durations come from
 * `tools`. The kit adds only the no-break space and colon between a label and its value.
 */
export type ConsentTexts = {
  /** The heading, and the dialog's accessible name (« Vos choix de cookies »). */
  title: string
  /**
   * The sentence under it, the dialog's description; about 160 characters at most once filled. `{usages}` in it
   * becomes the purposes of the tools asked about, as written in cookies.tools, joined as a French list
   * (formatList: « a, b et c »).
   */
  body: string
  /** The link after the sentence, to the privacy page (« Voir le détail des cookies »); shown when `policyTo` is given. */
  policy?: string
  /** « Tout refuser »: as large, as heavy and as visible as acceptAll, before it. */
  refuseAll: string
  /** « Tout accepter » */
  acceptAll: string
  /** The disclosure that opens one switch per tool (« Personnaliser »). */
  customize: string
  /** The button under the switches (« Enregistrer mes choix »). */
  save: string
  /** Accessible name of the round close button. Closing (it, or Esc) refuses every tool: the name says so. */
  close: string
  /** Accessible name of the list of switches (not shown). */
  tools: string
  /** Label before a tool's purpose (« À quoi il sert » → « À quoi il sert : … »). */
  purpose: string
  /** Label before a tool's duration (« Durée » → « Durée : 13 mois »). */
  duration: string
  /** Said by screen readers once a choice is saved (« Vos choix sont enregistrés. »). */
  saved: string
}

type ConsentBannerProps = {
  /** `cookies.tools` from the facts (null or [] = none). Every tool but an essential one (`consent: false`) is asked about. */
  tools: readonly ConsentTool[] | null | undefined
  texts: ConsentTexts
  /** Router path of the privacy page's cookie section (« /politique-de-confidentialite/#cookies »). */
  policyTo?: string
  /** The section hook (chrome-consent once mounted in the layout). */
  dataSection?: string
  className?: string
}

type Side = 'left' | 'right'

/** From md (48rem) the banner is a corner card; below, a bottom sheet. */
const CARD_MEDIA = '(min-width: 48rem)'

/**
 * The banner's classes (APPROVAL §2e), on `fixedRootClass.light`, kept beside the only component that uses them so
 * the chunk every page loads carries none of the banner (QA HC-08). Phones: a bottom sheet, full width, top corners
 * at the panel radius, a hairline and the float shadow, the bottom safe area, never taller than 85 % of the screen
 * (it scrolls inside). From md: a 400 px card at the card radius, 24 px from the bottom, at `left` or `right`
 * (96 px from the right edge, beside the WhatsApp bubble). z 55: above the buy bar (45) and the bubble (50), under the
 * sheets' scrim (60), so an open menu or cart covers it. No scrim of its own. It rises 16 px into place over 200 ms,
 * only when motion is allowed (index.css .consent-enter).
 */
const consentClass = {
  root:
    'consent-enter fixed inset-x-0 bottom-0 z-[55] max-h-[85svh] overflow-y-auto overscroll-contain rounded-t-panel border-t border-hairline px-5 pt-3 ' +
    'pb-[calc(12px+env(safe-area-inset-bottom))] shadow-float outline-none print:hidden ' +
    'md:inset-x-auto md:bottom-6 md:max-h-[calc(100svh-48px)] md:w-[400px] md:rounded-card md:border md:p-6',
  left: 'md:left-6',
  right: 'md:right-24',
  /**
   * « Tout refuser » and « Tout accepter »: two equal secondary buttons in equal columns, side by side while each
   * column keeps 8.5rem (136 px at 16 px text: both sit side by side on a 320 px phone), stacked below that, so at
   * a large text size. Neither outranks the other; a label that wraps makes both buttons taller together.
   */
  choices: 'mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,8.5rem),1fr))] gap-2',
  /**
   * The link after the sentence (« Voir le détail des cookies »), an inline text link: its focus ring hugs the words
   * like any link in a sentence, and an invisible layer 12px above and below makes it a 44px target without moving a
   * line (the tappable chips' way: drawn small, hit large). Nothing else to tap sits within those 12px.
   */
  policy: "relative after:absolute after:inset-x-0 after:-inset-y-3 after:content-['']",
  /**
   * « Personnaliser »: a text action (the link variant) whose chevron turns over while the switches are open. Only
   * the words are underlined, not the chevron.
   */
  disclosure:
    'no-underline [&>span]:underline [&>span]:decoration-1 [&>span]:underline-offset-4 [&:hover>span]:decoration-2 ' +
    '[&>i]:transition-transform [&>i]:duration-180 [&>i]:ease-calm [&[aria-expanded=true]>i]:rotate-180',
  /**
   * A tool's switch (the visible part of an `<input role="switch">` kept for screen readers): a 52 × 32 px pill track
   * drawn beside the tool's words, the whole row being the target. Off: white, a 1.5 px hairline-strong edge (3:1 or
   * more), a hairline-strong thumb on the left. On: Bleu repère with a white thumb on the right holding a check, so
   * the state never rests on colour alone. The focus ring goes round the track.
   */
  track:
    'relative mt-0.5 inline-flex h-8 w-[52px] shrink-0 items-center rounded-full border-[1.5px] border-hairline-strong bg-plate ' +
    'transition-[background-color,border-color] duration-150 ease-calm group-hover:border-nuit-700 ' +
    'peer-checked:border-nuit-700 peer-checked:bg-nuit-700 ' +
    'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-z-focus',
  thumb:
    'grid size-6 translate-x-[2.5px] place-items-center rounded-full bg-hairline-strong transition-[translate,background-color] duration-180 ease-calm ' +
    '[.peer:checked~*_&]:translate-x-[22.5px] [.peer:checked~*_&]:bg-plate',
  check: 'ti ti-check text-[16px] text-nuit-700 opacity-0 [.peer:checked~*_&]:opacity-100',
} as const

/**
 * The page's main landmark shows its content. While a lazy route loads, the layout's Suspense placeholder stands
 * there, empty and as tall as the screen, so the page can stay the same size for a long moment before it draws.
 * A page without a main landmark counts as drawn.
 */
function pageDrawn() {
  const main = document.querySelector('main')
  return !main || (main.textContent ?? '').trim() !== ''
}

/**
 * Calls `done` once the page is drawn (pageDrawn) and has then stopped changing size for `quiet` ms (fonts, images),
 * or `max` ms after it was drawn if it keeps changing; after `cap` ms in any case (a page that never draws).
 * Returns a cancel function.
 */
function whenSettled(done: () => void, quiet = 250, max = 1500, cap = 4000) {
  let drawnAt = pageDrawn() ? performance.now() : null
  let finished = false
  let timer = window.setTimeout(quietFor, quiet)
  const last = window.setTimeout(finish, cap)
  const ro =
    typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => {
          window.clearTimeout(timer)
          timer = window.setTimeout(quietFor, quiet)
          if (drawnAt === null && pageDrawn()) drawnAt = performance.now()
          if (drawnAt !== null && performance.now() - drawnAt >= max) finish()
        })
  ro?.observe(document.body)
  // The page kept its size for `quiet` ms: done if it is drawn, otherwise look again a moment later.
  function quietFor() {
    if (pageDrawn()) finish()
    else timer = window.setTimeout(quietFor, quiet)
  }
  function stop() {
    finished = true
    ro?.disconnect()
    window.clearTimeout(timer)
    window.clearTimeout(last)
  }
  function finish() {
    if (finished) return
    stop()
    done()
  }
  return stop
}

/** The page's filled buttons (Bleu repère: the main action of a view) now on screen, outside `except`. */
function filledButtons(except: HTMLElement) {
  const boxes: DOMRect[] = []
  for (const el of document.querySelectorAll<HTMLElement>('a, button')) {
    if (!el.classList.contains('bg-nuit-700') || except.contains(el) || el.closest('[inert]')) continue
    const r = el.getBoundingClientRect()
    if (r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < window.innerHeight) boxes.push(r)
  }
  return boxes
}

type Box = { l: number; r: number; t: number; b: number }
type Point = { x: number; y: number }

/** Where the card stands in each corner (md and up): 24 px from the bottom, 24 px from the left or 96 px from the right. */
function cornerBoxes(card: HTMLElement): Record<Side, Box> {
  const w = card.offsetWidth
  const b = window.innerHeight - 24
  const t = b - card.offsetHeight
  return { left: { l: 24, r: 24 + w, t, b }, right: { l: window.innerWidth - 96 - w, r: window.innerWidth - 96, t, b } }
}

/**
 * The card's corner (md and up): bottom left, unless it would sit on a filled button of the screen and bottom right
 * (left of the WhatsApp bubble) would not. Decided when the banner opens, once the page under it has settled (just
 * after it opens, and after a page change) and on a resize; never because the visitor scrolls.
 */
function pickSide(card: HTMLElement): Side {
  if (!window.matchMedia(CARD_MEDIA).matches) return 'left'
  const corners = cornerBoxes(card)
  const buttons = filledButtons(card)
  const covers = (x: Box) => buttons.some((b) => b.left < x.r && b.right > x.l && b.top < x.b && b.bottom > x.t)
  if (!covers(corners.left)) return 'left'
  return covers(corners.right) ? 'left' : 'right'
}

/**
 * The corner of a card already in place, picked again: it changes only when the pointer is neither over the card nor
 * where the card would go, so the card never moves away from, or onto, the pointer.
 */
function repickSide(card: HTMLElement, pointer: Point | null): Side {
  const current: Side = card.dataset.consentSide === 'right' ? 'right' : 'left'
  const next = pickSide(card)
  if (next === current || card.matches(':hover')) return current
  const to = cornerBoxes(card)[next]
  const under = pointer && pointer.x >= to.l && pointer.x <= to.r && pointer.y >= to.t && pointer.y <= to.b
  return under ? current : next
}

function ToolSwitch({ tool, checked, onChange, texts }: { tool: ConsentTool; checked: boolean; onChange: (on: boolean) => void; texts: ConsentTexts }) {
  const id = useId()
  return (
    <li className="py-3">
      <label className="group relative flex min-h-11 cursor-pointer items-start gap-4">
        <span className="min-w-0 flex-1">
          <span id={`${id}-name`} className="block font-sans text-small font-semibold text-z-fg">
            {tool.name}
          </span>
          <span id={`${id}-desc`} className="mt-0.5 block font-sans text-meta text-z-soft">
            <span className="block">
              {texts.purpose}&nbsp;: {tool.purpose}
            </span>
            <span className="block">
              {texts.duration}&nbsp;: {tool.duration}
            </span>
          </span>
        </span>
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-labelledby={`${id}-name`}
          aria-describedby={`${id}-desc`}
          className="peer sr-only"
        />
        <span aria-hidden="true" className={consentClass.track}>
          <span className={consentClass.thumb}>
            <i className={consentClass.check} />
          </span>
        </span>
      </label>
    </li>
  )
}

type DialogProps = {
  ref: Ref<HTMLDivElement>
  asked: ConsentTool[]
  /** The current choice per tool (undefined = none yet): the switches start from it, off when there is none. */
  current: Record<string, boolean | undefined>
  texts: ConsentTexts
  policyTo?: string
  /** Opened on purpose (openConsentSettings): the switches start open. */
  startExpanded: boolean
  side: Side
  dataSection?: string
  className?: string
  onAll: (accepted: boolean) => void
  onSave: (accepted: (tool: ConsentTool) => boolean) => void
  onClose: () => void
}

/** One opening of the banner: mounted when it shows, so its switches start from the saved choice every time. */
function ConsentDialog({ ref, asked, current, texts, policyTo, startExpanded, side, dataSection, className, onAll, onSave, onClose }: DialogProps) {
  const [expanded, setExpanded] = useState(startExpanded)
  const [draft, setDraft] = useState<Record<string, boolean>>({})
  const titleId = useId()
  const bodyId = useId()
  const panelId = useId()
  const isOn = (t: ConsentTool) => draft[t.name] ?? current[t.name] ?? false
  const body = texts.body.replace('{usages}', formatList(asked.map((t) => t.purpose)) ?? '')
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Escape') return
    e.stopPropagation()
    onClose()
  }

  return (
    <div
      ref={ref}
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      tabIndex={-1}
      data-section={dataSection}
      data-consent-side={side}
      onKeyDown={onKeyDown}
      className={cn(fixedRootClass.light, consentClass.root, side === 'right' ? consentClass.right : consentClass.left, className)}
    >
      <div className="-mr-2 flex items-center gap-3 md:-mt-2">
        <h2 id={titleId} className="min-w-0 flex-1 font-display text-title text-z-fg">
          {texts.title}
        </h2>
        <Button variant="icon" iconStart="ti-x" aria-label={texts.close} onClick={onClose} />
      </div>
      <p className="mt-1 font-sans text-small text-z-body">
        <span id={bodyId}>{body}</span>
        {policyTo && texts.policy && (
          <>
            {' '}
            <TextLink to={policyTo} className={consentClass.policy}>
              {texts.policy}
            </TextLink>
          </>
        )}
      </p>
      <div className={consentClass.choices}>
        <Button variant="secondary" full className="px-4" onClick={() => onAll(false)}>
          {texts.refuseAll}
        </Button>
        <Button variant="secondary" full className="px-4" onClick={() => onAll(true)}>
          {texts.acceptAll}
        </Button>
      </div>
      <Button
        variant="link"
        iconEnd="ti-chevron-down"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
        className={cn(consentClass.disclosure, 'mt-1 py-2.5')}
      >
        {texts.customize}
      </Button>
      <div id={panelId} hidden={!expanded} className="border-t border-hairline">
        <ul aria-label={texts.tools} className="divide-y divide-hairline">
          {asked.map((t) => (
            <ToolSwitch key={t.name} tool={t} texts={texts} checked={isOn(t)} onChange={(on) => setDraft((d) => ({ ...d, [t.name]: on }))} />
          ))}
        </ul>
        <Button variant="secondary" full className="mt-3" onClick={() => onSave(isOn)}>
          {texts.save}
        </Button>
      </div>
    </div>
  )
}

/**
 * The consent banner (APPROVAL §2e): mounted once in the layout with `cookies.tools`; it renders nothing until a
 * tool needs agreement. It asks when no current choice covers every such tool (first visit, 13 months later, a new
 * tool, a tool whose purpose or duration changed), and when openConsentSettings() is called.
 *
 * - Look (« Jalon clair »): a white bottom sheet on phones (top corners at the panel radius, never as tall as the
 *   screen, scrolls inside), a 400 px corner card from md (bottom left, or bottom right when the left corner would
 *   sit on a filled button of the screen). Hairline and float shadow, no scrim: the page stays readable and usable.
 *   While it is open the page gets the same height of room after the footer, keyboard focus scrolls clear of it,
 *   and the phone buy bar rides above the sheet, so nothing stays under it.
 * - Choices: « Tout refuser » and « Tout accepter » are the same secondary button, side by side (stacked when they
 *   do not fit). « Personnaliser » opens one switch per tool (name, purpose, duration), all off until the visitor
 *   turns one on, and « Enregistrer mes choix ». Closing (the round button, Esc) is a refusal of every tool. Each
 *   choice is saved with its date (consent-store.ts) and announced.
 * - Access: a labelled, non-modal dialog (no focus trap, no inert page). On a first visit it opens once the page
 *   has drawn and settled and takes the focus; opened by openConsentSettings() it takes it at once; on close the focus goes
 *   back to where it was. Visible focus ring, 44 px targets, entrance motion only when motion is allowed.
 */
export function ConsentBanner({ tools, texts, policyTo, dataSection, className }: ConsentBannerProps) {
  const asked = useMemo(() => consentToolsOf(tools), [tools])
  const s = useConsentState()
  const { pathname } = useLocation()
  const dialog = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const wasShown = useRef(false)
  const pointer = useRef<Point | null>(null)
  const [settled, setSettled] = useState(false)
  const [side, setSide] = useState<Side>('left')
  const [said, setSaid] = useState('')

  useLayoutEffect(() => registerConsentTools(tools ?? []), [tools])

  const wanted = asked.length > 0 && (s.open || needsChoice(s.saved, asked))
  // A first visit waits for the page to settle (drawn, then still), so the card picks its corner over the page it
  // will sit on and the focus does not jump while the page is still drawing. Asked for on purpose, it opens at once.
  useEffect(() => {
    if (!wanted || settled) return
    return whenSettled(() => setSettled(true))
  }, [wanted, settled])
  const shown = wanted && (settled || s.open)

  // Focus into the dialog when it opens (and on each openConsentSettings() call); remember where it came from.
  // The corner is picked at the same moment, before the first paint.
  useLayoutEffect(() => {
    const el = dialog.current
    if (!shown || !el) return
    const active = document.activeElement
    if (active instanceof HTMLElement && active !== document.body && !el.contains(active)) opener.current = active
    el.focus({ preventScroll: true })
    setSide(pickSide(el))
  }, [shown, s.request])

  // Closed: back to where the focus was, if it was lost with the dialog.
  useEffect(() => {
    if (shown) {
      wasShown.current = true
      return
    }
    if (!wasShown.current) return
    wasShown.current = false
    const active = document.activeElement
    if ((!active || active === document.body) && opener.current?.isConnected) opener.current.focus({ preventScroll: true })
    opener.current = null
  }, [shown])

  // The pointer's last place while the banner is wanted (on a first visit, from the page load on), for repickSide;
  // forgotten when it leaves the window and once the banner closes. Kept in memory only.
  useEffect(() => {
    if (!wanted) return
    const onPointer = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY }
    }
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) pointer.current = null
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerdown', onPointer, { passive: true })
    window.addEventListener('pointerout', onOut, { passive: true })
    return () => {
      pointer.current = null
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('pointerout', onOut)
    }
  }, [wanted])

  // The corner again (repickSide: never onto or away from the pointer) on a resize, and once the page under the card
  // has settled: just after it opens, since it may open over a page still drawing (a route that took longer than the
  // wait, or asked for at once), and after each page change.
  useEffect(() => {
    if (!shown) return
    const repick = () => {
      if (dialog.current) setSide(repickSide(dialog.current, pointer.current))
    }
    let frame = 0
    const onResize = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        repick()
      })
    }
    window.addEventListener('resize', onResize)
    const cancel = whenSettled(repick)
    return () => {
      cancel()
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
    }
  }, [shown, pathname])

  // The room it takes from the bottom of the screen (--consent-h on <html>, with html.has-consent): index.css adds
  // as much after the footer and as scroll padding, and the phone buy bar sits above the sheet (Chrome.tsx).
  useLayoutEffect(() => {
    const el = dialog.current
    if (!shown || !el) return
    const root = document.documentElement
    const measure = () => {
      const fromBottom = el.offsetHeight + (parseFloat(getComputedStyle(el).bottom) || 0)
      root.style.setProperty('--consent-h', `${Math.ceil(fromBottom)}px`)
    }
    measure()
    root.classList.add('has-consent')
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    ro?.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
      root.classList.remove('has-consent')
      root.style.removeProperty('--consent-h')
    }
  }, [shown, side, s.request])

  // The saved message stays in the live region a few seconds, then clears (so the next one is read again).
  useEffect(() => {
    if (!said) return
    const t = window.setTimeout(() => setSaid(''), 5000)
    return () => window.clearTimeout(t)
  }, [said])

  if (asked.length === 0) return null
  const onAll = (accepted: boolean) => {
    saveConsent(() => accepted)
    setSaid(texts.saved)
  }
  const onSave = (accepted: (tool: ConsentTool) => boolean) => {
    saveConsent(accepted)
    setSaid(texts.saved)
  }
  // Closing without a choice (the round button, Esc) is a refusal of every tool (APPROVAL §2e).
  const onClose = () => onAll(false)
  return (
    <>
      <p className="sr-only" role="status" aria-live="polite" data-consent-status="">
        {said}
      </p>
      {shown && (
        <ConsentDialog
          key={s.request}
          ref={dialog}
          asked={asked}
          current={choicesFor(s.saved, asked)}
          texts={texts}
          policyTo={policyTo}
          startExpanded={s.open && s.request > 0}
          side={side}
          dataSection={dataSection}
          className={className}
          onAll={onAll}
          onSave={onSave}
          onClose={onClose}
        />
      )}
    </>
  )
}
