# Prijs netjes positioneren op de modelkaarten

## Wat er nu misgaat
De prijscomponent lijnt zijn inhoud rechts uit (`items-end`), terwijl titel, betaalinfo, reviews en swatches links uitgelijnd staan. Daardoor:

- Full House: `2.850,-` / `1.995,-` zweeft rechts weg, los van de titel en over de foto heen.
- Duo/Solo: de prijs staat rechts in de kolom in plaats van onder de titel.
- De doorgestreepte prijs en de sale-prijs staan wel al onder elkaar; dat blijft zo.

## Wat we doen

1. Prijscomponent krijgt een uitlijn-optie (`links` of `rechts`), met rechts als standaard zodat het menu en de collectiepagina exact hetzelfde blijven.
2. Op alle drie de modelkaarten wordt de prijs links uitgelijnd, direct onder de titel, met een vaste kleine afstand (4px) tussen titel en prijs.
3. Doorgestreepte prijs klein boven de oranje sale-prijs (zoals nu), beide links op dezelfde lijn als de titel.
4. Full House: het tekstblok (titel + prijs + betaalinfo) wordt één links uitgelijnd blok, zodat er geen losse prijs meer rechts hangt.
5. Kaarthoogte blijft ongewijzigd; alleen de horizontale positionering en de afstand titel-prijs veranderen.

## Daarna
Als de prijs goed staat, kijken we in een volgende stap naar het lege gat in de Duo/Solo-kaarten en de rest van het kaartdesign.

## Technische details
- `src/components/SaleBadge.tsx`: `SalePrice` krijgt prop `align?: "left" | "right"` (default `"right"`), die `items-end` / `items-start` bepaalt.
- `src/routes/index.tsx`: in `ModelCard` (featured en standaard) `align="left"` doorgeven en de fallback-prijs (zonder Shopify-data) dezelfde uitlijning geven.
- Geen wijziging aan prijslogica, Shopify-data of andere pagina's.
