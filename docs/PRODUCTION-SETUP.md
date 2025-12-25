# Aria Amore Website - Production Configuration Guide

## Server Setup

### Apache Server Configuration
Ensure your Apache server has the following modules enabled:
- mod_rewrite
- mod_headers
- mod_deflate
- mod_expires

Enable with:
```bash
a2enmod rewrite headers deflate expires
```

### HTTPS/SSL Configuration
```apache
<VirtualHost *:443>
  ServerName ariaamore.com
  ServerAlias www.ariaamore.com
  DocumentRoot /var/www/html/aria-amore

  SSLEngine on
  SSLCertificateFile /etc/ssl/certs/your-cert.crt
  SSLCertificateKeyFile /etc/ssl/private/your-key.key
  SSLCertificateChainFile /etc/ssl/certs/your-chain.crt

  # Include .htaccess directives
  <Directory /var/www/html/aria-amore>
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

### HTTP to HTTPS Redirect
```apache
<VirtualHost *:80>
  ServerName ariaamore.com
  ServerAlias www.ariaamore.com
  Redirect permanent / https://ariaamore.com/
</VirtualHost>
```

## Nginx Configuration (Alternative)

```nginx
server {
    listen 443 ssl http2;
    server_name ariaamore.com www.ariaamore.com;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    root /var/www/html/aria-amore;
    index index.html;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Gzip Compression
    gzip on;
    gzip_types text/html text/plain text/css text/xml text/javascript application/xml application/javascript application/json;

    # Caching
    location ~* \.(jpg|jpeg|png|gif|webp|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    location ~* \.(css|js)$ {
        expires 1M;
        add_header Cache-Control "public";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name ariaamore.com www.ariaamore.com;
    return 301 https://$server_name$request_uri;
}
```

## Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
# Edit .env with your production values
```

## Database Backups
```bash
# Daily backup script (add to crontab)
0 2 * * * /usr/local/bin/backup-site.sh
```

## Monitoring & Logging

### Application Logging
- Configure error logging in your web server
- Monitor application errors
- Set up alerts for critical errors

### Server Health
- Monitor disk space
- Monitor CPU and memory usage
- Monitor bandwidth usage

### Uptime Monitoring
- Set up uptime monitoring with services like:
  - UptimeRobot
  - Pingdom
  - StatusCake

## Backup Strategy

### Automated Backups
```bash
#!/bin/bash
# Daily backup script
BACKUP_DIR="/backups/aria-amore"
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)

# Backup web files
tar -czf $BACKUP_DIR/files_$BACKUP_DATE.tar.gz /var/www/html/aria-amore

# Backup database (if applicable)
mysqldump -u user -p database > $BACKUP_DIR/db_$BACKUP_DATE.sql

# Remove backups older than 30 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
```

## Performance Optimization

### Asset Optimization
- Image compression tools: ImageOptim, TinyPNG
- CSS/JS minification: Use build tools
- Lazy loading for images: Use native `loading="lazy"`

### Caching Strategy
- Browser cache: Configured via .htaccess
- Server-side caching: Implement if needed
- CDN: Consider CloudFlare for global distribution

## DNS Configuration
```
A Record:     ariaamore.com     → Your Server IP
CNAME Record: www.ariaamore.com → ariaamore.com
MX Records:   For email delivery
TXT Records:  SPF, DKIM, DMARC for email security
```

## Email Security (SPF, DKIM, DMARC)
```
SPF:  v=spf1 include:sendgrid.net ~all
DKIM: (Generate from your email provider)
DMARC: v=DMARC1; p=quarantine; rua=mailto:security@ariaamore.com
```

## Regular Maintenance

### Weekly
- Monitor error logs
- Check backup status
- Verify SSL certificate validity

### Monthly
- Review security headers
- Update dependencies
- Test disaster recovery

### Quarterly
- Security audit
- Performance review
- Update documentation

## Support
For questions or issues, contact: security@ariaamore.com
