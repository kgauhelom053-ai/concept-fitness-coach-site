(() => {
  const nav = document.getElementById('nav');
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('mobileMenu');
  const progress = document.querySelector('.progress');

  const onScroll = () => {
    const y = window.scrollY || 0;
    nav.classList.toggle('scrolled', y > 40);
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger?.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
