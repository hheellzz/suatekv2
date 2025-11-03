document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
      const expanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded.toString());
    });

    // Close mobile nav after clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close with Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Auto-scroll for slider
  const slider = document.querySelector('.slider-flex');
  if (slider) {
    const SCROLL_SPEED = 1; // Slower speed
    let direction = 1;
    let paused = false;
    let rafId = null;

    function autoScroll() {
      if (!paused && !document.hidden) {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        const currentScroll = slider.scrollLeft;
        
        // Precise end detection
        if (currentScroll <= 0) {
          direction = 1; // Start moving right
        } else if (currentScroll >= maxScroll) {
          direction = -1; // Start moving left
        }

        // Smooth scrolling
        slider.scrollLeft += SCROLL_SPEED * direction;
      }
      rafId = requestAnimationFrame(autoScroll);
    }

    function setPaused(val) {
      paused = !!val;
    }

    // Pause on hover/touch
    slider.addEventListener('mouseenter', () => setPaused(true));
    slider.addEventListener('mouseleave', () => setPaused(false));
    slider.addEventListener('touchstart', () => setPaused(true), { passive: true });
    slider.addEventListener('touchend', () => setPaused(false));

    // Pause when tab inactive
    document.addEventListener('visibilitychange', () => {
      setPaused(document.hidden);
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      if (rafId) cancelAnimationFrame(rafId);
    });

    // Start scrolling
    autoScroll();
  }

  document.querySelectorAll('.stats-flex h3').forEach(el => {
    const target = +el.textContent.replace(/\D/g, '');
    if (!target) return;
    let count = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    function update() {
      count += step;
      if (count >= target) {
        el.textContent = target + (el.textContent.includes('%') ? '%' : '+');
      } else {
        el.textContent = count + (el.textContent.includes('%') ? '%' : '+');
        requestAnimationFrame(update);
      }
    }
    update();
  });

  // Fade-in on scroll only for first visit in this session
  (function() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.fade-in, .stagger');

    if (!targets.length) return;

    // If user prefers reduced motion or we've visited before, reveal immediately
    if (prefersReduced || sessionStorage.getItem('visited')) {
      targets.forEach(el => {
        // if stagger, reveal children too
        if (el.classList.contains('stagger')) {
          el.classList.add('animated');
          el.querySelectorAll('*').forEach(ch => ch.style.opacity = '1');
        } else {
          el.classList.add('animated');
        }
      });
      sessionStorage.setItem('visited', 'true');
      return;
    }

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(el => io.observe(el));

    // mark visited so next page load won't animate
    sessionStorage.setItem('visited', 'true');
  })();

  // Animate slider images when in view
  document.querySelectorAll('.slider-flex img').forEach(img => {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(img);
  });

  // Contact form handling (idempotent — integrates with existing validation)
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (form && formMessage) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.style.display = 'block';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.display = 'block';
        return;
      }

      // Replace with real submission endpoint as needed
      formMessage.style.color = 'green';
      formMessage.textContent = 'Thanks — your message has been received.';
      formMessage.style.display = 'block';
      form.reset();
    });
  }

  // Dynamic active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#main-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80; // adjust offset for header height
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  });

  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
});
