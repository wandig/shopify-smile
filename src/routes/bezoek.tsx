import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bezoek")({
  head: () => ({
    meta: [
      { title: "Bezoek ons — Wandig" },
      { name: "description", content: "Kom langs in onze showroom en ervaar onze cinewalls in het echt." },
    ],
  }),
  component: Bezoek,
});

function Bezoek() {
  return (
    <div className="mx-auto max-w-3xl px-5 md:px-10 py-20 md:py-28">
      <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Showroom</span>
      <h1 className="font-serif text-5xl md:text-7xl mt-4 leading-[0.95]">Bezoek ons</h1>
      <p className="mt-8 text-foreground/80 leading-relaxed text-lg">
        Plan een bezoek aan onze werkplaats en showroom. Voel het materiaal, bekijk de afwerkingen en
        bespreek je ruimte met een van onze adviseurs.
      </p>
      <div className="mt-12 grid sm:grid-cols-2 gap-8 text-sm">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Adres</div>
          <p>Wandig Showroom<br />Werkplaatsstraat 1<br />Nederland</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Openingstijden</div>
          <p>ma — vr · 09:00 — 17:00<br />za · op afspraak</p>
        </div>
      </div>
    </div>
  );
}
