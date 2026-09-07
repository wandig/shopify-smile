# Foto van je samenstelling + duidelijke productnamen in de winkelmand

Twee verbeteringen aan de configurator → winkelmand-flow:

1. Bij "toevoegen aan winkelmand" wordt een afbeelding gemaakt van de kast zoals die op dat moment in de configurator staat. Die foto komt bovenaan in het blok "Jouw samenstelling" te staan.
2. De producten in de winkelmand krijgen de namen zoals ze in de configurator heten (bijvoorbeeld "Middenmodule — Kristalwit, 58–65 inch" en "Zijkast links — met deuren") in plaats van de ruwe Shopify-titels.

## 1. Foto van de configuratie

- Op het moment van toevoegen wordt de configuratiescène (muur, vloer, modules, tv) omgezet naar een afbeelding met de `html-to-image` module die al in het project zit.
- De foto wordt gemaakt zonder de knoppen en hulpmiddelen die over de scène liggen (maatlint, tv-knop, labels); die worden tijdens de opname verborgen.
- De opname wordt verkleind naar ongeveer 900 px breed en als JPEG opgeslagen, zodat de winkelmand licht blijft en de foto ook na verversen van de pagina bewaard blijft.
- In de winkelmand verschijnt de foto bovenaan het blok "Jouw samenstelling", met daaronder de bestaande regels (kleur, tv-maat, breedte, modules).
- Lukt het maken van de foto niet, dan wordt gewoon de bestaande samenvatting zonder foto getoond; het toevoegen aan de winkelmand gaat altijd door.

## 2. Configurator-namen als productnamen

- Elke regel die vanuit de configurator wordt toegevoegd, krijgt een eigen weergavenaam plus een korte ondertitel met kleur en tv-maat.
- Voorbeelden: "Middenmodule", "Zijkast links — met deuren", "Zijkast rechts — open vakken".
- De winkelmand toont die naam; producten die via een productpagina zijn toegevoegd houden hun gewone Shopify-titel.
- Wat naar de kassa wordt gestuurd verandert niet: dat blijven dezelfde varianten en prijzen als nu.

## Technische details

- `src/stores/cartStore.ts`: `CartConfigSummary` gebruikt het bestaande veld `image` voor de dataURL; `CartItem` krijgt optionele velden `displayTitle` en `displaySubtitle`; beide blijven meegaan in de bestaande persistentie. Alleen deze velden zijn nieuw — de Storefront-mutaties blijven ongewijzigd.
- `src/routes/configurator.tsx`: in `handleAddToCart` eerst `toJpeg` van `html-to-image` op `stageRef.current` (met `filter` die elementen met een nieuwe `data-capture="hide"` markering overslaat, `pixelRatio` afgestemd op ~900 px breed, `quality` ~0.82), in een `try/catch`. Resultaat meegeven aan `setConfigSummary({ ..., image })`. Bij elke `addItem`-call `displayTitle`/`displaySubtitle` meegeven.
- Bekend risico: `html-to-image` kan cross-origin afbeeldingen (Shopify CDN-renders) niet inlijnen zonder CORS. De configurator-modules gebruiken lokale assets; waar een render van Shopify komt, wordt die eerst via `fetch` + `FileReader` naar een dataURL omgezet vóór de opname, met terugval op geen foto.
- `src/components/CartDrawer.tsx`: samenvattingsblok rendert `configSummary.image` als 16:9 afbeelding met afgeronde hoeken; productregels gebruiken `item.displayTitle ?? item.product.node.title` en tonen `displaySubtitle` waar aanwezig.
- Controle: `bunx tsgo --noEmit` en een Playwright-run die op `/configurator` toevoegt en checkt dat de winkelmand een foto met samenvatting en de nieuwe namen laat zien.
