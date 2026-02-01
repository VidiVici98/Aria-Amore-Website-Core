# Analytics Setup Guide

## 🎯 One-Touch Analytics Integration

The Aria Amore website now includes a universal analytics integration that supports multiple platforms with a simple drop-in setup.

## ✨ Supported Platforms

- **Google Analytics 4 (GA4)** - Comprehensive website analytics
- **Facebook Pixel** - Track Facebook/Instagram ad campaigns
- **TikTok Pixel** - Track TikTok ad performance
- **LinkedIn Insight Tag** - B2B and professional event tracking

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your Tracking IDs

#### Google Analytics 4
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a GA4 property (or use existing)
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

#### Facebook Pixel (Optional)
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager/)
2. Create a new pixel or use existing
3. Copy your Pixel ID (format: `1234567890123456`)

#### TikTok Pixel (Optional)
1. Go to [TikTok Events Manager](https://ads.tiktok.com/marketing_api/docs?id=1739584855420929)
2. Create a new pixel or use existing
3. Copy your Pixel ID

#### LinkedIn Insight Tag (Optional)
1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/)
2. Navigate to Account Assets → Insight Tag
3. Copy your Partner ID

### Step 2: Configure Your Site

#### Option A: Using Meta Tags (Recommended)

Add these meta tags to the `<head>` section of your HTML pages:

```html
<!-- Analytics Configuration -->
<meta name="ga4-measurement-id" content="G-XXXXXXXXXX">
<meta name="facebook-pixel-id" content="1234567890123456">
<meta name="tiktok-pixel-id" content="YOUR_TIKTOK_PIXEL_ID">
<meta name="linkedin-partner-id" content="YOUR_LINKEDIN_PARTNER_ID">

<!-- Optional: Enable debug mode for testing -->
<meta name="analytics-debug" content="true">
```

#### Option B: Using JavaScript Configuration

```javascript
// Initialize with custom configuration
Analytics.init({
  ga4MeasurementId: 'G-XXXXXXXXXX',
  facebookPixelId: '1234567890123456',
  tiktokPixelId: 'YOUR_TIKTOK_PIXEL_ID',
  linkedInPartnerId: 'YOUR_LINKEDIN_PARTNER_ID',
  debug: false
});
```

#### Option C: Using Environment Variables

Add to your `.env` file:

```env
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=1234567890123456
TIKTOK_PIXEL_ID=YOUR_TIKTOK_PIXEL_ID
LINKEDIN_PARTNER_ID=YOUR_LINKEDIN_PARTNER_ID
```

### Step 3: Include the Analytics Script

Add this to your HTML pages (before the closing `</body>` tag):

```html
<!-- Universal Analytics -->
<script src="/assets/js/analytics.js"></script>
```

### Step 4: Test Your Setup

1. Open your website in a browser
2. Open Developer Console (F12)
3. Look for "[Analytics] Analytics initialized" message
4. Visit Google Analytics Real-Time view to see your visit

## 📊 What Gets Tracked Automatically

Once set up, the analytics system automatically tracks:

### Page Views
- Every page visit
- Page title and URL
- Referrer information

### User Interactions
- **CTA Clicks** - All call-to-action button clicks
- **Form Submissions** - Contact forms, booking forms, newsletter signups
- **External Links** - Clicks on external websites
- **Media Plays** - Video and audio playback
- **Scroll Depth** - How far users scroll (25%, 50%, 75%, 100%)

### Conversions
- Contact form submissions
- Booking requests
- Newsletter signups
- Social media link clicks

## 🎨 Custom Event Tracking

### Track Custom Events

```javascript
// Track a simple event
Analytics.trackEvent('button_click', {
  button_name: 'View Packages',
  button_location: 'hero_section'
});

// Track a conversion
Analytics.trackConversion('booking', 2500, 'USD', {
  package: 'Grand Opera Experience',
  date: '2026-06-15'
});
```

### Add Analytics Attributes to HTML

```html
<!-- CTA buttons with analytics tracking -->
<button data-analytics-cta="Book Now" data-cta-type="primary">
  Book Your Event
</button>

<!-- Track clicks on any element -->
<div data-analytics-cta="View Artists" data-cta-type="link">
  Meet Our Performers
</div>
```

## 📈 Integration with Marketing Tracker

The analytics system works seamlessly with the existing marketing tracker:

```javascript
// When a user converts, track both marketing attribution and analytics
MarketingTracker.trackConversion('booking', 2500);
Analytics.trackConversion('booking', 2500, 'USD');
```

## 🔍 Debugging

### Enable Debug Mode

Add this meta tag to see detailed console logs:

```html
<meta name="analytics-debug" content="true">
```

Or enable programmatically:

```javascript
Analytics.config.debug = true;
```

### Check What's Loaded

Open console and type:

```javascript
// Check if analytics is initialized
console.log(Analytics.config);

// Check if Google Analytics is loaded
console.log(typeof gtag !== 'undefined' ? 'GA4 loaded' : 'GA4 not loaded');

// Check if Facebook Pixel is loaded
console.log(typeof fbq !== 'undefined' ? 'FB Pixel loaded' : 'FB Pixel not loaded');
```

