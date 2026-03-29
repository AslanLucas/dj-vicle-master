export type LocationContent = {
  city: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  mainKeyword: string;
  seoKeywords: string[];
  secondaryKeywords: string[];
  localVariants: string[];
  internalLinkIdeas: string[];
  sections: {
    services: {
      title: string;
      paragraphs: string[];
    };
    localFit: {
      title: string;
      paragraphs: string[];
    };
    process: {
      title: string;
      steps: { title: string; text: string }[];
    };
    faq: {
      title: string;
      items: { question: string; answer: string }[];
    };
    eventTypes: {
      title: string;
      items: { title: string; text: string }[];
    };
    trust: {
      title: string;
      paragraphs: string[];
    };
  };
  cta: {
    title: string;
    text: string;
  };
};

const createLocation = (
  city: string,
  slug: string,
  venueHint: string,
  travelHint: string,
  audienceHint: string,
  localTradition: string
): LocationContent => ({
  city,
  slug,
  seoTitle: `DJ ${city} | Hochzeiten, Clubs & Events mit DJ VICLE`,
  metaDescription:
    `DJ VICLE ist dein professioneller DJ in ${city} für deutsch-russische Hochzeiten, Clubnächte und Firmenevents – inklusive moderner Ton- und Lichttechnik.`,
  h1: `DJ in ${city} für Hochzeiten, Clubs und Events`,
  intro:
    `Du suchst einen DJ in ${city}, der Energie, Erfahrung und ein sicheres Gespür für den richtigen Moment mitbringt? DJ VICLE verbindet als russischer und deutscher DJ beide Musikwelten, plant mit dir den Ablauf deiner Feier und sorgt mit professioneller Technik für eine volle Tanzfläche – vom Empfang bis zur letzten Zugabe.`,
  mainKeyword: `DJ ${city}`,
  seoKeywords: [
    `Russischer DJ ${city}`,
    `Deutscher DJ ${city}`,
    `Russischer DJ Deutsch DJ ${city}`,
    `DJ Hochzeit ${city}`,
    `DJ für Event ${city}`,
  ],
  secondaryKeywords: [
    `Hochzeits DJ ${city}`,
    `Event DJ ${city}`,
    `Deutsch russischer DJ ${city}`,
    `DJ für Firmenfeier ${city}`,
    `DJ mit Technik ${city}`,
  ],
  localVariants: [
    `DJ in ${city} buchen`,
    `mobiler DJ ${city}`,
    `Party DJ ${city}`,
    `DJ ${city} Hochzeit`,
    `DJ ${city} Eventlocation`,
  ],
  internalLinkIdeas: [
    "Leistungen auf der Startseite verlinken (Musik, Technik, Beratung)",
    "Direktlink zur Buchungsseite mit vorausgefüllter Standortanfrage",
    "Verweis auf Galerie für Referenzen und Setup-Impressionen",
    "Link zum Kontaktbereich für kurzfristige Eventanfragen",
  ],
  sections: {
    services: {
      title: `Hochzeiten und Events in ${city} mit klarem Konzept`,
      paragraphs: [
        `Ob Hochzeit, Geburtstag oder Firmenveranstaltung: In ${city} liefere ich dir kein Standard-Set, sondern einen musikalischen Ablauf, der zu euren Gästen, eurer Sprache und eurer Stimmung passt. Dabei kombiniere ich aktuelle Charts, Club-Sounds, Klassiker und auf Wunsch russische Hits so, dass jede Generation abgeholt wird.`,
        `Besonders bei deutsch-russischen Feiern ist ein DJ gefragt, der Timing, Moderation und Dynamik versteht. Genau dafür stehe ich: saubere Übergänge, klare Kommunikation und ein roter Faden vom Dinner über den Eröffnungstanz bis zur Peak-Time.`,
      ],
    },
    localFit: {
      title: `Warum DJ VICLE in ${city}?`,
      paragraphs: [
        `${city} bietet mit ${venueHint} eine starke Mischung aus urbanem Publikum und privaten Feierformaten. Dadurch braucht es einen DJ, der spontan reagieren kann und sowohl elegante Hochzeitssounds als auch druckvolle Partyphasen professionell steuert.`,
        `Durch ${travelHint} bin ich regelmäßig in und um ${city} im Einsatz und kann Events flexibel begleiten – auch wenn Aufbauzeiten eng sind oder das Programm kurzfristig angepasst werden muss. ${audienceHint}`,
        `Wenn gewünscht, integriere ich ${localTradition} harmonisch in den Ablauf, ohne dass der Abend konstruiert wirkt. Das Ergebnis: ein Event, das sich authentisch anfühlt und in Erinnerung bleibt.`,
      ],
    },
    process: {
      title: `So läuft die Zusammenarbeit für ${city} ab`,
      steps: [
        {
          title: "1. Erstgespräch",
          text: `Wir klären Anlass, Gästeprofil, Musikgeschmack und Rahmenbedingungen deiner Location in ${city}. Du bekommst sofort ein realistisches Gefühl für Ablauf, Technik und Budget.`,
        },
        {
          title: "2. Musikalisches Konzept",
          text: `Auf Basis eurer Wünsche erstelle ich ein individuelles Set-Konzept inklusive No-Go-Liste, Wunschtracks und passender Dramaturgie für jede Phase des Abends.`,
        },
        {
          title: "3. Technik & Timing",
          text: `Ich plane Sound, Licht und Aufbauzeiten zuverlässig vor – abgestimmt auf Raumgröße, Akustik und Programmpunkte wie Showacts oder Reden.`,
        },
        {
          title: "4. Eventtag",
          text: `Am Veranstaltungstag in ${city} übernehme ich die musikalische Führung mit Blick auf Energie, Übergänge und Publikum, damit du dich ganz auf deine Gäste konzentrieren kannst.`,
        },
      ],
    },
    faq: {
      title: `Häufige Fragen zu DJ-Buchungen in ${city}`,
      items: [
        {
          question: `Wie früh sollte ich einen DJ in ${city} anfragen?`,
          answer:
            "Für Samstage in der Hochzeitssaison empfehle ich eine Anfrage 6 bis 12 Monate vorher. Kurzfristige Termine sind trotzdem möglich – einfach direkt anfragen.",
        },
        {
          question: "Kann ich eigene Musikwünsche einbringen?",
          answer:
            "Ja. Wunschlisten, Lieblingsgenres und kulturelle Highlights sind ausdrücklich erwünscht. Ich verbinde diese Inputs mit einer tanzbaren Gesamtlinie.",
        },
        {
          question: "Bringst du Licht- und Tontechnik mit?",
          answer:
            "Ja, bei Bedarf inklusive. Das Setup wird auf Gästezahl, Location und Ablauf abgestimmt, damit Technik und Atmosphäre perfekt zusammenpassen.",
        },
      ],
    },
    eventTypes: {
      title: `Diese Events begleite ich in ${city}`,
      items: [
        {
          title: "Hochzeiten",
          text: `Von der Trauung über den Sektempfang bis zur Late-Night-Party: Ich begleite Hochzeiten in ${city} mit emotionaler Dramaturgie, passenden Übergängen und einer Musiklinie, die Brautpaar und Gäste gleichermaßen mitnimmt.`,
        },
        {
          title: "Firmenfeiern",
          text: `Für Business-Events in ${city} liefere ich einen professionellen Rahmen mit stilvoller Musik im Empfang und klarer Party-Energie am Abend – passend zu Markenauftritt, Zielgruppe und Ablaufplan.`,
        },
        {
          title: "Geburtstage & private Feiern",
          text: `Ob 30., 40. oder runder Familienabend: In ${city} gestalte ich private Events persönlich, flexibel und mit Fokus auf eine volle Tanzfläche statt starrer Standard-Playlist.`,
        },
        {
          title: "Clubs & Special Nights",
          text: `Dank regelmäßiger Clubpraxis bringe ich moderne Sets, saubere Übergänge und aktuelles Gespür für Trends mit – perfekt für lange Partynächte in ${city}.`,
        },
      ],
    },
    trust: {
      title: `Was Kunden aus ${city} besonders schätzen`,
      paragraphs: [
        `Viele Anfragen aus ${city} kommen über Empfehlungen. Der Grund: transparente Kommunikation, verlässliche Planung und ein Auftritt, der sowohl menschlich als auch technisch professionell wirkt.`,
        `Du bekommst vor dem Event klare Absprachen zu Zeiten, Technik, Musikwünschen und Ablauf. Am Eventtag selbst bin ich frühzeitig vor Ort, arbeite abgestimmt mit Trauzeugen, Fotografen oder Location-Team und halte den musikalischen Faden durchgehend stabil.`,
        `Mein Ziel ist immer dasselbe: ein Abend, der sich für dich leicht anfühlt, für deine Gäste besonders wirkt und bei dem Musik, Timing und Stimmung exakt zusammenpassen.`,
      ],
    },
  },
  cta: {
    title: `Jetzt DJ für ${city} unverbindlich anfragen`,
    text: `Wenn du einen erfahrenen DJ in ${city} suchst, der professionell plant und deine Feier musikalisch auf den Punkt bringt, sende jetzt deine Anfrage. Du erhältst eine ehrliche Einschätzung und ein klares Angebot für dein Event.`,
  },
});

