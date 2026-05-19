/* =============================================
   EKENOBIZI AUTONOMOUS COMMUNITY — GALLERY JS
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
    setTimeout(() => loader.classList.add('hidden'), 1000);
    setTimeout(() => loader.remove(), 1600);
  });
})();

/* ─── Register GSAP ─── */
gsap.registerPlugin(ScrollTrigger);

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

drawer.querySelectorAll('.drawer-links a').forEach((a, i) => {
  a.style.setProperty('--item-index', i + 1);
  a.addEventListener('click', () => toggleMenu(true));
});

/* ─── Scroll Reveal ─── */
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
  }, { threshold: 0.1, rootMargin: '0px' });

  revealEls.forEach(el => obs.observe(el));
}

/* ─── DYNAMIC MEDIA GRID AUTO-GENERATOR ─── */
const galleryData = [
  // ==================== COMMUNITY CATEGORY ====================
  {
    type: 'video',
    category: 'community',
    src: 'assets/content/vid-0017.mp4',
    poster: 'assets/posters/vid-0017-poster.png',
    title: 'Community Council Meeting',
    icon: 'fa-circle-play'
  },
  {
    type: 'video',
    category: 'community',
    src: 'assets/content/lower-video.mp4',
    poster: 'assets/posters/lower-video-poster.png',
    title: 'Community Development Progress',
    icon: 'fa-circle-play'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/content/IMG-20260413-WA0014.jpg',
    title: 'Ekenobizi Community Landmark',
    icon: 'fa-camera'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20251223_125637.jpg',
    title: 'Grand Community Assembly',
    icon: 'fa-users'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20251223_125639.jpg',
    title: 'Assembly Advisory Consultation',
    icon: 'fa-people-group'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20251223_125923.jpg',
    title: 'Town Hall Elders Consultation',
    icon: 'fa-people-group'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20251223_130013.jpg',
    title: 'Youth Welfare Meeting',
    icon: 'fa-users'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20251223_130126.jpg',
    title: 'Traditional Leadership Council',
    icon: 'fa-crown'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20251223_130245.jpg',
    title: 'Elders Council Strategic Session',
    icon: 'fa-gavel'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_110528.jpg',
    title: 'Development Council Assembly',
    icon: 'fa-gavel'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_112249.jpg',
    title: 'Ekenobizi General Meeting',
    icon: 'fa-users'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_114208.jpg',
    title: 'Local Market and Trade Hub',
    icon: 'fa-store'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_114221.jpg',
    title: 'Market Day Discussion',
    icon: 'fa-store'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_114327.jpg',
    title: 'Community Empowerment Dialogue',
    icon: 'fa-handshake'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_114507.jpg',
    title: 'Town Hall Leadership Briefing',
    icon: 'fa-bullhorn'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_114850.jpg',
    title: 'Progress and Welfare Summit',
    icon: 'fa-arrow-up-right-dots'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_114906.jpg',
    title: 'Community Welfare Discussion',
    icon: 'fa-handshake'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_114942.jpg',
    title: 'Unity and Progress Committee',
    icon: 'fa-handshake'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_115016.jpg',
    title: 'Development Planning Session',
    icon: 'fa-compass-drafting'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_115054.jpg',
    title: 'Community Action Committee',
    icon: 'fa-clipboard-list'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_115538.jpg',
    title: 'Ekenobizi Youth Leaders Group',
    icon: 'fa-users'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_115543.jpg',
    title: 'Youth Development Dialogue',
    icon: 'fa-comments'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_115615.jpg',
    title: 'Empowerment Council Session',
    icon: 'fa-users'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_115617.jpg',
    title: 'Empowerment Advisory Session',
    icon: 'fa-user-tie'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_115642.jpg',
    title: 'Youth Progress Forum',
    icon: 'fa-comments'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_115644.jpg',
    title: 'Welfare Action Forum',
    icon: 'fa-clipboard-check'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_115813.jpg',
    title: 'Development Executive Board',
    icon: 'fa-user-tie'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_120351.jpg',
    title: 'Community General Forum',
    icon: 'fa-users-rectangle'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_120452.jpg',
    title: 'Elders Executive Session',
    icon: 'fa-user-shield'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_120806.jpg',
    title: 'Traditional Advisory Council',
    icon: 'fa-crown'
  },
  {
    type: 'image',
    category: 'community',
    src: 'assets/commu/20260307_122737.jpg',
    title: 'Welfare Advisory Assembly',
    icon: 'fa-users-line'
  },

  // ==================== FESTIVAL CATEGORY ====================
  {
    type: 'image',
    category: 'festival',
    src: 'assets/content/IMG-20260413-WA0015.jpg',
    title: 'New Yam Cultural Festival',
    icon: 'fa-mask'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_171408.jpg',
    title: 'Traditional Ruler Procession',
    icon: 'fa-crown'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_171458.jpg',
    title: 'Royal Heritage Escort',
    icon: 'fa-shield-halved'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_171818.jpg',
    title: 'Traditional Dance Group Performance',
    icon: 'fa-music'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_172430.jpg',
    title: 'Royal Heritage Celebration',
    icon: 'fa-crown'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_172441.jpg',
    title: 'Dancers Cultural Costume',
    icon: 'fa-shirt'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_172457.jpg',
    title: 'Festival Coronation Dance',
    icon: 'fa-face-laugh-beam'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_172511.jpg',
    title: 'Ekenobizi Cultural Gala',
    icon: 'fa-masks-theater'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_172513.jpg',
    title: 'Traditional Royal Welcome',
    icon: 'fa-handshake'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_172527.jpg',
    title: 'Royal Cabinet Procession',
    icon: 'fa-crown'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_172817.jpg',
    title: 'Masquerade Grand Display',
    icon: 'fa-mask'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_173206.jpg',
    title: 'Traditional Drumming & Music',
    icon: 'fa-drum'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_173323.jpg',
    title: 'Heritage Celebration Gala',
    icon: 'fa-champagne-glasses'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_173445.jpg',
    title: 'Youth Masquerade Performance',
    icon: 'fa-mask'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_173526.jpg',
    title: 'Ekenobizi Cultural Masquerade',
    icon: 'fa-mask-ventilator'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_173539.jpg',
    title: 'Grand Festival Gathering',
    icon: 'fa-people-group'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_173546.jpg',
    title: 'Traditional Dance Parade',
    icon: 'fa-people-marching'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_174012.jpg',
    title: 'Coronation Public Reception',
    icon: 'fa-chair'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_174242.jpg',
    title: 'Elders Festive Procession',
    icon: 'fa-person-walking'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_174336.jpg',
    title: 'Coronation & Festive Gathering',
    icon: 'fa-chair'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_174906.jpg',
    title: 'Masquerade Procession',
    icon: 'fa-mask'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_174913.jpg',
    title: 'Traditional Parade Drums',
    icon: 'fa-drum'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_175320.jpg',
    title: 'Elders Festive Dialogue',
    icon: 'fa-comments'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_175331.jpg',
    title: 'Royal Assembly Coronation',
    icon: 'fa-crown'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_175527.jpg',
    title: 'Traditional Coronation Ceremony',
    icon: 'fa-crown'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_175901.jpg',
    title: 'Masquerade Festival Display',
    icon: 'fa-mask'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_175923.jpg',
    title: 'Traditional Masquerade Dance',
    icon: 'fa-music'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_182030.jpg',
    title: 'Community Heritage Celebration',
    icon: 'fa-champagne-glasses'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_182417.jpg',
    title: 'Community Traditional Parade',
    icon: 'fa-people-marching'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_182710.jpg',
    title: 'Traditional Warriors Dance',
    icon: 'fa-shield-halved'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_183214.jpg',
    title: 'Festival Public Feast',
    icon: 'fa-utensils'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_183241.jpg',
    title: 'Coronation Feast Gathering',
    icon: 'fa-utensils'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_183410.jpg',
    title: 'Traditional Council Parade',
    icon: 'fa-people-group'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_183414.jpg',
    title: 'Heritage Festival Drums',
    icon: 'fa-drum'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_183425.jpg',
    title: 'Warriors Heritage Procession',
    icon: 'fa-people-marching'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_183500.jpg',
    title: 'Elders Coronation Reception',
    icon: 'fa-chair'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_184136.jpg',
    title: 'Royal Heritage Banquet',
    icon: 'fa-utensils'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_184321.jpg',
    title: 'Festive Evening Dance',
    icon: 'fa-music'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_184616.jpg',
    title: 'Cultural Masquerade Performance',
    icon: 'fa-mask'
  },
  {
    type: 'image',
    category: 'festival',
    src: 'assets/festive/20260417_185156.jpg',
    title: 'Ekenobizi Festival Closing',
    icon: 'fa-handshake-angle'
  },

  // ==================== HEALTH CENTER CATEGORY ====================
  {
    type: 'video',
    category: 'health-center',
    src: 'assets/health/20250919_160509.mp4',
    title: 'Health Clinic Outreach Program',
    icon: 'fa-circle-play'
  },
  {
    type: 'image',
    category: 'health-center',
    src: 'assets/health/20250919_160745.jpg',
    title: 'Free Medical Diagnosis Clinic',
    icon: 'fa-stethoscope'
  },
  {
    type: 'image',
    category: 'health-center',
    src: 'assets/health/20250919_160813.jpg',
    title: 'Maternal and Child Care Program',
    icon: 'fa-baby'
  },
  {
    type: 'image',
    category: 'health-center',
    src: 'assets/health/20250919_160815.jpg',
    title: 'Pediatric Medical Checkup',
    icon: 'fa-user-doctor'
  },
  {
    type: 'image',
    category: 'health-center',
    src: 'assets/health/20250919_161309.jpg',
    title: 'Community Health Consultation',
    icon: 'fa-user-md'
  },
  {
    type: 'image',
    category: 'health-center',
    src: 'assets/health/20250919_161345(0).jpg',
    title: 'Outreach Aid Distribution',
    icon: 'fa-hand-holding-medical'
  },
  {
    type: 'image',
    category: 'health-center',
    src: 'assets/health/20260302_180338.jpg',
    title: 'State-of-the-Art Medical Ward',
    icon: 'fa-hospital'
  },
  {
    type: 'image',
    category: 'health-center',
    src: 'assets/health/20260302_180514.jpg',
    title: 'Health Center General Facility',
    icon: 'fa-heart-pulse'
  },
  {
    type: 'image',
    category: 'health-center',
    src: 'assets/health/20260518_080505.jpg',
    title: 'Ekenobizi General Hospital Outreach',
    icon: 'fa-people-roof'
  },

  // ==================== KMJ FOUNDATION CATEGORY ====================
  {
    type: 'video',
    category: 'health-center', // Map the 325MB launch video under community/KMJ Foundation
    src: 'assets/kmj%20foud/20251228_142540.mp4',
    title: 'KMJ Foundation Grand Launch Event',
    icon: 'fa-circle-play'
  },
  {
    type: 'video',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_164830.mp4',
    title: 'Eze Solomon Kanu Welfare Outreach',
    icon: 'fa-circle-play'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_164951.jpg',
    title: 'KMJ Foundation Launch Ceremony',
    icon: 'fa-ribbon'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165045.jpg',
    title: 'Eze Solomon Kanu Philanthropic Program',
    icon: 'fa-hands-holding'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165137.jpg',
    title: 'Community Scholarship Distribution',
    icon: 'fa-graduation-cap'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165205.jpg',
    title: 'Youth Scholarship Awards Ceremony',
    icon: 'fa-graduation-cap'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165207.jpg',
    title: 'KMJ Educational Grants Ceremony',
    icon: 'fa-award'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165236(0).jpg',
    title: 'Student Awardees Group Photo',
    icon: 'fa-users'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165532.jpg',
    title: 'Community Empowerment Beneficiaries',
    icon: 'fa-briefcase'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165705.jpg',
    title: 'Youth Vocational Center Launch',
    icon: 'fa-door-open'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165709.jpg',
    title: 'Vocational Training Center Reception',
    icon: 'fa-desktop'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165750.jpg',
    title: 'Philanthropic Grant Distribution',
    icon: 'fa-money-bill-transfer'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_165802.jpg',
    title: 'Community Support Programs',
    icon: 'fa-hand-holding-heart'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_170056.jpg',
    title: 'KMJ Skills Development Hub',
    icon: 'fa-chalkboard-user'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_170335.jpg',
    title: 'Skills Training Beneficiaries Group',
    icon: 'fa-users'
  },
  {
    type: 'video',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_170341.mp4',
    title: 'Vocational Training Program Highlights',
    icon: 'fa-circle-play'
  },
  {
    type: 'video',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_170453.mp4',
    title: 'Elders Support Welfare Highlights',
    icon: 'fa-circle-play'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_170522.jpg',
    title: 'Elder Care Beneficiaries Gathering',
    icon: 'fa-people-roof'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_170601.jpg',
    title: 'Elder Welfare Grant Distribution',
    icon: 'fa-gift'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_171535.jpg',
    title: 'Elders Support & Care Scheme',
    icon: 'fa-hand-holding-heart'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_171537.jpg',
    title: 'Elderly Care Grant Ceremony',
    icon: 'fa-heart'
  },
  {
    type: 'image',
    category: 'kmj-foundation',
    src: 'assets/kmj%20foud/20251228_171542.jpg',
    title: 'Elders Support Program Group Photo',
    icon: 'fa-users'
  }
];

