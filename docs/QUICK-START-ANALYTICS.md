# 🚀 Quick Start Guide: Analytics & Marketing Setup

Get your Aria Amore website analytics and marketing ready in 30 minutes or less!

## ✅ Prerequisites Checklist

Before you begin, make sure you have:
- [ ] Access to Google Analytics account (or ability to create one)
- [ ] Website admin access
- [ ] Code editor (VS Code, Sublime, etc.)
- [ ] Basic understanding of HTML

## 📋 30-Minute Setup

### Step 1: Get Your Tracking IDs (10 minutes)

#### 1.1 Google Analytics 4 (Required)
1. Go to [analytics.google.com](https://analytics.google.com/)
2. Create account or sign in
3. Click "Admin" → "Create Property"
4. Name: "Aria Amore Website"
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

#### 1.2 Facebook Pixel (Optional - Recommended for Instagram/Facebook ads)
1. Go to [business.facebook.com/events_manager](https://business.facebook.com/events_manager/)
2. Click "Connect Data Sources" → "Web" → "Facebook Pixel"
3. Name: "Aria Amore Website"
4. Copy your **Pixel ID** (16-digit number)

#### 1.3 TikTok Pixel (Optional - For TikTok ads)
1. Go to [ads.tiktok.com](https://ads.tiktok.com/)
2. Navigate to "Assets" → "Events"
3. Click "Web Events" → "Set Up Web Events" → "TikTok Pixel"
4. Copy your **Pixel ID**

### Step 2: Add Analytics to Your Website (5 minutes)

#### Option A: Add Meta Tags to Each Page (Recommended)

Open each HTML file in `/public/` and add these meta tags in the `<head>` section:

```html
<head>
  <!-- existing meta tags... -->
  
  <!-- Analytics Configuration -->
  <meta name="ga4-measurement-id" content="G-XXXXXXXXXX">
  <meta name="facebook-pixel-id" content="1234567890123456">
  <!-- Optional for testing: -->
  <!-- <meta name="analytics-debug" content="true"> -->
  
  <!-- rest of head... -->
</head>
```

Replace:
- `G-XXXXXXXXXX` with your Google Analytics Measurement ID
- `1234567890123456` with your Facebook Pixel ID (if using)

#### Option B: Load Analytics Component

If you want to load analytics via JavaScript, add before closing `</body>` tag:

```html
  <!-- Analytics -->
  <script src="/assets/js/analytics.js"></script>
  <script src="/assets/js/marketing-tracker.js"></script>
  
</body>
```

### Step 3: Test Your Setup (5 minutes)

1. **Open your website** in a browser
2. **Open Developer Console** (F12 or Right-click → Inspect)
3. **Look for success messages:**
   ```
   [Analytics] Analytics initialized
   [Analytics] Google Analytics 4 initialized
   [Analytics] Page view tracked
   ```

4. **Verify in Google Analytics:**
   - Go to Google Analytics
   - Click "Reports" → "Realtime"
   - You should see your visit appear within 30 seconds

5. **Test an event:**
   - Click a "Book Now" or CTA button
   - Check console for: `[Analytics] Event tracked`

### Step 4: Update Environment Variables (5 minutes)

Add your IDs to `.env` file for documentation:

```env
# Analytics Configuration
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=1234567890123456
TIKTOK_PIXEL_ID=YOUR_ID
LINKEDIN_PARTNER_ID=YOUR_ID
```

### Step 5: Enable Marketing Features (5 minutes)

The marketing tracker is automatically enabled! It provides:

✅ **UTM Parameter Tracking** - Automatically captures campaign data
✅ **Social Media Detection** - Welcomes visitors from social platforms
✅ **Campaign Attribution** - Tracks which campaigns drive conversions

**No additional setup needed!** Just make sure these scripts are loaded:
- `/assets/js/marketing-tracker.js` ✓
- `/assets/js/social-share.js` ✓

## 🎯 What You Get Immediately

### Automatic Tracking
- ✅ Page views on all pages
- ✅ CTA button clicks
- ✅ Form submissions
- ✅ External link clicks
- ✅ Video/audio plays
- ✅ Scroll depth (25%, 50%, 75%, 100%)

### Social Media Features
- ✅ Welcome banners for social media visitors
- ✅ UTM tracking links ready to use
- ✅ Social share buttons (if enabled on page)
- ✅ Campaign attribution

### Conversion Tracking
- ✅ Contact form submissions
- ✅ Booking requests
- ✅ Phone number clicks
- ✅ Email link clicks

## 📊 View Your Data

### Google Analytics 4

**Real-Time Data:**
1. Go to [analytics.google.com](https://analytics.google.com/)
2. Click "Reports" → "Realtime"
3. See live visitors, events, and conversions

**Historical Data:**
1. "Reports" → "Engagement" → "Pages and screens"
2. "Reports" → "Engagement" → "Events"
3. "Reports" → "Acquisition" → "Traffic acquisition"

**Key Reports to Check:**
- **Traffic Sources:** Where visitors come from
- **Popular Pages:** Most viewed pages
- **Events:** CTA clicks, form submits, etc.
- **Conversions:** Booking requests and contacts

### Facebook Events Manager

1. Go to [business.facebook.com/events_manager](https://business.facebook.com/events_manager/)
2. Select your pixel
3. View events in real-time and historical data

## 🎨 Next Steps (Optional)

### Add Social Media Links to Bios (10 minutes)

Update your social media profile bios with tracking links:

**Instagram Bio:**
```
🎭 Live Opera for Weddings & Events
✨ Professional Vocalists
📍 Charleston, SC
👇 Book your event
https://ariaamore.com/?utm_source=instagram&utm_medium=bio&utm_campaign=profile
```

**TikTok Bio:**
```
🎵 Live Opera Performances
💍 Weddings | Events | Celebrations
📍 Charleston, SC
🔗 Book us ⬇️
https://ariaamore.com/?utm_source=tiktok&utm_medium=bio&utm_campaign=profile
```

### Generate Social Media Content (15 minutes)

Use the social content generator to create posts:

1. Open browser console on your website
2. Run this code:

```javascript
// Generate Instagram post for a package
const post = SocialContentGenerator.generatePost({
  platform: 'instagram',
  type: 'package',
  data: {
    name: 'The Serenade Package',
    description: 'Perfect for intimate ceremonies',
    price: 'Starting at $500',
    features: [
      'One professional opera singer',
      'Two carefully selected songs',
      'Perfect for proposals'
    ]
  }
});

console.log('Caption:\n', post.caption);
console.log('\nLink:', post.link);
```

3. Copy the output and post to Instagram!

See `docs/SOCIAL-MEDIA-INTEGRATION.md` for more templates.

### Set Up Conversion Goals (10 minutes)

**In Google Analytics:**
1. Go to "Admin" → "Events"
2. Click "Mark as conversion" for these events:
   - `form_submit`
   - `cta_click` (for "Book Now" buttons)
   - `external_link_click` (for phone/email)

**In Facebook:**
1. Go to Events Manager
2. Click "Aggregated Event Measurement"
3. Configure your domain
4. Set conversion events (Lead, Contact)

## 🔍 Troubleshooting

### Analytics Not Working?

**Check these:**
1. ✅ Script is loaded: View page source, search for "analytics.js"
2. ✅ IDs are correct: Check meta tags, verify format
3. ✅ No errors in console: Open Developer Tools, check for red errors
4. ✅ Ad blocker disabled: Temporarily disable to test
5. ✅ Debug mode enabled: Add `<meta name="analytics-debug" content="true">`

### No Events Showing?

1. Click a button or CTA
2. Check console for `[Analytics] Event tracked`
3. If no message, verify analytics.js is loaded
4. Wait 5-10 minutes for data to appear in GA4

### Real-Time Not Showing Visits?

1. Visit your website in an incognito/private window
2. Check that you're not blocking analytics with browser settings
3. Verify your GA4 Measurement ID is correct
4. Wait 30-60 seconds for data to appear

## 📚 Full Documentation

For detailed guides, see:

- **`docs/ANALYTICS-SETUP.md`** - Complete analytics setup guide
- **`docs/CTA-STRATEGY.md`** - Conversion optimization strategies
- **`docs/SOCIAL-MEDIA-INTEGRATION.md`** - Social media posting guide
- **`docs/DEPENDENCIES-MANAGEMENT.md`** - Managing code dependencies

## ✅ Setup Complete Checklist

- [ ] Got Google Analytics Measurement ID
- [ ] Got Facebook Pixel ID (optional)
- [ ] Added meta tags to HTML pages
- [ ] Loaded analytics scripts
- [ ] Tested in browser console
- [ ] Verified in Google Analytics Real-Time
- [ ] Updated .env file
- [ ] Set up conversion goals
- [ ] Updated social media bios (optional)
- [ ] Generated first social media post (optional)

## 🎉 You're Done!

Your website now has:
- ✅ Professional analytics tracking
- ✅ Marketing campaign attribution
- ✅ Social media integration
- ✅ Conversion tracking
- ✅ Automatic event monitoring

Start driving traffic and watch your analytics dashboard!

## 📞 Need Help?

- **Email:** info@ariaamore.com
- **Documentation:** Check the `/docs/` folder
- **Console Errors:** Enable debug mode and check browser console
- **Analytics Help:** [Google Analytics Help Center](https://support.google.com/analytics)

## 🚀 Advanced Features

Once you're comfortable with the basics:

1. **Set up Google Tag Manager** - Advanced tracking control
2. **Create custom dashboards** - Visualize your data
3. **Set up automated reports** - Email summaries weekly
4. **A/B test CTAs** - Optimize conversion rates
5. **Track customer journey** - See full path to booking

See individual documentation files for these advanced topics.

---

**Time Investment:** 30 minutes setup → Lifetime of actionable data! 📊✨
