(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('#site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const year = document.querySelector('#year');

  const storedTheme = localStorage.getItem('ziuf-theme');
  const systemLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = storedTheme || (systemLight ? 'light' : 'dark');

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('ziuf-theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☼' : '☾';
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0b1010' : '#f2f0e8');
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

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  if (year) year.textContent = String(new Date().getFullYear());
})();
