# Compacte USP's zonder achtergrond

## Doel
Nieuwe, compacte USP-blokken toevoegen aan de actieblokken-pagina (`/actie-blokken`) die geen achtergrond hebben, zodat ze over foto's of andere advertentie-achtergronden gelegd kunnen worden. Beschikbaar in wit en zwart lettertype.

## Wijzigingen

1. **Nieuw component in `src/routes/actie-blokken.tsx`**
   - `UspCompactBlock` (of vergelijkbare naam) met:
     - Geen achtergrond, geen border, geen padding-surface.
     - Klein icoon links (Lucide uit bestaande `USP_ICONS` set).
     - Korte USP-tekst rechts van het icoon.
     - Prop voor letterkleur: `ink` = `#1f1915` (zwart) en `paper` = `#ffffff` (wit).
     - Oranje icoon-accent blijft `#ff7d2f`.
   - Compact formaat: kleinere tekst en strakkere regelafstand dan bestaande `UspBlock`.

2. **Nieuwe subsection in sectie 05 (USP's)**
   - Titel: "Compacte USP's — zonder achtergrond".
   - Toon alle USP-teksten in beide kleuren:
     - 100 dagen proefkijken
     - Gratis verzending
     - 10 jaar garantie
     - Nederlands design
     - Geschikt voor alle tv's
   - Zowel zwart (`#1f1915`) als wit (`#ffffff`) variant per USP, elk als los downloadbaar item.

3. **Downloadbaar blijven**
   - Elk blok wordt gewikkeld in de bestaande `Item` wrapper, zodat PNG/SVG-download direct werkt.

## Valideren
- Bouw controle (`bun run build`).
- Preview openen op `/actie-blokken` en nieuwe USP-subsection visueel inspecteren.
