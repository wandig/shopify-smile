# Plan: 9 desktop-richtingen voor "Stel jouw tv-wand samen"

## Context
De huidige homepage bevat een "Stel jouw tv-wand samen" banner. Op desktop is dit nu een editorial 60/40 split (afbeelding links, tekst rechts in een zachte beige card). De gebruiker wil de overige 9 van de 10 eerder bedachte alternatieven visueel zien en vervolgens één laten doorvoeren.

## Doel
9 onderscheidende desktop-layouts genereren als klikbare prototypes, zodat de gebruiker er één kan kiezen om te implementeren.

## Aanpak
1. Screenshot van de huidige sectie is al vastgelegd.
2. Genereer 9 richtingen in 3 sets van 3, elk met een eigen structuur, energie en visueel concept:
   - Set A: Compact centered product card, Asymmetric broken grid, Full-bleed lifestyle background met overlay
   - Set B: Magazine two-column layout, Framed product stage, Wide panoramic banner
   - Set C: Typography-first minimal layout, Configurator preview met kleur-swatches, CTA + social proof combo
3. Presenteer alle 9 richtingen als visuele prototypes via een keuzevraag.
4. Implementeer de gekozen richting in `src/routes/index.tsx`, alleen voor de desktopversie (`lg:` breakpoint). Mobiel blijft ongewijzigd.

## Technisch
- Wijzigingen beperkt tot `ConfiguratorBannerSection` in `src/routes/index.tsx`.
- Behoud bestaande afbeelding (`configuratorBg`), kleuren (`#faf8f5`, `#ef7027`) en typografie.
- Geen nieuwe dependencies.
