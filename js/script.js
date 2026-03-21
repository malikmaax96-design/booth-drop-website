/*
 * Booth Drop - JavaScript Functionality
 * Modern, Interactive Website Features
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navbarMenu.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll('.navbar-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navbarMenu.classList.remove('active');
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      // Close other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        eventType: formData.get('eventType'),
        eventDate: formData.get('eventDate'),
        location: formData.get('location'),
        message: formData.get('message')
      };

      // Validate form
      if (!data.name || !data.email || !data.eventDate) {
        alert('Please fill in all required fields (Name, Email, Event Date)');
        return;
      }

      // Show success message
      const btn = this.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '✓ Message Sent Successfully!';
      btn.style.background = '#10b981';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        this.reset();
      }, 3000);

      // In production, send to server
      console.log('Form Data:', data);
    });
  }

  // Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = {
        eventType: formData.get('eventType'),
        eventDate: formData.get('eventDate'),
        eventTime: formData.get('eventTime'),
        duration: formData.get('duration'),
        guests: formData.get('guests'),
        location: formData.get('location'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone')
      };

      if (!data.name || !data.email || !data.eventDate) {
        alert('Please fill in all required fields');
        return;
      }

      const btn = this.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '✓ Booking Request Sent!';
      btn.style.background = '#10b981';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        this.reset();
      }, 3000);

      console.log('Booking Data:', data);
    });
  }

  // Scroll to element
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .blog-card, .testimonial-card').forEach(el => {
    observer.observe(el);
  });

  // Counter animation
  function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    let current = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + (element.textContent.includes('+') ? '+' : '');
      }
    };

    updateCounter();
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll('.trust-item-number');
        numbers.forEach(num => {
          if (!num.dataset.animated) {
            animateCounter(num);
            num.dataset.animated = 'true';
          }
        });
        counterObserver.unobserve(entry.target);
      }
    });
  });

  const trustSection = document.querySelector('.trust-section');
  if (trustSection) {
    counterObserver.observe(trustSection);
  }

  // Modal for gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        cursor: pointer;
        animation: fadeIn 0.3s ease-out;
      `;
      
      const content = document.createElement('div');
      content.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        position: relative;
      `;

      const img = this.querySelector('img');
      if (img) {
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
        `;
        content.appendChild(modalImg);
      }

      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      content.appendChild(closeBtn);
      modal.appendChild(content);
      document.body.appendChild(modal);

      const closeModal = () => {
        modal.remove();
      };

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      });
    });
  });

  // Booking button smooth scroll
  const bookingButtons = document.querySelectorAll('[data-scroll-to]');
  bookingButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const target = this.getAttribute('data-scroll-to');
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Traffic light for availability (cosmetic)
  const availabilityIndicator = document.querySelector('.availability-status');
  if (availabilityIndicator) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const hour = today.getHours();
    
    // Show available on weekdays during business hours
    if (dayOfWeek > 0 && dayOfWeek < 6 && hour >= 9 && hour < 18) {
      availabilityIndicator.innerHTML = '<span style="color: #10b981;">✓ Available Today</span>';
    }
  }
}); // DOMContentLoaded

// Smooth scroll for internal links
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Track Google Analytics (add your tracking ID)
function initAnalytics() {
  // Replace with your Google Analytics tracking code
  // window.dataLayer = window.dataLayer || [];
  // gtag('js', new Date());
  // gtag('config', 'GA_MEASUREMENT_ID');
}

// Initialize on page load
window.addEventListener('load', function () {
  // Add loading animation completion
  document.body.classList.add('loaded');

  // Preload images
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    const temp = new Image();
    temp.src = img.dataset.src;
  });
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
  // Ctrl+J to book
  if (e.ctrlKey && e.key === 'j') {
    const bookBtn = document.querySelector('[data-scroll-to="#booking"]');
    if (bookBtn) {
      bookBtn.click();
    }
  }

  // Escape to close modals
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('[data-modal]');
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
  }
});

// Service worker for offline support (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {
      // Service worker registration failed, that's ok
    });
  });
}

// Export functions for use in HTML
window.smoothScroll = smoothScroll;
window.initAnalytics = initAnalytics;
