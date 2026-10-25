// Politique de confidentialité. Owner: pages.
// Describes the site as it is built: no account, no form, no payment, no cookie on the site; orders and support on
// WhatsApp; payment by PayPal or SEPA transfer arranged in the conversation. Retention periods are client facts not
// given yet (« À compléter » rows).
import { PageMeta } from '@/components/site/PageMeta'
import { useLang, useT } from '@/i18n/context'
import { pathFor } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { Callout, InfoRows, LegalPage, List, P, TextLink, type LegalSection } from './LegalLayout'
import { useContactRows, type InfoRow } from './rows'

export default function Confidentialite() {
  const { legal } = useT()
  const lang = useLang()
  const t = legal.privacy
  const pending = legal.common.pending
  const { brand, legal: facts } = FACTS
  const domain = brand.domain ?? ''
  const contactRows = useContactRows()

  const controllerRows: InfoRow[] = [
    { label: legal.mentions.publisher.rows.companyName, value: facts.companyName, what: pending.companyName },
    { label: legal.mentions.publisher.rows.address, value: facts.address, what: pending.address },
    ...contactRows,
  ]
  const retentionRows: InfoRow[] = Object.values(t.retention.rows).map((r) => ({ label: r.label, value: null, what: r.what }))

  const sections: LegalSection[] = [
    {
      id: 'en-bref',
      title: t.summary.title,
      content: (
        <Callout>
          <List items={t.summary.items} />
        </Callout>
      ),
    },
    {
      id: 'responsable',
      title: t.controller.title,
      content: (
        <>
          <P>
            {t.controller.before(brand.seller)}
            <TextLink to={pathFor('mentions', lang)}>{t.controller.link}</TextLink>
            {t.controller.after}
          </P>
          <InfoRows rows={controllerRows} />
        </>
      ),
    },
    { id: 'non-collecte', title: t.notCollected.title, content: <List items={t.notCollected.items} /> },
    { id: 'consultation', title: t.browsing.title, content: t.browsing.paragraphs.map((p) => <P key={p}>{p}</P>) },
    {
      id: 'whatsapp',
      title: t.whatsapp.title,
      content: (
        <>
          {t.whatsapp.intro.map((p) => (
            <P key={p}>{p}</P>
          ))}
          <List items={t.whatsapp.items} />
          {t.whatsapp.outro.map((p) => (
            <P key={p}>{p}</P>
          ))}
        </>
      ),
    },
    { id: 'paiement', title: t.payment.title, content: t.payment.paragraphs.map((p) => <P key={p}>{p}</P>) },
    {
      id: 'destinataires',
      title: t.recipients.title,
      content: (
        <>
          <P>{t.recipients.team(brand.seller)}</P>
          <P>{t.recipients.transfers}</P>
        </>
      ),
    },
    {
      id: 'conservation',
      title: t.retention.title,
      content: (
        <>
          <P>{t.retention.intro}</P>
          <InfoRows rows={retentionRows} />
        </>
      ),
    },
    {
      id: 'vos-droits',
      title: t.rights.title,
      content: (
        <>
          {t.rights.paragraphs.map((p) => (
            <P key={p}>{p}</P>
          ))}
          <InfoRows rows={contactRows} />
        </>
      ),
    },
    { id: 'cookies', title: t.cookies.title, content: t.cookies.paragraphs.map((p) => <P key={p}>{p}</P>) },
    { id: 'modifications', title: t.changes.title, content: t.changes.paragraphs.map((p) => <P key={p}>{p}</P>) },
  ]

  return (
    <>
      <PageMeta page="confidentialite" />
      <LegalPage page="confidentialite" title={t.title} lead={t.lead(brand.seller, domain)} sections={sections} />
    </>
  )
}
