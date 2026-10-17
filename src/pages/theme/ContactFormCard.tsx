import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'
import { FactScope, Input, Notice, Select, Textarea, buttonClass, linkClass } from '@/components/brand'
import { FACTS } from '@/lib/facts'
import { cn } from '@/lib/utils'
import { Fact } from './facts-ui'

// The written-request form (copy contact.md › contact-form), shared by /contact/, the plans page question form
// and the reseller page. Visible labels, an off-screen honeypot instead of a quiz, French messages. While no
// endpoint is set (facts contact.formEndpoint), the submit stays disabled and a notice says so: nothing pretends
// to send. With an endpoint, the form posts there and shows « sent » only on a confirmed answer.

export type ContactFormVariant = 'contact' | 'plans' | 'reseller'

type Field = 'name' | 'email' | 'phone' | 'topic' | 'order' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'invalid'

/** What changes per page: the message field, the submit label, the form's name and a fixed topic. */
const VARIANT: Record<
  ContactFormVariant,
  { message: { label: string; placeholder: string; error: string }; submit: string; aria: string; topic?: string }
> = {
  contact: {
    message: {
      label: 'Message',
      placeholder: 'Dites-nous ce qui se passe et, si besoin, sur quel appareil.',
      error: 'Écrivez votre message, même en quelques mots.',
    },
    submit: 'Envoyer mon message',
    aria: 'Écrire à l’équipe',
  },
  plans: {
    message: {
      label: 'Votre question',
      placeholder: 'Par exemple : quelle application installer sur ma télé ?',
      error: 'Écrivez votre question, même en une phrase.',
    },
    submit: 'Envoyer ma question',
    aria: 'Poser une question sur les formules',
  },
  reseller: {
    message: {
      label: 'Votre projet',
      placeholder: 'Où comptez-vous revendre, et pour combien de clients environ ?',
      error: 'Décrivez votre projet en quelques mots.',
    },
    submit: 'Envoyer ma demande',
    aria: 'Présentez-nous votre activité',
    topic: 'Revendeur',
  },
}

const EMPTY: Values = { name: '', email: '', phone: '', topic: '', order: '', message: '' }

const PHONE_ERROR = 'Ce numéro semble incomplet. Ajoutez l’indicatif du pays, par exemple +33.'

function digits(v: string) {
  return v.replace(/\D/g, '').length
}

function check(field: Field, v: Values, variant: ContactFormVariant, topics: boolean): string | undefined {
  const value = v[field].trim()
  switch (field) {
    case 'name':
      return value ? undefined : 'Indiquez votre nom.'
    case 'email':
      if (!value) return 'Indiquez votre adresse e-mail.'
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? undefined : 'Cette adresse semble incomplète : vérifiez le @ et ce qui suit.'
    case 'phone':
      return !value || (/^\+[\d\s().-]+$/.test(value) && digits(value) >= 8) ? undefined : PHONE_ERROR
    case 'topic':
      return !topics || value ? undefined : 'Choisissez le sujet le plus proche de votre demande.'
    case 'message':
      return value ? undefined : VARIANT[variant].message.error
    default:
      return undefined
  }
}

