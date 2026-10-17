import {
  ChannelMosaic,
  DeviceFrame,
  Eyebrow,
  FactScope,
  IconTile,
  Kw,
  Pending,
  Reveal,
  SPORT_ICONS,
  Section,
  type Zone,
} from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { F, NB, disciplineIcon } from '../../product/facts-text'
import { Fact } from '../../product/shared'
import { homeSportShown } from '../bands'
import { tileOnCard } from '../data'

const SPORT = {
  eyebrow: 'Sport',
  titleStart: 'Le sport, ',
  titleKeyword: 'au moment où il se joue',
  titleEnd: '.',
}

/**
 * home-sport: eyebrow, H2 and lead over the disciplines the owner lists, one tile each, two a row on phones and
 * four from sm (disciplines only: no league, club, competition or broadcaster); on the right a TV on a paper wall
 * above a band console, its screen a sport-pictogram mosaic. Tiles, not ruled cells (T28; 16px corners, concentric
 * with the 12px icon tile 16px inside): a list of five or six then ends on a gap, not on half-drawn rules. Launch mode: the band needs its disciplines, and the quality
 * sentence its levels.
 */
export function HomeSport({ zone = 'plate' }: { zone?: Zone }) {
  if (!homeSportShown()) return null
  const disciplines = FACTS.sport.disciplines
  return (
    <Section
      zone={zone}
      dataSection="home-sport"
      containerClassName="grid items-center gap-y-12 md:gap-y-14 lg:grid-cols-12 lg:gap-x-grid"
    >
      <Reveal className="min-w-0 lg:col-span-7 lg:pr-6 xl:pr-10">
        <Eyebrow>{SPORT.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-display-md text-z-fg">
          {SPORT.titleStart}
          {/* From lg the keyword starts its own line: balanced wrapping would otherwise leave « au » alone after the comma. */}
          <br className="hidden lg:inline" />
          <Kw>{SPORT.titleKeyword}</Kw>
          {SPORT.titleEnd}
        </h2>
        <p className="mt-4 max-w-[46ch] font-sans text-lead text-z-soft">
          Les disciplines ci-dessous se suivent en direct.
          <FactScope facts="quality.levels">
            {' '}
            Qualité d’image{NB}: <Fact value={F.qualities} what="qualités" fact="quality.levels" tail="," /> selon la chaîne.
          </FactScope>
        </p>
        {disciplines && disciplines.length > 0 ? (
          <ul className="m-0 mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4 md:mt-10">
            {disciplines.map((d) => (
              <li key={d} className="flex min-w-0 flex-col items-start gap-3 rounded-inner border border-z-line bg-z-card p-4">
                <IconTile icon={disciplineIcon(d)} size={40} className={tileOnCard(zone)} />
                <span className="max-w-full font-display text-title break-words text-z-fg">{d}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Pending variant="block" what="disciplines couvertes" fact="sport.disciplines" className="mt-8 md:mt-10" />
        )}
      </Reveal>

      <Reveal index={1} className="min-w-0 lg:col-span-5">
        <div aria-hidden="true" className="pointer-events-none relative overflow-hidden rounded-panel border border-z-line bg-z-card">
          <div className="px-6 pt-10 pb-1.5 sm:px-12 sm:pt-14 lg:px-10 xl:px-14">
            <DeviceFrame kind="tv" className="mx-auto w-full max-w-[560px]">
              <ChannelMosaic icons={SPORT_ICONS} selected={9} />
            </DeviceFrame>
          </div>
          <span className="block h-10 border-t border-hairline-deep bg-band sm:h-14" />
        </div>
      </Reveal>
    </Section>
  )
}
