import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/algemene-voorwaarden")({
  head: () => ({
    meta: [
      { title: "Algemene voorwaarden — Wandig" },
      {
        name: "description",
        content: "Lees de algemene voorwaarden voor bestellingen, levering, betaling, garantie en gebruik van Wandig.",
      },
    ],
  }),
  component: AlgemeneVoorwaarden,
});

const sections = [
  {
    title: "1. Toepasselijkheid",
    body: [
      "Deze algemene voorwaarden zijn van toepassing op elk aanbod, iedere bestelling en iedere overeenkomst tussen Wandig en de klant.",
      "Door een bestelling te plaatsen ga je akkoord met deze voorwaarden. Afwijkingen zijn alleen geldig wanneer ze schriftelijk door Wandig zijn bevestigd.",
    ],
  },
  {
    title: "2. Aanbod en producten",
    body: [
      "Wandig levert plug & play TV cinewalls en bijbehorende onderdelen in vaste modellen, maten, kleuren en opstellingen.",
      "Afbeeldingen, kleurweergaven en sfeerbeelden zijn bedoeld als indicatie. Houtstructuur, tint en afwerking kunnen licht afwijken door materiaal, scherminstellingen en lichtinval.",
    ],
  },
  {
    title: "3. Bestelling en bevestiging",
    body: [
      "Een overeenkomst komt tot stand zodra de bestelling door Wandig is bevestigd.",
      "De klant is verantwoordelijk voor het juist doorgeven van gekozen model, maat, kleur, opstelling, contactgegevens en afleveradres.",
    ],
  },
  {
    title: "4. Prijzen en betaling",
    body: [
      "Alle vermelde prijzen zijn inclusief btw, tenzij anders vermeld.",
      "Betaling vindt plaats via de betaalmethoden die tijdens het afrekenen worden aangeboden. Wandig mag een bestelling aanhouden totdat de betaling volledig is ontvangen.",
    ],
  },
  {
    title: "5. Levering",
    body: [
      "De verwachte levertijd wordt bij het product of tijdens het bestelproces vermeld. Deze termijn is indicatief, tenzij uitdrukkelijk schriftelijk anders is overeengekomen.",
      "Levering vindt plaats op het door de klant opgegeven adres. Controleer het product direct bij ontvangst en meld zichtbare schade zo snel mogelijk met foto's.",
    ],
  },
  {
    title: "6. Plaatsing en gebruik",
    body: [
      "Onze cinewalls zijn ontworpen voor eenvoudige plaatsing, maar de klant blijft verantwoordelijk voor een veilige montage, geschikte wand/vloer en correcte aansluiting.",
      "Wanneer je twijfelt over montage, draagkracht of elektra, schakel dan een vakpersoon in.",
    ],
  },
  {
    title: "7. Herroepingsrecht en retour",
    body: [
      "Voor standaardproducten geldt het wettelijke herroepingsrecht zoals uitgelegd op onze retourpagina.",
      "Producten die volgens specifieke wensen van de klant zijn aangepast of gepersonaliseerd, kunnen van herroeping zijn uitgesloten wanneer dit vooraf duidelijk is vermeld.",
    ],
  },
  {
    title: "8. Garantie",
    body: [
      "Wandig geeft 5 jaar garantie op constructie en afwerking bij normaal gebruik en correcte plaatsing.",
      "Schade door verkeerd gebruik, onjuiste montage, vocht, vallen, stoten, eigen aanpassingen of normale slijtage valt niet onder de garantie.",
    ],
  },
  {
    title: "9. Aansprakelijkheid",
    body: [
      "Wandig is niet aansprakelijk voor indirecte schade, gevolgschade of schade door onjuiste montage of gebruik.",
      "Onze aansprakelijkheid is, voor zover wettelijk toegestaan, beperkt tot het bedrag van de betreffende bestelling.",
    ],
  },
  {
    title: "10. Contact",
    body: [
      "Voor vragen over deze voorwaarden kun je contact opnemen via support@wandig.com.",
      "Adres: De Tongelreep 1 - 7, 5684 PZ Best.",
    ],

  },
];

function AlgemeneVoorwaarden() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20 md:px-10 md:py-28">
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Voorwaarden</span>
      <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">Algemene voorwaarden</h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/78">
        Hieronder vind je de afspraken die gelden voor bestellingen bij Wandig. Deze pagina is bedoeld om duidelijk te
        maken wat je van ons mag verwachten en wat wij van jou nodig hebben om je bestelling goed te verwerken.
      </p>

      <div className="mt-14 divide-y divide-border/60 border-y border-border/60">
        {sections.map((section) => (
          <section key={section.title} className="py-7">
            <h2 className="font-serif text-2xl leading-tight">{section.title}</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/74 md:text-base">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
