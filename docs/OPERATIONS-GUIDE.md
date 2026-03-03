# Aria Amore Operations Guide

Essential documentation for site owners, managers, and operators.

## 📋 Table of Contents

1. [Features Overview](#features-overview)
2. [Deployment & Maintenance](#deployment--maintenance)
3. [Security & Compliance](#security--compliance)
4. [Social Media Integration](#social-media-integration)
5. [Analytics Setup](#analytics-setup)

---

## Features Overview

### Homepage
- **Hero Section**: Main branding and call-to-action
- **Statistics Dashboard**: Performance metrics (500+ events, 98% satisfaction, etc.)
- **Package Comparison**: Three-tier pricing options (Serenade, Aria, Grand Opera)
- **Availability Calendar**: Interactive date picker for bookings
- **Social Media Links**: TikTok and Instagram integration

### Key Pages
- **About**: Company history, mission, and team information
- **Services**: Detailed package descriptions and pricing
- **Artists**: Performer profiles and testimonials
- **Repertoire**: Searchable/filterable catalog of songs and compositions
- **Events**: Showcase of past performances
- **Gallery**: Photo and media gallery
- **Contact**: Multi-channel contact form and information

### Global Features
- **Live Chat Widget**: Bottom-right chat button for visitor inquiries
- **Event Banner**: Promotional banner for upcoming events (can be toggled)
- **Newsletter**: Email subscription capture
- **Social Sharing**: Built-in sharing for social media platforms
- **Accessibility**: WCAG 2.1 compliant, keyboard navigation, screen reader support

---

## Deployment & Maintenance

### Pre-Deployment Checklist

**Security**
- [ ] HTTPS enabled and enforced
- [ ] SSL/TLS certificate installed
- [ ] Security headers configured (.htaccess)
- [ ] robots.txt and sitemap.xml in place
- [ ] .env file secured (not committed to git)
- [ ] Sensitive files protected

**Performance**
- [ ] GZIP compression enabled
- [ ] Browser caching configured
- [ ] Images optimized (WebP format)
- [ ] CSS and JavaScript minified
- [ ] CDN configured (optional)

**SEO & Content**
- [ ] Meta tags properly configured
- [ ] Sitemap submitted to Google Search Console
- [ ] Robots.txt configured correctly
- [ ] Canonical URLs set
- [ ] OpenGraph tags for social sharing
- [ ] Mobile responsiveness verified

**Monitoring**
- [ ] Logging configured
- [ ] Error tracking setup
- [ ] Uptime monitoring enabled
- [ ] Performance monitoring in place
- [ ] Security monitoring enabled

**Backups**
- [ ] Automated backups configured
- [ ] Backup verification tests passing
- [ ] Disaster recovery plan documented

**Testing**
- [ ] Cross-browser testing completed
- [ ] Mobile device testing completed
- [ ] Performance testing completed
- [ ] Security testing (OWASP Top 10)
- [ ] Load testing completed

### Updating Content

The site uses JSON data files for dynamic content:
- `data/homepage.json` - Homepage content and package info
- `data/about.json` - About page content
- `data/services.json` - Service descriptions
- `data/contact.json` - Contact page information
- `data/events.json` - Upcoming and past events
- `data/gallery.json` - Gallery images and descriptions
- `data/repertoire.json` - Song catalog with metadata

**To update content:**
1. Edit the corresponding JSON file in the `data/` folder
2. Save and commit to git
3. Deploy to production
4. Content updates immediately (no page rebuild needed)

### Contact Form Handling

- Contact forms submit to `/sendmail.php`
- Configured to send to `info@ariaamore.com`
- Uses PHPMailer for reliable email delivery
- Spam protection via honeypot field
- Form validation on client and server side

---

## Security & Compliance

### Security Policy

**Reporting Vulnerabilities**: security@ariaamore.com

**Supported Versions**: 1.0.x

**Security Measures in Place**:
- HTTPS/TLS encryption for all communications
- Security headers configured (X-Frame-Options, CSP, etc.)
- Input validation and sanitization
- Regular dependency updates
- Security monitoring and logging

**Best Practices for Users**:
- Keep browser and plugins updated
- Use strong, unique passwords
- Enable two-factor authentication where available
- Be cautious of phishing emails
- Report suspicious activity to security@ariaamore.com

### Privacy & Data Protection

The site includes:
- Privacy Policy page (`public/privacy-policy.html`)
- Terms of Service page (`public/terms-of-service.html`)
- Contact information collection with GDPR compliance
- No third-party data sharing without consent

---

## Social Media Integration

### Platforms & Links

- **Instagram**: `@ariaamore.art`
- **TikTok**: `@ariaamore.art`

### Social Features

1. **Social Sharing Buttons**: Allow visitors to share content
2. **OpenGraph Meta Tags**: Optimized previews for sharing
3. **Social Meta Tags**: Proper formatting for social platforms
4. **UTM Tracking**: Campaign tracking for analytics

### Quick Start Social Media (15 minutes)

1. **Profile Setup**
   - Add professional headshots to Instagram/TikTok
   - Write compelling bios with contact info
   - Link website in bio

2. **Content Strategy**
   - Post performance clips and highlights
   - Share client testimonials
   - Behind-the-scenes content
   - Educational music content

3. **Engagement**
   - Respond to comments quickly
   - Use relevant hashtags (#opera #livemusic #weddingmusic)
   - Engage with similar accounts
   - Post consistently (3-4x weekly recommended)

4. **Analytics**
   - Monitor follower growth
   - Track engagement rates
   - Note which content performs best
   - Adjust strategy quarterly

### Content Creation Tips

- **Videos**: 15-60 seconds, vertical format preferred
- **Images**: High quality, professional photography
- **Captions**: Tell a story, include call-to-action
- **Hashtags**: Mix popular and niche hashtags
- **Timing**: Post when audience is most active (typically 7-9pm)

---

## Analytics Setup

### Google Analytics

**Setup:**
1. Create Google Analytics account at analytics.google.com
2. Add your property ID to `.env` file: `GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`
3. Add tracking code to website header (included in template)

**Key Metrics to Monitor:**
- **Traffic**: Sessions, users, pageviews
- **Behavior**: Time on page, bounce rate, user flow
- **Conversions**: Contact form submissions, bookings
- **Acquisition**: How visitors find you (organic, social, direct)
- **Devices**: Desktop vs. mobile traffic

**Monthly Reporting:**
1. Review total sessions and growth trends
2. Identify top-performing pages
3. Check mobile vs. desktop performance
4. Review acquisition channels
5. Monitor conversion rates
6. Plan next month's optimizations

### UTM Tracking for Campaigns

Use UTM parameters to track social media campaigns:

```
Format: ?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=CAMPAIGN

Examples:
- Instagram post: ?utm_source=instagram&utm_medium=social&utm_campaign=spring_promo
- Facebook ad: ?utm_source=facebook&utm_medium=paid_social&utm_campaign=wedding_season
- Email newsletter: ?utm_source=email&utm_medium=newsletter&utm_campaign=march_2026
```

---

## Troubleshooting

### Contact Form Not Sending
- Check `/sendmail.php` permissions (should be readable/executable)
- Verify email configuration in `.env` file
- Check server error logs for PHP errors
- Ensure server supports PHP mail()

### Content Not Updating
- Clear browser cache (Ctrl+Shift+Del)
- Verify JSON files saved correctly
- Check browser console for JavaScript errors
- Restart web server

### Images Not Loading
- Verify image paths in JSON files
- Check image files exist in `assets/media/` folder
- Ensure image formats supported (JPG, PNG, WebP)
- Check file permissions (644 for files)

### Performance Issues
- Run Google PageSpeed Insights
- Check image optimization (use WebP format)
- Verify GZIP compression enabled
- Review browser caching headers
- Check for large unoptimized files

---

## Support & Resources

- **GitHub Repository**: https://github.com/VidiVici98/Aria-Amore-Website-Core
- **Issues/Bug Reports**: Use GitHub Issues
- **Security Issues**: email security@ariaamore.com
- **General Questions**: info@ariaamore.com

**Last Updated**: March 3, 2026
