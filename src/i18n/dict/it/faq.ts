// Italian copy, home FAQ. Translation of ../fr/faq.ts (owner of the source: faq). Same ids, same order, same block
// structure; numbers, prices and versions come in through `v` (FaqValues, already formatted for Italian).
import type { Dict } from '../types.ts'
import type { FaqInline, FaqItem, FaqWa } from '../fr/faq.ts'

const b = (text: string): FaqInline => ({ b: text })
const wa = (kind: FaqWa, number = false, text?: string): FaqInline => ({ wa: kind, number, text })

const items: FaqItem[] = [
  {
    id: 'order',
    q: () => 'Come si ordina un abbonamento Atlas Pro ONTV sul nostro portale ufficiale?',
    a: (v) => [
      {
        p: [
          'Clicca sul pulsante « Abbonati ora » nella nostra ',
          { to: 'pricing', text: 'tabella dei prezzi' },
          ` (Premium ${v.screens.premium} Écran a ${v.price.premium}, Duo ${v.screens.duo} Écrans a ${v.price.duo} o Famille ${v.screens.famille} Écrans a ${v.price.famille}): si apre direttamente una conversazione precompilata con il nostro team su `,
          wa('activate', true),
          ' per una conferma e un’attivazione immediate.',
        ],
      },
    ],
  },
  {
    id: 'delivery',
    q: () => 'Entro quanto tempo riceverò il mio Codice Atlas Pro e le mie credenziali?',
    a: () => [
      {
        p: [
          "Durante il nostro orario di apertura, l'invio del tuo ",
          b('Codice Atlas Pro'),
          ' ufficiale (insieme ai tuoi accessi Xtream / M3U) su WhatsApp e via e-mail, dopo la conferma del pagamento, è quasi istantaneo (generalmente in meno di 3-15 minuti).',
        ],
      },
    ],
  },
  {
    id: 'email',
    q: () => "Non ho ricevuto l'e-mail entro i tempi previsti: devo preoccuparmi?",
    a: () => [
      {
        p: [
          'No, stai tranquillo. Le nostre spedizioni sono garantite 7 giorni su 7. Se non trovi nulla nella posta indesiderata (spam), scrivi semplicemente al nostro team su ',
          wa('contact', true),
          ': un consulente ti invierà subito il tuo Codice Atlas Pro direttamente in chat.',
        ],
      },
    ],
  },
  {
    id: 'otherApps',
    q: () => 'Posso usare il mio abbonamento Atlas Pro ONTV su altre applicazioni IPTV?',
    a: (v) => [
      {
        p: [
          `Sì, assolutamente! Oltre alle nostre ${v.appCount} applicazioni ufficiali gratuite (`,
          b(`Atlas Pro ONTV ${v.ontv}`),
          ', ',
          b(`Atlas Pro Max v${v.max}`),
          ', ',
          b(`Atlas Pro IBO v${v.ibo}`),
          ', ',
          b('Atlas Pro 9X'),
          '), ti consigliamo ottimi player a pagamento come IBO Player, IBO Player Smarter, Hot Player o Bob Player per le Smart TV Samsung/LG e Apple, oppure player gratuiti come IPTV Smarters Pro (con credenziali Xtream o M3U).',
        ],
      },
    ],
  },
  {
    id: 'renew',
    q: () => 'Come rinnovo il mio Codice Atlas Pro attuale?',
    a: (v) => [
      {
        p: [
          'Clicca sul pulsante ',
          { to: 'renewal', text: '« Rinnova qui (Inserisci il tuo Codice Atlas Pro) »' },
          ' oppure contattaci direttamente su ',
          wa('renewal'),
          ` indicando il tuo codice o identificativo attuale. Appena confermato il pagamento (PayPal o SEPA), il tuo abbonamento viene prolungato di ${v.months} mesi in pochi minuti.`,
        ],
      },
    ],
  },
  {
    id: 'keepFavorites',
    q: () => 'Posso rinnovare mantenendo i miei preferiti e la mia applicazione attuale?',
    a: () => [
      {
        p: [
          "Sì! Mantieni l'applicazione già installata e le tue liste dei preferiti, senza dover reinstallare nulla.",
        ],
      },
    ],
  },
  {
    id: 'download',
    q: (v) => `Come scaricare l'applicazione ufficiale Atlas Pro ONTV ${v.ontv} APK e Atlas Pro Max v${v.max}?`,
    a: () => [
      {
        p: [
          'Vai alla nostra sezione ',
          { to: 'install', text: '« Guide di Installazione & Download »' },
          " qui sopra: clicca direttamente sul pulsante viola di download APK della versione che preferisci, oppure inserisci il suo Codice Downloader ufficiale nell'applicazione Downloader sulla tua TV/Box/Firestick.",
        ],
      },
    ],
  },
  {
    id: 'activation',
    q: (v) =>
      `Che differenza c'è nell'attivazione tra Atlas Pro ONTV ${v.ontv}, Atlas Pro Max v${v.max}, IBO v${v.ibo} e 9X?`,
    a: (v) => [
      {
        ul: [
          [b(`Atlas Pro ONTV ${v.ontvLine} (v${v.ontv}):`), ' Si attiva solo con il tuo Code Active (Codice Atlas Pro).'],
          [
            b(`Atlas Pro Max (Versione ${v.max}):`),
            ' Si attiva, a tua scelta, con il tuo Code Active OPPURE con Nome utente (Username) + Password.',
          ],
          [b(`Atlas Pro IBO (Versione ${v.ibo}):`), ' Si attiva con il tuo Code Active.'],
          [b('Atlas Pro 9X:'), ' Si attiva con Nome utente (Username) + Password.'],
        ],
      },
      {
        note: [
          b('Attenzione:'),
          " non acquistare la Fire TV Stick HD di 2ª generazione con il sistema chiuso Vega OS, perché blocca l'applicazione Downloader.",
        ],
      },
    ],
  },
  {
    id: 'replace',
    q: () => 'Cosa sostituisce Atlas Pro ON TV nel 2026?',
    a: (v) => [
      {
        p: [
          `Niente sostituisce l'originale: nel 2026 Atlas Pro ONTV si è reinventato con la propria suite ufficiale di nuova generazione (Atlas Pro ONTV v${v.ontv}, Atlas Pro Max v${v.max}, Atlas Pro IBO v${v.ibo} e Atlas Pro 9X), spinta da una nuova architettura server europea anti-interruzione al ${v.uptime}%.`,
        ],
      },
    ],
  },
  {
    id: 'countries',
    q: () => "L'abbonamento Atlas Pro ONTV funziona in Francia, Belgio, Svizzera, Canada e all'estero?",
    a: () => [
      {
        p: [
          'Sì, il nostro servizio funziona ovunque nel mondo purché tu disponga di una connessione Internet stabile (Francia, Belgio, Svizzera, Canada, Europa, USA, Nord Africa, ecc.), senza bisogno di VPN.',
        ],
      },
    ],
  },
  {
    id: 'screens',
    q: () => 'Posso usare il mio abbonamento su più schermi contemporaneamente?',
    a: (v) => [
      {
        p: [
          `Il piano Premium (${v.price.premium}) include ${v.screens.premium} schermo attivo. Se vuoi guardare i tuoi programmi su più schermi contemporaneamente in famiglia, scegli direttamente il nostro `,
          { to: 'pricing', text: `Piano Duo ${v.screens.duo} Écrans` },
          ` (${v.price.duo} / ${v.months} mesi) o il nostro `,
          { to: 'pricing', text: `Piano Famille ${v.screens.famille} Écrans` },
          ` (${v.price.famille} / ${v.months} mesi), che ti forniscono ${v.screens.duo} o ${v.screens.famille} codici ufficiali indipendenti!`,
        ],
      },
    ],
  },
  {
    id: 'oldTv',
    q: () => 'Ho un televisore datato (non Smart): quale soluzione proponete?',
    a: () => [
      {
        p: [
          'Ti basta collegare un box Android TV certificato (Xiaomi Mi Box, Mecool, Formuler) o una chiavetta Amazon Fire TV Stick 4K / 4K Max (con Fire OS) alla porta HDMI del tuo televisore per trasformarlo in una Smart TV velocissima, compatibile con tutte le nostre applicazioni gratuite.',
        ],
      },
    ],
  },
  {
    id: 'trust',
    q: () => 'Perché fidarsi del nostro portale ufficiale come distributore autorizzato?',
    a: (v) => [
      {
        p: [
          `Siamo il portale autorizzato di riferimento in Francia e in Europa, con oltre ${v.customers} clienti soddisfatti, codici ufficiali al 100% garantiti per ${v.months} mesi, nessun addebito con carta di credito sul sito (pagamento sicuro con PayPal o SEPA), una garanzia soddisfatto o rimborsato e un supporto tecnico umano che risponde in meno di ${v.supportMinutes} minuti su `,
          wa('contact'),
          '.',
        ],
      },
    ],
  },
  {
    id: 'samsungLg',
    q: (v) => `Perché l'applicazione sulla mia TV Samsung o LG è a pagamento (~${v.playerPrice}) e come si attiva?`,
    a: (v) => [
      {
        p: [
          `Poiché l'applicazione ufficiale Atlas Pro non è presente negli store chiusi di Samsung e LG, è necessario usare un player partner (IBO Player, IBO Player Smarter, Hot Player, Bob Player) che costa circa ${v.playerPrice} / anno (dopo ${v.trialDays} giorni di prova gratuita). Questi player offrono una stabilità impeccabile, un'EPG istantanea e la ripresa della riproduzione VOD esattamente dal secondo in cui ti eri fermato.`,
        ],
      },
      {
        p: [
          'Per semplificarti la vita, il nostro team può attivare direttamente questo player per te e caricarci contemporaneamente il tuo abbonamento Atlas Pro: inviaci semplicemente il tuo indirizzo MAC e il Device Key su ',
          wa('help', true),
          '!',
        ],
      },
    ],
  },
  {
    id: 'content',
    q: () => "Quali contenuti e canali sono inclusi nell'abbonamento Atlas Pro 2026?",
    a: (v) => [
      {
        p: [
          `Il tuo abbonamento include +${v.channels} canali in diretta (Francia, Europa, internazionali, di cui +${v.sportsChannels} canali sportivi premium in Full HD H.265), +${v.films} film e +${v.series} serie (${v.episodes} episodi) in 4K e Full HD aggiornati ogni giorno, oltre al Replay di ${v.replayDays} giorni su +${v.replayChannels} canali.`,
        ],
      },
    ],
  },
  {
    id: 'connect',
    q: () =>
      'Come risolvere i problemi « Atlas Pro non riesce a connettersi al server », « Atlas Pro ON TV errore di riproduzione » o « Perché Atlas Pro TV non funziona più »?',
    a: (v) => [
      {
        cards: [
          [
            b("Caso N°1 — Sull'applicazione ufficiale Atlas Pro (Android / TV Box):"),
            " I messaggi « Atlas Pro non riesce a connettersi al server » o « errore di riproduzione » compaiono in genere quando si usa una vecchia versione dell'applicazione, in caso di bug temporaneo o di incompatibilità con un sistema Android troppo vecchio (le nostre applicazioni sono ottimizzate per i televisori Google TV, gli smartphone e i TV Box con una versione recente di Android). ",
            b('Soluzione:'),
            ` Prova a reinserire i tuoi dati, svuota la cache dell'applicazione nelle impostazioni del dispositivo e accedi di nuovo, oppure installa l'ultimo aggiornamento ufficiale (Atlas Pro ONTV ${v.ontv} o Atlas Pro Max v${v.max}).`,
          ],
          [
            b('Caso N°2 — Messaggio « La playlist non funziona » su IBO Player, Hot Player, Bob Player o IBO Smarter:'),
            " Su questi player, l'errore indica quasi sempre che il link del server (URL) condiviso deve essere aggiornato. Basta quindi modificare il link o aggiornare i dati del server. ",
            b('Soluzione immediata:'),
            ' Contatta semplicemente il nostro team di supporto su ',
            wa('contact', true),
            '; i nostri tecnici aggiorneranno il tuo link e ripristineranno la tua playlist da remoto in pochi secondi!',
          ],
        ],
      },
    ],
  },
  {
    id: 'apple',
    q: () => 'Come funziona Atlas Pro su iPhone, iPad o Apple TV (Gratis vs a Pagamento)?',
    a: (v) => [
      {
        p: [
          "Poiché l'applicazione nativa Atlas Pro (e Atlas Pro Prime) non è disponibile su iOS/tvOS, sull'App Store hai 2 possibilità:",
        ],
      },
      {
        ol: [
          [
            b('Gratis:'),
            ' Scarica Smarters Pro IPTV (Smarters Player Lite) e chiedi al nostro team su ',
            wa('help'),
            ' i tuoi accessi Xtream (URL + Username + Password) o M3U.',
          ],
          [
            b(`A pagamento, consigliato (~${v.playerPrice} / anno):`),
            ' Scarica IBO Player, Hot Player, IBO Player Smarter o Bob Player per la massima fluidità e la ripresa della riproduzione VOD.',
          ],
        ],
      },
    ],
  },
  {
    id: 'smarters',
    q: () =>
      "INFO per gli utenti LG & SAMSUNG: l'applicazione Smarters mostra l'errore « Failed to authorize », cosa faccio?",
    a: () => [
      {
        p: [
          "La vecchia edizione di Smarters sulle TV Samsung e LG presenta regolarmente dei bug (« Failed to authorize ») che non dipendono dai nostri server. Scarica l'ultimo aggiornamento di Smarters Pro dal tuo store, oppure passa a IBO Player / Hot Player / Bob Player con l'aiuto del nostro team su ",
          wa('help', true),
          ' per una stabilità definitiva.',
        ],
      },
    ],
  },
  {
    id: 'serverLink',
    q: () => 'Il link del server o il mio codice non funziona quando inserisco i miei dati: perché?',
    a: () => [
      {
        p: [
          "Assicurati prima di tutto che l'URL inizi con ",
          { code: 'http://' },
          ' (senza « s »). Per garantire la massima sicurezza e stabilità in Francia e in Europa, aggiorniamo regolarmente i nostri collegamenti server privati. Contatta semplicemente il nostro supporto su ',
          wa('help', true),
          ' per ricevere subito i parametri aggiornati o lasciare che il nostro team configuri il tuo schermo.',
        ],
      },
    ],
  },
  {
    id: 'enterCode',
    q: () => 'Come si inserisce il codice Atlas Pro e dove trovo il mio identificativo Atlas Pro?',
    a: (v) => [
      {
        p: [
          'Ricevi il tuo Codice Atlas Pro e il tuo identificativo Atlas Pro direttamente su WhatsApp e via e-mail, appena confermato il tuo ordine sul nostro portale ufficiale.',
        ],
      },
      {
        p: [
          b('Come si inserisce il codice Atlas Pro?'),
          ` Apri semplicemente l'applicazione Atlas Pro ONTV ${v.ontv} (o IBO v${v.ibo}), inserisci il codice nel campo dedicato (« Code Active ») e conferma. Sulle versioni Atlas Pro Max v${v.max} o Atlas Pro 9X puoi accedere direttamente con il tuo nome utente (Username) e la tua password.`,
        ],
      },
    ],
  },
  {
    id: 'changeCode',
    q: () => 'Come si cambia il codice su Atlas Pro ONTV?',
    a: () => [
      {
        p: [
          "Per cambiare il codice su Atlas Pro ONTV (ad esempio con un nuovo abbonamento o un cambio di piano), vai alla schermata principale dell'applicazione e clicca su ",
          b('Disconnetti / Cambia utente'),
          ', oppure vai nelle impostazioni del tuo dispositivo Android (',
          b('App > Atlas Pro ONTV > Cancella dati e cache'),
          "). Poi riavvia l'applicazione e inserisci il tuo nuovo Codice Atlas Pro.",
        ],
      },
    ],
  },
  {
    id: 'installTv',
    q: () => 'Come installare Atlas Pro sulla TV (Samsung, LG, TCL, Sony) e come mettere Atlas Pro sulla TV?',
    a: (v) => [
      {
        p: [
          'Ti stai chiedendo come mettere Atlas Pro sulla TV o come installare Atlas Pro sul televisore? Il metodo dipende dalla marca del tuo televisore:',
        ],
      },
      {
        ul: [
          [
            b('Come installare Atlas Pro sulla TV TCL, Sony, Philips o Xiaomi (Android TV / Google TV):'),
            " Installa l'applicazione gratuita Downloader dal Google Play Store, poi inserisci ",
            { to: 'apps', text: 'il nostro codice Downloader' },
            ` per scaricare gratuitamente Atlas Pro ONTV ${v.ontv} APK.`,
          ],
          [
            b('Come installare Atlas Pro sulla TV Samsung e come installare Atlas Pro ONTV sulla TV LG:'),
            ' Apri lo store ufficiale del tuo televisore, installa IBO Player, Hot Player, Bob Player o IBO Smarter Player, poi invia il tuo indirizzo MAC e il Device Key al nostro team su ',
            wa('help', true),
            ', che attiverà il tuo schermo da remoto in 2 minuti.',
          ],
        ],
      },
    ],
  },
  {
    id: 'fireTv',
    q: () => 'Come installare Atlas Pro su Fire TV, come installare Atlas Pro ONTV su Chromecast e su iPad?',
    a: (v) => [
      {
        ul: [
          [
            b('Come installare Atlas Pro su Fire TV e come installare Atlas Pro ONTV su Chromecast:'),
            " Scarica l'applicazione Downloader sulla tua chiavetta Amazon Fire TV Stick (4K, Max, Lite) o sul tuo Chromecast con Google TV, autorizza le origini sconosciute e inserisci ",
            { to: 'apps', text: 'il codice di download' },
            ` della nostra suite gratuita (Atlas Pro ONTV ${v.ontv}, Max v${v.max}, IBO v${v.ibo} o 9X).`,
          ],
          [
            b('Come installare Atlas Pro su iPad e iPhone:'),
            " Vai sull'App Store, scarica un player gratuito (Smarters Pro IPTV) o un player ad alte prestazioni (IBO Player, Hot Player, Bob Player) e contatta il nostro ",
            wa('help', false, 'supporto WhatsApp'),
            ' per ricevere le tue credenziali Xtream / M3U o attivare il tuo dispositivo.',
          ],
        ],
      },
    ],
  },
  {
    id: 'cast',
    q: () => 'Come trasmettere Atlas Pro ONTV sul mio televisore?',
    a: () => [
      {
        p: [
          "Per trasmettere Atlas Pro ONTV dal tuo smartphone o tablet al televisore, assicurati che i due dispositivi siano connessi alla stessa rete Wi-Fi, poi usa la funzione Trasmetti / Duplicazione schermo (Chromecast o AirPlay). Tuttavia, per una fluidità ottimale in Full HD H.265 e 4K senza latenza, ti consigliamo di installare l'applicazione direttamente sulla tua Smart TV, Fire TV Stick, Chromecast con Google TV o Box Android.",
        ],
      },
    ],
  },
]

export const faq: Dict['faq'] = {
  badge: 'AIUTO, SUPPORTO & FAQ UFFICIALE',
  title: 'Le Tue Domande Frequenti – ATLAS PRO ONTV',
  titleHighlight: 'ATLAS PRO ONTV',
  subtitle:
    "Tutto quello che c'è da sapere prima, durante e dopo l'ordine del tuo abbonamento Atlas Pro ONTV sul nostro portale ufficiale.",
  help: {
    title: 'Non trovi la tua risposta?',
    text: (minutes: string) =>
      `Il nostro supporto tecnico umano ti risponde in meno di ${minutes} minuti su WhatsApp, 7 giorni su 7.`,
    button: 'Scrivi al supporto WhatsApp',
  },
  whatsapp: 'WhatsApp',
  items,
}
