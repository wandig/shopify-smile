# Plan: 10 desktop designalternatieven voor "Stel jouw tv-wand samen"

## Doel
Voor de homepage-sectie "Stel jouw tv-wand samen" (desktop, ≥1024px) 10 verschillende designrichtingen definiëren. Mobiel en tablet blijven ongewijzigd. De huidige sectie is een horizontale afgeronde kaart met de lifestyle-foto links en tekst + oranje CTA rechts.

## Randvoorwaarden
- Houd de bestaande foto (houten tv-wand met spelende kinderen).
- Houd de content gelijk: label "Configurator", heading "Stel jouw tv-wand samen", subtekst over formaat/indeling/kleur/prijs, CTA "Start de configurator".
- Gebruik het Wandig-palet: #faf8f5 (pagina), #f6f3ee / #ede7e0 (kaarten), #ef7027 (CTA), donkere tekst #2d2a26 / #0f1f2a.
- Font: Circular-Regular, Helvetica Neue, Helvetica, Arial, sans-serif.
- Stijl: warm, minimalistisch, editorial, ronde hoeken.

## 10 desktop-alternatieven

1. **Editorial 60/40 split**
   Brede kaart met foto links (60%) en tekst rechts (40%). Grote heading, royale witruimte, CTA onderaan rechts. Strak en vertrouwd, maar meer contrast dan de huidige versie.

2. **Compact centered product card**
   Smallere, gecentreerde kaart (~900px breed). Foto bovenaan als breed top-strip, content eronder gecentreerd. Past beter in de verticale flow en voelt minder massief aan.

3. **Asymmetric broken grid**
   Foto loopt door over ~70% van de breedte en steekt links buiten de container. Tekstblok zweeft rechts over de foto heen met een lichte achtergrond. Dynamisch, magazine-gevoel.

4. **Full-bleed lifestyle background**
   De foto vult de hele sectie als achtergrond. Een semi-transparant licht paneel rechts bevat tekst en CTA. Cinematisch, maar licht en niet donker.

5. **Magazine two-column**
   Links de foto met een klein onderschrift/caption. Rechts een kolom met heading, korte bullet-USP’s (3 regels) en de CTA. Voelt als een pagina uit een woonblad.

6. **Framed product stage**
   De foto zit in een subtiele "stage"-omlijsting (schaduw + ronde hoeken) alsof het een presentatie is. Tekst staat er los naast, niet in dezelfde kaart. Productshowroom-gevoel.

7. **Wide panoramic banner**
   Zeer lage, breed uitgespreide kaart (~280px hoog). Foto links, tekst en CTA horizontaal rechts op één lijn. Geschikt als rustig tussenstation tussen secties.

8. **Typography-first minimal**
   Foto is klein (~40% breedte) en tekst domineert. Grote heading, korte subtekst, CTA prominent. Focus op de boodschap in plaats van op de afbeelding.

9. **Configurator preview with color swatches**
   Foto links, rechts naast de tekst een rij van 5 kleine kleurstaal-circles die aangeven dat je kleuren kunt kiezen. Versterkt het configureer-gedrag visueel.

10. **CTA + social proof combo**
    Foto links, tekst rechts, en onder de CTA een compacte rij met "1000+ beoordelingen" + 5 sterren + "15.000+ verkocht". Combineert het configureren met vertrouwen.

## Vervolgstap
Na goedkeuring van deze lijst worden de 3 meest interessante richtingen uitgewerkt als interactieve prototypes (of direct in code als de gebruiker één richting kiest). Daarna wordt de gekozen richting geïmplementeerd in `src/routes/index.tsx` onder `ConfiguratorBannerSection`, alleen voor desktop (`lg:` breakpoints).