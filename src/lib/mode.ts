// Display mode of missing client facts. The one place that reads VITE_PENDING.
//   review: every missing fact shows its « À compléter » marker (dev server, client preview).
//   launch: a missing fact leaves no trace: its row, sentence, card or section is not shown (production build).
export type PendingMode = 'review' | 'launch'

const asked: string | undefined = import.meta.env.VITE_PENDING

export const PENDING_MODE: PendingMode =
  asked === 'review' || asked === 'launch' ? asked : import.meta.env.PROD ? 'launch' : 'review'

export const LAUNCH = PENDING_MODE === 'launch'
export const REVIEW = !LAUNCH
