# Scherpere hero-video zonder zwaar bestand

## Wat er nu staat

- Hero-video die de site gebruikt: **1600x900, 24 fps, ~565 kbit/s, 854 KB** (12 sec).
- Het originele master-bestand staat er nog wel: **1920x1080, 16,5 MB** (te zwaar om te gebruiken).
- Werkplaats-video: 1280x720, ~717 kbit/s, 5,7 MB (64 sec).

De huidige hero is dus fors gecomprimeerd — bij 565 kbit/s op 900p ontstaan blokjes in vlakke vlakken en zachte randen. Daar valt veel winst te halen zonder het bestand veel groter te maken.

## Aanpak

Opnieuw encoderen vanaf het 1080p-master met een betere encoder-instelling in plaats van simpelweg een hogere bitrate:

1. **Hero desktop**: 1920x1080, H.264 CRF-gebaseerd, langzaam preset, geluid eruit (video is toch muted). Streefbestand ~1,8-2,5 MB — zichtbaar scherper, nog steeds snel te laden.
2. **Hero mobiel**: aparte 1080x1080-achtige/720p-variant van ~700-900 KB, zodat telefoons niet de desktopversie downloaden.
3. **WebM (VP9 of AV1) naast de MP4**: bij gelijke bestandsgrootte duidelijk betere kwaliteit; browsers die het niet ondersteunen vallen terug op de MP4.
4. **Poster-afbeelding** blijft eerst zichtbaar, dus de ervaren laadtijd verandert niet.
5. Zelfde behandeling voor de werkplaats-video (die is nu 720p en kan naar 1080p met vergelijkbare grootte).

Na het encoderen check ik elke variant op grootte en beeldkwaliteit (frames vergelijken) voordat ik ze in de site zet.

## Technische details

- `ffmpeg` re-encode vanuit `hero-reel-v2.mp4` (HEVC 1080p master): H.264 `-crf 23 -preset slow -tune film -pix_fmt yuv420p -movflags +faststart -an`, plus VP9 (`-crf 33 -b:v 0 -row-mt 1`) of AV1 (`libsvtav1`) voor de WebM.
- Nieuwe bestanden gaan als Lovable-assets naar de CDN (`.asset.json`-pointers in `src/assets/`); oude ongebruikte pointers ruim ik op.
- `src/components/LazyVideo.tsx` krijgt ondersteuning voor meerdere `<source>`-elementen (WebM eerst, MP4 als fallback) met `media`-queries voor de mobiele variant; lazy-loading en poster-gedrag blijven ongewijzigd.
- `src/routes/index.tsx` gebruikt de nieuwe pointers.
