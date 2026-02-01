# Social Media Marketing Guide

## 🎯 Overview

The Aria Amore website is now optimized for social media marketing with comprehensive features for tracking, sharing, and engaging visitors from social platforms.

## ✨ Features Implemented

### 1. Enhanced Social Meta Tags

All pages now include comprehensive meta tags for optimal social sharing:

#### Open Graph (Facebook, Instagram, LinkedIn)
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="...">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Aria Amore">
<meta property="og:locale" content="en_US">
```

#### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@ariaamore">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

#### Pinterest
```html
<meta name="pinterest-rich-pin" content="true">
```

### 2. Social Sharing Buttons

**File**: `assets/js/social-share.js`

Enables easy sharing to 7 platforms:
- 📘 Facebook
- 🐦 Twitter/X
- 💼 LinkedIn
- 📌 Pinterest
- 💬 WhatsApp
- ✉️ Email
- 🔗 Copy Link

#### Usage

Add this HTML to any page where you want share buttons:

```html
<div data-social-share 
     data-title="Your Page Title"
     data-description="Your description"
     data-image="https://ariaamore.com/path/to/image.jpg">
</div>
```

The JavaScript will automatically populate this with share buttons.

#### Programmatic Usage

```javascript
// Generate share buttons programmatically
const shareButtons = SocialShare.createShareButtons({
  title: 'Aria Amore - Live Opera',
  description: 'Experience world-class opera',
  url: window.location.href,
  image: 'https://ariaamore.com/assets/media/images/preview-image.jpg',
  platforms: ['facebook', 'twitter', 'linkedin', 'copy']
});

document.getElementById('my-container').innerHTML = shareButtons;
```

### 3. Campaign Tracking & UTM Parameters

**File**: `assets/js/marketing-tracker.js`

Automatically tracks visitors from social media and campaigns.

#### Features:
- ✅ UTM parameter detection and storage
- ✅ Social media referrer detection
- ✅ Welcome banners for social visitors
- ✅ Campaign attribution tracking
- ✅ Conversion tracking

#### UTM Parameters Supported

```
?utm_source=instagram
&utm_medium=social
&utm_campaign=summer2024
&utm_content=bio-link
&utm_term=opera-wedding
```

#### Creating Campaign Links

Use the `MarketingTracker` utility:

```javascript
// Generate a trackable link
const campaignLink = MarketingTracker.generateCampaignLink(
  '/services.html',
  'instagram_story',
  'swipe_up'
);
// Returns: https://ariaamore.com/services.html?utm_source=website&utm_medium=social&utm_campaign=instagram_story&utm_content=swipe_up
```

### 4. Social Media Section

A prominent section on the homepage showcasing social platforms:

```html
<section class="social-media-section">
  <h2>Connect With Us</h2>
  <div class="social-platforms">
    <!-- Instagram Card -->
    <!-- TikTok Card -->
  </div>
</section>
```

**Features**:
- Beautiful platform cards with hover effects
- Direct links to social profiles
- Call-to-action buttons
- Responsive grid layout

### 5. Social Proof Elements

Automatically adds social proof badges when visitors arrive from social media:

```javascript
// Add social proof to any element
<div data-social-proof data-social-proof-message="Custom message"></div>
```

This will show messages like: "45 people from Instagram viewing this page"

## 📱 Social Media Strategy

### Instagram (@ariaamore.art)

**What to Post**:
1. Performance clips (15-60 seconds)
2. Behind-the-scenes footage
3. Testimonial stories
4. Before/after event setups
5. Singer spotlight reels

**Link in Bio Strategy**:
```
Use this URL in Instagram bio:
https://ariaamore.com/?utm_source=instagram&utm_medium=bio&utm_campaign=profile
```

**Stories**:
- Add swipe-up links (if available) with UTM parameters
- Use the "Link" sticker for campaigns
- Create story highlights for different event types

### TikTok (@ariaamore.art)

**What to Post**:
1. Opera snippets with trending audio
2. "Get Ready With Me" - performance prep
3. Reactions to popular songs in opera style
4. Educational content about opera
5. Client surprise reactions

**Link Strategy**:
```
Profile link:
https://ariaamore.com/?utm_source=tiktok&utm_medium=profile&utm_campaign=bio
```

### Facebook

**What to Post**:
1. Event photo albums
2. Longer performance videos
3. Client testimonials
4. Event announcements
5. Blog post shares

**Link Sharing**:
When sharing website links on Facebook, they'll automatically use the Open Graph tags for beautiful previews.

### Pinterest

**What to Pin**:
1. Wedding ceremony photos
2. Event setup inspiration
3. Formal attire lookbooks
4. Song selection guides
5. Planning checklists

**Rich Pins**:
Images from your site will automatically be Pinterest-ready with rich pin metadata.

## 🎯 Campaign Examples

### Example 1: Instagram Story Campaign

**Goal**: Drive bookings from Instagram

**Setup**:
1. Create Instagram Story with compelling performance clip
2. Add link: `https://ariaamore.com/services.html?utm_source=instagram&utm_medium=story&utm_campaign=july_special&utm_content=performance_clip`
3. Track results in analytics

