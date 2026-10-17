// Launch-mode decisions (APPROVAL §2c): does a missing fact keep its marker, and does the unit that rests on it
// (a row, a sentence, a card, a FAQ entry, a section) still make sense? No JSX here: <FactScope> is in FactScope.tsx.
//
// The rule, in one place:
//   review mode  every missing fact shows its marker, every unit renders;
//   launch mode  a missing required fact (isRequired(key), '@/lib/facts') keeps its marker;
//                a missing optional fact renders nothing, and the unit that rests on it is not rendered at all.
// « Missing » is the copy docs' reading (.team/copy/README.md §10): !present(fact), so null, undefined, '', []
// and also false (an unknown yes/no fact and a « no » both leave their unit out), plus a group of facts with
// nothing in it. The copy docs' launch lines map one to one: « launch a / b: omit … » is inScope(['a', 'b']) (the
// unit needs all of them) and « launch a + b: omit … » is anyInScope(['a', 'b']) (one of them is enough).
import { FACTS, isRequired, present } from '@/lib/facts'
import { LAUNCH } from './mode'

/**
 * Facts whose value the caller already holds, keyed by their facts key: `{ 'plans.p12.price': price }`,
 * `{ [row.fact]: row.value }`. Use it for a value that is computed, formatted or comes from page data.
 */
export type FactValues = Readonly<Record<string, unknown>>

/**
 * What a unit rests on: a facts key (its value is read from FACTS along the dotted path: 'support.hours',
 * 'devices.supported.tv'), a `{ key: value }` map, or a list mixing both.
 */
export type FactDeps = string | FactValues | readonly (string | FactValues)[]

