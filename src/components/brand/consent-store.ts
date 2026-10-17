// Consent store of the brand kit (APPROVAL §2e, QA LT-04): which tools of `cookies.tools` the visitor agreed to,
// kept with the date of the choice and asked again after 13 months. It lives in localStorage when the browser
// allows it and in memory otherwise: every storage access is in try/catch, so a browser that blocks storage still
// gets a working banner, and the choice then lasts for the visit.
//
// A tool is known by its name, as written in cookies.tools. Each saved choice also keeps a short signature of the
// tool's purpose and duration, so a tool renamed, or one whose purpose or duration changes, is asked about again.
// Fail closed: a tool that cookies.tools does not list (or lists under another name) is never allowed.
import { useMemo, useSyncExternalStore } from 'react'

/** A tool of `cookies.tools` (facts.ts `CookieTool`): `consent: false` = essential, it needs no agreement. */
export type ConsentTool = { name: string; purpose: string; duration: string; consent: boolean }

/** The visitor's saved choice: when it was made (ISO date) and, per tool name, whether it was accepted. */
export type ConsentRecord = { date: string; choices: Readonly<Record<string, boolean>> }

/** localStorage key of the saved choice (clear it to see the banner again). */
export const CONSENT_STORAGE_KEY = 'jalon.consent'
/** A choice is asked again this many months after it was made. */
export const CONSENT_MAX_AGE_MONTHS = 13
/** Format of the saved record. A record in another format is ignored, and the visitor is asked again. */
const FORMAT = 1
const DAY = 24 * 60 * 60 * 1000

type SavedChoice = { ok: boolean; sig: string }
type Saved = { v: typeof FORMAT; date: string; tools: Record<string, SavedChoice> }

type State = {
  /** The saved choice, if one is current (right format, under 13 months old). */
  saved: Saved | null
  /** The tools the mounted banner was given (its `tools` prop). */
  tools: readonly ConsentTool[]
  /** The banner was opened on purpose (openConsentSettings) and stays open until a choice or a close. */
  open: boolean
  /** Bumps on every openConsentSettings() call, so the banner can take the focus and open its switches again. */
  request: number
}

/** The tools that need the visitor's agreement: every tool but an essential one (`consent: false`), as facts' consentTools(). */
export function consentToolsOf(tools: readonly ConsentTool[] | null | undefined): ConsentTool[] {
  return (tools ?? []).filter((t) => t != null && t.consent !== false)
}

/** True when `tools` holds a tool that needs the visitor's agreement: then, and only then, the banner shows. */
export function hasConsentTools(tools: readonly ConsentTool[] | null | undefined): boolean {
  return consentToolsOf(tools).length > 0
}

/** Short signature of what the visitor agreed to: the purpose and the duration (FNV-1a, base 36). */
function signature(tool: ConsentTool) {
  let h = 0x811c9dc5
  const text = `${tool.purpose}\u0000${tool.duration}`
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(36)
}

/** The date `months` calendar months after `at`, on the same day or the last day of a shorter month. */
function addMonths(at: number, months: number) {
  const d = new Date(at)
  const day = d.getDate()
  d.setDate(1)
  d.setMonth(d.getMonth() + months)
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
  d.setDate(Math.min(day, last))
  return d.getTime()
}

/** A choice is current from its date (a day of clock drift allowed) until 13 months after it. */
function isCurrent(date: string, now = Date.now()) {
  const at = Date.parse(date)
  return Number.isFinite(at) && at <= now + DAY && now < addMonths(at, CONSENT_MAX_AGE_MONTHS)
}

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

/** The saved record, or null when there is none, it cannot be read, it is in another format or it is too old. */
function readSaved(): Saved | null {
  const store = storage()
  if (!store) return null
  let raw: string | null
  try {
    raw = store.getItem(CONSENT_STORAGE_KEY)
  } catch {
    return null
  }
  if (!raw) return null
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }
  if (!data || typeof data !== 'object') return null
  const { v, date, tools } = data as Partial<Saved>
  if (v !== FORMAT || typeof date !== 'string' || !isCurrent(date) || !tools || typeof tools !== 'object') return null
  const clean: Record<string, SavedChoice> = {}
  for (const [name, c] of Object.entries(tools)) {
    if (c && typeof c === 'object' && typeof c.ok === 'boolean' && typeof c.sig === 'string') clean[name] = { ok: c.ok, sig: c.sig }
  }
  return { v: FORMAT, date, tools: clean }
}

function writeSaved(saved: Saved) {
  const store = storage()
  if (!store) return
  try {
    store.setItem(CONSENT_STORAGE_KEY, JSON.stringify(saved))
  } catch {
    // Full or blocked storage: the choice stays in memory for this visit.
  }
}

// ── The store ───────────────────────────────────────────────────────────────────────────────────────────────────

let state: State = { saved: null, tools: [], open: false, request: 0 }
let loaded = false
const listeners = new Set<() => void>()

