// Display mode of missing owner facts (APPROVAL §2c). The one place that reads VITE_PENDING: everything else
// imports PENDING_MODE or LAUNCH from here (or from '@/components/brand').

/**
 * review: every missing fact shows its « À compléter » marker.
 * launch: a missing required fact still shows its marker; a missing optional fact leaves no trace.
 */
export type PendingMode = 'review' | 'launch'

const asked: string | undefined = import.meta.env.VITE_PENDING

/**
 * VITE_PENDING when it is 'review' or 'launch'; otherwise 'launch' in a production build (`npm run build`) and
 * 'review' on the dev server (`npm run dev`). Any other value is ignored. Fixed for the life of the page.
 */
export const PENDING_MODE: PendingMode =
  asked === 'review' || asked === 'launch' ? asked : import.meta.env.PROD ? 'launch' : 'review'

/** Shorthand for PENDING_MODE === 'launch'. */
export const LAUNCH: boolean = PENDING_MODE === 'launch'