export function ContactFormCard({ idPrefix, variant }: { idPrefix: string; variant: ContactFormVariant }) {
  const endpoint = FACTS.contact.formEndpoint
  const topics = variant === 'contact' ? FACTS.support.topics : null
  const hasTopics = !!topics && topics.length > 0
  const v = VARIANT[variant]
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const honeypot = useRef<HTMLInputElement>(null)
  const fields: Field[] = ['name', 'email', 'phone', ...(hasTopics ? (['topic'] as Field[]) : []), 'message']

  const update = (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: check(field, next, variant, hasTopics) }))
  }

  // A field is checked when the visitor leaves it with something typed, or when it already shows an error.
  const leave = (field: Field) => () => {
    if (!values[field] && !errors[field]) return
    setErrors((prev) => ({ ...prev, [field]: check(field, values, variant, hasTopics) }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!endpoint || status === 'sending') return
    const next: Errors = {}
    for (const f of fields) {
      const err = check(f, values, variant, hasTopics)
      if (err) next[f] = err
    }
    setErrors(next)
    const first = fields.find((f) => next[f])
    if (first) {
      setStatus('invalid')
      document.getElementById(`${idPrefix}-${first}`)?.focus()
      return
    }
    // Filled honeypot: a robot. Pretend nothing (no « sent »), simply stop.
    if (honeypot.current?.value) return
    setStatus('sending')
    try {
      const body = new FormData(e.currentTarget)
      const res = await fetch(endpoint, { method: 'POST', body, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setValues(EMPTY)
    } catch {
      setStatus('failed')
    }
  }

  const sending = status === 'sending'
  const field = (name: Field) => ({
    id: `${idPrefix}-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    onBlur: leave(name),
    error: errors[name],
  })

  return (
    <form className="grid items-start gap-x-4 gap-y-5 md:grid-cols-2" noValidate aria-label={v.aria} aria-busy={sending || undefined} onSubmit={onSubmit}>
      {v.topic && <input type="hidden" name="topic" value={v.topic} />}
      <Input type="text" autoComplete="name" label="Votre nom" aria-required="true" maxLength={200} {...field('name')} />
      <Input
        type="email"
        autoComplete="email"
        label="Adresse e-mail"
        helper="Pour vous envoyer notre réponse."
        aria-required="true"
        maxLength={320}
        {...field('email')}
      />
      <Input
        type="tel"
        autoComplete="tel"
        label="Téléphone ou WhatsApp (facultatif)"
        helper="Avec l’indicatif du pays, par exemple +33."
        maxLength={40}
        className={cn(!hasTopics && variant !== 'contact' && 'md:col-span-2')}
        {...field('phone')}
      />
      {hasTopics && (
        <Select label="Sujet" aria-required="true" {...field('topic')}>
          <option value="">Choisissez un sujet</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      )}
      {variant === 'contact' && (
        <Input
          type="text"
          label="Référence de commande (facultatif)"
          helper="Si votre message concerne une commande passée."
          maxLength={80}
          className={cn(!hasTopics && 'md:col-span-1')}
          {...field('order')}
        />
      )}
      <Textarea
        rows={6}
        maxLength={4000}
        label={v.message.label}
        placeholder={v.message.placeholder}
        aria-required="true"
        className="md:col-span-2"
        {...field('message')}
      />
      {/* Honeypot: off-screen and hidden from assistive technology; people never see it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website`}>Laissez ce champ vide</label>
        <input ref={honeypot} id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="font-sans text-meta text-ink-muted md:col-span-2">
        Nous utilisons ces informations pour vous répondre. Pour exercer vos droits&nbsp;:{' '}
        <Fact value={FACTS.privacy.dpoContact} what="contact pour les données personnelles" fact="privacy.dpoContact" tail="." /> Tout est
        détaillé dans la{' '}
        <Link to="/politique-de-confidentialite/" className={linkClass}>
          politique de confidentialité
        </Link>
        .
      </p>

      {/* No rule above the action: the note on personal data, then the notice if any, then the one button. */}
      <div className="grid gap-4 pt-1 md:col-span-2">
        {!endpoint && (
          <Notice tone="info">
            <Fact value={null} what="envoi du formulaire" fact="contact.formEndpoint" tail="." /> En attendant, écrivez-nous sur WhatsApp ou par
            e-mail.
          </Notice>
        )}
        {status === 'invalid' && <Notice tone="error">Il manque quelques informations&nbsp;: vérifiez les champs signalés.</Notice>}
        {status === 'failed' && (
          <Notice tone="error">Le message n’est pas parti. Vérifiez votre connexion et réessayez, ou écrivez-nous sur WhatsApp.</Notice>
        )}
        {status === 'sent' && (
          <Notice tone="success">
            Message bien reçu.
            <FactScope facts="support.responseTime">
              {' '}
              Réponse habituelle&nbsp;: <Fact value={FACTS.support.responseTime} what="délai de réponse" fact="support.responseTime" tail="." />
            </FactScope>
          </Notice>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <button
            type="submit"
            disabled={!endpoint}
            aria-busy={sending || undefined}
            className={buttonClass('primary', 'lg', 'w-full sm:w-auto')}
          >
            {sending && <i className="ti ti-loader-2 text-[20px] motion-safe:animate-spin" aria-hidden="true" />}
            <span>{v.submit}</span>
          </button>
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {sending ? 'Envoi de votre message.' : ''}
        </p>
      </div>
    </form>
  )
}
