// Italian copy, legal pages: note legali, privacy, condizioni generali.
// Translation of ../fr/legal.ts (owner of the source: pages). Same keys, same shapes. French law references stay
// French law references; every term the client has not given stays a « pending » row.
import type { Dict } from '../types.ts'

export const legal: Dict['legal'] = {
  common: {
    badge: 'Informazioni legali',
    updatedLabel: 'Ultimo aggiornamento:',
    updated: '25 ottobre 2026',
    toc: 'Indice',
    others: 'Altri documenti',
    docs: {
      mentions: 'Note legali',
      confidentialite: 'Informativa sulla privacy',
      conditions: 'Condizioni Generali & Garanzia Soddisfatto o Rimborsato',
    },
    help: {
      title: 'Hai una domanda su queste informazioni?',
      text: 'Il nostro team ti risponde su WhatsApp 7 giorni su 7, in francese.',
      cta: 'Scrivici su WhatsApp',
    },
    contact: {
      whatsapp: 'WhatsApp',
      email: 'E-mail',
    },
    pending: {
      companyName: 'ragione sociale del titolare del sito',
      legalForm: 'forma giuridica (e capitale sociale, se previsto)',
      address: 'indirizzo della sede',
      registration: 'iscrizione al registro (RCS / SIREN, partita IVA intracomunitaria)',
      publisher: 'nome del direttore della pubblicazione',
      host: 'fornitore di hosting del sito (nome, indirizzo, telefono)',
      email: 'indirizzo e-mail del supporto',
    },
  },

  mentions: {
    title: 'Note legali',
    lead: (domain: string) =>
      `Informazioni sul titolare e sul fornitore di hosting del sito ${domain}, pubblicate ai sensi dell’articolo 6 della legge francese n. 2004-575 del 21 giugno 2004 per la fiducia nell’economia digitale (LCEN).`,
    publisher: {
      title: 'Titolare del sito',
      intro: (seller: string, domain: string) =>
        `Il sito ${domain} è pubblicato da ${seller}, distributore ufficiale autorizzato Atlas Pro ONTV.`,
      rows: {
        tradeName: 'Nome commerciale',
        domain: 'Indirizzo del sito',
        activity: 'Attività',
        companyName: 'Ragione sociale',
        legalForm: 'Forma giuridica',
        address: 'Sede',
        registration: 'Iscrizione al registro',
      },
      activity:
        'Distribuzione e attivazione di codici di abbonamento Atlas Pro, assistenza all’installazione e supporto clienti.',
    },
    director: {
      title: 'Direttore della pubblicazione',
      label: 'Direttore della pubblicazione',
    },
    contact: {
      title: 'Contatti',
      intro: 'Per qualsiasi domanda sul sito o sul tuo abbonamento:',
    },
    host: {
      title: 'Hosting',
      label: 'Fornitore di hosting',
    },
    ip: {
      title: 'Proprietà intellettuale',
      paragraphs: [
        'La struttura del sito, i suoi testi, le sue illustrazioni e i suoi elementi grafici sono protetti dalla normativa sulla proprietà intellettuale. È vietata qualsiasi riproduzione o rappresentazione, totale o parziale, senza la previa autorizzazione scritta del titolare del sito.',
        'I marchi, i nomi e i loghi delle applicazioni e dei player citati sul sito appartengono ai rispettivi titolari. Sono menzionati solo per indicare la compatibilità del servizio.',
      ],
    },
    links: {
      title: 'Link a servizi di terzi',
      paragraphs: [
        'Il sito rimanda a servizi di terzi: WhatsApp per gli ordini e l’assistenza, oltre alle pagine di download delle applicazioni ufficiali e dei player partner. Questi servizi sono soggetti alle proprie condizioni; il titolare del sito non è responsabile né del loro contenuto né della loro disponibilità.',
      ],
    },
    accuracy: {
      title: 'Esattezza delle informazioni',
      paragraphs: [
        'Il titolare del sito si impegna a garantire l’esattezza delle informazioni pubblicate (piani, numero di canali e di contenuti, versioni delle applicazioni, guide di installazione). Queste informazioni possono cambiare: in caso di dubbio, il nostro team ti conferma i dati aggiornati su WhatsApp.',
      ],
    },
    data: {
      title: 'Dati personali',
      before: 'Il trattamento dei tuoi dati personali è descritto nella nostra ',
      link: 'Informativa sulla privacy',
      after: '.',
    },
  },

  privacy: {
    title: 'Informativa sulla privacy',
    lead: (seller: string, domain: string) =>
      `Quali dati vengono trattati quando visiti ${domain} o ordini un abbonamento Atlas Pro presso ${seller}, perché, e come esercitare i tuoi diritti.`,
    summary: {
      title: 'In breve',
      items: [
        'Nessun account cliente, nessun modulo e nessun pagamento sul sito.',
        'Nessun cookie, nessun tracciatore pubblicitario né strumento di misurazione del pubblico.',
        'I tuoi ordini passano da una conversazione WhatsApp che apri tu stesso.',
        'I tuoi dati servono a gestire il tuo ordine, a consegnarti i codici e ad assisterti.',
      ],
    },
    controller: {
      title: 'Titolare del trattamento',
      before: (seller: string) =>
        `Il titolare del trattamento è ${seller}, titolare del sito. I suoi dati identificativi completi sono riportati nelle `,
      link: 'note legali',
      after: '.',
    },
    notCollected: {
      title: 'Cosa il sito non raccoglie',
      items: [
        'Nessun account cliente né area personale.',
        'Nessun modulo: nulla di ciò che leggi o scegli sul sito ci viene trasmesso.',
        'Nessun pagamento sul sito: non vengono richiesti né registrati dati di carte di pagamento.',
        'Nessun cookie, nessun tracciatore pubblicitario, nessuno strumento di misurazione del pubblico.',
        'I font sono ospitati insieme al sito: il tuo browser non contatta alcun servizio di terzi per visualizzare le pagine.',
      ],
    },
    browsing: {
      title: 'Navigazione sul sito',
      paragraphs: [
        'Come qualsiasi server web, il fornitore di hosting del sito può registrare dati tecnici di connessione (indirizzo IP, data e ora, pagina richiesta, tipo di browser) per garantire la sicurezza e il corretto funzionamento del sito. Base giuridica: il nostro legittimo interesse a proteggere il sito.',
      ],
    },
    whatsapp: {
      title: 'Ordini e assistenza su WhatsApp',
      intro: [
        'I pulsanti di ordine, attivazione, rinnovo e assistenza aprono WhatsApp con un messaggio precompilato. Nulla ci viene trasmesso finché non invii quel messaggio.',
        'Quando ci scrivi, trattiamo le informazioni che ci comunichi nella conversazione:',
      ],
      items: [
        'il tuo numero WhatsApp e il nome del tuo profilo;',
        'il piano scelto, il tuo dispositivo e il metodo di pagamento scelto;',
        'il tuo indirizzo e-mail, per l’invio del tuo Codice Atlas Pro e delle tue credenziali;',
        'il tuo codice o identificativo attuale in caso di rinnovo;',
        'le informazioni utili all’assistenza (dispositivo, applicazione, messaggio di errore, screenshot che scegli di inviare).',
      ],
      outro: [
        'Questi dati servono a gestire il tuo ordine, a consegnarti e attivare i tuoi codici, ad assisterti e a gestire i tuoi rinnovi. Base giuridica: l’esecuzione del contratto che concludi con noi (articolo 6, paragrafo 1, lettera b) del GDPR).',
        'WhatsApp è un servizio di terzi, soggetto alle proprie condizioni d’uso e alla propria informativa sulla privacy.',
      ],
    },
    payment: {
      title: 'Pagamento',
      paragraphs: [
        'Il pagamento avviene tramite PayPal o bonifico bancario SEPA, secondo le informazioni fornite nella conversazione WhatsApp. Nessun pagamento avviene sul sito.',
        'Riceviamo le informazioni della transazione: nome del titolare, importo, data e riferimento del pagamento (e, per un bonifico, le coordinate bancarie che figurano sull’operazione). PayPal tratta i tuoi dati di pagamento secondo la propria informativa sulla privacy.',
        'Questi dati servono a confermare il tuo pagamento e a rispettare i nostri obblighi contabili. Base giuridica: l’esecuzione del contratto e i nostri obblighi di legge.',
      ],
    },
    recipients: {
      title: 'Destinatari',
      team: (seller: string) =>
        `I tuoi dati sono trattati dal team di ${seller} e dai fornitori necessari al servizio: WhatsApp (messaggistica), PayPal o la tua banca (pagamento), il fornitore di hosting del sito (dati tecnici di connessione).`,
      transfers:
        'Alcuni di questi fornitori possono trattare dati al di fuori dell’Unione europea, nel rispetto delle garanzie previste dal GDPR.',
    },
    retention: {
      title: 'Periodi di conservazione',
      intro:
        'Conserviamo i tuoi dati per il tempo necessario alle finalità sopra descritte, poi li cancelliamo, salvo obblighi di conservazione previsti dalla legge.',
      rows: {
        order: { label: 'Conversazione e dati dell’ordine', what: 'periodo di conservazione delle conversazioni e dei dati degli ordini' },
        accounting: { label: 'Pagamenti e documenti contabili', what: 'periodo di conservazione dei dati di pagamento e dei documenti contabili' },
        logs: { label: 'Dati tecnici di connessione', what: 'periodo di conservazione dei log del fornitore di hosting' },
      },
    },
    rights: {
      title: 'I tuoi diritti',
      paragraphs: [
        'Ai sensi del Regolamento generale sulla protezione dei dati (GDPR) e della legge francese « Informatique et Libertés », hai il diritto di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei tuoi dati.',
        'Per esercitare questi diritti, scrivici su WhatsApp o via e-mail (recapiti qui sotto). Ti rispondiamo entro un mese al massimo.',
        'Se ritieni che i tuoi diritti non siano rispettati, puoi presentare un reclamo all’autorità di protezione dei dati del tuo Paese (in Francia, la CNIL).',
      ],
    },
    cookies: {
      title: 'Cookie',
      paragraphs: [
        'Il sito non installa alcun cookie e non utilizza alcun tracciatore: non è quindi necessario alcun banner di consenso. Se ciò dovesse cambiare, questa informativa verrebbe aggiornata e il tuo consenso richiesto quando la legge lo impone.',
      ],
    },
    changes: {
      title: 'Modifiche',
      paragraphs: [
        'Possiamo aggiornare questa informativa per riflettere un’evoluzione del sito o dei nostri servizi. La data dell’ultimo aggiornamento è indicata in cima a questa pagina.',
      ],
    },
  },

  terms: {
    title: 'Condizioni Generali & Garanzia Soddisfatto o Rimborsato',
    lead: (seller: string) =>
      `Le condizioni di vendita degli abbonamenti Atlas Pro offerti da ${seller}, distributore ufficiale autorizzato Atlas Pro ONTV, e la nostra garanzia soddisfatto o rimborsato.`,
    scope: {
      title: 'Oggetto',
      text: (seller: string, domain: string) =>
        `Le presenti condizioni generali disciplinano la vendita degli abbonamenti Atlas Pro da parte di ${seller} ai clienti che ordinano da ${domain} o direttamente su WhatsApp. L’invio di un ordine comporta l’accettazione di queste condizioni.`,
    },
    seller: {
      title: 'Il venditore',
      before: (seller: string) =>
        `Il venditore è ${seller}, distributore ufficiale autorizzato Atlas Pro ONTV. I suoi recapiti completi sono riportati nelle `,
      link: 'note legali',
      after: '.',
    },
    service: {
      title: 'Il servizio',
      offer: (v: { months: string; channels: string; films: string; series: string; replayDays: string; replayChannels: string }) =>
        `L’abbonamento Atlas Pro dà accesso, per ${v.months} mesi, all’offerta Atlas Pro ONTV: +${v.channels} canali in diretta, un catalogo di video on demand (+${v.films} film e +${v.series} serie) e il Replay di ${v.replayDays} giorni su +${v.replayChannels} canali.`,
      codes: 'Ogni piano comprende un Codice Atlas Pro per schermo.',
      apps: (apps: string) =>
        `Il servizio si utilizza con le nostre applicazioni ufficiali gratuite (${apps}) o con un player partner compatibile (credenziali Xtream Codes o link M3U).`,
      players: (price: string, days: string) =>
        `Alcuni player partner, in particolare sulle Smart TV Samsung e LG, sono a pagamento presso il rispettivo sviluppatore (circa ${price} all’anno, dopo una prova gratuita di ${days} giorni). Questo costo non è compreso nell’abbonamento Atlas Pro.`,
      requirements: {
        before: 'Il servizio richiede una connessione Internet e un dispositivo compatibile. Prima di ordinare, consulta le nostre ',
        install: 'guide di installazione',
        middle: ' e la pagina ',
        downloads: 'Scarica',
        after: ', oppure chiedi consiglio al nostro team.',
      },
    },
    plans: {
      title: 'Piani e prezzi',
      intro: 'I piani proposti sono i seguenti:',
      columns: { plan: 'Piano', duration: 'Durata', price: 'Prezzo' },
      names: { premium: 'Premium 1 Écran', duo: 'Duo 2 Écrans', famille: 'Famille 3 Écrans' },
      months: (months: string) => `${months} mesi`,
      pricePending: 'prezzo del piano',
      notes: [
        'I prezzi sono indicati in euro. Il prezzo applicabile è quello visualizzato al momento dell’ordine e confermato nella conversazione WhatsApp.',
      ],
      vat: { label: 'IVA', what: 'indicazione IVA (prezzi IVA inclusa o « IVA non applicabile »)' },
    },
    order: {
      title: 'Ordine',
      steps: [
        'Scegli il tuo piano e clicca sul relativo pulsante: WhatsApp si apre con un messaggio precompilato. Il Negozio ti permette anche di indicare il tuo dispositivo e il metodo di pagamento.',
        'Invia il messaggio: il nostro team ti conferma il piano, il prezzo e le informazioni di pagamento.',
        'L’ordine diventa definitivo dopo la conferma del tuo pagamento.',
      ],
      shop: 'Apri il Negozio',
    },
    payment: {
      title: 'Pagamento',
      paragraphs: [
        'Il prezzo del piano si paga tramite PayPal o bonifico bancario SEPA, secondo le informazioni fornite nella conversazione WhatsApp. Sul sito non avviene alcun pagamento con carta.',
      ],
    },
    delivery: {
      title: 'Consegna e attivazione',
      paragraphs: [
        'Dopo la conferma del pagamento, il tuo Codice Atlas Pro ufficiale (insieme ai tuoi accessi Xtream / M3U) ti viene inviato su WhatsApp e via e-mail. Durante il nostro orario di apertura, l’invio è quasi istantaneo (generalmente in meno di 3-15 minuti).',
        'Non hai ricevuto nulla? Controlla la posta indesiderata (spam), poi scrivi al nostro team su WhatsApp: un consulente ti invierà subito il tuo Codice Atlas Pro direttamente in chat.',
        'Il nostro team ti segue nell’installazione e nell’attivazione sul tuo dispositivo.',
      ],
      rows: {
        hours: { label: 'Orario di apertura', what: 'orario di apertura del team (invio dei codici)' },
        start: { label: 'Decorrenza dell’abbonamento', what: 'decorrenza dell’abbonamento (invio o prima attivazione del codice)' },
      },
    },
    renewal: {
      title: 'Durata e rinnovo',
      paragraphs: [
        (months: string) =>
          `L’abbonamento dura ${months} mesi. Non si rinnova automaticamente: nessun addebito avviene senza una tua richiesta.`,
        (months: string) =>
          `Per rinnovare, contattaci su WhatsApp indicando il tuo codice o identificativo attuale. Appena confermato il pagamento (PayPal o SEPA), il tuo abbonamento viene prolungato di ${months} mesi in pochi minuti. Mantieni l’applicazione già installata e le tue liste dei preferiti, senza reinstallare nulla.`,
      ],
    },
    support: {
      title: 'Assistenza',
      text: (minutes: string) =>
        `Il nostro supporto clienti, 100% in francese, è disponibile 7 giorni su 7 su WhatsApp e via e-mail: aiuto all’installazione, download delle applicazioni, recupero di codici smarriti o diagnosi della connessione. Rispondiamo in media in meno di ${minutes} minuti, anche la sera e nei fine settimana.`,
    },
    guarantee: {
      title: 'Garanzia Soddisfatto o Rimborsato',
      quote: 'Provalo senza rischi: garanzia soddisfatto o rimborsato se non fa per te.',
      continuity: (months: string) =>
        `Garanzia & Assistenza Continua: supporto personalizzato e garanzia totale di continuità per tutti i ${months} mesi del tuo abbonamento.`,
      how: 'Per far valere la garanzia, contatta il nostro team su WhatsApp o via e-mail indicando il tuo codice o identificativo Atlas Pro.',
      rows: {
        window: { label: 'Termine per richiederla', what: 'termine per richiedere il rimborso' },
        conditions: { label: 'Condizioni', what: 'condizioni della garanzia soddisfatto o rimborsato' },
        amount: { label: 'Importo rimborsato', what: 'importo rimborsato (totale o pro rata)' },
        method: { label: 'Modalità e tempi di rimborso', what: 'modalità e tempi del rimborso' },
      },
    },
    withdrawal: {
      title: 'Diritto di recesso',
      label: 'Diritto di recesso',
      what: 'diritto di recesso: termine, modalità di esercizio, e caso di un codice fornito immediatamente con il tuo consenso',
    },
    disputes: {
      title: 'Reclami e controversie',
      text: 'In caso di difficoltà, contatta prima il nostro team su WhatsApp o via e-mail: cercheremo insieme una soluzione amichevole.',
      rows: {
        mediator: { label: 'Mediatore dei consumatori', what: 'mediatore dei consumatori (nome e recapiti)' },
        law: { label: 'Legge applicabile e foro competente', what: 'legge applicabile e foro competente' },
      },
    },
    changes: {
      title: 'Modifica delle condizioni',
      text: 'Le condizioni applicabili al tuo ordine sono quelle in vigore alla data dell’ordine stesso.',
    },
  },
}
