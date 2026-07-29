(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  const closeNav = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeNav();
  });

  document.querySelectorAll('[data-accordion] .faq-item').forEach((item) => {
    const button = item.querySelector('button');
    const initiallyOpen = button?.getAttribute('aria-expanded') === 'true';
    item.classList.toggle('open', initiallyOpen);

    button?.addEventListener('click', () => {
      const accordion = item.closest('[data-accordion]');
      const shouldOpen = button.getAttribute('aria-expanded') !== 'true';

      accordion?.querySelectorAll('.faq-item').forEach((otherItem) => {
        otherItem.classList.remove('open');
        otherItem.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });

      if (shouldOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const form = document.getElementById('lead-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const getValue = (id) => document.getElementById(id)?.value.trim() || '-';
    const message = [
      'Hi Nadipack Global, saya nak buat semakan awal untuk servis bookkeeping.',
      '',
      `Nama: ${getValue('name')}`,
      `Jenis bisnes: ${getValue('business')}`,
      `Tempoh berniaga: ${getValue('duration')}`,
      `Keadaan rekod: ${getValue('records')}`,
      `Catatan: ${getValue('notes')}`,
      '',
      'Boleh bantu cadangkan servis yang sesuai?'
    ].join('\n');

    const whatsappUrl = `https://wa.me/60125165371?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }
})();
