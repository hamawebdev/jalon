// Télécharger: official app suite (versions box) and the apps & players hub by system. Owner: downloads.
// Brief pp. 9–11 (Suite Applicative, the page's hero and only h1) and pp. 41–44 (hub by system).
import { PageMeta } from '@/components/site/PageMeta'
import { HelpBlock } from './telecharger/HelpBlock'
import { Hub } from './telecharger/Hub'
import { SuiteHero } from './telecharger/SuiteHero'

const HUB_ID = 'telechargements'

export default function Telecharger() {
  return (
    <>
      <PageMeta page="telecharger" />
      <SuiteHero hubId={HUB_ID} />
      <Hub id={HUB_ID} />
      <HelpBlock />
    </>
  )
}
