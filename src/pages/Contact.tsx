// Contact: WhatsApp first, e-mail and Telegram once the client gives them, then links to the installation guides,
// the FAQ and the reseller page. Owner: chrome.
import type { ReactNode } from 'react'
import { ArrowRight, Clock, Languages, LifeBuoy, Mail, MessageCircleQuestion, Send, Store, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Badge, Card, Container, Fact, Highlight, IconTile, Reveal, WhatsAppButton, WhatsAppIcon } from '@/components/kit'
import { PageMeta } from '@/components/site/PageMeta'
import { useLang, useT } from '@/i18n/context'
import { homeAnchor, pathFor } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { contactMessage } from '@/lib/whatsapp'

function Pill({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white [&_svg]:size-4 [&_svg]:text-whatsapp">
      {icon}
      {children}
    </li>
  )
}

export default function Contact() {
  const t = useT()
  const lang = useLang()
  const c = t.contact
  const { email, telegram } = FACTS.contact

  const help = [
    { key: 'install', icon: <LifeBuoy />, to: homeAnchor('install', lang), ...c.help.install },
    { key: 'faq', icon: <MessageCircleQuestion />, to: homeAnchor('faq', lang), ...c.help.faq },
    { key: 'reseller', icon: <Store />, to: pathFor('revendeur', lang), ...c.help.reseller },
  ]

  return (
    <>
      <PageMeta page="contact" />

      <section className="relative overflow-hidden bg-mist pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <Container className="relative">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <Badge>{c.badge}</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <Highlight text={c.title} />
            </h1>
            <p className="text-base text-slate sm:text-lg">{c.subtitle}</p>
          </div>

          <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[1.45fr_1fr]">
            <Reveal className="h-full">
              <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-glow sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-whatsapp/25 blur-3xl"
                />
                <WhatsAppIcon
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-10 size-56 text-white/[0.05]"
                />
                <div className="relative flex items-center gap-3">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-whatsapp text-white">
                    <WhatsAppIcon className="size-8" />
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-whatsapp">{c.whatsapp.badge}</span>
                    <h2 className="font-display text-2xl font-bold text-white">{c.whatsapp.title}</h2>
                  </div>
                </div>
                {FACTS.whatsapp.display ? (
                  <p className="relative font-display text-3xl font-bold tracking-tight sm:text-[2.6rem]">
                    <a
                      href={`tel:+${FACTS.whatsapp.number}`}
                      className="rounded-lg underline-offset-4 hover:underline"
                    >
                      {FACTS.whatsapp.display}
                    </a>
                  </p>
                ) : null}
                <p className="relative max-w-lg text-[17px] leading-relaxed text-white/80">{c.whatsapp.text}</p>
                <ul className="relative flex flex-wrap gap-2">
                  <Pill icon={<Clock aria-hidden />}>{c.whatsapp.response(FACTS.counts.supportMinutes)}</Pill>
                  <Pill icon={<CalendarCheck aria-hidden />}>{c.whatsapp.days}</Pill>
                  <Pill icon={<Languages aria-hidden />}>{c.whatsapp.french}</Pill>
                </ul>
                <div className="relative mt-auto flex flex-col gap-4 pt-2">
                  <WhatsAppButton message={contactMessage()} size="lg" className="self-start">
                    {c.whatsapp.button}
                  </WhatsAppButton>
                  <p className="max-w-lg text-sm text-white/60">{c.whatsapp.tip}</p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5">
              <Reveal delay={80} className="h-full">
                <Card className="flex h-full flex-col gap-4">
                  <IconTile>
                    <Mail />
                  </IconTile>
                  <h2 className="font-display text-xl font-bold">{c.email.title}</h2>
                  <p className="text-slate">{c.email.text}</p>
                  <div className="mt-auto">
                    <Fact value={email} what={c.email.pending}>
                      {(address) => (
                        <a
                          href={`mailto:${address}`}
                          className="break-all font-semibold text-primary underline-offset-4 hover:underline"
                        >
                          {address}
                        </a>
                      )}
                    </Fact>
                  </div>
                </Card>
              </Reveal>
              <Reveal delay={160} className="h-full">
                <Card className="flex h-full flex-col gap-4">
                  <IconTile>
                    <Send />
                  </IconTile>
                  <h2 className="font-display text-xl font-bold">{c.telegram.title}</h2>
                  <p className="text-slate">{c.telegram.text}</p>
                  <div className="mt-auto">
                    <Fact value={telegram} what={c.telegram.pending}>
                      {(link) => (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline"
                        >
                          {c.telegram.open}
                          <ArrowRight aria-hidden className="size-4" />
                        </a>
                      )}
                    </Fact>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-16 sm:py-24">
        <Container>
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:mb-10 sm:text-3xl">{c.help.title}</h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {help.map((item, i) => (
              <li key={item.key}>
                <Reveal delay={i * 80} className="h-full">
                  <Card as={Link} to={item.to} className="group flex h-full flex-col gap-4">
                    <IconTile>{item.icon}</IconTile>
                    <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                      {item.title}
                      <ArrowRight
                        aria-hidden
                        className="size-4 text-primary transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </h3>
                    <p className="text-slate">{item.text}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
