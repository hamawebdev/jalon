// The pt dictionary. Each area imports its translation from ./<area>.ts once it exists; until then it borrows the
// French area (the i18n check flags every borrowed area).
import type { Dict } from '../types.ts'
import { chrome } from './chrome.ts'
import { meta } from './meta.ts'
import { story } from './story.ts'
import { pricing } from './pricing.ts'
import { social } from './social.ts'
import { install } from './install.ts'
import { downloads } from './downloads.ts'
import { faq } from './faq.ts'
import { reseller } from './reseller.ts'
import { legal } from './legal.ts'
import { contact } from './contact.ts'

export const dict: Dict = { chrome, meta, story, pricing, social, install, downloads, faq, reseller, legal, contact }
export default dict
