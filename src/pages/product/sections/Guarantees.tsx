import { IconTile, Section, useReveal } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { F, NB } from '../facts-text'
import { REFUND_PLEDGE, type Pledge } from '../pledges'
import { Fact } from '../shared'

const HEADING = 'Nos engagements'

const PLEDGES: Pledge[] = [
  {
    icon: 'ti-calendar-check',
    title: 'Une fin d’abonnement claire',
    text: (
      <>
        À la fin de la durée payée{NB}: <Fact value={F.endOfTerm} what="renouvellement automatique ou non" fact="plans.autoRenew" tail="." />{' '}
        Tout est écrit avant le paiement.
      </>
    ),
  },
  REFUND_PLEDGE,
  {
    icon: 'ti-brand-whatsapp',
    title: 'Une équipe qui répond',
    text: (
      <>
        Sur WhatsApp, <Fact value={FACTS.support.hours} what="horaires du support" fact="support.hours" tail="." /> Une photo de
        l’écran suffit pour commencer.
      </>
    ),
  },
]

/**
 * One commitment, a cell of the sheet. The cell keeps its fill at all times and only its content reveals, so the
 * hairline between cells never shows through while the content fades in (as the home page's « Pourquoi » sheet).
 * Below lg a row: the icon tile beside the title's first line; from lg a column. The tile's track is in rem, as the
 * tile is (40px, 44px from md at the default size), so a large system font never pushes the tile into the text. A
 * cell narrower than 17rem (272px at the default size, where a 320px phone gives 278px: so only with a large font)
 * stacks the tile above the title, so a pending value's longest word keeps room instead of being cut at the
 * sheet's edge.
 * (Class names stay literal: the stylesheet is built from the words found in the source.)
 */
function PledgeCell({ pledge, index }: { pledge: Pledge; index: number }) {
  const { ref, className, style } = useReveal<HTMLDivElement>(index)
  return (
    <li className="@container bg-z-card">
      <div
        ref={ref}
        style={style}
        className={`${className} grid h-full grid-cols-[2.5rem_minmax(0,1fr)] content-start gap-x-4 px-5 py-6 @max-[17rem]:grid-cols-1 md:grid-cols-[2.75rem_minmax(0,1fr)] md:gap-x-5 md:p-card lg:grid-cols-1 lg:px-9 lg:pt-10 lg:pb-11`}
      >
        <IconTile icon={pledge.icon} className="row-span-2 @max-[17rem]:row-span-1 @max-[17rem]:mb-4 lg:row-span-1 lg:mb-6" />
        {/* In a row the title's first line is centred on the tile (40px, 44px from md). */}
        <h3 className="font-display text-title text-z-fg max-md:pt-2 @max-[17rem]:pt-0 md:max-lg:pt-2.5">{pledge.title}</h3>
        <p className="col-start-2 mt-2 max-w-[60ch] font-sans text-small text-z-soft @max-[17rem]:col-start-1 lg:col-start-1 lg:mt-2.5 lg:max-w-[38ch]">
          {pledge.text}
        </p>
      </div>
    </li>
  )
}

/**
 * product-guarantees: three commitments (payment model, refund terms, support) right under the hero, so the answer
 * to « and if it does not work? » sits within a scroll of the price. It closes the hero on the hero's own ground
 * (`continues`: no gap, no new band). T28: one rounded sheet of white cells parted by hairlines, the shape of the
 * home page's « Pourquoi » band, which states the refund commitment in the same words; it replaces the ruled row
 * under an ink line (Inspo: plan pages whose reassurance is one quiet block of equal cells under the offer). The
 * sheet has no visible title: its h2 is for the page outline (the three h3 belong to it, not to the hero).
 */
export function Guarantees() {
  return (
    <Section zone="paper" dataSection="product-guarantees" rhythm="sm" continues container="wide">
      <h2 className="sr-only">{HEADING}</h2>
      <ul className="m-0 grid list-none gap-px overflow-hidden rounded-panel border border-z-line bg-hairline p-0 lg:grid-cols-3">
        {PLEDGES.map((g, i) => (
          <PledgeCell key={g.title} pledge={g} index={i} />
        ))}
      </ul>
    </Section>
  )
}
