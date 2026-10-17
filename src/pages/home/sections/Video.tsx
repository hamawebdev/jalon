import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Button, ButtonA, ConsentGate, Kw, Pending, Reveal, Section, SectionHead, openConsentSettings, type Zone } from '@/components/brand'
import { FACTS, consentTools, isVideoFile, present } from '@/lib/facts'
import { BRAND } from '@/lib/site'
import { ANCHORS } from '../data'

const NB = ' '

const COPY = {
  titleStart: 'Voyez le service ',
  titleKeyword: 'en marche',
  titleEnd: '.',
  body: 'Une courte présentation en vidéo, avant de vous abonner.',
  note: 'La vidéo se charge au moment où vous la lancez.',
  // The note when the player comes from a video host that asks for consent ({nom}: its name in cookies.tools).
  // build-a's draft for copy (home.md › home-video, QA HC-03, 2026-10-15).
  noteTool: `La vidéo se charge au moment où vous la lancez. Son lecteur vient de {nom}, qui dépose ses propres cookies${NB}: il s’affiche seulement avec votre accord.`,
  poster: `Aperçu de la vidéo de présentation de ${BRAND}`,
  play: 'Lire la vidéo de présentation',
  cta: 'Choisir ma formule',
  // In the frame, after « Lire la vidéo », while that tool is not accepted: copy's consent gate placeholder
  // (chrome.md › chrome-cookie). Its button opens the consent banner on its switches, as the privacy page's does.
  gate: `Ce contenu vient de {nom}, qui dépose des cookies${NB}: il s’affiche seulement avec votre accord.`,
  manage: 'Gérer mes cookies',
  // The marker where {nom} goes while the owner has not named the player's tool (media.demoVideo.tool).
  hostPending: 'hébergeur de la vidéo',
}

/** `text` with its {nom} replaced by `name`: the tool's name as typed in cookies.tools, or the marker standing in. */
function withName(text: string, name: ReactNode): ReactNode {
  const [before, after = ''] = text.split('{nom}')
  return (
    <>
      {before}
      {name}
      {after}
    </>
  )
}

type DemoVideo = NonNullable<typeof FACTS.media.demoVideo>

/**
 * The tool the player comes from (media.demoVideo.tool): its name exactly as in cookies.tools, when the video host
 * sets cookies. null: none named (a video file served with the site needs none; a player's address does).
 */
function hostTool(video: { url: string; tool?: string | null }): string | null {
  return present(video.tool) ? video.tool : null
}

/** The screen frame of the poster and the player: 16:9, the Nuit panel with its viewfinder corners. */
const FRAME = 'panel-nuit frame-corners relative aspect-video overflow-hidden rounded-panel'

/** Moves the focus to `el` only when it was lost (the control that had it has just been replaced): never steals it. */
function focusIfLost(el: Element | null | undefined) {
  const active = document.activeElement
  if (el instanceof HTMLElement && (!active || active === document.body)) el.focus()
}

/** The player. It takes the focus of the control it replaces (« Lire la vidéo », or « Gérer mes cookies »). */
function Player({ video }: { video: DemoVideo }) {
  const frame = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => focusIfLost(frame.current?.firstElementChild), [])
  return (
    <div ref={frame} className={FRAME}>
      {isVideoFile(video.url) ? (
        <video src={video.url} poster={video.poster} title={video.title} controls autoPlay className="size-full" />
      ) : (
        <iframe
          src={video.url}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="size-full border-0"
        />
      )}
    </div>
  )
}

/**
 * What the frame shows once « Lire la vidéo » is pressed while the player may not mount (APPROVAL §2e: a tool mounts
 * only through the consent gate): copy's sentence and, when the visitor can accept the tool, « Gérer mes cookies »,
 * which opens the banner on its switches; accepting there mounts the player at once. No button when there is nothing
 * to accept: a name that cookies.tools does not list (launch-check refuses it), or no name yet (its marker stands in
 * the sentence). The frame keeps 16:9 and grows when the words need more room (a small phone at a large text size).
 */
