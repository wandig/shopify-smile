# Solo in de specificaties in plaats van Full House

Op `/product/solo` toont de sectie "Specificaties" nu de Full House-opstelling: de preview is opgebouwd uit uitsneden van Full House-foto's (linker + midden + rechter module) en de breedte wordt berekend als midden + twee zijmodules.

## Wat we gaan doen

1. **Preview per model maken.** Voor de Solo geen samengestelde modulepreview meer, maar de echte Solo-productfoto van de op dat moment gekozen kleur en tv-maat (dezelfde "Closed Front"-foto die bovenaan de galerij hoort bij die combinatie). Kies je een andere kleur of maat, dan verandert de preview mee — net zoals nu bij Full House.
2. **Afmetingen kloppend maken.** Voor de Solo alleen de breedte van de middenmodule tonen (58 - 65 inch = 158 cm) in plaats van de totaalbreedte met twee zijmodules. Hoogte blijft de wandhoogte van de gekozen maat.
3. **Full House ongewijzigd.** Op `/product/full-house` en op de configurator blijft de bestaande modulepreview en de totaalbreedte precies zoals nu.

## Technisch

- `src/routes/product.$handle.tsx`: `specWidthLabel` afhankelijk maken van het model (`wandigWidth(dimensionSize, 0)` voor Solo, `2` voor Full House). De `preview`-prop van `SpecificationsSection` voor `product.handle === "solo"` een eenvoudige `<img>` geven op basis van de eerste foto uit de al berekende `images`/`galleryItems` (die volgt kleur + maat), met dezelfde 16:9 verhouding en objectpassing als de bestaande preview zodat de opmaak identiek blijft.
- Geen wijziging in `WandigModulePreview.tsx`, `wandig-dimensions.ts` of de configurator.
