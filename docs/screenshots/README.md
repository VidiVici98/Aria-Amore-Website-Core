# Aria Amore Website Screenshots

## 🆕 New Social Media Features (February 2026)

### Visual Documentation for PR Review

The website now includes comprehensive social media marketing features. All new features are documented with visual guides:

#### Quick View Screenshots (SVG - Perfect Scaling)

1. **[Social Media Section](social-media-features/01-social-section-desktop.svg)** - Desktop view
   - Instagram & TikTok platform cards
   - 7-platform share buttons
   - Gold gradient CTAs

2. **[Contact Modal](social-media-features/02-contact-modal-desktop.svg)** - Live chat fallback
   - 4 contact options with hover arrows
   - Online indicator
   - Professional styling

3. **[Mobile View](social-media-features/03-mobile-view.svg)** - Responsive layout
   - Stacked social cards
   - 3-column share buttons
   - Icon-only chat button

4. **[Chat Widget](social-media-features/04-chat-widget-in-context.svg)** - In context
   - Fixed position bottom-right
   - Features list
   - Cost comparison ($0/month)

#### Complete Documentation
- **[SOCIAL-FEATURES-GUIDE.md](SOCIAL-FEATURES-GUIDE.md)** - Feature index with descriptions (10KB)
- **[VISUAL-MOCKUPS.md](social-media-features/VISUAL-MOCKUPS.md)** - Detailed ASCII mockups (12KB)

### What's New
✨ Social platform cards (Instagram, TikTok)  
✨ 7-platform share buttons (FB, Twitter, LinkedIn, Pinterest, WA, Email, Copy)  
✨ FREE live chat widget ($0/month vs $40-400)  
✨ Campaign tracking (UTM parameters)  
✨ Welcome banners for social visitors  
✨ Zero cost, zero maintenance

---

## Original Website Screenshots

This directory contains comprehensive screenshots of all pages in the Aria Amore website. Each screenshot is captured **after the curtain opening animation completes** to ensure all page content and features are fully visible.

## Screenshot Approach

**Important:** Screenshots are taken 3 seconds after page load to allow the curtain opening animation to complete (animation duration: 2 seconds). This ensures that:
- All page content is fully visible
- No red curtain overlay obscures the page
- All major features are properly showcased
- Users see the actual rendered page as intended

Due to full-page screenshot limitations with complex backgrounds and styles, these screenshots use viewport captures (1280x720) that show the actual rendered appearance of each page as users would see it.

## Main Pages

