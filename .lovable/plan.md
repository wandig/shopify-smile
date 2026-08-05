Betaalinfo toevoegen aan "Kies jouw model" productkaarten

Doel
Een visuele betaalinfo-regel toevoegen onder de prijs van elke productkaart in de "Kies jouw model" sectie, geïnspireerd op het voorbeeld met Klarna, iDEAL en "3x €91,65, 0% rente".

Wat we bouwen
1. Nieuwe component `PaymentInfo` in `src/routes/index.tsx`
   - Toont Klarna- en iDEAL-logo's als kleine badges.
   - Toont tekst "Of 3x €<bedrag>, 0% rente".
   - Het bedrag wordt automatisch berekend door de productprijs door 3 te delen.

2. Prijs-parser helper
   - De huidige prijzen in `PRODUCTS` zijn strings zoals "1.699,-".
   - Een kleine helper zet dit om naar een getal (1700) en berekent `Math.round(prijs / 3)`.
   - We formatteren het resultaat als "€565,-" (Nederlands formaat).

3. Plaatsing op de kaarten
   - Featured "Full House" kaart: betaalinfo direct onder de prijs in het midden van de kaart.
   - Duo- en Solo-kaarten: betaalinfo direct onder de prijs, boven de reviews/meta.
   - Op alle 3 de kaarten op dezelfde manier visueel consistent.

4. Styling
   - Kleine, lichte badges met afgeronde hoeken passend bij de huidige warme, minimalistische stijl.
   - Tekst in de bestaande site-kleuren (`#071426` / `#071426`/70) met bestaande lettertype-stack.
   - Niet te veel hoogte toevoegen; compact houden zodat de kaarten in verhouding blijven.

Benodigd van jou
- Upload de officiële Klarna- en iDEAL-logo's in de chat. Ik zet deze om naar CDN assets (`src/assets/klarna-logo.png.asset.json` en `src/assets/ideal-logo.png.asset.json`) en gebruik ze in de component.

Technische details
- Bestand: `src/routes/index.tsx`.
- Geen echte betaalprovider-koppeling; puur visueel.
- Geen extra dependencies.
- Type-safe prijsberekening met fallback als parsing faalt.
