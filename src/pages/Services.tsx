import { ButtonA, Kw } from '@/components/brand'
import { packShown } from './services/pack'
import { ResellerFaq } from './services/Faq'
import { ResellerModel } from './services/Model'
import { ResellerPacks } from './services/Packs'
import { ResellerRules } from './services/Rules'
import { ResellerTools } from './services/Tools'
import { ResellerContactBand } from './theme/bands'
import { ResellerHero } from './theme/heroes'

// /revendeur/ — Programme revendeur (copy revendeur.md, INVENTORY §4.6). Kept by default (APPROVAL §2.8); every
// reseller term is pending until the owner confirms the programme. Hero, how it works, the entry pack (the
// page's one filled button), the reseller space, the rules, the FAQ and the contact block.
// On the published site the page is served only once the owner says yes (RESELLER_ON, src/App.tsx), and a section
// whose terms are not given yet is left out: with the « yes » alone the page keeps the hero, the three steps and
// the contact block, and the hero button then leads to the contact form.
export default function Services() {
  const pack = packShown()
  return (
    <div className="overflow-x-clip bg-paper">
      <ResellerHero>
        <div className="mt-8">
          <ButtonA href={pack ? '#packs' : '#contact-revendeur'} variant="secondary" size="lg" iconEnd="arrow" className="max-sm:w-full">
            {pack ? 'Voir le pack de départ' : 'Présenter mon projet'}
          </ButtonA>
        </div>
      </ResellerHero>
      <ResellerModel />
      <ResellerPacks />
      <ResellerTools />
      <ResellerRules />
      <ResellerFaq />
      <ResellerContactBand
        heading={
          <>
            Un projet de revente&nbsp;? <Kw>Parlons-en</Kw>.
          </>
        }
      />
    </div>
  )
}
