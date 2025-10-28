// Small enhancements: smooth scroll for internal links and focus-visible class polyfill
(function(){
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
  // Smooth scroll for anchor links
  document.addEventListener('click', function(e){
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      target.focus({preventScroll:true});
    }
  });

  // Basic focus-visible: add class when using keyboard
  function handleFirstTab(e){
    if(e.key === 'Tab'){
      document.body.classList.add('using-keyboard');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');

  function openMobileMenu(){
    menuToggle.setAttribute('aria-expanded','true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden','false');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu(){
    menuToggle.setAttribute('aria-expanded','false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  if(menuToggle){
    menuToggle.addEventListener('click', function(){
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      if(open) closeMobileMenu(); else openMobileMenu();
    });
  }

  if(mobileOverlay){
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // close on escape
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      if(mobileMenu && mobileMenu.classList.contains('open')) closeMobileMenu();
    }
  });
})();
