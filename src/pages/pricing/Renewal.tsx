import { ButtonLink, IconTile, Section } from '@/components/brand'
import { renewalPath } from '@/lib/facts'
import { BRAND } from '@/lib/site'

// /abonnements/ › plans-renewal: a slim row that sends existing customers to the renewal page. It closes the band of
// the plan grid, on the grid's width and text column; the card radius, so a row this low never turns into a lozenge.
export function PlansRenewal() {
  return (
    <Section zone="band" dataSection="plans-renewal" rhythm="none" container="wide" className="pb-section-sm">
      <div className="flex flex-col gap-4 rounded-card border border-z-line bg-z-card px-card py-5 sm:flex-row sm:items-center sm:gap-5 xl:px-6">
        <IconTile icon="ti-refresh" size={48} />
        <p className="min-w-0 flex-1 font-display text-title text-z-fg">
          Déjà chez {BRAND}&nbsp;? Prolongez votre accès actuel.
        </p>
        {/* Full width on phones, without the arrow: the label then keeps one line from 360px (it needs 289px with
            the arrow, and the card leaves 270 there). From sm the arrow comes back beside the label. */}
        <ButtonLink
          to={renewalPath()}
          variant="secondary"
          size="md"
          iconEnd="arrow"
          className="max-sm:w-full max-sm:[&_.ti-arrow-right]:hidden"
        >
          Renouveler mon abonnement
        </ButtonLink>
      </div>
    </Section>
  )
}
