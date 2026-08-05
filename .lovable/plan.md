Plan: compactere desktop-layout voor "Stel jouw tv-wand samen"

Doel
De huidige "Stel jouw tv-wand samen" banner op de homepage gebruikt op desktop een full-bleed achtergrondfoto die te veel verticale ruimte inneemt. We maken de sectie compacter zonder de boodschap of CTA te verwateren.

Aanpak
1. Herstructureer `ConfiguratorBannerSection` in `src/routes/index.tsx` voor desktop:
   - Verwijder de full-bleed achtergrondfoto als hoofdoppervlak.
   - Plaats de content (kicker, h2, subline, CTA) in een gecentreerde kaart of container met de bestaande warm-neutrale achtergrondkleur (`#f6f3ee` of `#ede7e0`).
   - Gebruik de foto als een klein, afgerond accentvenster naast of boven de tekst, niet als volledige achtergrond.
   - Houd de sectiehoogte beperkt (bijv. maximaal ~360–420 px op desktop).

2. Behoud het bestaande design systeem:
   - Achtergrond: `#faf8f5` of `#f6f3ee`.
   - Accent/CTA: `#ef7027`.
   - Typografie: Circular-Regular, Helvetica Neue, Helvetica, Arial, sans-serif.
   - Kicker "Configurator" met `SlidersHorizontal` icoon.
   - CTA: "Start de configurator" met pijl.

3. Mobiel blijft functioneel gelijkwaardig:
   - De compacte kaart stapelt verticaal.
   - Afbeelding blijft zichtbaar en goed geschaald.

4. Valideer visueel in de preview op desktop (1280 px+) dat:
   - De sectie niet meer het scherm domineert.
   - Tekst en CTA duidelijk leesbaar zijn.
   - De afbeelding mooi is ingekaderd zonder vervaging of stretching.

Scope
- Alleen de `ConfiguratorBannerSection` in `src/routes/index.tsx`.
- Geen wijzigingen aan andere homepage-secties, routing of backend.
