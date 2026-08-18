# Collectiepagina — Architectural editorial grid

Herontwerp van `/producten` in de gekozen richting: rustige architectonische grid met editorial intro, portret-foto's, kleurstalen over de foto en een strakke outline-CTA. Content en data blijven hetzelfde (Solo, Duo, Full House uit de backend).

## Intro
- Tweekolomskop: links het label "Collectie" in oranje (#ef7027) plus een grote lichte heading; rechts, onderaan uitgelijnd, de korte introtekst.
- Dunne scheidingslijn onder de intro.
- Heading: "Vind jouw perfecte opstelling", met "perfecte" cursief.
- Introtekst blijft over Solo, Duo en Full House vergelijken en kleurstalen wisselen.

## Modelkaarten
- Drie kolommen, ruime tussenruimte; de middelste kaart (Duo) staat op desktop iets hoger voor het asymmetrische ritme.
- Portret-beeldvlak (3/4) op #f6f3ee met dunne rand en zachte schaduw; foto zoomt langzaam in bij hover.
- Kleurstalen liggen linksonder over de foto, met witte rand; ze verschijnen bij hover op desktop en blijven altijd zichtbaar op touch/mobiel. Klikken wisselt de foto zoals nu (crossfade blijft behouden).
- Onder de foto: modelnaam links, "vanaf"-prijs rechts. Bestaande prijslogica blijft (valt terug op "Samenstellen" zonder betaalde variant).
- CTA wordt een volle-breedte outline-knop "Zelf samenstellen" in donker #0f1f2a, die bij hover donker vult met witte tekst, en linkt naar de productpagina.

## Mobiel
Eén kolom, geen verticale offset, kleurstalen permanent zichtbaar, knop volledige breedte.

## Technisch
- Alleen `src/routes/producten.tsx` wordt aangepast (intro-sectie + `CollectionSeriesCard`).
- Bestaande hooks blijven: variant-/kleurselectie, `CrossfadeImage`, image-preloading, `lowestPaidPrice`, standaard 58 – 65 inch.
- Kleurstalen blijven `wandigSwatchStyle` uit `src/lib/wandig-colors.ts` gebruiken; alleen rand en positie veranderen.
- Meta/head van de route blijft ongewijzigd, behalve dat de H1-tekst meebeweegt met de nieuwe kop.
