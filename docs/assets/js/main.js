(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('#site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const year = document.querySelector('#year');
  const scrollCat = document.querySelector('.scroll-cat');

  const storedTheme = localStorage.getItem('ziuf-theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (systemDark ? 'dark' : 'light');

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('ziuf-theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☼' : '☾';
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#111210' : '#f4f2ec');
  };

  setTheme(initialTheme);

  themeToggle?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  const closeNav = () => {
    nav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open navigation');
  };

  navToggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(Boolean(open)));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  let lastScrollY = window.scrollY;
  let catIdleTimer;

  const updateOnScroll = () => {
    const currentY = window.scrollY;
    header?.classList.toggle('scrolled', currentY > 18);

    if (scrollCat && Math.abs(currentY - lastScrollY) > 1) {
      scrollCat.dataset.direction = currentY > lastScrollY ? 'down' : 'up';
      scrollCat.classList.add('is-moving');
      window.clearTimeout(catIdleTimer);
      catIdleTimer = window.setTimeout(() => scrollCat.classList.remove('is-moving'), 170);
    }

    lastScrollY = currentY;
  };

  updateOnScroll();
  window.addEventListener('scroll', updateOnScroll, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  if (year) year.textContent = String(new Date().getFullYear());
})();
