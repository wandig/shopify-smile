# Configurator: rechtermodule symmetrisch tegen middenmodule laten aansluiten

## Probleem
De rechtermodule in de configurator staat te ver van de middenmodule en sluit niet netjes aan, terwijl de linkermodule wel correct tegen de middenmodule aan zit.

## Aanpak
1. **Inspecteer de huidige stage-layout** in de preview om te zien waar de witruimte/gap ontstaat (container, afbeelding-transparantie of overlap).
2. **Spiegel de linkermodule-oplossing exact** naar de rechtermodule:
   - Dezelfde containerhoogte (`99.7%` of eventueel `h-full` na afstemming).
   - Dezelfde verticale offset (`-translate-y-[1px]`).
   - Dezelfde negatieve marge/overlap (`ml-[-3px]`).
   - Dezelfde z-index (`z-[1]`) zodat de middenmodule boven de naad ligt.
3. **Controleer de rechtermodule-afbeelding** op transparante randen/uitlijding. Indien nodig pas ik de overlap of crop aan zodat de zichtbare rand gelijk is aan de linkerkant.
4. **Positioneer de `+`/`-`-knop rechts** exact spiegelgelijk aan de linkerkant: verticaal en horizontaal gecentreerd ten opzichte van de module.
5. **Test in de preview** met beide modules aan/uit en controleer of de naad tussen midden- en rechtermodule identiek is aan de linkerkant.
