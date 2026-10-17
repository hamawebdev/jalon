import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { cardClass, choiceRowClass, fieldClass, noticeClass, segmentedClass } from './recipes'

/** Light card that holds a form (white plate; paper on a plate band). Fields inside take the contrasting fill. */
export function FormCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(cardClass.form, className)}>{children}</div>
}

type FieldMeta = {
  /**
   * Label (content string). Never invent label copy: when the content only has a placeholder
   * ("Votre Nom*"), pass that same string with `labelHidden`.
   */
  label: ReactNode
  /** Render the label sr-only (it still names the control). For placeholder-only forms. */
  labelHidden?: boolean
  /**
   * Show the "*" mark after the label when `required`/`aria-required`. Default: on, except when the label
   * string already ends with "*" (no doubled mark).
   */
  requiredMark?: boolean
  /** Helper line under the control. */
  helper?: ReactNode
  /** Error message: sets aria-invalid and links it with aria-describedby. */
  error?: ReactNode
  /** Class for the field wrapper (grid placement). */
  className?: string
}

type FieldProps = FieldMeta & {
  id: string
  required?: boolean
  children: ReactNode
}

function showMark(label: ReactNode, required: boolean | undefined, requiredMark: boolean | undefined) {
  if (!required) return false
  if (requiredMark != null) return requiredMark
  return !(typeof label === 'string' && label.trimEnd().endsWith('*'))
}

/** True for required or aria-required="true" controls. */
function isRequired(rest: { required?: boolean; 'aria-required'?: boolean | 'true' | 'false' }) {
  return !!rest.required || rest['aria-required'] === true || rest['aria-required'] === 'true'
}

/** Label + control + helper + error. Use it to wrap a custom control; Input/Select/Textarea use it already. */
export function Field({ id, label, labelHidden, requiredMark, helper, error, required, className, children }: FieldProps) {
  return (
    <div className={cn(fieldClass.field, className)}>
      <label htmlFor={id} className={cn(labelHidden ? 'sr-only' : fieldClass.label, !labelHidden && showMark(label, required, requiredMark) && fieldClass.required)}>
        {label}
      </label>
      {children}
      {helper != null && (
        <p id={`${id}-helper`} className={fieldClass.helper}>
          {helper}
        </p>
      )}
      {error != null && (
        <p id={`${id}-error`} className={fieldClass.error}>
          <i className="ti ti-alert-circle mt-0.5 shrink-0 text-[18px]" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

function describedBy(id: string, helper: unknown, error: unknown, own?: string) {
  return [own, helper != null ? `${id}-helper` : null, error != null ? `${id}-error` : null].filter(Boolean).join(' ') || undefined
}

type InputProps = FieldMeta & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & { inputClassName?: string }

/** Text input (52px, 17px text: no iOS zoom) with label, helper and error wiring. */
export function Input({ label, labelHidden, requiredMark, helper, error, className, inputClassName, id, ...rest }: InputProps) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <Field id={fid} label={label} labelHidden={labelHidden} requiredMark={requiredMark} helper={helper} error={error} required={isRequired(rest)} className={className}>
      <input
        {...rest}
        id={fid}
        aria-invalid={error != null ? true : rest['aria-invalid']}
        aria-describedby={describedBy(fid, helper, error, rest['aria-describedby'])}
        className={cn(fieldClass.control, inputClassName)}
      />
    </Field>
  )
}

type SelectProps = FieldMeta & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> & { selectClassName?: string }

/** Native select with a chevron. */
export function Select({ label, labelHidden, requiredMark, helper, error, className, selectClassName, id, children, ...rest }: SelectProps) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <Field id={fid} label={label} labelHidden={labelHidden} requiredMark={requiredMark} helper={helper} error={error} required={isRequired(rest)} className={className}>
      <span className="relative block">
        <select
          {...rest}
          id={fid}
          aria-invalid={error != null ? true : rest['aria-invalid']}
          aria-describedby={describedBy(fid, helper, error, rest['aria-describedby'])}
          className={cn(fieldClass.control, fieldClass.select, selectClassName)}
        >
          {children}
        </select>
        <i className="ti ti-chevron-down pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[20px] text-ink-muted" aria-hidden="true" />
      </span>
    </Field>
  )
}

type TextareaProps = FieldMeta & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & { textareaClassName?: string }

/** Multi-line field (min 140px). */
export function Textarea({ label, labelHidden, requiredMark, helper, error, className, textareaClassName, id, ...rest }: TextareaProps) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <Field id={fid} label={label} labelHidden={labelHidden} requiredMark={requiredMark} helper={helper} error={error} required={isRequired(rest)} className={className}>
      <textarea
        {...rest}
        id={fid}
        aria-invalid={error != null ? true : rest['aria-invalid']}
        aria-describedby={describedBy(fid, helper, error, rest['aria-describedby'])}
        className={cn(fieldClass.control, fieldClass.textarea, textareaClassName)}
      />
    </Field>
  )
}

type CheckProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> & {
  label: ReactNode
  helper?: ReactNode
  error?: ReactNode
  className?: string
}

