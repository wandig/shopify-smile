## Bestsellers section — match the reference exactly

Edits all in `src/routes/index.tsx` (lines ~197–310), no logic changes.

### 1. Featured "Full House" card (left)
- Change container from `aspect-[3/4] md:aspect-auto md:h-[640px]` → strict `aspect-[3/4]` on all breakpoints (per the reference and your request).
- Keep current image, badge, centered title/price, bottom rating + cart button.
- Reduce zoom back to `scale-[1.1]` so the bed is framed like the reference (it's currently cropped tight at `scale-[1.2]`).

### 2. Side cards (Vivo, Mollis, Moma)
In the reference, each side card is a tall white card where:
- the image sits in the **top ~55%** as a rounded rectangle inset (not edge-to-edge),
- the bottom ~45% is white with title, price, rating, size · category, and the orange cart button on the right.

Changes:
- Make the whole card the same total height as the featured card by using `aspect-[3/4]` on the side cards too (matches the reference row height).
- Replace the current `aspect-[4/3]` full-bleed image with an inset image block: `m-2 rounded-xl overflow-hidden h-[55%]` with `object-cover object-center` so Vivo and Mollis are no longer awkwardly cropped.
- Keep the existing text block, but place it in the remaining `h-[45%]` with the same typography.

### 3. Vivo / Mollis "look weird"
Root cause is the current `aspect-[4/3]` full-bleed crop on a wide image. The inset + `object-center` framing above fixes it without changing the image URLs. If you'd rather swap the images themselves, tell me which Shopify image to use for each and I'll wire them in instead.

### 4. Vertical BESTSELLERS label
Already exists on `md+`. I'll also show it on mobile (small rotated label in the left gutter) so the layout matches the reference at every width.

### Out of scope
No changes to the hero, the three small category boxes above, or any other section.