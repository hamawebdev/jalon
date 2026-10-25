// Mentions légales. Owner: pages.
// The publisher's identity comes from FACTS.legal (null until the client gives it: « À compléter » in review mode,
// row left out in launch mode).
import { PageMeta } from '@/components/site/PageMeta'
import { useLang, useT } from '@/i18n/context'
import { pathFor } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { InfoRows, LegalPage, P, TextLink, type LegalSection } from './LegalLayout'
import { showRows, useContactRows, type InfoRow } from './rows'

export default function Mentions() {
  const { legal } = useT()
  const lang = useLang()
  const t = legal.mentions
  const pending = legal.common.pending
  const { brand, legal: facts } = FACTS
  const domain = brand.domain ?? ''
  const contactRows = useContactRows()

  const publisherRows: InfoRow[] = [
    { label: t.publisher.rows.tradeName, value: brand.seller },
    { label: t.publisher.rows.domain, value: brand.domain },
    { label: t.publisher.rows.activity, value: t.publisher.activity },
    { label: t.publisher.rows.companyName, value: facts.companyName, what: pending.companyName },
    { label: t.publisher.rows.legalForm, value: facts.legalForm, what: pending.legalForm },
    { label: t.publisher.rows.address, value: facts.address, what: pending.address },
    { label: t.publisher.rows.registration, value: facts.registration, what: pending.registration },
  ]
  const directorRows: InfoRow[] = [{ label: t.director.label, value: facts.publisher, what: pending.publisher }]
  const hostRows: InfoRow[] = [{ label: t.host.label, value: facts.host, what: pending.host }]

  const sections: LegalSection[] = [
    {
      id: 'editeur',
      title: t.publisher.title,
      content: (
        <>
          <P>{t.publisher.intro(brand.seller, domain)}</P>
          <InfoRows rows={publisherRows} />
        </>
      ),
    },
    { id: 'directeur-publication', title: t.director.title, show: showRows(directorRows), content: <InfoRows rows={directorRows} /> },
    {
      id: 'contact',
      title: t.contact.title,
      content: (
        <>
          <P>{t.contact.intro}</P>
          <InfoRows rows={contactRows} />
        </>
      ),
    },
    { id: 'hebergement', title: t.host.title, show: showRows(hostRows), content: <InfoRows rows={hostRows} /> },
    { id: 'propriete-intellectuelle', title: t.ip.title, content: t.ip.paragraphs.map((p) => <P key={p}>{p}</P>) },
    { id: 'liens', title: t.links.title, content: t.links.paragraphs.map((p) => <P key={p}>{p}</P>) },
    { id: 'exactitude', title: t.accuracy.title, content: t.accuracy.paragraphs.map((p) => <P key={p}>{p}</P>) },
    {
      id: 'donnees-personnelles',
      title: t.data.title,
      content: (
        <P>
          {t.data.before}
          <TextLink to={pathFor('confidentialite', lang)}>{t.data.link}</TextLink>
          {t.data.after}
        </P>
      ),
    },
  ]

  return (
    <>
      <PageMeta page="mentions" />
      <LegalPage page="mentions" title={t.title} lead={t.lead(domain)} sections={sections} />
    </>
  )
}
