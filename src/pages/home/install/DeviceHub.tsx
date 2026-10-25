// The 9-device selector (ARIA tabs) and the device guides. Every guide is rendered; the inactive ones carry
// `hidden`, so all of their text is in the prerendered HTML. Windows, Mac and Linux share the computer guide.
import { useRef, useState, type KeyboardEvent } from 'react'
import {
  Apple,
  Bot,
  Flame,
  Gamepad2,
  Laptop,
  Monitor,
  RotateCcw,
  Router,
  Terminal,
  Tv,
  type LucideIcon,
} from 'lucide-react'
import { useT } from '@/i18n/context'
import type { DeviceId, GuideBlock, GuideId } from '@/i18n/dict/fr/install'
import { cn } from '@/lib/utils'
import { NoticeBox, Options, Steps, type DesktopOs } from './Guide'

const DEVICES: { id: DeviceId; guide: GuideId; icon: LucideIcon }[] = [
  { id: 'smartTv', guide: 'smartTv', icon: Tv },
  { id: 'firestick', guide: 'firestick', icon: Flame },
  { id: 'android', guide: 'android', icon: Bot },
  { id: 'apple', guide: 'apple', icon: Apple },
  { id: 'windows', guide: 'desktop', icon: Monitor },
  { id: 'mac', guide: 'desktop', icon: Laptop },
  { id: 'linux', guide: 'desktop', icon: Terminal },
  { id: 'mag', guide: 'mag', icon: Router },
  { id: 'shield', guide: 'shield', icon: Gamepad2 },
]
const GUIDES: GuideId[] = ['smartTv', 'firestick', 'android', 'apple', 'desktop', 'mag', 'shield']
const ICON_OF: Record<GuideId, LucideIcon> = {
  smartTv: Tv,
  firestick: Flame,
  android: Bot,
  apple: Apple,
  desktop: Monitor,
  mag: Router,
  shield: Gamepad2,
}

const tabId = (id: DeviceId) => `install-tab-${id}`
const panelId = (guide: GuideId) => `install-guide-${guide}`

function Block({ block, os }: { block: GuideBlock; os: DesktopOs | null }) {
  switch (block.kind) {
    case 'notice':
      return <NoticeBox notice={block} />
    case 'subheading':
      return <h4 className="pt-2 text-lg font-bold sm:text-xl">{block.text}</h4>
    case 'steps':
      return <Steps steps={block.steps} title={block.title} />
    case 'options':
      return <Options items={block.items} os={os} />
  }
}

export function DeviceHub() {
  const t = useT().install
  const [active, setActive] = useState<DeviceId>('smartTv')
  const tabs = useRef<Partial<Record<DeviceId, HTMLButtonElement | null>>>({})
  const selectorRef = useRef<HTMLDivElement>(null)
  const panels = useRef<Partial<Record<GuideId, HTMLDivElement | null>>>({})
  const activeGuide = DEVICES.find((d) => d.id === active)!.guide
  const os: DesktopOs | null = active === 'windows' || active === 'mac' || active === 'linux' ? active : null

  function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  /** On a click, bring the guide into view when it starts below the fold (phones). */
  function choose(id: DeviceId) {
    setActive(id)
    const guide = DEVICES.find((d) => d.id === id)!.guide
    requestAnimationFrame(() => {
      const panel = panels.current[guide]
      if (!panel) return
      const top = panel.getBoundingClientRect().top
      if (top > window.innerHeight * 0.7 || top < 0) {
        panel.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
      }
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = DEVICES.length - 1
    const next: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    if (!(event.key in next)) return
    event.preventDefault()
    const target = DEVICES[next[event.key]].id
    setActive(target)
    tabs.current[target]?.focus()
  }

  function changeDevice() {
    selectorRef.current?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
    tabs.current[active]?.focus({ preventScroll: true })
  }

  return (
    <div>
      <div ref={selectorRef} className="scroll-mt-24 rounded-[2rem] border border-line bg-mist p-3 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-2 pt-1 pb-4">
          <h3 className="text-lg font-bold sm:text-xl">{t.selector.title}</h3>
          <p className="text-sm text-slate">{t.selector.hint}</p>
        </div>
        <div role="tablist" aria-label={t.selector.listLabel} className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {DEVICES.map((device, index) => {
            const copy = t.selector.devices[device.id]
            const selected = device.id === active
            const Icon = device.icon
            return (
              <button
                key={device.id}
                ref={(el) => {
                  tabs.current[device.id] = el
                }}
                id={tabId(device.id)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId(device.guide)}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(device.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={cn(
                  'group flex min-h-16 items-center gap-2.5 rounded-2xl border p-2.5 text-left sm:gap-3 transition-all duration-200 sm:p-4',
                  index === DEVICES.length - 1 && 'col-span-2 lg:col-span-1',
                  selected
                    ? 'border-primary bg-white shadow-glow ring-1 ring-primary'
                    : 'border-transparent bg-white shadow-pill hover:-translate-y-0.5 hover:border-primary/30',
                )}
              >
                <span
                  className={cn(
                    'inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors sm:size-11 [&_svg]:size-5',
                    selected ? 'bg-primary text-white' : 'bg-primary-soft text-primary',
                  )}
                >
                  <Icon aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm leading-tight font-semibold text-ink sm:text-[15px]">{copy.name}</span>
                  <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-slate sm:line-clamp-none">{copy.detail}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {GUIDES.map((guide) => {
        const copy = t.guides[guide]
        const shown = guide === activeGuide
        const Icon = ICON_OF[guide]
        const owner = shown ? active : DEVICES.find((d) => d.guide === guide)!.id
        return (
          <div
            key={guide}
            ref={(el) => {
              panels.current[guide] = el
            }}
            id={panelId(guide)}
            role="tabpanel"
            aria-labelledby={tabId(owner)}
            tabIndex={0}
            hidden={!shown}
            className="mt-6 scroll-mt-24 rounded-[2rem] border border-line bg-white p-5 shadow-card sm:mt-8 sm:p-8 lg:p-10"
          >
            <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white sm:inline-flex [&_svg]:size-7">
                  <Icon aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-wider text-primary uppercase">{copy.kicker}</p>
                  <h3 className="mt-1.5 text-xl leading-snug font-bold sm:text-2xl">{copy.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={changeDevice}
                className="inline-flex h-10 shrink-0 items-center gap-2 self-start rounded-full border border-primary/30 bg-white px-4 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary-soft"
              >
                {t.selector.change}
                <RotateCcw aria-hidden className="size-4" />
              </button>
            </div>
            <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">
              {copy.blocks.map((block, i) => (
                <Block key={i} block={block} os={shown ? os : null} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
