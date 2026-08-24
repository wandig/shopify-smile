# Hero-video scherper maken

Doel: zichtbaar scherpere hero-video, met een desktop-WebM van maximaal ~2,5 MB en een mobiele versie die van ~0,6 MB naar ~1 MB gaat.

## Wat er gebeurt

1. Nieuwe encodes maken vanaf het 1080p-origineel (16,5 MB master die al in het project staat):
   - Desktop WebM (VP9): kwaliteit omhoog (lagere CRF, 2-pass), doel ~2,2-2,5 MB.
   - Desktop MP4 (H.264): kwaliteit omhoog, doel ~3,5-4 MB, als fallback voor browsers zonder WebM.
   - Mobiel WebM: doel ~1 MB.
   - Mobiel MP4: bijbehorende fallback, ~1,6-1,8 MB.
2. De bestanden naar de CDN uploaden en de bestaande verwijzingen in de homepage vervangen.
3. De oude, lager gecomprimeerde varianten verwijderen zodat er geen ongebruikte bestanden achterblijven.
4. Controleren in de preview dat de video echt in 1920x1080 speelt en netjes start, en de mobiele variant testen op smal scherm.

Als een encode boven de afgesproken grens uitkomt, stel ik de instelling bij en encodeer opnieuw tot het binnen de limiet valt — geen bestand groter dan afgesproken.

## Technisch

- ffmpeg, twee passes VP9 (`-crf` verlaagd, `-b:v 0`, `-row-mt 1`), H.264 met `-preset slow` en verlaagde CRF.
- Nieuwe `.asset.json`-pointers via de assets-CLI; imports in `src/routes/index.tsx` bijwerken (de `sources`-array in `HeroSection`).
- `src/components/LazyVideo.tsx` blijft ongewijzigd; die ondersteunt de meerdere bronnen met media-queries al.