## 🎯 Sales Funnel Tracking

The analytics system automatically tracks users through your sales funnel:

### Funnel Stages

1. **Awareness** - User arrives from social media, ads, or organic search
2. **Interest** - User views services, artists, or package information
3. **Consideration** - User scrolls deeply, watches videos, clicks CTAs
4. **Intent** - User clicks "Book Now" or "Contact Us"
5. **Conversion** - User submits contact form or booking request

### View Funnel in Google Analytics

1. Go to Google Analytics
2. Navigate to **Reports** → **Engagement** → **Events**
3. Look for these key events:
   - `page_view` - Awareness
   - `scroll_depth` - Interest
   - `cta_click` - Intent
   - `form_submit` - Conversion

## 🔐 Privacy & Compliance

### GDPR Compliance

The analytics integration includes privacy-friendly defaults:
- IP anonymization enabled
- No personally identifiable information (PII) tracked
- Cookie consent recommended for EU visitors

### Add Cookie Consent (Optional)

```html
<script>
// Wait for user consent before initializing
document.getElementById('accept-cookies').addEventListener('click', function() {
  Analytics.init({
    ga4MeasurementId: 'G-XXXXXXXXXX'
  });
});
</script>
```

## 📱 Platform-Specific Features

### Google Analytics 4
- Enhanced measurement (automatic)
- Custom dimensions and metrics
- User properties
- Cross-domain tracking

### Facebook Pixel
- Custom audiences
- Conversion optimization
- Dynamic ads
- Event matching quality

### TikTok Pixel
- Video view tracking
- App install tracking
- Custom events
- Advanced matching

## 🚨 Troubleshooting

### Analytics Not Working?

1. **Check IDs are correct** - Verify format (GA4: G-XXXXXXXXXX)
2. **Check script is loaded** - View page source, look for analytics.js
3. **Check console for errors** - Enable debug mode
4. **Check ad blockers** - Disable temporarily to test
5. **Check CSP headers** - Ensure analytics domains are allowed

### Content Security Policy

If you have strict CSP, add these domains:

```html
<meta http-equiv="Content-Security-Policy" 
  content="
    script-src 'self' 
      https://www.googletagmanager.com 
      https://connect.facebook.net
      https://analytics.tiktok.com
      https://snap.licdn.com;
    connect-src 'self'
      https://www.google-analytics.com
      https://analytics.tiktok.com;
  ">
```

## 📊 Advanced Configuration

### Disable Auto-Initialization

```html
<meta name="analytics-no-auto-init" content="true">
```

Then manually initialize when ready:

```javascript
Analytics.init({
  ga4MeasurementId: 'G-XXXXXXXXXX',
  debug: true
});
```

### Custom Event Names

```javascript
// Track booking funnel stages
Analytics.trackEvent('funnel_stage', {
  stage: 'package_selection',
  package: 'Serenade Package'
});

Analytics.trackEvent('funnel_stage', {
  stage: 'date_selection',
  selected_date: '2026-06-15'
});

Analytics.trackEvent('funnel_stage', {
  stage: 'contact_info',
  form_completion: 50
});
```

## 🎓 Best Practices

1. **Always test in debug mode first** - Verify events are firing correctly
2. **Use consistent event names** - Makes analysis easier
3. **Track meaningful interactions** - Focus on business goals
4. **Don't track PII** - No names, emails, phone numbers in events
5. **Set up goals in GA4** - Define conversions that matter
6. **Review data weekly** - Look for trends and optimize

## 📞 Support

Need help setting up analytics?
- Email: info@ariaamore.com
- Check browser console for debug messages
- Review [Google Analytics Help](https://support.google.com/analytics)
- Review [Facebook Pixel Help](https://www.facebook.com/business/help/742478679120153)

## 🔄 Migration from Old Analytics

If upgrading from Universal Analytics (UA):

1. Keep both GA4 and UA running in parallel
2. Compare data for 2-4 weeks
3. Verify GA4 is capturing all important events
4. Remove UA tracking code

## 📝 Quick Reference

| Platform | ID Format | Where to Get |
|----------|-----------|--------------|
| Google Analytics 4 | G-XXXXXXXXXX | [analytics.google.com](https://analytics.google.com/) |
| Facebook Pixel | 1234567890123456 | [business.facebook.com/events_manager](https://business.facebook.com/events_manager/) |
| TikTok Pixel | String ID | [ads.tiktok.com](https://ads.tiktok.com/) |
| LinkedIn Insight | Numeric ID | [linkedin.com/campaignmanager](https://www.linkedin.com/campaignmanager/) |

## ✅ Setup Checklist

- [ ] Got tracking IDs from platforms
- [ ] Added meta tags or configuration to HTML
- [ ] Included analytics.js script on all pages
- [ ] Tested in debug mode
- [ ] Verified in platform real-time reports
- [ ] Set up conversion goals
- [ ] Documented IDs securely
- [ ] Trained team on viewing reports
