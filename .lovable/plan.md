# Plan: 9 desktop-richtingen voor "Stel jouw tv-wand samen"

## Context
De huidige homepage bevat een "Stel jouw tv-wand samen" banner. Op desktop is dit nu een editorial 60/40 split (afbeelding links, tekst rechts in een zachte beige card). De gebruiker wilde de overige 9 van de 10 eerder bedachte alternatieven visueel zien en vervolgens één laten doorvoeren.

## Gekozen richting
De gebruiker koos uit set A de richting **"Architectural layered canvas"**: een 12-koloms desktop-layout waarbij een grote afgeronde lifestyle-afbeelding 8 kolommen beslaat en een witte content-card met schaduw er deels overheen "float" (5 kolommen, negatieve marge). De card bevat kicker, titel met cursief accent, body, oranje CTA, secundaire link en een subtiele statusregel.

## Te implementeren
1. Vervang de desktopversie (`lg:` breakpoint) van `ConfiguratorBannerSection` in `src/routes/index.tsx` door de gekozen "Architectural layered canvas"-layout.
2. Behoud de bestaande mobiele banner (full-bleed afbeelding met overlay-tekst) ongewijzigd.
3. Gebruik bestaande projectassets: `configuratorBg` en houtafwerking swatches (`swatchEikenzwart`, `swatchWalnootbruin`, `swatchTruffelbruin`).
4. Behoud huisstijl: achtergrond `#faf8f5`, oranje CTA `#ef7027`, bestaande font-stack, `max-w-[1456px]` sectiebreedte.
5. Geen nieuwe dependencies of functionaliteit toevoegen.

## Resultaat
De "Stel jouw tv-wand samen"-sectie krijgt op desktop een premium, gelaagde editorial-uitstraling met de afbeelding als middelpunt en een zwevende content-card als CTA.
