# Herontwerp Hero Benefits sectie

## Doel
De huidige 3 benefits op de homepage worden vervangen door een rustige, horizontale rij met icoon-links en tekst-rechts, geinspireerd op het voorbeeld dat is gedeeld.

## Wat er verandert
- Vervang de huidige 3 verticale witte kaarten in `src/routes/index.tsx` door 3 horizontale "tegel" kaarten.
- Elke tegel bevat:
  - Een rond of afgerond icoon/illustratie aan de linkerkant.
  - Een hoofdlabel (vet) en een ondertitel in het midden.
  - Een chevron-pijl (>) aan de rechterkant.
- Layout: op desktop 3 kolommen naast elkaar, op mobiel onder elkaar.
- Achtergrond van de sectie blijft `#faf8f5`; de tegels krijgen een lichte crème/witte achtergrond (`#ffffff` of `#fffcf8`) met zachte schaduw.

## Nieuwe content
1. **100 dagen proefkijken**
   - Ondertitel: "100 dagen rustig uitproberen thuis"
   - Icoon: bestaand `100-dagen-icon.svg`
2. **Dutch Design**
   - Ondertitel: "Ontworpen en geproduceerd in Nederland"
   - Icoon: bestaand `dutch-design-icon.svg`
3. **4,7/5 klantbeoordeling**
   - Ondertitel: "Gebaseerd op meer dan 23.000 reviews"
   - Icoon: inline SVG ster in oranje (`#ef7027`)

## Technische aanpak
- Pas `HERO_BENEFITS` data-array aan in `src/routes/index.tsx`.
- Vervang `HeroBenefitsSection` component door een grid met horizontale kaarten.
- Gebruik Tailwind classes voor consistentie met de rest van de pagina:
  - `grid gap-4 sm:grid-cols-3`
  - kaarten: `rounded-2xl bg-white p-4 flex items-center gap-4`
  - icooncontainer: `w-14 h-14 rounded-xl bg-[#faf8f5] flex items-center justify-center shrink-0`
  - tekst: `flex-1 min-w-0`
  - chevron: `shrink-0 text-[#071426]/30`
- Voeg een subtiele hover toe (`hover:shadow-md hover:-translate-y-0.5 transition`).

## Niet in scope
- Geen wijzigingen aan andere secties op de homepage.
- Geen backend of datawijzigingen.
