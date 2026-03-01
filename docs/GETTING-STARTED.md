# 🚀 Getting Started Guide

Complete guide to setting up, configuring, and deploying your Aria Amore website from initial setup to production launch.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup & Installation](#initial-setup--installation)
3. [Running the Development Server](#running-the-development-server)
4. [Analytics & Marketing Setup](#analytics--marketing-setup)
5. [Testing & Validation](#testing--validation)
6. [Pre-Deployment Preparation](#pre-deployment-preparation)
7. [Production Deployment](#production-deployment)
8. [Post-Deployment](#post-deployment)
9. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before you begin, make sure you have:

- [ ] Git installed
- [ ] Code editor (VS Code, Sublime, etc.)
- [ ] Basic understanding of HTML, CSS, and command line
- [ ] Server access (for production deployment)
- [ ] Domain name registered (for production)
- [ ] Google Analytics account (or ability to create one)

---

## 🎯 Initial Setup & Installation

### 1.1 Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/Aria-Amore-Website-Core.git
cd Aria-Amore-Website-Core
```

### 1.2 Create Environment File

```bash
# Copy the example environment file
cp .env.example .env

# Edit with your values
nano .env
# or
vim .env
```

**Required environment variables:**
```env
# Site Configuration
SITE_NAME=Aria Amore
SITE_URL=https://ariaamore.com
SITE_EMAIL=info@ariaamore.com
SECURITY_EMAIL=security@ariaamore.com

# Analytics Configuration
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=1234567890123456
TIKTOK_PIXEL_ID=YOUR_ID
LINKEDIN_PARTNER_ID=YOUR_ID

# Email Configuration (if using email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**IMPORTANT:** Never commit `.env` to git! It's already in `.gitignore`.

### 1.3 Install Pre-Commit Hook

```bash
# Install git pre-commit hook for security
cp pre-commit-hook.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Test the hook
git status
```

**What this prevents:**
- Accidental commits of `.env` files
- Exposed API keys/passwords
- Invalid JSON files
- Debug statements in production code

---

## 🖥️ Running the Development Server

### 2.1 Start the Server

```bash
# Start development server
./start-dev-server.sh
```

The site will be available at: http://localhost:8000

### 2.2 Verify Pages Load

Open your browser and test all pages:
- [ ] Homepage: http://localhost:8000
- [ ] About page: http://localhost:8000/about.html
- [ ] Services page: http://localhost:8000/services.html
- [ ] Artists page: http://localhost:8000/artists.html
- [ ] Privacy Policy: http://localhost:8000/privacy-policy.html
- [ ] Terms of Service: http://localhost:8000/terms-of-service.html
- [ ] 404 page: http://localhost:8000/nonexistent (should show error page)

### 2.3 Check for Console Errors

1. Open Developer Tools (F12)
2. Go to Console tab
3. Verify no red error messages
4. Check Network tab for failed requests

---

## 📊 Analytics & Marketing Setup

### 3.1 Get Your Tracking IDs (10 minutes)

#### Google Analytics 4 (Required)
1. Go to [analytics.google.com](https://analytics.google.com/)
2. Create account or sign in
3. Click "Admin" → "Create Property"
4. Name: "Aria Amore Website"
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

#### Facebook Pixel (Optional - for Instagram/Facebook ads)
1. Go to [business.facebook.com/events_manager](https://business.facebook.com/events_manager/)
2. Click "Connect Data Sources" → "Web" → "Facebook Pixel"
3. Name: "Aria Amore Website"
4. Copy your **Pixel ID** (16-digit number)

#### TikTok Pixel (Optional - for TikTok ads)
1. Go to [ads.tiktok.com](https://ads.tiktok.com/)
2. Navigate to "Assets" → "Events"
3. Click "Web Events" → "Set Up Web Events" → "TikTok Pixel"
4. Copy your **Pixel ID**

### 3.2 Add Analytics to Your Website (5 minutes)

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

### 3.3 Test Analytics Setup (5 minutes)

1. **Open your website** in a browser (http://localhost:8000)
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

### 3.4 Update Environment Variables

Add your IDs to `.env` file:

```env
# Analytics Configuration
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=1234567890123456
TIKTOK_PIXEL_ID=YOUR_ID
LINKEDIN_PARTNER_ID=YOUR_ID
```

### 3.5 What You Get Automatically

**Automatic Tracking:**
- ✅ Page views on all pages
- ✅ CTA button clicks
- ✅ Form submissions
- ✅ External link clicks
- ✅ Video/audio plays
- ✅ Scroll depth (25%, 50%, 75%, 100%)

**Social Media Features:**
- ✅ Welcome banners for social media visitors
- ✅ UTM tracking links ready to use
- ✅ Social share buttons (if enabled on page)
- ✅ Campaign attribution

**Conversion Tracking:**
- ✅ Contact form submissions
- ✅ Booking requests
- ✅ Phone number clicks
- ✅ Email link clicks

### 3.6 Set Up Conversion Goals (10 minutes)

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

### 3.7 Add Tracking to Social Media Bios (Optional)

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

---

## 🧪 Testing & Validation

### 4.1 Run Comprehensive Tests

```bash
# In another terminal, run comprehensive tests
./test-site.sh http://localhost:8000
```

**Verify:**
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms function (if applicable)
- [ ] No console errors
- [ ] Responsive design verified (test on mobile/tablet)

### 4.2 Security Verification

```bash
# Check for exposed secrets
grep -r "api_key\|password\|secret\|token" . \
  --include="*.html" --include="*.js" --include="*.css" \
  --include="*.json" --exclude-dir=node_modules

# Should return no matches or only safe references
```

### 4.3 Manual Testing Checklist

**Functionality:**
- [ ] All links work
- [ ] Forms submit successfully
- [ ] Contact methods work (phone, email)
- [ ] Images load properly
- [ ] Videos/audio play correctly

**Responsive Design:**
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

**Cross-Browser Testing:**
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

---

## 🔒 Pre-Deployment Preparation

### 5.1 Create Production Environment File

```bash
# Copy template
cp .env.example .env.production

# Edit with your production values
nano .env.production
```

**Update these values for production:**
```env
SITE_URL=https://ariaamore.com  # Production URL
SITE_EMAIL=info@ariaamore.com   # Production email
SECURITY_EMAIL=security@ariaamore.com
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX  # Production GA4 ID
```

### 5.2 Review Security Checklist

- [ ] `.env` file not committed to git
- [ ] No API keys in HTML/JS files
- [ ] No debug statements in production code
- [ ] Pre-commit hook installed
- [ ] `.htaccess` configured with security headers
- [ ] `robots.txt` and `sitemap.xml` ready

### 5.3 Final Code Review

```bash
# Check git status
git status

# Review recent changes
git --no-pager log --oneline -10

# Verify no sensitive data
git --no-pager diff HEAD~5
```

---

## 🌐 Production Deployment

### Phase 1: Domain & Hosting Setup (1 day)

#### 6.1 Domain Configuration
Contact your domain registrar:
```
Update nameservers to point to your hosting provider
```

#### 6.2 DNS Records
Ask your hosting provider to set up:
```
A Record:     ariaamore.com      → Your Server IP
CNAME Record: www.ariaamore.com  → ariaamore.com
MX Records:   (For email - if needed)
TXT Records:  SPF, DKIM, DMARC (for email security)
```

#### 6.3 Email Security (if using email)
```
SPF:  v=spf1 include:sendgrid.net ~all
DKIM: (Generate from your email provider)
DMARC: v=DMARC1; p=quarantine; rua=mailto:security@ariaamore.com
```

### Phase 2: SSL/HTTPS Setup (1 hour)

#### 6.4 Install SSL Certificate

**Option A: Let's Encrypt (Free & Recommended)**
```bash
# On server, install Certbot
sudo apt-get install certbot python3-certbot-apache

# Generate certificate
sudo certbot certonly --apache -d ariaamore.com -d www.ariaamore.com

# Auto-renew (runs automatically)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

**Option B: Commercial Certificate**
Follow your certificate provider's installation instructions.

#### 6.5 Verify HTTPS
Visit these URLs in your browser:
- https://ariaamore.com (should work)
- http://ariaamore.com (should redirect to https)
- https://www.ariaamore.com (should work)

**Check certificate validity:**
```bash
echo | openssl s_client -servername ariaamore.com -connect ariaamore.com:443 2>/dev/null | \
  openssl x509 -noout -dates
```

### Phase 3: Server Configuration (2 hours)

#### 6.6 Apache Setup
```bash
# Enable required modules
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod deflate
sudo a2enmod expires

# Reload Apache
sudo systemctl reload apache2
```

#### 6.7 Virtual Host Configuration
Follow instructions in [PRODUCTION-SETUP.md](PRODUCTION-SETUP.md) to:
- Create Apache virtual host
- Set document root
- Configure SSL
- Enable .htaccess overrides

#### 6.8 File Permissions
```bash
# Set correct permissions on server
cd /var/www/html/aria-amore

# Directory permissions
find . -type d -exec chmod 755 {} \;

# File permissions
find . -type f -exec chmod 644 {} \;

# Keep .env secure
chmod 600 .env

# Scripts executable
chmod 755 *.sh
```

### Phase 4: Deploy Files to Server

```bash
# Upload files via SCP, SFTP, or git
# Example with rsync:
rsync -avz --exclude='.env' --exclude='.git' \
  . user@your-server:/var/www/html/aria-amore/

# Or with git on server:
cd /var/www/html/aria-amore
git pull origin main
cp .env.production .env
```

### Phase 5: Production Testing (2 hours)

#### 6.9 Functionality Testing
```bash
# Test from different locations
curl -I https://ariaamore.com  # Should return 200
curl -L http://ariaamore.com   # Should redirect to https
```

#### 6.10 Security Headers Verification
Visit: https://securityheaders.com/?q=ariaamore.com

You should see:
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Strict-Transport-Security
- ✅ Content-Security-Policy

#### 6.11 Performance Testing
Visit: https://gtmetrix.com

Enter your URL and check:
- Grade A or B minimum
- Page load time < 3 seconds
- Fully loaded time < 5 seconds

#### 6.12 SEO Testing
Visit: https://search.google.com/search-console
- Add your domain
- Submit sitemap: https://ariaamore.com/sitemap.xml
- Verify no crawl errors
- Check coverage

#### 6.13 Mobile Testing
```bash
# Test responsive design
# Visit on actual devices or use DevTools
# Check:
# - Layout is responsive
# - Touch targets are accessible
# - Performance is acceptable
```

#### 6.14 Analytics Verification on Production

1. Visit your production site
2. Open Developer Console
3. Verify analytics tracking works
4. Check Google Analytics Realtime
5. Test a conversion event

---

## 📈 Post-Deployment

### Phase 6: Monitoring & Backups (1 day)

#### 7.1 Set Up Automated Backups
```bash
# Test backup script locally
./backup.sh

# Verify backup
ls -lh /backups/aria-amore/

# Add to server crontab
sudo crontab -e

# Add this line for daily 2 AM backup:
0 2 * * * /var/www/html/aria-amore/backup.sh >> /var/log/aria-amore-backup.log 2>&1
```

#### 7.2 Set Up Health Monitoring
```bash
# Test health check
./health-check.sh --once

# Add to crontab for every 5 minutes
*/5 * * * * /var/www/html/aria-amore/health-check.sh --once >> /var/log/aria-amore-health.log 2>&1
```

#### 7.3 Set Up External Monitoring
Sign up for one of:
- **UptimeRobot** (https://uptimerobot.com) - Free tier available
- **StatusCake** (https://www.statuscake.com)
- **Pingdom** (https://www.pingdom.com)

Configure to check: https://ariaamore.com every 5 minutes

#### 7.4 Log Monitoring
```bash
# Monitor error logs
tail -f /var/log/apache2/error.log

# Monitor access logs
tail -f /var/log/apache2/access.log

# Check for suspicious activity
grep "error\|warning" /var/log/apache2/error.log | tail -20
```

### Phase 7: Email & Forms Configuration (1 hour, if applicable)

#### 7.5 Email Service Setup
If your site has contact forms:

**Option A: SendGrid**
1. Create SendGrid account
2. Generate API key
3. Add to .env: `SENDGRID_API_KEY=your-key`
4. Update form handler to use SendGrid

**Option B: Gmail SMTP**
1. Generate app password (not regular password)
2. Add to .env:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```

#### 7.6 Test Email Delivery
```bash
# Send test email
echo "Test" | mail -s "Test Subject" info@ariaamore.com

# Check if received and not in spam
```

### Phase 8: SEO & Search Engines (1 day)

#### 7.7 Google Search Console
1. Go to https://search.google.com/search-console
2. Add property for ariaamore.com
3. Verify ownership
4. Submit sitemap: https://ariaamore.com/sitemap.xml
5. Monitor crawl errors
6. Check coverage

#### 7.8 Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Verify ownership
4. Submit sitemap

### Phase 9: Security Hardening (1 day)

#### 7.9 Disable Unnecessary Services
```bash
# Keep only essential services running
sudo systemctl disable unnecessary_service
sudo systemctl stop unnecessary_service
```

#### 7.10 Configure Firewall
```bash
# Allow only necessary ports
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

#### 7.11 Set Up Fail2Ban
```bash
# Install Fail2Ban to prevent brute force attacks
sudo apt-get install fail2ban

# Enable and start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

#### 7.12 Regular Updates
```bash
# Enable automatic security updates
sudo apt-get install unattended-upgrades

# Configure and enable
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## ✅ Complete Launch Checklist

### Pre-Launch Verification
- [ ] All pages tested and working locally
- [ ] Analytics configured and tested
- [ ] `.env` file created with production values (not committed)
- [ ] SSL certificate installed and valid
- [ ] DNS records configured
- [ ] `.htaccess` uploaded and configured
- [ ] `robots.txt` and `sitemap.xml` accessible
- [ ] Security headers verified via securityheaders.com
- [ ] Performance acceptable via gtmetrix.com
- [ ] Pre-commit hook installed

### Post-Launch Verification
- [ ] Site accessible at https://ariaamore.com
- [ ] HTTP redirects to HTTPS
- [ ] www subdomain works
- [ ] 404 page works
- [ ] Forms submit successfully (if applicable)
- [ ] Email notifications working
- [ ] Analytics tracking verified in GA4 Realtime
- [ ] Conversion events tracking
- [ ] Backups automated and verified
- [ ] Health monitoring active
- [ ] Google Search Console configured
- [ ] Bing Webmaster Tools configured
- [ ] Firewall configured
- [ ] Fail2Ban active

### Ongoing Maintenance (Weekly)
- [ ] Review error logs
- [ ] Verify backups running
- [ ] Check monitoring alerts
- [ ] Spot-check performance
- [ ] Test forms/contact methods
- [ ] Review analytics data
- [ ] Check conversion rates

### Ongoing Maintenance (Monthly)
- [ ] Review security logs
- [ ] Check uptime statistics
- [ ] Test disaster recovery
- [ ] Update documentation
- [ ] Plan any improvements
- [ ] Review analytics trends
- [ ] Optimize low-performing pages

---

## 🆘 Troubleshooting

### Site Not Loading
```bash
# Check if Apache is running
sudo systemctl status apache2

# Check error logs
tail -f /var/log/apache2/error.log

# Check document root
ls -la /var/www/html/aria-amore/

# Verify .htaccess syntax
apache2ctl configtest
```

### HTTPS Not Working
```bash
# Verify certificate
certbot certificates

# Check certificate dates
openssl x509 -in /etc/letsencrypt/live/ariaamore.com/fullchain.pem -text -noout | grep -A2 Validity

# Renew if needed
certbot renew
```

### Forms Not Working
```bash
# Check email configuration
grep "SMTP\|EMAIL" .env

# Test email from command line
echo "Test" | mail -s "Test" info@ariaamore.com

# Check mail logs
tail -f /var/log/mail.log
```

### Performance Slow
```bash
# Check server resources
free -h
top -b -n 1 | head -20

# Check cache headers
curl -I https://ariaamore.com | grep -i cache

# Enable GZIP compression
grep "DEFLATE" /var/www/html/aria-amore/.htaccess
```

### Analytics Not Working

**Check these:**
1. ✅ Script is loaded: View page source, search for "analytics.js"
2. ✅ IDs are correct: Check meta tags, verify format
3. ✅ No errors in console: Open Developer Tools, check for red errors
4. ✅ Ad blocker disabled: Temporarily disable to test
5. ✅ Debug mode enabled: Add `<meta name="analytics-debug" content="true">`

### No Events Showing

1. Click a button or CTA
2. Check console for `[Analytics] Event tracked`
3. If no message, verify analytics.js is loaded
4. Wait 5-10 minutes for data to appear in GA4

### Real-Time Not Showing Visits

1. Visit your website in an incognito/private window
2. Check that you're not blocking analytics with browser settings
3. Verify your GA4 Measurement ID is correct
4. Wait 30-60 seconds for data to appear

---

## 📊 Viewing Your Analytics Data

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

---

## 📚 Additional Resources

### Documentation
- [PRODUCTION-SETUP.md](PRODUCTION-SETUP.md) - Detailed server configuration
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment procedures
- [SECURITY.md](SECURITY.md) - Security policies and best practices
- [TESTING.md](TESTING.md) - Comprehensive testing guide
- [ANALYTICS-SETUP.md](ANALYTICS-SETUP.md) - Advanced analytics configuration
- [CTA-STRATEGY.md](CTA-STRATEGY.md) - Conversion optimization strategies
- [SOCIAL-MEDIA-INTEGRATION.md](SOCIAL-MEDIA-INTEGRATION.md) - Social media posting guide
- [DEPENDENCIES-MANAGEMENT.md](DEPENDENCIES-MANAGEMENT.md) - Managing code dependencies

### Monitoring & Testing Tools
- Security Headers: https://securityheaders.com
- Performance: https://gtmetrix.com
- SSL Labs: https://www.ssllabs.com/ssltest/
- PageSpeed: https://pagespeed.web.dev
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com

### Help & Support
- **Email**: info@ariaamore.com
- **Security Issues**: security@ariaamore.com
- **Documentation**: Check the `/docs/` folder
- **Analytics Help**: [Google Analytics Help Center](https://support.google.com/analytics)

---

## 🚀 Advanced Features (Optional)

Once you're comfortable with the basics:

1. **Set up Google Tag Manager** - Advanced tracking control
2. **Create custom dashboards** - Visualize your data
3. **Set up automated reports** - Email summaries weekly
4. **A/B test CTAs** - Optimize conversion rates
5. **Track customer journey** - See full path to booking
6. **Advanced social media automation** - Schedule posts with tracking
7. **Custom conversion funnels** - Track booking process

See individual documentation files for these advanced topics.

---

## ⏱️ Time Investment Summary

| Phase | Time Required |
|-------|---------------|
| Initial Setup & Installation | 30 minutes |
| Analytics & Marketing Setup | 30 minutes |
| Testing & Validation | 1-2 hours |
| Domain & Hosting Setup | 1 day |
| SSL Setup | 1 hour |
| Server Configuration | 2 hours |
| Production Testing | 2 hours |
| Monitoring & Backups | 1 day |
| Email Configuration | 1 hour |
| SEO Setup | 1 day |
| Security Hardening | 1 day |
| **Total** | **5-7 days** |

**Quick Development Setup:** 1 hour to start developing locally with analytics

**Full Production Launch:** 5-7 days for complete production-ready deployment

---

**🎉 Congratulations!** You now have a complete, production-ready website with professional analytics and monitoring!

Last Updated: December 25, 2025
