# Configurator-banner volledig zichtbaar maken

## Probleem
De sectie "Stel jouw tv-wand samen" gebruikt een vaste hoogte (420px mobiel / 620px desktop) met `object-cover`. Daardoor wordt de foto op desktop links/rechts en boven/onder weggesneden: het meubel en de spelende kinderen zijn niet volledig in beeld.

## Oplossing
In `src/routes/index.tsx`, in `ConfiguratorBannerSection`:

1. **Vaste hoogte laten vallen op desktop.** De afbeelding krijgt de eigen beeldverhouding van het bestand (via een `aspect-[...]`-container of `h-auto w-full`), zodat de volledige foto zichtbaar is — precies zoals in het voorbeeld.
2. **Mobiel blijft gecropt.** Op kleine schermen zou de volledige verhouding te laag/breed worden; daar houden we een beperkte hoogte met `object-cover` aan, met de crop gericht op het meubel.
3. **Overlay en tekst meeschalen.** De donkere overlay en het tekstblok blijven absoluut over de afbeelding liggen en gecentreerd; op zeer brede schermen wordt de tekstgrootte iets bijgeschaald zodat titel + knop netjes binnen de foto blijven vallen.
4. **Geen witruimte of naad.** De sectie blijft `overflow-hidden` met de afbeelding als `block` element, zodat er geen extra ruimte onder de foto ontstaat.

## Controle
- `/` openen op desktop (en breed venster) en controleren dat de foto volledig in beeld staat, inclusief meubel en kinderen.
- Op mobiel controleren dat de banner niet te hoog wordt en de tekst leesbaar blijft.
