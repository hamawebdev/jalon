import type { ConsentTexts } from '@/components/brand/Consent'

/**
 * Every word of the consent banner (copy chrome.md › chrome-cookie; the kit's ConsentTexts, APPROVAL §2e). The kit
 * fills `{usages}` with the purposes of the tools it asks about, as cookies.tools writes them, and sets the no-break
 * space before the colon of « À quoi il sert : … » and « Durée : … ». Kept apart from src/lib/site.ts, which every
 * page loads: these words travel with the banner (ConsentMount), only once cookies.tools lists a tool (QA HC-08).
 */
export const CONSENT_TEXTS: ConsentTexts = {
  title: 'Vos choix pour les cookies',
  body: 'Avec votre accord, nous utilisons des cookies pour {usages}.',
  policy: 'Voir le détail des cookies',
  refuseAll: 'Tout refuser',
  acceptAll: 'Tout accepter',
  customize: 'Personnaliser',
  save: 'Enregistrer mes choix',
  close: 'Fermer et tout refuser',
  tools: 'Vos choix, outil par outil',
  purpose: 'À quoi il sert',
  duration: 'Durée',
  saved: 'Vos choix sont enregistrés. Vous pouvez les changer à tout moment depuis la page Confidentialité.',
}
