// Mobile Menu Toggle
function toggleMenu() {
  const mmenu = document.getElementById('mm');
  if (mmenu) {
    mmenu.classList.toggle('open');
  }
}

// Expose globally for inline onclick triggers
window.toggleMenu = toggleMenu;

document.addEventListener('DOMContentLoaded', () => {

  // Bind hamburger click handler
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  // ── READING PROGRESS BAR ──
  const progressBar = document.getElementById('progress-bar');
  const handleScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrolled = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    }
  };
  window.addEventListener('scroll', handleScrollProgress);

  // ── FAQ ACCORDION COLLAPSE ──
  const faqQuestions = document.querySelectorAll('.faq-q');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (item) {
        item.classList.toggle('open');
      }
    });
  });

  // ── SCROLL REVEAL ANIMATIONS ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealCheck = () => {
    const triggerBottom = window.innerHeight * 0.88;
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealCheck);
  revealCheck(); // Run once initially

  // ── SIDEBAR TABLE OF CONTENTS ACTIVE LINK HIGHLIGHT ──
  const tocLinks = document.querySelectorAll('.sidebar-toc-list a');
  const sections = [];
  
  // Cache section offsets and references
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      const sec = document.querySelector(href);
      if (sec) {
        sections.push({ link, sec });
      }
    }
  });

  const handleTOCActiveState = () => {
    const scrollPos = window.scrollY + 120; // offset for nav bar
    let currentActive = null;

    for (let i = 0; i < sections.length; i++) {
      const { sec } = sections[i];
      const offsetTop = sec.offsetTop;
      
      if (scrollPos >= offsetTop) {
        currentActive = sections[i];
      }
    }

    sections.forEach(({ link }) => {
      if (currentActive && link === currentActive.link) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleTOCActiveState);
  handleTOCActiveState(); // Run once initially

});
