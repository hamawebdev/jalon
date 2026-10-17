import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { FACTS, mailtoHref } from '@/lib/facts'
import { BRAND, FOOTER_NAV, LEGAL_NAV, SITE_DOMAIN, WHATSAPP_CHAT_HREF, WHATSAPP_LINK_PROPS, type NavItem } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Button, PaymentRow, Pending, Section, Wordmark } from '@/components/brand'

/**
 * A footer link: 16px on-nuit in a 44px box at every width; hover underlines it, pressed dims it. 6px of padding on
 * each side, taken back by the margins, so the words stay on the column while a short label (« Aide », 33px) is still
 * 44px wide, and the focus ring keeps its air on both sides.
 */
const footerLink =
  '-mx-1.5 inline-flex min-h-11 min-w-11 items-center rounded-tag px-1.5 font-sans text-small font-medium text-on-nuit underline-offset-4 decoration-1 ' +
  'transition-colors duration-150 ease-calm hover:underline active:text-on-nuit-muted'

/** The WhatsApp number and the e-mail address once given: underlined values in a 44px box. */
const contactLink =
  'inline-flex min-h-11 items-center rounded-tag font-medium text-on-nuit underline decoration-1 underline-offset-4 transition-colors duration-150 ease-calm hover:decoration-2 active:text-on-nuit-muted'

/**
 * A footer column: its label (14px, sentence case, on-nuit-muted, so the links are the brighter line), then its
 * content. No rule above it: on Nuit the yellow is the wordmark's square, never a decoration.
 */
function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h2 className="font-sans text-micro font-semibold text-on-nuit-muted">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function LinkList({ items }: { items: NavItem[] }) {
  return (
    <ul className="grid">
      {items.map((item) => (
        <li key={item.to}>
          <Link to={item.to} className={footerLink}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Copyright year, read once when the site loads (not during render). */
const YEAR = new Date().getFullYear()

function toTop() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

/** « Résilier mon abonnement », once the owner and the lead have fixed where it leads (cancellation.path). */
function cancellationItem(): NavItem[] {
  const path = FACTS.cancellation.path
  return path && path.startsWith('/') ? [{ label: 'Résilier mon abonnement', to: path }] : []
}

// Footer (chrome-footer) on Nuit: the lockup and the brand line, three columns (Parcourir, Informations
// légales, Nous joindre), the payment methods, social links when the owner has accounts, the copyright line.
export function SiteFooter() {
  const { whatsapp, email, hours } = FACTS.support
  const methods = FACTS.payment.methods?.map((m) => m.name) ?? null
  const social = FACTS.social.accounts

  return (
    <Section as="footer" zone="nuit" id="Footer" dataSection="chrome-footer" rhythm="none" container="wide" className="scroll-mt-0 pt-12 pb-8 md:pt-16 md:pb-10">
      <div className="grid gap-x-grid gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" aria-label={`${BRAND}, accueil`} className="inline-flex rounded-control">
            <span aria-hidden="true">
              <Wordmark tone="nuit" size="footer" descriptor />
            </span>
          </Link>
          <p className="mt-6 max-w-[32ch] font-sans text-small text-on-nuit-muted">
            La bonne formule, la bonne application, le bon réglage&nbsp;: on vous guide.
          </p>
        </div>

        <div className="grid gap-x-grid gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          <Column title="Parcourir">
            <LinkList items={FOOTER_NAV} />
          </Column>
          <Column title="Informations légales">
            <LinkList items={[...LEGAL_NAV, ...cancellationItem()]} />
          </Column>
          <Column title="Nous joindre">
            <dl className="grid gap-3 font-sans text-small text-on-nuit-muted">
              <div>
                <dt>WhatsApp&nbsp;:</dt>
                <dd className="m-0">
                  {whatsapp && WHATSAPP_CHAT_HREF ? (
                    <a
                      href={WHATSAPP_CHAT_HREF}
                      {...WHATSAPP_LINK_PROPS}
                      aria-label={`WhatsApp\u00a0: ${whatsapp} (nouvel onglet)`}
                      className={contactLink}
                    >
                      {whatsapp}
                    </a>
                  ) : (
                    <Pending what="numéro WhatsApp" fact="support.whatsapp" />
                  )}
                </dd>
              </div>
              <div>
                <dt>E-mail&nbsp;:</dt>
                <dd className="m-0">
                  {email ? (
                    <a
                      href={mailtoHref(email) ?? undefined}
                      className={cn(contactLink, 'break-anywhere')}
                    >
                      {email}
                    </a>
                  ) : (
                    <Pending what="adresse e-mail du support" fact="support.email" />
                  )}
                </dd>
              </div>
            </dl>
            <p className="mt-4 font-sans text-meta text-on-nuit-muted">
              L’équipe vous répond sur WhatsApp&nbsp;:{' '}
              {hours ? (
                `${hours}.`
              ) : (
                <span className="inline-flex max-w-full items-end">
                  <Pending what="horaires du support" fact="support.hours" className="min-w-0" />.
                </span>
              )}
            </p>
          </Column>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-6 border-t border-nuit-line pt-6">
        <PaymentRow label={'Moyens de paiement\u00a0:'} methods={methods} />
        {social && social.length > 0 && (
          <nav aria-label={`Suivre ${BRAND}`}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {social.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${BRAND} sur ${s.network} (nouvel onglet)`}
                    className={footerLink}
                  >
                    {s.network}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        {/* On phones the company and the domain take a line each, so the dot between them never ends up alone on one. */}
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-sans text-micro font-medium text-on-nuit-muted max-sm:flex-col max-sm:items-start">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <span>&copy;&nbsp;{YEAR}</span>
            {FACTS.company.legalName ?? <Pending what="dénomination sociale" fact="company.legalName" />}
          </span>
          <span aria-hidden="true" className="max-sm:hidden">
            ·
          </span>
          {SITE_DOMAIN ?? <Pending what="nom de domaine" fact="site.domain" />}
        </p>
        <Button variant="icon-nuit" aria-label="Revenir en haut de la page" className="shrink-0" onClick={toTop}>
          <i className="ti ti-arrow-up" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  )
}
