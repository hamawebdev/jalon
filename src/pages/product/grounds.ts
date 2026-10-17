import type { Zone } from '@/components/brand'

/**
 * One ground per band so that no two neighbours share one, whichever bands the owner's facts switch on.
 * `choices[i]` lists the zones band i can stand on, the one it was drawn for first; the result is the assignment
 * that moves the fewest bands off that first choice (a later choice costs its rank). `above` is the ground the
 * first band follows. A band left with no free choice keeps its own ground. Used by the home page and the plan
 * pages, whose optional bands come and go with the facts.
 */
export function alternate(choices: readonly (readonly Zone[])[], above: Zone): Zone[] {
  type Way = { cost: number; zones: Zone[] }
  const cheapest = (ways: Map<Zone, Way>) => [...ways.values()].sort((a, b) => a.cost - b.cost)[0]
  let ways = new Map<Zone, Way>([[above, { cost: 0, zones: [] }]])
  for (const grounds of choices) {
    const next = new Map<Zone, Way>()
    grounds.forEach((zone, rank) => {
      for (const [previous, way] of ways) {
        if (previous === zone) continue
        const cost = way.cost + rank
        const known = next.get(zone)
        if (!known || cost < known.cost) next.set(zone, { cost, zones: [...way.zones, zone] })
      }
    })
    if (next.size === 0) {
      const best = cheapest(ways)
      next.set(grounds[0], { cost: best.cost, zones: [...best.zones, grounds[0]] })
    }
    ways = next
  }
  return cheapest(ways).zones
}
