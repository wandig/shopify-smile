# Plan: Kleurstalen grid herpositioneren

## Doel
De 5 kleurstaal-kaarten in de "Bestel gratis kleurstalen"-sectie op de homepage anders positioneren: van 3 boven / 2 onder naar 2 kolommen met 3 rijen, waarbij het bestaande offset-ritmiek behouden blijft.

## Wijzigingen

### 1. Grid-layout aanpassen
- Wijzig de sample-kaarten grid van `grid-cols-3` naar `grid-cols-2` op desktop.
- Herstel de offset-logica zodat oneven kaarten (1, 3) lager staan dan even kaarten (0, 2, 4).
- Zorg dat de 5e kaart (index 4) netjes linksboven in de derde rij staat, zonder te centreren of te spannen.

### 2. Container en stijl behouden
- Behoud de afgeronde `#ede7e0` container, het verticale "KLEURSTALEN" label en de witte kaarten met `rounded-[16px]`.
- Behoud de hover-lift animatie en de 12px afgeronde swatch-afbeeldingen.

### 3. Responsief gedrag
- Mobiel blijft het 2-koloms grid met dezelfde offset.
- Controleer dat de sectie niet te hoog wordt en dat tekst en knop links gecentreerd blijven uitlijnen.

## Technische details
- Bestand: `src/routes/index.tsx`
- Aangepast component: `ColorSamplesSection`
- Aangepaste constante: `SAMPLE_CARDS` (geen wijzigingen in kleuren zelf)

## Validatie
- TypeScript check (`tsc --noEmit`) moet slagen.
- Screenshot van de sectie in desktop viewport moet 2 kolommen met 3 rijen tonen.
