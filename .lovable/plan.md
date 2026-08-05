# Kleurkeuze op de productkaarten in "Kies jouw model"

## Doel
Op elke kaart (Full House, Duo, Solo) kun je een van de 5 kleuren kiezen. De productafbeelding op de kaart wisselt mee met de gekozen kleur.

## De 5 kleuren
- Walnootbruin — houtpatroon (bestaande swatch-foto)
- Truffelbruin — houtpatroon (bestaande swatch-foto)
- Cashmere — effen kleur
- Wit — effen kleur
- Blush — effen kleur

## Wat we bouwen
1. Kleurenlijst met per kleur: naam, type (houtfoto of effen) en de waarde (swatch-afbeelding of hex-kleur).
2. Rij ronde swatches onderaan elke kaart, op dezelfde regel als de reviews/meta en het mandje-icoon.
   - Houtkleuren: kleine ronde foto van het houtpatroon.
   - Effen kleuren: ronde vlakken in de kleur met een dun randje zodat Wit ook zichtbaar blijft.
   - Actieve kleur krijgt een ring in de huisstijlkleur (#ef7027); geen fade-effect.
   - Kleurnaam verschijnt subtiel bij hover/selectie.
3. Selectie-gedrag
   - Elke kaart houdt zijn eigen gekozen kleur bij (standaard de eerste kleur).
   - Klik op een swatch wisselt alleen de kleur; het opent niet de productpagina.
   - De kaartafbeelding wisselt naar de foto van dat model in die kleur, met een zachte crossfade.
4. Afbeeldingen per kleur
   - Per model en per kleur is één foto nodig (3 modellen x 5 kleuren = 15).
   - Zolang een kleurfoto ontbreekt, valt de kaart terug op de huidige hoofdafbeelding, zodat er nooit een lege kaart is.
   - Zodra je de foto's uploadt, zet ik ze als CDN-assets in de kleurenlijst.

## Wat ik van jou nodig heb
- De hex-codes (of stalen) van Cashmere, Wit en Blush.
- De productfoto's per kleur per model. Lever je ze in delen, dan vullen we ze stap voor stap aan.

## Technische details
- Alles in `src/routes/index.tsx`: nieuwe `MODEL_COLORS`-constante, `imagesByColor` per product en een kleine `ColorSwatches`-component.
- Lokale React-state per kaart; geen backend, geen nieuwe dependencies.
- Swatch-knoppen zijn echte buttons met aria-label en `stopPropagation`/`preventDefault` binnen de kaartlink, zodat navigatie niet triggert.
