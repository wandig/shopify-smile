# Vast keurmerk-embleem linksonder

Een klein, puur visueel embleem dat vast linksonder in beeld blijft staan terwijl je scrollt — zoals het Thuiswinkel Waarborg-blokje in je voorbeeld. Het is geen link en heeft geen klikgedrag.

## Ontwerp

- Wit kaartje met licht afgeronde hoeken (12px), dunne rand in onze lijn en een zachte schaduw.
- Daarin jouw geüploade logo, netjes gecentreerd, maximaal ~72px breed.
- Positie: linksonder, ~16px van de linkerkant en onderkant.
- `pointer-events: none` zodat het nooit klikken op de site blokkeert.
- Mobiel: iets kleiner (~56px breed) en lagere positie-marge, zodat het de swipe-galerij en dot-indicatoren op de productpagina niet overlapt.
- Verbergen tijdens het openstaan van de winkelwagen-drawer/menu is niet nodig; z-index blijft onder de header/drawer (z-30).

## Waar het komt

In `src/routes/__root.tsx` als los component naast `<SiteFooter />`, zodat het op elke pagina zichtbaar is (home, collectie, product, configurator).

## Technisch

- Nieuw component `src/components/TrustBadge.tsx`: `fixed bottom-4 left-4 z-30 pointer-events-none`, kaartje met `bg-white`, `rounded-xl`, `border`, subtiele shadow.
- Logo als Lovable asset-pointer (`src/assets/<naam>.png.asset.json`) en gerenderd via het bestaande `Img`-component met `loading="lazy"`.
- Geen `<a>`, geen tooltip, geen state — alleen presentatie.

## Nodig van jou

Upload het logo dat in het embleem moet staan; ik zet het dan als asset in het kaartje.
