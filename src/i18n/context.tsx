// The current language and its dictionary. Every component reads copy with useT() and the language with useLang().
import { createContext, use, useContext, type ReactNode } from 'react'
import type { Dict } from './dict/types.ts'
import { formatNumber, formatPrice } from './format.ts'
import { loadDict, loadedDict } from './load.ts'
import type { Lang } from './locales.ts'

const LangContext = createContext<{ lang: Lang; dict: Dict } | null>(null)

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  // Already loaded (main.tsx loads the first language before rendering): no suspension.
  const dict = loadedDict(lang) ?? use(loadDict(lang))
  return <LangContext value={{ lang, dict }}>{children}</LangContext>
}

function useLangContext() {
  const value = useContext(LangContext)
  if (!value) throw new Error('useT/useLang outside <LangProvider>')
  return value
}

/** The dictionary of the current language: const t = useT(); t.story.hero.title */
export function useT(): Dict {
  return useLangContext().dict
}

export function useLang(): Lang {
  return useLangContext().lang
}

/** Number and price formatters bound to the current language. */
export function useFormat() {
  const lang = useLang()
  return {
    num: (value: number, fractionDigits?: number) => formatNumber(lang, value, fractionDigits),
    price: (euros: number) => formatPrice(lang, euros),
  }
}
