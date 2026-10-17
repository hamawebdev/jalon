import { startTransition, useEffect, useState, type ReactNode } from 'react'
import type { Zone } from '@/components/brand'
import {
  homeAppShown,
  homeChannelsShown,
  homeProofShown,
  homeReviewsShown,
  homeSportShown,
  homeTrialShown,
  homeVideoShown,
  homeVodShown,
} from './home/bands'
import { MobileBuyBar } from './home/FloatingActions'
import { HomeApp } from './home/sections/App'
import { HomeChannels } from './home/sections/Channels'
import { HomeDevices } from './home/sections/Compat'
import { HomeCta } from './home/sections/Cta'
import { HomeFaq } from './home/sections/Faq'
import { HomeFeatures } from './home/sections/Features'
import { HomeHowItWorks } from './home/sections/Guides'
import { HomeHero } from './home/sections/Hero'
import { HomePlans } from './home/sections/Plans'
import { HomeReviews } from './home/sections/Reviews'
import { HomeSport } from './home/sections/Sport'
import { HomeSupport } from './home/sections/Support'
import { HomeTrial } from './home/sections/Trial'
import { HomeVideo } from './home/sections/Video'
import { HomeVod } from './home/sections/Vod'
import { HomeWhy } from './home/sections/Why'
import { alternate } from './product/grounds'

/**
 * One band under the hero. `grounds`: the zones it can stand on, the one it was drawn for first (a single entry
 * when its look depends on it: the ruled sheet of home-features, the screens of home-app, the plans grid).
 * `shown`: a band that rests on owner facts says whether it renders (it also returns null by itself).
 */
type Band = { key: string; grounds: Zone[]; render: (zone: Zone) => ReactNode; shown?: () => boolean }

/**
 * The bands in reading order: what I get, whether it works on my device, how much, what happens after payment,
 * what I can count on; then the detail bands for those who want more, the questions, the contact and the closing
 * call. A band hidden for want of a fact keeps its neighbours (home-app and home-video after the devices,
 * home-reviews and home-trial after the promises).
 */
const BANDS: Band[] = [
  { key: 'features', grounds: ['plate'], render: () => <HomeFeatures /> },
  { key: 'devices', grounds: ['paper', 'band'], render: (zone) => <HomeDevices zone={zone} /> },
  { key: 'app', grounds: ['nuit'], render: () => <HomeApp />, shown: homeAppShown },
  { key: 'video', grounds: ['paper', 'plate'], render: (zone) => <HomeVideo zone={zone} />, shown: homeVideoShown },
  { key: 'plans', grounds: ['band'], render: () => <HomePlans /> },
  { key: 'how', grounds: ['paper'], render: (zone) => <HomeHowItWorks zone={zone} /> },
  { key: 'why', grounds: ['plate', 'band'], render: (zone) => <HomeWhy zone={zone} /> },
  { key: 'reviews', grounds: ['band', 'paper'], render: (zone) => <HomeReviews zone={zone} />, shown: homeReviewsShown },
  { key: 'trial', grounds: ['paper', 'band'], render: (zone) => <HomeTrial zone={zone} />, shown: homeTrialShown },
  { key: 'channels', grounds: ['paper', 'plate', 'band'], render: (zone) => <HomeChannels zone={zone} />, shown: homeChannelsShown },
  { key: 'sport', grounds: ['plate', 'paper'], render: (zone) => <HomeSport zone={zone} />, shown: homeSportShown },
  { key: 'vod', grounds: ['paper', 'band', 'plate'], render: (zone) => <HomeVod zone={zone} />, shown: homeVodShown },
  { key: 'faq', grounds: ['paper', 'plate'], render: (zone) => <HomeFaq zone={zone} /> },
  { key: 'support', grounds: ['plate', 'band', 'paper'], render: (zone) => <HomeSupport zone={zone} /> },
  { key: 'cta', grounds: ['paper', 'band'], render: (zone) => <HomeCta zone={zone} /> },
]

/** Every band under the hero, each on its ground, and the phone buy bar (which watches the cards they hold). */
function HomeBands() {
  const bands = BANDS.filter((band) => band.shown?.() ?? true)
  // The proof strip (band ground) closes the hero when it shows; otherwise the hero's paper is what comes above.
  const zones = alternate(
    bands.map((band) => band.grounds),
    homeProofShown() ? 'band' : 'paper',
  )
  return (
    <>
      {bands.map((band, i) => (
        <BandSlot key={band.key}>{band.render(zones[i])}</BandSlot>
      ))}
      <MobileBuyBar />
    </>
  )
}

/** Keeps the list keyed without adding an element around a band. */
function BandSlot({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/** What tells that the visitor is already acting on the page: a tap, a key, a wheel or a finger starting a scroll. */
const INTENT_EVENTS = ['pointerdown', 'touchstart', 'keydown', 'wheel'] as const

/**
 * True once the bands under the hero may mount: from the frame after the first paint. That switch is a transition,
 * so React renders what waits on it in slices and the browser paints the hero in between, even when the timer runs
 * first (a tab opened in the background gets no animation frame: the timer covers it). On a slow phone the slices
 * can take a second or two: a visitor who taps, types or starts to scroll before they are done gets the bands at
 * once, as an urgent update. A tap on « Choisir ma formule » therefore always finds its anchor (#abonnements).
 * An address that names an anchor (/#abonnements) asks for a band, not for the hero: nothing waits then, and the
 * layout's hash scroll finds its target on the first render, as it did before the bands were deferred.
 */
function useAfterFirstPaint() {
  const [after, setAfter] = useState(() => typeof window !== 'undefined' && window.location.hash.length > 1)
  useEffect(() => {
    if (after) return
    let done = false
    const flip = () => {
      if (done) return
      done = true
      startTransition(() => setAfter(true))
    }
    const now = () => setAfter(true)
    const frame = requestAnimationFrame(flip)
    const timer = window.setTimeout(flip, 250)
    for (const type of INTENT_EVENTS) window.addEventListener(type, now, { capture: true, passive: true })
    return () => {
      done = true
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      for (const type of INTENT_EVENTS) window.removeEventListener(type, now, { capture: true })
    }
  }, [after])
  return after
}

/**
 * Home page. The hero paints first: it holds the page's largest element (the h1 on desktop, the lead on a phone),
 * and the bands under it (some 2,000 nodes) are mounted right after that first paint, so they no longer stand
 * between the chunk's arrival and the largest paint. Until they mount, one viewport of ground holds their place:
 * the footer never shows under the hero and then moves. The ids stay (#abonnements, #appareils, #contact): the
 * layout's hash scroll waits for an anchor that mounts a frame later. Each band lives in ./home/sections; those
 * that rest on an owner fact render nothing until the fact exists.
 */
export default function Home() {
  const rest = useAfterFirstPaint()
  return (
    <div className="overflow-x-clip bg-paper font-sans leading-[1.65] text-ink-body antialiased">
      <HomeHero />
      {rest ? <HomeBands /> : <div aria-hidden="true" className="min-h-svh" />}
    </div>
  )
}
