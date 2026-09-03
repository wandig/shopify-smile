# 'Kies jouw model' kaarten: Moma Fine-verhoudingen voor tablet/telefoon

## Doel
De productkaarten in de homepage-sectie "Kies jouw model" qua opbouw laten aansluiten bij de referentie-kaart (Moma Fine), maar met behoud van de Wandig-huisstijl. De focus ligt op de tablet- en telefoonweergave: meer beeld, compacter tekstblok, duidelijke hiërarchie.

## Wat we doen

1. Afbeelding domineert de kaart
   - Vergroot de afbeelding-zone op telefoon en tablet zodat het visuele deel (minimaal) ~60% van de kaart inneemt.
   - Behoud de ronde hoeken en warme achtergrond.
   - Geen extra tekst of overlay over de afbeelding; titel/prijs komen eronder, net als in de referentie.

2. Tekstzone compacter en gestapeld
   - Titel en prijs komen direct onder de afbeelding, verticaal gestapeld, met dezelfde prominente lettergrootte/gewicht als de referentie.
   - Eventuele korting (doorgestreepte prijs) blijft zichtbaar maar compact onder de verkoopprijs.
   - Reviews, meta en kleurswatchjes verhuizen naar een compacte onderste regel.
   - De oranje mand/knop blijft rechtsonder, maar krijgt dezelfde visuele nadruk als de ronde actieknop in de referentie.

3. Behouden Wandig-elementen
   - Kleuren: `#faf8f6`/`#faf8f5` achtergrond, `#071426` tekst, `#ef7027` accenten.
   - Bestaande lettertypes (Circular-Regular / Helvetica Neue stack) blijven.
   - Betalingsinfo (`PaymentInfo`) blijft bestaan, maar in een meer ingetogen variant op kleinere schermen of indien nodig achter een korte "vanaf" regel.
   - De kleurkeuze (swatches) blijft beschikbaar, zij het compacter.

4. Featured Full House kaart
   - Op tablet/telefoon geen absolute tekst meer over de afbeelding; deze kaart krijgt dezelfde structuur als Duo/Solo, maar kan groter of breder blijven om de uitgelichte positie te behouden.
   - Optioneel: een subtiel "Uitgelicht"-label boven de afbeelding, maar zonder de huidige scrim/overlay.

5. Geen wijzigingen aan functionaliteit
   - Klik op de kaart blijft naar de productpagina leiden.
   - Swatch-knoppen blijven klikbaar zonder navigatie te triggeren.
   - Live Shopify-prijzen, reviews-toggle en betalingsinfo blijven werken.

## Technische details
- Bestand: `src/routes/index.tsx` (component `ModelCard` en `ProductCarouselSection`).
- Geen nieuwe dependencies.
- Afbeelding blijft via `CrossfadeModelImage` met bestaande lazy-loading en CDN-optimalisatie.
- Wijzigingen alleen in de responsive (telefoon/tablet) opmaak; desktop kan grotendeels ongewijzigd blijven tenzij de verhoudingen daar ook beter worden.

## Validatie
- Playwright screenshots op telefoon (390×844) en tablet (768×1024) om de nieuwe verhoudingen te controleren.
- TypeScript-check na de wijzigingen.
