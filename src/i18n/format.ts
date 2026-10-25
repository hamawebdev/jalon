// Numbers and prices in the reader's language. The values never change between languages; only separators and
// the place of the € sign do (fr « 13 558 », en « 13,558 », de « 13.558 »).
import { LOCALES, type Lang } from './locales.ts'

export function formatNumber(lang: Lang, value: number, fractionDigits?: number): string {
  return new Intl.NumberFormat(LOCALES[lang].intl, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits ?? 2,
  }).format(value)
}

export function formatPrice(lang: Lang, euros: number): string {
  const whole = Number.isInteger(euros)
  return new Intl.NumberFormat(LOCALES[lang].intl, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(euros)
}
