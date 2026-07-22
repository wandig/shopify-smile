// PDP: thumb selects main image; option boxes/swatches toggle active state and rebuild variant
document.addEventListener('click', (e) => {
  const thumb = e.target.closest('[data-thumb]');
  if (thumb) {
    const url = thumb.getAttribute('data-thumb');
    const main = document.querySelector('[data-main-image]');
    if (main) main.src = url;
    document.querySelectorAll('[data-thumb]').forEach(t => t.classList.remove('is-active'));
    thumb.classList.add('is-active');
  }

  const opt = e.target.closest('[data-opt]');
  if (opt) {
    const group = opt.getAttribute('data-opt-group');
    document.querySelectorAll(`[data-opt-group="${group}"]`).forEach(o => o.classList.remove('is-active'));
    opt.classList.add('is-active');
    const label = document.querySelector(`[data-opt-selected="${group}"]`);
    if (label) label.textContent = opt.getAttribute('data-opt-value');
    updateVariant();
  }

  const nav = e.target.closest('[data-thumbs-nav]');
  if (nav) {
    const dir = nav.getAttribute('data-thumbs-nav') === 'next' ? 1 : -1;
    const track = document.querySelector('[data-thumbs-track]');
    if (track) track.scrollBy({ left: dir * 240, behavior: 'smooth' });
  }

  // Accordions: opening one closes the others in the same group
  const summary = e.target.closest('.w-acc details summary, .w-spec details summary');
  if (summary) {
    const clickedDetails = summary.closest('details');
    const container = clickedDetails.closest('.w-acc, .w-spec');
    if (container && !clickedDetails.open) {
      container.querySelectorAll('details').forEach(d => {
        if (d !== clickedDetails) d.open = false;
      });
    }
  }
});

function updateVariant() {
  const form = document.querySelector('[data-product-form]');
  if (!form) return;
  const variants = JSON.parse(form.getAttribute('data-variants') || '[]');
  const selected = [];
  form.querySelectorAll('[data-opt-selected]').forEach(el => selected.push(el.textContent.trim()));
  const match = variants.find(v => JSON.stringify(v.options) === JSON.stringify(selected));
  if (match) {
    form.querySelector('[name="id"]').value = match.id;
    const priceEl = document.querySelector('[data-price]');
    if (priceEl) priceEl.textContent = match.price;
  }
}
