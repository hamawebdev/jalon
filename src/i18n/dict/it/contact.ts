// Italian copy, Contact page. Translation of ../fr/contact.ts (owner of the source: chrome). Same keys, same shapes.
// WhatsApp messages live in src/lib/whatsapp.ts and stay French.
import type { Dict } from '../types.ts'

export const contact: Dict['contact'] = {
  badge: '✦ CONTATTI & SUPPORTO 7/7',
  title: 'Contatta il tuo distributore ufficiale Atlas Pro',
  subtitle:
    "Una domanda prima di ordinare, un codice da attivare o rinnovare, un aiuto con l'installazione: il nostro team ti risponde in francese, 7 giorni su 7.",

  whatsapp: {
    badge: 'Canale prioritario',
    title: 'WhatsApp',
    text: 'Ordine, attivazione, rinnovo del tuo Codice Atlas Pro e assistenza tecnica: tutto si risolve qui, direttamente con il nostro team.',
    response: (minutes: number) => `Risposta < ${minutes} min`,
    days: '7 giorni su 7',
    french: 'In francese',
    button: 'Scrivi su WhatsApp',
    tip: 'Per fare prima, indica il tuo dispositivo e, per un rinnovo, il tuo codice o identificativo attuale.',
  },

  email: {
    title: 'E-mail',
    text: 'Per le richieste dettagliate e la gestione del tuo abbonamento.',
    pending: 'indirizzo e-mail del supporto',
  },

  telegram: {
    title: 'Telegram',
    text: 'Assistenza tecnica e nuove versioni delle applicazioni ufficiali.',
    pending: 'link Telegram',
    open: 'Apri Telegram',
  },

  help: {
    title: 'Trova la tua risposta in un clic',
    install: {
      title: 'Guide di Installazione',
      text: 'Smart TV, Fire TV Stick, Android, iPhone, PC: la procedura dispositivo per dispositivo.',
    },
    faq: {
      title: 'Domande Frequenti',
      text: 'Ordine, attivazione, compatibilità, rinnovo: le risposte alle domande più frequenti.',
    },
    reseller: {
      title: 'Diventa Rivenditore',
      text: 'Vuoi rivendere Atlas Pro? Scopri i nostri pannelli di codici.',
    },
  },
}
