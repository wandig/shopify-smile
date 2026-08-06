Waarom-wij sectie rechts tot rand uitlijnen

Doel
De "Waarom wij"-sectie op de homepage loopt nu niet helemaal door tot de rechterkant van het scherm. Dit komt door de centrerende wrapper `max-w-[1456px] mx-auto`. We maken de sectie rechts full-bleed, zodat de carousel-kaarten tot de viewport-rand komen.

Wat we bouwen
1. Aanpassen `WhyUsSection` in `src/routes/index.tsx`
   - Verwijder de centrerende `max-w-[1456px] mx-auto` wrapper (of beperk deze tot de verticale titel).
   - Houd links padding (`pl-5 md:pl-10`) aan zodat de verticale titel "Waarom wij" op de juiste plek blijft.
   - Laat de binnenste container (`rounded-l-[20px] bg-[#ede7e0]`) rechts doorlopen tot `100vw`, zonder rechter padding (`pr-0`).
   - Behoud de afgeronde linkerhoeken; de rechterkant hoeft niet afgerond omdat hij tegen de rand aankomt.

2. Controle
   - Desktop: carousel-kaarten en achtergrond reiken tot de rechter viewport-rand.
   - Mobiel: geen onbedoelde horizontale scroll of clipped content.

Technische details
- Bestand: `src/routes/index.tsx` (regels rond `function WhyUsSection`).
- Geen extra dependencies.
- Alleen layout-wijziging; geen wijziging aan card-styling, animaties of inhoud.
