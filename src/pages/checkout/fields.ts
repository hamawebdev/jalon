// Fields of /commande/ › checkout-details (copy commande.md): which exist and which are required follows the owner's
// checkout.fields; until then names, e-mail, phone and country are required, the device optional, and there is no
// address and no MAC field. Messages are the copy's own (French, calm, they say how to fix it).
import { CHECKOUT_FIELD_LABEL, DEVICE_FAMILIES, DEVICE_FAMILY_LABEL, FACTS, present, type CheckoutFieldId } from '@/lib/facts'
import { DEFAULT_FIELDS } from './default-fields'

export type FieldId =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'country'
  | 'device'
  | 'device_model'
  | 'mac_address'
  | 'renewal_id'
  | 'address_1'
  | 'address_2'
  | 'postcode'
  | 'city'

export type FieldDef = {
  id: FieldId
  label: string
  required: boolean
  kind: 'text' | 'email' | 'tel' | 'select-country' | 'select-device'
  helper?: string
  autoComplete?: string
  /** first / last sit side by side from md; wide rows take the full width. */
  row: 'first' | 'last' | 'wide'
}

/** checkout.fields id → our field ids. */
const FROM_FACT: Record<CheckoutFieldId, FieldId[]> = {
  firstName: ['first_name'],
  lastName: ['last_name'],
  email: ['email'],
  phone: ['phone'],
  country: ['country'],
  device: ['device'],
  deviceModel: ['device_model'],
  macAddress: ['mac_address'],
  address: ['address_1', 'address_2', 'postcode', 'city'],
}

/** The fields shown, in order, with their required flag. `renewal` adds the current-subscription identifier. */
export function checkoutFields(renewal: boolean): FieldDef[] {
  const owner = FACTS.checkout.fields
  const wanted: Partial<Record<FieldId, boolean>> = {}
  if (present(owner)) {
    for (const f of owner) for (const id of FROM_FACT[f.id]) wanted[id] = id === 'address_2' ? false : f.required
  } else {
    Object.assign(wanted, DEFAULT_FIELDS)
  }
  const devicesKnown = present(FACTS.devices.supported)
  const defs: FieldDef[] = []
  const add = (def: FieldDef) => {
    if (def.id in wanted) defs.push({ ...def, required: !!wanted[def.id] })
  }
  add({ id: 'first_name', label: 'Prénom', kind: 'text', required: true, row: 'first', autoComplete: 'given-name' })
  add({ id: 'last_name', label: 'Nom', kind: 'text', required: true, row: 'last', autoComplete: 'family-name' })
  add({
    id: 'email',
    label: 'Adresse e-mail',
    kind: 'email',
    required: true,
    row: 'wide',
    autoComplete: 'email',
    helper: 'Pour vous écrire au sujet de cette commande.',
  })
  add({
    id: 'phone',
    label: 'Téléphone ou WhatsApp',
    kind: 'tel',
    required: true,
    row: 'first',
    autoComplete: 'tel',
    helper: 'Avec l’indicatif du pays, par exemple +33.',
  })
  add({ id: 'country', label: 'Pays de résidence', kind: 'select-country', required: true, row: 'last', autoComplete: 'country' })
  if (devicesKnown) {
    add({
      id: 'device',
      label: 'Votre appareil principal',
      kind: 'select-device',
      required: false,
      row: 'first',
      helper: 'Pour vous indiquer la bonne application.',
    })
  }
  add({
    id: 'device_model',
    label: devicesKnown ? 'Marque et modèle (facultatif)' : 'Votre appareil : marque et modèle (facultatif)',
    kind: 'text',
    required: false,
    row: devicesKnown ? 'last' : 'wide',
    // The example sits under the field, not inside it: as a placeholder it was cut off on phones (355px of text in a
    // 286px field at 390px) and it vanished at the first keystroke.
    helper: 'Par exemple, la marque de votre télé et son année.',
  })
  add({
    id: 'mac_address',
    label: 'Adresse MAC de votre box (facultatif)',
    kind: 'text',
    required: false,
    row: 'wide',
    helper: 'Seulement pour une box à portail ou un récepteur : elle figure sur une étiquette ou dans ses réglages.',
  })
  if (renewal) {
    defs.push({ id: 'renewal_id', label: 'Identifiant de votre abonnement actuel', kind: 'text', required: true, row: 'wide' })
  }
  add({ id: 'address_1', label: 'Adresse', kind: 'text', required: true, row: 'wide', autoComplete: 'address-line1' })
  add({ id: 'address_2', label: 'Complément d’adresse (facultatif)', kind: 'text', required: false, row: 'wide', autoComplete: 'address-line2' })
  add({ id: 'postcode', label: 'Code postal', kind: 'text', required: true, row: 'first', autoComplete: 'postal-code' })
  add({ id: 'city', label: 'Ville', kind: 'text', required: true, row: 'last', autoComplete: 'address-level2' })
  return defs
}

