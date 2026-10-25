// Italian copy, home installation hub (9 devices, app matrix, warnings, technical questions, help banner).
// Translation of ../fr/install.ts (owner of the source: install). Same keys, same shapes, same inline markers
// (**bold**, `code`, {wa}, {waShort}, {price}, {trial}, {app:…}, {ver:…}, {pcode:…}, [text](#anchor)).
import type { InstallCopy } from '../fr/install.ts'

export const install: InstallCopy = {
  badge: '✨ Guide visive 2026 · Distributore autorizzato Atlas Pro ONTV',
  title: 'Installazione Atlas Pro ONTV 2026: Guide Interattive Passo dopo Passo & Download APK',
  subtitle: (minutes) =>
    `Seleziona il dispositivo su cui vuoi guardare i tuoi programmi, poi segui i semplici passaggi. La maggior parte dei nostri abbonati è operativa in meno di ${minutes} minuti.`,
  kpis: {
    fast: { value: (minutes) => `< ${minutes} min`, label: 'Installazione Rapida' },
    compat: { value: '100%', label: 'Compatibile con Tutti gli Schermi' },
    support: { value: '7/7 · 24/7', label: 'Supporto Tecnico Incluso' },
  },

  selector: {
    title: 'Scegli il tuo dispositivo',
    hint: 'La guida passo dopo passo per il tuo dispositivo appare qui sotto.',
    listLabel: 'Dispositivi',
    change: 'Cambia dispositivo',
    current: 'Il tuo dispositivo',
    devices: {
      smartTv: { name: 'Smart TV', detail: 'Samsung Tizen, LG webOS, Sony, Philips...' },
      firestick: { name: 'Amazon Firestick', detail: 'Fire TV Stick 4K / Max / Lite / Cube' },
      android: { name: 'Android', detail: 'Smartphone, Tablet, Google TV, TV Box Xiaomi / Mecool' },
      apple: { name: 'iPhone / iPad / Apple TV', detail: 'iOS, iPadOS & tvOS' },
      windows: { name: 'PC Windows', detail: 'Applicazione ufficiale & Microsoft Store' },
      mac: { name: 'Mac', detail: 'macOS' },
      linux: { name: 'Linux', detail: 'Applicazione ufficiale & Player' },
      mag: { name: 'MAG Box & Formuler / Dreamlink', detail: 'MyTVOnline 2 & 3' },
      shield: { name: 'Nvidia Shield', detail: 'Android TV ad Alte Prestazioni' },
    },
  },

  stepLabel: (n) => `Passaggio ${n}`,

  guides: {
    smartTv: {
      kicker: 'Smart TV (Samsung Tizen & LG WebOS)',
      title: 'Come installare Atlas Pro ONTV su TV Samsung & LG',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '💡 NOTA IMPORTANTE (TV SAMSUNG & LG vs ANDROID TV)',
          body: [
            "L'applicazione nativa **Atlas Pro ONTV** non è disponibile direttamente negli store ufficiali Samsung (Tizen) e LG (WebOS). I player ad alte prestazioni compatibili con questi televisori (**IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Bob Player**) sono **applicazioni a pagamento indipendenti (circa ~{price} / anno dopo {trial} giorni di prova gratuita)**. Garantiscono una guida EPG istantanea, una stabilità Full HD impeccabile (4K sulla VOD) e la ripresa della riproduzione di film e serie esattamente dal secondo in cui ti eri fermato. Anche se puoi attivarli da solo, **ti consigliamo vivamente di lasciare al nostro team tecnico l'attivazione completa dell'applicazione E il caricamento del tuo abbonamento Atlas Pro, in un'unica operazione**: inviaci semplicemente il tuo **MAC Address** e il tuo **Device Key** su {wa}, il nostro team si occupa di tutto dalla A alla Z!",
            "(Nota: per le TV Sony, TCL e Xiaomi con Android TV / Google TV, l'applicazione ufficiale Atlas Pro è gratuita al 100% tramite Downloader).",
          ],
        },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Avvertenza su Smarters Pro per Smart TV',
          body: [
            "Sconsigliamo l'uso della vecchia versione di IPTV Smarters Pro sulle TV Samsung e LG (provoca interruzioni, blocchi ed errori di autorizzazione che non dipendono dal nostro server). **Perché preferire i player a pagamento (IBO Player, IBO Player Smarter, Bob Player, Hot Player)?** Offrono **{trial} giorni di prova gratuita**, una stabilità Full HD impeccabile (4K sulla VOD), il caricamento istantaneo della guida EPG e la **ripresa della riproduzione di film e serie esattamente dal secondo in cui ti eri fermato**.",
          ],
        },
        {
          kind: 'steps',
          title: 'Samsung & LG: passaggi di installazione',
          steps: [
            { text: 'Accendi il televisore e apri lo store ufficiale (**Samsung Apps** o **LG Content Store**).' },
            { text: 'Cerca e installa **IBO Player**, **IBO Player Smarter**, **Hot Player** o **Bob Player**.' },
            { text: "Apri l'applicazione per visualizzare il tuo **MAC Address** e il tuo **Device Key**." },
            {
              text: 'Invia una foto dello schermo al nostro {wa}: il nostro team attiva la tua applicazione e carica il tuo **abbonamento Atlas Pro ONTV** da remoto in meno di 2 minuti!',
            },
          ],
        },
      ],
    },

    firestick: {
      kicker: 'Amazon Fire TV Stick (4K, 4K Max, Lite, Cube)',
      title: 'Come installare Atlas Pro ONTV su Amazon Fire TV Stick',
      blocks: [
        {
          kind: 'notice',
          tone: 'alert',
          title: "🚨 AVVERTENZA UFFICIALE SULL'AMAZON FIRE TV STICK HD DI 2ª GENERAZIONE (VEGA OS)",
          body: [
            'Raccomandiamo vivamente ai nostri clienti di **non acquistare il modello Amazon Fire TV Stick HD (2ª generazione)**. Questo modello recente funziona con il sistema chiuso **Vega OS**, a differenza delle versioni precedenti con Android / Fire OS:',
          ],
          points: [
            { mark: 'no', text: "L'applicazione **Downloader** non è disponibile su questo modello." },
            { mark: 'no', text: "L'installazione di applicazioni esterne o di file **Atlas Pro ONTV APK** è bloccata." },
            {
              mark: 'yes',
              text: '**Soluzione consigliata:** scegli un modello **Fire TV Stick 4K, 4K Max, Lite o Cube** (con Fire OS) oppure un box Android TV (Xiaomi, Mecool, Formuler) compatibile al 100% con Downloader.',
            },
          ],
        },
        {
          kind: 'steps',
          title: 'Passaggi, codici Downloader e attivazione su Fire Stick',
          steps: [
            {
              title: 'Installa Downloader',
              text: "Dalla schermata Home della Fire TV, vai su Cerca (lente d'ingrandimento), digita **Downloader** e installa l'applicazione ufficiale arancione.",
            },
            {
              title: 'Attiva le Opzioni sviluppatore',
              text: 'Vai su **Impostazioni > La mia Fire TV > Informazioni**, poi clicca **7 volte di seguito rapidamente** sul nome della tua Fire TV Stick finché non compare il messaggio « Ora sei uno sviluppatore ».',
            },
            {
              title: 'Autorizza le origini sconosciute',
              text: "In **Opzioni sviluppatore > Installa app sconosciute**, imposta l'autorizzazione su **ON** per **Downloader**.",
            },
            {
              title: 'Inserisci il Codice Downloader & Attiva in base alla versione',
              text: 'Apri **Downloader**, inserisci il codice della versione ufficiale che preferisci e attiva il tuo accesso:',
              appCodes: true,
              list: [
                '**Player a Pagamento (~{price}/anno · {trial} gg di prova)** · Bob Player ({pcode:bobPlayer}) · Hot Player ({pcode:hotPlayer}).',
              ],
            },
          ],
        },
      ],
    },

    android: {
      kicker: 'Android: Google TV, Chromecast, TV Sony / TCL / Philips, TV Box Xiaomi / Mecool, smartphone & tablet',
      title: 'Come installare Atlas Pro ONTV su Chromecast & Android TV',
      blocks: [
        {
          kind: 'steps',
          steps: [
            {
              text: "Apri il **Google Play Store** sulla tua Android TV, sul Chromecast con Google TV o sul Box Android, e installa gratuitamente l'applicazione **Downloader**.",
            },
            {
              text: 'Autorizza le origini sconosciute per **Downloader** in Impostazioni > Sicurezza e limitazioni (dopo aver cliccato 7 volte su Build in Informazioni, se la modalità sviluppatore è nascosta).',
            },
            {
              text: "Apri **Downloader**, digita il codice dell'applicazione gratuita che preferisci (**{app:ontv}** con Code Active, **{app:max}** con Username/Password, **{app:ibo}**, oppure **{app:x9}** con Username/Password) o clicca direttamente sui nostri [pulsanti di download APK qui sotto](#apps) da smartphone/tablet.",
              appCodes: true,
            },
          ],
        },
        {
          kind: 'notice',
          tone: 'tip',
          title: '📌 Nota Xtream / M3U & Assistenza da remoto',
          body: [
            'Puoi anche usare le tue credenziali in formato **Xtream Codes** o **M3U** su qualsiasi player. Se non vuoi fare la procedura da solo, invia semplicemente le informazioni della tua applicazione su {wa} e il nostro team configura tutto da remoto!',
          ],
        },
      ],
    },

    apple: {
      kicker: 'Apple (iPhone, iPad & Apple TV — iOS, iPadOS & tvOS)',
      title: 'Apple (iPhone, iPad & Apple TV) — Come installare Atlas Pro ONTV su iOS & tvOS',
      blocks: [
        {
          kind: 'notice',
          tone: 'info',
          title: '📌 Nota Importante (Disponibilità iOS)',
          body: [
            "L'applicazione ufficiale **Atlas Pro** **NON è disponibile su iOS o tvOS** (è disponibile in versione nativa su Android, PC Windows, macOS e Linux). Per guardare il tuo **abbonamento Atlas Pro ONTV** su iPhone, iPad o Apple TV, **hai a disposizione due metodi semplici**:",
          ],
        },
        {
          kind: 'options',
          items: [
            {
              label: 'Opzione 1',
              tag: 'Gratis',
              title: 'Player Gratuito (Smarters Pro IPTV / IPTV Smarters Pro / Smarters Player Lite)',
              text: "Applicazione gratuita molto conosciuta sull'App Store. Richiede un **Link del Server (Server URL) + Nome utente (Username) + Password** in formato **Xtream Codes** (oppure tramite un link **M3U**). Contatta semplicemente il nostro team su {wa} per ricevere gratuitamente i tuoi accessi Xtream / M3U, scarica l'applicazione dall'App Store, inserisci i tuoi dati e goditi il tuo abbonamento!",
            },
            {
              label: 'Opzione 2',
              tag: 'Consigliato',
              recommended: true,
              title: 'Player a Pagamento Consigliati (IBO Player, IBO Player Smarter, Hot Player, Bob Player)',
              text: "Perché li consigliamo vivamente rispetto a Smarters Pro? Per circa **~{price} / anno (dopo {trial} giorni di prova gratuita)**, garantiscono zero interruzioni su iPhone/iPad/Apple TV, una guida EPG ultra-rapida e la **ripresa della riproduzione di film e serie esattamente dal secondo in cui ti eri fermato**. Scarica l'applicazione dall'App Store e inviaci il suo indirizzo MAC + Device Key su {wa}: il nostro team può attivare direttamente l'applicazione e caricare contemporaneamente il tuo abbonamento Atlas Pro!",
              playerLinks: 'ios',
            },
          ],
        },
      ],
    },

    desktop: {
      kicker: 'Come installare Atlas Pro su PC, Mac e Linux',
      title: 'Computer PC Windows, Mac (macOS) & Linux — Installazione Ufficiale & Player',
      blocks: [
        {
          kind: 'options',
          items: [
            {
              label: 'Opzione A',
              tag: 'Gratis',
              recommended: true,
              title: 'Applicazioni Ufficiali Gratuite Atlas Pro',
              text: "Scarica direttamente le nostre versioni ufficiali dedicate **Atlas Pro per PC Windows (.EXE)**, **macOS** o **Linux** con i pulsanti di download qui sotto, avvia l'applicazione e accedi con il tuo **Codice Atlas Pro** (o con le tue credenziali).",
              desktopDownloads: true,
            },
            {
              label: 'Opzione B',
              tag: 'Player',
              title: 'Player alternativi su Microsoft Store & Mac',
              list: [
                '**Gratis (FREE): IPTV Smarters Pro / Expert** (versione desktop aggiornata, fluida e gratuita, con le credenziali Xtream Codes fornite dal nostro supporto).',
                '**Player a Pagamento (~{price} / anno · {trial} giorni di prova gratuita): IBO Player / IBO Player Pro**, **IBO Player Smarter**, **Hot Player**, **Vormedia Sat**. (Nessun uso di VLC o BlueStacks).',
              ],
              playerLinks: 'windows',
            },
          ],
        },
      ],
    },

    mag: {
      kicker: 'Formuler / Dreamlink (MyTVOnline 2 & 3) & MAG Box (Infomir)',
      title: 'Come installare Atlas Pro ONTV su Formuler, Dreamlink & MAG Box',
      blocks: [
        { kind: 'subheading', text: 'Formuler / Dreamlink (MyTVOnline 2 & 3)' },
        {
          kind: 'notice',
          tone: 'warn',
          title: '⚠️ Importante',
          body: [
            'Su Formuler e Dreamlink, la connessione avviene con le tue credenziali **Xtream Codes** (URL del portale + nome utente + password), e non tramite indirizzo MAC.',
          ],
        },
        {
          kind: 'steps',
          steps: [
            { text: 'Apri **MyTVOnline 2 o 3**.' },
            { text: '**Menu > Connessioni > Aggiungi Portale** (Add Portal).' },
            { text: 'Dai un nome al portale (**Atlas Pro**).' },
            { text: 'Imposta « **Login Required** » su **ON**.' },
            { text: "Inserisci l'**URL del Portale**, il **Nome utente** e la **Password** forniti dal nostro team su {waShort}." },
            { text: 'Clicca su **Connect**.' },
          ],
        },
        { kind: 'subheading', text: 'MAG Box (Infomir 254, 256, 322, 520...)' },
        {
          kind: 'steps',
          steps: [
            { text: "Annota l'indirizzo MAC sul retro del box (`00:1A:79:XX:XX:XX`) e invialo al nostro supporto {wa}." },
            { text: 'Ricevi il nostro link **Portal URL** attivato.' },
            { text: 'Vai su **Settings > System Settings > Servers > Portals**.' },
            { text: "Inserisci « Atlas Pro » in **Portal 1 Name** e l'URL in **Portal 1 URL**." },
            { text: 'Salva (**OK**) e riavvia.' },
          ],
        },
      ],
    },

    shield: {
      kicker: 'Nvidia Shield TV / Shield Pro',
      title: 'Come installare Atlas Pro ONTV su Nvidia Shield',
      blocks: [
        {
          kind: 'steps',
          steps: [
            { text: 'Apri il **Google Play Store** sulla tua Nvidia Shield e installa gratuitamente **Downloader**.' },
            {
              text: 'Autorizza le origini sconosciute per Downloader in **Impostazioni > Preferenze dispositivo > Sicurezza e limitazioni**.',
            },
            {
              text: 'Inserisci il codice Downloader della nostra suite ufficiale gratuita ({app:ontv}, {app:max}, {app:ibo} o {app:x9}) oppure di IBO Player Pro ({pcode:iboPlayerPro}).',
              appCodes: true,
            },
            { text: 'Attiva il tuo **Codice Atlas Pro** e goditi il flusso Full HD H.265 e la VOD in 4K.' },
          ],
        },
      ],
    },
  },

  desktop: {
    windows: 'Atlas Pro per Windows (.EXE)',
    mac: 'Atlas Pro per macOS',
    linux: 'Atlas Pro per Linux',
  },
  storeLink: {
    ios: (player) => `${player} sull'App Store`,
    windows: (player) => `${player} per Windows`,
  },

  apps: {
    badge: 'Applicazioni ufficiali gratuite',
    title: 'Scarica Atlas Pro ONTV APK: le 4 Applicazioni Ufficiali Gratuite & i loro Codici Downloader',
    subtitle:
      "Per Android, Google TV, TV Box e Fire TV Stick: digita il codice nell'applicazione Downloader, oppure scarica l'APK direttamente dal tuo smartphone o tablet.",
    free: 'Gratis',
    status: {
      latest: 'Ultima versione ufficiale',
      new: 'Nuova versione',
      previous: 'Versione precedente',
    },
    version: (version) => `Versione ${version}`,
    compatible: (versions) => `compatibile ${versions}`,
    codeLabel: 'Codice Downloader',
    download: (app) => `Scarica ${app} APK`,
    activationLabel: 'Modalità di attivazione',
    activation: {
      code: 'Code Active (Codice Atlas Pro)',
      login: 'Nome utente + Password',
    },
    or: 'oppure',
    notes: {
      ontv: 'Si attiva direttamente con il tuo Code Active, senza link né nome utente da inserire.',
    },
    apkFree: (app) => `${app} APK (Gratis)`,
    activationBy: 'Attivazione con',
    copy: 'Copia',
    copied: 'Copiato!',
    copyAria: (app, code) => `Copia il codice Downloader ${code} di ${app}`,
    redundancy: {
      title: '📌 Nota di Ridondanza Atlas Pro',
      text: 'Ti consigliamo di tenere installate tutte e **4 le versioni ufficiali** sul tuo dispositivo Android o sulla tua Fire TV Stick: se una di esse è in manutenzione tecnica, le altre versioni subentrano immediatamente, senza alcuna interruzione.',
    },
  },

  questions: {
    title: "Domande tecniche sull'installazione",
    items: [
      {
        q: "Ho inserito le mie credenziali ma l'applicazione mostra un errore (« errore di riproduzione » o « Atlas Pro non riesce a connettersi al server »): cosa faccio?",
        a: "Controlla innanzitutto il **link del server (Server URL)**: deve assolutamente iniziare con **http — e non https**. Questa sola lettera è la causa di errore più frequente. Assicurati anche che nessuno spazio invisibile si sia infilato durante il copia-incolla e di usare il metodo di attivazione corretto (**Code Active** su {app:ontv}, oppure **Nome utente + Password** su {app:x9} e Max v{ver:max}). **Ancora bloccato?** Scrivici su {wa}: il nostro team verificherà il tuo **Codice Atlas Pro** e configurerà il tuo player da remoto al posto tuo.",
      },
      {
        q: 'Quale velocità Internet serve per una visione fluida su Atlas Pro ONTV?',
        a: 'Una connessione da **10 a 20 Mbps** è il minimo richiesto per uno streaming fluido in Full HD (H.265). Consigliamo una velocità superiore (**30 Mbps e oltre**) se vuoi goderti appieno i contenuti VOD in **Ultra HD 4K** o se più schermi usano contemporaneamente la stessa connessione Internet di casa.',
      },
      {
        q: 'Devo usare una VPN con il mio abbonamento Atlas Pro?',
        a: "**No, non è obbligatoria**: i nostri accessi ufficiali **Atlas Pro ONTV** integrano collegamenti ottimizzati che evitano i blocchi degli operatori Internet (provider). Se usi comunque una VPN, **scegli assolutamente un server situato nel tuo Paese** (o in un Paese confinante), così da mantenere la massima velocità ed evitare qualsiasi latenza.",
      },
      {
        q: 'Perché su alcuni dispositivi mi serve un player a pagamento (~{price} / anno)?',
        a: "Su una **Smart TV (Samsung / LG) o un dispositivo Apple (iPhone / Apple TV)**, i player a pagamento (**IBO Player, IBO Player Smarter, Bob Player, Hot Player** — circa **~{price} / anno dopo {trial} giorni di prova gratuita**) offrono prestazioni hardware nettamente migliori, funzionano senza alcun blocco e memorizzano il punto di ripresa di film e serie. Su **Android, Google TV, TV Box, Fire TV Stick e PC**, invece, le nostre applicazioni ufficiali **Atlas Pro ONTV (v{ver:ontv}, Max v{ver:max}, IBO v{ver:ibo}, 9X)** funzionano a meraviglia e sono **gratuite al 100%**.",
      },
    ],
  },

  help: {
    title: 'Bloccato a un passaggio? Configuriamo il tuo dispositivo insieme a te.',
    subtitle:
      "Invia un messaggio al nostro team di assistenza su WhatsApp: ti guideremo passo dopo passo oppure attiveremo direttamente da remoto il tuo abbonamento Atlas Pro e il tuo player.",
    button: 'Ricevi assistenza su WhatsApp',
  },
}
