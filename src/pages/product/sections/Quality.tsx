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
  TextA,
  type Zone,
} from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { productQualityShown } from '../bands'
import { NB, categoryIcon, ladderRows, themesUnderArt } from '../facts-text'

const COPY = {
  titleStart: 'Ce que vous regardez, ',
  titleKeyword: 'et en quelle qualité',
  titleEnd: '.',
  ladder: 'Qualités d’image proposées',
  themes: 'Thèmes des chaînes',
}

/**
 * product-quality: the heading over a split: a TV with its mosaic (generic pictograms, no channel names or logos)
 * and, beside it, the quality tiers and the channel themes the owner lists (a <Pending> block each until given).
 * As on the home page (home-channels), a long ladder with themes to list (themesUnderArt()) puts the themes under the
 * TV from lg, so the TV does not stand over an empty half of the band; on phones they still follow the ladder.
 * Launch mode: the band needs the quality levels its heading promises; without the advised speed its note stops
 * at the connection (the FAQ row it pointed to then has no speed to give); the themes go with their label.
 */
export function Quality({ zone = 'paper' }: { zone?: Zone }) {
  if (!productQualityShown()) return null
  const rows = ladderRows()
  const themes = FACTS.content.categories
  const underArt = themesUnderArt()

  const themesBlock = (
    <FactScope facts="content.categories">
      {/* No rule above the themes: the column's 32px gap parts them from the ladder (as on the home page). */}
      <div>
        <h3 className="font-display text-title text-z-fg">{COPY.themes}</h3>
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
    <Section zone={zone} dataSection="product-quality">
      <SectionHead
        title={
          <>
            {COPY.titleStart}
            <Kw>{COPY.titleKeyword}</Kw>
            {COPY.titleEnd}
          </>
        }
      />

      {/* Themes under the TV: two rows from lg, the TV's (auto) and the themes' (1fr, which also takes whatever the
          column is taller by), so the themes start right under the TV and the column spans both rows. */}
      <div className={cn('mt-head grid items-start gap-y-12 lg:grid-cols-12 lg:gap-x-grid', underArt && 'lg:grid-rows-[auto_1fr]')}>
        <Reveal className="pb-1.5 lg:col-span-7 lg:pr-10 xl:pr-14">
          <DeviceFrame kind="tv" className="w-full md:max-w-[640px] lg:max-w-none">
            <ChannelMosaic />
          </DeviceFrame>
        </Reveal>

        <Reveal index={1} className={cn('grid gap-y-8 lg:col-span-5', underArt && 'lg:row-span-2')}>
          <div>
            <h3 className="font-display text-title text-z-fg">{COPY.ladder}</h3>
            {rows ? (
              <QualityLadder as="p" rows={rows} className="mt-4 md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:gap-x-10" />
            ) : (
              <Pending variant="block" what="qualités d’image" fact="quality.levels" className="mt-4" />
            )}
            <p className="mt-5 max-w-[46ch] font-sans text-small text-z-soft">
              <FactScope facts="internet.minSpeed" fallback="La qualité dépend aussi de votre connexion internet.">
                La qualité dépend aussi de votre connexion internet{NB}: le débit conseillé est dans{' '}
                <TextA href="#product-faq">les questions plus bas</TextA>.
              </FactScope>
            </p>
          </div>

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
