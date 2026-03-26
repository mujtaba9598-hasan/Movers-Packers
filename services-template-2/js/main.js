/* ================================================
   Timeless Relocation - Main JS
   ================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    navScroll();
    mobileMenu();
    faqAccordion();
    scrollReveal();
    counterAnim();
    contactForm();
    activeNav();
  }

  /* --- Navbar: shadow on scroll, hide on scroll-down --- */
  function navScroll() {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    var last = 0, raf = false;

    function update() {
      var y = window.scrollY;
      nav.classList.toggle('scrolled', y > 40);
      if (y > last && y > 180) nav.classList.add('nav-hidden');
      else nav.classList.remove('nav-hidden');
      last = y;
      raf = false;
    }

    window.addEventListener('scroll', function () {
      if (!raf) { requestAnimationFrame(update); raf = true; }
    });
  }

  /* --- Mobile drawer --- */
  function mobileMenu() {
    var btn = document.querySelector('.hamburger');
    var drawer = document.querySelector('.mobile-drawer');
    var backdrop = document.querySelector('.mobile-backdrop');
    var close = document.querySelector('.mobile-close');
    var ddToggle = document.querySelector('.mobile-dd-toggle');
    var ddList = document.querySelector('.mobile-dd-list');

    function open() {
      if (btn) btn.classList.add('open');
      if (drawer) drawer.classList.add('show');
      if (backdrop) backdrop.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
    function shut() {
      if (btn) btn.classList.remove('open');
      if (drawer) drawer.classList.remove('show');
      if (backdrop) backdrop.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (btn) btn.addEventListener('click', open);
    if (close) close.addEventListener('click', shut);
    if (backdrop) backdrop.addEventListener('click', shut);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });

    if (ddToggle && ddList) {
      ddToggle.addEventListener('click', function () {
        ddToggle.classList.toggle('open');
        ddList.classList.toggle('open');
      });
    }
  }

  /* --- FAQ accordion --- */
  function faqAccordion() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a) return;

      q.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');

        items.forEach(function (other) {
          other.classList.remove('open');
          var oa = other.querySelector('.faq-a');
          if (oa) oa.style.maxHeight = null;
        });

        if (!wasOpen) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  }

  /* --- Scroll reveal --- */
  function scrollReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('shown');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* --- Counter animation --- */
  function counterAnim() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length || !('IntersectionObserver' in window)) return;

    function ease(t) { return 1 - Math.pow(1 - t, 3); }

    function animate(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var dur = 2200, start = null;

      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = prefix + Math.round(ease(p) * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (c) { obs.observe(c); });
  }

  /* --- Contact form to WhatsApp --- */
  function contactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value : ''; };

      var msg = 'Hello Timeless Relocation!\n\n'
        + 'Name: ' + get('name') + '\n'
        + 'Phone: ' + get('phone') + '\n'
        + 'Email: ' + get('email') + '\n'
        + 'Service: ' + get('service') + '\n'
        + 'Message: ' + get('message') + '\n';

      window.open('https://wa.me/971568654794?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  /* --- Active nav link --- */
  function activeNav() {
    var path = window.location.pathname;
    var links = document.querySelectorAll('.nav-link, .mobile-link, .dropdown-panel a, .mobile-dd-list a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && path.endsWith(href.replace(/^\.\.\/|^\.\//, ''))) {
        link.classList.add('active');
      }
    });
  }

})();
