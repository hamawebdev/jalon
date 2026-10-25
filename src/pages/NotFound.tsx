// 404 page. Owner: chrome.
import { Home, ShoppingBag } from 'lucide-react'
import { Badge, Container, PillButton } from '@/components/kit'
import { PageMeta } from '@/components/site/PageMeta'
import { useLang, useT } from '@/i18n/context'
import { pathFor } from '@/i18n/routes'
import { contactMessage, waLink } from '@/lib/whatsapp'

export default function NotFound() {
  const t = useT()
  const lang = useLang()
  const n = t.chrome.notFound
  return (
    <>
      <PageMeta page="notFound" />
      <section data-section="notfound" className="relative overflow-hidden bg-mist py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <Container className="relative">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <p
              aria-hidden
              className="select-none font-display text-[7rem] font-extrabold leading-none tracking-tighter text-primary/15 sm:text-[10rem]"
            >
              404
            </p>
            <Badge>{n.badge}</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{n.title}</h1>
            <p className="text-base text-slate sm:text-lg">{n.text}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <PillButton to={pathFor('home', lang)} size="lg" icon={<Home aria-hidden />}>
                {n.home}
              </PillButton>
              <PillButton to={pathFor('boutique', lang)} size="lg" variant="secondary" icon={<ShoppingBag aria-hidden />}>
                {n.shop}
              </PillButton>
            </div>
            <p className="pt-4 text-sm text-slate">
              {n.help}{' '}
              <a
                href={waLink(contactMessage())}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {n.helpLink}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
