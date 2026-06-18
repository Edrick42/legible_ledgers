/* Home page behavior: fixed header on scroll, testimonials carousel,
   Calendly CTA wiring, favicon initialization. Shared mobile-menu / smooth-scroll
   logic lives in common.js. */
(function () {
  'use strict';

  /* ---------- Fixed header on scroll ---------- */
  const header = document.querySelector('.site-header');
  const scrollThreshold = 100;

  function checkScroll() {
    if (!header) return;
    if (window.scrollY > scrollThreshold) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();

  /* ---------- Testimonials carousel ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.testimonials-carousel');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    if (!carousel || !nextBtn || !prevBtn) return;

    function scrollToNext(direction) {
      const card = carousel.querySelector('.testimonials-card');
      if (!card) return;
      const gap = parseInt(getComputedStyle(carousel).gap, 10) || 0;
      const scrollAmount = card.offsetWidth + gap;
      carousel.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
    }

    nextBtn.addEventListener('click', function () { scrollToNext(1); });
    prevBtn.addEventListener('click', function () { scrollToNext(-1); });
  });

  /* ---------- Calendly CTA buttons ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    const ctas = document.querySelectorAll('.clarity-call-btn');
    if (!ctas.length) return;

    const calendlyUrl = 'https://calendly.com/legibleledgers/clarity-call';

    ctas.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        try {
          if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
            window.Calendly.initPopupWidget({ url: calendlyUrl });
          } else {
            window.open(calendlyUrl, '_blank', 'noopener');
          }
        } catch (err) {
          window.open(calendlyUrl, '_blank', 'noopener');
        }
      });
    });
  });

})();
