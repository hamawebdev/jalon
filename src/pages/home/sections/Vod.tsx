import {
  CheckList,
  FactScope,
  GenreRow,
  Kw,
  Pending,
  Reveal,
  Section,
  SectionHead,
  anyInScope,
  scoped,
  type Zone,
} from '@/components/brand'
import { FACTS, formatCount } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { F, NB } from '../../product/facts-text'
import { Fact, WaText } from '../../product/shared'
import { VOD_LEAD_FACTS, homeVodShown } from '../bands'

const HEAD = {
  eyebrow: 'À la demande',
  titleStart: 'Films et séries, ',
  titleKeyword: 'à votre heure',
  titleEnd: '.',
  ledger: 'Titres par genre',
}

/**
 * The four checks. Launch mode keeps a check only while its fact shows; the last one states no fact. A list left
 * with that single line goes (copy README §10.4, rule 1): the head then takes the full width.
 */
const ALL_CHECKS = [
  {
    facts: 'vod.updates',
    line: (
      <>
        Nouveautés{NB}: <Fact value={FACTS.vod.updates} what="rythme des ajouts" fact="vod.updates" />
      </>
    ),
  },
  {
    facts: 'quality.levels',
    line: (
      <>
        Qualité d’image{NB}: <Fact value={F.qualities} what="qualités" fact="quality.levels" />
      </>
    ),
  },
  {
    facts: 'vod.languages',
    line: (
      <>
        Langues et sous-titres{NB}: <Fact value={FACTS.vod.languages} what="langues proposées" fact="vod.languages" />
      </>
    ),
  },
  {
    line: (
      <>
        Un titre ne démarre pas{NB}: <WaText>on regarde avec vous</WaText>
      </>
    ),
  },
]
const CHECKS = scoped(ALL_CHECKS).map((check) => check.line)
const SHOW_CHECKS = CHECKS.length >= 2

/** Columns from lg: one per genre up to four, so a short list leaves no empty column. */
const LEDGER_COLS = ['', 'lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4']
const ledgerCols = (count: number) => Math.min(Math.max(count, 1), 4)

/**
 * One genre as a tile of the kit's card fill (T28: the ledger's rules, a deeper one to open each row and a hairline
 * to close the last, became tiles; a list of any length now ends on a gap). One layout for every genre (T30, LT-10:
 * the kit's row put a short name's count beside it and a long name's under it): the genre on top, its count under
 * it, both from the tile's left edge; in a row of tiles the names start on one line and the counts end on one.
 * 16px corners: a slim tile, which the card radius would turn into a lozenge.
 */
const GENRE_TILE = 'flex-col flex-nowrap items-start justify-between gap-y-1 rounded-inner border bg-z-card px-5 py-4 md:px-6 md:py-5'

/**
 * home-vod: head with the four checks, then the genres the owner lists, one tile each (a count only where the
 * owner gives one).
 * No posters and no titles of films or series. Launch mode: a missing fact takes its sentence, its check or the
 * ledger out, and the band goes when its four facts are all missing (../bands.ts).
 */
export function HomeVod({ zone = 'paper' }: { zone?: Zone }) {
  if (!homeVodShown()) return null
  const genres = FACTS.vod.genres
  // Without a single count, the tiles hold their names alone (no empty figure line under each).
  const withCounts = genres?.some((g) => g.count != null) ?? false
  return (
    <Section zone={zone} dataSection="home-vod">
      <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-grid">
        <Reveal className={SHOW_CHECKS ? 'lg:col-span-7' : 'lg:col-span-8'}>
          <SectionHead
            eyebrow={HEAD.eyebrow}
            title={
              <>
                {HEAD.titleStart}
                <Kw>{HEAD.titleKeyword}</Kw>
                {HEAD.titleEnd}
              </>
            }
            lead={
              anyInScope(VOD_LEAD_FACTS) ? (
                <>
                  <FactScope facts="vod.count">
                    <Fact value={F.vodCount} what="nombre" fact="vod.count" figure unit="films" /> et séries au catalogue.{' '}
                  </FactScope>
                  <FactScope facts="vod.genres">Voici comment ils se répartissent.</FactScope>
                </>
              ) : undefined
            }
          />
        </Reveal>
        {SHOW_CHECKS && (
          <Reveal index={1} className="lg:col-span-5 lg:pb-1.5">
            <CheckList items={CHECKS} className="gap-y-3 font-medium" />
          </Reveal>
        )}
      </div>

      <FactScope facts="vod.genres">
        <Reveal index={2} className="mt-head">
          {genres && genres.length > 0 ? (
            <ul aria-label={HEAD.ledger} className={cn('m-0 grid list-none gap-3 p-0 md:grid-cols-2 md:gap-grid', LEDGER_COLS[ledgerCols(genres.length)])}>
              {genres.map((g) =>
                g.count != null ? (
                  <GenreRow
                    key={g.name}
                    genre={g.name}
                    count={
                      <>
                        {formatCount(g.count)}
                        <span className="font-sans text-small font-medium text-z-muted">{NB}titres</span>
                      </>
                    }
                    className={GENRE_TILE}
                  />
                ) : (
                  // No count from the owner: the same tile, its figure line kept empty (pseudo-content, no text) so
                  // every tile has one height; when no genre has a count, there is no figure line at all.
                  <GenreRow
                    key={g.name}
                    genre={g.name}
                    count={withCounts ? <span aria-hidden="true" className="invisible before:content-['0']" /> : <></>}
                    className={cn(GENRE_TILE, !withCounts && 'gap-y-0')}
                  />
                ),
              )}
            </ul>
          ) : (
            <Pending variant="block" what="genres proposés" fact="vod.genres" />
          )}
        </Reveal>
      </FactScope>
    </Section>
  )
}
