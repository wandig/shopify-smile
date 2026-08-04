# Alternatieven voor de "Bestel gratis kleurstalen" sectie

## Huidige situatie
De sectie "Bestel gratis kleurstalen" op de homepage bestaat uit een grote, afgeronde container (`rounded-[32px]/[48px]`) met links tekst + CTA en rechts een 2-koloms grid van 5 kleurstaalkaarten in een gestaggerde offset-layout. Door de padding, de grote kaarten en de offset neemt de sectie veel verticale ruimte in.

## Doel
De sectie compacter maken zonder de 5 kleuren of de CTA te verbergen, en in lijn houden met de huidige stijl (`#faf8f5`, `#ede7e0`, `#ef7027`, rounded corners, Helvetica/Circular).

## Alternatief A — Compact horizontaal swatch-rijtje
- De container blijft een afgeronde `#ede7e0` kaart, maar met minder padding (`p-5 md:p-8` i.p.v. `p-6 md:p-10 lg:p-16`).
- Tekst + CTA blijven links, maar de kop wordt kleiner (`text-[22px] md:text-[28px]`).
- Rechts geen grote gridkaarten meer, maar één horizontale rij met 5 kleine, vierkante swatches (`60×60px` desktop, `52×52px` mobile) met afgeronde hoeken (`rounded-[10px]`) en een dunne `#ef7027` border op hover.
- Onder elke swatch staat de kleurnaam in kleine tekst (`text-[11px]`).
- Voordeel: minimale hoogte, alle kleuren direct zichtbaar, past makkelijk naast de tekst.

## Alternatief B — Compact 5-kolom raster zonder offset
- De container behoudt dezelfde structuur (tekst links, grid rechts), maar de rechter grid wordt smaller en minder hoog.
- 5 kaarten in een grid van 3 + 2, maar kleiner: kaarten met minder padding (`p-2`), kleinere afbeeldingen (`aspect-[4/3]` i.p.v. `aspect-square`) en geen offset (`mt-6` verwijderd).
- Kop en bodytekst links worden compacter gehouden.
- Voordeel: behoudt de "kaarten"-esthetiek van de huidige sectie, maar neemt veel minder ruimte in.

## Alternatief C — Horizontaal scrollbare mini-carousel (in stijl van "Kies jouw model")
- De sectie krijgt dezelfde verticale side-label als "Kies jouw model" en "Waarom wij".
- Binnen de container: links de kop + CTA, rechts een horizontaal scrollbare rij van 5 kleine swatch-kaarten (`w-[140px]` desktop, `w-[120px]` mobile).
- Elke kaart toont de houtstructuur-afbeelding als klein vierkant bovenaan en de kleurnaam onderaan.
- Geen offset, geen grote grid.
- Voordeel: sluit visueel aan bij de andere carousel-secties op de pagina en is compact in de hoogte.

## Voorstel
Ik pas het gekozen alternatief toe in `src/routes/index.tsx` binnen de `ColorSamplesSection`. De wijziging beperkt zich tot deze sectie; andere secties blijven ongewijzigd.
