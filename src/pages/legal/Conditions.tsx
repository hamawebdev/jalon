// Conditions générales (with the « Satisfait ou Remboursé » guarantee). Owner: pages.
// Plans and prices come from FACTS.plans; counts from FACTS.counts. Every term the brief does not give (refund
// window, VAT mention, withdrawal, mediator, governing law…) is a pending row: « À compléter » in review mode, left
// out in launch mode. Never write a value the client has not given.
import { ShieldCheck } from 'lucide-react'
import { Pending, PillButton } from '@/components/kit'
import { PageMeta } from '@/components/site/PageMeta'
import { useFormat, useLang, useT } from '@/i18n/context'
import { homeAnchor, pathFor } from '@/i18n/routes'
import { FACTS, PLANS } from '@/lib/facts'
import { Callout, InfoRows, LegalPage, List, P, TextLink, type LegalSection } from './LegalLayout'
import { showRows, useContactRows, type InfoRow } from './rows'

export default function Conditions() {
  const { legal } = useT()
  const lang = useLang()
  const { num, price } = useFormat()
  const t = legal.terms
  const pending = legal.common.pending
  const { brand, counts, apps, legal: facts } = FACTS
  const domain = brand.domain ?? ''
  const contactRows = useContactRows()
  // Every plan lasts the same number of months (12 in the brief).
  const months = num(PLANS[0]?.months ?? 0)

  const sellerRows: InfoRow[] = [
    { label: legal.mentions.publisher.rows.companyName, value: facts.companyName, what: pending.companyName },
    { label: legal.mentions.publisher.rows.address, value: facts.address, what: pending.address },
    ...contactRows,
  ]
  const vatRows: InfoRow[] = [{ label: t.plans.vat.label, value: null, what: t.plans.vat.what }]
  const deliveryRows: InfoRow[] = Object.values(t.delivery.rows).map((r) => ({ label: r.label, value: null, what: r.what }))
  const guaranteeRows: InfoRow[] = Object.values(t.guarantee.rows).map((r) => ({ label: r.label, value: null, what: r.what }))
  const withdrawalRows: InfoRow[] = [{ label: t.withdrawal.label, value: null, what: t.withdrawal.what }]
  const disputeRows: InfoRow[] = Object.values(t.disputes.rows).map((r) => ({ label: r.label, value: null, what: r.what }))

  const officialApps = [apps.ontv, apps.max, apps.ibo, apps.x9].map((a) => a.name).join(', ')

  const sections: LegalSection[] = [
    { id: 'objet', title: t.scope.title, content: <P>{t.scope.text(brand.seller, domain)}</P> },
    {
      id: 'vendeur',
      title: t.seller.title,
      content: (
        <>
          <P>
            {t.seller.before(brand.seller)}
            <TextLink to={pathFor('mentions', lang)}>{t.seller.link}</TextLink>
            {t.seller.after}
          </P>
          <InfoRows rows={sellerRows} />
        </>
      ),
    },
    {
      id: 'service',
      title: t.service.title,
      content: (
        <>
          <P>
            {t.service.offer({
              months,
              channels: num(counts.channels),
              films: num(counts.films),
              series: num(counts.series),
              replayDays: num(counts.replayDays),
              replayChannels: num(counts.replayChannels),
            })}
          </P>
          <P>{t.service.codes}</P>
          <P>{t.service.apps(officialApps)}</P>
          <P>{t.service.players(price(counts.playerPricePerYear), num(counts.playerTrialDays))}</P>
          <P>
            {t.service.requirements.before}
            <TextLink to={homeAnchor('install', lang)}>{t.service.requirements.install}</TextLink>
            {t.service.requirements.middle}
            <TextLink to={pathFor('telecharger', lang)}>{t.service.requirements.downloads}</TextLink>
            {t.service.requirements.after}
          </P>
        </>
      ),
    },
    {
      id: 'formules-et-prix',
      title: t.plans.title,
      content: (
        <>
          <P>{t.plans.intro}</P>
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <table className="w-full text-left">
              <thead className="bg-mist text-sm text-slate">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                    {t.plans.columns.plan}
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                    {t.plans.columns.duration}
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold sm:px-5">
                    {t.plans.columns.price}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {PLANS.map((p) => (
                  <tr key={p.id}>
                    <th scope="row" className="px-4 py-3.5 font-semibold text-ink sm:px-5">
                      {t.plans.names[p.id]}
                    </th>
                    <td className="px-4 py-3.5 whitespace-nowrap sm:px-5">{t.plans.months(num(p.months))}</td>
                    <td className="px-4 py-3.5 text-right font-display font-bold whitespace-nowrap text-ink sm:px-5">
                      {p.price != null ? price(p.price) : <Pending what={t.plans.pricePending} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {t.plans.notes.map((n) => (
            <P key={n}>{n}</P>
          ))}
          <InfoRows rows={vatRows} />
        </>
      ),
    },
    {
      id: 'commande',
      title: t.order.title,
      content: (
        <>
          <List ordered items={t.order.steps} />
          <div>
            <PillButton to={pathFor('boutique', lang)} variant="secondary" size="sm">
              {t.order.shop}
            </PillButton>
          </div>
        </>
      ),
    },
    { id: 'paiement', title: t.payment.title, content: t.payment.paragraphs.map((p) => <P key={p}>{p}</P>) },
    {
      id: 'livraison',
      title: t.delivery.title,
      content: (
        <>
          {t.delivery.paragraphs.map((p) => (
            <P key={p}>{p}</P>
          ))}
          <InfoRows rows={deliveryRows} />
        </>
      ),
    },
    {
      id: 'renouvellement',
      title: t.renewal.title,
      content: t.renewal.paragraphs.map((p, i) => <P key={i}>{p(months)}</P>),
    },
    { id: 'assistance', title: t.support.title, content: <P>{t.support.text(num(counts.supportMinutes))}</P> },
    {
      id: 'garantie',
      title: t.guarantee.title,
      content: (
        <>
          <Callout className="flex gap-3">
            <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="flex flex-col gap-2">
              <p className="font-display font-semibold">{t.guarantee.quote}</p>
              <p className="text-ink/85">{t.guarantee.continuity(months)}</p>
            </div>
          </Callout>
          <P>{t.guarantee.how}</P>
          <InfoRows rows={guaranteeRows} />
        </>
      ),
    },
    {
      id: 'retractation',
      title: t.withdrawal.title,
      show: showRows(withdrawalRows),
      content: <InfoRows rows={withdrawalRows} />,
    },
    {
      id: 'litiges',
      title: t.disputes.title,
      content: (
        <>
          <P>{t.disputes.text}</P>
          <InfoRows rows={disputeRows} />
        </>
      ),
    },
    { id: 'modifications', title: t.changes.title, content: <P>{t.changes.text}</P> },
  ]

  return (
    <>
      <PageMeta page="conditions" />
      <LegalPage page="conditions" title={t.title} lead={t.lead(brand.seller)} sections={sections} />
    </>
  )
}
