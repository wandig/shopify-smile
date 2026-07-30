De huidige "Meld je aan voor onze nieuwsbrief"-sectie (regel 1843-1953 in `src/routes/product.$handle.tsx`) voelt lichter en utilitairder dan de rest van de pagina. De rest gebruikt warme achtergronden (`#f6f3ee`, `#fff7ef`), witte kaarten met `rounded-[14px-18px]`, subtiele schaduwen, oranje accenten (`#ef7027`), eyebrow-labels in uppercase en een duidelijke visuele hiërarchie.

Hieronder drie opties om de sectie in die stijl te gieten. Alle opties behouden het bestaande functionele gedrag (e-mailinschrijving via `subscribeNewsletter`, contactgegevens).

````text
HUIDIGE SITUATIE
================
- Achtergrond: #fffcf8
- Layout: 2-koloms grid (nieuwsbrief links, 3 contactblokken rechts)
- Contactblokken: grijze iconen in grijze cirkels, horizontale lijnen
- Input: beige border (#e2d3bf)
- Geen eyebrow-label, geen kaart-styling, geen schaduw

REST VAN DE PAGINA
==================
- Witte kaarten: rounded-[14px-18px], shadow-[0_2px_10px_rgba(42,31,22,0.06)]
- Oranje accenten: #ef7027 iconen/knoppen
- Eyebrow-labels: uppercase, tracking-[0.14em], klein grijs
- Warme sectie-achtergronden: #f6f3ee, #fff7ef, #f7f3ef
- Typografie: Circular-Regular / Helvetica Neue, font-bold titels
````

## Optie 1: Kaarten-cluster (meest consistent met FAQ & Reviews)

De sectie wordt opgedeeld in twee witte kaarten die qua stijl overeenkomen met de FAQ- en reviewkaarten.

- **Nieuwsbrief links**: witte kaart `rounded-[18px]` met `shadow-[0_2px_10px_rgba(42,31,22,0.06)]`, een eyebrow-label "NIEUWSBRIEF" boven de titel, en een e-mailinput met `border-[#eeeeee]` en focus `border-[#ef7027]`.
- **Contact rechts**: de drie contactmethoden worden aparte witte kaarten `rounded-[14px]` met dezelfde schaduw. Ieder kaartje krijgt een oranje icoon in een lichtoranje cirkel (`bg-[#ef7027]/10 text-[#ef7027]`), vergelijkbaar met de TrustBannerSection.
- **Achtergrond**: `#f6f3ee` om aan te sluiten bij de pagina-achtergrond, of `#fff7ef` voor een lichte sectie-afbakening.
- **Actie**: "Inschrijven"-knop houdt `bg-[#ef7027] rounded-full`.

Dit is de veiligste keuze: het hergebruikt bestaande patronen direct.

## Optie 2: Één warme container (meer editorial / premium)

De hele sectie komt in één grote, warme container in plaats van losse kaarten.

- **Container**: `rounded-[20px]` met achtergrond `#fff7ef` of `#fef9f5`, subtiele binnenschaduw of ring `ring-1 ring-[#071426]/5`.
- **Layout**: links de nieuwsbrief-CTA met grotere titel (`text-[26px] md:text-[32px]`) en meer whitespace, rechts de drie contactrijen gestapeld.
- **Contactrijen**: geen kaartjes, maar elegante rijen met dunne oranje lijnicoon-links en een lichte scheiding. Bijvoorbeeld een verticale lijn tussen de items of een subtiele onderborder.
- **Extra detail**: de "Bestel Full House"-pill uit de klantengalerij kan worden hergebruikt als visueel accent bij de contactgegevens, of als secundaire CTA onder het formulier.

Dit geeft de sectie meer rust en een magazine-achtig gevoel.

## Optie 3: Minimalistische split (meer whitespace, strakker)

Een strakkere, minder "kaart-achtige" aanpak met veel whitespace en een duidelijke hiërarchie.

- **Layout**: single-row asymmetrisch: links een grote nieuwsbrief-CTA (ongeveer 55%), rechts drie compacte contactitems (ongeveer 45%).
- **Nieuwsbrief**: geen kaart, maar een grote, rustige typografische CTA met eyebrow-label en de input + knop op één regel (`rounded-full`, oranje knop).
- **Contactitems**: heel simpel — oranje lijnicoon, label en waarde onder elkaar, zonder kaart of schaduw. Alleen een subtiele hover-state op de mail/telefoon-link.
- **Achtergrond**: `#f6f3ee` zodat de sectie naadloos overgaat in de pagina, of `#fffcf8` (huidige) maar dan met betere typografie en iconen.

Dit past goed als de rest van de pagina al druk genoeg is en je de footer-achtige sectie juist wilt verlichten.

---

## Gemeenschappelijke aanpassingen (ongeacht de keuze)

Om de sectie in ieder geval beter te laten aansluiten, stel ik voor om óók deze kleine wijzigingen door te voeren:

1. **Eyebrow-label toevoegen** boven "Meld je aan voor onze nieuwsbrief", bijvoorbeeld "NIEUWSBRIEF" of "BLIJF OP DE HOOGTE".
2. **Iconen oranje maken** in lichtoranje cirkels (`bg-[#ef7027]/10 text-[#ef7027]`) in plaats van grijs.
3. **Input-border aanpassen** naar `#eeeeee` of `#cdc0b5` zodat deze overeenkomt met andere formulieren/accordions.
4. **Titel-tracking en font-weight** gelijk trekken met andere sectietitels (`tracking-[0.01em]`, `font-bold`).
5. **Achtergrondkleur** afstemmen op de rest van de pagina (`#f6f3ee`, `#fff7ef` of `#f7f3ef`).

Welke optie spreekt je het meest aan? Dan werk ik die uit in de code.