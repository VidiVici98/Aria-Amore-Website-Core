/**
 * Universal Analytics Integration
 * One-touch drop-in analytics for Google Analytics 4, Facebook Pixel, and other platforms
 * 
 * Usage:
 * 1. Set your tracking IDs in .env or directly in this file
 * 2. Include this script in your HTML pages
 * 3. Analytics will automatically track page views, events, and conversions
 */

(function() {
  'use strict';

  const Analytics = {
    config: {
      // Load from meta tags or environment
      ga4MeasurementId: null,
      facebookPixelId: null,
      tiktokPixelId: null,
      linkedInPartnerId: null,
      debug: false
    },

    /**
     * Initialize analytics with configuration
     */
    init: function(customConfig = {}) {
      // Merge custom config
      this.config = { ...this.config, ...customConfig };

      // Try to load from meta tags
      this.loadConfigFromMeta();

      // Initialize enabled platforms
      if (this.config.ga4MeasurementId) {
        this.initGoogleAnalytics();
      }

      if (this.config.facebookPixelId) {
        this.initFacebookPixel();
      }

      if (this.config.tiktokPixelId) {
        this.initTikTokPixel();
      }

      if (this.config.linkedInPartnerId) {
        this.initLinkedInInsight();
      }

      // Track initial page view
      this.trackPageView();

      // Setup automatic event tracking
      this.setupAutoTracking();

      this.log('Analytics initialized');
    },

    /**
     * Load configuration from meta tags
     */
    loadConfigFromMeta: function() {
      const ga4Meta = document.querySelector('meta[name="ga4-measurement-id"]');
      const fbMeta = document.querySelector('meta[name="facebook-pixel-id"]');
      const tiktokMeta = document.querySelector('meta[name="tiktok-pixel-id"]');
      const linkedinMeta = document.querySelector('meta[name="linkedin-partner-id"]');
      const debugMeta = document.querySelector('meta[name="analytics-debug"]');

      if (ga4Meta) this.config.ga4MeasurementId = ga4Meta.content;
      if (fbMeta) this.config.facebookPixelId = fbMeta.content;
      if (tiktokMeta) this.config.tiktokPixelId = tiktokMeta.content;
      if (linkedinMeta) this.config.linkedInPartnerId = linkedinMeta.content;
      if (debugMeta) this.config.debug = debugMeta.content === 'true';
    },

    /**
     * Initialize Google Analytics 4
     */
    initGoogleAnalytics: function() {
      if (typeof gtag !== 'undefined') {
        this.log('Google Analytics already loaded');
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.ga4MeasurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', this.config.ga4MeasurementId, {
        'send_page_view': false, // We'll handle this manually
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });

      this.log('Google Analytics 4 initialized');
    },

    /**
     * Initialize Facebook Pixel
     */
    initFacebookPixel: function() {
      if (typeof fbq !== 'undefined') {
        this.log('Facebook Pixel already loaded');
        return;
      }

      !function(f,b,e,v,n,t,s) {
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      }(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', this.config.facebookPixelId);
      this.log('Facebook Pixel initialized');
    },

    /**
     * Initialize TikTok Pixel
     */
    initTikTokPixel: function() {
      if (typeof ttq !== 'undefined') {
        this.log('TikTok Pixel already loaded');
        return;
      }

      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      }(window, document, 'ttq');

      ttq.load(this.config.tiktokPixelId);
      this.log('TikTok Pixel initialized');
    },

    /**
     * Initialize LinkedIn Insight Tag
     */
    initLinkedInInsight: function() {
      if (typeof _linkedin_data_partner_ids !== 'undefined') {
        this.log('LinkedIn Insight Tag already loaded');
        return;
      }

      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(this.config.linkedInPartnerId);

      (function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);
      })(window.lintrk);

      this.log('LinkedIn Insight Tag initialized');
    },

    /**
     * Track page view
     */
    trackPageView: function(customData = {}) {
      const pageData = {
        page_path: window.location.pathname,
        page_title: document.title,
        page_location: window.location.href,
        ...customData
      };

      // Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', pageData);
      }

      // Facebook Pixel
      if (typeof fbq !== 'undefined') {
        fbq('track', 'PageView');
      }

      // TikTok Pixel
      if (typeof ttq !== 'undefined') {
        ttq.page();
      }

      // LinkedIn Insight
      if (typeof lintrk !== 'undefined') {
        lintrk('track', { conversion_id: this.config.linkedInPartnerId });
      }

      this.log('Page view tracked', pageData);
    },

    /**
     * Track custom event
     */
    trackEvent: function(eventName, eventData = {}) {
      // Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
      }

      // Facebook Pixel
      if (typeof fbq !== 'undefined') {
        const fbEventName = this.mapToFacebookEvent(eventName);
        if (fbEventName) {
          fbq('track', fbEventName, eventData);
        } else {
          fbq('trackCustom', eventName, eventData);
        }
      }

      // TikTok Pixel
      if (typeof ttq !== 'undefined') {
        const ttEventName = this.mapToTikTokEvent(eventName);
        if (ttEventName) {
          ttq.track(ttEventName, eventData);
        }
      }

      this.log('Event tracked', eventName, eventData);
    },

    /**
     * Track conversion/goal
     */
    trackConversion: function(conversionType, value = 0, currency = 'USD', additionalData = {}) {
      const conversionData = {
        value: value,
        currency: currency,
        ...additionalData
      };

      // Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          conversion_type: conversionType,
          ...conversionData
        });
      }

      // Facebook Pixel
      if (typeof fbq !== 'undefined') {
        if (conversionType === 'lead' || conversionType === 'contact') {
          fbq('track', 'Lead', conversionData);
        } else if (conversionType === 'booking' || conversionType === 'purchase') {
          fbq('track', 'Purchase', conversionData);
        } else {
          fbq('trackCustom', conversionType, conversionData);
        }
      }

      // TikTok Pixel
      if (typeof ttq !== 'undefined') {
        if (conversionType === 'lead' || conversionType === 'contact') {
          ttq.track('SubmitForm', conversionData);
        } else if (conversionType === 'booking') {
          ttq.track('PlaceAnOrder', conversionData);
        }
      }

      this.log('Conversion tracked', conversionType, conversionData);
    },

    /**
     * Map generic event names to Facebook standard events
     */
    mapToFacebookEvent: function(eventName) {
      const mapping = {
        'click': 'Click',
        'search': 'Search',
        'view_content': 'ViewContent',
        'add_to_cart': 'AddToCart',
        'initiate_checkout': 'InitiateCheckout',
        'contact': 'Lead',
        'submit_form': 'Lead',
        'booking': 'Purchase',
        'sign_up': 'CompleteRegistration'
      };
      return mapping[eventName.toLowerCase()] || null;
    },

    /**
     * Map generic event names to TikTok standard events
     */
    mapToTikTokEvent: function(eventName) {
      const mapping = {
        'click': 'ClickButton',
        'view_content': 'ViewContent',
        'contact': 'SubmitForm',
        'submit_form': 'SubmitForm',
        'booking': 'PlaceAnOrder',
        'search': 'Search',
        'sign_up': 'CompleteRegistration'
      };
      return mapping[eventName.toLowerCase()] || null;
    },

    /**
     * Setup automatic event tracking
     */
    setupAutoTracking: function() {
      // Track all clicks on CTA buttons
      document.addEventListener('click', (e) => {
        const cta = e.target.closest('[data-analytics-cta], .cta-button, .cta-primary, .cta-secondary');
        if (cta) {
          const ctaName = cta.dataset.analyticsCta || cta.textContent.trim();
          const ctaType = cta.dataset.ctaType || 'click';
          
          this.trackEvent('cta_click', {
            cta_name: ctaName,
            cta_type: ctaType,
            cta_location: window.location.pathname
          });
        }

        // Track external links
        const link = e.target.closest('a[href^="http"]');
        if (link && !link.href.includes(window.location.hostname)) {
          this.trackEvent('external_link_click', {
            link_url: link.href,
            link_text: link.textContent.trim()
          });
        }
      });

      // Track form submissions
      document.addEventListener('submit', (e) => {
        const form = e.target;
        if (form.tagName === 'FORM') {
          const formName = form.id || form.name || 'unnamed_form';
          this.trackEvent('form_submit', {
            form_name: formName,
            form_location: window.location.pathname
          });
        }
      });

      // Track video plays
      document.addEventListener('play', (e) => {
        if (e.target.tagName === 'VIDEO' || e.target.tagName === 'AUDIO') {
          this.trackEvent('media_play', {
            media_type: e.target.tagName.toLowerCase(),
            media_src: e.target.src || e.target.currentSrc
          });
        }
      }, true);

      // Track scroll depth
      this.trackScrollDepth();
    },

    /**
     * Track scroll depth
     */
    trackScrollDepth: function() {
      const depths = [25, 50, 75, 100];
      const tracked = new Set();
      
      window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        
        depths.forEach(depth => {
          if (scrollPercent >= depth && !tracked.has(depth)) {
            tracked.add(depth);
            this.trackEvent('scroll_depth', {
              depth: depth,
              page: window.location.pathname
            });
          }
        });
      }, { passive: true });
    },

    /**
     * Debug logging
     */
    log: function(...args) {
      if (this.config.debug) {
        console.log('[Analytics]', ...args);
      }
    }
  };

  // Make available globally
  window.Analytics = Analytics;

  // Auto-initialize on DOM load with configuration from meta tags
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Check if auto-init is disabled
      const noAutoInit = document.querySelector('meta[name="analytics-no-auto-init"]');
      if (!noAutoInit || noAutoInit.content !== 'true') {
        Analytics.init();
      }
    });
  } else {
    // Check if auto-init is disabled
    const noAutoInit = document.querySelector('meta[name="analytics-no-auto-init"]');
    if (!noAutoInit || noAutoInit.content !== 'true') {
      Analytics.init();
    }
  }
})();
