import { useCallback, useId, useState } from 'react'
import { FactScope, Kw, fieldClass } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { HelpFaq, HelpTopics } from './help/Faq'
import { HelpContact, HelpGuidesLink } from './help/Sections'
import { Fact } from './theme/facts-ui'
import { InnerHero, Line } from './theme/heroes'

/** Polite count of the filter (copy aide.md › help-hero). */
function countText(n: number) {
  if (n === 0) return 'Aucune question ne correspond'
  return n === 1 ? '1 question correspond' : `${n} questions correspondent`
}

// /aide/ — Aide et questions fréquentes (copy aide.md, INVENTORY §4.8): the hero with its filter field, the topic
// cards, every answer grouped by topic, the device guides and the three ways to reach the team.
export default function Help() {
  const [query, setQuery] = useState('')
  const [count, setCount] = useState(0)
  const onCount = useCallback((n: number) => setCount(n), [])
  const id = useId()
  const filtering = query.trim().length > 0

  return (
    <div className="overflow-x-clip bg-paper">
      <InnerHero
        dataSection="help-hero"
        eyebrow="Aide"
        title={
          <>
            <Line>
              Trouvez votre <Kw>réponse</Kw>,
            </Line>{' '}
            <Line>ou posez-nous la question.</Line>
          </>
        }
        lead={
          <p>
            Les questions sont rangées par thème, de la commande au dépannage. Si la vôtre n’y est pas, l’équipe vous répond sur
            WhatsApp <Fact value={FACTS.support.hours} what="horaires du support" fact="support.hours" tail="." />
            <FactScope facts="support.responseTime">
              {' '}
              Réponse habituelle&nbsp;: <Fact value={FACTS.support.responseTime} what="délai de réponse" fact="support.responseTime" tail="." />
            </FactScope>
          </p>
        }
      >
        <div role="search" className="mt-8 max-w-[34rem]">
          <label htmlFor={id} className={fieldClass.label}>
            Filtrer les questions
          </label>
          <div className="relative mt-2">
            <i className="ti ti-search pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[20px] text-ink-muted" aria-hidden="true" />
            <input
              id={id}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={'Un mot\u00a0: paiement, code, télé…'}
              autoComplete="off"
              className={`${fieldClass.control} bg-plate pr-12 pl-12 [&::-webkit-search-cancel-button]:appearance-none`}
            />
            {query && (
              <button
                type="button"
                aria-label="Effacer le filtre"
                onClick={() => setQuery('')}
                className="absolute top-1/2 right-1 grid size-11 -translate-y-1/2 place-items-center rounded-full text-[20px] text-ink-soft transition-colors duration-150 ease-calm hover:bg-nuit-100 hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-z-focus"
              >
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="sr-only" aria-live="polite" role="status">
            {filtering ? countText(count) : ''}
          </p>
        </div>
      </InnerHero>
      {!filtering && <HelpTopics />}
      <HelpFaq query={query} onCount={onCount} />
      <HelpGuidesLink />
      <HelpContact />
    </div>
  )
}
