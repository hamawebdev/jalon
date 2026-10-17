// /politique-de-confidentialite/ #cookies once cookies.tools lists a tool. A module of its own, which PrivacyContent
// loads only then: the consent store it reads stays out of the legal pages while no tool is listed (QA HC-08). The
// store is imported from its own kit module, not from the kit's index, for the same reason.
import { useEffect } from 'react'
import { Button } from '@/components/brand'
import { hasConsentTools, openConsentSettings, useConsentRecord } from '@/components/brand/consent-store'
import type { CookieTool } from '@/lib/facts'
import { P, Table } from './shared'

/**
 * #cookies once cookies.tools lists a tool (copy confidentialite.md › privacy-cookies, APPROVAL §2e): every entry as
 * typed, its « Votre choix » read from the consent store (brand kit), so it changes as soon as the visitor saves a
 * choice. While a tool needs consent (the banner exists): the choice record itself as the last row, how long it is
 * kept, and « Gérer mes cookies », which opens the banner on its switches (focus comes back here when it closes).
 */
export default function CookieTools({ tools }: { tools: readonly CookieTool[] }) {
  const record = useConsentRecord()
  const asked = hasConsentTools(tools)
  // The visitor came for this section (the banner's « Voir le détail des cookies »): the page scrolled to its heading
  // before this table arrived, maybe not all the way when the page below was short. Once it is here, align it again.
  useEffect(() => {
    if (window.location.hash === '#cookies') document.getElementById('cookies')?.scrollIntoView({ block: 'start' })
  }, [])
  const choice = (tool: CookieTool) => {
    if (tool.consent === false) return 'Indispensable'
    const accepted = record?.choices[tool.name]
    return accepted === true ? 'Accepté' : accepted === false ? 'Refusé' : 'Pas encore choisi'
  }
  const rows = tools.map((tool) => [tool.name, tool.purpose, tool.duration, choice(tool)])
  if (asked) rows.push(['Vos choix de cookies', 'garder vos choix, pour ne pas vous les redemander à chaque page', '13 mois', 'Indispensable'])
  return (
    <>
      <P>Ce site utilise les outils ci-dessous. Ceux qui ne sont pas indispensables ne fonctionnent qu’avec votre accord.</P>
      <Table caption="Outils utilisés" head={['Outil', 'À quoi il sert', 'Durée', 'Votre choix']} rows={rows} />
      {asked && (
        <>
          <P>
            Votre choix est gardé dans votre navigateur pendant 13&nbsp;mois, avec sa date&nbsp;; passé ce délai, nous vous le demandons à nouveau.
            Vous pouvez en changer à tout moment, outil par outil.
          </P>
          <div className="mt-6">
            {/* A button, not a link: it opens the consent banner on its switches, and goes nowhere. */}
            <Button variant="secondary" size="md" onClick={() => openConsentSettings()}>
              Gérer mes cookies
            </Button>
          </div>
        </>
      )}
    </>
  )
}
