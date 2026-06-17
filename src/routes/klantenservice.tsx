import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/klantenservice")({
  head: () => ({
    meta: [
      { title: "Klantenservice — Wandig" },
      { name: "description", content: "Hulp nodig? Onze klantenservice staat voor je klaar." },
    ],
  }),
  component: Klantenservice,
});

function Klantenservice() {
  const faq = [
    { q: "Hoe lang duurt de levering?", a: "Onze cinewalls worden in vaste uitvoeringen gemaakt en hebben een levertijd van 4 tot 6 weken." },
    { q: "Moet ik de cinewall zelf plaatsen?", a: "Ja, de cinewall is plug & play ontworpen en eenvoudig zelf te plaatsen. Gratis levering zit standaard inbegrepen in Nederland." },
    { q: "Welke garantie krijg ik?", a: "Wij geven 5 jaar garantie op alle modellen en alle afwerkingen." },
    { q: "Kan ik mijn eigen maatvoering opgeven?", a: "Je kiest uit vaste maten, kleuren en opstellingen. Zo blijft het bestellen eenvoudig en overzichtelijk." },
  ];
  return (
    <div className="mx-auto max-w-3xl px-5 md:px-10 py-20 md:py-28">
      <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Hulp</span>
      <h1 className="font-serif text-5xl md:text-7xl mt-4 leading-[0.95]">Klantenservice</h1>
      <p className="mt-8 text-foreground/80 leading-relaxed text-lg">
        Vragen over onze cinewalls, plug & play modellen of bezorging? Stuur ons een bericht via{" "}
        <a href="mailto:info@wandig.nl" className="underline">info@wandig.nl</a>.
      </p>
      <div className="mt-16 divide-y divide-border/60 border-y border-border/60">
        {faq.map((f) => (
          <div key={f.q} className="py-6">
            <h3 className="font-serif text-2xl">{f.q}</h3>
            <p className="mt-2 text-foreground/75">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
