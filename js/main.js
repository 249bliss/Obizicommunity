/* =============================================
   EKENOBIZI AUTONOMOUS COMMUNITY — MAIN JS
   ============================================= */

'use strict';

/* ─── Page Loader ─── */
(function initLoader() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-logo">E</div>
    <div class="loader-bar"><div class="loader-fill"></div></div>
  `;
  document.body.prepend(loader);
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1800);
    setTimeout(() => loader.remove(), 2500);
  });
})();

/* ─── Register GSAP ScrollTrigger ─── */
gsap.registerPlugin(ScrollTrigger);

/* ─── Navbar scroll effect ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── Mobile hamburger menu & Drawer ─── */
const hamburger   = document.getElementById('hamburger');
const drawer      = document.getElementById('mobileDrawer');
const drawerClose = document.getElementById('drawerClose');

// Create overlay if not present
let navOverlay = document.querySelector('.nav-overlay');
if (!navOverlay) {
  navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);
}

const toggleMenu = (forceClose = false) => {
  const isOpen = forceClose ? false : !drawer.classList.contains('open');
  
  drawer.classList.toggle('open', isOpen);
  navOverlay.classList.toggle('active', isOpen);
  
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  
  document.body.style.overflow = isOpen ? 'hidden' : '';
};

hamburger.addEventListener('click', () => toggleMenu());
if (drawerClose) drawerClose.addEventListener('click', () => toggleMenu(true));
navOverlay.addEventListener('click', () => toggleMenu(true));

// Setup drawer links staggered animations items
drawer.querySelectorAll('.drawer-links a').forEach((a, i) => {
  a.style.setProperty('--item-index', i + 1);
  a.addEventListener('click', () => toggleMenu(true));
});

/* ─── Hero Entrance Animations ─── */
function runHeroAnimations() {
  const tl = gsap.timeline({ delay: 1.9 });
  tl.to('[data-hero-anim="badge"]',   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to('[data-hero-anim="title"]',   { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.25')
    .to('[data-hero-anim="tagline"]', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.45')
    .to('[data-hero-anim="subtitle"]',{ opacity: 1, y: 0, duration: 0.7,  ease: 'power3.out' }, '-=0.35')
    .to('[data-hero-anim="actions"]', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.3');
}
runHeroAnimations();



/* ─── Animated Stat Counters ─── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Stats counters removed — hero is now clean and uncluttered

/* ─── Scroll Reveal — Intersection Observer ─── */
function setupScrollReveals() {
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-card, .reveal-item'
  );

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0;
        setTimeout(() => el.classList.add('revealed'), delay * 1000);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => obs.observe(el));
}
setupScrollReveals();

/* ─── GSAP ScrollTrigger Advanced Animations ─── */

// Vision section parallax image
gsap.to('.vision-img', {
  yPercent: -12,
  ease: 'none',
  scrollTrigger: {
    trigger: '.vision-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5,
  }
});

// Vision section text stagger
gsap.from('.vision-content .section-tag', {
  opacity: 0, y: 30, duration: 0.8,
  scrollTrigger: { trigger: '.vision-content', start: 'top 80%' }
});

// Featured guardian card reveal
gsap.from('.featured-guardian', {
  opacity: 0, y: 60, scale: 0.97,
  duration: 1.1, ease: 'power3.out',
  scrollTrigger: { trigger: '.featured-guardian', start: 'top 80%' }
});

// Spirit grid images — staggered parallax
gsap.utils.toArray('.spirit-card').forEach((card, i) => {
  gsap.from(card, {
    opacity: 0, y: 50 + i * 15, scale: 0.96,
    duration: 0.9, ease: 'power3.out',
    delay: i * 0.12,
    scrollTrigger: { trigger: '.spirit-grid', start: 'top 80%' }
  });
});

// CTA section: big text split entrance
gsap.from('.cta-title', {
  opacity: 0, y: 50, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.cta-section', start: 'top 75%' }
});
gsap.from('.cta-subtitle', {
  opacity: 0, y: 30, duration: 0.9, delay: 0.2, ease: 'power3.out',
  scrollTrigger: { trigger: '.cta-section', start: 'top 75%' }
});
gsap.from('.cta-buttons', {
  opacity: 0, y: 25, duration: 0.8, delay: 0.4, ease: 'power3.out',
  scrollTrigger: { trigger: '.cta-section', start: 'top 75%' }
});

// People cards stagger via GSAP
gsap.from('.people-card', {
  opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: 'power2.out',
  scrollTrigger: { trigger: '.people-icons-grid', start: 'top 80%' }
});

// Youth section image parallax
gsap.to('.yi-main', {
  yPercent: -8,
  ease: 'none',
  scrollTrigger: {
    trigger: '.youth-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 2,
  }
});

// Footer fade in
gsap.from('.footer-grid', {
  opacity: 0, y: 40, duration: 1, ease: 'power2.out',
  scrollTrigger: { trigger: '.footer', start: 'top 85%' }
});

/* ─── Active nav link on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  const scrollY = window.scrollY;
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--gold-light)' : '';
      });
    }
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });

/* ─── Smooth scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Hero video fallback: if video fails, use gradient animation ─── */
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  heroVideo.addEventListener('error', () => {
    const wrapper = document.querySelector('.hero-video-wrapper');
    if (wrapper) {
      wrapper.style.background = `
        linear-gradient(135deg,
          #2d0b4d 0%,
          #1a062d 30%,
          #3d1466 60%,
          #9a6e0e 100%
        )
      `;
      wrapper.style.animation = 'heroBgShift 12s ease-in-out infinite alternate';
      heroVideo.style.display = 'none';
    }
  });
  // Also handle case where video can't play
  heroVideo.play().catch(() => {
    heroVideo.style.display = 'none';
    const overlay = document.querySelector('.hero-overlay');
    if (overlay) {
      overlay.style.background = 'linear-gradient(135deg, rgba(13,59,30,0.97) 0%, rgba(13,27,42,0.97) 100%)';
    }
  });
}

/* ─── Inject keyframe for video fallback ─── */
const style = document.createElement('style');
style.textContent = `
  @keyframes heroBgShift {
    0%   { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`;
document.head.appendChild(style);

/* ─── Guardian card 3D tilt effect ─── */
document.querySelectorAll('.guardian-card, .people-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── Spirit image parallax on mouse move ─── */
const spiritSection = document.querySelector('.spirit-section');
if (spiritSection) {
  spiritSection.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = spiritSection.getBoundingClientRect();
    const xRatio = ((e.clientX - left) / width  - 0.5) * 2;
    const yRatio = ((e.clientY - top)  / height - 0.5) * 2;
    document.querySelectorAll('.spirit-img').forEach((img, i) => {
      const depth = (i % 2 === 0) ? 8 : 12;
      img.style.transform = `scale(1.06) translate(${xRatio * depth * -0.5}px, ${yRatio * depth * -0.5}px)`;
    });
  });
  spiritSection.addEventListener('mouseleave', () => {
    document.querySelectorAll('.spirit-img').forEach(img => { img.style.transform = ''; });
  });
}

/* ─── Gallery Lightbox Logic ─── */
const galleryModal = document.getElementById('galleryModal');
const modalContent = document.getElementById('modalContent');
const modalBack    = document.getElementById('modalBack');
const modalPrev    = document.getElementById('modalPrev');
const modalNext    = document.getElementById('modalNext');
const modalDownload = document.getElementById('modalDownload');
const modalCaption = document.getElementById('modalCaption');
const modalType    = document.getElementById('modalType');
const modalPlayOverlay = document.getElementById('modalPlayOverlay');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

let currentGalleryIndex = 0;

// Robust download function to force "Save As" behavior
async function forceDownload(url, type) {
  const extension = type === 'Video' ? 'mp4' : 'jpg';
  const filename = `Ekenobizi-Community-${type}.${extension}`;
  
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback if fetch fails
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }
}

function openGalleryModal(index) {
  currentGalleryIndex = index;
  const item = galleryItems[index];
  const video = item.querySelector('video');
  const img = item.querySelector('img');
  const caption = item.querySelector('.gallery-type').textContent;
  
  modalContent.innerHTML = '';
  modalPlayOverlay.classList.add('hidden');
  
  if (video) {
    const videoSrc = video.querySelector('source').getAttribute('src');
    const modalVideo = document.createElement('video');
    modalVideo.src = videoSrc;
    const poster = video.getAttribute('poster');
    if (poster) modalVideo.poster = poster;
    modalVideo.controls = true;
    modalVideo.autoplay = true;
    modalVideo.loop = true;
    modalVideo.playsInline = true;
    modalVideo.preload = 'auto';
    
    // Play/Pause sync with custom overlay
    modalVideo.addEventListener('play',  () => modalPlayOverlay.classList.add('hidden'));
    modalVideo.addEventListener('pause', () => modalPlayOverlay.classList.remove('hidden'));
    
    modalContent.appendChild(modalVideo);
    modalType.textContent = 'Video';
    modalDownload.dataset.url = videoSrc;
    modalDownload.dataset.type = 'Video';
    modalPlayOverlay.style.display = 'flex';
  } else if (img) {
    const imgSrc = img.getAttribute('src');
    const modalImg = document.createElement('img');
    modalImg.src = imgSrc;
    modalContent.appendChild(modalImg);
    modalType.textContent = 'Image';
    modalDownload.dataset.url = imgSrc;
    modalDownload.dataset.type = 'Image';
    modalPlayOverlay.style.display = 'none';
  }
  
  modalCaption.textContent = caption;
  galleryModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
  galleryModal.classList.remove('active');
  document.body.style.overflow = '';
  const activeVideo = modalContent.querySelector('video');
  if (activeVideo) {
    activeVideo.pause();
    activeVideo.src = '';
    activeVideo.load();
    activeVideo.remove();
  }
}

function togglePlayPause() {
  const video = modalContent.querySelector('video');
  if (video) {
    if (video.paused) video.play();
    else video.pause();
  }
}

function navigateGallery(step) {
  let newIndex = currentGalleryIndex + step;
  if (newIndex < 0) newIndex = galleryItems.length - 1;
  if (newIndex >= galleryItems.length) newIndex = 0;
  openGalleryModal(newIndex);
}

galleryItems.forEach((item, index) => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => openGalleryModal(index));
});

if (modalBack) modalBack.addEventListener('click', closeGalleryModal);
if (modalPlayOverlay) modalPlayOverlay.addEventListener('click', togglePlayPause);

// Download button click handler
if (modalDownload) {
  modalDownload.addEventListener('click', (e) => {
    e.preventDefault();
    const url = modalDownload.dataset.url;
    const type = modalDownload.dataset.type;
    forceDownload(url, type);
  });
}

const modalOverlay = galleryModal ? galleryModal.querySelector('.modal-overlay') : null;
if (modalOverlay) modalOverlay.addEventListener('click', closeGalleryModal);

if (modalPrev) modalPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateGallery(-1); });
if (modalNext) modalNext.addEventListener('click', (e) => { e.stopPropagation(); navigateGallery(1); });

window.addEventListener('keydown', (e) => {
  if (!galleryModal || !galleryModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeGalleryModal();
  if (e.key === 'ArrowLeft') navigateGallery(-1);
  if (e.key === 'ArrowRight') navigateGallery(1);
  if (e.key === ' ') { e.preventDefault(); togglePlayPause(); }
});

/* ─── Resize ScrollTrigger on window resize ─── */
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
}, { passive: true });

console.log('%cEkenobizi Autonomous Community', 'color:#c9921a;font-size:16px;font-weight:bold;');
console.log('%cWebsite Loaded Successfully ✓', 'color:#4a7c59;font-size:12px;');
