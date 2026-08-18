# Collectiepagina in Wandig-stijl

De referentie (Cloudpillo) geeft de structuur: split hero, pill-filters, en een grid met gecentreerde productkaarten. We bouwen die structuur, maar in het warme Wandig-jasje: achtergrond #faf8f5, oranje accent #ef7027, ronde hoeken, Circular/Helvetica Neue, veel witruimte.

## 1. Hero (split, tekst links / foto rechts)
- Links: kicker "Collectie", grote titel "Alle modellen", korte intro over Solo, Duo en Full House.
- Twee knoppen: "Configureer jouw kast" (oranje, pill, naar /configurator) en "Bekijk modellen" (wit met dunne rand, scrollt naar de grid).
- Onder de knoppen de reviewbalk: 5 sterren + "1000+ beoordelingen" (zelfde stijl als de homepage-hero).
- Rechts: bestaande lifestyle-foto (after-livingroom of solo-woonkamer-lamp), volledige hoogte, ronde hoek aan de binnenkant.
- Mobiel: foto boven, tekst eronder.

## 2. Kleurfilter-pills
- Rij pills onder de hero: Alle kleuren, Walnootbruin, Donkereiken, Cashmeregrijs, Dofroze, Kristalwit.
- Pill-stijl: wit, pill-vorm, dunne rand; actief = oranje rand + oranje tekst (in plaats van het blauw uit de referentie).
- Bij het kiezen van een kleur wisselen alle kaarten in de grid naar de foto van die kleur (bestaande variant-image-logica). "Alle kleuren" zet elke kaart terug op zijn eigen standaardkleur.
- Horizontaal scrollbaar op mobiel.

## 3. Productkaarten (3 in de grid)
- Badge linksboven op de foto, per model: Solo = "Compact", Duo = "Meest gekozen", Full House = "Compleet". Kleine pill, witte achtergrond, donkere tekst.
- Gecentreerde inhoud onder de foto: modeltitel, korte intro (1-2 regels uit de bestaande serie-copy) en daaronder de prijs in Wandig-formaat ("vanaf 1.699,-").
- Hele kaart klikbaar naar de productpagina; kaart wit, ronde hoeken, hele lichte schaduw, gelijke hoogte.
- Kleurswatches en de "Zelf samenstellen"-link vervallen op de kaart (de kleur kies je nu via de filter-pills bovenaan).

## Technisch
- Alles in `src/routes/producten.tsx`; hergebruik `lowestPaidPrice`/`formatPrice` uit `src/lib/shopify.ts`, `sortWandigColors`/`displayWandigColor` uit `src/lib/wandig-colors.ts` en de bestaande `CrossfadeImage`.
- Kleurfilter als state op paginaniveau, doorgegeven aan de kaarten; kaart valt terug op zijn eigen eerste kleur als de gekozen kleur niet bestaat voor dat model.
- Hero-foto via bestaande asset-pointer (`@/assets/...asset.json`), geen nieuwe uploads nodig.
- Secties op `max-w-[1456px]` zoals de rest van de site; head()-meta van de route blijft ongewijzigd.
