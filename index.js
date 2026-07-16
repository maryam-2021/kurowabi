// Mobile Menu Toggle
function toggleMenu() {
  const mmenu = document.getElementById('mm');
  if (mmenu) {
    mmenu.classList.toggle('open');
  }
}

// Ensure function is exposed globally
window.toggleMenu = toggleMenu;

document.addEventListener('DOMContentLoaded', () => {
  
  // ── NAV BACKGROUND ON SCROLL ──
  const nav = document.getElementById('nav');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('sc');
    } else {
      nav.classList.remove('sc');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initial state

  // ── SCROLL PROGRESS BAR ──
  const pgbar = document.getElementById('pgbar');
  const handleProgressBar = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrolled = (window.scrollY / totalHeight) * 100;
      pgbar.style.width = `${scrolled}%`;
    }
  };
  window.addEventListener('scroll', handleProgressBar);

  // ── SCROLL REVEAL ANIMATIONS ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealCheck = () => {
    const triggerBottom = window.innerHeight * 0.88;
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('in');
      }
    });
  };
  window.addEventListener('scroll', revealCheck);
  revealCheck(); // Run once initially

  // ── NUMBER COUNTER ANIMATION ──
  const countElements = document.querySelectorAll('.sn[data-target]');
  const countOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        let start = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        
        // Safety check to prevent dividing by zero or infinite speed
        const interval = Math.max(stepTime, 15);
        const increment = target / (duration / interval);

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.textContent = target + (el.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(start) + (el.textContent.includes('+') ? '+' : '');
          }
        }, interval);

        observer.unobserve(el); // Animate only once
      }
    });
  }, countOptions);

  countElements.forEach(el => countObserver.observe(el));

  // ── INTERACTIVE HOTSPOTS (SHOP THE LOOK) ──
  const hotspotsData = [
    {
      cardId: 'lk-card-1', // Lounge Lookbook Card (reused feat_main / lk_2)
      top: '62%',
      left: '42%',
      title: 'Kuro Lounge Chair',
      price: '$1,280',
      link: '#guide'
    },
    {
      cardId: 'lk-card-1',
      top: '52%',
      left: '78%',
      title: 'Shou Sugi Ban Sideboard',
      price: '$2,450',
      link: '#guide'
    },
    {
      cardId: 'lk-card-3', // Kitchen/Dining Lookbook Card
      top: '45%',
      left: '52%',
      title: 'Raw Clay Matcha Bowl',
      price: '$120',
      link: '#guide'
    },
    {
      cardId: 'lk-card-4', // Sanctuary Bath Lookbook Card
      top: '38%',
      left: '32%',
      title: 'Backlit Stone Sconce',
      price: '$340',
      link: '#guide'
    }
  ];

  hotspotsData.forEach((data, index) => {
    const parentCard = document.getElementById(data.cardId);
    if (parentCard) {
      // Create wrapper if not already existing
      let wrapper = parentCard.querySelector('.lc-wrapper');
      if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'lc-wrapper';
        
        // Move image inside wrapper
        const img = parentCard.querySelector('img');
        if (img) {
          parentCard.replaceChild(wrapper, img);
          wrapper.appendChild(img);
          
          // Move overlay label inside wrapper too
          const label = parentCard.querySelector('.llabel');
          if (label) {
            wrapper.appendChild(label);
          }
        }
      }

      // Create hotspot
      const pin = document.createElement('div');
      pin.className = 'hotspot';
      pin.style.top = data.top;
      pin.style.left = data.left;
      pin.setAttribute('data-index', index);

      // Create card
      const card = document.createElement('div');
      card.className = 'hotspot-card';
      card.innerHTML = `
        <h4 class="hc-title">${data.title}</h4>
        <div class="hc-price">${data.price}</div>
        <a href="${data.link}" class="hc-btn">Shop Item</a>
      `;

      wrapper.appendChild(pin);
      wrapper.appendChild(card);

      // Event handlers for mouse hover
      pin.addEventListener('mouseenter', () => {
        card.classList.add('active');
      });

      wrapper.addEventListener('mouseleave', () => {
        card.classList.remove('active');
      });
    }
  });

});
