Plan: compactere desktop-layout voor "Stel jouw tv-wand samen"

Doel
De huidige "Stel jouw tv-wand samen" banner op de homepage gebruikt op desktop een full-bleed achtergrondfoto die te veel verticale ruimte inneemt. We maken de sectie compacter zonder de boodschap of CTA te verwateren.

Gekozen richting
Een horizontale, afgeronde kaart in de bestaande site-stijl:
- De foto wordt een klein, vierkant accentvenster links in de kaart (bijv. ~320 × 320 px).
- De tekst en CTA staan rechts ervan, gecentreerd in de hoogte.
- De hele sectie krijgt een vaste, beperkte hoogte op desktop (max ~360–400 px).

Details
1. Herstructureer `ConfiguratorBannerSection` in `src/routes/index.tsx`:
   - Gebruik een container met `max-w-[1100px]`, `bg-[#f6f3ee]`, `rounded-[24px]` en `overflow-hidden`.
   - Op desktop (`md:`): grid met twee kolommen — links de afbeelding, rechts de content.
   - Op mobiel: verticale stack, afbeelding bovenaan, content eronder.

2. Behoud alle bestaande elementen:
   - Kicker "Configurator" met `SlidersHorizontal` icoon.
   - Headline: "Stel jouw tv-wand samen".
   - Subline: "Kies formaat, indeling en kleur en zie direct wat het kost. In een paar minuten klaar."
   - CTA: "Start de configurator" in `#ef7027` met pijl.

3. Behoud het design systeem:
   - Achtergrond sectie: `#faf8f5`.
   - Kaartachtergrond: `#f6f3ee`.
   - Accent/CTA: `#ef7027`.
   - Typografie: Circular-Regular, Helvetica Neue, Helvetica, Arial, sans-serif.
   - Geen donkere overlay meer op de foto; de afbeelding blijft helder en warm.

4. Responsief gedrag:
   - Desktop: kaart is horizontaal en compact.
   - Tablet/mobiel: kaart stapel verticaal, afbeelding volledige breedte bovenaan.

5. Validatie:
   - Controleer in de desktop-preview dat de sectie niet meer dan ~400 px inneemt.
   - Controleer dat tekst en CTA goed leesbaar zijn en de afbeelding niet uitrekt.

Scope
- Alleen de `ConfiguratorBannerSection` in `src/routes/index.tsx`.
- Geen wijzigingen aan andere homepage-secties, routing of backend.
