// TE Custom — scroll nav + dropdown fixes post-Webflow migration
(function() {
  // 1. Scroll nav: hide on load, show after scroll
  var scrollNav = document.querySelector('.navbar-scroll');
  if (scrollNav) {
    scrollNav.style.opacity = '0';
    scrollNav.style.pointerEvents = 'none';
    scrollNav.style.transition = 'opacity 0.25s ease';
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        scrollNav.style.opacity = '1';
        scrollNav.style.pointerEvents = '';
      } else {
        scrollNav.style.opacity = '0';
        scrollNav.style.pointerEvents = 'none';
      }
    }, { passive: true });
  }

  // 2. Dropdown toggle fix for .w-dropdown
  document.addEventListener('click', function(e) {
    var toggle = e.target.closest('.w-dropdown-toggle');
    if (toggle) {
      var dropdown = toggle.closest('.w-dropdown');
      var list = dropdown && dropdown.querySelector('.w-dropdown-list');
      if (!dropdown || !list) return;
      var isOpen = dropdown.classList.contains('w--open');
      // Close all other dropdowns first
      document.querySelectorAll('.w-dropdown.w--open').forEach(function(d) {
        d.classList.remove('w--open');
        d.querySelector('.w-dropdown-toggle') && d.querySelector('.w-dropdown-toggle').classList.remove('w--open');
        d.querySelector('.w-dropdown-list') && d.querySelector('.w-dropdown-list').classList.remove('w--open');
      });
      if (!isOpen) {
        dropdown.classList.add('w--open');
        toggle.classList.add('w--open');
        list.classList.add('w--open');
      }
      e.stopPropagation();
    } else if (!e.target.closest('.w-dropdown')) {
      // Click outside — close all
      document.querySelectorAll('.w-dropdown.w--open').forEach(function(d) {
        d.classList.remove('w--open');
        d.querySelector('.w-dropdown-toggle') && d.querySelector('.w-dropdown-toggle').classList.remove('w--open');
        d.querySelector('.w-dropdown-list') && d.querySelector('.w-dropdown-list').classList.remove('w--open');
      });
    }
  });
})();
