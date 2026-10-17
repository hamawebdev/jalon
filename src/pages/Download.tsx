import { AppsCredentials, AppsDirectory, AppsNotes, AppsPlatformNav } from './download/Apps'
import { AppsGuides } from './download/Guides'
import { AppsHelpBand } from './theme/bands'
import { AppsHero } from './theme/heroes'

// /applications/ — Applications et installation (copy applications.md, INVENTORY §4.7): hero, the device chips,
// the directory per device family, what the customer receives, the setup guides (one canonical set: the home
// page and /aide/ link here), the notes on the owner's own app (only with one) and the help plate.
export default function Download() {
  return (
    <div className="overflow-x-clip bg-paper">
      <AppsHero />
      <AppsPlatformNav />
      <AppsDirectory />
      <AppsCredentials />
      <AppsGuides />
      <AppsNotes />
      <AppsHelpBand />
    </div>
  )
}
