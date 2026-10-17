import { anyInScope, inScope } from '@/components/brand'
import { FACTS, present } from '@/lib/facts'

// Which home bands render. A band that rests on owner facts answers here, so the page (Home.tsx, which gives each
// rendered band its ground) and the band itself (which returns null) read one rule. Review mode shows a band with
// its markers unless the approval hides it until its fact exists (APPROVAL §2.4); launch mode also drops a band
// whose optional facts are all missing (APPROVAL §2c, copy home.md « launch …: omit section »).

/** home-proof: at least three of its five figures (INVENTORY §4.1). A cell exists with its figure, in both modes. */
export const homeProofShown = () =>
  [FACTS.proof.rating, FACTS.proof.customers, FACTS.channels.live.count, FACTS.proof.countries, FACTS.support.hours].filter((figure) =>
    present(figure),
  ).length >= 3

/** home-channels, the lead's two sentences: the count, the countries and languages. */
export const CHANNELS_LEAD_FACTS = ['channels.live.count', 'channels.regions']
/** home-channels states four optional facts and stays while one of them shows. */
export const CHANNELS_FACTS = [...CHANNELS_LEAD_FACTS, 'quality.levels', 'content.categories']
export const homeChannelsShown = () => anyInScope(CHANNELS_FACTS)

/** home-sport needs the disciplines the owner lists. */
export const homeSportShown = () => inScope('sport.disciplines')

/** home-vod, the lead's two sentences: the count, then the pointer to the ledger (it needs the genres). */
export const VOD_LEAD_FACTS = ['vod.count', 'vod.genres']
/** home-vod states four optional facts and stays while one of them shows. */
export const VOD_FACTS = ['vod.count', 'vod.updates', 'vod.genres', 'vod.languages']
export const homeVodShown = () => anyInScope(VOD_FACTS)

/** home-app: only with an app of the owner's own, in both modes. */
export const homeAppShown = () => present(FACTS.apps.own)

/** home-video: only with the owner's demo video, in both modes. */
export const homeVideoShown = () => FACTS.media.demoVideo != null

/** home-reviews: only with real reviews, in both modes. */
export const homeReviewsShown = () => (FACTS.proof.reviews?.items.length ?? 0) > 0

/**
 * home-trial: only when the owner offers a trial, in both modes. Launch mode also asks for trial.terms.mode:
 * without it the band would have no button of its own (copy README §10.4, rule 5).
 */
export const homeTrialShown = () => present(FACTS.trial.offered) && inScope('trial.terms.mode')
