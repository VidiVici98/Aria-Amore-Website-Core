# 🚀 Quick Start Guide - Production Deployment

## Complete Production-Ready Checklist

Your website now has everything needed for production. Follow this step-by-step guide to launch.

## 🎯 Phase 1: Pre-Deployment (1-2 days)

### 1.1 Code Review & Testing
```bash
# Start development server
./start-dev-server.sh

# In another terminal, run comprehensive tests
./test-site.sh http://localhost:8000

# Verify all pages load
# Open http://localhost:8000 in browser and test:
# - Homepage
# - About page
# - Services page  
# - Artists page
# - Privacy Policy
# - Terms of Service
# - 404 page (try visiting /nonexistent)
```

**Checklist:**
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms function (if applicable)
- [ ] No console errors
- [ ] Responsive design verified

### 1.2 Pre-Commit Setup
```bash
# Install git pre-commit hook
cp pre-commit-hook.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Test the hook
git status
```

**What this does:**
- Prevents accidental commits of .env files
- Detects exposed API keys/passwords
- Validates JSON files
- Checks for debug statements

### 1.3 Security Verification
```bash
# Check for exposed secrets
grep -r "api_key\|password\|secret\|token" . \
  --include="*.html" --include="*.js" --include="*.css" \
  --include="*.json" --exclude-dir=node_modules

# Should return no matches
```

### 1.4 Create Production .env File
```bash
# Copy template
cp .env.example .env

# Edit with your production values
nano .env
# or
vim .env

# Required values to update:
# - SITE_NAME=Aria Amore
# - SITE_URL=https://ariaamore.com
# - SITE_EMAIL=info@ariaamore.com
# - SECURITY_EMAIL=security@ariaamore.com
# - GOOGLE_ANALYTICS_ID (if using analytics)
# - Email configuration settings
```

**IMPORTANT:** Never commit .env to git!

---

## 🌐 Phase 2: Domain & Hosting Setup (1 day)

### 2.1 Domain Configuration
Contact your domain registrar:
```
Update nameservers to point to your hosting provider
```

### 2.2 DNS Records
Ask your hosting provider to set up:
```
A Record:     ariaamore.com      → Your Server IP
CNAME Record: www.ariaamore.com  → ariaamore.com
MX Records:   (For email - if needed)
TXT Records:  SPF, DKIM, DMARC (for email security)
```

### 2.3 Email Security (if using email)
```
SPF:  v=spf1 include:sendgrid.net ~all
DKIM: (Generate from your email provider)
DMARC: v=DMARC1; p=quarantine; rua=mailto:security@ariaamore.com
```

---

## 🔐 Phase 3: SSL/HTTPS Setup (1 hour)

### 3.1 Install SSL Certificate
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

### 3.2 Verify HTTPS
Visit these URLs in your browser:
- https://ariaamore.com (should work)
- http://ariaamore.com (should redirect to https)
- https://www.ariaamore.com (should work)

**Check certificate validity:**
```bash
echo | openssl s_client -servername ariaamore.com -connect ariaamore.com:443 2>/dev/null | \
  openssl x509 -noout -dates
```

---

## 🖥️ Phase 4: Server Configuration (2 hours)

### 4.1 Apache Setup
```bash
# Enable required modules
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod deflate
sudo a2enmod expires

# Reload Apache
sudo systemctl reload apache2
```

### 4.2 Virtual Host Configuration
Follow instructions in [PRODUCTION-SETUP.md](PRODUCTION-SETUP.md) to:
- Create Apache virtual host
- Set document root
- Configure SSL
- Enable .htaccess overrides

### 4.3 File Permissions
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

---

## 🧪 Phase 5: Testing on Production Server (2 hours)

### 5.1 Functionality Testing
```bash
# Test from different locations
curl -I https://ariaamore.com  # Should return 200
curl -L http://ariaamore.com   # Should redirect to https
```

### 5.2 Security Headers Verification
Visit: https://securityheaders.com/?q=ariaamore.com

You should see:
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Strict-Transport-Security
- ✅ Content-Security-Policy

### 5.3 Performance Testing
Visit: https://gtmetrix.com

Enter your URL and check:
- Grade A or B minimum
- Page load time < 3 seconds
- Fully loaded time < 5 seconds

### 5.4 SEO Testing
Visit: https://search.google.com/search-console
- Add your domain
- Submit sitemap: https://ariaamore.com/sitemap.xml
- Verify no crawl errors
- Check coverage

### 5.5 Mobile Testing
```bash
# Test responsive design
# Visit on actual devices or use DevTools
# Check:
# - Layout is responsive
# - Touch targets are accessible
# - Performance is acceptable
```

