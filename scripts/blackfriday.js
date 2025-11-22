/* Black Friday landing JS
   Place in: /scripts/blackfriday.js
   Requires an element with id="countdown" in the page (we already created it).
   Also binds CTA buttons with class .secure-offer-btn to open Calendly popup (or fallback).
*/

(function () {
  'use strict';

  /* ---------- CONFIG ---------- */
  // Target deadline (end of Nov 28, 2025 in Sao_Paulo timezone)
  const deadlineISO = '2025-11-28T23:59:59-03:00';

  // Selector for countdown container
  const countdownEl = document.getElementById('countdown');

  // CTA selector
  const CTA_SELECTOR = '.secure-offer-btn, .btn-primary';

  /* ---------- COUNTDOWN ---------- */
  function startCountdown(targetISO, container) {
    if (!container) return;

    const target = new Date(targetISO).getTime();

    function update() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        container.innerHTML = '<div class="countdown-ended">Offer expired — check our services or contact us.</div>';
        clearInterval(timer);
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

    function renderSegment(value, label) {
      return '<div class="countdown-segment" aria-hidden="false" role="group">' +
        '<strong>' + String(value).padStart(2, '0') + '</strong>' +
        '<small>' + label + '</small>' +
        '</div>';
    }

    update();
    const timer = setInterval(update, 1000);
  }

  /* ---------- SMOOTH SCROLL / FOCUS ---------- */
  function bindCTALinks() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#' || href === '#!') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
          target.setAttribute('tabindex', '-1');
          target.focus({preventScroll: true});
        }
      });
    });
  }

  /* ---------- Calendly popup (if Calendly is used) ---------- */
  function bindOfferCTAs() {
    const ctas = document.querySelectorAll(CTA_SELECTOR);
    if (!ctas) return;

    ctas.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // If Calendly widget is available, open popup. Otherwise go to calendly link page.
        const calendlyUrl = 'https://calendly.com/legibleledgers/clarity-call';
        try {
          if (window.Calendly && typeof window.Calendly.showPopup === 'function') {
            window.Calendly.initPopupWidget({url: calendlyUrl});
          } else if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
            window.Calendly.initPopupWidget({url: calendlyUrl});
          } else {
            // fallback: open calendly in new tab
            window.open(calendlyUrl, '_blank', 'noopener');
          }
        } catch (err) {
          window.open(calendlyUrl, '_blank', 'noopener');
        }
      });
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    startCountdown(deadlineISO, countdownEl);
    bindCTALinks();
    bindOfferCTAs();
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');

  function openMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      if (open) closeMobileMenu(); else openMobileMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // close on escape
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('open')) closeMobileMenu();
    }
  });
})();
