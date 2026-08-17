# Configuratie doorvoeren naar de specificaties

De specificatiesectie onder de configurator toont nu een vaste schematische tekening en algemene tekst. Die wordt gekoppeld aan wat je in de configurator kiest: kleur en het aantal modules (links/rechts), naast de al dynamische breedte en hoogte.

## Wat je gaat zien

- In plaats van de vaste schematekening: een live weergave van jouw kast — dezelfde modules in dezelfde kleur als in de configurator, in exact hetzelfde formaat als de huidige afbeelding (zelfde hoogte/breedte van het kader, inclusief de maatlijnen eromheen).
- Kies je Blush met alleen een linkermodule, dan staat daar Blush met linker- en middenmodule.
- In de accordeon "Afmetingen" komen twee extra regels: **Kleur** (bijv. Blush) en **Modules** (bijv. "Midden + links (2)").
- De maatlijnen blijven de al werkende breedte/hoogte van de gekozen tv-maat tonen.
- Op de productpagina blijft de bestaande schematekening staan (daar kies je geen modules); alleen breedte/hoogte blijven daar meelopen met de tv-maat.

## Technische aanpak

`src/components/ProductStorySections.tsx`
- `SpecificationsSection` krijgt twee optionele props: `preview?: ReactNode` (vervangt de schema-afbeelding wanneer meegegeven, binnen hetzelfde padding-/maatframe) en `configSummary?: { colorLabel?: string; modulesLabel?: string }`.
- `buildSpecSections` krijgt die labels mee en voegt de regels Kleur en Modules bovenaan de lijst "Afmetingen" toe wanneer aanwezig.
- Fallback blijft ongewijzigd: zonder props precies het huidige gedrag (schema-afbeelding).

`src/routes/configurator.tsx`
- De bestaande module-compositie (`CroppedModuleImage` met de `MODULE_CROPS` voor left/center/right en `moduleSource` op basis van de gekozen kleur) wordt hergebruikt in een kleine, niet-interactieve `ConfigPreview`: links/midden/rechts naast elkaar, flush, zonder plus/min-knoppen en zonder animatie, geschaald op de breedte van het kader zodat het formaat gelijk is aan de huidige afbeelding.
- Die preview wordt als `preview` doorgegeven, samen met `configSummary={{ colorLabel: displayWandigColor(color), modulesLabel: ... }}` waarbij het label wordt opgebouwd uit `hasLeft`/`hasRight` (bijv. "Midden + links (2)", "Midden + links en rechts (3)", "Alleen midden (1)").
- `widthLabel`/`heightLabel` blijven zoals nu doorgegeven.

Geen wijzigingen aan data, prijzen of Shopify-logica.