export const locationsList: LocationContent[] = [
  createLocation(
    "Lingen",
    "lingen",
    "modernen Eventlocations rund um die Innenstadt, den Hafenbereich und private Säle im Umland",
    "kurze Wege in der Region Emsland",
    "Gerade bei gemischten Gästestrukturen aus Familie, Freundeskreis und Kollegium ist ein sauber gesteuerter Spannungsbogen entscheidend.",
    "russische Hochzeitstraditionen und zweisprachige Musikwünsche"
  ),
  createLocation(
    "Nordhorn",
    "nordhorn",
    "stilvollen Hochzeitslocations entlang der Vechte und vielfältigen Eventflächen im Bentheimer Land",
    "regelmäßige Einsätze zwischen Nordhorn, Bad Bentheim und Schüttorf",
    "Das Publikum in Nordhorn reagiert sehr gut auf eine Mischung aus vertrauten Klassikern und aktuellen Clubtracks.",
    "typische Programmpunkte deutsch-russischer Familienfeiern"
  ),
  createLocation(
    "Rheine",
    "rheine",
    "beliebten Veranstaltungsorten zwischen Emsauen, Innenstadt und umliegenden Gutshöfen",
    "direkte Anbindung über das Münsterland und das südliche Emsland",
    "Viele Feiern in Rheine verbinden formelle Programmpunkte mit einer langen Partynacht – dafür braucht es die richtige musikalische Taktung.",
    "kulturelle Musikwünsche aus beiden Familienseiten"
  ),
  createLocation(
    "Osnabrück",
    "osnabrueck",
    "urbanen Clubs, Hotels und Hochzeitsscheunen im Stadtgebiet und Umland",
    "gute Logistik durch die Nähe zu A1 und A30",
    "In Osnabrück treffen oft internationale Gästegruppen aufeinander, deshalb setze ich auf klare Moderation und flexible Genrewechsel.",
    "russische Partyklassiker, die smart in moderne Sets eingebettet werden"
  ),
  createLocation(
    "Cloppenburg",
    "cloppenburg",
    "familiären Festsälen, modernen Hallen und exklusiven Landlocations",
    "planbare Touren durch das Oldenburger Münsterland",
    "Feiern in Cloppenburg sind häufig sehr generationsübergreifend – genau hier spielt Erfahrung in Dramaturgie und Song-Auswahl ihre Stärke aus.",
    "traditionelle Rituale im hochwertigen Eventrahmen"
  ),
  createLocation(
    "Meppen",
    "meppen",
    "Locations rund um die Ems, private Festkonzepte und Unternehmensveranstaltungen in der Region",
    "hohe Flexibilität durch regionale Nähe",
    "In Meppen sind persönliche Betreuung und direkte Abstimmung vor dem Event besonders wichtig – genau darauf ist mein Ablauf ausgelegt.",
    "mehrsprachige Musikwünsche und Familienprogrammpunkte"
  ),
  createLocation(
    "Ibbenbüren",
    "ibbenbueren",
    "beliebten Hochzeits- und Eventflächen zwischen Teutoburger Wald und Stadtzentrum",
    "kurze Vorlaufzeiten dank eingespielter Touren im Tecklenburger Land",
    "Gerade bei Hochzeitspartys in Ibbenbüren ist die Balance zwischen emotionalen Momenten und Clubfeeling entscheidend.",
    "traditionelle Einlagen mit moderner Partystruktur"
  ),
  createLocation(
    "Bremen",
    "bremen",
    "hochwertigen Eventlofts, Hotels und Kultur-Locations in zentraler Lage",
    "strukturierte Anreise auch für größere Technik-Setups",
    "Bremen hat ein vielfältiges Publikum mit hohen Ansprüchen an Soundqualität und Musikauswahl – entsprechend präzise wird jedes Set vorbereitet.",
    "interkulturelle Musikelemente für internationale Gäste"
  ),
  createLocation(
    "Dortmund",
    "dortmund",
    "großen Eventhallen, stylischen Hochzeitslocations und urbanen Clubformaten",
    "zuverlässige Planung für Events im gesamten Ruhrgebiet",
    "In Dortmund funktionieren energiegeladene Sets besonders gut, wenn sie professionell mit den emotionalen Programmpunkten verbunden werden.",
    "kulturell gemischte Musikwünsche ohne Brüche im Ablauf"
  ),
  createLocation(
    "Bochum",
    "bochum",
    "kreativen Veranstaltungsorten von Industriecharme bis modernem Festsaal",
    "feste Abläufe für Auf- und Abbau im dichten Stadtumfeld",
    "Das Bochumer Publikum ist musikaffin und feierfreudig – deshalb plane ich Sets mit klarer Progression und starken Peak-Momenten.",
    "russische und deutsche Lieblingssongs mit sauberem Übergang"
  ),
  createLocation(
    "Münster",
    "muenster",
    "eleganten Hochzeitslocations, Eventhöfen und Business-Events mit stilvollem Anspruch",
    "kurze Kommunikationswege durch regelmäßige Einsätze im Münsterland",
    "In Münster ist ein hochwertiger Gesamtauftritt wichtig: professionelles Setup, gutes Timing und eine Musiklinie, die anspruchsvolle Gäste mitnimmt.",
    "individuelle Traditionen beider Familien mit moderner Moderation"
  ),
];

export const locationPages: Record<string, LocationContent> = Object.fromEntries(
  locationsList.map((location) => [location.slug, location])
);

export const locationSlugs = locationsList.map((location) => location.slug);
