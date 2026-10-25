// The en dictionary. Each area imports its translation from ./<area>.ts once it exists; until then it borrows the
// French area (the i18n check flags every borrowed area).
import type { Dict } from '../types.ts'
import { chrome } from '../fr/chrome.ts'
import { meta } from '../fr/meta.ts'
import { story } from '../fr/story.ts'
import { pricing } from '../fr/pricing.ts'
import { social } from '../fr/social.ts'
import { install } from '../fr/install.ts'
import { downloads } from '../fr/downloads.ts'
import { faq } from '../fr/faq.ts'
import { reseller } from '../fr/reseller.ts'
import { legal } from '../fr/legal.ts'
import { contact } from '../fr/contact.ts'

export const dict: Dict = { chrome, meta, story, pricing, social, install, downloads, faq, reseller, legal, contact }
export default dict