const isPlain = (value: object) => {
  const proto: unknown = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/**
 * There is something to show: present() of '@/lib/facts' (null, undefined, false, '' and [] are missing), and a
 * group of facts (a plain object) is missing while every fact in it is: 'consumer.mediator' until one of its
 * three fields is given.
 */
function given(value: unknown, depth = 0): boolean {
  if (value == null || !present(value)) return false
  if (typeof value === 'number') return !Number.isNaN(value)
  if (typeof value === 'object' && !Array.isArray(value) && isPlain(value) && depth < 6) {
    return Object.values(value).some((leaf: unknown) => given(leaf, depth + 1))
  }
  return true
}

const warned = new Set<string>()

/** The value FACTS holds under a dotted key; undefined when the path stops on a missing fact. */
function lookup(key: string): unknown {
  let node: unknown = FACTS
  const parts = key.split('.')
  for (let i = 0; i < parts.length; i++) {
    if (node == null || typeof node !== 'object' || !Object.hasOwn(node, parts[i])) {
      // A first segment FACTS does not have is a typing mistake, not a missing fact: say so on the dev server.
      if (i === 0 && import.meta.env.DEV && !warned.has(key)) {
        warned.add(key)
        console.warn(`[brand kit] « ${key} » is not a facts key (FACTS has no « ${parts[0]} »); it counts as missing.`)
      }
      return undefined
    }
    node = (node as Record<string, unknown>)[parts[i]]
  }
  return node
}

/** Each dependency as a [key, value] pair. */
function pairs(deps: FactDeps): [string, unknown][] {
  if (typeof deps === 'string') return [[deps, lookup(deps)]]
  if (Array.isArray(deps)) return (deps as readonly (string | FactValues)[]).flatMap((dep) => pairs(dep))
  return Object.entries(deps as FactValues)
}

/**
 * A missing fact with this key shows its « À compléter » marker in the current mode: always in review mode; in
 * launch mode only when the fact is required. <Pending> and pendingText() follow it. Without a key the answer is
 * yes in both modes: a marker that names no fact is never hidden, so a forgotten key is seen, not lost.
 */
export function markerShown(fact?: string | null): boolean {
  return !LAUNCH || fact == null || isRequired(fact)
}

/** In launch mode: this fact leaves something on the page, its value or (required) its marker. */
const shows = ([key, value]: [string, unknown]) => given(value) || isRequired(key)

/**
 * The unit that needs ALL these facts renders in the current mode. Review mode: always. Launch mode: only when
 * every fact is either given or required (a required one keeps its marker, so the unit still reads as unfinished
 * rather than vanishing). One optional fact missing takes the whole unit out. Copy docs: « launch a / b: omit … ».
 *
 *   inScope('support.responseTime')                       // one key, read from FACTS
 *   inScope(['usage.sharing', 'usage.abroad'])            // several: all are needed
 *   inScope({ 'plans.screens.options': options })         // a value the caller holds
 *   inScope(['support.hours', { [row.fact]: row.value }]) // mixed
 */
export function inScope(deps: FactDeps | null | undefined): boolean {
  if (!LAUNCH || deps == null) return true
  return pairs(deps).every(shows)
}

/**
 * The unit that needs AT LEAST ONE of these facts renders in the current mode: a section fed by several facts,
 * a group of rows, a card whose lines can each go. Review mode: always. Launch mode: while one of them is given
 * or required; it goes when all are missing. Copy docs: « launch a + b: omit … ». An empty list is in scope.
 *
 *   anyInScope(['vod.count', 'vod.updates', 'vod.genres', 'vod.languages'])   // the section stays while one is given
 */
export function anyInScope(deps: FactDeps | null | undefined): boolean {
  if (!LAUNCH || deps == null) return true
  const list = pairs(deps)
  return list.length === 0 || list.some(shows)
}

/**
 * A yes/no fact that switches a page, a section or a link on: 'reseller.offered', 'community.channel'. Yes (true,
 * or the thing itself: an app, a channel) is on; no (false) is off, in both modes. Unknown: on in review mode
 * (the unit shows with its markers), off in launch mode, where an unknown yes/no fact counts as « no »
 * (APPROVAL §2c.4). Use the same call for the unit and for every link to it. A unit that already stays hidden in
 * review mode until the owner says yes (trial, own app, reviews) keeps its present() test: same in both modes.
 */
export function switchedOn(deps: FactDeps): boolean {
  return pairs(deps).every(([, value]) => (value === false ? false : given(value) || !LAUNCH))
}

/**
 * Kit slots: a slot holding `value` (null = not given yet) under the facts key `fact` renders something in the
 * current mode, either the value or its marker. False only in launch mode, for a missing optional fact: the
 * slot and its label then vanish.
 */
export function slotShown(value: unknown, fact?: string | null): boolean {
  return value != null || markerShown(fact)
}

/** What scoped() reads on an item: the facts it needs all of (`facts`), and those one of which is enough (`anyOf`). */
export type Scoped = { readonly facts?: FactDeps | null; readonly anyOf?: FactDeps | null }

/**
 * Filters rows, cards, FAQ entries or sections before they are mapped, so a list or a grid keeps no hole.
 * Review mode returns every item. Launch mode keeps an item when its facts are in scope:
 *
 *   scoped(FAQ)                                        // items carry `facts` (all needed) and/or `anyOf` (one is enough); items with neither stay
 *   scoped(rows, (row) => ({ [row.fact]: row.value })) // a selector returning what the item needs (all of it)
 *   scoped(cards, (card) => anyInScope(card.lines))    // or returning the decision itself
 *
 * A selector that returns null or undefined says the item rests on no fact.
 */
export function scoped<T extends Scoped>(items: readonly T[]): T[]
export function scoped<T>(items: readonly T[], factsOf: (item: T, index: number) => FactDeps | boolean | null | undefined): T[]
export function scoped<T>(items: readonly T[], factsOf?: (item: T, index: number) => FactDeps | boolean | null | undefined): T[] {
  if (!LAUNCH) return [...items]
  if (!factsOf) return items.filter((item) => inScope((item as Scoped).facts) && anyInScope((item as Scoped).anyOf))
  return items.filter((item, index) => {
    const needs = factsOf(item, index)
    return typeof needs === 'boolean' ? needs : inScope(needs)
  })
}
