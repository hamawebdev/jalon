import { inScope } from '@/components/brand'
import { FACTS, present } from '@/lib/facts'

// Which optional bands of a plan page render. The page (Landing.tsx, which gives each rendered band its ground)
// and the band itself (which returns null) read one rule.

/**
 * product-included, card by card: each is a claim about the service or the app and shows only once its own fact
 * confirms it (present(): a « no » hides it too), in both display modes.
 */
export function comfortsConfirmed() {
  const own = FACTS.apps.own
  const caps = present(own) ? own.capabilities : null
  return {
    guide: present(FACTS.epg.available),
    catchup: present(FACTS.catchup.days),
    profiles: caps?.profiles === true,
    parentalCode: caps?.parentalCode === true,
    languages: present(FACTS.vod.languages),
    resume: caps?.resume === true,
  }
}

/** product-included: at least three confirmed cards (copy produit.md), never a pending one. */
export const productIncludedShown = () => Object.values(comfortsConfirmed()).filter(Boolean).length >= 3

/** product-quality: its heading promises the quality levels, so launch mode needs them (copy produit.md). */
export const productQualityShown = () => inScope('quality.levels')

/** product-reviews: only with real reviews, in both modes. */
export const productReviewsShown = () => (FACTS.proof.reviews?.items.length ?? 0) > 0