### 1. Homepage (index.html)
- **01-homepage-hero.png** - Hero section with navigation, main heading, and stats
  - Shows: Ornate header navigation, "More Than Just Entertainment" section, statistics (5+ Events, 100% Satisfaction, 3 Performers, "New")
  - Background: Elegant parchment texture with floral decorations
  - ![Homepage Hero](https://github.com/user-attachments/assets/9715a2b3-45b4-41ca-a9ad-9d28950d2774)

- **01-homepage-packages.png** - Package comparison section
  - Shows: Packages section (scrolled 800px down from hero)
  - Features: Service package options and booking information
  - ![Homepage Packages](https://github.com/user-attachments/assets/c6a7cd35-d91b-4b78-ad6c-03e5e86b705b)

### 2. About Page (about.html)
- **02-about-page.png** - About page with mission and story
  - Shows: Red curtain background, About Aria Amore header
  - Background: Beautiful theatrical red curtain texture
  - ![About Page](https://github.com/user-attachments/assets/adbcc232-2f74-46bf-8a64-ed90d5d945a3)

### 3. Services Page (services.html)
- **03-services-page.png** - Service packages and booking form
  - Shows: Red curtain background, "Bring Your Occasions To Life!" section
  - Background: Theatrical red curtain
  - ![Services Page](https://github.com/user-attachments/assets/a33f5535-6f23-476f-9312-f4f5a38dda16)

### 4. Artists Page (artists.html)
- **04-artists-page.png** - Featured performers and artist profiles
  - Shows: Artist information and performer carousel
  - ![Artists Page](https://github.com/user-attachments/assets/3420b9ce-796e-4b6f-a623-492ce7995979)

### 5. Repertoire Page (repertoire.html)
- **05-repertoire-page.png** - Song catalog and performance options
  - Shows: Available repertoire, song categories
  - ![Repertoire Page](https://github.com/user-attachments/assets/56d7eaf1-0307-457a-98c4-c109a939f7b7)

### 6. Events Page (events.html)
- **06-events-page.png** - Event calendar and upcoming performances
  - Shows: Calendar view, upcoming events, event details
  - ![Events Page](https://github.com/user-attachments/assets/06fafec3-ea06-48fd-9c2e-7536bf4552c8)

### 7. Gallery Page (gallery.html)
- **07-gallery-page.png** - Photo and video gallery
  - Shows: Performance photos, event highlights
  - ![Gallery Page](https://github.com/user-attachments/assets/74536d7a-b497-4425-bcae-62b09c8020bb)

### 8. Contact Page (contact.html)
- **08-contact-page.png** - Contact form and information
  - Shows: Contact form, location, business information
  - ![Contact Page](https://github.com/user-attachments/assets/3b9f6099-3036-4fb6-8667-4665d2d66756)

### 9. Privacy Policy (privacy-policy.html)
- **09-privacy-policy-page.png** - Privacy policy and data handling
  - Shows: Legal privacy information, data collection policies
  - ![Privacy Policy](https://github.com/user-attachments/assets/18c4c0cd-be2d-4511-979c-e4f3a77dc1dc)

### 10. Terms of Service (terms-of-service.html)
- **10-terms-of-service-page.png** - Terms and conditions
  - Shows: Legal terms, usage agreements, user conduct policies
  - ![Terms of Service](https://github.com/user-attachments/assets/a03f6ef1-48a5-4797-abd8-680fd23e2306)

## Pages Excluded

The following pages were intentionally **not** screenshotted per requirements:
- `/errors/403.html` - HTTP 403 Forbidden error page
- `/errors/404.html` - HTTP 404 Not Found error page
- `/errors/410.html` - HTTP 410 Gone error page
- `/errors/500.html` - HTTP 500 Internal Server error page
- `/errors/503.html` - HTTP 503 Service Unavailable error page

## Screenshot Details

- **Format**: PNG
- **Capture Method**: Viewport screenshots (1280x720) taken **after curtain animation completes**
- **Browser**: Chromium (via Playwright)
- **Viewport Size**: 1280x720 (standard desktop viewport)
- **Animation Wait**: 3 seconds after page load to ensure curtain has fully opened
- **Date Captured**: January 30, 2026

## Technical Notes

### Why Viewport Screenshots?

Full-page screenshots (`fullPage: true`) caused rendering issues with:
- Background textures (parchment, curtains)
- Fixed backgrounds (`background-attachment: fixed`)
- Gradient overlays
- Some sections appearing black or with missing styles

Viewport screenshots capture the actual rendered appearance as users see it, ensuring all visual elements are properly displayed.

### Sections Folder

The `sections/` subfolder contains additional sectioned screenshots for the homepage showing different scroll positions and page sections for even more comprehensive documentation.

## Usage

These screenshots can be used for:
- Documentation and reference
- Design reviews and client presentations
- Change tracking and version comparison
- Marketing materials and portfolio
- Development handoff and specifications

## Updating Screenshots

### Automated Script (Recommended)

Use the Node.js script with Playwright to automatically capture all screenshots after curtain animation:

```bash
# 1. Start the PHP development server
cd /path/to/Aria-Amore-Website-Core  # Navigate to your project root
php -S localhost:8000 -t public &

# 2. Run the screenshot capture script
node scripts/capture-screenshots.js http://localhost:8000

# The script will:
# - Wait for curtain animation to complete (3 seconds)
# - Capture all main pages
# - Capture homepage sections with different scroll positions
# - Save screenshots to docs/screenshots/
```

### Script Features

The automated script (`scripts/capture-screenshots.js`):
- ✅ Waits 3 seconds for curtain animation to complete
- ✅ Captures screenshots with curtain fully opened
- ✅ Handles scrolling for homepage sections
- ✅ Creates sections/ subfolder automatically
- ✅ Uses consistent viewport (1280x720)
- ✅ Provides progress feedback
- ✅ Captures all 13 screenshots automatically

### Manual Process (Alternative)

If you need to capture screenshots manually:

```bash
# 1. Start the PHP development server
cd /path/to/Aria-Amore-Website-Core  # Navigate to your project root
php -S localhost:8000 -t public

# 2. Keep server running in background or separate terminal

# 3. Use Playwright or browser DevTools to capture screenshots
# - Navigate to http://localhost:8000/[page].html
# - **IMPORTANT:** Wait 3+ seconds for curtain animation to complete
# - Take viewport screenshot (NOT full-page)
# - Save to docs/screenshots/
```

**Critical:** Always wait at least 3 seconds after page load before taking screenshots to ensure the curtain opening animation has completed.

### Why Server is Required

The repository structure uses symlinks for the build process:
- `public/assets -> ../assets`
- `public/components -> ../components`  
- `public/data -> ../data`

HTML files use absolute paths (`/assets/css/styles.css`) which:
- ✅ Work correctly with PHP server running
- ❌ Fail without server (shows only backgrounds)
- ✅ Resolve properly in production build (symlinks copied as real files)

### Troubleshooting

**Problem: Screenshot shows red curtain overlay**
- **Cause:** Screenshot taken before curtain animation completed
- **Solution:** 
  1. Wait 3+ seconds after page load
  2. Use the automated script which handles timing automatically
  3. Verify curtain has `.open` class in browser DevTools

**Problem: Screenshot shows only background, no content**
- **Cause:** Server not running or assets not loading
- **Solution:** 
  1. Check server: `curl -I http://localhost:8000/index.html`
  2. Check assets: `curl -I http://localhost:8000/assets/css/styles.css`
  3. Both should return `200 OK`

**Problem: CSS not loading**
- **Cause:** Symlinks not working or server document root incorrect
- **Solution:** 
  - Verify: `ls -la public/assets` shows `assets -> ../assets`
  - Server must use `-t public` flag
  - Restart server if needed

---

**Last Updated**: January 30, 2026  
**Total Screenshots**: 11 main pages + 2 homepage sections = 13 total  
**Capture Method**: Automated with Playwright (waits for curtain animation)  
**Animation Handling**: 3-second wait ensures curtain is fully opened
