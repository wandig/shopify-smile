# Modellen-sectie op de collectiepagina herontwerpen

De drie kaartjes onder de hero worden een vergelijk-layout: je ziet Solo, Duo en Full House naast elkaar met dezelfde specs op dezelfde regel, zodat kiezen makkelijk wordt.

## Wat er verandert

**Sectiekop toevoegen**
- Kleine oranje eyebrow "Drie modellen", titel "Welke Wandig past bij jouw wand?" en een korte introregel.
- Onder de titel een regel die vermeldt dat alle modellen plug & play zijn en in 8 kleuren leverbaar.

**Kaart per model wordt informatiever en vergelijkbaar**
Elke kaart krijgt dezelfde vaste rijen op exact dezelfde hoogte, zodat kolommen visueel uitlijnen:

```text
┌──────────────────────┐
│ lifestyle foto 4:3   │
├──────────────────────┤
│ Wandig Solo   vanaf  │
│               750,-  │
│ korte pitch (2 regels)│
├──────────────────────┤
│ Breedte      158 cm  │
│ Modules      1        │
│ Opbergruimte Compact  │
│ Hoogte       180 cm   │
├──────────────────────┤
│ ● ● ● ● ●  kleuren    │
├──────────────────────┤
│ [ Bekijk Solo ]       │
│  Zelf samenstellen →  │
└──────────────────────┘
```

- Specrijen met dunne scheidingslijnen: Breedte, Modules, Opbergruimte, Hoogte. Waarden komen uit de bestaande maatgegevens (58 - 65 inch als referentiemaat), dus geen nieuwe data nodig.
- Prijs wordt consistent "vanaf 750,-" in plaats van klein rechts los.
- Kleurstalen blijven werken zoals nu (foto wisselt mee), met het aantal kleuren erbij vermeld.
- Primaire CTA wordt een volle oranje knop "Bekijk <model>"; secundaire tekstlink "Zelf samenstellen".
- Middelste kaart (Duo) krijgt een subtiel "Meest gekozen"-label en iets sterkere rand, zodat de vergelijking een aanbeveling heeft.

**Onder de kaarten**
- Eén regel met link naar de configurator: "Twijfel je? Stel zelf je wand samen."

## Stijl
Bestaande Wandig-stijl blijft: achtergrond #fbfaf8, witte kaarten met dunne ring, 16px ronde hoeken, oranje #ef7027 accenten, Circular/Helvetica Neue. Geen nieuwe kleuren of fonts.

## Technisch
- Alles in `src/routes/producten.tsx`: sectiekop toevoegen en `CollectionSeriesCard` uitbreiden met specrijen, "vanaf"-prijs, badge en CTA-knop.
- Specwaarden uit `WANDIG_SIZES` (`src/lib/wandig-dimensions.ts`) via `wandigWidth`/`formatCm`, met per model het aantal modules (Solo 0, Duo 1, Full House 2).
- Prijs blijft via `lowestPaidPrice`; "Samenstellen" alleen als fallback wanneer er geen betaalde variant is.
- Grid blijft 1 / 2 / 3 koloms; kaarten gebruiken flex met vaste blokken zodat rijen tussen kaarten uitlijnen. Geen wijziging aan hero, benefits-bar of datafetching.
