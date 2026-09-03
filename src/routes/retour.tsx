import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/retour")({
  head: () => ({
    meta: [
      { title: "Retourneren — Wandig" },
      {
        name: "description",
        content: "Lees hoe retourneren, herroepen, schade melden en garantie werkt bij Wandig.",
      },
    ],
  }),
  component: Retour,
});

const returnSteps = [
  {
    title: "1. Meld je retour aan",
    body: "Mail binnen 14 dagen na ontvangst naar info@wandig.nl met je ordernummer, naam en de reden van retour. Voeg bij schade altijd duidelijke foto's toe.",
  },
  {
    title: "2. Wacht op instructies",
    body: "Wij controleren je aanvraag en sturen je de retourinstructies. Stuur een product niet terug zonder bevestiging, zodat we schade en vertraging kunnen voorkomen.",
  },
  {
    title: "3. Verpak het product goed",
    body: "Gebruik bij voorkeur de originele verpakking. Het product moet compleet, schoon en stevig beschermd retour komen.",
  },
  {
    title: "4. Terugbetaling",
    body: "Na ontvangst en controle betalen we het aankoopbedrag terug via dezelfde betaalmethode. Eventuele waardevermindering door gebruik of schade kan worden verrekend.",
  },
];

function Retour() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20 md:px-10 md:py-28">
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Service</span>
      <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">Retourneren</h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/78">
        We willen dat je zeker bent van je Wandig. Op deze pagina lees je hoe retourneren, herroepen en schade melden
        werkt. Heb je twijfel? Mail ons voordat je iets terugstuurt, dan kijken we met je mee.
      </p>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <div className="rounded-[16px] bg-[#f4f1ed] p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Retourtermijn</div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/76">
            Voor standaardproducten kun je je bestelling binnen 14 dagen na ontvangst aanmelden voor retour. Daarna heb
            je nog 14 dagen om het product daadwerkelijk terug te sturen.
          </p>
        </div>
        <div className="rounded-[16px] bg-[#f4f1ed] p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Contact</div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/76">
            Mail je retouraanvraag naar{" "}
            <a href="mailto:support@wandig.com" className="underline underline-offset-4">
              support@wandig.com
            </a>

            . Vermeld altijd je ordernummer.
          </p>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-3xl leading-tight">Zo werkt retourneren</h2>
        <div className="mt-6 divide-y divide-border/60 border-y border-border/60">
          {returnSteps.map((step) => (
            <div key={step.title} className="py-6">
              <h3 className="font-serif text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/74 md:text-base">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl leading-tight">Wat kan retour?</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/74 md:text-base">
            <li>Standaardproducten die compleet, schoon en onbeschadigd zijn.</li>
            <li>Producten die niet verder zijn gebruikt dan nodig is om ze te bekijken.</li>
            <li>Accessoires of onderdelen in originele staat en verpakking.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl leading-tight">Wat kan niet retour?</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/74 md:text-base">
            <li>Producten die speciaal op jouw verzoek zijn aangepast of gepersonaliseerd.</li>
            <li>Producten met gebruiksschade, montageschade of ontbrekende onderdelen.</li>
            <li>Retouren die niet vooraf zijn aangemeld en bevestigd.</li>
          </ul>
        </div>
      </section>

      <section className="mt-14 rounded-[18px] bg-[#fef7ee] p-6 md:p-8">
        <h2 className="font-serif text-3xl leading-tight">Schade of verkeerd geleverd?</h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/76 md:text-base">
          Controleer je levering direct na ontvangst. Is er transportschade of klopt er iets niet? Mail ons zo snel
          mogelijk met foto's van de verpakking, het product en je ordernummer. We zoeken dan een passende oplossing.
        </p>
        <Link
          to="/klantenservice"
          className="mt-6 inline-flex rounded-full bg-[#ef7027] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#d55f1e]"
        >
          Naar klantenservice
        </Link>
      </section>
    </div>
  );
}
