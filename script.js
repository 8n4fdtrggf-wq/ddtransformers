/* ============================================================================
   D&D TRANSFORMERS — Interaction layer
   ============================================================================ */
(() => {
  'use strict';

  const doc = document;
  const body = doc.body;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* -------------------------------------------------------------------------
     Hero ready state
     ------------------------------------------------------------------------- */
  const hero = doc.querySelector('.hero');
  requestAnimationFrame(() => {
    setTimeout(() => hero?.classList.add('is-ready'), 60);
  });

  /* -------------------------------------------------------------------------
     Transformer SVG draw-in
     ------------------------------------------------------------------------- */
  const svgEls = doc.querySelectorAll(
    '.transformer-art line, .transformer-art path, .transformer-art rect, .transformer-art circle'
  );
  svgEls.forEach((el) => {
    let len = 500;
    try {
      if (el.tagName === 'circle') {
        const r = parseFloat(el.getAttribute('r')) || 10;
        len = 2 * Math.PI * r;
      } else if (typeof el.getTotalLength === 'function') {
        len = el.getTotalLength();
      }
    } catch (_) { /* fallback length */ }

    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = reduceMotion ? 0 : len;
  });

  /* -------------------------------------------------------------------------
     Header scroll state
     ------------------------------------------------------------------------- */
  const header = doc.querySelector('#siteHeader');
  const navLinks = Array.from(doc.querySelectorAll('.primary-nav a[data-nav]'));
  const sections = Array.from(doc.querySelectorAll('main section[id]'));

  let ticking = false;
  const updateScrollUI = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);

    let currentId = '';
    const probe = window.scrollY + window.innerHeight * 0.32;
    sections.forEach((section) => {
      if (probe >= section.offsetTop) currentId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  updateScrollUI();

  /* -------------------------------------------------------------------------
     Smooth anchor scrolling
     ------------------------------------------------------------------------- */
  doc.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = doc.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerH = parseFloat(
        getComputedStyle(doc.documentElement).getPropertyValue('--header-h')
      ) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;

      window.scrollTo({
        top,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });

      history.replaceState(null, '', href);
    });
  });

  /* -------------------------------------------------------------------------
     Reveal-on-scroll (with mask support)
     ------------------------------------------------------------------------- */
  const revealTargets = doc.querySelectorAll('.reveal, .reveal-mask');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  }

  /* -------------------------------------------------------------------------
     Panel (menu)
     ------------------------------------------------------------------------- */
  const panel = doc.querySelector('#panel');
  const menuBtn = doc.querySelector('#menu');
  const closeBtn = doc.querySelector('#close');
  const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  let lastFocused = null;

  const openPanel = () => {
    if (!panel) return;
    lastFocused = doc.activeElement;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    body.classList.add('is-locked');
    menuBtn?.setAttribute('aria-expanded', 'true');

    const first = panel.querySelector(FOCUSABLE);
    if (first && !reduceMotion) {
      window.setTimeout(() => first.focus(), 260);
    } else if (first) {
      first.focus();
    }
  };

  const closePanel = () => {
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    body.classList.remove('is-locked');
    menuBtn?.setAttribute('aria-expanded', 'false');

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
    lastFocused = null;
  };

  menuBtn?.addEventListener('click', openPanel);
  closeBtn?.addEventListener('click', closePanel);

  panel?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closePanel());
  });

  doc.addEventListener('keydown', (e) => {
    if (!panel?.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closePanel();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = Array.from(panel.querySelectorAll(FOCUSABLE));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && doc.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && doc.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* Backdrop close on outside click */
  doc.addEventListener('click', (e) => {
    if (!panel?.classList.contains('is-open')) return;
    if (panel.contains(e.target)) return;
    if (menuBtn?.contains(e.target)) return;
    closePanel();
  });

  /* -------------------------------------------------------------------------
     Hero pointer parallax (desktop, hover-capable only)
     ------------------------------------------------------------------------- */
  if (!reduceMotion && canHover && hero) {
    const grid = hero.querySelector('.hero-grid');
    const art = hero.querySelector('.hero-visual');

    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      if (grid) grid.style.transform = `translate3d(${x * 12}px, ${y * 8}px, 0)`;
      if (art)  art.style.transform  = `translate3d(${x * -10}px, calc(-50% + ${y * -6}px), 0)`;
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      if (grid) grid.style.transform = 'translate3d(0,0,0)';
      if (art)  art.style.transform  = 'translate3d(0,-50%,0)';
    }, { passive: true });
  }

  /* -------------------------------------------------------------------------
     Product images: fade-in once decoded
     ------------------------------------------------------------------------- */
  doc.querySelectorAll('.solution-media-frame img').forEach((img) => {
    const markLoaded = () => img.classList.add('is-loaded');
    const markMissing = () => {
      img.style.opacity = '0';
      img.parentElement?.setAttribute('data-missing', 'true');
    };

    if (img.complete) {
      img.naturalWidth > 0 ? markLoaded() : markMissing();
    } else {
      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', markMissing, { once: true });
    }
  });

  /* -------------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------------- */
  const yearEl = doc.querySelector('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();