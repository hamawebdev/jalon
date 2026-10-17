import type { ReactNode } from 'react'
import { AppMock, Carte, ChannelMosaic, DeviceFrame, Eyebrow, Graduations, Kw, Marker, Section, anyInScope } from '@/components/brand'
import { FACTS, planName } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { cn } from '@/lib/utils'

// Heroes of the inner pages (plans, reseller, applications, help, contact): paper ground, eyebrow, a two-line
// H1 in display-lg with one keyword on the now-line, the lead, and on the right one quiet decorative screen
// held in corner marks. Left-aligned (IDENTITY §5.2).

type HeroProps = {
  /** data-section hook of the hero (inventory id). */
  dataSection: string
  eyebrow: string
  /** The H1 content: <Line> parts and one <Kw>. */
  title: ReactNode
  lead?: ReactNode
  /** Under the lead: a button, a filter field. */
  children?: ReactNode
  /** Decorative object of the right column (aria-hidden). */
  visual?: ReactNode
  /** Visibility and sizing of the visual column. */
  visualClassName?: string
  /** A graduated ruler along the bottom edge of the hero (decorative). */
  graduations?: boolean
}

/** Shared hero: eyebrow, H1, lead, extras, and the decorative right column. Nothing in it waits for a scroll. */
export function InnerHero({ dataSection, eyebrow, title, lead, children, visual, visualClassName, graduations }: HeroProps) {
  return (
    <Section
      zone="paper"
      rhythm="hero"
      dataSection={dataSection}
      containerClassName={cn('grid items-center gap-x-grid gap-y-10 md:gap-y-12 lg:grid-cols-12', visual && 'lg:min-h-[22rem]')}
    >
      <div className={cn('relative min-w-0', visual ? 'lg:col-span-7' : 'lg:col-span-10')}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 font-display text-display-lg text-z-fg">{title}</h1>
        {lead != null && <div className="mt-6 max-w-[56ch] font-sans text-lead text-z-soft">{lead}</div>}
        {children}
      </div>
      {visual && (
        <div aria-hidden="true" className={cn('pointer-events-none relative lg:col-span-5', visualClassName)}>
          {visual}
        </div>
      )}
      {graduations && (
        <Graduations ticks={48} major={6} className="col-span-full mt-2 hidden h-6 w-full max-w-[44rem] md:block" />
      )}
    </Section>
  )
}

/** One line of a two-line H1 (each line balances on its own if it has to wrap). */
export function Line({ children }: { children: ReactNode }) {
  return <span className="block">{children}</span>
}

/**
 * Corner marks around a decorative screen: the viewfinder, never a box. The kit's own marks (frame-corners): 14px
 * arms, 1.5px, in the zone's frame colour (hairline-strong on light, never an ink keyline).
 */
export function CornerMarks({ children, className }: { children: ReactNode; className?: string }) {
  const mark = 'absolute size-3.5 border-(color:--z-frame)'
  return (
    <div className={cn('relative p-5 md:p-6', className)}>
      <span className={cn(mark, 'top-0 left-0 border-t-[1.5px] border-l-[1.5px]')} />
      <span className={cn(mark, 'top-0 right-0 border-t-[1.5px] border-r-[1.5px]')} />
      <span className={cn(mark, 'bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]')} />
      <span className={cn(mark, 'right-0 bottom-0 border-r-[1.5px] border-b-[1.5px]')} />
      {children}
    </div>
  )
}

/** Contact visual: a phone showing an abstract conversation (three bars, no text). */
function ChatPhone() {
  const bar = 'h-9 rounded-card'
  return (
    <DeviceFrame kind="phone" className="mx-auto w-[176px] xl:w-[188px]">
      <div className="flex size-full flex-col px-3 pt-10 pb-3">
        <div className="flex items-center gap-2 border-b border-nuit-line pb-3">
          <span className="size-6 rounded-control bg-nuit-700" />
          <span className="h-1.5 w-16 rounded-full bg-nuit-line" />
          <Marker size={6} className="ml-auto" />
        </div>
        <div className="flex flex-1 flex-col justify-end gap-3 pb-4">
          <span className={cn(bar, 'h-14 w-[74%] self-start rounded-bl-tag bg-nuit-100')} />
          <span className={cn(bar, 'w-[56%] self-end rounded-br-tag bg-plate')} />
          <span className={cn(bar, 'h-20 w-[78%] self-start rounded-bl-tag bg-nuit-100')} />
        </div>
        <div className="flex h-9 items-center gap-2 rounded-control bg-nuit-raised px-3">
          <span className="h-1.5 flex-1 rounded-full bg-nuit-line" />
          {/* The drawing's one yellow is the Marker above: the send control is a Bleu repère disc. */}
          <span className="grid size-5 place-items-center rounded-full bg-nuit-600 text-[12px] text-on-nuit">
            <i className="ti ti-arrow-up" />
          </span>
        </div>
      </div>
    </DeviceFrame>
  )
}

