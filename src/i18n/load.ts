// Loads a language's dictionary. Each language is its own chunk, fetched once.
import type { Dict } from './dict/types.ts'
import type { Lang } from './locales.ts'

const modules = import.meta.glob<{ default: Dict }>('./dict/*/index.ts')
const cache = new Map<Lang, Promise<Dict>>()
const ready = new Map<Lang, Dict>()

export function loadDict(lang: Lang): Promise<Dict> {
  let promise = cache.get(lang)
  if (!promise) {
    const load = modules[`./dict/${lang}/index.ts`]
    if (!load) throw new Error(`No dictionary for ${lang}`)
    promise = load().then((m) => {
      ready.set(lang, m.default)
      return m.default
    })
    cache.set(lang, promise)
  }
  return promise
}

/** The dictionary if it is already loaded (no Suspense needed), else undefined. */
export function loadedDict(lang: Lang): Dict | undefined {
  return ready.get(lang)
}

/** For prerendering: put a dictionary in the cache directly. */
export function provideDict(lang: Lang, dict: Dict): void {
  ready.set(lang, dict)
  cache.set(lang, Promise.resolve(dict))
}
