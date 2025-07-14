document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
      // Optionally, close nav when a link is clicked (for mobile UX)
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          hamburger.classList.remove('active');
        });
      });
    });
  }

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

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = 0;
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

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

  // Contact form validation and feedback
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (form && formMessage) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Simple validation
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.display = 'block';
        return;
      }

      // Basic email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.display = 'block';
        return;
      }

      // Here you would normally send data to your server...
      // For now, just show success message and reset form:
      formMessage.style.color = 'green';
      formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
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
