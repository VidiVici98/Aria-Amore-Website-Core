/*=============================================
Social Media Meta Tags Module
Comprehensive social sharing optimization
=============================================*/

/**
 * Generate complete social media meta tags for any page
 * @param {Object} config - Page configuration
 * @returns {string} HTML meta tags
 */
function generateSocialMetaTags(config) {
  const defaults = {
    title: 'Aria Amore - Live Opera for Your Event',
    description: 'Experience world-class live opera performances for weddings, corporate events, and celebrations.',
    image: 'https://ariaamore.com/assets/media/images/preview-image.jpg',
    url: window.location.href,
    type: 'website',
    siteName: 'Aria Amore',
    twitterHandle: '@ariaamore',
    locale: 'en_US'
  };
  
  const meta = { ...defaults, ...config };
  
  return `
    <!-- Enhanced Open Graph / Facebook -->
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:image" content="${meta.image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="${meta.url}">
    <meta property="og:type" content="${meta.type}">
    <meta property="og:site_name" content="${meta.siteName}">
    <meta property="og:locale" content="${meta.locale}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="${meta.twitterHandle}">
    <meta name="twitter:creator" content="${meta.twitterHandle}">
    <meta name="twitter:title" content="${meta.title}">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="${meta.image}">
    <meta name="twitter:image:alt" content="${meta.title}">
    
    <!-- Pinterest -->
    <meta name="pinterest-rich-pin" content="true">
    <meta property="og:see_also" content="https://www.instagram.com/ariaamore.art">
    
    <!-- Additional Social -->
    <meta property="fb:app_id" content="">
    <link rel="me" href="https://www.instagram.com/ariaamore.art">
    <link rel="me" href="https://www.tiktok.com/@ariaamore.art">
  `;
}

// Export for use in pages
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateSocialMetaTags };
}
