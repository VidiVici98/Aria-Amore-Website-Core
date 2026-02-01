# Website Screenshots Documentation

**Last Updated:** February 1, 2026  
**Total Screenshots:** 18 (13 desktop + 5 mobile)

## Overview

This document contains comprehensive information about capturing, managing, and updating website screenshots for the Aria Amore website.

## Current Screenshots

### Desktop Screenshots (1280x720)

**Main Pages (11 files):**
1. `01-homepage-hero.png` - Homepage hero section
2. `01-homepage-packages.png` - Homepage packages (scrolled to 800px)
3. `02-about-page.png` - About page
4. `03-services-page.png` - Services page
5. `04-artists-page.png` - Artists page
6. `05-repertoire-page.png` - Repertoire page
7. `06-events-page.png` - Events page
8. `07-gallery-page.png` - Gallery page
9. `08-contact-page.png` - Contact page
10. `09-privacy-policy-page.png` - Privacy policy page
11. `10-terms-of-service-page.png` - Terms of service page

**Homepage Sections (2 files):**
- `sections/homepage-section-1-hero.png` - Hero section detail
- `sections/homepage-section-2-packages.png` - Packages section detail

### Mobile Screenshots (375x667 @ 2x)

**Mobile Views (5 files):**
1. `mobile/01-homepage-mobile.png` - Homepage on mobile device
2. `mobile/02-contact-mobile.png` - Contact page mobile view
3. `mobile/03-artists-mobile.png` - Artists page mobile view
4. `mobile/04-services-mobile.png` - Services page mobile view
5. `mobile/05-chat-widget-button.png` - Chat widget on mobile

### Chat Widget Screenshots

**Support Widget States:**
- `chat-widget-collapsed.png` - Collapsed button state (desktop)
- `chat-widget-expanded.png` - Expanded modal with contact options (desktop)
- `mobile/chat-widget-collapsed.png` - Collapsed button on mobile
- `mobile/chat-widget-expanded.png` - Expanded modal on mobile

## Automated Screenshot Capture

### Quick Start

```bash
# 1. Start development server
npm start

# 2. Run screenshot capture (in another terminal)
npm run screenshots

# Results:
# - 11 desktop page screenshots
# - 2 desktop section screenshots  
# - 5 mobile screenshots
# - 4 chat widget screenshots
# - Total: 22 screenshots
# - All saved to docs/screenshots/
```

### Screenshot Script Details

**File:** `scripts/capture-screenshots.js`

**Features:**
- ✅ Automated browser control with Playwright
- ✅ Desktop viewport (1280x720)
- ✅ Mobile viewport (375x667 @ 2x retina)
- ✅ Curtain animation wait (3 seconds)
- ✅ Automatic directory creation
- ✅ Progress reporting
- ✅ Error handling

**Technical Configuration:**
```javascript
// Desktop viewport
const VIEWPORT_DESKTOP = { width: 1280, height: 720 };

// Mobile viewport (iPhone SE/8)
const VIEWPORT_MOBILE = { width: 375, height: 667 };

// Timing
const CURTAIN_ANIMATION_WAIT_MS = 3000;
```

## Important: Curtain Animation

The website features a theatrical curtain opening animation that must complete before screenshots are taken:

- **Animation Start:** 100ms after page load
- **Animation Duration:** 2 seconds (CSS transition)
- **Required Wait:** 3 seconds total (includes buffer)

### Why This Matters

Screenshots taken before the curtain animation completes will show:
- ❌ Red curtain overlay covering content
- ❌ Partially obscured page elements
- ❌ Incomplete rendering of features

**Solution:** The automated script waits 3 seconds and verifies the curtain has the `.open` class before capturing.

## Link Structure & Server Requirements

### Development Setup

Screenshots require an active development server because:

1. **Symlink Resolution:** Assets use absolute paths (`/assets/css/styles.css`)
2. **Development Structure:**
   ```
   public/
   ├── index.html (uses /assets/css/styles.css)
   ├── assets -> ../assets (SYMLINK)
   ├── components -> ../components (SYMLINK)
   └── data -> ../data (SYMLINK)
   ```
3. **Server Needed:** PHP or Node.js server resolves symlinks at runtime

### Production Build

The build script (`scripts/build.sh`) resolves all symlinks:
```bash
# Line 32 uses -L flag to follow symlinks
cp -rL "$REPO_ROOT/assets" "$BUILD_ROOT/"
```

**Result:** Production build has real files, no symlinks needed.

## Screenshot Quality Standards

### Desktop Screenshots
- **Viewport:** 1280x720
- **Format:** PNG
- **Scale Factor:** 1x
- **File Sizes:** 500KB - 1.2MB per screenshot
- **Quality:** High-resolution, professional quality

### Mobile Screenshots
- **Viewport:** 375x667 (logical pixels)
- **Actual Resolution:** 750x1334 (2x retina)
- **Format:** PNG
- **Scale Factor:** 2x (retina display simulation)
- **File Sizes:** 500KB - 1MB per screenshot
- **Quality:** Matches real mobile device rendering

## Features Captured in Screenshots

### Enhanced Chat Widget
- ✅ Professional gold gradient button
- ✅ Fixed bottom-right position
- ✅ Pulse animation effect
- ✅ Professional SVG icons (no emoji)
- ✅ Contact modal with 4 options (Form, Phone, Email, Instagram)
- ✅ Responsive mobile design (icon-only on small screens)