function renderGallery() {
  const grid = document.getElementById('dynamicGalleryGrid');
  if (!grid) return;
  
  grid.innerHTML = galleryData.map((item, index) => {
    const delay = (index % 6) * 0.05; // stagger delay
    if (item.type === 'video') {
      return `
        <div class="gallery-item reveal-card" data-category="${item.category}" style="--delay: ${delay}s">
          <video autoplay muted loop playsinline class="gallery-img" ${item.poster ? `poster="${item.poster}"` : ''} preload="metadata">
            <source src="${item.src}" type="video/mp4">
          </video>
          <div class="gallery-overlay">
            <span class="gallery-icon"><i class="fa-solid ${item.icon || 'fa-circle-play'}"></i></span>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="gallery-item reveal-card" data-category="${item.category}" style="--delay: ${delay}s">
          <img src="${item.src}" alt="Community Photo" class="gallery-img" loading="lazy" />
          <div class="gallery-overlay">
            <span class="gallery-icon"><i class="fa-solid ${item.icon || 'fa-camera'}"></i></span>
          </div>
        </div>
      `;
    }
  }).join('');
}

// Generate the grid items dynamically before initializations
renderGallery();
setupScrollReveals();

/* ─── Dynamic Tab Filtering with GSAP ─── */
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems  = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons, add to current
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.getAttribute('data-filter');

    // GSAP Filter Animation Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
      }
    });

    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filterVal === 'all' || category === filterVal) {
        // Show Item
        gsap.killTweensOf(item);
        // Make display visible first
        item.style.display = 'block';
        tl.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'transform' // Avoid inline transform conflicts
        }, '<');
      } else {
        // Hide Item
        gsap.killTweensOf(item);
        tl.to(item, {
          opacity: 0,
          scale: 0.82,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            item.style.display = 'none';
          }
        }, '<');
      }
    });
  });
});

