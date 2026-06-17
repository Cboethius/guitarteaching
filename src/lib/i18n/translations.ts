import type { Locale } from "./types";

const de = {
  a11y: {
    skipToContent: "Zum Inhalt springen",
    introVideo: "Vorstellungsvideo: Gitarrenunterricht bei Axe School",
    mainNav: "Hauptnavigation",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schliessen",
    floatingContact: "Kontakt",
    contactWhatsapp: "WhatsApp kontaktieren",
    contactEmail: "E-Mail senden",
  },
  nav: {
    home: "Startseite",
    howITeach: "So unterrichte ich",
    pricing: "Preise",
    how: "Über mich",
    menu: "Menü",
  },
  hero: {
    tagline: "Gitarrenunterricht Zürich",
    title: "Gitarre lernen",
    titleAccent: "Klar erklärt. Mit Geduld und Spass.",
    subtitle:
      "Gitarre lernen braucht Zeit, das ist normal. Ich erkläre Ihnen alles verständlich und passe das Tempo an Sie an.",
    photoAlt: "Christian Boethius spielt E-Gitarre",
    videoTitle: "Intro-Video",
    ctaBook: "Jetzt buchen",
    ctaWhatsapp: "WhatsApp",
    ctaEmail: "E-Mail",
  },
  contact: {
    label: "Vor der Anmeldung:",
    sendLead: "Schreiben Sie mir per ",
    or: " oder ",
    reason:
      "Melden Sie sich gern: Wir klären Format, Termin und Ort, oder ich beantworte Ihre Fragen.",
  },
  about: {
    title: "Über mich",
    p1: "Ich bin Christian, komme ursprünglich aus Schweden und lebe seit über 20 Jahren immer wieder in der Schweiz.",
    p2: "Ich arbeite im Grafikdesign und in der Programmierung. Über viele Jahre habe ich Tauchen und Freediving unterrichtet, von Asien und Mittelamerika über die Karibik bis nach Island.",
    p3: "Jetzt gebe ich in Zürich Gitarrenunterricht und freue mich, Sie auf Ihrem Weg mit diesem Instrument zu begleiten.",
    p4: "Kurz und ehrlich: Gitarrenunterricht ist erst seit Kurzem mein Beruf. Ich bin nicht der beste Gitarrist der Welt. Durch meine Erfahrung beim Unterrichten von Freediving und Tauchen begleite ich Sie auf der langen Strecke: mit Geduld, beim Finden dessen, wie Sie am besten lernen, und auf dem gemeinsamen Weg zu Ihren Zielen an der Gitarre.",
    p5: "Vielleicht passen wir nicht zusammen, und das ist in Ordnung. Günstige Probelektionen sind möglich, aber ich möchte lieber, dass Sie mich zuerst kontaktieren, damit wir besprechen können, wo Sie mit der Gitarre stehen, was Sie ausbremst, was Sie lernen möchten und welches Programm für Sie am besten passt.",
    photoAltCoastal: "Porträt von Christian Boethius",
    galleryTitle: "Fotos",
    galleryIntro:
      "Damit Sie mich ein wenig kennenlernen können: Hier sind einige Bilder von mir auf Reisen und bei der Arbeit in verschiedenen Teilen der Welt, kleine Abenteuer, die ich unterwegs festgehalten habe. Ich hoffe, sie gefallen Ihnen.",
    pillarsTitle: "So unterrichte ich",
    pillarsLead: "Drei Schwerpunkte.",
    pillarsBody: [
      "**Ich richte jede Lektion auf Ihre Bedürfnisse und Ihr Niveau aus.** Ob Sie ein bestimmtes Stück lernen möchten oder Übungsroutinen für zu Hause und unterwegs aufbauen wollen: **Ich bringe Geduld, Verständnis und Klarheit mit.**",
      "**Gemeinsam finden wir heraus, wie Sie am besten lernen,** damit die Frustration nachlässt, wenn Fortschritt langsam wirkt oder unsichtbar bleibt. Ich gebe Ihnen gern Tipps und Kniffe weiter, **die ich mir beim Einstieg gewünscht hätte,** und die mir bis heute helfen, denn auch ich lerne ständig dazu. **Gitarre ist etwas, das Sie ein Leben lang begleiten kann:** Es gibt immer etwas Neues zu entdecken.",
      "**Üben ist wichtig,** aber Motivation und der Alltag passen nicht immer zusammen. **Eine Lektion bei mir lohnt sich auch dann, wenn tägliches Üben schwerfällt.** Ja, Gitarre ist eine Herausforderung, aber in kleinere Abschnitte zerlegt wirkt sie überschaubarer als ein grosser Berg, den man erklimmen muss. **Zeit nehmen ist wichtiger, als an die Spitze zu eilen.**",
    ],
    pillars: [
      {
        title: "Hände und Technik",
        body: "Technik für beide Hände: Griff, Rhythmus, Haltung, ohne dass es steif wirkt.",
      },
      {
        title: "Die Gitarre verstehen",
        body: "Teile kennen, stimmen, Saiten wechseln, einfache Pflege.",
      },
      {
        title: "Musiktheorie für Gitarre",
        body: "Akkorde, Tabs, Tonleitern, so viel, wie Sie für Ihre Songs brauchen.",
      },
    ],
    whatITitle: "Was ich unterrichte",
    whatILead: "Genres und Gitarren.",
    whatIBody: [
      "Rock, Blues, Fingerpicking, Pop, Country, Singer-Songwriter und Metal: Damit kenne ich mich am besten aus. Andere Stile probieren wir gern.",
      "Dazu Grundlagen: Haltung, Stimmen, Akkorde, Rhythmus, Metronom. Darauf bauen wir Songs, Tonleitern und Akkordfolgen auf.",
    ],
    whatIInstruments: [
      {
        title: "E-Gitarre",
        body: "Rhythmus, Soli und Effekte für Rock, Blues und mehr.",
      },
      {
        title: "Akustikgitarre",
        body: "Westerngitarre für Fingerpicking, Country, Pop und Singer-Songwriter.",
      },
    ],
  },
  pricing: {
    title: "Preise",
    trialPrice: "CHF {price}",
    trialNote: "Probelektion",
    bundle5: "5 Lektionen: CHF {price} gesamt",
    bundle10: "10 Lektionen: CHF {price} gesamt",
    chooseAge: "Für wen buchen Sie?",
    sectionRegular: "Erwachsene / Teens",
    sectionChild: "Kinder (unter 14)",
    ctaRegular: "Erwachsene / Teens",
    ctaChild: "Kinder (unter 14)",
    childBookHint: "Kinder: Buchung durch eine erziehungsberechtigte Person",
    zoomTitle: "Zoom (online)",
    neutralTitle: "Neutraler Ort",
    homeTitle: "Bei Ihnen zu Hause",
    bundleLine: "{count} × {price} CHF pro Lektion",
  },
  testimonials: {
    title: "Was Schülerinnen und Schüler sagen",
    exampleLabel: "Beispiel",
    listLabel: "Rückmeldungen",
    goTo: "Rückmeldung {n}",
    starsLabel: "{rating} von 5 Sternen",
  },
  testimonialReview: {
    title: "Rückmeldung schreiben",
    intro:
      "Schreiben Sie kurz, wie der Unterricht für Sie war. Nach meiner Freigabe erscheint der Text auf der Website.",
    quote: "Zitat",
    author: "Name auf der Website (z. B. Laura M.)",
    context: "Hintergrund (z. B. Erwachsene/r Anfänger/in, Zoom)",
    rating: "Bewertung",
    consentName: "Ihr vollständiger Name (intern, wird nicht veröffentlicht)",
    consent:
      "Ich bin einverstanden, dass dieses Zitat unter dem oben genannten Namen auf dieser Website veröffentlicht wird.",
    submit: "Absenden",
    thanks: "Danke! Ich schaue Ihre Rückmeldung an und gebe sie dann frei.",
    alreadySubmitted: "Sie haben das Formular schon ausgefüllt. Danke!",
    notFound: "Dieser Link ist ungültig oder abgelaufen.",
    closed: "Diese Rückmeldung wurde bereits bearbeitet.",
    loading: "Wird geladen",
    error: "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.",
  },
  adminTestimonials: {
    title: "Testimonials verwalten",
    login: "Anmelden",
    password: "Admin-Passwort",
    logout: "Abmelden",
    newLink: "Neuer Link",
    newLinkHint:
      "Link erzeugen und an Schüler/in senden. Sie schreiben das Testimonial selbst, kein Entwurf nötig.",
    createLink: "Link erzeugen",
    reviewLink: "Link für Schüler/in",
    copyLink: "Link kopieren",
    copied: "Kopiert!",
    openLinks: "Offene Links (noch nicht abgesendet)",
    notSubmittedYet: "Link verschickt, wartet auf Absendung durch Schüler/in.",
    pending: "Warten auf Freigabe",
    published: "Veröffentlicht",
    rejected: "Nicht freigegeben",
    avatar: "Avatar",
    avatarHint: "Süsses Meerestier wählen, kein Foto nötig.",
    creatureCrab: "Krebs",
    creatureFish: "Fisch",
    creatureOctopus: "Krake",
    creatureJellyfish: "Qualle",
    creatureSeahorse: "Seepferdchen",
    creatureStarfish: "Seestern",
    approve: "Freigeben",
    reject: "Nicht freigeben",
    delete: "Entfernen",
    deleteConfirm: "Dieses Testimonial wirklich entfernen?",
    empty: "Noch keine Einträge.",
    loginError: "Falsches Passwort.",
    loadError: "Admin konnte nicht geladen werden. Bitte erneut anmelden.",
    notConfigured: "ADMIN_PASSWORD ist nicht gesetzt.",
  },
  book: {
    title: "Unterricht buchen",
    titleRegular: "Buchung, Erwachsene / Teens",
    titleChild: "Buchung, Kinder (unter 14)",
    intro:
      "Probelektion oder Paket wählen, Format festlegen, online oder per TWINT/Bank bezahlen.",
    audienceRequired: "Bitte wählen Sie, für wen die Buchung ist:",
    wrongAgeGroup: "Falsche Altersgruppe?",
    loading: "Formular wird geladen",
    regular: "Erwachsene/Teens",
    child: "Kind (unter 14)",
    lessonKind: "Was möchten Sie buchen?",
    trialLesson: "Probelektion",
    trialHint: "Eine Lektion zum Kennenlernen",
    bundle: "Paket",
    bundleHint: "5 oder 10 Lektionen",
    chooseFormat: "Format wählen",
    bundleSize: "Anzahl Lektionen",
    bundle5: "5 Lektionen",
    bundle10: "10 Lektionen",
    bundleTotal: "{amount} CHF gesamt",
    selectionSummary: "Ihre Auswahl",
    payment: "Zahlung",
    paymentHint:
      "Online: kleine Gebühr für die Kartenzahlung. TWINT/Bank: nur der Unterrichtspreis.",
    payOnline: "Online bezahlen",
    inclFee: "inkl. Bearbeitungsgebühr",
    payDirect: "Direkt (TWINT / Bank)",
    fullName: "Vollständiger Name",
    email: "E-Mail",
    phone: "Telefon",
    childName: "Vorname Kind",
    childAge: "Alter Kind",
    lessonDuration: "Lektionsdauer",
    duration30: "30 Minuten",
    duration45: "45 Minuten",
    parentConsent:
      "Ich bin Erziehungsberechtigte/r und stimme dem Unterricht für mein Kind zu.",
    area: "Bevorzugter Bereich in Zürich",
    address: "Ihre Adresse",
    travelConfirm:
      "Ich bestätige, dass diese Adresse mit ÖV in etwa 45 Minuten ab Zürich erreichbar ist.",
    note: "Nachricht (optional)",
    privacy: "Datenschutz",
    terms: "AGB",
    submitPay: "Zur Zahlung",
    submitBook: "Buchung absenden",
    wait: "Bitte warten",
    errorGeneric: "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.",
  },
  success: {
    title: "Danke",
    payDirect:
      "Bitte überweisen Sie {amount} CHF per TWINT oder Bank. Der Termin ist bestätigt, sobald die Zahlung eingegangen ist.",
    account: "Konto",
    payTwint: "Mit TWINT bezahlen",
    reference: "Referenz",
    confirmEmail:
      "Ich bestätige Ihren Termin per E-Mail innert 24 Stunden. Schauen Sie auch im Spam-Ordner nach.",
    generic: "Ihre Buchung ist eingegangen. Ich melde mich bei Ihnen.",
    home: "Zur Startseite",
  },
  cancel: {
    title: "Zahlung abgebrochen",
    body: "Es wurde nichts belastet. Sie können es erneut versuchen oder direkt bezahlen.",
    back: "Zurück zur Buchung",
  },
  footer: {
    contact: "Kontakt",
    legal: "Rechtliches",
    impressum: "Impressum",
    privacy: "Datenschutz",
    terms: "AGB",
    copy: "Gitarrenunterricht Zürich",
  },
  legal: {
    impressum: {
      title: "Impressum",
      providerHeading: "Verantwortlich für diese Website",
      providerBody: [
        "Angaben gemäss schweizerischem Recht (UWG) zum Gitarrenunterricht über Axe School.",
      ],
      country: "Schweiz",
      emailLabel: "E-Mail:",
      phoneLabel: "Telefon:",
      sections: [
        {
          heading: "Angebot",
          paragraphs: [
            "Gitarrenunterricht für Erwachsene, Teens und Kinder. Einzelunterricht per Zoom, an einem neutralen Ort in Zürich oder bei Ihnen zu Hause.",
          ],
        },
        {
          heading: "Rechtsform",
          paragraphs: [
            "Einzelunternehmen, tätig in Zürich, Schweiz.",
          ],
        },
        {
          heading: "Haftung für Inhalte",
          paragraphs: [
            "Ich bemühe mich, die Informationen auf dieser Website aktuell und korrekt zu halten. Für externe Links übernehme ich keine Verantwortung für deren Inhalte.",
          ],
        },
      ],
    },
    privacy: {
      title: "Datenschutzerklärung",
      intro:
        "Diese Seite erklärt, welche Personendaten ich bearbeite, wenn Sie die Website nutzen oder Unterricht buchen (revDSG).",
      controllerLabel: "Verantwortliche Person:",
      emailLabel: "E-Mail:",
      updated: "Stand: Mai 2026. Ich kann diese Erklärung bei Bedarf anpassen; die aktuelle Version finden Sie stets auf dieser Seite.",
      sections: [
        {
          heading: "Welche Daten ich bearbeite",
          paragraphs: [
            "Bei einer Buchung: Name, E-Mail, Telefon, gewähltes Produkt, Zahlungsart und optionale Nachricht.",
            "Bei Kinderunterricht (unter 14): Vorname und Alter des Kindes, Einwilligung der Erziehungsberechtigten.",
            "Bei Unterricht bei Ihnen zu Hause: Ihre Adresse und Bestätigung zur Erreichbarkeit.",
            "Bei Kontakt per E-Mail oder WhatsApp: die Daten, die Sie mir freiwillig mitteilen.",
            "Technische Daten: Server-Logfiles durch den Hosting-Anbieter (z. B. IP-Adresse, Zeitpunkt des Zugriffs). Zahlungsdaten werden direkt durch Stripe verarbeitet; ich speichere keine Kartennummern.",
          ],
        },
        {
          heading: "Zweck und Rechtsgrundlage",
          paragraphs: [
            "Zweck: Buchung und Abwicklung von Unterricht, Terminabsprache, Rechnungsstellung, Kommunikation und gesetzliche Aufbewahrung.",
            "Rechtsgrundlage: Erfüllung des Unterrichtsvertrags, berechtigtes Interesse an der Abwicklung meines Angebots sowie gesetzliche Pflichten (z. B. Aufbewahrung für die Buchhaltung).",
          ],
        },
        {
          heading: "Empfänger und Auftragsbearbeiter",
          paragraphs: [
            "Hosting: Vercel (Website-Betrieb).",
            "Zahlungen: Stripe (Online-Zahlung).",
            "E-Mail: mein E-Mail-Anbieter für Bestätigungen und Korrespondenz.",
            "WhatsApp: wenn Sie mich dort kontaktieren (Meta/WhatsApp).",
            "Diese Dienstleister verarbeiten Daten nur, soweit dies für ihre Leistung nötig ist.",
          ],
        },
        {
          heading: "Übermittlung ins Ausland",
          paragraphs: [
            "Einige der genannten Anbieter können Daten ausserhalb der Schweiz bearbeiten (z. B. USA/EU). Dabei sollen angemessene Schutzmassnahmen gelten, soweit der Anbieter diese anbietet.",
          ],
        },
        {
          heading: "Aufbewahrung",
          paragraphs: [
            "Buchungs- und Abrechnungsdaten bewahre ich so lange auf, wie es für die Vertragserfüllung und gesetzliche Pflichten nötig ist (in der Regel mehrere Jahre gemäss schweizerischen Aufbewahrungsregeln für Geschäftsunterlagen).",
            "Kontaktanfragen ohne Buchung lösche ich, wenn sie nicht mehr benötigt werden.",
          ],
        },
        {
          heading: "Ihre Rechte",
          paragraphs: [
            "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Bearbeitung und Datenherausgabe, soweit gesetzlich vorgesehen.",
          ],
        },
        {
          heading: "Kinder",
          paragraphs: [
            "Unterricht für Kinder unter 14 Jahren wird nur über eine erziehungsberechtigte Person gebucht. Ich erhebe nur die dafür nötigen Angaben und verwende sie ausschliesslich zur Organisation des Unterrichts.",
          ],
        },
        {
          heading: "Cookies und lokale Speicherung",
          paragraphs: [
            "Diese Website setzt keine Werbe- oder Analyse-Cookies ein.",
            "Ihre Sprachwahl (Deutsch/Englisch) wird im localStorage Ihres Browsers gespeichert, damit die Seite in der gewählten Sprache bleibt. Sie können dies in den Browser-Einstellungen löschen.",
          ],
        },
        {
          heading: "Eingebettete Inhalte (Video)",
          paragraphs: [
            "Auf der Startseite kann ein eingebettetes Video über Vimeo abgespielt werden. Beim Abspielen können Vimeo und deren Anbieter technische Daten (z. B. IP-Adresse) verarbeiten. Es gelten auch die Datenschutzhinweise von Vimeo.",
          ],
        },
        {
          heading: "Datensicherheit",
          paragraphs: [
            "Ich treffe angemessene technische und organisatorische Massnahmen, um Ihre Daten zu schützen (z. B. HTTPS-Verschlüsselung der Website, Zugang nur für mich, sichere Zahlungsabwicklung über Stripe).",
            "Bitte senden Sie mir keine Passwörter oder unnötig sensiblen Informationen per E-Mail oder WhatsApp.",
          ],
        },
        {
          heading: "Automatisierte Entscheidungen",
          paragraphs: [
            "Ich treffe keine automatisierten Entscheidungen mit rechtlicher Wirkung gegenüber Ihnen (kein Profiling).",
          ],
        },
        {
          heading: "Datenschutzanfragen und Beschwerde",
          paragraphs: [
            "Für Auskunft, Berichtigung oder Löschung wenden Sie sich an mich unter der oben genannten E-Mail. Ich antworte in angemessener Frist.",
            "Sie können sich auch an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) wenden: edoeb.admin.ch",
          ],
        },
      ],
    },
    terms: {
      title: "Allgemeine Geschäftsbedingungen (AGB)",
      intro:
        "Diese Bedingungen gelten für Gitarrenunterricht, den Sie über diese Website bei Christian Boethius (Axe School) buchen.",
      updated: "Stand: Mai 2026.",
      sections: [
        {
          heading: "Leistung",
          paragraphs: [
            "Einzelunterricht in den auf der Website beschriebenen Formaten (Zoom, neutraler Ort, bei Ihnen zu Hause), als Probelektion oder im Paket (5 oder 10 Lektionen).",
            "Termine werden nach der Buchung per E-Mail (oder telefonisch/WhatsApp) vereinbart.",
          ],
        },
        {
          heading: "Preise und Zahlung",
          paragraphs: [
            "Es gelten die auf der Buchungsseite angezeigten Preise zum Zeitpunkt der Buchung.",
            "Online-Zahlung (Stripe): Preis inkl. kleiner Bearbeitungsgebühr.",
            "Direktzahlung (TWINT/Bank): nur der reine Unterrichtspreis.",
            "Bei Direktzahlung gilt der Termin als bestätigt, sobald die Zahlung bei mir eingegangen ist.",
          ],
        },
        {
          heading: "Pakete (5 / 10 Lektionen)",
          paragraphs: [
            "Lektionspakete (5 oder 10 Lektionen) sind 12 Monate ab Kaufdatum gültig.",
            "Nicht bezogene Lektionen verfallen nach Ablauf der Gültigkeit, sofern nichts anderes schriftlich vereinbart wurde.",
          ],
        },
        {
          heading: "Ort und Erreichbarkeit",
          paragraphs: [
            "Unterricht bei Ihnen zu Hause nur innerhalb von ca. 45 Minuten mit ÖV ab Zürich.",
            "Schülerinnen und Schüler kommen nicht zu mir nach Hause.",
          ],
        },
        {
          heading: "Kinder unter 14",
          paragraphs: [
            "Buchung nur durch Erziehungsberechtigte. Es gelten die Kinderpreise und -dauern gemäss Website.",
            "Ab 14 Jahren gelten die regulären Preise für Erwachsene/Teens.",
          ],
        },
        {
          heading: "Absagen und Verschiebungen",
          paragraphs: [
            "Bitte sagen Sie Termine mindestens 24 Stunden im Voraus ab (E-Mail, WhatsApp oder Telefon).",
            "Bei späterer Absage oder Nichterscheinen kann die Lektion verrechnet werden.",
            "Verschiebungen sind nach Verfügbarkeit möglich; bei Paketen verbraucht eine wahrgenommene Lektion eine Gutschrift.",
          ],
        },
        {
          heading: "Kontakt vor der Buchung",
          paragraphs: [
            "Fragen zu Format, Zeit oder Ort können Sie jederzeit per WhatsApp oder E-Mail stellen, ohne zu buchen.",
          ],
        },
        {
          heading: "Haftung",
          paragraphs: [
            "Ich unterrichte sorgfältig nach bestem Wissen. Für Schäden durch unsachgemässe Nutzung des Instruments ausserhalb des Unterrichts übernehme ich keine Haftung.",
          ],
        },
        {
          heading: "Anwendbares Recht",
          paragraphs: [
            "Es gilt schweizerisches Recht. Gerichtsstand ist, soweit zulässig, Zürich.",
          ],
        },
      ],
    },
  },
  lang: {
    de: "DE",
    en: "EN",
    label: "Sprache",
  },
};

