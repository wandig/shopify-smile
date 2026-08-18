# De site veel sneller maken

## Wat de site nu vertraagt (gemeten)

- **De bedrijfsvideo op de homepage is 206 MB** (`wandig-werkplaats.mov`, QuickTime) en staat op `autoPlay`. De browser begint die te downloaden zodra de pagina laadt. Dit is met afstand de grootste vertraging.
- **De hero-video is 16,6 MB** en heeft geen poster-afbeelding, dus je ziet eerst niets.
- **Bijna alle foto's zijn ongecomprimeerde PNG's van 1,5–3 MB** — samen ruim 100 MB aan afbeeldingen. Een homepagebezoek trekt daar tientallen MB's van binnen.
- **Producten worden pas ná het laden in de browser opgehaald** (Shopify-call in de component), waardoor prijzen/afbeeldingen in "Kies jouw model", de collectiepagina, het menu en de productpagina zichtbaar later inklappen.
- **Alle variantafbeeldingen worden vooraf ingeladen** met `new Image()` op de productpagina, collectiepagina en configurator — tientallen extra grote downloads per pagina.
- Geen `preload` voor de belangrijkste afbeelding, geen `decoding`/`sizes`, en de hero-video blokkeert de eerste weergave.

## Aanpak (in deze volgorde, grootste winst eerst)

**1. Video's fixen (grootste winst)**
- De 206 MB `.mov` niet meer gebruiken: vervangen door een gecomprimeerde MP4 (web-formaat, ~2–5 MB) die ik in het project genereer.
- Beide video's: `preload="none"` (of `metadata`), een `poster`-afbeelding, en pas laden/afspelen wanneer de sectie in beeld komt.
- De hero-video: poster direct tonen, video daarna inladen, zodat de pagina meteen iets toont.

**2. Afbeeldingen comprimeren en in webformaat zetten**
- `vite-imagetools` toevoegen en alle grote PNG/JPG's als WebP/AVIF uitleveren op de juiste weergavegrootte.
- Verwacht effect: 2,5 MB-foto's worden 100–250 KB, dus 10–20x kleiner, zonder zichtbaar verlies.
- Ongebruikte oude varianten (v1/v2/v3-bestanden) niet meer importeren.

**3. Vooraf inladen stoppen**
- De `new Image()`-preload-lussen weghalen op productpagina, collectiepagina en configurator; in plaats daarvan alleen de eerstvolgende kleur/variant voorbereiden.
- Alles onder de eerste schermvulling krijgt `loading="lazy"` + `decoding="async"`; de hero-afbeelding krijgt `fetchpriority="high"` en een `preload`-link.

**4. Productdata op de server ophalen**
- Shopify-producten via een route-loader met `ensureQueryData` en gedeelde query-opties, met caching (`staleTime`), zodat de pagina meteen mét prijzen en foto's rendert en er niet meer per pagina opnieuw wordt gefetcht.

**5. Kleinere JS-bundel**
- Zware, niet-direct-zichtbare secties (configurator-stage, klantengalerij, reviews, FAQ, verhaal-secties) lazy laden zodat de eerste weergave minder JavaScript nodig heeft.

## Technische details

- Assets: video's hercomprimeren met ffmpeg (H.264 MP4, ~1080p, CRF ~26, faststart) en posters exporteren als WebP.
- `vite.config.ts`: `imagetools()` toevoegen via de extra `vite`-config van `@lovable.dev/vite-tanstack-config` (geen dubbele plugins).
- `src/lib/shopify.ts`: `productsQueryOptions` / `productByHandleQueryOptions` exporteren met `staleTime` van 5 minuten; routes gebruiken `loader` + `useSuspenseQuery`.
- Per route een `head().links` `preload` voor de LCP-afbeelding (alleen op de route die die afbeelding bezit).
- `React.lazy` + `Suspense` voor de zware secties, met een lichte placeholder van dezelfde hoogte zodat de layout niet verschuift.

## Verwacht resultaat

Homepagina van tientallen MB's naar ongeveer 1–2 MB bij eerste bezoek, met zichtbare content binnen ongeveer een seconde in plaats van na het downloaden van video en foto's.
