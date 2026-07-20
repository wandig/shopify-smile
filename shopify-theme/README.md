# Wandig Shopify Theme (Dawn-compatible)

A stand-alone Dawn-compatible Liquid theme that mirrors the current Lovable
project design (announcement bar, header, hero video, bestsellers carousel,
USPs, details grid, plug & play video, footer, and product page with
variant swatches + option boxes, "In winkelmand" CTA, and accordions).

## Install
1. Zip the contents of this folder (not the folder itself):
   ```
   cd shopify-theme && zip -r ../wandig-shopify-theme.zip .
   ```
   A pre-built zip is provided at `/mnt/documents/wandig-shopify-theme.zip`.
2. Shopify admin → **Online Store → Themes → Add theme → Upload zip**.
3. Preview or publish.

## Notes
- Images/videos load from the published Lovable CDN
  (`https://shopify-smile.lovable.app/__l5e/…`). You can later replace them
  with Shopify-hosted assets via the theme editor.
- Font stack matches: `Circular-Regular, Helvetica Neue, Helvetica, Arial, sans-serif`.
- Primary color: `#ef7027`. Coral accent: `#ef8874`. Background: `#fff7ee`.
- The product template pulls its variants and options from Shopify. Colors
  named `zwart`, `wit`, `eiken`, `walnoot`, `noten` render as swatches.
- This theme is decoupled from the Lovable project — no files in the app
  itself are modified.