---

## 📊 Phase 6: Monitoring & Backups (1 day)

### 6.1 Set Up Automated Backups
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

### 6.2 Set Up Health Monitoring
```bash
# Test health check
./health-check.sh --once

# Add to crontab for every 5 minutes
*/5 * * * * /var/www/html/aria-amore/health-check.sh --once >> /var/log/aria-amore-health.log 2>&1
```

### 6.3 Set Up External Monitoring
Sign up for one of:
- **UptimeRobot** (https://uptimerobot.com) - Free tier available
- **StatusCake** (https://www.statuscake.com)
- **Pingdom** (https://www.pingdom.com)

Configure to check: https://ariaamore.com every 5 minutes

### 6.4 Log Monitoring
```bash
# Monitor error logs
tail -f /var/log/apache2/error.log

# Monitor access logs
tail -f /var/log/apache2/access.log

# Check for suspicious activity
grep "error\|warning" /var/log/apache2/error.log | tail -20
```

---

## 📧 Phase 7: Email & Forms Configuration (1 hour, if applicable)

### 7.1 Email Service Setup
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

### 7.2 Test Email Delivery
```bash
# Send test email
echo "Test" | mail -s "Test Subject" info@ariaamore.com

# Check if received and not in spam
```

---

## 📱 Phase 8: Analytics & SEO (1 day)

### 8.1 Google Analytics
1. Create Google Analytics account
2. Get your Tracking ID (G-XXXXXXXXX or UA-XXXXXXXXX-X)
3. Add to .env: `GOOGLE_ANALYTICS_ID=your-id`
4. Add to HTML head tags (update SEO-TAGS.html if needed)

### 8.2 Google Search Console
1. Go to https://search.google.com/search-console
2. Add property for ariaamore.com
3. Verify ownership
4. Submit sitemap: https://ariaamore.com/sitemap.xml
5. Monitor crawl errors
6. Check coverage

### 8.3 Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Verify ownership
4. Submit sitemap

---

## 🔐 Phase 9: Post-Deployment Security (1 day)

### 9.1 Disable Unnecessary Services
```bash
# Keep only essential services running
sudo systemctl disable unnecessary_service
sudo systemctl stop unnecessary_service
```

### 9.2 Configure Firewall
```bash
# Allow only necessary ports
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### 9.3 Set Up Fail2Ban
```bash
# Install Fail2Ban to prevent brute force attacks
sudo apt-get install fail2ban

# Enable and start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 9.4 Regular Updates
```bash
# Enable automatic security updates
sudo apt-get install unattended-upgrades

# Configure and enable
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## ✅ Launch Checklist - Final Verification

### Pre-Launch
- [ ] All pages tested and working
- [ ] .env file created with production values (not committed)
- [ ] SSL certificate installed and valid
- [ ] DNS records configured
- [ ] .htaccess uploaded and configured
- [ ] robots.txt and sitemap.xml accessible
- [ ] Security headers verified via securityheaders.com
- [ ] Performance acceptable via gtmetrix.com

### Post-Launch
- [ ] Site accessible at https://ariaamore.com
- [ ] HTTP redirects to HTTPS
- [ ] 404 page works
- [ ] Forms submit successfully (if applicable)
- [ ] Email notifications working
- [ ] Backups automated and verified
- [ ] Health monitoring active
- [ ] Google Search Console configured
- [ ] Analytics configured and tracking

### Ongoing (Weekly)
- [ ] Review error logs
- [ ] Verify backups running
- [ ] Check monitoring alerts
- [ ] Spot-check performance
- [ ] Test forms/contact methods

### Ongoing (Monthly)
- [ ] Review security logs
- [ ] Check uptime statistics
- [ ] Test disaster recovery
- [ ] Update documentation
- [ ] Plan any improvements

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

---

## 📞 Support & Resources

### Documentation
- [PRODUCTION-SETUP.md](PRODUCTION-SETUP.md) - Server configuration
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment checklist
- [SECURITY.md](SECURITY.md) - Security policies
- [TESTING.md](TESTING.md) - Testing guide

### Monitoring Tools
- Security Headers: https://securityheaders.com
- Performance: https://gtmetrix.com
- SSL Labs: https://www.ssllabs.com/ssltest/
- PageSpeed: https://pagespeed.web.dev

### Contact
- **Email**: info@ariaamore.com
- **Security Issues**: security@ariaamore.com

---

**🎉 Congratulations!** Your Aria Amore website is now production-ready!

Last Updated: December 25, 2025
