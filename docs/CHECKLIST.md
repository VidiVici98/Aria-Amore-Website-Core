
# 🎯 PRODUCTION CHECKLIST - QUICK REFERENCE

## Phase 1: Pre-Deployment ✅
- [ ] Run `./test-site.sh http://localhost:8000`
- [ ] All tests pass with no errors
- [ ] Copy `.env.example` to `.env`
- [ ] Update production values in `.env`
- [ ] Install pre-commit hook: `cp pre-commit-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`
- [ ] Check for exposed secrets: `grep -r "api_key\|password\|secret\|token" .`
- [ ] No sensitive data found

## Phase 2: Domain Setup ✅
- [ ] Domain purchased and active
- [ ] Nameservers updated to hosting provider
- [ ] DNS records configured:
  - [ ] A record: ariaamore.com → Server IP
  - [ ] CNAME: www.ariaamore.com → ariaamore.com
  - [ ] (Optional) MX records for email
  - [ ] (Optional) SPF, DKIM, DMARC records

## Phase 3: SSL/HTTPS ✅
- [ ] SSL certificate requested (Let's Encrypt)
- [ ] Certificate installed on server
- [ ] HTTPS working: `curl https://ariaamore.com`
- [ ] HTTP redirects to HTTPS: `curl http://ariaamore.com`
- [ ] Certificate expiry: `echo | openssl s_client -servername ariaamore.com -connect ariaamore.com:443 2>/dev/null | openssl x509 -noout -dates`

## Phase 4: Server Configuration ✅
- [ ] Apache modules enabled:
  - [ ] mod_rewrite
  - [ ] mod_headers
  - [ ] mod_deflate
  - [ ] mod_expires
- [ ] Virtual host configured
- [ ] Document root: /var/www/html/aria-amore
- [ ] .htaccess uploaded and working
- [ ] File permissions correct:
  - [ ] Directories: 755
  - [ ] Files: 644
  - [ ] .env: 600
  - [ ] Scripts: 755
- [ ] Test config: `apache2ctl configtest` → "Syntax OK"

## Phase 5: Production Testing ✅
- [ ] Site loads: `curl -I https://ariaamore.com` → HTTP 200
- [ ] Security headers: https://securityheaders.com/?q=ariaamore.com
  - [ ] X-Frame-Options ✓
  - [ ] X-Content-Type-Options ✓
  - [ ] Strict-Transport-Security ✓
  - [ ] Content-Security-Policy ✓
- [ ] Performance: https://gtmetrix.com
  - [ ] Grade A or B minimum
  - [ ] Page load < 3 seconds
- [ ] Mobile: Test on actual device or DevTools
  - [ ] Responsive layout ✓
  - [ ] Touch targets accessible ✓
  - [ ] Performance acceptable ✓
- [ ] All pages load:
  - [ ] Homepage
  - [ ] About page
  - [ ] Services page
  - [ ] Artists page
  - [ ] Privacy Policy
  - [ ] Terms of Service
  - [ ] 404 page (test /nonexistent)

## Phase 6: Backups & Monitoring ✅
- [ ] Backup script: `chmod +x backup.sh && ./backup.sh`
- [ ] Backup created: `ls -lh /backups/aria-amore/`
- [ ] Backup verified: `tar -tzf /backups/aria-amore/site_*.tar.gz > /dev/null`
- [ ] Backup cronjob added: `sudo crontab -e` (2 AM daily)
- [ ] Health check tested: `chmod +x health-check.sh && ./health-check.sh --once`
- [ ] Health check cronjob added: `sudo crontab -e` (every 5 minutes)
- [ ] External monitoring configured:
  - [ ] UptimeRobot OR
  - [ ] StatusCake OR
  - [ ] Pingdom

## Phase 7: Email Configuration ✅
(If using contact forms)
- [ ] Email service configured (SendGrid, Gmail, etc.)
- [ ] SMTP credentials added to .env
- [ ] Test email sent: `echo "Test" | mail -s "Test" info@ariaamore.com`
- [ ] Email received successfully
- [ ] Email not in spam folder

## Phase 8: Analytics & SEO ✅
- [ ] Google Analytics configured
- [ ] Google Search Console:
  - [ ] Property added
  - [ ] Ownership verified
  - [ ] Sitemap submitted: https://ariaamore.com/sitemap.xml
- [ ] Bing Webmaster Tools:
  - [ ] Site added
  - [ ] Ownership verified
- [ ] Robots.txt accessible: `curl https://ariaamore.com/robots.txt`
- [ ] Sitemap accessible: `curl https://ariaamore.com/sitemap.xml`

## Phase 9: Security Hardening ✅
- [ ] Unnecessary services disabled
- [ ] Firewall configured:
  - [ ] Port 22 (SSH) allowed
  - [ ] Port 80 (HTTP) allowed
  - [ ] Port 443 (HTTPS) allowed
  - [ ] Other ports blocked
- [ ] Fail2Ban installed and enabled: `sudo systemctl status fail2ban`
- [ ] Automatic security updates enabled: `sudo systemctl status unattended-upgrades`
- [ ] SSH key-based login configured (no password login)
- [ ] sudo configured securely

## Post-Launch Weekly ✅
- [ ] Error logs reviewed: `tail -f /var/log/apache2/error.log`
- [ ] Backup status verified: `ls -lh /backups/aria-amore/`
- [ ] Monitoring alerts checked (UptimeRobot, etc.)
- [ ] Performance spot-checked: https://gtmetrix.com
- [ ] Health check logs reviewed: `tail /var/log/aria-amore-health.log`

## Post-Launch Monthly ✅
- [ ] Security logs reviewed: `grep error /var/log/apache2/error.log | wc -l`
- [ ] Uptime statistics reviewed
- [ ] Disaster recovery tested (restore from backup to test server)
- [ ] Documentation updated if needed
- [ ] Performance analysis: https://pagespeed.web.dev

## Documentation ✅
- [ ] QUICK-START.md - Read and followed
- [ ] PRODUCTION-SETUP.md - Server config verified
- [ ] SECURITY.md - Security policies understood
- [ ] TESTING.md - Testing completed
- [ ] README.md - Team understands project
- [ ] DEPLOYMENT.md - Checklist completed

## Emergency Contacts ✅
- [ ] Primary contact: info@ariaamore.com
- [ ] Security contact: security@ariaamore.com
- [ ] Hosting support phone: __________
- [ ] SSL provider support: __________
- [ ] Backup location: /backups/aria-amore/

## Success Criteria ✅
- [ ] Site loads at https://ariaamore.com
- [ ] All pages accessible and working
- [ ] HTTPS enforced (HTTP redirects)
- [ ] Security headers present
- [ ] Performance acceptable
- [ ] Backups automated
- [ ] Monitoring active
- [ ] Team trained on procedures
- [ ] Documentation complete

---

## Quick Command Reference

```bash
# Start dev server
./start-dev-server.sh

# Test site locally
./test-site.sh http://localhost:8000

# Deploy to production
./deploy.sh production

# Create backup
./backup.sh

# Check health
./health-check.sh --once

# View error logs
tail -f /var/log/apache2/error.log

# View access logs
tail -f /var/log/apache2/access.log

# Test security headers
curl -I https://ariaamore.com

# Check certificate expiry
echo | openssl s_client -servername ariaamore.com -connect ariaamore.com:443 2>/dev/null | openssl x509 -noout -dates

# Reload Apache
sudo systemctl reload apache2

# Restart Apache
sudo systemctl restart apache2

# Check Apache status
sudo systemctl status apache2

# Monitor cron jobs
sudo crontab -l
```

---

## Emergency Procedures

### Site is Down
1. Check if server is online: `ping ariaamore.com`
2. Check Apache status: `sudo systemctl status apache2`
3. Check error logs: `tail -100 /var/log/apache2/error.log`
4. Restart Apache: `sudo systemctl restart apache2`
5. If still down, check hosting control panel

### Backup Recovery
```bash
# List available backups
ls -lh /backups/aria-amore/

# Extract latest backup
tar -xzf /backups/aria-amore/site_*.tar.gz -C /tmp/recovery/

# Restore files
cp -r /tmp/recovery/var/www/html/aria-amore/* /var/www/html/aria-amore/
```

### SSL Certificate Issues
```bash
# Check certificate validity
echo | openssl s_client -servername ariaamore.com -connect ariaamore.com:443 2>/dev/null | openssl x509 -noout -dates

# Renew certificate (Let's Encrypt)
sudo certbot renew

# Check certificate location
certbot certificates
```

### Performance Issues
```bash
# Check server resources
free -h
top -b -n 1 | head -20

# Check disk usage
df -h

# Check Apache processes
ps aux | grep apache

# Check database connections (if applicable)
mysql -u user -p -e "SHOW PROCESSLIST;"
```

---

## Sign-Off

- [ ] All checkboxes completed
- [ ] Site verified working in production
- [ ] Team trained and ready
- [ ] Documentation reviewed
- [ ] Backups verified
- [ ] Monitoring confirmed active

**Deployment Date:** _______________
**Deployed By:** _______________
**Verified By:** _______________
**Notes:** _______________________________________________

---

**🎉 Congratulations! Your site is live and production-ready!**

For questions or issues, contact: security@ariaamore.com

Last Updated: December 25, 2025
