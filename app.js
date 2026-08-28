/**
 * Ishan Pure Veg Restaurant - Client JavaScript
 * Modern, fast, and accessible interaction logic with smooth animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initMenuFiltersAndSearch();
  initScrollAnimations();
  initOrderModal();
  initGalleryLightbox();
  initSmoothScroll();
  initNumberCounters();
  initPlayfulButtonRipples();
  initHeroGlowFollower();
});

/* ==========================================================================
   1. Sticky Header with Smooth Transition
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const closeDrawerBtn = document.getElementById('mobile-nav-close');

  if (!toggleBtn || !mobileDrawer || !overlay) return;

  function toggleMenu() {
    const isOpen = mobileDrawer.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    mobileDrawer.classList.add('active');
    overlay.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileDrawer.classList.remove('active');
    overlay.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
    document.body.style.overflow = '';
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeMenu);
  }

  toggleBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/* ==========================================================================
   3. Menu Categorization with Smooth Fade Out/In Transitions
   ========================================================================== */
function initMenuFiltersAndSearch() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');
  const searchInput = document.getElementById('menu-search');
  const emptyState = document.getElementById('menu-empty-state');

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilter(isCategorySwitch = false) {
    if (isCategorySwitch) {
      // 1. Subtle smooth fade out
      menuCards.forEach(card => {
        if (card.style.display !== 'none') {
          card.classList.add('menu-item-hiding');
        }
      });

      // 2. Filter & smooth staggered fade in
      setTimeout(() => {
        let visibleCount = 0;

        menuCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category') || '';
          const cardTitle = card.querySelector('.menu-card-title')?.textContent.toLowerCase() || '';
          const cardDesc = card.querySelector('.menu-card-desc')?.textContent.toLowerCase() || '';
          const cardTags = card.getAttribute('data-tags')?.toLowerCase() || '';

          const matchesCategory = activeCategory === 'all' || 
                                  cardCategory.includes(activeCategory) ||
                                  (activeCategory === 'must-try' && card.hasAttribute('data-must-try'));

          const matchesSearch = searchTerm === '' || 
                                cardTitle.includes(searchTerm) || 
                                cardDesc.includes(searchTerm) || 
                                cardTags.includes(searchTerm);

          card.classList.remove('menu-item-hiding', 'menu-item-showing');

          if (matchesCategory && matchesSearch) {
            card.style.display = 'flex';
            card.style.animationDelay = `${Math.min(visibleCount * 0.04, 0.2)}s`;
            card.classList.add('menu-item-showing');
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (emptyState) {
          emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      }, 140);
    } else {
      // Live search filtering
      let visibleCount = 0;

      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const cardTitle = card.querySelector('.menu-card-title')?.textContent.toLowerCase() || '';
        const cardDesc = card.querySelector('.menu-card-desc')?.textContent.toLowerCase() || '';
        const cardTags = card.getAttribute('data-tags')?.toLowerCase() || '';

        const matchesCategory = activeCategory === 'all' || 
                                cardCategory.includes(activeCategory) ||
                                (activeCategory === 'must-try' && card.hasAttribute('data-must-try'));

        const matchesSearch = searchTerm === '' || 
                              cardTitle.includes(searchTerm) || 
                              cardDesc.includes(searchTerm) || 
                              cardTags.includes(searchTerm);

        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          card.classList.remove('menu-item-hiding');
          card.classList.add('menu-item-showing');
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      applyFilter(true);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      applyFilter(false);
    });
  }
}

/* ==========================================================================
   4. Scroll Animations (Intersection Observer API)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-up');
  
  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Order Online Modal
   ========================================================================== */
function initOrderModal() {
  const openButtons = document.querySelectorAll('[data-open-order-modal]');
  const modal = document.getElementById('order-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Gallery Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightboxModal || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const title = item.querySelector('h4')?.textContent || 'Ishan Pure Veg';
      const subtitle = item.querySelector('span')?.textContent || '';
      
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Gallery photo';
        if (lightboxCaption) {
          lightboxCaption.textContent = `${title} • ${subtitle}`;
        }
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}

/* ==========================================================================
   7. Smooth Active ScrollSpy
   ========================================================================== */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   8. Number Counter Animation (Scroll Triggered)
   ========================================================================== */
function initNumberCounters() {
  const counterElements = document.querySelectorAll('.counter-num');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  counterElements.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target')) || 0;
    const decimals = parseInt(el.getAttribute('data-decimals'), 10) || 0;
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease Out Quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = target * eased;

      let formattedNumber = '';
      if (decimals > 0) {
        formattedNumber = current.toFixed(decimals);
      } else {
        formattedNumber = Math.floor(current).toLocaleString();
      }

      el.textContent = `${prefix}${formattedNumber}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        let finalFormatted = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
        el.textContent = `${prefix}${finalFormatted}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   9. Playful Button Food Emoji Burst / Confetti
   ========================================================================== */
function initPlayfulButtonRipples() {
  const emojis = ['✨', '🍛', '🌿', '🫓', '🥘', '🍲', '🌶️', '🎉', '⭐'];
  const buttons = document.querySelectorAll('.btn-accent, .btn-primary, [data-open-order-modal]');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX || (rect.left + rect.width / 2);
      const y = e.clientY || (rect.top + rect.height / 2);

      // Launch 2-3 playful food confetti particles with random slight offsets
      const count = 2;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          const particle = document.createElement('span');
          particle.className = 'food-ripple-particle';
          particle.textContent = emoji;
          const offsetX = (Math.random() - 0.5) * 36;
          const offsetY = (Math.random() - 0.5) * 16;
          particle.style.left = `${x + offsetX}px`;
          particle.style.top = `${y + offsetY}px`;

          document.body.appendChild(particle);

          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 650);
        }, i * 70);
      }
    });
  });
}

/* ==========================================================================
   10. Subtle Hero Cursor Glow Follower
   ========================================================================== */
function initHeroGlowFollower() {
  const hero = document.getElementById('hero');
  const glow = document.getElementById('hero-glow-follower');
  if (!hero || !glow) return;

  // Only enable on desktop pointer devices
  if (window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.setProperty('--mouse-x', `${x}%`);
      glow.style.setProperty('--mouse-y', `${y}%`);
    });
  }
}
