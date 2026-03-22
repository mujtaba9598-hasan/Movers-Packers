/* ============================================
   TIMELESS RELOCATION - Main JavaScript
   Modern, clean, performance-focused
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     Utility: ease-out cubic for smooth counters
  ------------------------------------------ */
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  /* ------------------------------------------
     Navbar - scroll effect + hide/show on direction
  ------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  let lastScrollY = 0;
  let ticking = false;

  const handleNavbarScroll = () => {
    if (!navbar) return;
    const currentY = window.scrollY;

    // Add or remove scrolled class at threshold
    navbar.classList.toggle('scrolled', currentY > 50);

    // Hide on scroll down, show on scroll up
    if (currentY > 200) {
      if (currentY > lastScrollY + 5) {
        navbar.classList.add('nav-hidden');
      } else if (currentY < lastScrollY - 5) {
        navbar.classList.remove('nav-hidden');
      }
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentY;
    ticking = false;
  };

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(handleNavbarScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ------------------------------------------
     Mobile Menu - open / close / overlay
  ------------------------------------------ */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  const openMobileMenu = () => {
    mobileMenu?.classList.add('open');
    if (mobileOverlay) {
      mobileOverlay.style.display = 'block';
      requestAnimationFrame(() => mobileOverlay.classList.add('open'));
    }
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileMenu?.classList.remove('open');
    if (mobileOverlay) {
      mobileOverlay.classList.remove('open');
      setTimeout(() => { mobileOverlay.style.display = 'none'; }, 300);
    }
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* ------------------------------------------
     Mobile Dropdown Toggles
  ------------------------------------------ */
  document.querySelectorAll('.mobile-dropdown-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const items = toggle.nextElementSibling;
      if (!items) return;

      items.classList.toggle('open');
      const arrow = toggle.querySelector('svg');
      if (arrow) {
        arrow.style.transform = items.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  });

  /* ------------------------------------------
     FAQ Accordion
  ------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');

      // Close every item first
      faqItems.forEach((i) => i.classList.remove('open'));

      // Re-open if it was closed
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ------------------------------------------
     Scroll Animations via Intersection Observer
  ------------------------------------------ */
  const animElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (animElements.length && 'IntersectionObserver' in window) {
    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animElements.forEach((el) => animObserver.observe(el));
  }

  /* ------------------------------------------
     Smooth Number Counter with Easing
  ------------------------------------------ */
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'), 10);
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.floor(easedProgress * target);

      counter.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = target + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  }

  /* ------------------------------------------
     Contact Form - sends data to WhatsApp
  ------------------------------------------ */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('name') || '';
      const phone = fd.get('phone') || '';
      const email = fd.get('email') || '';
      const service = fd.get('service') || '';
      const message = fd.get('message') || '';

      let waMsg = `Hello Timeless Relocation!%0A%0A`;
      waMsg += `Name: ${name}%0A`;
      if (phone) waMsg += `Phone: ${phone}%0A`;
      if (email) waMsg += `Email: ${email}%0A`;
      if (service) waMsg += `Service: ${service}%0A`;
      waMsg += `%0AMessage: ${message}`;

      window.open(`https://wa.me/971568654794?text=${waMsg}`, '_blank');

      // Visual success feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Message Sent!';
        btn.style.background = '#00BFA5';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }
    });
  }

  /* ------------------------------------------
     Quote Form - sends data to WhatsApp
  ------------------------------------------ */
  const quoteForm = document.getElementById('quoteForm');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(quoteForm);
      let waMsg = `Hello! I'd like a free quote.%0A%0A`;

      for (const [key, value] of fd.entries()) {
        if (value) waMsg += `${key}: ${value}%0A`;
      }

      window.open(`https://wa.me/971568654794?text=${waMsg}`, '_blank');
    });
  }

  /* ------------------------------------------
     Active Navigation Highlighting
  ------------------------------------------ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

  allNavLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Direct page match
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }

    // Service sub-pages: highlight the Services dropdown toggle
    if (
      (currentPage.includes('services/') || window.location.pathname.includes('services/')) &&
      href.includes('services/')
    ) {
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.dropdown-toggle');
        toggle?.classList.add('active');
      }
    }
  });

});
