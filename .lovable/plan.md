Huidige situatie
- De FAQ-sectie (`Veelgestelde vragen`) zit binnen de binnenste container in `src/routes/product.$handle.tsx`.
- Die container heeft `py-10 md:py-16` padding en achtergrond `#f6f3ee`.
- De reviews-sectie (`Wat klanten zeggen over hun tv-kast`) staat direct onder die container, buiten de padding.
- Hierdoor toont de onderste padding van de container een grijze/beige band tussen de witte FAQ en de lichtoranje reviews.

Gewenste situatie
- De FAQ-sectie sluit naadloos aan op de reviews-sectie, zonder grijze band ertussen.
- De FAQ behoudt een witte, volle-breedte achtergrond en gecentreerde inhoud.

Plan
1. In `src/routes/product.$handle.tsx` de binnenste container (`<div className="mx-auto max-w-[1400px] px-5 md:px-10 py-10 md:py-16">`) sluiten vóór `<FaqSection />`.
2. `<FaqSection />` verplaatsen naar buiten de container, direct boven `<ReviewsSection />`.
3. De `FaqSection`-component aanpassen:
   - Behoud `bg-white` en `py-12 md:py-20`.
   - Verwijder de negatieve marges `-mx-5 md:-mx-10`, omdat de sectie nu zelf volle breedte is.
   - Voeg een innerlijke wrapper toe met `mx-auto max-w-[1400px] px-5 md:px-10` om titel, intro en accordion-kolommen gecentreerd te houden.
4. Typecheck draaien (`bunx tsgo --noEmit`) en visueel verifiëren met een screenshot van de overgang tussen FAQ en reviews.

Opmerking
- Deze wijziging raakt alleen de layout-structuur; de inhoud en het gedrag van de accordions blijven onveranderd.