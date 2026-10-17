import {
  ChannelMosaic,
  Chip,
  DeviceFrame,
  FactScope,
  Kw,
  Pending,
  QualityLadder,
  Reveal,
  Section,
  SectionHead,
  inScope,
  type Zone,
} from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { F, NB, categoryIcon, ladderRows, themesUnderArt } from '../../product/facts-text'
import { Fact } from '../../product/shared'
import { CHANNELS_LEAD_FACTS, homeChannelsShown } from '../bands'

const HEAD = {
  eyebrow: 'En direct',
  titleStart: 'Le direct, ',
  titleKeyword: 'd’un thème à l’autre',
  titleEnd: '.',
  themes: 'Thèmes des chaînes',
}

/**
 * home-channels: the heading over a split: a TV showing the channel mosaic (generic pictograms, never a channel name
 * or logo) and, beside it, one column that states the offer: the lead, the quality tiers and the channel themes
 * (each a <Pending> block until the owner gives it). With a long ladder and themes to list (themesUnderArt()), the
 * themes move under the TV from lg (their pictograms are the mosaic's), so the TV does not stand over an empty half
 * of the band; on phones the order stays lead, ladder, themes. Launch mode: a missing fact takes its sentence, its
 * ladder or its chips (with their heading) out, and the band goes when all four are missing (../bands.ts).
 */
export function HomeChannels({ zone = 'paper' }: { zone?: Zone }) {
  if (!homeChannelsShown()) return null
  const rows = ladderRows()
  const themes = FACTS.content.categories
  // Launch mode with the lead as the column's only content: it stands level with the middle of the screen beside
  // it, not as one line at the top of an empty column.
  const leadAlone = !inScope('quality.levels') && !inScope('content.categories')
  const underArt = themesUnderArt()

  const themesBlock = (
    <FactScope facts="content.categories">
      {/* No rule above the themes: the column's 32px gap parts them from the ladder (T28). */}
      <div>
        <h3 className="font-display text-title text-z-fg">{HEAD.themes}</h3>
        {themes && themes.length > 0 ? (
          <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
            {themes.map((t) => (
              <li key={t}>
                <Chip icon={categoryIcon(t)}>{t}</Chip>
              </li>
            ))}
          </ul>
        ) : (
          <Pending variant="block" what="thèmes des chaînes" fact="content.categories" className="mt-4" />
        )}
      </div>
    </FactScope>
  )

  return (
    <Section zone={zone} dataSection="home-channels">
      <SectionHead
        eyebrow={HEAD.eyebrow}
        title={
          <>
            {HEAD.titleStart}
            <Kw>{HEAD.titleKeyword}</Kw>
            {HEAD.titleEnd}
          </>
        }
      />

      {/* Themes under the TV: two rows from lg, the TV's (auto) and the themes' (1fr, which also takes whatever the
          column is taller by), so the themes start right under the TV and the column spans both rows. */}
      <div className={cn('mt-head grid items-start gap-y-12 lg:grid-cols-12 lg:gap-x-grid', underArt && 'lg:grid-rows-[auto_1fr]')}>
        <Reveal className="pb-1.5 lg:col-span-7 lg:pr-10 xl:pr-14">
          <DeviceFrame kind="tv" className="w-full">
            <ChannelMosaic />
          </DeviceFrame>
        </Reveal>

        <Reveal index={1} className={cn('grid gap-y-8 lg:col-span-5', leadAlone && 'lg:self-center', underArt && 'lg:row-span-2')}>
          <FactScope anyOf={CHANNELS_LEAD_FACTS}>
            <p className="max-w-[46ch] font-sans text-lead text-z-soft">
              <FactScope facts="channels.live.count">
                <Fact value={F.liveCount} what="nombre" fact="channels.live.count" figure unit="chaînes" /> à regarder en direct.{' '}
              </FactScope>
              <FactScope facts="channels.regions">
                Pays et langues{NB}: <Fact value={F.regions} what="pays et langues couverts" fact="channels.regions" tail="." />
              </FactScope>
            </p>
          </FactScope>
          {rows ? (
            <QualityLadder as="p" rows={rows} className="md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:gap-x-10" />
          ) : (
            <Pending variant="block" what="qualités d’image" fact="quality.levels" />
          )}

          {!underArt && themesBlock}
        </Reveal>

        {underArt && (
          // Under the TV from lg, on its width; on phones it follows the ladder at the column's 32px gap.
          <Reveal index={2} className="max-lg:-mt-4 lg:col-span-7 lg:pr-10 xl:pr-14">
            {themesBlock}
          </Reveal>
        )}
      </div>
    </Section>
  )
}
