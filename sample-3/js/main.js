document.addEventListener('DOMContentLoaded', () => {

  // Sticky Header
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Mobile Dropdown toggling
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (e.target.tagName !== 'A' || e.target.parentElement.classList.contains('dropdown')) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      }
    });
  });

  // Scroll Animations using Intersection Observer
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

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });

  // FAQ Accordions
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parent = question.parentElement;
      
      // Close all others
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          item.querySelector('.faq-question').classList.remove('active');
        }
      });

      // Toggle current
      parent.classList.toggle('active');
      question.classList.toggle('active');
    });
  });

  // Contact Form to WhatsApp
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Service Required:* ${service}%0A*Message:* ${message}`;
      
      const whatsappUrl = `https://wa.me/971568654794?text=${whatsappMessage}`;
      window.open(whatsappUrl, '_blank');
      
      contactForm.reset();
    });
  }

});