const en = {
  a11y: {
    skipToContent: "Skip to content",
    introVideo: "Intro video: guitar lessons at Axe School",
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    floatingContact: "Contact",
    contactWhatsapp: "Contact on WhatsApp",
    contactEmail: "Send email",
  },
  nav: {
    home: "Home",
    howITeach: "How I teach",
    pricing: "Pricing",
    how: "About",
    menu: "Menu",
  },
  hero: {
    tagline: "Guitar lessons in Zurich",
    title: "Learn guitar",
    titleAccent: "With clarity, patience, and enjoyment.",
    subtitle:
      "Learning guitar takes time and practice, and that's part of it. I guide you step by step, so lessons stay clear and enjoyable.",
    photoAlt: "Christian Boethius playing electric guitar",
    videoTitle: "Intro video",
    ctaBook: "Book now",
    ctaWhatsapp: "WhatsApp",
    ctaEmail: "Email",
  },
  contact: {
    label: "Before signing up:",
    sendLead: "Message me on ",
    or: " or ",
    reason:
      "We can figure out format, time, and place together, or I can answer any questions.",
  },
  about: {
    title: "About me",
    p1: "I am Christian, originally from Sweden, and I have lived in Switzerland on and off for more than twenty years.",
    p2: "I work in graphic design and programming. I also spent a long time teaching scuba diving and freediving, from Asia and Central America to the Caribbean and Iceland.",
    p3: "I now teach guitar in Zurich, and I would be glad to support you on your journey with this instrument.",
    p4: "To be clear, I have only recently made guitar teaching my profession. I am not the best guitarist in the world. From my experience teaching freediving and scuba diving, I am with you for the long run: with patience, figuring out how you learn best, and working together towards your goals on the guitar.",
    p5: "We may not be the right fit, and that is fine. Affordable trial lessons are available, but I prefer that you contact me first so we can talk about where you are with the guitar, what is holding you back, what you would like to learn, and the best programme for you.",
    photoAltCoastal: "Portrait of Christian Boethius",
    galleryTitle: "Photos",
    galleryIntro:
      "To help you get to know me a little, here are some pictures of me travelling and working in different parts of the world: small adventures I have photographed along the way. I hope you enjoy them.",
    pillarsTitle: "How I teach",
    pillarsLead: "Three core pillars.",
    pillarsBody: [
      "**I tailor each lesson to your needs and your level.** Whether you want to learn a particular song or build routines you can use at home or wherever you play, **I bring patience, understanding, and clarity.**",
      "**Together, we work out how you learn best,** so the frustration eases when progress feels slow or hard to see. I gladly share the tips and tricks **I wish I had known when I started,** and that still help me today, because I am still learning too. **Guitar is something you can enjoy for the rest of your life:** there is always something new to discover.",
      "**Practice is important,** but motivation and life do not always line up. **Coming to a lesson still counts when daily practice is difficult.** Yes, guitar is a challenge, but broken into smaller segments it feels more digestible than one big mountain to climb. **Taking your time matters more than racing to the top.**",
    ],
    pillars: [
      {
        title: "Hands and technique",
        body: "Finger strength, hand-eye coordination, rhythm and timing. What the left hand and the right hand each do, with proper technique and good posture of the body and hands.",
      },
      {
        title: "Knowing your guitar",
        body: "Naming the parts, how the instrument works, changing strings and tuning, simple care, so your guitar keeps sounding good.",
      },
      {
        title: "Music theory for guitar",
        body: "Chords, tabs, progressions, scales, intervals and a bit of ear training. Understanding songs and how they're built.",
      },
    ],
    whatITitle: "What I teach",
    whatILead: "Styles and instruments.",
    whatIBody: [
      "We can explore many genres together. Rock, blues, fingerpicking, pop, country, singer-songwriter, and metal are where I'm most at home.",
      "I also cover the fundamentals: posture, tuning, chords, rhythm, and metronome. From there we work on scales, progressions, and song structure.",
    ],
    whatIInstruments: [
      {
        title: "Electric guitar",
        body: "Rhythm, lead solos, and effects for rock, blues, and beyond.",
      },
      {
        title: "Acoustic guitar",
        body: "Steel-string Western for fingerpicking, country, pop, and singer-songwriter.",
      },
    ],
  },
  pricing: {
    title: "Pricing",
    trialPrice: "CHF {price}",
    trialNote: "Trial lesson",
    bundle5: "5 lessons: CHF {price} total",
    bundle10: "10 lessons: CHF {price} total",
    chooseAge: "Who is this booking for?",
    sectionRegular: "Adults / Teens",
    sectionChild: "Under 14",
    ctaRegular: "Book for adults/teens",
    ctaChild: "Book for under 14",
    childBookHint: "Children: a parent or guardian books on behalf of the child",
    zoomTitle: "Zoom (online)",
    neutralTitle: "Neutral ground",
    homeTitle: "At your home",
    bundleLine: "{count} × {price} CHF per lesson",
  },
  testimonials: {
    title: "What students say",
    exampleLabel: "Example",
    listLabel: "Testimonials",
    goTo: "Testimonial {n}",
    starsLabel: "{rating} out of 5 stars",
  },
  testimonialReview: {
    title: "Write your testimonial",
    intro:
      "Write your testimonial and submit it. It will appear on the site once I have approved it.",
    quote: "Quote",
    author: "Display name (e.g. Laura M.)",
    context: "Context",
    rating: "Rating",
    consentName: "Your full name (internal only, not published)",
    consent:
      "I agree this quote may be published on this website under the display name above.",
    submit: "Submit",
    thanks: "Thank you! Your testimonial was sent and will appear on the site after approval.",
    alreadySubmitted: "You already submitted this form. Thank you!",
    notFound: "This link is invalid or has expired.",
    closed: "This testimonial has already been processed.",
    loading: "Loading",
    error: "Something went wrong. Please try again.",
  },
  adminTestimonials: {
    title: "Manage testimonials",
    login: "Log in",
    password: "Admin password",
    logout: "Log out",
    newLink: "New link",
    newLinkHint:
      "Generate a link and send it to your student. They write the testimonial themselves, no draft needed.",
    createLink: "Generate link",
    reviewLink: "Link for student",
    copyLink: "Copy link",
    copied: "Copied!",
    openLinks: "Open links (not submitted yet)",
    notSubmittedYet: "Link sent, waiting for the student to submit.",
    pending: "Awaiting approval",
    published: "Published",
    rejected: "Not approved",
    avatar: "Avatar",
    avatarHint: "Pick a cute sea creature, no photo upload needed.",
    creatureCrab: "Crab",
    creatureFish: "Fish",
    creatureOctopus: "Octopus",
    creatureJellyfish: "Jellyfish",
    creatureSeahorse: "Seahorse",
    creatureStarfish: "Starfish",
    approve: "Approve",
    reject: "Don't approve",
    delete: "Remove",
    deleteConfirm: "Remove this testimonial permanently?",
    empty: "No entries yet.",
    loginError: "Wrong password.",
    loadError: "Could not load admin. Please log in again.",
    notConfigured: "ADMIN_PASSWORD is not set.",
  },
  book: {
    title: "Book a lesson",
    titleRegular: "Booking, adults/teens",
    titleChild: "Booking, children (under 14)",
    intro:
      "Choose a trial lesson or bundle, pick your format, then pay online or via TWINT/bank.",
    audienceRequired: "Please choose who this booking is for:",
    wrongAgeGroup: "Wrong age group?",
    loading: "Loading",
    regular: "Adults/teens",
    child: "Child (under 14)",
    lessonKind: "What are you booking?",
    trialLesson: "Trial lesson",
    trialHint: "A single lesson to get started",
    bundle: "Bundle",
    bundleHint: "5 or 10 lessons in one package",
    chooseFormat: "Choose format",
    bundleSize: "How many lessons?",
    bundle5: "5 lessons",
    bundle10: "10 lessons",
    bundleTotal: "{amount} CHF total",
    selectionSummary: "Your selection",
    payment: "Payment",
    paymentHint:
      "Online payment includes a small Stripe fee. With TWINT or bank transfer, you pay the lesson price only.",
    payOnline: "Pay online",
    inclFee: "incl. small processing fee",
    payDirect: "Pay directly (TWINT / bank)",
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    childName: "Child's first name",
    childAge: "Child's age",
    lessonDuration: "Lesson length",
    duration30: "30 minutes",
    duration45: "45 minutes",
    parentConsent:
      "I am the parent/legal guardian and agree to lessons for my child.",
    area: "Preferred area in Zurich",
    address: "Your address",
    travelConfirm:
      "I confirm this address is within ~45 minutes of Zurich by train or tram.",
    note: "Note (optional)",
    privacy: "Privacy",
    terms: "Terms",
    submitPay: "Continue to payment",
    submitBook: "Submit booking",
    wait: "Please wait",
    errorGeneric: "Something went wrong. Please try again.",
  },
  success: {
    title: "Thank you",
    payDirect:
      "Please pay {amount} CHF via TWINT or bank transfer. Your slot is confirmed once payment is received.",
    account: "Account",
    payTwint: "Pay with TWINT",
    reference: "Reference",
    confirmEmail:
      "I'll confirm your time by email within 24 hours. Please check your spam folder too.",
    generic: "Your booking was received. I'll be in touch shortly.",
    home: "Back to home",
  },
  cancel: {
    title: "Payment cancelled",
    body: "No charge was made. You can try again or choose direct payment.",
    back: "Return to booking",
  },
  footer: {
    contact: "Contact",
    legal: "Legal",
    impressum: "Impressum",
    privacy: "Privacy",
    terms: "Terms",
    copy: "Guitar lessons in Zurich",
  },
  legal: {
    impressum: {
      title: "Impressum",
      providerHeading: "Responsible for this website",
      providerBody: [
        "Provider identification under Swiss law (UWG) for guitar lessons offered through Axe School.",
      ],
      country: "Switzerland",
      emailLabel: "Email:",
      phoneLabel: "Phone:",
      sections: [
        {
          heading: "Services",
          paragraphs: [
            "Guitar lessons for adults, teens, and children. Private lessons via Zoom, at a neutral location in Zurich, or at your home.",
          ],
        },
        {
          heading: "Legal form",
          paragraphs: [
            "Sole proprietorship, operating in Zurich, Switzerland.",
          ],
        },
        {
          heading: "Liability for content",
          paragraphs: [
            "I aim to keep information on this website accurate and up to date. I am not responsible for the content of external links.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "This policy describes how I process personal data when you use this website or book lessons with me (Swiss FADP / revDSG).",
      controllerLabel: "Controller:",
      emailLabel: "Email:",
      updated: "Last updated: May 2026. I may update this policy; the current version is always on this page.",
      sections: [
        {
          heading: "What data I process",
          paragraphs: [
            "When you book: name, email, phone, chosen product, payment method, and optional message.",
            "For children (under 14): child's first name and age, parent/guardian consent.",
            "For lessons at your home: your address and travel confirmation.",
            "If you contact me by email or WhatsApp: whatever you choose to share.",
            "Technical data: server logs via the hosting provider (e.g. IP address, access time). Payment card data is processed by Stripe; I do not store card numbers.",
          ],
        },
        {
          heading: "Purpose and legal basis",
          paragraphs: [
            "Purpose: booking and delivering lessons, scheduling, invoicing, communication, and legal record-keeping.",
            "Legal basis: performance of the lesson contract, legitimate interest in running my business, and legal obligations (e.g. accounting retention).",
          ],
        },
        {
          heading: "Recipients and processors",
          paragraphs: [
            "Hosting: Vercel (website operation).",
            "Payments: Stripe (online payment).",
            "Email: my email provider for confirmations and correspondence.",
            "WhatsApp: if you contact me there (Meta/WhatsApp).",
            "These providers process data only as needed to provide their service.",
          ],
        },
        {
          heading: "Transfers abroad",
          paragraphs: [
            "Some providers may process data outside Switzerland (e.g. USA/EU). Where applicable, they should use appropriate safeguards.",
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            "I keep booking and billing data as long as needed for the contract and legal obligations (typically several years under Swiss business record rules).",
            "Contact enquiries without a booking are deleted when no longer needed.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You have the right to access, rectify, delete, restrict processing, and receive your data, where provided by law.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "Lessons for children under 14 are booked only by a parent or legal guardian. I collect only what is needed to organise lessons.",
          ],
        },
        {
          heading: "Cookies and local storage",
          paragraphs: [
            "This website does not use advertising or analytics cookies.",
            "Your language choice (German/English) is stored in your browser's localStorage, so the site stays in that language. You can clear this in your browser settings.",
          ],
        },
        {
          heading: "Embedded content (video)",
          paragraphs: [
            "The home page may embed a video via Vimeo. When you play it, Vimeo and its providers may process technical data (e.g. IP address). Vimeo's privacy policy also applies.",
          ],
        },
        {
          heading: "Data security",
          paragraphs: [
            "I take appropriate technical and organisational measures to protect your data (e.g. HTTPS encryption, access limited to me, secure payment processing via Stripe).",
            "Please do not send passwords or unnecessarily sensitive information by email or WhatsApp.",
          ],
        },
        {
          heading: "Automated decisions",
          paragraphs: [
            "I do not make automated decisions with legal effect concerning you (no profiling).",
          ],
        },
        {
          heading: "Privacy requests and complaints",
          paragraphs: [
            "For access, correction, or deletion requests, contact me at the email above. I will respond within a reasonable time.",
            "You may also contact the Federal Data Protection and Information Commissioner (FDPIC): edoeb.admin.ch",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of service",
      intro:
        "These terms apply to guitar lessons you book through this website with Christian Boethius (Axe School).",
      updated: "Last updated: May 2026.",
      sections: [
        {
          heading: "Service",
          paragraphs: [
            "Private lessons in the formats shown on the website (Zoom, neutral ground, at your home), as trial lessons or in packages (5 or 10 lessons).",
            "Times are arranged by email (or phone/WhatsApp) after booking.",
          ],
        },
        {
          heading: "Prices and payment",
          paragraphs: [
            "Prices shown on the booking page at the time of booking apply.",
            "Online payment (Stripe): price includes a small processing fee.",
            "Direct payment (TWINT/bank): lesson price only.",
            "For direct payment, your slot is confirmed once payment is received.",
          ],
        },
        {
          heading: "Packages (5 / 10 lessons)",
          paragraphs: [
            "Lesson packages (5 or 10 lessons) are valid for 12 months from purchase.",
            "Unused lessons expire after the validity period unless otherwise agreed in writing.",
          ],
        },
        {
          heading: "Location and travel",
          paragraphs: [
            "Lessons at your home only within ~45 minutes of Zurich by public transport.",
            "Students do not come to my home.",
          ],
        },
        {
          heading: "Children under 14",
          paragraphs: [
            "Booking by parent or guardian only. Child pricing and durations apply as on the website.",
            "From age 14, regular adult/teen pricing applies.",
          ],
        },
        {
          heading: "Cancellation and rescheduling",
          paragraphs: [
            "Please cancel at least 24 hours in advance (email, WhatsApp, or phone).",
            "Late cancellation or no-show may be charged.",
            "Rescheduling subject to availability; for packages, each attended lesson uses one credit.",
          ],
        },
        {
          heading: "Contact before booking",
          paragraphs: [
            "You can ask about format, time, or location anytime via WhatsApp or email without booking.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "I teach carefully to the best of my ability. I am not liable for damage from improper use of the instrument outside lessons.",
          ],
        },
        {
          heading: "Applicable law",
          paragraphs: [
            "Swiss law applies. Place of jurisdiction is Zurich, where permitted.",
          ],
        },
      ],
    },
  },
  lang: {
    de: "DE",
    en: "EN",
    label: "Language",
  },
};

export type Messages = typeof de;

const translations: Record<Locale, Messages> = { de, en };

export function getTranslations(locale: Locale): Messages {
  return translations[locale];
}

export function productName(
  locale: Locale,
  nameDe: string,
  nameEn: string,
) {
  return locale === "de" ? nameDe : nameEn;
}
