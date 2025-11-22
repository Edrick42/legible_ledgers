// Small enhancements: smooth scroll for internal links and focus-visible class polyfill
(function () {
  // Header fixed on scroll
  const header = document.querySelector('.site-header');
  const scrollThreshold = 100; // pixels scrolled before header becomes fixed

  function checkScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check initial scroll position
  // Smooth scroll for anchor links with header offset and reduced-motion support
  function scrollToElementWithOffset(target, smooth = true) {
    if (!target) return;
    const headerHeight = header ? header.offsetHeight : 0;
    const gap = 8; // small gap so content isn't flush against header
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
      // some elements may not accept focus
    }
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();

      // close mobile menu if open
      if (mobileMenu && mobileMenu.classList.contains('open')) closeMobileMenu();

      // perform scroll with header offset
      scrollToElementWithOffset(target, true);

      // update URL hash without jumping
      history.replaceState(null, '', href);
    }
  });

  // If page loaded with a hash (direct link), scroll to it after initial layout
  window.addEventListener('load', function () {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      // delay slightly to allow any layout changes
      setTimeout(function () {
        scrollToElementWithOffset(target, false);
      }, 40);
    }
  });

  // Basic focus-visible: add class when using keyboard
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

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
