/**
 * Marketing & Campaign Tracking Utilities
 * Handles UTM parameters, campaign tracking, and social referrals
 */

(function() {
  'use strict';

  const MarketingTracker = {
    /**
     * Parse UTM parameters from URL
     */
    getUTMParams: function() {
      const params = new URLSearchParams(window.location.search);
      return {
        source: params.get('utm_source'),
        medium: params.get('utm_medium'),
        campaign: params.get('utm_campaign'),
        term: params.get('utm_term'),
        content: params.get('utm_content'),
        referrer: document.referrer
      };
    },

    /**
     * Store campaign data in sessionStorage
     */
    storeCampaignData: function() {
      const utmParams = this.getUTMParams();
      
      // Only store if we have UTM parameters
      if (utmParams.source || utmParams.medium || utmParams.campaign) {
        sessionStorage.setItem('campaign_data', JSON.stringify(utmParams));
        sessionStorage.setItem('campaign_timestamp', Date.now().toString());
        
        // Also track the landing page
        sessionStorage.setItem('landing_page', window.location.pathname);
      }
    },

    /**
     * Get stored campaign data
     */
    getCampaignData: function() {
      const stored = sessionStorage.getItem('campaign_data');
      return stored ? JSON.parse(stored) : null;
    },

    /**
     * Build UTM string for internal links
     */
    buildUTMString: function(source, medium, campaign, content = '') {
      const params = new URLSearchParams();
      if (source) params.append('utm_source', source);
      if (medium) params.append('utm_medium', medium);
      if (campaign) params.append('utm_campaign', campaign);
      if (content) params.append('utm_content', content);
      return params.toString();
    },

    /**
     * Detect social media referrer
     */
    detectSocialReferrer: function() {
      const referrer = document.referrer.toLowerCase();
      
      const socialPlatforms = {
        'facebook.com': 'Facebook',
        'fb.com': 'Facebook',
        'twitter.com': 'Twitter',
        't.co': 'Twitter',
        'instagram.com': 'Instagram',
        'linkedin.com': 'LinkedIn',
        'pinterest.com': 'Pinterest',
        'tiktok.com': 'TikTok',
        'youtube.com': 'YouTube',
        'reddit.com': 'Reddit',
        'whatsapp.com': 'WhatsApp'
      };
      
      for (const [domain, platform] of Object.entries(socialPlatforms)) {
        if (referrer.includes(domain)) {
          return platform;
        }
      }
      
      return null;
    },

    /**
     * Display welcome message for social media visitors
     */
    showSocialWelcome: function() {
      const socialPlatform = this.detectSocialReferrer();
      const utmSource = this.getUTMParams().source;
      
      // Check if coming from social media
      if (socialPlatform || (utmSource && utmSource.includes('social'))) {
        const platform = socialPlatform || utmSource;
        
        // Create welcome banner
        const banner = document.createElement('div');
        banner.className = 'social-welcome-banner';
        banner.setAttribute('role', 'alert');
        banner.innerHTML = `
          <div class="welcome-content">
            <span class="welcome-icon">👋</span>
            <p>Welcome from ${platform}! <strong>Get 10% off</strong> when you book today.</p>
            <button class="welcome-close" aria-label="Close welcome message">×</button>
          </div>
        `;
        
        document.body.appendChild(banner);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
          banner.style.opacity = '0';
          setTimeout(() => banner.remove(), 300);
        }, 10000);
        
        // Close button
        banner.querySelector('.welcome-close').addEventListener('click', () => {
          banner.style.opacity = '0';
          setTimeout(() => banner.remove(), 300);
        });
        
        // Track social visit
        if (typeof gtag !== 'undefined') {
          gtag('event', 'social_visit', {
            platform: platform,
            landing_page: window.location.pathname
          });
        }
      }
    },

    /**
     * Track conversion with campaign attribution
     */
    trackConversion: function(conversionType, value = 0) {
      const campaignData = this.getCampaignData();
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          conversion_type: conversionType,
          value: value,
          currency: 'USD',
          utm_source: campaignData?.source,
          utm_medium: campaignData?.medium,
          utm_campaign: campaignData?.campaign
        });
      }
      
      // Store conversion for future reference
      const conversions = JSON.parse(localStorage.getItem('conversions') || '[]');
      conversions.push({
        type: conversionType,
        value: value,
        timestamp: Date.now(),
        campaign: campaignData
      });
      localStorage.setItem('conversions', JSON.stringify(conversions));
    },

    /**
     * Generate shareable campaign links
     */
    generateCampaignLink: function(page, campaign, content = '') {
      const baseUrl = window.location.origin;
      const utm = this.buildUTMString('website', 'social', campaign, content);
      return `${baseUrl}${page}?${utm}`;
    },

    /**
     * Add social proof elements based on traffic
     */
    addSocialProof: function() {
      const socialReferrer = this.detectSocialReferrer();
      
      if (socialReferrer) {
        // Add social proof counter
        const proofElements = document.querySelectorAll('[data-social-proof]');
        proofElements.forEach(el => {
          const message = el.dataset.socialProofMessage || 
            `${Math.floor(Math.random() * 20 + 30)} people from ${socialReferrer} viewing this page`;
          
          const proofBadge = document.createElement('div');
          proofBadge.className = 'social-proof-badge';
          proofBadge.innerHTML = `
            <span class="proof-icon">👥</span>
            <span class="proof-text">${message}</span>
          `;
          
          el.appendChild(proofBadge);
        });
      }
    },

    /**
     * Initialize marketing tracking
     */
    init: function() {
      // Store campaign data if present
      this.storeCampaignData();
      
      // Show welcome message for social visitors
      this.showSocialWelcome();
      
      // Add social proof elements
      this.addSocialProof();
      
      // Log referrer for debugging (remove in production)
      if (this.detectSocialReferrer()) {
        console.log('Social referrer detected:', this.detectSocialReferrer());
      }
      
      // Track page view with campaign data
      const campaignData = this.getCampaignData();
      if (campaignData && typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
          utm_source: campaignData.source,
          utm_medium: campaignData.medium,
          utm_campaign: campaignData.campaign
        });
      }
    }
  };

  // Make available globally
  window.MarketingTracker = MarketingTracker;

  // Auto-initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MarketingTracker.init());
  } else {
    MarketingTracker.init();
  }
})();
