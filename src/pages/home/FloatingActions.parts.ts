import { NB } from '../product/facts-text'

/**
 * Label of the phone buy bars (home, plan pages, renewal): what the price is for, short enough to stay on one line
 * beside the button at 390px (« 12 mois, prix total »). The bar's button names the plan for screen readers.
 */
export const barLabel = (months: number) => `${months}${NB}mois, prix total`

/**
 * Shared finish of the phone buy bars (home, plan pages, renewal). The parts are named by the kit
 * (data-buybar-part), so these rules never land on the actions when a bar has no price part.
 * - With a price: one row. The price part takes at most 36 % of the bar, split from the actions by a hairline, and
 *   the button keeps a 14px side padding: the longest label (« Choisir cette formule ») stays on one line at 390px
 *   and the bar's own label wraps under the price if it must. A reference price stands before the price on its
 *   baseline (not on a line of its own) while both fit: three lines at most in the bar, where four made it 104px.
 * - While the price is pending (its marker is in the price part): two rows. The marker and the label share the
 *   first row (the marker on one line, never a narrow column of single words; the label goes under it on a 320px
 *   screen), the button takes the whole second row. No split line then: the rows already part them.
 * No ink tick on the top edge any more (no ink rule in « Jalon clair »; the kit rounds the bar's top corners), and no
 * WhatsApp square in these bars: the sticky header already carries one on phones.
 * A bar that waits (the kit marks it `inert` and slides it under the screen's edge) is also not painted: it leaves
 * once its slide is done and is back before it slides in. Otherwise it shows wherever a browser draws beyond the
 * viewport: a full-page capture or a print laid it over the hero card, and a phone's rubber-band scroll can too.
 */
export const barAccentClass = [
  'transition-[transform,visibility] [&[inert]]:invisible',
  '[&>[data-buybar-part=price]]:border-r [&>[data-buybar-part=price]]:border-hairline [&>[data-buybar-part=price]]:pr-4',
  '[&>[data-buybar-part=price]]:max-w-[36%] [&>[data-buybar-part=price]]:shrink',
  '[&>[data-buybar-part=actions]>*:last-child]:px-3.5',
  '[&>[data-buybar-part=price]:not(:has([data-pending]))]:flex [&>[data-buybar-part=price]:not(:has([data-pending]))]:flex-wrap',
  '[&>[data-buybar-part=price]:not(:has([data-pending]))]:items-baseline [&>[data-buybar-part=price]:not(:has([data-pending]))]:gap-x-2',
  '[&>[data-buybar-part=price]:not(:has([data-pending]))>span:last-child]:basis-full',
  '[&:has(>[data-buybar-part=price]_[data-pending])]:flex-wrap',
  '[&>[data-buybar-part=price]:has([data-pending])]:flex [&>[data-buybar-part=price]:has([data-pending])]:basis-full',
  '[&>[data-buybar-part=price]:has([data-pending])]:max-w-none [&>[data-buybar-part=price]:has([data-pending])]:flex-wrap',
  '[&>[data-buybar-part=price]:has([data-pending])]:items-center [&>[data-buybar-part=price]:has([data-pending])]:gap-x-3',
  '[&>[data-buybar-part=price]:has([data-pending])]:gap-y-1 [&>[data-buybar-part=price]:has([data-pending])]:border-r-0',
  '[&>[data-buybar-part=price]:has([data-pending])]:pr-0',
].join(' ')
