# Plan: Shopify herkoppelen en Full House productpagina updaten

## Doel
De Shopify-account opnieuw koppelen, de nieuwe Full House productfoto's en kleuren ophalen uit de Shopify-backend, en de productpagina (`/product/full-house`) hiermee synchroniseren.

## Stappen

### 1. Shopify-account herkoppelen
- Gebruik `shopify--connect_shopify_account` om de verbinding te herstellen.
- Na succesvolle koppeling controleren of de online access token weer beschikbaar is.

### 2. Nieuwe productdata ophalen en verifiëren
- Ophalen van het `full-house` product via Shopify Storefront API (`shopify--get_product` of directe API-call).
- Controleren op:
  - Nieuwe productafbeeldingen in `images`.
  - Nieuwe varianten/kleuren in `variants` en `options`.
- Resultaat samenvatten in chat (aantal nieuwe afbeeldingen, gevonden kleuren, prijzen).

### 3. Productpagina updaten met nieuwe assets
- De hoofdgalerij op `/product/full-house` vervangen/uitbreiden met de nieuwe Shopify-afbeeldingen.
- Kleurswatches updaten zodat ze overeenkomen met de nieuwe Shopify-kleuren/varianten.
- Indien nodig de `COLOR_MAP` en `SWATCH_TEXTURES` in `src/routes/product.$handle.tsx` uitbreiden of aanpassen voor nieuwe kleurnamen.
- De actieve variant-afbeelding correct koppelen aan de geselecteerde kleur/variant.

### 4. Optioneel: homepage-productcarousel bijwerken
- Indien de gebruiker dat wil, de productfoto in de homepage-carousel (`src/routes/index.tsx`) vervangen door de nieuwe Shopify-afbeelding.
- Voor nu beperken we dit tot de productpagina, tenzij de gebruiker aangeeft ook de homepage te willen bijwerken.

### 5. Testen
- De productpagina lokaal openen en controleren of:
  - Alle nieuwe afbeeldingen laden.
  - De kleurswatches correct werken.
  - De variant-afbeeldingen wisselen bij kleurselectie.
  - De prijs correct wordt weergegeven.

## Technische details
- Bestanden die worden aangepast:
  - `src/routes/product.$handle.tsx` — galerij, kleurswatches, variantlogica.
  - Eventueel `src/lib/shopify.ts` als de query moet worden aangepast voor extra velden.
  - Eventueel `src/routes/index.tsx` als de homepage ook moet worden bijgewerkt.
- Afhankelijkheden: werkende Shopify-verbinding, toegang tot Storefront API.

## Vragen aan de gebruiker
- Wil je dat we na de productpagina ook de homepage-productcarousel direct bijwerken met de nieuwe afbeeldingen?
- Zijn de nieuwe kleuren exacte varianten van het bestaande Full House-product, of moeten er ook nieuwe kleurnamen/teksten in de specificaties worden aangepast?
