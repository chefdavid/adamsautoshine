/* ============================================
   ADAMS AUTOSHINE - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ MOBILE NAVIGATION ============
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============ STICKY HEADER ============
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check on load

  // ============ BACK TO TOP BUTTON ============
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============ SCROLL ANIMATIONS (Intersection Observer) ============
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fade-up').forEach(el => {
    observer.observe(el);
  });

  // ============ COUNTER ANIMATION ============
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat__number[data-count]');
        counters.forEach(counter => {
          animateCounter(counter);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  // ============ FAQ ACCORDION ============
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-item__answer').style.maxHeight = '0';
        }
      });

      // Toggle current item
      item.classList.toggle('active');
      question.setAttribute('aria-expanded', !isActive);

      if (!isActive) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });

  // ============ BOOKING FORM VALIDATION ============
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');

  if (bookingForm) {
    // Set min date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous errors
      bookingForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      let isValid = true;

      // Validate required fields
      const requiredFields = [
        { id: 'fullName', message: 'Please enter your full name' },
        { id: 'phone', message: 'Please enter your phone number' },
        { id: 'email', message: 'Please enter a valid email address' },
        { id: 'service', message: 'Please select a service' },
        { id: 'date', message: 'Please select a preferred date' }
      ];

      requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        const group = input.closest('.form-group');
        const error = group.querySelector('.form-error');

        if (!input.value || input.value.trim() === '') {
          group.classList.add('error');
          if (error) error.textContent = field.message;
          isValid = false;
        }
      });

      // Validate email format
      const emailInput = document.getElementById('email');
      if (emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          const group = emailInput.closest('.form-group');
          const error = group.querySelector('.form-error');
          group.classList.add('error');
          if (error) error.textContent = 'Please enter a valid email address';
          isValid = false;
        }
      }

      // Validate phone format (basic)
      const phoneInput = document.getElementById('phone');
      if (phoneInput.value) {
        const phoneClean = phoneInput.value.replace(/[\s\-\(\)\.]/g, '');
        if (phoneClean.length < 10) {
          const group = phoneInput.closest('.form-group');
          const error = group.querySelector('.form-error');
          group.classList.add('error');
          if (error) error.textContent = 'Please enter a valid phone number';
          isValid = false;
        }
      }

      if (isValid) {
        // Show success message
        bookingForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // In production, submit to your form handler here:
        // fetch(bookingForm.action, {
        //   method: 'POST',
        //   body: new FormData(bookingForm)
        // });

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Scroll to first error
        const firstError = bookingForm.querySelector('.form-group.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    // Clear error on input
    bookingForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('error');
      });
      input.addEventListener('change', () => {
        input.closest('.form-group').classList.remove('error');
      });
    });
  }

  // ============ ACTIVE NAV LINK ON SCROLL ============
  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // ============ SET CURRENT YEAR IN FOOTER ============
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ============ PHONE NUMBER AUTO-FORMAT ============
  const phoneField = document.getElementById('phone');
  if (phoneField) {
    phoneField.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 10) value = value.slice(0, 10);

      if (value.length >= 7) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
      } else if (value.length >= 4) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else if (value.length >= 1) {
        value = `(${value}`;
      }

      e.target.value = value;
    });
  }

});
