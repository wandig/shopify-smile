# Resterende afbeeldingen naar het CDN verhuizen

## Klopt het getal?

Deels. Wat ik in het project meet:

- **198** afbeeldingen staan als CDN-pointer (`.asset.json`) in `src/assets` — die gaan door de resize-/AVIF-pijplijn.
- **54** bestanden staan nog als echt bestand in de code (dus meegebundeld, geen resizing). Daarvan zijn 7 SVG's (persmerken + SprayPay-logo) en 47 foto's.

Dus niet 134/22, maar 198 wel en 54 nog niet. De verhouding is wel precies wat je bedoelt: er is nog een restgroep die geen geoptimaliseerde variant krijgt.

## Wordt de site er sneller van?

Ja, voor een deel van die groep duidelijk. Elke afbeelding gaat al door de `Img`-component, maar die kan alleen verkleinen als de URL een CDN-URL is. Bij een gebundelde import wordt het originele bestand op volle grootte geleverd.

De zwaarste achterblijvers:

| Groep | Aantal | Totaal nu |
|---|---|---|
| Full House Dofroze renders (PNG) | 8 | ~4,2 MB |
| Lifestyle/detail-foto's (JPG) | 9 | ~1,5 MB |
| Full House Kristalwit renders (PNG) | 8 | ~0,36 MB |
| Gallery + configurator (WEBP) | 11 | ~0,52 MB |
| Kleurstalen (JPG) | 8 | ~0,39 MB |
| Logo's / badges (PNG) | 3 | ~0,07 MB |

De echte winst zit in de eerste twee rijen: PNG-renders van 450-620 KB die op de productpagina in een vak van ~600-900 px getoond worden. Via het CDN worden dat AVIF-varianten van grofweg 20-60 KB. Dat is ~5 MB minder overdracht op de Full House-productpagina bij Dofroze/Kristalwit, en de rest van de site wint nog ~1,5 MB.

De kleine bestanden (kleurstalen van ~50 KB, logo's, SVG's) leveren vrijwel niets op en laat ik staan — SVG's kunnen zelfs niet naar het CDN, want die worden daar als download aangeboden in plaats van weergegeven.

## Aanpak

1. **Uploaden naar het CDN** met de assets-CLI: de 8 Dofroze-PNG's, 8 Kristalwit-PNG's, 9 lifestyle-/detail-JPG's, 6 gallery-WEBP's en de 3 configurator-WEBP's. Er komt per bestand een `.asset.json`-pointer naast te staan; de foto's zelf blijven identiek.
2. **Imports omzetten** in `src/routes/product.$handle.tsx`, `src/routes/configurator.tsx`, `src/components/ProductPageSections.tsx`, `src/components/WandigModulePreview.tsx` en `src/routes/index.tsx`: `import x from "@/assets/foo.png"` wordt de pointer-import met `.url`. Alle plekken gebruiken al `<Img>`, dus vanaf dat moment krijgen ze automatisch de juiste breedte + AVIF/WebP.
3. **Originele bestanden verwijderen** uit `src/assets` nadat elke verwijzing is omgezet, zodat de bundel lichter wordt.
4. **Laten staan**: de 7 SVG's, de 8 kleurstalen en de kleine logo's/badges — daar weegt de winst niet op tegen het risico.

## Verificatie

- Productiebuild moet slagen (elke import moet blijven resolven).
- Voor/na-meting van de overdrachtsgrootte van de Full House-productpagina (Dofroze en Kristalwit) en de homepage.
- Visuele check desktop + mobiel: alle foto's zichtbaar, geen zichtbaar kwaliteitsverlies, gelijke layout.

## Wat er niet verandert

Geen andere foto's, teksten, layout of functionaliteit. De preload-logica voor het snel wisselen van tv-maat blijft zoals die is — en werkt beter, omdat de voorgewarmde bestanden kleiner worden.
