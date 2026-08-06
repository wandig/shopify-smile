Aangepaste scrollbalk voor de hele site

Doel
De standaard browser-scrollbalk vervangen door een minimale, dunne scrollbalk die past bij de huidige warme, minimalistische stijl van de site.

Wat we bouwen
1. Globale WebKit-scrollbalk in `src/styles.css`
   - Dunne balk: `width: 6px` / `height: 6px`.
   - Track volledig transparant.
   - Duim (thumb) afgerond (`border-radius: 9999px`) in een zachte tint van de voorgrondskleur (`oklch(0.45 0.01 60 / 0.25)`), zodat hij subtiel zichtbaar is tegen de lichte achtergrond.
   - Hover-state voor de duim iets zichtbaarder (`opacity` of donkerder tint).
   - Toegepast op `html`, `body` en alle scrollbare elementen via `::-webkit-scrollbar`, `::-webkit-scrollbar-track` en `::-webkit-scrollbar-thumb`.

2. Onaangeroerd laten
   - Carrousels en andere elementen die al `.scrollbar-hide` gebruiken blijven zonder scrollbalk.
   - Geen wijzigingen aan functionaliteit, layout of componenten.

Technische details
- Bestand: `src/styles.css`.
- Geen extra dependencies.
- Alleen WebKit/Blink (Chrome, Safari, Edge). Firefox behoudt de standaard OS-scrollbalk, zoals afgesproken.
