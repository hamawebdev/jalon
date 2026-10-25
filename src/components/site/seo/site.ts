// The canonical origin of the site and the social image. Owner: seo.
import { FACTS } from '@/lib/facts'

/** https://atlasprotvofficial.com, or null while the domain is not set. */
export const SITE_ORIGIN: string | null = FACTS.brand.domain ? `https://${FACTS.brand.domain}` : null

/** Social preview image (public/og.png), 1200 × 630. */
export const OG_IMAGE = { path: '/og.png', width: 1200, height: 630, type: 'image/png' } as const

/** Logo for structured data (a square icon of public/). */
export const LOGO_PATH = '/icon-512.png'

/** Absolute URL of a router path on the canonical domain, or null without a domain. */
export function absoluteUrl(path: string): string | null {
  return SITE_ORIGIN ? SITE_ORIGIN + path : null
}
