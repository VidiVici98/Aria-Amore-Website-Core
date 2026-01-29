# SiteGround Deployment Guide for Aria Amore

## Overview
This guide covers deploying the Aria Amore website to SiteGround hosting, taking into account SiteGround's specific environment and constraints.

## SiteGround Environment
- **Control Panel**: cPanel
- **PHP Version**: 7.4+ (recommended 8.0+)
- **Web Server**: LiteSpeed or Apache
- **File Manager**: Available via cPanel
- **SSH Access**: Available on GrowBig and GoGeek plans
- **Email**: SiteGround SMTP or external services

## Pre-Deployment Checklist

### 1. SiteGround Account Setup
- [ ] Hosting plan active (StartUp, GrowBig, or GoGeek)
- [ ] Domain pointed to SiteGround nameservers
- [ ] SSL certificate installed (free Let's Encrypt via cPanel)
- [ ] Email accounts created (if needed)

### 2. Local Preparation
- [ ] Build the site: `./scripts/build.sh`
- [ ] Test locally: `./scripts/test.sh`
- [ ] Security check: `./scripts/security-check.sh`
- [ ] Create deployment backup: `./scripts/backup.sh`

## Deployment Methods

### Method 1: File Manager (Easiest)
1. **Login to cPanel**
   - Go to your SiteGround cPanel
   - Navigate to File Manager
   - Go to `public_html` directory

2. **Upload Files**
   - Delete default files (index.html, etc.)
   - Upload ALL files from your `build/` directory
   - Or upload files from `public/`, `assets/`, `data/`, `components/` directories
   - Upload `.htaccess` file (make sure hidden files are visible)
   - Upload `sendmail.php` to root

3. **Set File Permissions**
   - Files: 644
   - Directories: 755
   - `.env`: 600 (if using)

### Method 2: FTP/SFTP (Recommended)
1. **Get FTP Credentials**
   - cPanel → FTP Accounts → Create/View FTP account
   - Or use your main cPanel credentials

2. **Connect with FTP Client** (FileZilla, Cyberduck, etc.)
   ```
   Host: ftp.yourdomain.com
   Username: your-username@yourdomain.com
   Password: your-password
   Port: 21 (FTP) or 22 (SFTP)
   ```

3. **Upload Files**
   - Navigate to `/public_html`
   - Upload all files from `build/` directory
   - Maintain directory structure

### Method 3: SSH/Git (Advanced - GrowBig/GoGeek plans)
1. **Enable SSH Access**
   - cPanel → SSH/Shell Access
   - Generate SSH key or use password

2. **Connect via SSH**
   ```bash
   ssh username@yourdomain.com -p18765
   ```

3. **Clone or Deploy**
   ```bash
   cd public_html
   # Option A: Git clone
   git clone https://github.com/yourusername/aria-amore.git .
   
   # Option B: Upload via rsync
   rsync -avz --exclude='.git' build/ username@yourdomain.com:public_html/
   ```

## SiteGround-Specific Configuration

### 1. PHP Configuration
SiteGround allows PHP configuration via `.htaccess` or cPanel PHP Manager.

**Add to .htaccess** (if needed):
```apache
# PHP Configuration
php_value upload_max_filesize 20M
php_value post_max_size 20M
php_value max_execution_time 300
php_value max_input_time 300
php_value memory_limit 256M

# Display errors (disable in production)
php_flag display_errors Off
```

**Or use cPanel PHP Manager:**
- cPanel → PHP Manager
- Select PHP version (8.0+ recommended)
- Adjust settings as needed

### 2. Email Configuration for SiteGround

**Option A: SiteGround SMTP (Recommended)**
Update your `.env` file:
```env
SMTP_HOST=localhost
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_PORT=465
SMTP_SECURE=ssl
FROM_EMAIL=no-reply@yourdomain.com
FROM_NAME=Aria Amore
```

**Option B: External SMTP (Gmail, SendGrid)**
```env
# Gmail
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
SMTP_PORT=587
SMTP_SECURE=tls

# SendGrid
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_PORT=587
SMTP_SECURE=tls
```

### 3. Directory Structure on SiteGround
```
/home/username/
├── public_html/              # Your website files go here
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── artists.html
│   ├── .htaccess
│   ├── sendmail.php
│   ├── assets/
│   ├── data/
│   ├── components/
│   ├── errors/
│   ├── robots.txt
│   └── sitemap.xml
├── logs/                     # Create this for application logs
├── backups/                  # Create this for backups
└── .env                      # Store outside public_html (optional)
```

### 4. .htaccess Optimization for SiteGround
The provided `.htaccess` file is already optimized, but ensure:
- LiteSpeed-specific directives are compatible
- Caching is properly configured
- Security headers are set

### 5. Cron Jobs Setup (for backups and health checks)

**Via cPanel:**
1. Go to cPanel → Cron Jobs
2. Add new cron job:

**Daily Backup (2 AM):**
```bash
0 2 * * * cd /home/username && ./scripts/backup.sh /home/username/backups
```

**Health Check (every 5 minutes):**
```bash
*/5 * * * * cd /home/username && ./scripts/health-check.sh --once >> /home/username/logs/health.log 2>&1
```

**Note:** Adjust paths to match your SiteGround username and directory structure.

### 6. SSL/HTTPS Setup
SiteGround provides free Let's Encrypt SSL:

1. **Install SSL Certificate**
   - cPanel → Security → Let's Encrypt
   - Select your domain
   - Click "Install"

2. **Force HTTPS**
   - The `.htaccess` file already includes HTTPS redirect
   - Or use cPanel → HTTPS Enforce toggle

3. **Verify SSL**
   - Test at: https://www.ssllabs.com/ssltest/
   - Should get A or A+ rating

## SiteGround Performance Optimization

### 1. SiteGround Optimizer Plugin (if using WordPress)
- Not applicable for this static site

### 2. Cloudflare Integration
SiteGround offers free Cloudflare CDN:
- cPanel → Cloudflare
- Enable and configure
- Improves global performance

### 3. SuperCacher
- cPanel → SuperCacher
- Enable Static Cache
- Enable Memcached (if available on your plan)
- Flush cache after deployment

### 4. PHP Version
- Use PHP 8.0 or newer for best performance
- cPanel → PHP Manager → Select version

## Post-Deployment Steps

### 1. Verify Deployment
```bash
# Test homepage
curl -I https://yourdomain.com

# Test SSL
curl -I https://yourdomain.com | grep -i "HTTP\|ssl"

# Test security headers
curl -I https://yourdomain.com | grep -i "x-frame\|x-content-type\|strict-transport"
```

### 2. Test Email Functionality
- Submit a test form
- Verify emails are received
- Check spam folder if not received
- Review email logs in cPanel

### 3. Monitor Performance
- Test with GTmetrix: https://gtmetrix.com
- Test with Google PageSpeed: https://pagespeed.web.dev
- Test with Pingdom: https://tools.pingdom.com

### 4. Set Up Monitoring
- cPanel → Metrics → Visitors
- Enable SiteGround Site Scanner (Security → Site Scanner)
- Configure email alerts for downtime

## Troubleshooting

### Email Not Sending
1. **Check SMTP credentials** in `.env`
2. **Verify SiteGround email account** exists
3. **Check error logs**: cPanel → Error Log
4. **Test with PHP mail() function**:
   ```bash
   echo "Test email" | mail -s "Test" your-email@domain.com
   ```
5. **Check spam folder**
6. **Review sendmail.php logs**: `/home/username/logs/errors.log`

### File Permission Errors
```bash
# Via SSH
find public_html -type f -exec chmod 644 {} \;
find public_html -type d -exec chmod 755 {} \;
chmod 600 .env
```

Or use cPanel File Manager → Change Permissions.

### .htaccess Not Working
1. **Verify mod_rewrite is enabled** (it should be on SiteGround)
2. **Check .htaccess is uploaded** and not .htaccess.txt
3. **Check file permissions**: 644
4. **Test with simple .htaccess**:
   ```apache
   # Test
   RewriteEngine On
   ```
5. **Check error logs** for syntax errors

### 404 Errors
1. **Verify file paths** are correct
2. **Check .htaccess rewrite rules**
3. **Ensure index.html exists** in public_html
4. **Check domain DNS** is properly configured

### Performance Issues
1. **Enable SuperCacher** in cPanel
2. **Optimize images** before upload
3. **Enable Cloudflare** via cPanel
4. **Use PHP 8.0+**
5. **Review resource usage** in cPanel

## SiteGround-Specific File Locations

### PHP Error Logs
- cPanel → Error Log
- Or: `/home/username/logs/php_errors.log`

### Access Logs
- cPanel → Raw Access Logs
- Or: `/home/username/logs/access.log`

### Email Logs
- cPanel → Track Delivery
- Shows sent emails and delivery status

## Backup Strategy on SiteGround

### Automatic Backups (SiteGround)
- Daily backups (last 30 days) - included
- Restore via cPanel → Backup

### Manual Backups
1. **Via cPanel Backup**
   - cPanel → Backup → Download a Full Account Backup

2. **Via Script** (if SSH access)
   ```bash
   ./scripts/backup.sh /home/username/backups
   ```

3. **Via FTP**
   - Download entire `public_html` directory
   - Store locally or in cloud storage

## Security Best Practices for SiteGround

1. **Use strong passwords** for cPanel, FTP, email
2. **Enable two-factor authentication** on cPanel
3. **Keep software updated** (PHP version)
4. **Use .env for secrets**, stored outside public_html
5. **Review SiteGround security log** regularly
6. **Enable SiteGround Site Scanner**
7. **Configure fail2ban** (automatic on SiteGround)
8. **Review access logs** for suspicious activity

## SiteGround Support

### Getting Help
- **24/7 Support**: Available via chat, phone, ticket
- **SiteGround Tutorial**: https://www.siteground.com/tutorials/
- **Knowledge Base**: https://www.siteground.com/kb/
- **Phone**: Check your SiteGround account for regional number

### Before Contacting Support
1. Check error logs (cPanel → Error Log)
2. Note exact error messages
3. Document steps to reproduce issue
4. Have your domain name ready

## Additional SiteGround Features

### Free Email Accounts
- Create at: cPanel → Email Accounts
- Professional email: yourname@yourdomain.com
- Configure in any email client

### Staging Environment (GrowBig/GoGeek)
- cPanel → Staging
- Test changes before deploying to production

### Git Integration (GrowBig/GoGeek)
- cPanel → Git
- Deploy directly from GitHub/GitLab

## Cost Optimization

- **StartUp Plan**: Suitable for single site, ~10k visits/month
- **GrowBig Plan**: Multiple sites, staging, 25k visits/month
- **GoGeek Plan**: Higher resources, 100k visits/month

Choose based on expected traffic and features needed.

## Conclusion

Your Aria Amore website is now fully configured for SiteGround hosting. The deployment process is straightforward using File Manager, FTP, or SSH depending on your comfort level and hosting plan.

**Key Points:**
✅ Upload files to `public_html`
✅ Configure `.env` with SiteGround SMTP
✅ Enable SSL certificate
✅ Set up cron jobs for maintenance
✅ Enable SuperCacher for performance
✅ Monitor via cPanel metrics

For questions: security@ariaamore.com
