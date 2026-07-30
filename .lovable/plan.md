Doel: de huidige trust-banner onderaan de productpagina vervangen door een exacte kopie van de meest recente referentie-afbeelding.

Wijzigingen in `src/routes/product.$handle.tsx`:
1. Vier items in één horizontale balk met verticale scheidingslijnen:
   - Schild met maan-icoon + "4,7/5 klantbeoordeling"
   - Truck-icoon + "Gratis levering & retourneren"
   - Kalender-icoon + "100 nachten proefslapen"
   - Schild met maan-icoon + "Tot 25 jaar garantie"
2. Icoonstijl: dunne lijn-icons (lucide-react), 1.5 stroke, `#0f1f2a` kleur.
3. Tekst: 14px, normale gewicht, `#0f1f2a`, single-line.
4. Layout: flex-row met `divide-x` tussen de items, gecentreerd, op desktop één rij.
5. Achtergrond blijft wit, padding behoudt de laatst aangepaste waarde.

Let op: de tekst "100 nachten proefslapen" is slaapgericht. Omdat je vraagt om alles exact over te nemen, pas ik deze letterlijk toe. Als je wilt, kunnen we achteraf de teksten aanpassen aan de TV-kast context (bijv. "100 dagen proefkijken").

Validatie: typecheck na wijziging.