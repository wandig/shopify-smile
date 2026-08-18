# Knop "Configureer jouw kast" in het modellenmenu

Eén losse knop toevoegen in het uitklapmenu "Alle modellen" (header), die naar de configurator-pagina linkt.

## Wat er verandert

- In de linkerkolom van het menu (onder "Solo, Duo en Full House — plug & play tv-wanden…") komt één knop: **Configureer jouw kast**.
- De knop staat boven de bestaande tekstlink "Bekijk alle modellen", zodat de kolom leest als: titel → intro → knop → tekstlink.
- Klik gaat naar `/configurator`; het menu sluit zoals nu bij navigatie.
- Geen knop per modelkaart — de drie productkaarten blijven exact zoals ze nu zijn.

## Stijl

- Pill-vorm, donkerblauw `#0f1f2a` met witte tekst en hover `#1a2d3a`, hetzelfde als de headerknop "Configureer jouw tv-kast".
- Zelfde puzzelicoon links van de tekst, zelfde fontstack en tekstgrootte (14px, medium).
- Alleen desktop, want dit menu is al desktop-only.

## Technisch

- Bestand: `src/components/SiteHeader.tsx`, in de linkerkolom van `ModelsMenu`.
- `Link to="/configurator"` van `@tanstack/react-router` plus `Puzzle` uit lucide-react (beide al geïmporteerd in dit bestand).
