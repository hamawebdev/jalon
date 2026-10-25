// Italian <title>, meta description and social/structured-data wording of every page.
// Translation of ../fr/meta.ts (owner of the source: seo). Same keys and shapes; descriptions are functions of
// MetaVars (facts already formatted for Italian). Titles ≤ ~60 characters, descriptions ≈ 140–160.
import type { Dict } from '../types.ts'

const pages: Dict['meta']['pages'] = {
  home: {
    name: 'Home',
    title: 'Atlas Pro ONTV (2026) · Abbonamento IPTV Atlas Pro',
    description: (v) =>
      `Scopri Atlas Pro ONTV 2026, l'IPTV Atlas Pro on TV: +${v.channels} canali in Full HD, +${v.films} film e serie. Abbonamento Atlas Pro attivato su WhatsApp.`,
  },
  boutique: {
    name: 'Negozio',
    title: 'Negozio · Abbonamento Atlas Pro ONTV 12 mesi',
    description: (v) =>
      `Ordina il tuo abbonamento Atlas Pro ONTV in 3 clic: 1, 2 o 3 schermi per 12 mesi, da ${v.priceFrom}. Pagamento PayPal o bonifico SEPA, codici ricevuti su WhatsApp.`,
  },
  revendeur: {
    name: 'Rivenditore',
    title: 'Diventa rivenditore Atlas Pro ONTV · Panel ufficiale',
    description: (v) =>
      `Diventa rivenditore Atlas Pro: panel da ${v.panels} codici da 12 mesi, consegna immediata, formazione gratuita e supporto dedicato 24 ore su 24. Prezzi su WhatsApp.`,
  },
  telecharger: {
    name: 'Scarica',
    title: 'Scarica Atlas Pro ONTV APK · Applicazioni ufficiali',
    description: (v) =>
      `Scarica ${v.ontv} (APK), ${v.max} e ${v.ibo} con il loro codice Downloader, oltre ai player per iPhone, Smart TV, Windows e Mac.`,
  },
  contact: {
    name: 'Contatti',
    title: 'Contatti Atlas Pro · Supporto WhatsApp 7 giorni su 7',
    description: (v) =>
      `Una domanda sul tuo abbonamento Atlas Pro o sull'installazione di Atlas Pro ONTV? Il nostro supporto ti risponde su WhatsApp al ${v.whatsapp}, 7 giorni su 7.`,
  },
  mentions: {
    name: 'Note legali',
    title: 'Note legali · AtlasProTVOfficial',
    description: (v) =>
      `Note legali del sito ${v.domain}: titolare, hosting e proprietà intellettuale. AtlasProTVOfficial, distributore ufficiale autorizzato Atlas Pro.`,
  },
  confidentialite: {
    name: 'Informativa sulla privacy',
    title: 'Informativa sulla privacy · AtlasProTVOfficial',
    description: () =>
      `Come AtlasProTVOfficial tratta le informazioni che fornisci per ordinare e attivare il tuo abbonamento Atlas Pro su WhatsApp, e quali sono i tuoi diritti.`,
  },
  conditions: {
    name: 'Condizioni generali',
    title: 'Condizioni generali & garanzia · Atlas Pro ONTV',
    description: () =>
      `Condizioni generali dell'abbonamento Atlas Pro ONTV: ordine e attivazione su WhatsApp, pagamento con PayPal o bonifico SEPA, garanzia soddisfatto o rimborsato.`,
  },
  notFound: {
    name: 'Pagina non trovata',
    title: 'Pagina non trovata · Atlas Pro ONTV',
    description: () =>
      `Questa pagina non esiste o ha cambiato indirizzo. Ritrova l'abbonamento Atlas Pro ONTV, le applicazioni e le guide di installazione dalla home.`,
  },
}

export const meta: Dict['meta'] = {
  siteName: 'AtlasProTVOfficial',
  ogImageAlt: 'Atlas Pro ONTV 2026 · Abbonamento IPTV Atlas Pro da AtlasProTVOfficial, distributore ufficiale autorizzato',
  organizationDescription: 'Distributore Ufficiale Autorizzato Atlas Pro N°1 in Francia & in Europa.',
  productName: 'Abbonamento Atlas Pro ONTV',
  productDescription:
    'Abbonamento IPTV Atlas Pro ONTV di 12 mesi per 1, 2 o 3 schermi: canali in diretta in Full HD, film e serie in VOD, replay, su Android, Smart TV, Fire TV Stick, iPhone e PC.',
  planNames: { premium: 'Premium', duo: 'Duo', famille: 'Famille' },
  offerName: (plan: string, screens: number, months: number) =>
    `${plan} · ${screens} ${screens > 1 ? 'schermi' : 'schermo'} · ${months} ${months > 1 ? 'mesi' : 'mese'}`,
  pages,
}
