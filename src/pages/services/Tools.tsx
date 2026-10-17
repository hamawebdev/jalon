import { Carte, DeviceFrame, Kw, LogoMark, Marker, Pending, Section, SectionHead, StatusDot, checkIconClass, inScope } from '@/components/brand'
import { FACTS, planName, present } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { CornerMarks } from '../theme/heroes'

/**
 * The reseller space as a drawn tablet screen: a rail, the credit pill and the action key, one row per
 * subscription created for a client (its access card, two bars, a status square) and a credits meter at the foot.
 * Pseudo-content only: no word, no figure, aria-hidden (DeviceFrame). One yellow piece of its own, the square in
 * the credit pill: the action key and the meter's fill are drawn in nuit-600 (the cards keep their own square).
 */
function ResellerSpace() {
  const rows = FACTS.plans.list.slice(0, 4)
  return (
    <div className="flex size-full">
      <div className="flex w-[17%] shrink-0 flex-col items-center gap-3 border-r border-nuit-line py-4">
        <LogoMark className="h-5 text-on-nuit" />
        <span className="mt-3 size-6 rounded-tag bg-nuit-700" />
        <span className="size-6 rounded-tag bg-nuit-800" />
        <span className="size-6 rounded-tag bg-nuit-800" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-[30%] rounded-full bg-on-nuit/70" />
          <span className="ml-auto flex h-7 items-center gap-2 rounded-full bg-nuit-800 px-3">
            <Marker size={6} />
            <span className="h-1.5 w-10 rounded-full bg-nuit-line" />
          </span>
          <span className="h-7 w-[18%] rounded-full bg-nuit-600" />
        </div>
        <ul className="grid gap-2">
          {rows.map((p, i) => (
            <li key={p.id} className="flex items-center gap-3 rounded-control bg-nuit-800 p-2 pr-3">
              <Carte size="thumb" months={String(p.months)} plan={planName(p.months)} />
              <span className="grid min-w-0 flex-1 gap-1.5">
                <span className={cn('h-1.5 rounded-full bg-on-nuit/60', i % 2 ? 'w-[46%]' : 'w-[62%]')} />
                <span className={cn('h-1.5 rounded-full bg-nuit-line', i % 2 ? 'w-[30%]' : 'w-[38%]')} />
              </span>
              <StatusDot />
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-3 border-t border-nuit-line pt-3">
          <span className="size-1.5 rounded-full bg-on-nuit/40" />
          <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-nuit-line">
            <span className="absolute inset-y-0 left-0 w-[58%] rounded-full bg-nuit-600" />
          </span>
          <span className="h-1.5 w-[14%] rounded-full bg-on-nuit/40" />
        </div>
      </div>
    </div>
  )
}

// /revendeur/ › reseller-tools: what the reseller space does. Heading and the functions on the left (one row per
// function the owner confirms, up to four, in one white card; a check each, no numerals: they are not steps,
// IDENTITY §5.2; one marker until then),
// the space itself as a drawn tablet on the right from md. The whole section waits for reseller.panel on the
// published site.
export function ResellerTools() {
  const panel = present(FACTS.reseller.panel) ? FACTS.reseller.panel.slice(0, 4) : null
  if (!inScope('reseller.panel')) return null
  return (
    <Section zone="paper" dataSection="reseller-tools" containerClassName="grid items-center gap-x-grid gap-y-12 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-5">
        <SectionHead
          eyebrow="Au quotidien"
          title={
            <>
              Ce que permet votre <Kw>espace revendeur</Kw>.
            </>
          }
        />
        {/* One white card for the list (rows divided by hairlines, a check per function: they are not steps). */}
        <ul className="m-0 mt-head list-none overflow-hidden rounded-card border border-z-line bg-z-card p-0">
          {panel ? (
            panel.map((fn) => (
              <li key={fn} className="flex gap-3 border-t border-z-line px-5 py-4 first:border-t-0 md:px-6">
                <i className={cn(checkIconClass, 'mt-1')} aria-hidden="true" />
                <p className="font-sans text-copy text-z-body">{fn}</p>
              </li>
            ))
          ) : (
            <li className="px-5 py-4 md:px-6">
              <Pending variant="block" what="fonctions de l’espace revendeur" fact="reseller.panel" />
            </li>
          )}
        </ul>
      </div>
      <div aria-hidden="true" className="pointer-events-none hidden min-w-0 md:block lg:col-span-7">
        <CornerMarks className="mx-auto max-w-[620px] lg:mr-0">
          <DeviceFrame kind="tablet" className="w-full">
            <ResellerSpace />
          </DeviceFrame>
        </CornerMarks>
      </div>
    </Section>
  )
}
