// Renders the hub's guide copy with its small inline markup (documented at the top of src/i18n/dict/fr/install.ts):
// **bold**, `mono`, {wa}, {waShort}, {price}, {trial}, {app:id}, {ver:id}, {pcode:key}, [text](#anchor).
// Facts come from FACTS at render time, so the copy never holds a number, a code or a link.
import { Fragment, type ReactNode } from 'react'
import { Pending } from '@/components/kit'
import { useFormat, useLang } from '@/i18n/context'
import { HOME_ANCHORS, homeAnchor, type HomeAnchor } from '@/i18n/routes'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { helpMessage, waLink } from '@/lib/whatsapp'
import { appLabel, isHubApp } from './apps'

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\{[a-zA-Z]+(?::[a-zA-Z0-9]+)?\}|\[[^\]]+\]\(#[a-zA-Z]+\))/g

type PlayerCode = keyof typeof FACTS.playerDownloaderCodes

/** A Downloader code printed inside a sentence. */
export function CodeChip({ code, className }: { code: string; className?: string }) {
  return (
    <code
      className={cn(
        'inline-block rounded-md bg-primary-soft px-1.5 py-px font-mono text-[0.92em] font-bold tracking-wide text-primary',
        className,
      )}
    >
      {code}
    </code>
  )
}

/** The WhatsApp help link the brief writes « WhatsApp (33751299176) ». */
export function WaInline({ short = false }: { short?: boolean }) {
  const display = FACTS.whatsapp.display
  return (
    <a
      href={waLink(helpMessage())}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      className="font-semibold whitespace-nowrap text-ink underline decoration-whatsapp decoration-2 underline-offset-[3px] transition-colors hover:text-whatsapp-deep"
    >
      WhatsApp
      {short ? null : display ? ` (${display})` : <Pending what="whatsapp.display" />}
    </a>
  )
}

export function Rich({ text }: { text: string }) {
  const { price, num } = useFormat()
  const lang = useLang()

  const render = (source: string, keyPrefix: string): ReactNode[] =>
    source.split(TOKEN).map((part, i) => {
      const key = `${keyPrefix}${i}`
      if (!part) return null
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={key} className="font-semibold text-ink">
            {render(part.slice(2, -2), `${key}.`)}
          </strong>
        )
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code key={key} className="rounded bg-mist px-1 font-mono text-[0.9em] text-ink">
            {part.slice(1, -1)}
          </code>
        )
      }
      const link = /^\[([^\]]+)\]\(#([a-zA-Z]+)\)$/.exec(part)
      if (link && link[2] in HOME_ANCHORS) {
        return (
          <a
            key={key}
            href={homeAnchor(link[2] as HomeAnchor, lang)}
            className="font-semibold text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
          >
            {link[1]}
          </a>
        )
      }
      const token = /^\{([a-zA-Z]+)(?::([a-zA-Z0-9]+))?\}$/.exec(part)
      if (token) {
        const [, name, arg] = token
        switch (name) {
          case 'wa':
            return <WaInline key={key} />
          case 'waShort':
            return <WaInline key={key} short />
          case 'price':
            return <Fragment key={key}>{price(FACTS.counts.playerPricePerYear)}</Fragment>
          case 'trial':
            return <Fragment key={key}>{num(FACTS.counts.playerTrialDays)}</Fragment>
          case 'app':
            if (arg && isHubApp(arg)) return <Fragment key={key}>{appLabel(arg)}</Fragment>
            break
          case 'ver':
            if (arg && isHubApp(arg)) {
              const version = FACTS.apps[arg].version
              return version ? <Fragment key={key}>{version}</Fragment> : <Pending key={key} what={`apps.${arg}.version`} />
            }
            break
          case 'pcode':
            if (arg && arg in FACTS.playerDownloaderCodes) {
              return <CodeChip key={key} code={FACTS.playerDownloaderCodes[arg as PlayerCode]} />
            }
            break
        }
      }
      // French spacing: keep « ? ! : ; » on the line of the word before them.
      return <Fragment key={key}>{part.replace(/ ([?!:;»])/g, '\u00a0$1').replace(/« /g, '«\u00a0')}</Fragment>
    })

  return <>{render(text, '')}</>
}
