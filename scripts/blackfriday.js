/* Black Friday landing behavior: countdown timer, Calendly popup wiring,
   FAQ accordion. Shared mobile-menu / smooth-scroll logic lives in common.js. */
(function () {
  'use strict';

  /* End of Nov 28, 2025 in Sao_Paulo timezone */
  const DEADLINE_ISO = '2025-11-28T23:59:59-03:00';
  const CTA_SELECTOR = '.secure-offer-btn, .btn-primary, .clarity-call-btn';
  const CALENDLY_URL = 'https://calendly.com/legibleledgers/clarity-call';

  /* ---------- Countdown ---------- */
  function startCountdown(targetISO, container) {
    if (!container) return;

    const target = new Date(targetISO).getTime();
    let timer = null;

    function renderSegment(value, label) {
      return '<div class="countdown-segment" aria-hidden="false" role="group">' +
        '<strong>' + String(value).padStart(2, '0') + '</strong>' +
        '<small>' + label + '</small>' +
        '</div>';
    }

    function update() {
      const diff = target - Date.now();

      if (diff <= 0) {
        container.innerHTML = '<div class="countdown-ended">Offer expired — check our services or contact us.</div>';
        if (timer) clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      container.innerHTML = [
        renderSegment(days, 'Days'),
        renderSegment(hours, 'Hours'),
        renderSegment(minutes, 'Minutes'),
        renderSegment(seconds, 'Seconds'),
      ].join('');
    }

    update();
    timer = setInterval(update, 1000);
  }

  /* ---------- Calendly popup wiring ---------- */
  function bindOfferCTAs() {
    const ctas = document.querySelectorAll(CTA_SELECTOR);
    if (!ctas.length) return;

    ctas.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        try {
          if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
            window.Calendly.initPopupWidget({ url: CALENDLY_URL });
          } else {
            window.open(CALENDLY_URL, '_blank', 'noopener');
          }
        } catch (err) {
          window.open(CALENDLY_URL, '_blank', 'noopener');
        }
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  function bindFAQ() {
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      const id = btn.getAttribute('aria-controls');
      const answer = id && document.getElementById(id);
      if (!answer) return;

      answer.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', function () {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        answer.classList.toggle('open', !expanded);
      });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    startCountdown(DEADLINE_ISO, document.getElementById('countdown'));
    bindOfferCTAs();
    bindFAQ();
  });
})();