/** Places of a three-card stack, back to front: each card shows the header row of the one behind it. */
const STACK = ['top-0 left-[14%] w-[72%]', 'top-[16%] left-[11%] w-[78%]', 'top-[33%] left-[8%] w-[84%]']

/**
 * Reseller visual: a stack of access cards, one per client, like a wallet. The back cards show their header row,
 * the front one is the featured plan in full (durations from the plan list, printed as pseudo-content). Cards,
 * not a screen: no corner marks.
 */
function CarteStack() {
  const featured = FACTS.plans.list.find((p) => p.id === FACTS.plans.featured)
  const others = FACTS.plans.list.filter((p) => p !== featured)
  const cards = [...others.slice(0, featured ? 2 : 3), ...(featured ? [featured] : [])]
  const place = STACK.slice(STACK.length - cards.length)
  return (
    <div className="relative ml-auto aspect-[14/11] w-full max-w-[500px]">
      {cards.map((p, i) => (
        <Carte key={p.id} size="sm" months={String(p.months)} plan={planName(p.months)} className={cn('absolute', place[i])} />
      ))}
    </div>
  )
}

/** /revendeur/ (reseller-hero): the cards a reseller creates for clients, on the right from lg. */
export function ResellerHero({ children }: { children?: ReactNode }) {
  return (
    <InnerHero
      dataSection="reseller-hero"
      eyebrow="Programme revendeur"
      title={
        <>
          <Line>Devenez revendeur,</Line>{' '}
          <Line>
            <Kw>étape par étape</Kw>.
          </Line>
        </>
      }
      lead={
        <p>
          Le programme fonctionne avec des crédits&nbsp;: vous les achetez, puis vous les utilisez pour créer les abonnements de vos
          clients.
        </p>
      }
      visualClassName="hidden lg:block"
      visual={<CarteStack />}
      graduations
    >
      {children}
    </InnerHero>
  )
}

/** /abonnements/ (plans-hero). */
export function PlansHero() {
  return (
    <InnerHero
      dataSection="plans-hero"
      eyebrow="Abonnement TV"
      title={
        <>
          <Line>Formules et prix,</Line>{' '}
          <Line>
            <Kw>sans détour</Kw>.
          </Line>
        </>
      }
      lead={<p>Quelle que soit la durée, l’équipe {BRAND} vous aide à installer et à régler l’application.</p>}
      visualClassName="hidden lg:block"
      visual={
        <CornerMarks className="ml-auto max-w-[520px]">
          <DeviceFrame kind="tv" className="w-full">
            <ChannelMosaic step />
          </DeviceFrame>
        </CornerMarks>
      }
      graduations
    />
  )
}

/** /applications/ (apps-hero): the generic app mock, no app name or store badge. */
export function AppsHero({ children }: { children?: ReactNode }) {
  return (
    <InnerHero
      dataSection="apps-hero"
      eyebrow="Applications"
      title={
        <>
          <Line>À chaque appareil</Line>{' '}
          <Line>
            son <Kw>application</Kw>.
          </Line>
        </>
      }
      lead={
        // The first wording promises the app's name and where to download it: it waits for one of the two app facts.
        anyInScope(['apps.own', 'apps.thirdParty']) ? (
          <p>
            Choisissez votre appareil&nbsp;: on vous indique l’application à installer, où la télécharger et comment saisir
            vos accès, étape par étape.
          </p>
        ) : (
          <p>
            Choisissez votre appareil&nbsp;: le guide vous montre comment installer l’application et où saisir vos accès, étape
            par étape.
          </p>
        )
      }
      visualClassName="hidden md:block"
      visual={
        <CornerMarks className="max-w-[380px] md:ml-auto lg:max-w-[440px]">
          <AppMock />
        </CornerMarks>
      }
    >
      {children}
    </InnerHero>
  )
}

/** /contact/ (contact-hero): the chat phone on the right from lg. */
export function ContactHero({ lead }: { lead: ReactNode }) {
  return (
    <InnerHero
      dataSection="contact-hero"
      eyebrow="Contact"
      title={
        <>
          <Line>Écrivez-nous,</Line>{' '}
          {/* The keyword never wraps (one stroke): « avec vous » alone keeps the line inside 320px, even with a
              large system font; « on regarde avec vous » as one run stuck out of the h1 there. */}
          <Line>
            on regarde <Kw>avec vous</Kw>.
          </Line>
        </>
      }
      lead={lead}
      visualClassName="hidden lg:block"
      visual={
        <CornerMarks className="ml-auto w-full max-w-[400px]">
          <ChatPhone />
        </CornerMarks>
      }
    />
  )
}
