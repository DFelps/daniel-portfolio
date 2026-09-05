const root = document.documentElement;
const langButton = document.querySelector('#lang-toggle');
const themeButton = document.querySelector('#theme-toggle');
const menuButton = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const year = document.querySelector('#year');

function updateProjectImages(lang) {
  document.querySelectorAll('img[data-src-pt][data-src-en]').forEach((image) => {
    image.src = lang === 'en'
      ? image.dataset.srcEn
      : image.dataset.srcPt;

    if (image.dataset.altPt && image.dataset.altEn) {
      image.alt = lang === 'en'
        ? image.dataset.altEn
        : image.dataset.altPt;
    }
  });
}

function updateResumeLinks(lang) {
  document.querySelectorAll('.resume-link').forEach((link) => {
    const href = lang === 'en'
      ? link.dataset.hrefEn
      : link.dataset.hrefPt;

    const filename = lang === 'en'
      ? link.dataset.downloadEn
      : link.dataset.downloadPt;

    link.href = href;
    link.download = filename;
  });
}

function setLanguage(lang) {
  const selectedLang = lang === 'en' ? 'en' : 'pt';

  root.dataset.lang = selectedLang;
  root.lang = selectedLang === 'en' ? 'en' : 'pt-BR';

  document.querySelectorAll('[data-pt][data-en]').forEach((element) => {
    element.textContent = element.dataset[selectedLang];
  });

  updateProjectImages(selectedLang);
  updateResumeLinks(selectedLang);

  langButton.textContent = selectedLang === 'pt' ? 'EN' : 'PT';

  localStorage.setItem('portfolio-language', selectedLang);
}

function setTheme(theme) {
  root.dataset.theme = theme;

  localStorage.setItem('portfolio-theme', theme);
}

const savedLanguage = localStorage.getItem('portfolio-language') || 'pt';

setLanguage(savedLanguage);

const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.dataset.theme = 'dark';
}

langButton.addEventListener('click', () => {
  const nextLanguage = root.dataset.lang === 'pt'
    ? 'en'
    : 'pt';

  setLanguage(nextLanguage);
});

themeButton.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark'
    ? 'light'
    : 'dark';

  setTheme(nextTheme);
});

menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');

  menuButton.setAttribute('aria-expanded', String(isOpen));

  menuButton.textContent = isOpen
    ? root.dataset.lang === 'en'
      ? 'Close'
      : 'Fechar'
    : 'Menu';
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
  });
});

year.textContent = new Date().getFullYear();