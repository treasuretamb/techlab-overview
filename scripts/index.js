const TOTAL = 9;
let current = 0;
let touchStartX = 0;
let touchStartY = 0;

function go(direction) {
  const slides = document.querySelectorAll('.slide');

  slides[current].classList.remove('active');
  slides[current].classList.add('exit');
  setTimeout(() => slides[current].classList.remove('exit'), 400);

  current = Math.max(0, Math.min(TOTAL - 1, current + direction));
  slides[current].classList.add('active');

  // Scroll new slide's content back to top on mobile
  const scrollables = slides[current].querySelectorAll('.body, .closing, .lab-slide');
  scrollables.forEach(el => { el.scrollTop = 0; });

  syncNav();
}

function syncNav() {
  document.querySelectorAll('.slide-ctr').forEach(el => {
    el.textContent = `${current + 1} / ${TOTAL}`;
  });

  document.querySelectorAll('.prog-fill').forEach(el => {
    el.style.width = `${((current + 1) / TOTAL) * 100}%`;
  });

  document.querySelectorAll('[onclick="go(-1)"]').forEach(btn => {
    btn.disabled = current === 0;
  });

  document.querySelectorAll('[onclick="go(1)"]').forEach(btn => {
    btn.disabled = current === TOTAL - 1;
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(-1);
});

// Touch swipe navigation
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  const dy = e.changedTouches[0].screenY - touchStartY;
  // Only trigger slide change if horizontal swipe is dominant and long enough
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < 0) go(1);   // swipe left → next
    else        go(-1);  // swipe right → prev
  }
}, { passive: true });

// Slide 8 — Read more / Read less (mobile only)
document.querySelectorAll('.team .body-sm').forEach(function (p) {
  var btn = document.createElement('button');
  btn.className = 'read-more-btn';
  btn.textContent = 'Read more';
  btn.addEventListener('click', function () {
    var expanded = p.classList.toggle('expanded');
    btn.textContent = expanded ? 'Read less' : 'Read more';
  });
  p.insertAdjacentElement('afterend', btn);
});