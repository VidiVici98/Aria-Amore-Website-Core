# 🎯 Production Deployment Checklist

## Pre-Deployment

### Local Preparation
- [ ] Run full test suite: `npm test` or `./scripts/test.sh`
- [ ] Run security check: `npm run security` or `./scripts/security-check.sh`
- [ ] Validate all content: `npm run content:validate`
- [ ] Create local backup: `npm run backup`
- [ ] Review and commit all changes
- [ ] Create deployment package: `npm run deploy:siteground`

### Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Update site URL in `.env`
- [ ] Configure SMTP settings for your hosting provider
- [ ] Set security email address
- [ ] Add analytics IDs (optional)

### SiteGround Account Setup
- [ ] SiteGround account active
- [ ] Domain name configured and pointing to SiteGround
- [ ] cPanel credentials available
- [ ] SSL certificate installed (Let's Encrypt via cPanel)
- [ ] Email accounts created (no-reply@, info@, security@)

## Deployment to SiteGround

### Method 1: File Manager (Recommended for First-Time)
1. **Login to cPanel**
   - [ ] Access SiteGround cPanel
   - [ ] Navigate to File Manager
   - [ ] Go to `public_html` directory

2. **Clean Existing Files**
   - [ ] Backup any existing files (if needed)
   - [ ] Delete default files (index.html, cgi-bin, etc.)

3. **Upload New Files**
   - [ ] Extract your deployment package locally
   - [ ] Upload ALL files from `public_html/` folder
   - [ ] Verify `.htaccess` is uploaded (Show Hidden Files)
   - [ ] Upload `sendmail.php`
   - [ ] Upload `vendor/` directory
   - [ ] Upload `PHPMailer/` directory

4. **Set Permissions**
   - [ ] Files: 644 (Select All Files → Change Permissions)
   - [ ] Directories: 755
   - [ ] `.env`: 600 (if using)

### Method 2: FTP/SFTP
1. **Configure FTP Client**
   - [ ] Install FileZilla or similar
   - [ ] Create connection with SiteGround credentials
   - [ ] Connect to server

2. **Upload Files**
   - [ ] Navigate to `/public_html`
   - [ ] Upload all files maintaining directory structure
   - [ ] Verify hidden files (.htaccess, .env) are uploaded

### Method 3: SSH/Git (GrowBig/GoGeek Plans Only)
```bash
# Connect to SiteGround
ssh username@yourdomain.com -p18765

# Navigate to public_html
cd public_html

# Option A: Clone from Git
git clone https://github.com/yourusername/Aria-Amore-Website-Core.git .
./scripts/setup-env.sh production

# Option B: Use rsync
rsync -avz --exclude='.git' local_path/ username@yourdomain.com:public_html/
```

## Configuration

### Email Setup
1. **Create Email Accounts in cPanel**
   - [ ] Create: no-reply@yourdomain.com
   - [ ] Create: info@yourdomain.com
   - [ ] Create: security@yourdomain.com

2. **Configure .env File**
   - [ ] Create `.env` in public_html (copy from .env.example)
   - [ ] Update SMTP settings:
   ```env
   SMTP_HOST=localhost
   SMTP_USER=no-reply@yourdomain.com
   SMTP_PASS=your-password
   SMTP_PORT=465
   SMTP_SECURE=ssl
   ```
   - [ ] Set permissions: `chmod 600 .env`

### SSL/HTTPS Setup
- [ ] Install SSL Certificate (cPanel → Let's Encrypt)
- [ ] Select domain → Install
- [ ] Verify HTTPS works: https://yourdomain.com
- [ ] HTTP to HTTPS redirect (automatic via .htaccess)
- [ ] Test SSL: https://www.ssllabs.com/ssltest/

### PHP Configuration
- [ ] Set PHP version to 8.0 or newer (cPanel → PHP Manager)
- [ ] Adjust limits if needed:
  - upload_max_filesize: 20M
  - post_max_size: 20M
  - max_execution_time: 300
  - memory_limit: 256M

### Performance Optimization
- [ ] Enable SuperCacher (cPanel → SuperCacher)
- [ ] Enable Static Cache
- [ ] Enable Memcached (if available)
- [ ] Clear cache after deployment
- [ ] Consider Cloudflare (cPanel → Cloudflare)

## Post-Deployment Verification

### Basic Functionality
- [ ] Homepage loads: https://yourdomain.com
- [ ] All pages accessible:
  - [ ] /about
  - [ ] /services
  - [ ] /artists
  - [ ] /privacy-policy
  - [ ] /terms-of-service
- [ ] 404 page works: https://yourdomain.com/nonexistent
- [ ] Responsive design on mobile
- [ ] Images load correctly
- [ ] Audio/media working

### Email Functionality
- [ ] Submit test form
- [ ] Check email delivery to admin
- [ ] Verify confirmation email to user
- [ ] Check spam folder (should not be there)
- [ ] Review email formatting
- [ ] Test with different email providers

### Security Verification
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] Security headers present:
  ```bash
  curl -I https://yourdomain.com
  ```
  Should show:
  - X-Frame-Options
  - X-Content-Type-Options
  - Strict-Transport-Security
  - Content-Security-Policy
- [ ] Test at: https://securityheaders.com
- [ ] Directory listing disabled
- [ ] .env not accessible: https://yourdomain.com/.env
- [ ] Sensitive files not accessible

### Performance Testing
- [ ] GTmetrix: https://gtmetrix.com
  - Target: Grade A/B, Load time < 3s
- [ ] Google PageSpeed: https://pagespeed.web.dev
  - Target: Score > 80
- [ ] Pingdom: https://tools.pingdom.com
  - Monitor from multiple locations

## Optional Setup

### Monitoring & Maintenance (Requires SSH/GrowBig+)
1. **Setup Cron Jobs**
   - [ ] cPanel → Cron Jobs
   - [ ] Daily Backup (2 AM):
   ```
   0 2 * * * cd /home/username && ./scripts/backup.sh
   ```
   - [ ] Health Check (Every 5 min):
   ```
   */5 * * * * cd /home/username && ./scripts/health-check.sh --once
   ```

2. **External Monitoring**
   - [ ] Sign up for uptime monitoring (UptimeRobot, StatusCake, Pingdom)
   - [ ] Configure alerts (email, SMS)
   - [ ] Set check interval (1-5 minutes)

### Analytics
- [ ] Google Analytics configured
- [ ] Google Search Console:
  - [ ] Property added
  - [ ] Ownership verified
  - [ ] Sitemap submitted: /sitemap.xml
- [ ] Bing Webmaster Tools setup

### Backup Verification
- [ ] SiteGround automatic backups enabled (default)
- [ ] Test backup restoration (cPanel → Backup → Restore)
- [ ] External backup location configured (optional)
- [ ] Backup notification emails working

## Final Checklist

### Documentation
- [ ] Team knows where to find documentation
- [ ] Emergency contacts documented
- [ ] Backup restoration procedure documented
- [ ] Content update procedure explained

### Sign-Off
- [ ] All functionality tested and working
- [ ] Email delivery confirmed
- [ ] Security verified
- [ ] Performance acceptable
- [ ] SSL certificate valid
- [ ] Backups configured
- [ ] Monitoring active
- [ ] Team trained

## Post-Launch

### Week 1
- [ ] Monitor error logs daily (cPanel → Error Log)
- [ ] Check email delivery
- [ ] Monitor site performance
- [ ] Review analytics data
- [ ] Respond to any issues quickly

### Week 2-4
- [ ] Weekly error log review
- [ ] Weekly backup verification
- [ ] Monitor traffic patterns
- [ ] Collect user feedback
- [ ] Plan any necessary adjustments

### Monthly Maintenance
- [ ] Security audit: `./scripts/security-check.sh`
- [ ] Content validation: `./scripts/update-content.sh`
- [ ] Performance review (GTmetrix, PageSpeed)
- [ ] Backup test (restore to staging)
- [ ] SSL certificate check (auto-renews, but verify)
- [ ] Update dependencies if needed
- [ ] Review analytics and adjust

## Emergency Procedures

### Site Down
1. Check server status (SiteGround status page)
2. Check error logs (cPanel → Error Log)
3. Contact SiteGround support (24/7 chat/phone)
4. Review recent changes
5. Restore from backup if needed

### Email Not Working
1. Check `.env` configuration
2. Verify email account exists (cPanel → Email Accounts)
3. Check error logs: `logs/errors.log`
4. Test SMTP connection
5. Check spam folder
6. Contact SiteGround email support

### Performance Issues
1. Clear SuperCacher (cPanel → SuperCacher)
2. Check resource usage (cPanel → Resource Usage)
3. Review error logs for issues
4. Optimize images if needed
5. Consider upgrading plan if consistently hitting limits

## Support Contacts

- **SiteGround Support**: 24/7 chat/phone (see cPanel)
- **Project Email**: security@ariaamore.com
- **Documentation**: /docs/SITEGROUND-DEPLOYMENT.md
- **GitHub Issues**: https://github.com/yourusername/repo/issues

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Verified By**: _______________
**Notes**: _____________________________

✅ **Ready for Production!**
