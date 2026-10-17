import type { Zone } from '@/components/brand'
import { FACTS, featuredPlan, planPath, renewalPath, type PlanId } from '@/lib/facts'

// Routes and shared shapes of the home sections. Plan routes come from the plan list in src/lib/facts.ts.

export type IconText = { icon: string; label: string }

/**
 * The fill of an icon tile on a card of the zone's card fill. On the white band (zone plate) cards are paper, on
 * which the kit's nuit-100 tile all but vanishes (#DEEBF7 on #E6F0F4, about 1.02:1): there the tile is white, the
 * same small step that a nuit-100 tile makes on a white card. On paper and band grounds cards are white and the tile
 * keeps the kit's tint. `tileOnCard` is for an <IconTile>; `featureTileOnCard` reaches the tile a <FeatureCard> draws.
 */
export const tileOnCard = (zone: Zone) => (zone === 'plate' ? 'bg-plate' : undefined)
export const featureTileOnCard = (zone: Zone) => (zone === 'plate' ? '[&>span:first-child]:bg-plate' : undefined)

/** Product page of every plan (« /abonnements/12-mois/ »), by plan id. */
const PLAN_ROUTES = Object.fromEntries(FACTS.plans.list.map((p) => [p.id, planPath(p)])) as Record<PlanId, string>

/** In-page anchors of the home page (the hero buttons and the product pages' links land on them). */
export const ANCHORS = {
  /** home-plans: « Choisir ma formule ». */
  plans: 'abonnements',
  /** home-devices: « Vérifier mon appareil ». */
  devices: 'appareils',
  /** The way to the apps: home-app with an app of our own, home-devices otherwise. */
  download: 'telecharger',
  /** home-support-channels. */
  contact: 'contact',
} as const

export const ROUTES = {
  ...PLAN_ROUTES,
  /** The plan that carries « Notre conseil » (plans.featured). */
  featured: planPath(featuredPlan()),
  plans: '/abonnements/',
  renew: renewalPath(),
  apps: '/applications/',
  help: '/aide/',
  refund: '/politique-de-remboursement/',
}