function load() {
  if (loaded) return
  loaded = true
  state = { ...state, saved: readSaved() }
}

function set(next: Partial<State>) {
  state = { ...state, ...next }
  for (const fn of listeners) fn()
}

/** Another tab saved or cleared a choice: follow it, so a tool refused there stops here too. */
function onStorage(e: StorageEvent) {
  if (e.key !== null && e.key !== CONSENT_STORAGE_KEY) return
  set({ saved: readSaved() })
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  if (listeners.size === 1 && typeof window !== 'undefined') window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    if (listeners.size === 0 && typeof window !== 'undefined') window.removeEventListener('storage', onStorage)
  }
}

function snapshot() {
  load()
  return state
}

/** The saved choice for `tool`, if it was made for this purpose and duration. */
function savedChoice(saved: Saved | null, tool: ConsentTool): boolean | undefined {
  const c = saved?.tools[tool.name]
  return c && c.sig === signature(tool) ? c.ok : undefined
}

/** Whether a tool may run: an essential tool always, another one once accepted. A tool not listed: never. */
function allowed(s: State, name: string) {
  const tool = s.tools.find((t) => t != null && t.name === name)
  if (!tool) return false
  return tool.consent === false || savedChoice(s.saved, tool) === true
}

/** True while a tool that needs agreement has no current choice: the banner then asks. */
export function needsChoice(saved: Saved | null, tools: readonly ConsentTool[]) {
  return consentToolsOf(tools).some((t) => savedChoice(saved, t) === undefined)
}

/** The current choice per tool name for `tools` (undefined = not asked yet, or asked about another purpose). */
export function choicesFor(saved: Saved | null, tools: readonly ConsentTool[]) {
  const out: Record<string, boolean | undefined> = {}
  for (const t of consentToolsOf(tools)) out[t.name] = savedChoice(saved, t)
  return out
}

// ── Kit-internal actions (the banner) ───────────────────────────────────────────────────────────────────────────

const sameTools = (a: readonly ConsentTool[], b: readonly ConsentTool[]) =>
  a.length === b.length && a.every((t, i) => t.name === b[i].name && t.consent === b[i].consent && signature(t) === signature(b[i]))

/** The banner hands its `tools` to the store, which the gates read. */
export function registerConsentTools(tools: readonly ConsentTool[]) {
  load()
  const listed = tools.filter((t) => t != null)
  if (!sameTools(state.tools, listed)) set({ tools: listed })
}

/**
 * Saves one choice per tool that needs agreement (true = accepted), dated now, and closes the banner. Every control
 * of the banner ends here: « Tout refuser », « Tout accepter », « Enregistrer mes choix », and closing it (the round
 * button, Esc), which is a refusal of every tool (APPROVAL §2e; its accessible name says so).
 */
export function saveConsent(accepted: (tool: ConsentTool) => boolean) {
  load()
  const tools: Record<string, SavedChoice> = {}
  for (const t of consentToolsOf(state.tools)) tools[t.name] = { ok: accepted(t), sig: signature(t) }
  const saved: Saved = { v: FORMAT, date: new Date().toISOString(), tools }
  writeSaved(saved)
  set({ saved, open: false })
}

// ── Public API ──────────────────────────────────────────────────────────────────────────────────────────────────

/** The whole store (the banner reads it). */
export function useConsentState(): State {
  return useSyncExternalStore(subscribe, snapshot, snapshot)
}

/**
 * Whether the tool named `tool` (its name in cookies.tools) may run now: an essential tool (consent: false) always,
 * any other only once the visitor has accepted it, and for as long as that choice is current. It turns false again
 * when the visitor withdraws, the choice expires or the tool's purpose changes. A name that cookies.tools does not
 * list is always false. Needs <ConsentBanner> mounted with the tools (it is, in the site layout).
 */
export function useConsent(tool: string): boolean {
  const s = useConsentState()
  return allowed(s, tool)
}

/** The visitor's current choice (date and, per tool that needs agreement, accepted or not), or null if none yet. */
export function useConsentRecord(): ConsentRecord | null {
  const { saved, tools } = useConsentState()
  return useMemo(() => {
    if (!saved) return null
    const choices: Record<string, boolean> = {}
    for (const [name, ok] of Object.entries(choicesFor(saved, tools))) if (ok !== undefined) choices[name] = ok
    return Object.keys(choices).length ? { date: saved.date, choices } : null
  }, [saved, tools])
}

/**
 * Opens the consent banner on its switches, from anywhere (« Gérer mes cookies »). Focus moves into it and comes
 * back to the element that had it once the visitor closes it. Returns false, and does nothing, when no tool needs
 * agreement (the banner is then not shown at all).
 */
export function openConsentSettings(): boolean {
  load()
  if (!hasConsentTools(state.tools)) {
    if (import.meta.env.DEV) console.warn('[brand kit] openConsentSettings(): no tool in cookies.tools needs consent, so there is no banner to open.')
    return false
  }
  set({ open: true, request: state.request + 1 })
  return true
}
