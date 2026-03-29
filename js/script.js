/* ========================================
   BOOTHDROP ENTERTAINMENT — script.js
   ======================================== */

/* ── Booth Modal Data ── */
const boothData = {
  slimpod: {
    name: 'LCD SlimPod',
    tag: 'Most Popular',
    desc: 'The LCD SlimPod is our sleek, modern touchscreen photo booth with a slim, elegant footprint that fits perfectly into any event space. Featuring a high-definition touchscreen, professional DSLR camera, and studio-quality lighting, the SlimPod delivers stunning photos every single time. Its contemporary design makes it a favourite for weddings, parties, and corporate events alike.',
    includes: [
      'Unlimited Instant Prints', 'Professional DSLR Camera', 'HD Touchscreen Interface',
      'Studio-Quality Lighting', 'Custom Photo Template', 'Fun Props Box',
      'Professional Attendant', 'Digital Copies via Email', 'Online Gallery',
      'Guestbook & Pens', 'Free Delivery & Setup', 'Fully Insured'
    ]
  },
  selfie: {
    name: 'Selfie Mirror Pod',
    tag: 'Fan Favourite',
    desc: 'The Selfie Mirror Pod is a full-length interactive mirror that doubles as a state-of-the-art photo booth. Guests interact with a stunning, animated touchscreen mirror that captures beautiful full-length photos. With voice guidance, fun animations, emoji touch stamps, and a signature capture feature, this booth is an experience in itself — pure glamour meets cutting-edge technology.',
    includes: [
      'Full-Length Mirror Display', 'Interactive Touchscreen', 'Voice Guidance System',
      'Emoji Touch Stamps', 'Signature Capture', 'Fun Props Box',
      'Instant Photo Printing', 'Custom Overlay Design', 'Professional Attendant',
      'Digital Copies', 'Guestbook', 'Fully Insured'
    ]
  },
  retro: {
    name: 'Retro Pod',
    tag: 'Classic Charm',
    desc: 'The Retro Pod brings timeless charm to any celebration. Styled after classic vintage photo booths, it delivers the iconic strip print experience guests know and love — with a modern twist. Step inside the private enclosure, strike a pose, and walk away with a beautiful strip of memories. Perfect for those who want a fun, nostalgic centrepiece at their event.',
    includes: [
      'Classic Strip Prints', 'Private Enclosed Booth', 'Vintage-Style Design',
      'High-Quality Camera', 'Instant Print Delivery', 'Custom Strip Template',
      'Fun Props Box', 'Professional Attendant', 'Digital Copies',
      'Online Gallery', 'Free Delivery & Setup', 'Fully Insured'
    ]
  },
  magic: {
    name: 'Magic Mirror',
    tag: 'Wedding Favourite',
    desc: 'The Magic Mirror is the ultimate entertainment piece for weddings and top-tier events. This stunning full-length mirror transforms into an interactive photo booth with twinkling LED lights, fun on-screen animations, and a built-in printer. Guests simply touch the mirror to start and walk away with beautiful, personalised prints. It truly is magic — an absolute showstopper at any event.',
    includes: [
      'Full-Length Magic Mirror', 'LED Twinkling Frame', 'Animated Screen Effects',
      'Touch-to-Start Interface', 'Instant Photo Printing', 'Custom Print Design',
      'Fun Props Box', 'Emoji & GIF Options', 'Professional Attendant',
      'Digital Sharing', 'Guestbook', 'Fully Insured'
    ]
  },
  party: {
    name: 'Party Booth',
    tag: 'High Energy',
    desc: 'The Party Booth is our open-air, high-energy photo station — designed for maximum fun and non-stop action. Perfect for large groups, it features wide-angle photography so everyone can pile in. With a customisable backdrop, rapid printing, and the option for GIFs and boomerangs, the Party Booth keeps the energy high all night long. This is the ultimate party starter.',
    includes: [
      'Open-Air Wide-Angle Setup', 'Rapid Instant Printing', 'GIF & Boomerang Mode',
      'Custom Backdrop Options', 'Large Group Capacity', 'Fun Props Box',
      'Custom Photo Template', 'Professional Attendant', 'Digital Copies',
      'Social Media Sharing', 'Unlimited Photos', 'Fully Insured'
    ]
  },
  inflatable: {
    name: 'Inflatable Booth',
    tag: 'Unique Showstopper',
    desc: 'The Inflatable Booth is a truly one-of-a-kind experience that turns heads and creates instant excitement. This eye-catching inflatable enclosure creates a private, immersive photo environment unlike anything else. Guests step inside for a unique, intimate photo experience while the impressive exterior makes for incredible event photos. Be different. Be unforgettable. Hire the Inflatable Booth.',
    includes: [
      'Unique Inflatable Enclosure', 'Private Photo Environment', 'High-Quality Camera',
      'Instant Photo Printing', 'Custom Photo Template', 'Fun Props Box',
      'Professional Attendant', 'Digital Copies', 'Online Gallery',
      'Social Media Sharing', 'Free Delivery & Setup', 'Fully Insured'
    ]
  },
  gif: {
    name: 'GIF Booth',
    tag: 'Social Media Ready',
    desc: "The GIF Booth captures animated GIFs, boomerangs, and short video clips that are instantly shareable on Instagram, TikTok, Facebook, and beyond. Perfect for brand activations, corporate events, and anyone who wants to maximise their social media reach. Guests receive instant digital delivery to their phone — no waiting, no hassle, just viral-ready content straight from your event.",
    includes: [
      'Animated GIF Creation', 'Boomerang Mode', 'Instant Digital Delivery',
      'Social Media Ready Files', 'Custom GIF Overlay', 'QR Code Sharing',
      'Email Delivery', 'Professional Attendant', 'Custom Backdrop',
      'Props Box Available', 'Unlimited GIFs', 'Fully Insured'
    ]
  }
};

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initBoothCards();
  initModal();
  initCarousel();
  initScrollReveal();
  initFooterBoothLinks();
});

