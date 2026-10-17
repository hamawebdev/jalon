// The order form's fields until the owner answers checkout.fields, in a module of their own: the form reads the
// list (fields.ts), and the privacy page prints it (privacy-data) without loading the form's code.
import { CHECKOUT_FIELD_LABEL, formatList } from '@/lib/facts'
import type { FieldId } from './fields'

/** Default until the owner answers checkout.fields: id → required. */
export const DEFAULT_FIELDS: Partial<Record<FieldId, boolean>> = {
  first_name: true,
  last_name: true,
  email: true,
  phone: true,
  country: true,
  device: false,
  device_model: false,
}

/** How running text names a default field; the two device fields are one thing to the reader. */
const DEFAULT_FIELD_NAME: Partial<Record<FieldId, string>> = {
  first_name: CHECKOUT_FIELD_LABEL.firstName,
  last_name: CHECKOUT_FIELD_LABEL.lastName,
  email: CHECKOUT_FIELD_LABEL.email,
  phone: CHECKOUT_FIELD_LABEL.phone,
  country: CHECKOUT_FIELD_LABEL.country,
  device: 'appareil',
  device_model: 'appareil',
}

/**
 * The default fields as running text: « prénom, nom, adresse e-mail, téléphone ou WhatsApp, pays de résidence et
 * appareil ». What the privacy page says is collected is, by construction, what the form collects.
 */
export function defaultFieldsText(): string {
  const names = (Object.keys(DEFAULT_FIELDS) as FieldId[]).map((id) => DEFAULT_FIELD_NAME[id]).filter((n): n is string => !!n)
  return formatList([...new Set(names)]) ?? ''
}
