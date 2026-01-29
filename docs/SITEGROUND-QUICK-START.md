# 🚀 SiteGround Quick Start Guide

## 5-Minute SiteGround Deployment

### Prerequisites
✅ SiteGround hosting account active
✅ Domain pointed to SiteGround
✅ cPanel login credentials ready

---

## Step 1: Prepare Deployment Package (2 minutes)

On your local computer:

```bash
# Generate SiteGround deployment package
npm run deploy:siteground

# This creates: aria-amore-siteground-YYYYMMDD_HHMMSS.zip
```

Extract the ZIP file locally. You'll see:
```
├── public_html/          ← All your website files
├── config/
│   └── .env.example      ← Configuration template
├── docs/
└── DEPLOYMENT-INSTRUCTIONS.txt
```

---

## Step 2: Upload to SiteGround (2 minutes)

### Using cPanel File Manager (Easiest):

1. **Login to cPanel**
   - Go to: my.siteground.com
   - Click "Site Tools" → "File Manager"
   - Navigate to `public_html/`

2. **Clean Directory**
   - Delete any default files (index.html, cgi-bin, etc.)

3. **Upload Files**
   - Click "Upload" button
   - Select ALL files from extracted `public_html/` folder
   - Wait for upload to complete
   - **Important**: Show hidden files (top-right settings) and verify `.htaccess` is uploaded

---

## Step 3: Configure Email (1 minute)

1. **Create Email Account**
   - Site Tools → Email → Accounts
   - Create: `no-reply@yourdomain.com`
   - Set a strong password
   - Save it (you'll need it next)

2. **Create .env File**
   - File Manager → public_html
   - Create new file: `.env`
   - Copy contents from `config/.env.example`
   - Update these lines:
   ```env
   SITE_URL=https://yourdomain.com
   SITE_EMAIL=info@yourdomain.com
   SMTP_USER=no-reply@yourdomain.com
   SMTP_PASS=your-password-from-step-1
   ```
   - Save and set permissions to 600

---

## Step 4: Enable SSL (30 seconds)

1. Site Tools → Security → SSL Manager
2. Select your domain
3. Click "Get" (for Let's Encrypt - Free)
4. Wait 30 seconds
5. ✅ Done! HTTPS is now active

---

## Step 5: Test Your Site (30 seconds)

Open in browser:
- ✅ https://yourdomain.com (should load)
- ✅ http://yourdomain.com (should redirect to HTTPS)
- ✅ Test navigation (about, services, artists pages)
- ✅ Submit contact form
- ✅ Check email delivery

---

## 🎉 That's It!

Your site is now **LIVE and SECURE** on SiteGround!

---

## Optional Enhancements

### Enable SuperCacher (Performance Boost)
1. Site Tools → Speed → Caching
2. Enable "Dynamic Cache"
3. Enable "Static Cache"
4. ✅ 2x faster load times!

### Enable Cloudflare (Global CDN)
1. Site Tools → Speed → Cloudflare
2. Enable Cloudflare
3. ✅ Faster worldwide access!

### Set Up Monitoring
1. Sign up: https://uptimerobot.com (Free)
2. Add monitor: https://yourdomain.com
3. Set alert email
4. ✅ Get notified if site goes down!

---

## Common Issues

### ❌ "500 Internal Server Error"
**Solution**: Check .htaccess file was uploaded correctly
```bash
# Via File Manager, verify public_html/.htaccess exists
# If not, upload it from your deployment package
```

### ❌ Email Not Sending
**Solution**: Check .env configuration
```bash
# File Manager → public_html/.env
# Verify SMTP_USER and SMTP_PASS are correct
# Make sure email account exists in Site Tools → Email
```

### ❌ CSS/Images Not Loading
**Solution**: Check file permissions
```bash
# File Manager → Select all files
# Right-click → Change Permissions
# Files: 644, Folders: 755
```

### ❌ "This site can't be reached"
**Solution**: Check DNS settings
```bash
# Verify domain nameservers point to SiteGround
# Can take 24-48 hours to propagate
# Check status: https://www.whatsmydns.net
```

---

## Need More Help?

### Documentation
- 📖 [Full Deployment Guide](./SITEGROUND-DEPLOYMENT.md)
- 📋 [Production Checklist](./PRODUCTION-CHECKLIST.md)
- 🔒 [Security Guide](./SECURITY.md)

### Support
- 💬 **SiteGround**: 24/7 chat/phone (via cPanel)
- 📧 **Project**: security@ariaamore.com
- 🐛 **Issues**: GitHub Issues

---

## Next Steps

Now that your site is live:

1. **Submit Sitemap** to Google
   - Go to: https://search.google.com/search-console
   - Add property: yourdomain.com
   - Submit sitemap: /sitemap.xml

2. **Set Up Analytics**
   - Get Google Analytics ID
   - Add to `.env`: `GOOGLE_ANALYTICS_ID=UA-XXXXX-X`

3. **Create Backups**
   - SiteGround does daily auto-backups
   - Also download manual backup monthly

4. **Monitor Performance**
   - Test at: https://gtmetrix.com
   - Aim for: Grade A, Load time < 2s

5. **Review Security**
   - Test at: https://securityheaders.com
   - Aim for: Grade A or A+

---

**🚀 Your site is production-ready and optimized for SiteGround!**

*Deployment time: ~5 minutes*
*Setup completed: [Date]* _____________
