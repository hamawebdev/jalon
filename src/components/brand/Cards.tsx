import type { ElementType, HTMLAttributes, MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import { routeHref } from '@/lib/site'
import { cn } from '@/lib/utils'
import { ButtonA, CtaButton } from './Button'
import { Chip, IconTile, Monogram, Stars, StatusDot, Tab, Tag } from './Labels'
import { Pending } from './Pending'
import { Price } from './Price'
import { cardClass, checkIconClass, stepDiscClass, tapTargetClass } from './recipes'
import { slotShown } from './scope'
import type { Cta, IconName, PendingFact } from './types'

/** Root HTML attributes the cards forward (id, aria-*, data-*, event handlers). */
type RootAttrs = Omit<HTMLAttributes<HTMLElement>, 'className' | 'children' | 'title'>

type CardProps = {
  children?: ReactNode
  /** panel = 28px radius, 32px on large screens (plan, related, support, app box); card = 20px, 24px on large screens (default). */
  radius?: 'card' | 'panel'
  /** Hover lift, only for a card that is one link. A card that holds buttons does not react itself. */
  interactive?: boolean
  as?: ElementType
  className?: string
} & RootAttrs

/** Base card: 1px zone line, zone card fill (white on paper and band, paper on plate, nuit-800 on Nuit), no shadow, no accent rail. */
export function Card({ children, radius = 'card', interactive, as: Tag = 'div', className, ...rest }: CardProps) {
  return (
    <Tag {...rest} className={cn(radius === 'panel' ? cardClass.panel : cardClass.base, interactive && cardClass.interactive, className)}>
      {children}
    </Tag>
  )
}

/**
 * Checklist with nuit-600 checks (signal-300 on Nuit). Items may hold <Pending> for facts not given yet; in launch
 * mode pass only the items that render (scoped()), and an empty list renders nothing.
 */
export function CheckList({ items, className }: { items: ReactNode[]; className?: string }) {
  if (items.length === 0) return null
  return (
    <ul className={cn('m-0 grid list-none gap-3 p-0 font-sans text-small text-z-body', className)}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <i className={checkIconClass} aria-hidden="true" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

type FeatureGridProps = {
  /** 4 = 1 / 2 / 4 from xl (home features, device families); 3 = 1 / 2 / 3 from lg (why-us, included); 2 = 1 / 2 (a pair). */
  cols?: 2 | 3 | 4
  /** Root element (default ul; pass as="div" when the cards are not list items). */
  as?: ElementType
  className?: string
  children?: ReactNode
} & RootAttrs

/**
 * Grid for FeatureCards: the cards are direct children and use subgrid rows from md, so tiles, titles and
 * text starts align across a whole row even when one title wraps to two lines.
 */
export function FeatureGrid({ cols = 4, as: Tag = 'ul', className, children, ...rest }: FeatureGridProps) {
  return (
    <Tag
      {...rest}
      className={cn(
        'm-0 grid list-none gap-3 p-0 md:grid-cols-2 md:gap-grid',
        cols === 4 ? 'xl:grid-cols-4' : cols === 3 ? 'lg:grid-cols-3' : '',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

type FeatureCardProps = {
  icon: IconName
  title: ReactNode
  text?: ReactNode
  /** Model tags (device families) as small chips. */
  tags?: string[]
  as?: 'h3' | 'h4'
  /** Root element: 'li' inside FeatureGrid (default ul), 'article' otherwise (default). */
  root?: 'article' | 'li' | 'div'
  className?: string
  children?: ReactNode
} & RootAttrs

/**
 * Feature card: tile + title + text. A row (tile left) on phone; from md a 3-row subgrid (tile / title / text)
 * so rows align inside FeatureGrid (or any grid the card is a direct child of).
 */
export function FeatureCard({ icon, title, text, tags, as: H = 'h3', root: Root = 'article', className, children, ...rest }: FeatureCardProps) {
  return (
    <Root
      {...rest}
      className={cn(
        'grid grid-cols-[40px_1fr] content-start gap-x-3.5 gap-y-0 rounded-card border border-z-line bg-z-card p-4',
        'md:row-span-3 md:grid-cols-1 md:grid-rows-subgrid md:p-card',
        className,
      )}
    >
      <IconTile icon={icon} className="row-span-2 self-start md:row-span-1 md:mb-5" />
      <H className="col-start-2 font-display text-title text-z-fg md:col-start-1">{title}</H>
      <div className="col-start-2 md:col-start-1">
        {text != null && <p className="mt-2 font-sans text-small text-z-soft">{text}</p>}
        {tags && tags.length > 0 && (
          <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
            {tags.map((t) => (
              <li key={t}>
                <Chip size="sm">{t}</Chip>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </Root>
  )
}

/** Index list: rows without boxes, 1 / 2 / 3 columns, gap-x-6 gap-y-12. */
export function IndexList({ children, className }: { children: ReactNode; className?: string }) {
  return <ol className={cn('m-0 grid list-none gap-x-6 gap-y-12 p-0 md:grid-cols-2 lg:grid-cols-3', className)}>{children}</ol>
}

type IndexItemProps = {
  /** The item's own number, only where the order is real (steps). Never invent one. */
  index?: string
  title: ReactNode
  children?: ReactNode
  as?: 'h3' | 'h4'
  className?: string
}

/** Index row: a hairline on top, optional step number (mono 600 15px in a 32px disc with a Bleu repère edge), title, small text. */
export function IndexItem({ index, title, children, as: H = 'h3', className }: IndexItemProps) {
  return (
    <li className={cn('ledger', className)}>
      {index && (
        <p className={cn(stepDiscClass.base, stepDiscClass.plain)}>{index}</p>
      )}
      <H className={cn('font-display text-title text-z-fg', index && 'mt-4')}>{title}</H>
      {children != null && <div className="mt-2 font-sans text-small text-z-soft">{children}</div>}
    </li>
  )
}

/** Default marker of a missing count. */
const COUNT_PENDING: PendingFact = { what: 'nombre de titres', fact: 'vod.genres' }

/**
 * Genre row: genre (display title) left, count (display 700) right. Only real counts: `count: null` renders
 * <Pending> in its place. Launch mode: while the count is a missing optional fact the row keeps the genre alone
 * (the genre is itself a given fact, not the count's label).
 */
export function GenreRow({ genre, count, pending = COUNT_PENDING, className }: { genre: ReactNode; count: ReactNode | null; pending?: PendingFact; className?: string }) {
  return (
    <li className={cn('flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-z-line py-4', className)}>
      <span className="font-display text-title text-z-fg">{genre}</span>
      {count == null ? <Pending what={pending.what} fact={pending.fact} /> : <span className="price-num text-stat-md text-z-fg">{count}</span>}
    </li>
  )
}

type PlanCardProps = RootAttrs & {
  name: string
  /**
   * Makes the name the visible link to the plan's page (« Formule 12 mois »), so one link on the card says in
   * words where it leads; the CTA keeps its own label. Same look as the name without it, underlined on hover, in
   * a 44px tap box that does not move the lines around it.
   */
  nameTo?: string
  /**
   * Neutral tag, or the saving chip (only with a real reference price). The saving chip stands beside the
   * reference price, on its line; a neutral tag (or a chip without a reference price on screen) ends the name's line.
   */
  tag?: { label: string; tone: 'neutral' | 'saving' } | null
  old?: string | null
  /** Plan price (facts). `null` = not given yet: renders <Pending> (pass `pricePending` with the facts key). */
  price: string | null
  pricePending?: PendingFact
  unit?: string | null
  perMonth?: string | null
  /**
   * Checklist items; an item may hold <Pending> for a fact not given yet. The list is the page's: in launch mode
   * filter out the items that rest on a missing optional fact (scoped()) before passing it, so no line is empty.
   */
  features: ReactNode[]
  cta: Cta
  /**
   * Link to the plan's page under the CTA. `ariaLabel` names the plan (« Voir le détail de la formule 12 mois »):
   * give one whenever several cards share the visible label, and start it with that label.
   */
  details?: { label: string; to: string; ariaLabel?: string }
  /** Optional slot under the price: <Graduations> marking the plan's months. */
  duration?: ReactNode
  /**
   * Advised plan: a 2px Bleu repère edge, the float shadow and the tab. Same size and same position as its
   * neighbours: never raised, scaled, tinted or moved to the middle.
   */
  featured?: boolean
  /** Tab text on the featured plate (« Notre conseil »), only if the content has one. */
  tab?: string | null
  as?: 'h2' | 'h3'
  className?: string
}

/**
 * Plan card: name, price block (reference price and saving chip, figure, unit under it, per-month line), optional
 * duration rule, divider, checklist, CTA, details link. Base: white card with a hairline, no shadow. Advised: the
 * firm Bleu repère edge, the float shadow and the tab, in place. Exactly one filled button in a plans grid: primary
 * on the advised card, secondary (white, Bleu repère edge) on the others. The card is not a link: only its button
 * and its links react.
 * Rows line up across the cards of a grid row (cards of equal height, `h-full` in a stretched row): the names
 * stand at the top, and everything from the price down sits at the foot, so a card without a reference price (or
 * with a name on two lines) takes the difference between its name and its price. Prices, per-month lines, rulers,
 * checklists and buttons then share their lines whatever each card holds and however long its amount is.
 */
export function PlanCard({
  name,
  nameTo,
  tag,
  old,
  price,
  pricePending,
  unit,
  perMonth,
  features,
  cta,
  details,
  duration,
  featured,
  tab,
  as: H = 'h3',
  className,
  ...rest
}: PlanCardProps) {
  // The saving chip goes beside the reference price whenever that price is on screen (one size in every card, so
  // the line is as tall everywhere); any other tag ends the name's line.
  const oldShown = price != null && !!old
  const chip = tag?.tone === 'saving' && oldShown ? tag : null
  const nameTag = tag && !chip ? tag : null
  const heading = (
    <H className={cn('font-display text-title-lg text-z-fg', nameTag && 'min-w-0')}>
      {nameTo ? (
        // The block margins take back what the 44px box adds around a line of the name: the heading keeps its height.
        <Link
          to={nameTo}
          className={cn(
            tapTargetClass,
            'my-[calc((var(--text-title-lg)*var(--text-title-lg--line-height)-2.75rem)/2)] hover:underline hover:decoration-1 hover:underline-offset-4',
          )}
        >
          {name}
        </Link>
      ) : (
        name
      )}
    </H>
  )
  return (
    <article
      {...rest}
      className={cn(
        'relative flex flex-col rounded-panel bg-plate p-card',
        'transition-[border-color,box-shadow] duration-180 ease-calm',
        featured ? cardClass.firm : 'border border-hairline',
        // Phones (24px of padding): 8px more so the tab clears the name. From md the padding alone clears it, and
        // the name stays on its neighbours' line.
        tab && 'max-md:pt-[calc(var(--spacing-card)+0.5rem)]',
        className,
      )}
    >
      {tab && <Tab>{tab}</Tab>}
      {/*
        The advised card's edge is 1px wider per side than a base card's hairline. Its content takes that pixel back
        (-m-px), so the text column is as wide as in the base cards whatever padding the caller sets, values wrap
        the same way in every card of a grid, and its rows line up with its neighbours'.
      */}
      <div className={cn('flex flex-1 flex-col', featured && '-m-px')}>
        {nameTag ? (
          <div className="flex items-start justify-between gap-3">
            {heading}
            {/* Centred on the name's first line (28px tag, title-lg line). */}
            <Tag tone={nameTag.tone} size="md" className="mt-[calc((var(--text-title-lg)*var(--text-title-lg--line-height)-1.75rem)/2)] shrink-0">
              {nameTag.label}
            </Tag>
          </div>
        ) : (
          heading
        )}
        {/* From the price down, at the foot: in a row of equal cards, what one card lacks above its price (a
            reference price, a second line of name) becomes room under its name, and the rows below line up. */}
        <div className="mt-auto pt-3">
          <Price
            old={old}
            oldAside={chip && <Tag tone="saving" size="md">{chip.label}</Tag>}
            value={price}
            pending={pricePending}
            unit={unit}
            unitBelow
            perMonth={perMonth}
            size="lg"
          />
          {duration != null && <div className="mt-6">{duration}</div>}
          {/* The rule separates the price block from the checklist: no checklist, no rule. */}
          {features.length > 0 && (
            <>
              <hr className="my-5 border-0 border-t border-hairline" />
              <CheckList items={features} />
            </>
          )}
        </div>
        <div className="relative z-[1] pt-6">
          <CtaButton cta={cta} variant={featured ? 'primary' : 'secondary'} size="md" full iconEnd="arrow" />
          {details && (
            <p className="mt-2 text-center">
              <Link
                to={details.to}
                aria-label={details.ariaLabel}
                className="inline-flex min-h-11 items-center rounded-tag font-sans text-small font-semibold text-nuit-700 underline decoration-1 underline-offset-4 transition-colors duration-150 ease-calm hover:text-ink hover:decoration-2"
              >
                {details.label}
              </Link>
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

type TestimonialProps = RootAttrs & {
  quote: ReactNode
  name: string
  meta?: ReactNode
  /**
   * Shows the stars. `true` = decorative (the rating text lives elsewhere); a string = the accessible name of the
   * stars (content string, e.g. "Note : 4 sur 5").
   */
  rating?: boolean | string
  /** The review's score out of 5, drawn as that many stars (4 = four full, one outlined). Default 5. */
  score?: number
  className?: string
}

/**
 * Testimonial: stars, a decorative « in display 700, the quote roman in the text face, monogram + name + meta.
 * No photos. Only real, sourced reviews (owner fact); otherwise the section is hidden.
 */
export function Testimonial({ quote, name, meta, rating, score, className, ...rest }: TestimonialProps) {
  return (
    <figure {...rest} className={cn('m-0 flex flex-col rounded-card border border-z-line bg-z-card p-card', className)}>
      {rating && <Stars value={score} label={typeof rating === 'string' ? rating : undefined} />}
      <span aria-hidden="true" className="mt-4 block h-8 font-display text-5xl leading-none font-bold text-nuit-700 nuit:text-signal-300 before:content-['«']" />
      <blockquote className="m-0 mt-2 font-sans text-[1.125rem] leading-[1.5] text-z-fg">{quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <Monogram name={name} size={40} />
        <span className="grid">
          <span className="font-sans text-small font-semibold text-z-fg">{name}</span>
          {meta != null && <span className="font-sans text-meta text-z-muted">{meta}</span>}
        </span>
      </figcaption>
    </figure>
  )
}

/** Default markers of the support card's facts. */
const NAME_PENDING: PendingFact = { what: 'nom', fact: 'support.team' }
const HOURS_PENDING: PendingFact = { what: 'horaires', fact: 'support.hours' }

type SupportCardProps = RootAttrs & {
  /** Agent or team name (owner fact). `null` = not given yet: <Pending> in the heading, an empty monogram. */
  name: string | null
  namePending?: PendingFact
  role?: ReactNode
  /** Hours or availability (owner fact). `null` = not given yet: <Pending> beside the status square. */
  availability?: ReactNode | null
  availabilityPending?: PendingFact
  as?: 'h3' | 'h4'
  className?: string
  children?: ReactNode
}

/**
 * Support card: monogram 56, name (title-lg), role (meta), status square + availability. Launch mode: a name
 * that is a missing optional fact takes the card out (a card for nobody says nothing; the role alone is not a
 * heading); an availability that is one takes its own line out, status square included.
 */
export function SupportCard({
  name,
  namePending = NAME_PENDING,
  role,
  availability,
  availabilityPending = HOURS_PENDING,
  as: H = 'h3',
  className,
  children,
  ...rest
}: SupportCardProps) {
  if (!slotShown(name, namePending.fact)) return null
  const availabilityShown = availability !== undefined && slotShown(availability, availabilityPending.fact)
  return (
    <article {...rest} className={cn(cardClass.panel, className)}>
      <Monogram name={name} size={56} />
      <H className="mt-5 font-display text-title-lg text-z-fg">
        {name ?? <Pending variant="block" what={namePending.what} fact={namePending.fact} />}
      </H>
      {role != null && <p className="mt-1 font-sans text-meta font-medium text-z-muted">{role}</p>}
      {availabilityShown && (
        <p className="mt-4 flex items-center gap-2.5 font-sans text-small text-z-soft">
          <StatusDot />
          {availability === null ? <Pending what={availabilityPending.what} fact={availabilityPending.fact} /> : <span>{availability}</span>}
        </p>
      )}
      {children}
    </article>
  )
}

type AppBoxProps = RootAttrs & {
  /** Screen visual (AppMock or a DeviceFrame), shown in a 16:10 Nuit screen with viewfinder corners. */
  screen: ReactNode
  name: ReactNode
  text?: ReactNode
  /** Buttons (primary md with ti-download, secondary md). */
  actions?: ReactNode
  as?: 'h2' | 'h3'
  className?: string
}

/** App box (downloads): 16:10 Nuit screen on top (clipped to the card's corners), then name, text and the download actions. */
export function AppBox({ screen, name, text, actions, as: H = 'h3', className, ...rest }: AppBoxProps) {
  return (
    <article {...rest} className={cn('overflow-hidden rounded-panel border border-z-line bg-z-card', className)}>
      <div className="panel-nuit frame-corners grid aspect-[16/10] place-items-center overflow-hidden p-6">{screen}</div>
      <div className="p-card">
        <H className="font-display text-title-lg text-z-fg">{name}</H>
        {text != null && <div className="mt-2 font-sans text-small text-z-soft">{text}</div>}
        {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </article>
  )
}

type RelatedCardProps = RootAttrs & {
  /** <Carte size="sm"> (16:10). */
  visual: ReactNode
  title: string
  to: string
  old?: string | null
  /** Plan price (facts). `null` = not given yet: renders <Pending>. */
  price: string | null
  pricePending?: PendingFact
  /** Rating under the title, e.g. <Stars label="…" /> (only with a real, sourced rating). */
  rating?: ReactNode
  /**
   * The add-to-cart link (<a href rel="nofollow">, role link). `ariaLabel` names the action with the product
   * ("Ajouter « {name} » au panier"); `href` defaults to `to`; `onClick` should preventDefault.
   * `loading` swaps the cart icon for the spinner and blocks clicks.
   */
  action: { label: string; ariaLabel?: string; href?: string; onClick?: (e: MouseEvent<HTMLElement>) => void; loading?: boolean }
  as?: 'h2' | 'h3' | 'h4'
  /** Root element (default article; 'li' inside a list). */
  root?: 'article' | 'li' | 'div'
  className?: string
}

/** Related plan: Carte, title link, rating, reference price, price-md, secondary sm add-to-cart action. */
export function RelatedCard({ visual, title, to, old, price, pricePending, rating, action, as: H = 'h3', root: Root = 'article', className, ...rest }: RelatedCardProps) {
  return (
    <Root {...rest} className={cn(cardClass.panel, 'flex flex-col', className)}>
      {visual}
      <H className="mt-5 font-display text-title text-z-fg">
        {/* A 44px tap box; the block margins take back what it adds around a line of the title. */}
        <Link
          to={to}
          className={cn(
            tapTargetClass,
            'my-[calc((var(--text-title)*var(--text-title--line-height)-2.75rem)/2)] hover:underline hover:decoration-1 hover:underline-offset-4',
          )}
        >
          {title}
        </Link>
      </H>
      {rating != null && <div className="mt-2">{rating}</div>}
      <Price old={old} value={price} pending={pricePending} size="md" className="mt-3" />
      <div className="mt-auto pt-5">
        <ButtonA
          href={action.href ?? routeHref(to)}
          rel="nofollow"
          aria-label={action.ariaLabel}
          onClick={action.onClick}
          loading={action.loading}
          variant="secondary"
          size="sm"
          full
          iconStart="ti-shopping-cart-plus"
        >
          {action.label}
        </ButtonA>
      </div>
    </Root>
  )
}
