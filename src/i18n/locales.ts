// The site's languages. French is the default and lives at the root (/); every other language lives under its
// prefix (/en/, /de/, …). Plain TypeScript, no JSX: scripts import it too.

export const LANGS = ['fr', 'en', 'de', 'es', 'pt', 'it', 'fi'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'fr'

export interface LocaleInfo {
  /** Name of the language in that language, as the switcher shows it. */
  name: string
  /** <html lang> and hreflang value. */
  htmlLang: string
  /** Intl locale for numbers and prices. */
  intl: string
  /** og:locale */
  ogLocale: string
  /** URL prefix, '' for the default language. */
  prefix: string
}

export const LOCALES: Record<Lang, LocaleInfo> = {
  fr: { name: 'Français', htmlLang: 'fr', intl: 'fr-FR', ogLocale: 'fr_FR', prefix: '' },
  en: { name: 'English', htmlLang: 'en', intl: 'en-GB', ogLocale: 'en_GB', prefix: '/en' },
  de: { name: 'Deutsch', htmlLang: 'de', intl: 'de-DE', ogLocale: 'de_DE', prefix: '/de' },
  es: { name: 'Español', htmlLang: 'es', intl: 'es-ES', ogLocale: 'es_ES', prefix: '/es' },
  pt: { name: 'Português', htmlLang: 'pt', intl: 'pt-PT', ogLocale: 'pt_PT', prefix: '/pt' },
  it: { name: 'Italiano', htmlLang: 'it', intl: 'it-IT', ogLocale: 'it_IT', prefix: '/it' },
  fi: { name: 'Suomi', htmlLang: 'fi', intl: 'fi-FI', ogLocale: 'fi_FI', prefix: '/fi' },
}

export function isLang(value: string | undefined): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value)
}
