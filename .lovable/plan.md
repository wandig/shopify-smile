# Plan: kleurnaam tonen bij interactie op mobiel

## Doel
Op de mobiele productpagina tonen we de gekozen kleurnaam alleen op het moment dat de gebruiker een kleur swatch aantikt. De naam verschijnt kort in een kleine tooltip boven de actieve swatch en verdwijnt daarna weer, zodat de variantregel verder schoon blijft.

## Aanpak

1. **Interactie-state bijhouden**
   - In `src/routes/product.$handle.tsx` voegen we lokaal binnen de kleur-variant-rij een stukje state toe: `lastPickedColor` (string | null) en een `clearTimeout`-ref.
   - Wanneer een mobiele swatch wordt aangeklikt, wordt de gekozen kleurnaam opgeslagen en een timer gestart die de tooltip na ~1,5–2 seconden weer weghaalt.

2. **Tooltip boven de actieve swatch**
   - De tooltip is een klein label dat absoluut of relatief boven de swatchrij zweeft, bijvoorbeeld gecentreerd boven de net aangeklikte swatch.
   - Styling: kleine padding, afgeronde hoeken, neutrale achtergrond (`#f7f4f1` of `#fff1e7`) en de bestaande grijze tekstkleur, zodat het past bij de huidige UI.
   - Animatie: korte fade-in en fade-out via CSS-transities op `opacity` en `transform`.

3. **Toegankelijkheid**
   - De knoppen hebben al een `aria-label` en `aria-pressed`. We voegen een `aria-live="polite"` regio toe voor de kleurnaam, zodat screenreaders de wijziging ook aankondigen.

4. **Desktop ongewijzigd**
   - Het bestaande desktop-layout met label + gekozen kleurnaam + swatches blijft precies zoals het nu is.

5. **Scope-beperking**
   - We passen alleen de mobiele kleur-variantregel aan; andere varianten (tv-maat, opstelling) en secties op de pagina worden niet aangeraakt.

## Technische details
- Bestand: `src/routes/product.$handle.tsx`
- State: `useState` + `useEffect`/`setTimeout` binnen de component
- Styling: Tailwind-utility klassen, geen nieuwe dependencies
- Validatie: typecheck (`tsc --noEmit`) na de wijziging
