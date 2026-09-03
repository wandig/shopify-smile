# Dutch Design-certificaat rechtsboven op telefoon

Op de telefoonversie staat de certificaat-badge nu rechtsonder op de eerste productfoto, waar hij over de swipe-stipjes valt en tegen de rand aanloopt.

## Wat er verandert

- Op de telefoonversie verschuift de badge naar de rechterbovenhoek van de eerste productfoto.
- De badge blijft dezelfde grootte en stijl (witte kaart met zachte schaduw, afgeronde hoeken).
- De swipe-stipjes onderaan blijven vrij zichtbaar.
- De desktopversie blijft ongewijzigd (badge daar rechtsonder).

## Technisch

- In `src/routes/product.$handle.tsx` in `MobileGallerySwipe` (badge-overlay op de eerste slide) de positionering wijzigen van `bottom-3 right-3` naar `top-3 right-3`.
- Controleren dat de badge niet botst met de maatlint-knop (die staat linksonder/onderin) en dat hij volledig binnen de foto valt.
- Verifiëren op 390px breedte met een screenshot van `/product/solo`, `/product/duo` en `/product/full-house`.