function CheckLike({ kind, label, helper, error, className, id, ...rest }: CheckProps & { kind: 'checkbox' | 'radio' }) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <div className={cn('grid gap-1', className)}>
      {/* The whole row is the target: 44px at least, the 24px box on the first line of the label. */}
      <label htmlFor={fid} className="flex min-h-11 cursor-pointer items-start gap-3 py-2.5 font-sans text-small text-ink-body has-[:disabled]:cursor-not-allowed">
        <input
          {...rest}
          id={fid}
          type={kind}
          aria-invalid={error != null ? true : rest['aria-invalid']}
          aria-describedby={describedBy(fid, helper, error, rest['aria-describedby'])}
          className={kind === 'checkbox' ? fieldClass.check : fieldClass.radio}
        />
        <span>{label}</span>
      </label>
      {helper != null && (
        <p id={`${fid}-helper`} className={cn(fieldClass.helper, 'pl-9')}>
          {helper}
        </p>
      )}
      {error != null && (
        <p id={`${fid}-error`} className={cn(fieldClass.error, 'pl-9')}>
          <i className="ti ti-alert-circle mt-0.5 shrink-0 text-[18px]" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

/** Checkbox (24px box in a 44px row; ticked: Bleu repère with a white tick). */
export function Checkbox(props: CheckProps) {
  return <CheckLike kind="checkbox" {...props} />
}

/** Radio (24px circle in a 44px row; chosen: a 2px Bleu repère ring and its dot). */
export function Radio(props: CheckProps) {
  return <CheckLike kind="radio" {...props} />
}

type RadioCardProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> & {
  label: ReactNode
  /** Right-aligned extra (payment badges). */
  aside?: ReactNode
  className?: string
}

/**
 * Radio card (duration, payment method): a full-width choice row. Chosen = a 2px Bleu repère edge drawn inside (no
 * jump) on the blue tint, with the filled radio; the focus ring surrounds the row. Never yellow.
 * The radio and its label never part: a long label (a name and its note) wraps in its own column beside the radio,
 * which stays on the label's first line; only the aside moves under them when the row is too narrow for all three.
 */
export function RadioCard({ label, aside, className, id, ...rest }: RadioCardProps) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <label htmlFor={fid} className={cn(choiceRowClass, className)}>
      <span className="flex items-start gap-3">
        <input
          {...rest}
          id={fid}
          type="radio"
          // Centred on the first line of the label (24px circle, copy line).
          className={cn(fieldClass.radio, 'mt-[calc((var(--text-copy)*var(--text-copy--line-height)-1.5rem)/2)] focus-visible:outline-none')}
        />
        <span className="min-w-0 font-sans text-copy font-semibold text-ink">{label}</span>
      </span>
      {aside != null && <span className="ml-auto flex flex-wrap gap-2">{aside}</span>}
    </label>
  )
}

type SegmentedOption<T extends string> = { value: T; label: ReactNode; disabled?: boolean }

type SegmentedProps<T extends string> = {
  /** Name of the choice for assistive technology (« Durée »), rendered as the group's hidden legend. */
  label: string
  /** The radios' shared name. */
  name: string
  value: T
  onChange: (value: T) => void
  /** Two or three short options. More, or long labels: stacked <RadioCard> rows instead. */
  options: SegmentedOption<T>[]
  className?: string
}

/**
 * Segmented choice for two or three short options (durations, device families): native radios in a pill track,
 * so arrow keys move the choice and the state is exposed without extra ARIA. The chosen segment is a white thumb
 * with a Bleu repère edge; both labels stay visible (never a switch). Full width, 360px at most.
 */
export function Segmented<T extends string>({ label, name, value, onChange, options, className }: SegmentedProps<T>) {
  return (
    <fieldset className={cn(segmentedClass.track, className)}>
      <legend className="sr-only">{label}</legend>
      {options.map((o) => (
        <label key={o.value} className={segmentedClass.segment}>
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={o.value === value}
            disabled={o.disabled}
            onChange={() => onChange(o.value)}
            className="peer sr-only"
          />
          <span className={segmentedClass.thumb}>{o.label}</span>
        </label>
      ))}
    </fieldset>
  )
}

type NoticeProps = {
  /** success: ok on ok-100; error: alert on alert-100 (errors only); info: Bleu repère on nuit-100. */
  tone: 'success' | 'error' | 'info'
  children: ReactNode
  /** role="status" for success and info, role="alert" for errors by default. */
  role?: string
  className?: string
}

const NOTICE_ICON = { success: 'ti-circle-check', error: 'ti-alert-circle', info: 'ti-info-circle' } as const

/**
 * Inline notice (form result, empty cart, checkout states), placed where the question arises (above the pay
 * button, under the field), never at the top of the page. Calm wording: what happened and what to do next.
 * A 20px icon on the first line, 16px text: status is never colour alone.
 */
export function Notice({ tone, children, role, className }: NoticeProps) {
  return (
    <div role={role ?? (tone === 'error' ? 'alert' : 'status')} className={cn(noticeClass[tone], className)}>
      <i className={cn('ti mt-0.5 shrink-0 text-[20px]', NOTICE_ICON[tone])} aria-hidden="true" />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
