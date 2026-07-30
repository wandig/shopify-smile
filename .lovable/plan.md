Probleem
De FAQ-sectie heeft een witte achtergrond (`bg-white`) maar gebruikt `mt-12 md:mt-20` om afstand te creëren. Omdat de pagina-achtergrond `#f6f3ee` is, verschijnt die warm-grijze kleur als horizontale stroken boven en onder de witte FAQ.

Oplossing
1. In `src/routes/product.$handle.tsx` de `FaqSection` aanpassen:
   - `mt-12 md:mt-20` vervangen door `py-12 md:py-20` zodat de witte achtergrond de ruimte boven én onder de FAQ vult.
   - De bestaande `-mx-5 md:-mx-10` en `px-5 md:px-10` behouden zodat de witte achtergrond tot de zijkanten doorloopt (zoals eerder aangevraagd).

2. De daaropvolgende `ReviewsSection` aanpassen:
   - `mt-12 md:mt-20` verwijderen, omdat de FAQ nu zelf al `padding-bottom` heeft. Zo voorkomen we dubbele tussenruimte.

Verwacht resultaat
- Geen grijze stroken meer boven en onder de FAQ.
- Witte achtergrond loopt naadloos door vanaf de vorige sectie tot aan de reviews.
- De totale verticale ruimte tussen de secties blijft ongeveer gelijk.