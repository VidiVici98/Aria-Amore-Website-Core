#!/usr/bin/env node

/**
 * Screenshot Capture Script
 * 
 * Captures screenshots of all pages after curtain animation completes.
 * 
 * Usage:
 *   node scripts/capture-screenshots.js [server-url]
 * 
 * Example:
 *   node scripts/capture-screenshots.js http://localhost:8000
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Configuration
const SERVER_URL = process.argv[2] || 'http://localhost:8000';
const SCREENSHOT_DIR = path.join(__dirname, '../docs/screenshots');
const VIEWPORT_DESKTOP = { width: 1280, height: 720 };
const VIEWPORT_MOBILE = { width: 375, height: 667 };

// Timing configuration
const CURTAIN_ANIMATION_WAIT_MS = 3000; // Wait for curtain animation (100ms delay + 2s animation + buffer)

// Pages to screenshot
const PAGES = [
  { url: '/index.html', filename: '01-homepage-hero.png', description: 'Homepage Hero', scrollY: 0 },
  { url: '/index.html', filename: '01-homepage-packages.png', description: 'Homepage Packages Section', scrollY: 800 },
  { url: '/about.html', filename: '02-about-page.png', description: 'About Page' },
  { url: '/services.html', filename: '03-services-page.png', description: 'Services Page' },
  { url: '/artists.html', filename: '04-artists-page.png', description: 'Artists Page' },
  { url: '/repertoire.html', filename: '05-repertoire-page.png', description: 'Repertoire Page' },
  { url: '/events.html', filename: '06-events-page.png', description: 'Events Page' },
  { url: '/gallery.html', filename: '07-gallery-page.png', description: 'Gallery Page' },
  { url: '/contact.html', filename: '08-contact-page.png', description: 'Contact Page' },
  { url: '/privacy-policy.html', filename: '09-privacy-policy-page.png', description: 'Privacy Policy' },
  { url: '/terms-of-service.html', filename: '10-terms-of-service-page.png', description: 'Terms of Service' }
];

// Homepage sections for sections/ subfolder
const HOMEPAGE_SECTIONS = [
  { filename: 'sections/homepage-section-1-hero.png', description: 'Homepage Section 1 - Hero', scrollY: 0 },
  { filename: 'sections/homepage-section-2-packages.png', description: 'Homepage Section 2 - Packages', scrollY: 800 }
];

// Mobile screenshots
const MOBILE_PAGES = [
  { url: '/index.html', filename: 'mobile/01-homepage-mobile.png', description: 'Homepage (Mobile)', scrollY: 0 },
  { url: '/contact.html', filename: 'mobile/02-contact-mobile.png', description: 'Contact Page (Mobile)' },
  { url: '/artists.html', filename: 'mobile/03-artists-mobile.png', description: 'Artists Page (Mobile)' },
  { url: '/services.html', filename: 'mobile/04-services-mobile.png', description: 'Services Page (Mobile)' },
  { url: '/index.html', filename: 'mobile/05-chat-widget-button.png', description: 'Chat Widget Button (Mobile)', scrollY: 0 }
];

// Chat widget screenshots (desktop)
const CHAT_WIDGET_DESKTOP = [
  { url: '/index.html', filename: 'chat-widget-collapsed.png', description: 'Chat Widget Collapsed (Desktop)', action: 'collapsed' },
  { url: '/index.html', filename: 'chat-widget-expanded.png', description: 'Chat Widget Expanded (Desktop)', action: 'expanded' }
];

// Chat widget screenshots (mobile)
const CHAT_WIDGET_MOBILE = [
  { url: '/index.html', filename: 'mobile/chat-widget-collapsed.png', description: 'Chat Widget Collapsed (Mobile)', action: 'collapsed' },
  { url: '/index.html', filename: 'mobile/chat-widget-expanded.png', description: 'Chat Widget Expanded (Mobile)', action: 'expanded' }
];

async function captureScreenshots() {
  console.log('📸 Aria Amore Screenshot Capture');
  console.log('================================\n');
  console.log(`Server URL: ${SERVER_URL}`);
  console.log(`Desktop Viewport: ${VIEWPORT_DESKTOP.width}x${VIEWPORT_DESKTOP.height}`);
  console.log(`Mobile Viewport: ${VIEWPORT_MOBILE.width}x${VIEWPORT_MOBILE.height}`);
  console.log(`Output Directory: ${SCREENSHOT_DIR}\n`);

  // Track success/failure
  let totalScreenshots = 0;
  let successfulScreenshots = 0;
  let failedScreenshots = 0;

  // Ensure screenshot directories exist
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    console.log(`Creating screenshot directory: ${SCREENSHOT_DIR}`);
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
  
  const sectionsDir = path.join(SCREENSHOT_DIR, 'sections');
  if (!fs.existsSync(sectionsDir)) {
    console.log(`Creating sections directory: ${sectionsDir}`);
    fs.mkdirSync(sectionsDir, { recursive: true });
  }

  const mobileDir = path.join(SCREENSHOT_DIR, 'mobile');
  if (!fs.existsSync(mobileDir)) {
    console.log(`Creating mobile directory: ${mobileDir}`);
    fs.mkdirSync(mobileDir, { recursive: true });
  }

  // Launch browser
  console.log('→ Launching browser...');
  const browser = await chromium.launch({
    headless: true
  });

  try {
    // Helper function to capture a screenshot with optional scroll
    async function capturePageScreenshot(context, url, outputPath, description, scrollY = 0) {
      console.log(`   URL: ${url}`);
      if (scrollY > 0) {
        console.log(`   📜 Scroll position: ${scrollY}px`);
      }

      try {
        const page = await context.newPage();
        
        // Navigate to page
        await page.goto(url, { 
          waitUntil: 'networkidle',
          timeout: 30000
        });

        // CRITICAL: Wait for curtain animation to complete
        console.log(`   ⏳ Waiting for curtain animation to complete (${CURTAIN_ANIMATION_WAIT_MS/1000} seconds)...`);
        await page.waitForTimeout(CURTAIN_ANIMATION_WAIT_MS);

        // Additional check: ensure curtain wrapper has 'open' class
        await page.waitForSelector('.curtain-wrapper.open', { 
          timeout: 5000,
          state: 'attached'
        }).catch(() => {
          console.log('   ⚠️  Curtain wrapper not found or not opened (may not have curtain animation)');
        });

        // Scroll if needed
        if (scrollY > 0) {
          await page.evaluate((y) => window.scrollTo(0, y), scrollY);
          await page.waitForTimeout(500); // Wait for scroll to complete
        }

        // Take screenshot
        console.log('   📷 Capturing screenshot...');
        await page.screenshot({
          path: outputPath,
          type: 'png',
          fullPage: false  // Viewport only for consistency
        });

        console.log(`   ✓ Saved: ${path.basename(outputPath)}`);
        await page.close();
        return true;

      } catch (error) {
        console.error(`   ❌ Error capturing ${description}:`, error.message);
        return false;
      }
    }

    // Helper function to capture chat widget screenshots
    async function captureChatWidgetScreenshot(context, url, outputPath, description, action) {
      console.log(`   URL: ${url}`);
      console.log(`   Action: ${action}`);

      try {
        const page = await context.newPage();
        
        // Navigate to page
        await page.goto(url, { 
          waitUntil: 'networkidle',
          timeout: 30000
        });

        // CRITICAL: Wait for curtain animation and chat widget to load
        console.log(`   ⏳ Waiting for curtain animation and chat widget...`);
        await page.waitForTimeout(CURTAIN_ANIMATION_WAIT_MS);

        // Wait for chat button to be visible
        await page.waitForSelector('.fallback-chat-button', {
          timeout: 5000,
          state: 'visible'
        });

        if (action === 'expanded') {
          // Click the chat button to open the modal
          console.log('   🖱️  Opening chat modal...');
          
          // Use JavaScript to trigger the click event directly
          await page.evaluate(() => {
            const button = document.querySelector('.fallback-chat-button');
            if (button) {
              button.click();
            }
          });
          
          // Wait for modal to appear
          await page.waitForSelector('.contact-modal', {
            timeout: 5000,
            state: 'visible'
          });
          
          // Wait a bit for animations to complete
          await page.waitForTimeout(500);
        }

        // Take screenshot
        console.log('   📷 Capturing screenshot...');
        await page.screenshot({
          path: outputPath,
          type: 'png',
          fullPage: false
        });

        console.log(`   ✓ Saved: ${path.basename(outputPath)}`);
        await page.close();
        return true;

      } catch (error) {
        console.error(`   ❌ Error capturing ${description}:`, error.message);
        return false;
      }
    }

    // ========================================
    // DESKTOP SCREENSHOTS
    // ========================================
    console.log('\n\n=== DESKTOP SCREENSHOTS ===\n');
    const desktopContext = await browser.newContext({
      viewport: VIEWPORT_DESKTOP,
      deviceScaleFactor: 1
    });

    // Capture main pages
    for (let i = 0; i < PAGES.length; i++) {
      const pageInfo = PAGES[i];
      const url = `${SERVER_URL}${pageInfo.url}`;
      const outputPath = path.join(SCREENSHOT_DIR, pageInfo.filename);

      console.log(`\n[${i + 1}/${PAGES.length}] ${pageInfo.description}`);
      totalScreenshots++;
      const success = await capturePageScreenshot(desktopContext, url, outputPath, pageInfo.description, pageInfo.scrollY || 0);
      if (success) {
        successfulScreenshots++;
      } else {
        failedScreenshots++;
      }
    }

    // Capture homepage sections
    console.log('\n\n=== Homepage Sections (Desktop) ===\n');
    for (let i = 0; i < HOMEPAGE_SECTIONS.length; i++) {
      const sectionInfo = HOMEPAGE_SECTIONS[i];
      const url = `${SERVER_URL}/index.html`;
      const outputPath = path.join(SCREENSHOT_DIR, sectionInfo.filename);

      console.log(`\n[Section ${i + 1}/${HOMEPAGE_SECTIONS.length}] ${sectionInfo.description}`);
      totalScreenshots++;
      const success = await capturePageScreenshot(desktopContext, url, outputPath, sectionInfo.description, sectionInfo.scrollY);
      if (success) {
        successfulScreenshots++;
      } else {
        failedScreenshots++;
      }
    }

    await desktopContext.close();

    // ========================================
    // MOBILE SCREENSHOTS
    // ========================================
    console.log('\n\n=== MOBILE SCREENSHOTS ===\n');
    const mobileContext = await browser.newContext({
      viewport: VIEWPORT_MOBILE,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });

    // Capture mobile pages
    for (let i = 0; i < MOBILE_PAGES.length; i++) {
      const pageInfo = MOBILE_PAGES[i];
      const url = `${SERVER_URL}${pageInfo.url}`;
      const outputPath = path.join(SCREENSHOT_DIR, pageInfo.filename);

      console.log(`\n[${i + 1}/${MOBILE_PAGES.length}] ${pageInfo.description}`);
      totalScreenshots++;
      const success = await capturePageScreenshot(mobileContext, url, outputPath, pageInfo.description, pageInfo.scrollY || 0);
      if (success) {
        successfulScreenshots++;
      } else {
        failedScreenshots++;
      }
    }

    await mobileContext.close();

    // ========================================
    // CHAT WIDGET SCREENSHOTS (DESKTOP)
    // ========================================
    console.log('\n\n=== CHAT WIDGET SCREENSHOTS (Desktop) ===\n');
    const desktopChatContext = await browser.newContext({
      viewport: VIEWPORT_DESKTOP,
      deviceScaleFactor: 1
    });

    for (let i = 0; i < CHAT_WIDGET_DESKTOP.length; i++) {
      const widgetInfo = CHAT_WIDGET_DESKTOP[i];
      const url = `${SERVER_URL}${widgetInfo.url}`;
      const outputPath = path.join(SCREENSHOT_DIR, widgetInfo.filename);

      console.log(`\n[${i + 1}/${CHAT_WIDGET_DESKTOP.length}] ${widgetInfo.description}`);
      totalScreenshots++;
      const success = await captureChatWidgetScreenshot(desktopChatContext, url, outputPath, widgetInfo.description, widgetInfo.action);
      if (success) {
        successfulScreenshots++;
      } else {
        failedScreenshots++;
      }
    }

    await desktopChatContext.close();

    // ========================================
    // CHAT WIDGET SCREENSHOTS (MOBILE)
    // ========================================
    console.log('\n\n=== CHAT WIDGET SCREENSHOTS (Mobile) ===\n');
    const mobileChatContext = await browser.newContext({
      viewport: VIEWPORT_MOBILE,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });

    for (let i = 0; i < CHAT_WIDGET_MOBILE.length; i++) {
      const widgetInfo = CHAT_WIDGET_MOBILE[i];
      const url = `${SERVER_URL}${widgetInfo.url}`;
      const outputPath = path.join(SCREENSHOT_DIR, widgetInfo.filename);

      console.log(`\n[${i + 1}/${CHAT_WIDGET_MOBILE.length}] ${widgetInfo.description}`);
      totalScreenshots++;
      const success = await captureChatWidgetScreenshot(mobileChatContext, url, outputPath, widgetInfo.description, widgetInfo.action);
      if (success) {
        successfulScreenshots++;
      } else {
        failedScreenshots++;
      }
    }

    await mobileChatContext.close();

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }

  console.log('\n================================');
  console.log('✅ Screenshot capture complete!');
  console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}`);
  console.log(`Desktop pages: ${PAGES.length}`);
  console.log(`Desktop sections: ${HOMEPAGE_SECTIONS.length}`);
  console.log(`Mobile pages: ${MOBILE_PAGES.length}`);
  console.log(`Chat widget (desktop): ${CHAT_WIDGET_DESKTOP.length}`);
  console.log(`Chat widget (mobile): ${CHAT_WIDGET_MOBILE.length}`);
  console.log(`\n📊 Results:`);
  console.log(`   Total: ${totalScreenshots}`);
  console.log(`   Successful: ${successfulScreenshots}`);
  console.log(`   Failed: ${failedScreenshots}`);
  
  if (failedScreenshots > 0) {
    console.log(`\n⚠️  Warning: ${failedScreenshots} screenshot(s) failed to capture`);
    console.log('   Please check the error messages above for details.');
    return false;
  }
  
  console.log('\n✅ All screenshots captured successfully!\n');
  return true;
}

// Main execution
(async () => {
  try {
    const success = await captureScreenshots();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
