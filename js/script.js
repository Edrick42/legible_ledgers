// Small enhancements: smooth scroll for internal links and focus-visible class polyfill
(function(){
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
})();