/* ─── Gallery Lightbox Modal Logic ─── */
const galleryModal = document.getElementById('galleryModal');
const modalContent = document.getElementById('modalContent');
const modalBack    = document.getElementById('modalBack');
const modalPrev    = document.getElementById('modalPrev');
const modalNext    = document.getElementById('modalNext');
const modalDownload = document.getElementById('modalDownload');
const modalCaption = document.getElementById('modalCaption');
const modalType    = document.getElementById('modalType');
const modalPlayOverlay = document.getElementById('modalPlayOverlay');

let currentGalleryIndex = 0;
let activeGalleryItems = [];

// Get the list of currently visible gallery items for the lightbox
function updateActiveGalleryItems() {
  activeGalleryItems = Array.from(galleryItems).filter(item => {
    return getComputedStyle(item).display !== 'none';
  });
}

// Removed forceDownload for native <a> tag download functionality

function openGalleryModal(index) {
  updateActiveGalleryItems();
  
  // Bound check
  if (index < 0 || index >= activeGalleryItems.length) return;
  currentGalleryIndex = index;
  
  const item = activeGalleryItems[index];
  const video = item.querySelector('video');
  const img = item.querySelector('img');
  const caption = "";
  
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
    
    modalVideo.addEventListener('play',  () => modalPlayOverlay.classList.add('hidden'));
    modalVideo.addEventListener('pause', () => modalPlayOverlay.classList.remove('hidden'));
    
    modalContent.appendChild(modalVideo);
    modalType.textContent = 'Video';
    modalDownload.href = videoSrc;
    modalDownload.download = 'Ekenobizi-Community-Video.mp4';
    modalPlayOverlay.style.display = 'flex';
  } else if (img) {
    const imgSrc = img.getAttribute('src');
    const modalImg = document.createElement('img');
    modalImg.src = imgSrc;
    modalContent.appendChild(modalImg);
    modalType.textContent = 'Image';
    modalDownload.href = imgSrc;
    let filename = imgSrc.split('/').pop().split('?')[0];
    if (!filename) filename = 'Ekenobizi-Community-Image.jpg';
    modalDownload.download = filename;
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
  updateActiveGalleryItems();
  if (activeGalleryItems.length === 0) return;
  
  let newIndex = currentGalleryIndex + step;
  if (newIndex < 0) newIndex = activeGalleryItems.length - 1;
  if (newIndex >= activeGalleryItems.length) newIndex = 0;
  openGalleryModal(newIndex);
}

// Bind clicks to all gallery items
galleryItems.forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    updateActiveGalleryItems();
    const visibleIndex = activeGalleryItems.indexOf(item);
    if (visibleIndex !== -1) {
      openGalleryModal(visibleIndex);
    }
  });
});

if (modalBack) modalBack.addEventListener('click', closeGalleryModal);
if (modalPlayOverlay) modalPlayOverlay.addEventListener('click', togglePlayPause);

// Native download handles click directly

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

/* ─── Tilt card 3D effect ─── */
document.querySelectorAll('.gallery-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
