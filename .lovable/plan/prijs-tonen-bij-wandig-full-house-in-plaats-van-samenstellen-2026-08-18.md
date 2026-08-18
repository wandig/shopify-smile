# Prijs tonen bij Wandig Full House in plaats van "Samenstellen"

## Waarom het nu gebeurt

De kaart toont de prijs alleen als de laagste variantprijs groter dan 0 is; anders verschijnt het oranje label "Samenstellen". Bij Full House staat er in de backend minstens één variant op 0,-, waardoor de laagste prijs 0 is en het label wordt gebruikt in plaats van een bedrag. (De productdata kon ik niet live nakijken: de Shopify-verbinding is verlopen.)

## Wat we gaan doen

- De prijs op de modelkaarten berekenen als de laagste variantprijs die groter dan 0 is, in plaats van simpelweg de laagste variantprijs.
- Zo toont Full House gewoon "vanaf 2.499,-" (of wat de echte laagste betaalde variant is) net als Solo en Duo.
- Alleen als er echt geen enkele variant met een prijs boven 0 bestaat, valt de kaart terug op "Samenstellen".
- Zelfde logica op de collectiepagina, zodat menu en /producten hetzelfde bedrag tonen.

## Technisch

- `src/components/SiteHeader.tsx` (menu-kaarten) en `src/routes/producten.tsx` (collectiekaarten): prijs afleiden uit `variants.edges` met `price.amount > 0` en de minimum daarvan formatteren via `formatPrice`.
- Optioneel klein hulpfunctietje in `src/lib/shopify.ts` (`lowestPaidPrice`) zodat beide plekken dezelfde berekening gebruiken.
- Geen wijziging in de Shopify-data zelf. Als de variant van 0,- eigenlijk een echte prijs hoort te hebben, kan ik die daarna in de backend zetten — dan is de front-end fallback niet meer nodig.
