import { ButtonA, CheckList, FactScope, Kw, Pending, PlatePanel, Price, Section, SectionHead, anyInScope } from '@/components/brand'
import { PACK_LINE_ID, useChrome, type CartItem } from '@/components/site/chrome-context'
import { FACTS, formatCount, formatEuro, present } from '@/lib/facts'
import { routeHref } from '@/lib/site'
import { handsOff } from '../checkout/handoff'
import { Fact } from '../theme/facts-ui'
import { packShown } from './pack'

/** Cart line name of the entry pack (chrome.md › chrome-cart). */
const PACK_NAME = 'Pack de départ revendeur'

/**
 * The pack is bought through the cart (« Commander mon pack ») only when the order page can take it: the message
 * mode, or a link mode with a hand-off address for the pack (its payment link, its shop page or the shop, the
 * payment page: APPROVAL §2e, copy revendeur.md). Otherwise, and while checkout.mode is unknown, resellers ask for it
 * with the form of the page (« Demander mon pack »); the pack's payment link is optional.
 */
function sellsThroughCart(line: CartItem) {
  return FACTS.checkout.mode === 'message' || handsOff([line])
}

// /revendeur/ › reseller-packs (#packs): the entry pack on a light panel, every slot pending until the owner gives
// it. Its CTA is the page's one filled button: it orders the pack through the cart when the checkout allows it
// (straight to /commande/, like a plan), otherwise it asks for it in the contact form below.
export function ResellerPacks() {
  const { orderPlan } = useChrome()
  const pack = FACTS.reseller.entryPack
  const line: Omit<CartItem, 'qty'> = { id: PACK_LINE_ID, name: PACK_NAME, price: pack.price, priceFact: 'reseller.entryPack.price' }
  const cart = sellsThroughCart({ ...line, qty: 1 })
  if (!packShown()) return null
  return (
    <Section zone="band" id="packs" dataSection="reseller-packs" containerClassName="grid gap-x-grid gap-y-10 lg:grid-cols-12 lg:items-start">
      <SectionHead
        className="lg:col-span-5"
        eyebrow="Pour démarrer"
        title={
          <>
            Votre <Kw>premier pack</Kw>
          </>
        }
      />
      <PlatePanel as="article" size="small" aria-label="Pack de départ revendeur" className="p-7 md:p-9 lg:col-span-7">
        <h3 className="font-display text-title-lg text-z-fg">Pack de départ</h3>
        <FactScope facts="reseller.entryPack.credits">
          <p className="mt-3 font-sans text-copy text-z-soft">
            Crédits inclus&nbsp;:{' '}
            {pack.credits != null ? (
              <span className="money text-z-fg">{formatCount(pack.credits)}</span>
            ) : (
              <Pending what="crédits inclus" fact="reseller.entryPack.credits" />
            )}
          </p>
        </FactScope>
        {/* The price and the tax mention beside it go together. */}
        <FactScope facts="reseller.entryPack.price">
          <Price
            value={formatEuro(pack.price)}
            pending={{ what: 'prix du pack', fact: 'reseller.entryPack.price' }}
            unit={FACTS.pricing.vat}
            size="lg"
            className="mt-5"
          />
          {FACTS.pricing.vat == null && <Pending what="mention TVA" fact="pricing.vat" className="mt-2" />}
        </FactScope>
        {anyInScope(['reseller.entryPack.includes', 'reseller.entryPack.condition']) && <hr className="my-6 border-0 border-t border-hairline" />}
        <FactScope facts="reseller.entryPack.includes">
          {present(pack.includes) ? (
            <CheckList items={pack.includes} />
          ) : (
            <Pending variant="block" what="contenu du pack" fact="reseller.entryPack.includes" />
          )}
        </FactScope>
        {/* The owner's clause under its label, as in the FAQ: « Conditions : réservé aux professionnels. » */}
        <FactScope facts="reseller.entryPack.condition">
          <p className="mt-5 font-sans text-small text-z-soft">
            Conditions&nbsp;: <Fact value={pack.condition} what="conditions du pack" fact="reseller.entryPack.condition" tail="." />
          </p>
        </FactScope>
        <div className="mt-7">
          {cart ? (
            <ButtonA
              href={routeHref('/commande/')}
              rel="nofollow"
              variant="primary"
              size="lg"
              iconEnd="arrow"
              className="max-sm:w-full"
              onClick={(e) => {
                e.preventDefault()
                orderPlan(line)
              }}
            >
              Commander mon pack
            </ButtonA>
          ) : (
            <ButtonA href="#contact-revendeur" variant="primary" size="lg" iconEnd="arrow" className="max-sm:w-full">
              Demander mon pack
            </ButtonA>
          )}
        </div>
      </PlatePanel>
    </Section>
  )
}
