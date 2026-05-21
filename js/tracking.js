/**
 * BoothDrop Conversion Tracking
 * ================================
 * Tracks: WhatsApp clicks, Phone calls, Form submissions, Email clicks
 * Works with Google Ads & Google Analytics
 * 
 * HOW TO GET YOUR CONVERSION IDs:
 * 1. Go to Google Ads → Goals → Conversions → New conversion action
 * 2. Select "Website" → enter boothdrop.co.uk
 * 3. Create 4 conversion actions (WhatsApp, Phone, Form, Email)
 * 4. Replace the IDs below with your actual conversion IDs
 */

// ============================================
// GOOGLE ADS CONVERSION IDs - REPLACE THESE!
// ============================================
const BD_TRACKING = {
  // Replace 'AW-XXXXXXXXXX' with your Google Ads account conversion ID
  // Found in: Google Ads → Tools → Conversions → Tag setup
  GOOGLE_ADS_ID: 'AW-18087964421',
  
  // Conversion labels from Google Ads
  CONVERSIONS: {
    WHATSAPP_CLICK: 'AW-18087964421/cgp1CPuwwJscEIXegbFD',
    PHONE_CALL:     'AW-18087964421/cgp1CPuwwJscEIXegbFD',
    FORM_SUBMIT:    'AW-18087964421/cgp1CPuwwJscEIXegbFD',
    EMAIL_CLICK:    'AW-18087964421/cgp1CPuwwJscEIXegbFD'
  }
};

// ============================================
// TRACKING DASHBOARD (stores data locally)
// ============================================
const BoothDropTracker = {
  
  // Initialize tracking
  init() {
    this.trackPageView();
    this.attachEventListeners();
    this.trackUTMParams();
    console.log('📊 BoothDrop Tracking Active');
  },

  // Get or create visitor ID
  getVisitorId() {
    let id = localStorage.getItem('bd_visitor_id');
    if (!id) {
      id = 'BD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('bd_visitor_id', id);
    }
    return id;
  },

  // Save tracking event to localStorage
  saveEvent(eventType, details = {}) {
    const events = JSON.parse(localStorage.getItem('bd_events') || '[]');
    const event = {
      type: eventType,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      visitor: this.getVisitorId(),
      source: this.getSource(),
      ...details
    };
    events.push(event);
    localStorage.setItem('bd_events', JSON.stringify(events));
    
    // Also send to Google Ads if configured
    this.sendToGoogleAds(eventType);
    
    console.log(`📊 Tracked: ${eventType}`, event);
  },

  // Get traffic source from URL params
  getSource() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('gclid')) return 'Google Ads';
    if (params.get('utm_source')) return params.get('utm_source');
    if (document.referrer.includes('google')) return 'Google Organic';
    if (document.referrer.includes('facebook')) return 'Facebook';
    if (document.referrer.includes('instagram')) return 'Instagram';
    if (document.referrer) return 'Referral: ' + new URL(document.referrer).hostname;
    return 'Direct';
  },

  // Save UTM parameters
  trackUTMParams() {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
    const utmData = {};
    let hasUtm = false;
    
    utmKeys.forEach(key => {
      if (params.get(key)) {
        utmData[key] = params.get(key);
        hasUtm = true;
      }
    });

    if (hasUtm) {
      sessionStorage.setItem('bd_utm', JSON.stringify(utmData));
    }
  },

  // Track page view
  trackPageView() {
    const stats = JSON.parse(localStorage.getItem('bd_page_stats') || '{}');
    const page = window.location.pathname;
    stats[page] = (stats[page] || 0) + 1;
    stats['_total'] = (stats['_total'] || 0) + 1;
    stats['_last_visit'] = new Date().toISOString();
    localStorage.setItem('bd_page_stats', JSON.stringify(stats));
  },

  // Send conversion to Google Ads
  sendToGoogleAds(eventType) {
    if (typeof gtag === 'undefined') return;
    if (BD_TRACKING.GOOGLE_ADS_ID === 'AW-CONVERSION_ID') return; // Not configured yet
    
    const conversionMap = {
      'whatsapp_click': BD_TRACKING.CONVERSIONS.WHATSAPP_CLICK,
      'phone_call': BD_TRACKING.CONVERSIONS.PHONE_CALL,
      'form_submit': BD_TRACKING.CONVERSIONS.FORM_SUBMIT,
      'email_click': BD_TRACKING.CONVERSIONS.EMAIL_CLICK
    };

    const conversionLabel = conversionMap[eventType];
    if (conversionLabel && conversionLabel !== 'AW-CONVERSION_ID/whatsapp_label') {
      gtag('event', 'conversion', {
        'send_to': conversionLabel
      });
    }
  },

  // Attach click listeners to all trackable elements
  attachEventListeners() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';

      // Track WhatsApp clicks
      if (href.includes('wa.me') || href.includes('whatsapp')) {
        this.saveEvent('whatsapp_click', { 
          label: link.textContent.trim(),
          destination: href 
        });
      }

      // Track Phone calls
      if (href.startsWith('tel:')) {
        this.saveEvent('phone_call', { 
          number: href.replace('tel:', ''),
          label: link.textContent.trim()
        });
      }

      // Track Email clicks
      if (href.startsWith('mailto:')) {
        this.saveEvent('email_click', { 
          email: href.replace('mailto:', ''),
          label: link.textContent.trim()
        });
      }

      // Track "Get Free Quote" / CTA clicks
      if (link.classList.contains('btn-primary') && !href.startsWith('tel:') && !href.includes('wa.me')) {
        this.saveEvent('cta_click', {
          label: link.textContent.trim(),
          destination: href
        });
      }
    });

    // Track form submissions
    const form = document.getElementById('enquiryForm') || document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        this.saveEvent('form_submit', {
          formId: form.id || 'unknown',
          page: window.location.pathname
        });
      });
    }
  },

  // ============================================
  // DASHBOARD: View your stats in browser console
  // ============================================
  
  // Show all events: BoothDropTracker.showEvents()
  showEvents() {
    const events = JSON.parse(localStorage.getItem('bd_events') || '[]');
    console.table(events);
    return events;
  },

  // Show summary: BoothDropTracker.showSummary()
  showSummary() {
    const events = JSON.parse(localStorage.getItem('bd_events') || '[]');
    const summary = {
      total_events: events.length,
      whatsapp_clicks: events.filter(e => e.type === 'whatsapp_click').length,
      phone_calls: events.filter(e => e.type === 'phone_call').length,
      form_submissions: events.filter(e => e.type === 'form_submit').length,
      email_clicks: events.filter(e => e.type === 'email_click').length,
      cta_clicks: events.filter(e => e.type === 'cta_click').length,
      sources: {}
    };
    
    events.forEach(e => {
      summary.sources[e.source] = (summary.sources[e.source] || 0) + 1;
    });

    console.log('📊 BoothDrop Tracking Summary:');
    console.table(summary);
    console.log('Traffic Sources:');
    console.table(summary.sources);
    return summary;
  },

  // Show page stats: BoothDropTracker.showPages()
  showPages() {
    const stats = JSON.parse(localStorage.getItem('bd_page_stats') || '{}');
    console.log('📊 Page Views:');
    console.table(stats);
    return stats;
  },

  // Clear all data: BoothDropTracker.clearData()
  clearData() {
    localStorage.removeItem('bd_events');
    localStorage.removeItem('bd_page_stats');
    console.log('🗑️ Tracking data cleared');
  }
};

// Auto-start tracking when page loads
document.addEventListener('DOMContentLoaded', () => BoothDropTracker.init());

// Make tracker accessible in console
window.BoothDropTracker = BoothDropTracker;