function Asked({ video, name, canAsk }: { video: DemoVideo; name: ReactNode; canAsk: boolean }) {
  const id = useId()
  const box = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => focusIfLost(box.current?.querySelector('button') ?? box.current), [])
  return (
    <div className="panel-nuit frame-corners relative flex overflow-hidden rounded-panel" data-part="home-video-consent">
      <img src={video.poster} alt="" className="absolute inset-0 size-full object-cover opacity-20" />
      {/* 16:9 at least (padding resolves against the frame's width); the row grows with the words. */}
      <div aria-hidden="true" className="w-0 shrink-0 pt-[56.25%]" />
      <div
        ref={box}
        tabIndex={canAsk ? undefined : -1}
        className="relative grid min-w-0 flex-1 content-center justify-items-center gap-5 px-6 py-8 text-center outline-none"
      >
        <p id={id} className="max-w-md font-sans text-small text-z-fg">
          {withName(COPY.gate, name)}
        </p>
        {canAsk && (
          <Button variant="secondary" size="md" aria-describedby={id} onClick={() => openConsentSettings()}>
            {COPY.manage}
          </Button>
        )}
      </div>
    </div>
  )
}

/**
 * home-video: the owner's demo video (media.demoVideo), click to load: nothing from the video host loads before
 * the click. When the video names its host's tool in cookies.tools (media.demoVideo.tool), the player mounts only
 * through the consent gate, and the note says where it comes from. A player's address with no tool named never
 * mounts: there is nothing to ask the visitor about, and the tool's marker shows what is missing (launch-check asks
 * for it). A video file with no tool plays on click, as before. Only with a video; hidden today.
 */
export function HomeVideo({ zone = 'paper' }: { zone?: Zone }) {
  const video = FACTS.media.demoVideo
  const [playing, setPlaying] = useState(false)
  if (!video) return null
  const tool = hostTool(video)
  const unnamed = tool == null && !isVideoFile(video.url)
  const asks = tool != null && consentTools().some((t) => t.name === tool)
  const host = tool ?? <Pending what={COPY.hostPending} fact="media.demoVideo.tool" />
  return (
    <Section zone={zone} dataSection="home-video" containerClassName="grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-grid">
      <Reveal className="lg:col-span-5">
        <SectionHead
          title={
            <>
              {COPY.titleStart}
              <Kw>{COPY.titleKeyword}</Kw>
              {COPY.titleEnd}
            </>
          }
          lead={COPY.body}
        />
        <ButtonA href={`#${ANCHORS.plans}`} variant="primary" size="lg" iconEnd="arrow" className="mt-8">
          {COPY.cta}
        </ButtonA>
      </Reveal>

      <Reveal index={1} className="lg:col-span-7">
        {!playing ? (
          <div className={FRAME}>
            <img src={video.poster} alt={COPY.poster} className="size-full object-cover" />
            <button
              type="button"
              aria-label={COPY.play}
              onClick={() => setPlaying(true)}
              className="group/play absolute inset-0 grid cursor-pointer place-items-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-signal-300"
            >
              <span className="grid size-16 place-items-center rounded-full bg-plate text-ink shadow-lift transition-colors duration-150 ease-calm group-hover/play:bg-paper">
                <i className="ti ti-player-play-filled text-[28px]" aria-hidden="true" />
              </span>
            </button>
          </div>
        ) : tool != null ? (
          <ConsentGate tool={tool} fallback={<Asked video={video} name={tool} canAsk={asks} />}>
            <Player video={video} />
          </ConsentGate>
        ) : unnamed ? (
          <Asked video={video} name={host} canAsk={false} />
        ) : (
          <Player video={video} />
        )}
        <p className="mt-3 font-sans text-meta text-z-muted">{asks || unnamed ? withName(COPY.noteTool, host) : COPY.note}</p>
      </Reveal>
    </Section>
  )
}
