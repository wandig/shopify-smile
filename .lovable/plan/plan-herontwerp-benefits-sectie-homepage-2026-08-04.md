# Plan: Herontwerp benefits-sectie homepage

## Context
De tweede sectie op de homepage (`HeroBenefitsSection` in `src/routes/index.tsx`, regels 144-186) toont drie USP's in een 3-koloms grid:
- "Uit eigen werkplaats" / +4.000 tv-wanden
- "Jouw woonkamer is belangrijk voor ons" / 97% klanttevredenheid
- "Kies met volledige gemoedsrust" / 100 dagen proefkijken

De gebruiker ervaart deze sectie als te chaotisch.

## Gekozen richting
- **Kleurenpalet:** Warm Cream (`#faf8f5`, `#f0e4d5`, `#ef7027`, `#071426`)
- **Typografie:** Circular/Helvetica-achtig (huidige huisstijl)
- **Layout:** Horizontale rij (3 kaarten naast elkaar)

## Alternatieven

### Optie A — Genummerde minimal cards
Drie kaarten in een rij, elk voorzien van een groot, subtiel grijs/oranje nummer (01, 02, 03) linksboven. De kicker vervalt of wordt kleiner. Titel en body krijgen meer ademruimte en een duidelijke hiërarchie. De kaarten hebben een lichte `#ffffff` achtergrond met zachte schaduw op een `#faf8f5` sectie-achtergrond, zodat ze als rustige eenheden lezen in plaats van losse tekstblokken.

### Optie B — Icon + single-line statements
Elke kolom bestaat uit een compacte kaart met een rond, licht oranje icoon-vlak bovenaan. De titel wordt kort en krachtig (bijv. "+4.000 tv-wanden"), de body tekst wordt ingekort tot één zin, en de kicker komt te vervallen. De drie kaarten worden visueel gelijkwaardig gehouden met veel witruimte ertussen, waardoor de sectie rustiger overkomt.

### Optie C — Horizontale trust bar
In plaats van drie tekstkaarten wordt de sectie één lage, full-width balk met drie korte claims naast elkaar, gescheiden door verticale lijnen of subtiele bullets. Elk item heeft een klein icoon en een korte regel tekst (bijv. "+4.000 tv-wanden · Uit eigen werkplaats"). Deze variant is het meest compact en vermindert visuele fragmentatie tot een minimum.

## Werkwijze
1. Vastleggen huidige preview als visueel referentiepunt.
2. Drie rendered design directions genereren op basis van bovenstaande opties.
3. Gebruiker kiest een richting.
4. Gekozen richting implementeren in `src/routes/index.tsx`.
5. Mobiel en desktop testen in de preview.
