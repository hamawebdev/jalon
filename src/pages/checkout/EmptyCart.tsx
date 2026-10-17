import { ButtonLink, ChannelMosaic, DeviceFrame, TextLink } from '@/components/brand'
import { renewalPath } from '@/lib/facts'

// checkout-empty: a dark screen with nothing selected (nothing in the cart yet), the message, the way to the
// plans (ink button: no yellow under /commande/) and the renewal link for returning customers.
export function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-[560px] flex-col items-center text-center">
      <div aria-hidden="true">
        <DeviceFrame className="w-[min(100%,240px)] md:w-[280px]">
          <ChannelMosaic selected={0} osd={false} className="opacity-45" />
        </DeviceFrame>
      </div>
      <h1 className="mt-12 font-display text-display-md text-ink">Votre panier est vide.</h1>
      <p className="mt-4 max-w-[44ch] font-sans text-lead text-ink-soft">
        Commencez par choisir une formule&nbsp;: chacune affiche sa durée et son prix total.
      </p>
      <ButtonLink to="/abonnements/" size="lg" iconEnd="arrow" className="mt-8 w-full sm:w-auto">
        Choisir ma formule
      </ButtonLink>
      <p className="mt-5">
        <TextLink to={renewalPath()} standalone className="-my-2.5 font-sans text-[0.9375rem] font-semibold">
          Renouveler mon abonnement
        </TextLink>
      </p>
    </div>
  )
}
