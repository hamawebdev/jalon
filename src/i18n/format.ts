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

/** A percentage in the reader's language: fr « 99,99 % », en « 99.99% », de « 99,99 % », it « 99,99% ». */
export function formatPercent(lang: Lang, value: number): string {
  return new Intl.NumberFormat(LOCALES[lang].intl, { style: 'percent', maximumFractionDigits: 2 }).format(value / 100)
}

/** The colon after a label: French puts a no-break space before it (« Label : »), the other languages do not. */
export function labelColon(lang: Lang): string {
  return lang === 'fr' ? '\u00a0: ' : ': '
}
