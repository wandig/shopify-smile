# Website sneller maken (zonder foto's te verwijderen)

Alle beelden blijven staan. We veranderen alleen hoe zwaar ze geleverd worden.

## Wat er nu misgaat (gemeten)

- De 96 assets zijn samen ~325 MB. Alle foto's worden op volledige originele grootte geladen (PNG's van 2-3 MB, JPG's tot 1,7 MB).
- De bedrijfsvideo op de homepage is een `.mov` van **206 MB** die met autoplay direct start. Dit is verreweg de zwaarste post.
- De hero-video (16,5 MB) laadt zonder poster/prioriteitsregeling.
- Geen enkele `<img>` gebruikt `loading="lazy"`, `width/height` of moderne formaten, dus de browser downloadt alles vooraf op maximale resolutie.

Goed nieuws: de asset-hosting ondersteunt al on-the-fly verkleinen en moderne formaten. Voorbeeld met de lifestylefoto van de collectiepagina: origineel 1.716 KB → op 600px breed **12 KB** (AVIF), op 1200px breed 48 KB. Dat is ~97% minder data bij dezelfde zichtbare kwaliteit.

## Aanpak

1. **Centrale afbeeldingshelper** (`src/lib/asset-image.ts`)
   - `assetSrc(asset, width)` en `assetSrcSet(asset, widths)` bouwen de geoptimaliseerde URL's.
   - Standaard breedtes: 400 / 800 / 1200 / 1600, met passende `sizes` per plek (thumbnails klein, hero groot).
2. **Alle bestaande `<img>`-plekken omzetten** naar die helper: homepage, productpagina, collectiepagina, configurator, header, footer, story-/trust-/gallery-secties, cart drawer, kleurstalen, betaalbadges, moduleweergave. Elke foto blijft exact dezelfde foto.
3. **Laadgedrag per afbeelding**
   - Alles buiten het eerste beeld: `loading="lazy"` + `decoding="async"`.
   - Alleen het LCP-beeld per pagina: `fetchpriority="high"` en een `preload`-link in de `head()` van die route.
   - Vaste `width`/`height` of aspect-ratio waar die nog ontbreekt, tegen layout shift.
4. **Video's**
   - De 206 MB `.mov` wordt lokaal omgezet naar een web-mp4 (~1080p, ~4-8 MB) plus een poster-frame, en als nieuw asset toegevoegd. De originele video blijft bestaan.
   - Beide video's krijgen `preload="none"` + poster en starten pas wanneer ze in beeld komen (IntersectionObserver), zodat de homepage niet meer tientallen MB's downloadt voor iets dat onderaan de pagina staat.
5. **Kleine extra's**
   - Preconnect naar de Shopify Storefront-host zodat de producthaal eerder start.
   - Zwaardere secties onder de fold (gallery, story, reviews) via `lazy`-import splitsen als de bundel daar meetbaar van profiteert.

## Verificatie

- Voor/na-meting van de totale overdrachtsgrootte van de homepage en de Full House-productpagina (netwerkpanel via headless browser).
- Visuele check op desktop en mobiel: alle foto's zichtbaar, geen kwaliteitsverlies, geen verschuivende layout.

## Wat er niet gebeurt

- Geen foto's of video's verwijderd of vervangen door andere beelden.
- Geen wijzigingen aan teksten, layout, kleuren of functionaliteit.
