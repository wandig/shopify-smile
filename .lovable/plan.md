Kleurnaam zichtbaar maken op mobiel

Probleem
Op mobiel is de geselecteerde kleurnaam (bijv. "Walnootbruin") niet zichtbaar in de productconfigurator. De vijf ronde kleurstaaltjes van 36 px per stuk nemen zoveel horizontale ruimte in dat de tekst wordt afgekapt tot ongeveer 9 px breedte.

Voorgestane oplossing
De kleurrij op mobiel opdelen in twee regels:
1. Bovenregel: label + geselecteerde kleurnaam, bijvoorbeeld "Kleur: Walnootbruin" — volledige breedte, goed leesbaar.
2. Onderregel: de vijf kleurstaaltjes over de volle breedte, eventueel met subtiele scroll als er meer dan vijf kleuren zijn.

Op desktop blijft de huidige indeling (label/naam links, staaltjes rechts) ongewijzigd.

Technische aanpak
- Pas het kleur-blok in `src/routes/product.$handle.tsx` aan met een responsive layout.
- Gebruik een media-query-achtige Tailwind-structuur (`max-md:` of `md:`) zodat de mobiele variant alleen onder 768 px actief is.
- Behoud de bestaande selectie-logica, swatch-styling en actieve-toestand.

Acceptatiecriteria
- Op mobiel is de geselecteerde kleurnaam duidelijk leesbaar.
- De kleurstaaltjes blijven makkelijk aanklikbaar.
- Desktop-layout verandert niet.
