// Italian copy, Rivenditore page. Translation of ../fr/reseller.ts (owner of the source: pages). Same keys, same shapes.
// Never show a reseller price: the price zone always sends to WhatsApp.
import type { Dict } from '../types.ts'

export const reseller: Dict['reseller'] = {
  hero: {
    badge: 'PROGRAMMA PARTNER & PANEL UFFICIALE',
    title: 'Diventa Rivenditore Ufficiale Atlas Pro ONTV',
    description: (uptime: string) =>
      `Sviluppa la tua attività e genera entrate ricorrenti grazie all'infrastruttura IPTV premium più richiesta in Francia e in Europa. Entrando nella nostra rete ufficiale Atlas Pro, accedi a un pannello di amministrazione (Panel Rivenditore) potentissimo, intuitivo e completamente autonomo. Gestisci, attiva e rinnova i codici dei tuoi clienti in un clic su tutte le nostre applicazioni ufficiali (Android, Google TV, PC) e sui player partner (iOS, Smart TV), con una stabilità dei server garantita al ${uptime}.`,
    points: ['Consegna immediata del tuo Panel Rivenditore', 'Supporto Dedicato ai Rivenditori H24 & 7/7', 'ASSISTENZA POST-VENDITA & FORMAZIONE GRATUITE'],
    seePanels: 'Vedi i panel',
  },

  panels: {
    label: 'I panel rivenditore Atlas Pro',
    title: (codes: string) => `PANEL ATLAS PRO — ${codes} CODICI`,
    featured: 'Popolare',
    logoLabel: 'Atlas Pro ONTV',
    priceLabel: 'Prezzo Rivenditore',
    priceText: 'Contatta il nostro team su WhatsApp',
    priceNote: '(abbonamento annuale)',
    features: {
      codes: (codes: string) => `${codes} CODICI ATLAS PRO (Crediti 12 mesi)`,
      channels: (count: string) => `+${count} Canali Mondiali in Diretta`,
      vod: (count: string) => `+${count} Film & Serie VOD (4K / FHD)`,
      replay: (days: string) => `Replay ${days} Giorni, EPG & Video on demand`,
      service: 'ASSISTENZA POST-VENDITA & FORMAZIONE GRATUITE',
      delivery: 'Consegna immediata del tuo Panel Rivenditore',
      support: 'Supporto Dedicato ai Rivenditori H24 & 7/7',
    },
    cta: 'Richiedi questo Panel su WhatsApp',
    guarantee: 'GARANZIA Soddisfazione al 100%',
  },

  why: {
    badge: 'PANEL RIVENDITORE ATLAS PRO',
    title: 'Un panel pensato per far crescere la tua attività',
    items: {
      autonomous: {
        title: 'Panel potentissimo & autonomo',
        text: 'Un pannello di amministrazione (Panel Rivenditore) intuitivo e completamente autonomo, consegnato immediatamente.',
      },
      oneClick: {
        title: 'Gestisci i tuoi clienti in un clic',
        text: 'Gestisci, attiva e rinnova i codici dei tuoi clienti in un clic.',
      },
      apps: {
        title: 'Applicazioni ufficiali & player partner',
        text: 'Le nostre applicazioni ufficiali (Android, Google TV, PC) e i player partner (iOS, Smart TV).',
      },
      uptime: {
        title: 'Stabilità dei server garantita',
        text: "L'infrastruttura IPTV premium più richiesta in Francia e in Europa.",
      },
      support: {
        title: 'Supporto Dedicato ai Rivenditori H24 & 7/7',
        text: 'Assistenza post-vendita & formazione gratuite per partire con il piede giusto e seguire i tuoi clienti.',
      },
    },
  },

  cta: {
    title: 'Sviluppa la tua attività con Atlas Pro ONTV',
    text: 'Prezzo Rivenditore: contatta il nostro team su WhatsApp (abbonamento annuale). Scegli il tuo panel:',
    button: (codes: string) => `Panel ${codes} Codici`,
    guarantee: 'GARANZIA Soddisfazione al 100%',
  },
}
