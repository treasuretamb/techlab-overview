const TOTAL = 9; 
let current = 0;

function go(direction) {
  const slides = document.querySelectorAll('.slide');

  slides[current].classList.remove('active');
  slides[current].classList.add('exit');
  setTimeout(() => slides[current].classList.remove('exit'), 400);

  current = Math.max(0, Math.min(TOTAL - 1, current + direction));
  slides[current].classList.add('active');
  syncNav();
}

function syncNav() {
  const slides = document.querySelectorAll('.slide');

  // Update every counter and progress bar across all slides
  document.querySelectorAll('.slide-ctr').forEach(el => {
    el.textContent = `${current + 1} / ${TOTAL}`;
  });

  document.querySelectorAll('.prog-fill').forEach(el => {
    el.style.width = `${((current + 1) / TOTAL) * 100}%`;
  });

  // Disable Prev on every slide's prev button when on first slide
  document.querySelectorAll('[onclick="go(-1)"]').forEach(btn => {
    btn.disabled = current === 0;
  });

  // Disable Next on every slide's next button when on last slide
  document.querySelectorAll('[onclick="go(1)"]').forEach(btn => {
    btn.disabled = current === TOTAL - 1;
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(-1);
});

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