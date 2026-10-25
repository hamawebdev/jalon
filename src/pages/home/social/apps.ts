// App labels and review values built from FACTS, in the brief's wording (« Atlas Pro ONTV 4.0.2 », « Max v7 »).
import { FACTS, PLANS, type AppId } from '@/lib/facts'

/**
 * « Atlas Pro ONTV 4.0.2 », « Atlas Pro Max v7 », or without the brand (`short`): « ONTV 4.0.2 », « Max v7 », « 9X ».
 * The brief writes the ONTV version bare and the other versions with a « v ».
 */
export function appLabel(id: AppId, short = false): string {
  const app = FACTS.apps[id]
  const name = short ? app.name.replace(/^Atlas Pro\s+/, '') : app.name
  if (!app.version) return name
  return `${name} ${id === 'ontv' ? '' : 'v'}${app.version}`
}

/** The cheapest plan: « Dès 3,33 € / mois » and the yearly price a review quotes. */
export const ENTRY_PLAN = PLANS.reduce((a, b) => ((b.price ?? Infinity) < (a.price ?? Infinity) ? b : a))

/** Absolute path of a file under public/, aware of the deploy base. */
export function publicUrl(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/*$/, '/')}${path.replace(/^\/+/, '')}`
}
