/* Shared site behavior: mobile menu, smooth scroll with header offset,
   keyboard-focus detection. Loaded on every page before page-specific scripts. */
(function () {
  'use strict';

  const header = document.querySelector('.site-header');

  /* ---------- Smooth scroll with header offset ---------- */
  function scrollToElementWithOffset(target, smooth) {
    if (!target) return;
    const headerHeight = header ? header.offsetHeight : 0;
    const gap = 8;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - gap;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      window.scrollTo(0, Math.round(top));
    } else {
      window.scrollTo({ top: Math.round(top), behavior: smooth ? 'smooth' : 'auto' });
    }

    try {
      target.focus({ preventScroll: true });
    } catch (err) {
      /* some elements can't receive focus */
    }
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#' || href === '#!') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    if (mobileMenu && mobileMenu.classList.contains('open')) closeMobileMenu();
    scrollToElementWithOffset(target, true);
    history.replaceState(null, '', href);
  });

  window.addEventListener('load', function () {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      setTimeout(function () {
        scrollToElementWithOffset(target, false);
      }, 40);
    }
  });

  /* ---------- Keyboard focus detection ---------- */
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');

  function openMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileOverlay.classList.add('open');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
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

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });
})();
