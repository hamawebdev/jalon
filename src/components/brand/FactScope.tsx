import type { ReactNode } from 'react'
import { anyInScope, inScope, type FactDeps } from './scope'

type FactScopeProps = {
  /**
   * The owner facts the unit needs, all of them: a key ('support.responseTime'), several (['usage.sharing',
   * 'usage.abroad']), or `{ key: value }` for a value the page holds ({ 'plans.screens.options': options }).
   * One missing optional fact takes the unit out. Copy docs: « launch a / b: omit … ».
   */
  facts?: FactDeps
  /**
   * Facts of which one is enough (a section fed by several facts, a group of rows): the unit goes only when all
   * are missing. Copy docs: « launch a + b: omit … ». With `facts` too, both conditions must hold.
   */
  anyOf?: FactDeps
  /** Shown in place of the unit when it is out of scope: its fact-free wording (« use: … »), or nothing (default). */
  fallback?: ReactNode
  /** The unit. A function is called only when the unit renders (for JSX that reads into the fact itself). */
  children?: ReactNode | (() => ReactNode)
}

/**
 * Wraps a unit that rests on owner facts (a row, a sentence, a card, a FAQ entry, a whole section) so that, in
 * launch mode, a missing optional fact takes the unit out with it and nothing is left behind: no label, no
 * heading, no empty cell. Review mode always renders the unit, markers and all. A missing required fact never
 * hides anything: its marker stays. Adds no element of its own, so a wrapped <li>, grid cell or table row keeps
 * its place in the layout.
 *
 *   <FactScope facts="support.responseTime"><li>Réponse : <Fact … /></li></FactScope>
 *   <FactScope facts="channels.live.count" fallback={<p>{copy.plain}</p>}>…</FactScope>
 *   <FactScope anyOf={['vod.count', 'vod.updates', 'vod.genres']}><Section>…</Section></FactScope>
 *
 * For arrays (rows, cards, FAQ entries) filter before mapping with scoped(); for any other decision (a link to a
 * section, a heading, a title) use inScope() or anyInScope().
 */
export function FactScope({ facts, anyOf, fallback = null, children }: FactScopeProps) {
  if (!inScope(facts) || !anyInScope(anyOf)) return <>{fallback}</>
  return <>{typeof children === 'function' ? children() : children}</>
}