/* ── Sticky Nav ── */
function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Booth Cards → Open Modal ── */
function initBoothCards() {
  document.querySelectorAll('.booth-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.booth;
      openModal(key);
    });
  });
}

/* ── Modal ── */
function initModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(key) {
  const data = boothData[key];
  if (!data) return;

  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="modal-header">
      <h2>${data.name}</h2>
      ${data.tag ? `<span class="modal-tag">${data.tag}</span>` : ''}
    </div>
    <p class="modal-desc">${data.desc}</p>
    <div class="modal-includes">
      <h4>What's Included</h4>
      <div class="modal-includes-grid">
        ${data.includes.map(item => `<div class="modal-inc-item">${item}</div>`).join('')}
      </div>
    </div>
    <div class="modal-cta">
      <a href="#booking" class="btn-primary" onclick="closeModal()">Book This Booth</a>
      <a href="tel:07368631516" class="btn-secondary">Call Us</a>
    </div>
  `;

  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

window.closeModal = closeModal;

/* ── Testimonials Carousel ── */
function initCarousel() {
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;
  let autoTimer;

  const getPerPage = () => window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;

  function getPages() { return Math.ceil(total / getPerPage()); }

  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < getPages(); i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(idx) {
    const pages = getPages();
    current = Math.max(0, Math.min(idx, pages - 1));
    const perPage = getPerPage();
    const cardWidth = track.parentElement.offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const offset = current * (cardWidth / perPage + gap) * perPage;
    track.style.transform = `translateX(-${offset}px)`;

    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    resetAuto();
  }

  function next() { goTo(current + 1 >= getPages() ? 0 : current + 1); }
  function prev() { goTo(current - 1 < 0 ? getPages() - 1 : current - 1); }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 5000);
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  }, { passive: true });

  window.addEventListener('resize', () => { buildDots(); goTo(0); });

  buildDots();
  resetAuto();
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
}

/* ── Footer Booth Links ── */
function initFooterBoothLinks() {
  document.querySelectorAll('[data-open]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const key = link.dataset.open;
      setTimeout(() => openModal(key), 300);
    });
  });
}
