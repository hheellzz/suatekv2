document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  // Optional: Close nav when a link is clicked (mobile UX)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Auto-scroll for slider
  const slider = document.querySelector('.slider-flex');
  if (slider) {
    let scrollAmount = 1.0; // pixels per frame
    let direction = 1; // 1 = right, -1 = left

    function autoScroll() {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        direction = -1; // reverse direction at end
      } else if (slider.scrollLeft <= 0) {
        direction = 1; // reverse direction at start
      }
      slider.scrollLeft += scrollAmount * direction;
      requestAnimationFrame(autoScroll);
    }

    autoScroll();
  }
});