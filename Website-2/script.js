const storageKey = 'ezoneLanguage';

/* =========================================================
   LANGUAGE SWITCHING
   ========================================================= */

function getCurrentLanguage() {
  const saved = localStorage.getItem(storageKey);

  if (saved === 'zh' || saved === 'en') {
    return saved;
  }

  const path = window.location.pathname.toLowerCase();

  if (path.includes('/zh/')) {
    return 'zh';
  }

  if (path.includes('/en/')) {
    return 'en';
  }

  return 'en';
}

function getLanguageTargetPath(targetLanguage) {
  const currentPath = window.location.pathname || '/';
  const withoutIndex = currentPath.replace(/\/index\.html$/i, '').replace(/\.html$/i, '').replace(/\/+/g, '/');
  const normalized = withoutIndex === '' ? '/' : withoutIndex.replace(/\/+$/, '') || '/';

  const segments = normalized.split('/').filter(Boolean);
  const langIndex = segments.findIndex((segment) => segment.toLowerCase() === 'en' || segment.toLowerCase() === 'zh');

  let remainingSegments = segments;
  if (langIndex !== -1) {
    remainingSegments = segments.filter((_, index) => index !== langIndex);
  }

  const validPages = new Set(['about', 'programs', 'practice', 'contact']);
  const lastSegment = remainingSegments[remainingSegments.length - 1] || '';

  if (remainingSegments.length === 0) {
    return `/${targetLanguage}/`;
  }

  if (validPages.has(lastSegment.toLowerCase())) {
    return `/${targetLanguage}/${lastSegment}/`;
  }

  const currentPage = lastSegment.toLowerCase();
  if (currentPage === 'index' || currentPage === '') {
    return `/${targetLanguage}/`;
  }

  if (remainingSegments.length > 1) {
    const subPath = remainingSegments.slice(0, -1).join('/');
    return `/${targetLanguage}/${subPath}/${lastSegment}/`;
  }

  return `/${targetLanguage}/${lastSegment}/`;
}

function switchLanguage(targetLanguage) {
  const url = new URL(window.location.href);
  url.pathname = getLanguageTargetPath(targetLanguage);

  localStorage.setItem(storageKey, targetLanguage);
  window.location.href = url.href;
}

function setupLanguage() {
  const currentLanguage = getCurrentLanguage();
  localStorage.setItem(storageKey, currentLanguage);

  document.documentElement.lang =
    currentLanguage === 'zh' ? 'zh-Hant' : 'en';

  const options = document.querySelectorAll('.lang-option');

  options.forEach((option) => {
    option.classList.toggle(
      'is-active',
      option.dataset.lang === currentLanguage
    );
  });

  const toggle = document.getElementById('languageToggle');

  if (toggle) {
    toggle.setAttribute(
      'aria-label',
      currentLanguage === 'zh' ? 'Switch to English' : 'Switch to Chinese'
    );

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const nextLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
      switchLanguage(nextLanguage);
    });
  }
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

  const menuToggle =
    document.getElementById(
      'menuToggle'
    );

  const navMenu =
    document.getElementById(
      'navMenu'
    );


  if (
    !menuToggle ||
    !navMenu
  ) {
    return;
  }


  menuToggle.addEventListener(
    'click',
    () => {

      const isOpen =
        !menuToggle.classList.contains(
          'active'
        );


      menuToggle.classList.toggle(
        'active',
        isOpen
      );


      navMenu.classList.toggle(
        'active',
        isOpen
      );


      menuToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

    }
  );


  navMenu
    .querySelectorAll('a')
    .forEach(
      (link) => {

        link.addEventListener(
          'click',
          () => {

            navMenu.classList.remove(
              'active'
            );

            menuToggle.classList.remove(
              'active'
            );

            menuToggle.setAttribute(
              'aria-expanded',
              'false'
            );

          }
        );

      }
    );

}


/* =========================================================
   FOOTER YEAR
   ========================================================= */

function setupYear() {

  const year =
    document.getElementById(
      'year'
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

}


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

function setupRevealAnimations() {

  const elements =
    document.querySelectorAll(
      '.reveal'
    );


  if (!elements.length) {
    return;
  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                'is-visible'
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.14
      }
    );


  elements.forEach(
    (element) => {

      observer.observe(
        element
      );

    }
  );

}


/* =========================================================
   HERO VISUAL
   ========================================================= */

function setupHeroVisual() {

  const heroVisual =
    document.querySelector(
      '.hero-visual'
    );


  if (!heroVisual) {
    return;
  }


  heroVisual.addEventListener(
    'pointermove',
    (event) => {

      const rect =
        heroVisual.getBoundingClientRect();


      const x =
        (event.clientX -
          rect.left) /
          rect.width -
        0.5;


      const y =
        (event.clientY -
          rect.top) /
          rect.height -
        0.5;


      heroVisual.style.setProperty(
        '--x-shift',
        `${x * 18}px`
      );


      heroVisual.style.setProperty(
        '--y-shift',
        `${y * 18}px`
      );


      heroVisual
        .querySelectorAll(
          '.visual-card'
        )
        .forEach(
          (card) => {

            card.style.transform =
              `translate(${x * 12}px, ${y * 12}px)`;

          }
        );

    }
  );


  heroVisual.addEventListener(
    'pointerleave',
    () => {

      heroVisual
        .querySelectorAll(
          '.visual-card'
        )
        .forEach(
          (card) => {

            card.style.transform =
              'translate(0, 0)';

          }
        );

    }
  );

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function setupContactForm() {

  const form =
    document.querySelector(
      '.contact-form'
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    'submit',
    (event) => {

      event.preventDefault();

      const formData = new FormData(form);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const inquiryType = (formData.get('inquiryType') || 'General Question').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      const subject = encodeURIComponent(`EZone Website Inquiry - ${inquiryType}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:info.ezonedu@gmail.com?subject=${subject}&body=${body}`;
    }
  );

}


/* =========================================================
   RECOMMENDATIONS
   ========================================================= */

async function renderRecommendations() {

  const grid =
    document.getElementById(
      'recommendationGrid'
    );


  if (!grid) {
    return;
  }


  const path =
    window.location.pathname;


  const basePath =
    path.includes('/en/') ||
    path.includes('/zh/')
      ? '../../'
      : './';


  try {

    const response =
      await fetch(
        `${basePath}recommendations.json`
      );


    if (!response.ok) {

      throw new Error(
        'Recommendations unavailable'
      );

    }


    const data =
      await response.json();


    const entries =
      Object.values(data).flat();


    grid.innerHTML =
      entries
        .map(
          (item) => `

            <article
              class="recommendation-card reveal"
            >

              <span
                class="recommendation-tag"
              >
                ${item.tag}
              </span>

              <h3>
                ${item.title}
              </h3>

              <p>
                ${item.description}
              </p>

            </article>

          `
        )
        .join('');


    setupRevealAnimations();


  } catch (error) {

    grid.innerHTML = `

      <article
        class="recommendation-card reveal"
      >

        <span
          class="recommendation-tag"
        >
          Career Growth
        </span>

        <h3>
          Professional Training Path
        </h3>

        <p>
          Structured education built to
          strengthen practical ability,
          confidence, and long-term
          professional growth.
        </p>

      </article>

    `;


    setupRevealAnimations();

  }

}


/* =========================================================
   START WEBSITE
   ========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    document.body.classList.add(
      'page-ready'
    );

    setupLanguage();
    setupMobileMenu();
    setupYear();
    setupRevealAnimations();
    setupHeroVisual();
    setupContactForm();
    renderRecommendations();

  }
);
