import { useState } from 'react'
import { AppMock, ButtonLink, Chip, FactScope, IconTile, Kw, Reveal, Section, SectionHead } from '@/components/brand'
import { DEVICE_FAMILIES, DEVICE_FAMILY_LABEL, FACTS, familiesInText, present } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { NB } from '../../product/facts-text'
import { Fact } from '../../product/shared'
import { ANCHORS, ROUTES } from '../data'

const HEAD = {
  eyebrow: 'Application',
  titleStart: 'Regardez avec ',
  titleKeyword: 'notre application',
  titleEnd: '.',
  cta: 'Installer l’application',
}

/** Pictograms of the feature strip, in order (decorative). */
const FEATURE_ICONS = ['ti-player-play', 'ti-layout-grid', 'ti-calendar-event']
const GUIDE_FEATURE = 'Guide des programmes'

/**
 * One screenshot (media.appScreens) in its Nuit frame. The frame holds a 16:9 box from the first render, at every
 * width, so the band keeps its height while the lazy image loads and nothing under it moves (QA HC-09). The capture
 * is shown whole in the box, centred: once loaded it fills the box across (16:9 or wider) or down (a taller shape,
 * such as a phone capture), never cropped or stretched. Its own corners keep the 12px of an inset block, whatever its
 * shape, so a capture that does not fill the box has no square corner.
 */
function AppScreen({ src, alt, className }: { src: string; alt: string; className?: string }) {
  // The side the loaded capture fills; null until it has loaded (or if it fails), when it only stays inside the box.
  const [fill, setFill] = useState<'width' | 'height' | null>(null)
  return (
    <li className={cn('panel-nuit frame-corners overflow-hidden rounded-panel p-3', className)}>
      <div className="relative aspect-video">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={(e) => {
            const { naturalWidth: w, naturalHeight: h } = e.currentTarget
            if (w > 0 && h > 0) setFill(w * 9 >= h * 16 ? 'width' : 'height')
          }}
          className={cn(
            'absolute inset-0 m-auto max-h-full max-w-full rounded-control',
            fill === 'width' && 'w-full',
            fill === 'height' && 'h-full',
          )}
        />
      </div>
    </li>
  )
}

/**
 * home-app: the owner's own player app (apps.own), on Nuit since the band is led by its screens. Only with an own
 * app (copy home.md › home-app); without one the band goes and home-devices carries the #telecharger anchor.
 */
export function HomeApp() {
  const app = FACTS.apps.own
  if (!present(app)) return null
  // The app's device families in display order: the sentence (familiesInText) and the chips name them in one order.
  const families = DEVICE_FAMILIES.filter((f) => app.platforms.includes(f))
  // « Guide des programmes » is shown only if the service really has a programme guide.
  const features = (app.features ?? []).filter((f) => f !== GUIDE_FEATURE || present(FACTS.epg.available)).slice(0, 3)
  const screens = FACTS.media.appScreens
  return (
    <Section
      zone="nuit"
      dataSection="home-app"
      id={ANCHORS.download}
      containerClassName="grid items-center gap-y-14 md:gap-y-16 lg:grid-cols-12 lg:gap-x-grid"
    >
      <div className="lg:col-span-6 lg:pr-6 xl:pr-10">
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
            <>
              {/* An app given without its device families: launch mode leaves the sentence out, never « sur . ». */}
              <FactScope facts={{ 'apps.own.platforms': families }}>
                {app.name} s’installe sur{' '}
                <Fact value={familiesInText(families)} what="appareils pris en charge" fact="apps.own.platforms" tail="." />{' '}
              </FactScope>
              Vous vous connectez avec les accès reçus à la commande.
            </>
          }
        />

        {features.length > 0 && (
          // Tiles of the Nuit card fill, in place of ruled cells (T28): slim rows on phones, three tiles a row from
          // sm; 16px corners, concentric with the 12px icon tile inside.
          <ul className="m-0 mt-10 grid list-none gap-3 p-0 sm:grid-cols-3 md:mt-12">
            {features.map((f, i) => (
              <Reveal
                as="li"
                key={f}
                index={i}
                className="flex items-center gap-4 rounded-inner border border-z-line bg-z-card p-4 sm:flex-col sm:items-start sm:gap-5 sm:p-5"
              >
                <IconTile icon={FEATURE_ICONS[i]} size={40} />
                <span className="font-display text-title text-z-fg">{f}</span>
              </Reveal>
            ))}
          </ul>
        )}

        {families.length > 0 && (
          <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0">
            {families.map((f) => (
              <li key={f}>
                <Chip>{DEVICE_FAMILY_LABEL[f].chip}</Chip>
              </li>
            ))}
          </ul>
        )}

        <ButtonLink to={ROUTES.apps} variant="plate" size="lg" iconEnd="arrow" className="mt-10">
          {HEAD.cta}
        </ButtonLink>
      </div>

      <Reveal className="lg:col-span-6">
        {screens && screens.length > 0 ? (
          // Two columns from sm for two to four screens. Three: the first screen spans the row and the other two share
          // the row under it, so no cell stays empty (T30, LT-10).
          <ul className={cn('m-0 grid list-none gap-4 p-0', screens.length > 1 && 'sm:grid-cols-2')}>
            {screens.slice(0, 4).map((s, i, shown) => (
              <AppScreen
                key={s.src}
                src={s.src}
                alt={`Écran de l’application ${app.name}${NB}: ${s.alt}`}
                className={shown.length === 3 && i === 0 ? 'sm:col-span-2' : undefined}
              />
            ))}
          </ul>
        ) : (
          <AppMock className="mx-auto max-w-[340px] sm:max-w-[480px] lg:max-w-[560px]" />
        )}
      </Reveal>
    </Section>
  )
}
