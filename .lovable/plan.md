# Aanpassing: "Stel jouw tv-wand samen" sectie

## Doel
De bestaande configurator-banner een subtiele layout-compositie-aanpassing geven, zodat de sectie visueel beter aansluit bij de rest van de homepage (ronde containers, verticale labels, rustiger leesvlak) zonder de herkenbaarheid te verliezen.

## Huidige situatie
- Sectie is een full-width banner met achtergrondafbeelding (`configuratorBg`), donkere overlay (`bg-black/25`) en gecentreerde witte tekst.
- Hoogte: 420px mobiel / 620px desktop.
- CTA linkt nu naar `/producten`; gebruiker wil dat deze naar `/configurator` verwijst.

## Voorgestelde aanpassingen

### 1. Compositie: tekst naar links, in een afgerond paneel
- Plaats de tekst niet meer midden op de foto, maar in een afgerond content-paneel links op de banner.
- Paneel krijgt een lichte, semi-transparante warme achtergrond (`bg-[#faf8f5]/92`) met `rounded-[20px]` en padding, vergelijkbaar met de containers in "Kies jouw model" en "Waarom wij".
- Tekst in het paneel wordt links uitgelijnd met de bestaande typografie.

### 2. Verticaal label aan de linkerkant
- Voeg aan de binnenste container een verticaal label "Configurator" toe, in dezelfde stijl als "Kies jouw model" en "Waarom wij" (`writing-mode: vertical-rl`, uppercase, tracking).
- Alleen zichtbaar op desktop; mobiel blijft het label bovenaan als kleine kicker.

### 3. Overlay verzachten
- Verlaag de donkere overlay van `bg-black/25` naar `bg-black/15`, zodat de achtergrondfoto beter zichtbaar is en het paneel voldoende contrast biedt.

### 4. Button-URL wijzigen
- De "Start de configurator"-knop linkt naar `/configurator` in plaats van `/producten`.

### 5. Afmetingen en witruimte
- Behoud de huidige hoogte (420px / 620px), maar voeg horizontale padding toe zodat het paneel niet tegen de rand plakt.
- Zorg dat de sectie binnen de bestaande `max-w-[1456px]`-structuur blijft passen.

## Technische uitvoering
- Wijzigingen in `src/routes/index.tsx`, component `ConfiguratorBannerSection`.
- Geen nieuwe dependencies.
- Behoud bestaande imports en asset-referentie (`configuratorBg`).

## Niet in scope
- Geen wijziging aan de achtergrondafbeelding zelf.
- Geen wijziging aan tekstuele inhoud (titel, ondertitel, button-tekst).
- Geen animaties of interactieve elementen buiten de bestaande button.