/** Device select options: the supported families (GLOSSARY §3), then « Autre, ou je ne sais pas ». */
export function deviceOptions(): { value: string; label: string }[] {
  const supported = FACTS.devices.supported
  const families = present(supported) ? DEVICE_FAMILIES.filter((f) => present(supported[f])) : []
  return [...families.map((f) => ({ value: f, label: DEVICE_FAMILY_LABEL[f].name })), { value: 'autre', label: 'Autre, ou je ne sais pas' }]
}

/** ISO 3166-1 alpha-2 codes; the names come from Intl.DisplayNames in French (no hand-kept name list). */
const REGION_CODES =
  'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'

let countryCache: { code: string; name: string }[] | null = null

/** The country this French-language site is written for: it opens the list, so most buyers choose it in one tap. */
const HOME_COUNTRY = 'FR'

/** Every country with its French name: France first, then the others sorted the French way. */
export function countries() {
  if (countryCache) return countryCache
  const names = new Intl.DisplayNames(['fr'], { type: 'region' })
  const all = REGION_CODES.split(' ')
    .map((code) => ({ code, name: names.of(code) ?? code }))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
  countryCache = [...all.filter((c) => c.code === HOME_COUNTRY), ...all.filter((c) => c.code !== HOME_COUNTRY)]
  return countryCache
}

export type Values = Partial<Record<FieldId, string>>

const PHONE_ERROR = 'Ce numéro semble incomplet. Ajoutez l’indicatif du pays, par exemple +33.'

/** The field's error message, or undefined when the value is acceptable. */
export function fieldError(def: FieldDef, values: Values): string | undefined {
  const v = (values[def.id] ?? '').trim()
  switch (def.id) {
    case 'first_name':
      return !v && def.required ? 'Indiquez votre prénom.' : undefined
    case 'last_name':
      return !v && def.required ? 'Indiquez votre nom.' : undefined
    case 'email':
      if (!v) return def.required ? 'Indiquez votre adresse e-mail.' : undefined
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? undefined : 'Cette adresse semble incomplète : vérifiez le @ et ce qui suit.'
    case 'phone': {
      if (!v) return def.required ? 'Indiquez un numéro où l’on peut vous joindre.' : undefined
      const digits = v.replace(/\D/g, '').length
      return /^(\+|00)[\d\s().-]+$/.test(v) && digits >= 8 ? undefined : PHONE_ERROR
    }
    case 'country':
      return !v && def.required ? 'Choisissez votre pays de résidence.' : undefined
    case 'mac_address':
      if (!v) return def.required ? 'Cette adresse semble incomplète : elle compte douze caractères, par exemple AA:BB:CC:11:22:33.' : undefined
      return /^([0-9A-Fa-f]{2}[:-]?){5}[0-9A-Fa-f]{2}$/.test(v)
        ? undefined
        : 'Cette adresse semble incomplète : elle compte douze caractères, par exemple AA:BB:CC:11:22:33.'
    case 'renewal_id':
      return !v ? 'Indiquez votre identifiant actuel : sans lui, nous ne pouvons pas prolonger le bon abonnement.' : undefined
    case 'address_1':
      return !v && def.required ? 'Indiquez votre adresse.' : undefined
    case 'postcode':
      if (!v) return def.required ? 'Indiquez votre code postal.' : undefined
      if (values.country === 'FR') return /^\d{5}$/.test(v.replace(/\s/g, '')) ? undefined : 'Ce code postal semble incomplet.'
      return v.replace(/\s/g, '').length >= 3 ? undefined : 'Ce code postal semble incomplet.'
    case 'city':
      return !v && def.required ? 'Indiquez votre ville.' : undefined
    default:
      return undefined
  }
}

/** Field labels as running text, for the summary of errors (CHECKOUT_FIELD_LABEL where it exists). */
export const FIELD_NAME: Partial<Record<FieldId, string>> = {
  first_name: CHECKOUT_FIELD_LABEL.firstName,
  last_name: CHECKOUT_FIELD_LABEL.lastName,
  email: CHECKOUT_FIELD_LABEL.email,
  phone: CHECKOUT_FIELD_LABEL.phone,
  country: CHECKOUT_FIELD_LABEL.country,
  mac_address: CHECKOUT_FIELD_LABEL.macAddress,
  renewal_id: 'identifiant de votre abonnement actuel',
  address_1: CHECKOUT_FIELD_LABEL.address,
  postcode: 'code postal',
  city: 'ville',
}
