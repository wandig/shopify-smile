# Verjaardagsale 30% korting — visuele weergave

## Doel
Een tijdelijke, cleane verjaardagsale communiceren (30% korting) zonder dat de front-end zelf prijzen herberekent. De prijzen worden in Shopify handmatig aangepast; de site toont alleen badges en, waar beschikbaar, een doorgehaalde "van"-prijs op basis van Shopify's `compareAtPrice`.

## Waar we het tonen

1. **Announcement bar** — bovenaan elke pagina, direct onder de header of als topbar.
2. **Homepage** — sale-badge bij de product-/seriekaarten.
3. **Collectiepagina (/producten)** — sale-badge bij de modelkaarten.
4. **Productpagina** — badge bij de prijs + doorgehaalde `compareAtPrice` als die is ingesteld.

## Visuele richtlijn

- Oranje accentkleur `#ef7027` voor badges en de announcement bar.
- Geen einddatum vermelden.
- Badges met tekst zoals "Verjaardagsale -30%" of "-30%".
- Doorgehaalde prijs in subtiel grijs/rood, sale-prijs in normale stijl.

## Technisch

- Ophalen van `compareAtPrice` uit de Shopify Storefront API in `PRODUCT_BY_HANDLE_QUERY` en `PRODUCTS_QUERY` (`src/lib/shopify.ts`).
- Helper `formatPrice` blijft ongewijzigd; we tonen `compareAtPrice.amount` doorgehaald wanneer aanwezig.
- Nieuwe kleine componenten:
  - `SaleBadge` — herbruikbaar oranje label.
  - `SalePrice` — sale-prijs + optionele doorgehaalde prijs.
  - `SaleAnnouncementBar` — topbar met sale-tekst, eventueel sluitbaar.
- Integratiepunten:
  - `src/routes/__root.tsx` — announcement bar bovenaan elke route.
  - `src/routes/index.tsx` — badges bij productkaarten.
  - `src/routes/producten.tsx` — badges bij collectiekaarten.
  - `src/routes/product.$handle.tsx` — badge + doorgehaalde prijs bij de producttitel.
- Geen kortingslogica of automatische prijsberekening; alles is presentatie op basis van Shopify-data.

## Opmerking voor Shopify-beheer

Zorg dat in Shopify de **sale-prijs** in het reguliere prijsveld staat en de **originele prijs** in het veld *Vergelijkingsprijs* (compareAtPrice). De site leest die waarde uit en toont hem automatisch doorgehaald. Is geen vergelijkingsprijs ingesteld? Dan verschijnt alleen de oranje sale-badge.
