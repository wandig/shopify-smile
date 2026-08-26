Verbeter leesbaarheid prijs op de Full House-kaart

## Probleem
De grote featured Full House-kaart legt titel, prijs en betaalinfo direct over de lifestyle-foto. Door de houtstructuur en wisselende lichtval op de achtergrond is de prijs niet altijd even goed leesbaar, vooral de doorgehaalde originele prijs.

## Aanpak
Voeg een subtiele, lokale achtergrond toe achter het tekstblok links op de Full House-kaart zodat de prijs loskomt van de foto, zonder het beeld zwaar te bedekken.

Concrete wijzigingen:
- Zet een zachte, horizontale gradient/scrim achter de titel/price/payment-info (`from-[#071426]/60 via-[#071426]/35 to-transparent`) zodat witte en oranje tekst duidelijk afsteekt.
- Geef dat tekstblok een kleine padding en afgeronde hoeken zodat het geen harde rand krijgt.
- Houd de prijs links onder de titel (huidige positie) en behoud de grotere lettergrootte die de gebruiker zojuist heeft gevraagd.
- Pas de text-shadow licht aan als dat nodig is voor extra contrast.
- Controleer of Duo- en Solo-kaarten niet onbedoeld mee veranderen; die staan op een effen achtergrond en zijn nu goed leesbaar.

## Valideren
Preview openen op desktop en controleren dat:
- De Full House-prijs zonder moeite leesbaar is.
- De foto nog steeds de hoofdrol speelt.
- Duo/Solo-kaarten onveranderd blijven.

## Niet in scope
- Kaarthoogtes of algemene grid-layout aanpassen (gebruiker wil zelfde hoogte houden).
- Prijs naar een andere kaartpositie verplaatsen; we behouden de huidige links-onder-titel locatie.