**What Happens**:
- Visitor clicks story link
- Sees welcome banner: "Welcome from Instagram! Get 10% off..."
- Campaign data is stored for attribution
- If they book, conversion is tracked with Instagram attribution

### Example 2: Facebook Ad Campaign

**Goal**: Generate leads for wedding season

**Setup**:
1. Create Facebook ad targeting engaged couples
2. Link to: `https://ariaamore.com/?utm_source=facebook&utm_medium=paid&utm_campaign=wedding_season_2024&utm_content=video_ad`
3. Set up Facebook Pixel (add to website)

**Tracking**:
- All visitors will have campaign data stored
- Form submissions will attribute to Facebook campaign
- Can see which content performed best

### Example 3: TikTok Viral Post

**Goal**: Capitalize on viral content

**Setup**:
1. Post goes viral on TikTok
2. Pin comment with link: `https://ariaamore.com/?utm_source=tiktok&utm_medium=viral&utm_campaign=name_of_video`
3. Add to bio as well

**What Happens**:
- Traffic surge is tracked
- Welcome banner shows TikTok visitors special message
- Can measure conversion rate from viral traffic

## 📊 Measuring Success

### Analytics Integration

The system is ready for Google Analytics 4:

```javascript
// Events are automatically tracked:
// - share: When someone shares content
// - social_visit: When someone arrives from social media
// - conversion: When someone completes an action
```

### Key Metrics to Track

1. **Traffic by Source**
   - Instagram referrals
   - TikTok referrals
   - Facebook referrals
   - Twitter referrals

2. **Engagement**
   - Share button clicks
   - Social platform card clicks
   - Time on site by source

3. **Conversions**
   - Form submissions by source
   - Newsletter signups by source
   - Booking inquiries by campaign

### Setting Up Google Analytics 4

Add this to your `<head>` section:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🎨 Customization

### Styling Social Buttons

Edit `assets/css/social-share.css` to customize:

```css
/* Change button colors */
.share-btn-facebook:hover {
  background: your-custom-color;
}

/* Adjust layout */
.share-buttons-grid {
  grid-template-columns: repeat(4, 1fr); /* Change column count */
}
```

### Welcome Banner Messages

Edit `assets/js/marketing-tracker.js`:

```javascript
// Customize welcome message
banner.innerHTML = `
  <div class="welcome-content">
    <p>Your custom message here!</p>
  </div>
`;
```

### Adding More Social Platforms

Edit `assets/js/social-share.js` and add to the `getShareUrls` method:

```javascript
snapchat: `https://snapchat.com/share?url=${url}`,
telegram: `https://t.me/share/url?url=${url}&text=${title}`
```

## 🚀 Best Practices

### 1. Consistent Branding
- Use the same preview image across all platforms (1200x630px)
- Maintain consistent messaging
- Update social handles if they change

### 2. Call-to-Actions
- Include clear CTAs on social posts
- Use UTM parameters on ALL external links
- Test links before posting

### 3. Content Calendar
- Post regularly (3-5 times per week)
- Mix content types (video, photos, stories)
- Engage with comments and messages

### 4. A/B Testing
- Test different UTM content parameters
- Compare performance of different post types
- Optimize based on data

### 5. Mobile Optimization
- All features are mobile-responsive
- Test share buttons on mobile devices
- Ensure fast loading on mobile networks

## 🔧 Technical Setup Checklist

- [x] Social meta tags added to all pages
- [x] Share buttons component created
- [x] Marketing tracker implemented
- [x] Campaign tracking active
- [x] Social media section added to homepage
- [ ] Google Analytics configured (add your GA4 ID)
- [ ] Facebook Pixel installed (optional)
- [ ] Social media accounts active and linked
- [ ] Preview image optimized (1200x630px)
- [ ] Test sharing on all platforms

## 📞 Support

For questions or issues:
1. Check browser console for any JavaScript errors
2. Test share links manually before campaigns
3. Use Facebook's Sharing Debugger: https://developers.facebook.com/tools/debug/
4. Use Twitter Card Validator: https://cards-dev.twitter.com/validator

## 🎉 Next Steps

1. **Set up Google Analytics** - Add your GA4 tracking ID
2. **Test all share buttons** - Verify they work on each platform
3. **Create your first campaign** - Start with Instagram bio link
4. **Monitor results** - Check traffic sources in analytics
5. **Iterate and improve** - Use data to optimize campaigns

---

**Last Updated**: February 2026  
**Version**: 1.0  
**Maintained By**: Aria Amore Development Team
