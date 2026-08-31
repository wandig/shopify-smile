Reviews tijdelijk verbergen via feature flag

Doel
- Alle review-gerelateerde elementen uit de site halen voor nu.
- Alle code en data intact houden, zodat we ze later met één schakelaar weer kunnen aanzetten.

Aanpak
1. Feature flag toevoegen
   - `VITE_SHOW_REVIEWS=false` toevoegen aan `.env`.
   - Kleine helper `src/lib/features.ts` maken die `import.meta.env.VITE_SHOW_REVIEWS === "true"` leest.

2. Review-elementen conditioneel renderen
   - Homepagina (`src/routes/index.tsx`):
     - Hero: sterren + "1000+ beoordelingen" verbergen.
     - Modelkaarten: reviewaantallen zoals "(2.526)" verbergen.
   - Productpagina (`src/routes/product.$handle.tsx`):
     - `<ReviewsSection />` alleen tonen als de flag aan staat.
   - Collectiepagina (`src/routes/producten.tsx`):
     - Hero: sterren + "4,8/5 uit 1.000+ beoordelingen" verbergen.

3. Componenten en data niet verwijderen
   - `ReviewsSection` in `src/components/ProductTrustSections.tsx` en `src/components/ProductPageSections.tsx` blijven staan.
   - De `REVIEWS` arrays en review-gerelateerde imports blijven bestaan.
   - Eventuele review-sterretjes in productinfo/USPs blijven in de code, alleen niet zichtbaar.

Hoe later weer aanzetten
- Zet in `.env`: `VITE_SHOW_REVIEWS=true` en herstart de preview.
- Alle review-elementen verschijnen weer zonder code-aanpassingen.

Bestanden die worden aangepast
- `.env`
- `src/lib/features.ts` (nieuw)
- `src/routes/index.tsx`
- `src/routes/product.$handle.tsx`
- `src/routes/producten.tsx`
