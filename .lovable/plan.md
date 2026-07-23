# Opties om de afbeelding in "Eén meubel" compacter te maken

Huidige situatie:
- Sectie heeft titel/tekst bovenaan.
- Before/after-slider staat eronder op volle breedte met aspect-ratio `5 / 3`.
- Onder de slider staan 3 USP's.

Doel: minder verticale ruimte innemen met de afbeelding, zonder dat het visueel uit de toon valt.

## Optie A: Slider smaller maken door bredere aspect-ratio
- Aspect-ratio wijzigen van `5 / 3` naar bijvoorbeeld `21 / 9` of `2.5 / 1`.
- De afbeelding wordt horizontaal uitgesneden (minder hoogte), maar blijft volle breedte behouden.
- Eenvoudigste aanpassing, minimale impact op de rest van de layout.
- Nadeel: minder van de kamer is zichtbaar.

## Optie B: Tekst naast de slider op desktop (2-koloms)
- Op desktop: linker kolom bevat titel + intro + USP's, rechter kolom bevat de slider.
- Slider krijgt een vaste hoogte (bijv. 320px) en past zich aan binnen de kolom.
- Op mobiel blijft alles onder elkaar staan.
- Voordeel: tekst en afbeelding delen de ruimte, sectie wordt compacter.
- Nadeel: slider wordt smaller, voor/na-effect is iets kleiner.

## Optie C: Compacte strip met voor/na toggle
- Geen grote slider meer, maar twee kleinere afbeeldingen naast elkaar in een rij.
- Gebruiker klikt/tapt op "Voor" of "Na" om te wisselen, of er is een subtiele swipe.
- Afbeeldingen krijgen bijv. `aspect-ratio: 16 / 10` en max-hoogte `240px`.
- Voordeel: zeer compact, snel te scannen.
- Nadeel: verliest het interactieve "sleep"-effect van de huidige slider.

## Optie D: Gecentreerde slider met maximale breedte
- Slider krijgt `max-w-4xl mx-auto` in plaats van volle breedte.
- Aspect-ratio kan blijven of iets smaller (`5 / 3` of `16 / 9`).
- Door smaller te zijn op breed scherm neemt hij minder totale ruimte in.
- Voordeel: behoudt interactie en verhoudingen, rustiger op grote schermen.
- Nadeel: op mobiel verandert er weinig.

## Aanbeveling
Optie **B** (tekst naast slider op desktop) geeft de meeste ruimtewinst zonder de interactie op te geven. Optie **A** is het snelst te implementeren als je alleen de hoogte wilt verkleinen.

Welke richting wil je doornemen?