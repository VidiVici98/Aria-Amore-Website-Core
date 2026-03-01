# Aria Amore Website - Testing Guide

## Running Tests

### Quick Start
```bash
# Make scripts executable
chmod +x *.sh

# Start development server
./start-dev-server.sh

# In another terminal, run tests
./test-site.sh http://localhost:8000
```

## Test Categories

### 1. Functional Testing
- [ ] All pages load without errors
- [ ] Navigation links work correctly
- [ ] Forms submit successfully
- [ ] External links open correctly
- [ ] Internal links are not broken

```bash
# Check for broken links
./test-site.sh http://localhost:8000
```

### 2. Security Testing
- [ ] Security headers present (CSP, X-Frame-Options, etc.)
- [ ] HTTPS enforced
- [ ] No sensitive data in HTML
- [ ] No XSS vulnerabilities
- [ ] SQL injection prevention (if database used)

Use online tools:
- https://securityheaders.com - Check security headers
- https://www.nessus.org - Vulnerability scanning
- https://owasp.org/www-community/attacks - OWASP reference

### 3. Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] Largest Contentful Paint < 2.5 seconds
- [ ] Cumulative Layout Shift < 0.1

Use online tools:
- https://gtmetrix.com - Performance audit
- https://pagespeed.web.dev - Google PageSpeed Insights
- https://www.webpagetest.org - Detailed performance analysis

### 4. SEO Testing
- [ ] Meta descriptions on all pages
- [ ] Keywords properly targeted
- [ ] Mobile-friendly design
- [ ] Structured data (JSON-LD) valid
- [ ] Sitemap accessible
- [ ] robots.txt properly configured

```bash
# Check SEO elements
./test-site.sh http://localhost:8000
```

Use online tools:
- https://search.google.com/search-console - Google Search Console
- https://www.seobility.net/en/seocheck/ - SEO check
- https://www.bing.com/webmasters - Bing Webmaster Tools

### 5. Accessibility Testing
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Images have alt text

Use online tools:
- https://www.accessibilitychecker.co/ - Accessibility checker
- https://wave.webaim.org/ - WebAIM WAVE
- https://www.tpgi.com/axe/ - Axe DevTools

### 6. Mobile Testing
- [ ] Responsive on mobile devices
- [ ] Touch interactions work
- [ ] Viewport properly configured
- [ ] Mobile performance acceptable
- [ ] Mobile navigation clear

Test on:
- iPhone 12/13/14
- Samsung Galaxy S21/S22
- Tablets (iPad, etc.)
- Use Chrome DevTools device emulation

### 7. Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### 8. Load Testing
```bash
# Simple load test with Apache Bench
ab -n 1000 -c 10 http://localhost:8000/

# More advanced: Use Apache JMeter
# Download from: https://jmeter.apache.org/
```

### 9. Backup & Recovery Testing
```bash
# Run backup script
./backup.sh

# Verify backup integrity
tar -tzf /backups/aria-amore/site_*.tar.gz > /dev/null && echo "✅ Backup valid" || echo "❌ Backup corrupted"

# Test restore process (to temporary location)
mkdir /tmp/test-restore
tar -xzf /backups/aria-amore/site_*.tar.gz -C /tmp/test-restore
```

### 10. Security Scanning
```bash
# Check for exposed secrets
grep -r "api_key\|password\|secret\|token" . --include="*.html" --include="*.js" --include="*.css"

# Check file permissions
find . -type f -perm 0777 -exec ls -l {} \;
```

## Automated Testing Workflow

1. **Pre-Commit Checks**
   ```bash
   chmod +x pre-commit-hook.sh
   cp pre-commit-hook.sh .git/hooks/pre-commit
   chmod +x .git/hooks/pre-commit
   ```

2. **Development Testing**
   ```bash
   ./test-site.sh http://localhost:8000
   ```

3. **Pre-Deployment Testing**
   ```bash
   # Run all tests
   ./test-site.sh http://localhost:8000
   
   # Check for common issues
   ./pre-commit-hook.sh
   ```

4. **Health Monitoring (Production)**
   ```bash
   # Add to crontab for continuous monitoring
   chmod +x health-check.sh
   echo "*/5 * * * * /path/to/health-check.sh --once" | crontab -
   ```

## Testing Checklist

### Before Deployment
- [ ] All pages render correctly
- [ ] Security headers verified via securityheaders.com
- [ ] Performance acceptable via gtmetrix.com
- [ ] SEO elements complete
- [ ] Accessibility checks pass
- [ ] Mobile responsiveness verified
- [ ] Backup tested and verified
- [ ] SSL certificate valid
- [ ] DNS records configured
- [ ] Email delivery tested

### After Deployment
- [ ] Monitor error logs daily
- [ ] Check uptime monitoring alerts
- [ ] Verify backups are running
- [ ] Monitor performance metrics
- [ ] Test forms functionality
- [ ] Verify email notifications work
- [ ] Check security logs

## Tools & Resources

### Online Testing Tools
- **Security**: https://securityheaders.com, https://www.ssllabs.com/ssltest/
- **Performance**: https://gtmetrix.com, https://pagespeed.web.dev
- **SEO**: https://search.google.com/search-console, https://www.bing.com/webmasters
- **Accessibility**: https://wave.webaim.org, https://www.accessibilitychecker.co/
- **Uptime**: https://uptimerobot.com, https://www.statuspage.io

### Local Tools
- **HTML Validator**: `html5-validator`
- **CSS Validator**: `stylelint`
- **JavaScript Linter**: `eslint`
- **Load Testing**: `Apache JMeter`, `Locust`

## Continuous Monitoring

Set up monitoring with:
```bash
# Make scripts executable
chmod +x health-check.sh backup.sh

# Add to crontab
crontab -e

# Add these lines:
# Daily backups at 2 AM
0 2 * * * /path/to/backup.sh >> /var/log/aria-amore-backup.log 2>&1

# Health checks every 5 minutes
*/5 * * * * /path/to/health-check.sh --once >> /var/log/aria-amore-health.log 2>&1
```

## Troubleshooting

### Common Issues

1. **Performance is slow**
   - Enable GZIP compression in .htaccess
   - Optimize images (use WebP format)
   - Enable browser caching
   - Use CDN for static assets

2. **SSL certificate warnings**
   - Ensure certificate is properly installed
   - Check certificate validity dates
   - Force HTTPS redirect

3. **High server load**
   - Check database queries
   - Increase server resources
   - Implement caching
   - Use load balancer

4. **Forms not submitting**
   - Check server logs
   - Verify email configuration
   - Test SMTP connectivity
   - Review form validation

---

For more information, see [PRODUCTION-SETUP.md](PRODUCTION-SETUP.md) and [DEPLOYMENT.md](DEPLOYMENT.md).
