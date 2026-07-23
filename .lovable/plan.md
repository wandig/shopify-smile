# Puzzelvormige sectie-overgangen

Doel: de productpagina visueel laten "in elkaar klikken" met subtiele puzzelvormige randen tussen secties, geïnspireerd op het puzzelstukje in het Wandig-logo.

## Aanpak

Eén herbruikbare component `PuzzleDivider` die als SVG-rand tussen secties wordt geplaatst. De divider tekent een horizontale lijn met één (of twee) puzzeluitstulping(en) die van de bovenste sectie in de onderste sectie klikken — of andersom.

### Component

`src/components/PuzzleDivider.tsx`:
- Props: `topColor` (kleur van sectie erboven), `bottomColor` (kleur eronder), `direction` ("down" = uitstulping wijst omlaag, "up" = omhoog), `offset` (horizontale positie van het puzzelstuk in %, default 50).
- Rendert een full-width SVG (`preserveAspectRatio="none"` op de horizontale lijn, vaste hoogte ~40px).
- Het puzzelstukje zelf is een vaste-breedte SVG-shape (~80–100px breed) gecentreerd op de offset, met de klassieke puzzel-tab vorm (halve cirkel met smalle "hals").
- Geen achtergrond/kaart — puur twee gevulde paden zodat het naadloos aansluit op de sectiekleuren erboven/onder.

### Plaatsing op de productpagina

Tussen deze sectie-paren op `src/routes/product.$handle.tsx`, telkens met de juiste `topColor`/`bottomColor` uit de bestaande achtergronden (`#f6f3ee`, `#f1efe4`, `#fff7ef`, `#fffcf8`, `#f7f3ef`):

1. Tussen **Jouw voordelen** en **Specificaties** — puzzelstuk wijst omlaag, offset 50%.
2. Tussen **Eén meubel** (`#f1efe4`) en **Binnenkijken bij onze klanten** — puzzelstuk wijst omhoog, offset 35%.
3. Tussen **Gebouwd om mee te gaan** en **Veelgestelde vragen** — omlaag, offset 65%.
4. Tussen **Reviews** (`#fff7ef`) en **Nieuwsbrief/contact** (`#fffcf8`) — omhoog, offset 50%.

Vier plaatsingen is genoeg om het als terugkerend merk-motief te laten voelen zonder druk te worden. Bestaande sectie-inhoud, padding en kleuren blijven onveranderd; de divider vervangt alleen de harde overgang.

### Detail

- Puzzelstuk-hoogte ~24–28px zodat het opvalt maar niet dominant is.
- Zachte 1px lijn in `#00000010` langs de rand voor definitie (optioneel, alleen als het te "plat" oogt).
- Volledig CSS/SVG — geen extra dependencies, geen animatie (past bij de rustige stijl van de pagina).
- Responsive: op mobiel (<640px) puzzelstuk 60px breed, op desktop 90px.

## Buiten scope

- Geen wijzigingen aan sectie-inhoud, typografie, of andere styling.
- Geen puzzelstukken in andere rollen (achtergrondpatroon, USP-kaarten, configurator) — dat zijn de andere opties uit het vorige bericht en kunnen later.
- Alleen de productpagina; homepage/andere routes blijven ongewijzigd.