### Site Features
- ✅ Curtain opening animation (waited for completion)
- ✅ All page layouts and content
- ✅ Navigation and footer
- ✅ Interactive elements
- ✅ Responsive design breakpoints
- ✅ Touch-friendly mobile interface

## Manual Screenshot Process

If you need to capture screenshots manually:

### Prerequisites
```bash
# 1. Start development server
npm start
# or
php -S localhost:8000 -t public

# 2. Wait 2-3 seconds for server to be ready
```

### Using Browser DevTools

1. Open http://localhost:8000 in Chrome
2. Open DevTools (F12)
3. **Wait 3+ seconds** for curtain animation to complete
4. Click device toolbar icon or press Ctrl+Shift+M
5. Set viewport:
   - Desktop: 1280x720
   - Mobile: 375x667 (set device scale factor to 2)
6. Capture screenshot (Ctrl+Shift+P → "Capture screenshot")

### Using Playwright Directly

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:8000');
  
  // CRITICAL: Wait for curtain animation
  await page.waitForTimeout(3000);
  await page.waitForSelector('.curtain-wrapper.open');
  
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
```

## Directory Structure

```
docs/screenshots/
├── 01-homepage-hero.png                    # Desktop
├── 01-homepage-packages.png                # Desktop
├── 02-about-page.png                       # Desktop
├── 03-services-page.png                    # Desktop
├── 04-artists-page.png                     # Desktop
├── 05-repertoire-page.png                  # Desktop
├── 06-events-page.png                      # Desktop
├── 07-gallery-page.png                     # Desktop
├── 08-contact-page.png                     # Desktop
├── 09-privacy-policy-page.png              # Desktop
├── 10-terms-of-service-page.png            # Desktop
├── chat-widget-collapsed.png               # Desktop chat button
├── chat-widget-expanded.png                # Desktop chat modal
├── mobile/                                 # Mobile screenshots
│   ├── 01-homepage-mobile.png
│   ├── 02-contact-mobile.png
│   ├── 03-artists-mobile.png
│   ├── 04-services-mobile.png
│   ├── 05-chat-widget-button.png
│   ├── chat-widget-collapsed.png
│   └── chat-widget-expanded.png
├── sections/                               # Desktop sections
│   ├── homepage-section-1-hero.png
│   └── homepage-section-2-packages.png
├── social-media-features/                  # SVG mockups
│   ├── 01-social-section-desktop.svg
│   ├── 02-contact-modal-desktop.svg
│   ├── 03-mobile-view.svg
│   ├── 04-chat-widget-in-context.svg
│   └── VISUAL-MOCKUPS.md
├── README.md                               # Screenshots catalog
└── SOCIAL-FEATURES-GUIDE.md
```

## Troubleshooting

### Problem: Screenshots Show Red Curtain

**Cause:** Screenshot taken before curtain animation completes  
**Solution:** Wait 3+ seconds after page load, verify `.curtain-wrapper.open` class exists

### Problem: Assets Not Loading (404 Errors)

**Cause:** Server not running or serving from wrong directory  
**Solution:**
```bash
# Must serve from public/ directory
cd /path/to/repo
npm start
# or
php -S localhost:8000 -t public
```

### Problem: Blank/White Screenshots

**Cause:** JavaScript not executing or timing too short  
**Solution:** Increase wait time, check console for errors

### Problem: Mobile Screenshots Wrong Size

**Cause:** Device scale factor not set  
**Solution:** Use `deviceScaleFactor: 2` in Playwright or set DPR to 2 in DevTools

## Browser Compatibility

Screenshots captured using:
- **Browser:** Chromium (via Playwright)
- **Version:** Chrome Headless Shell 145.0.7632.6
- **Engine:** Playwright 1.58.0
- **Node.js:** v20.20.0

Rendering matches:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## File Sizes

### Desktop Screenshots
- Smallest: 527KB (homepage packages)
- Largest: 1.2MB (homepage hero)
- Average: ~700KB

### Mobile Screenshots  
- Smallest: 533KB (services page)
- Largest: 1.0MB (homepage)
- Average: ~790KB

### Total
- Total Size: ~15MB (all 22 screenshots)
- Optimized: PNG compression with good quality/size balance

## Future Updates

To update screenshots after making website changes:

1. Make desired changes to the website code
2. Start the development server: `npm start`
3. Run the screenshot script: `npm run screenshots`
4. Review captured screenshots in `docs/screenshots/`
5. Commit and push changes:
   ```bash
   git add docs/screenshots/
   git commit -m "Update website screenshots"
   git push
   ```

## Quality Assurance Checklist

Before committing new screenshots, verify:

- [ ] All 22 screenshots captured successfully
- [ ] Desktop screenshots show full page layouts
- [ ] Mobile screenshots demonstrate responsive design
- [ ] Chat widget visible and properly rendered in all states
- [ ] No curtain animation artifacts
- [ ] All content and features visible
- [ ] Proper directory structure maintained
- [ ] Documentation updated if needed
- [ ] File sizes reasonable (< 2MB each)
- [ ] Consistent naming convention used

## Related Documentation

- [FEATURES.md](FEATURES.md) - Complete feature list with screenshot references
- [CHAT-WIDGET-ENHANCEMENTS.md](CHAT-WIDGET-ENHANCEMENTS.md) - Chat widget details
- [AUTOMATION.md](AUTOMATION.md) - Build and automation scripts
- [screenshots/README.md](screenshots/README.md) - Screenshot catalog

---

**Maintained by:** Development Team  
**Update Frequency:** As needed when website changes  
**Status:** ✅ Current and documented
