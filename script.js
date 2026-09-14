(() => {
  const body = document.body;
  const header = document.querySelector('header');
  const panel = document.querySelector('#panel');
  const menu = document.querySelector('#menu');
  const close = document.querySelector('#close');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setPanel = (open) => {
    panel?.classList.toggle('open', open);
    body.classList.toggle('modal-open', open);
    menu?.setAttribute('aria-expanded', String(open));
  };

  menu?.addEventListener('click', () => setPanel(true));
  close?.addEventListener('click', () => setPanel(false));
  panel?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setPanel(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setPanel(false); });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });

  const revealEls = document.querySelectorAll('.reveal, .intro-grid > *, .section-heading > *, .network-intro > *, .about-grid > *, .network-strip > div');
  if (reduceMotion) revealEls.forEach(el => el.classList.add('visible'));
  else {
    revealEls.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`; });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const updateNav = () => {
    header?.classList.toggle('scrolled', window.scrollY > 30);
    let current = 'top';
    sections.forEach(section => { if (window.scrollY + window.innerHeight * 0.28 >= section.offsetTop) current = section.id; });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  if (!reduceMotion) {
    const hero = document.querySelector('.organic-hero');
    hero?.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      hero.querySelector('.hero-grid')?.style.setProperty('transform', `translate(${x * 8}px, ${y * 5}px)`);
      hero.querySelector('.orbit-a')?.style.setProperty('transform', `translate(${x * -14}px, ${y * -10}px)`);
      hero.querySelector('.orbit-b')?.style.setProperty('transform', `translate(${x * 18}px, ${y * 12}px)`);
    }, { passive: true });
    hero?.addEventListener('pointerleave', () => {
      hero.querySelector('.hero-grid')?.style.setProperty('transform', 'translate(0,0)');
      hero.querySelector('.orbit-a')?.style.setProperty('transform', 'translate(0,0)');
      hero.querySelector('.orbit-b')?.style.setProperty('transform', 'translate(0,0)');
    }, { passive: true });
  }

  document.querySelectorAll('.product-image img').forEach(img => {
    img.addEventListener('error', () => img.parentElement.classList.add('missing'));
    img.addEventListener('load', () => img.parentElement.classList.add('loaded'));
  });
})();
