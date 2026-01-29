# 🤖 Automation & Build Scripts Documentation

Complete guide to all automation scripts and workflows for the Aria Amore website.

## 📑 Table of Contents

- [Overview](#overview)
- [Build System](#build-system)
- [Development Tools](#development-tools)
- [Deployment Automation](#deployment-automation)
- [Maintenance Scripts](#maintenance-scripts)
- [Testing & Validation](#testing--validation)
- [NPM Scripts](#npm-scripts)
- [Cron Jobs & Scheduling](#cron-jobs--scheduling)

---

## Overview

The Aria Amore website includes a comprehensive suite of automation scripts to streamline:
- **Building** production-ready artifacts
- **Testing** code quality and functionality
- **Deploying** to production servers
- **Monitoring** site health and security
- **Backing up** critical data
- **Validating** content and configuration

All scripts are located in the `/scripts` directory and are executable.

---

## Build System

### `build.sh` - Production Build Script

**Purpose**: Creates a production-ready deployment package.

**Usage**:
```bash
./scripts/build.sh
# or
npm run build
```

**What it does**:
1. **Cleans** the build directory
2. **Copies** all public files (resolving symlinks)
3. **Includes** assets, data, and components
4. **Copies** configuration files (.htaccess, .well-known)
5. **Validates** the build artifact:
   - Checks for required files (HTML pages, CSS, JS)
   - Verifies directory structure
   - Confirms data files exist
   - Validates .htaccess configuration
   - Ensures no forbidden content (docs, scripts, .env)
6. **Displays** the build tree structure

**Output**: 
```
build/
├── index.html
├── about.html
├── services.html
├── artists.html
├── contact.html
├── events.html
├── gallery.html
├── assets/
├── components/
├── data/
├── .htaccess
└── .well-known/
```

**Exit Codes**:
- `0`: Build successful
- `1`: Build failed (missing required files or validation error)

**Validation Checks**:
- ✅ All required HTML pages present
- ✅ All error pages exist (403, 404, 410, 500, 503)
- ✅ All assets directories populated
- ✅ All data JSON files present
- ✅ Components directory not empty
- ✅ .htaccess has RewriteEngine directive
- ✅ No forbidden content in build

---

## Development Tools

### `setup-env.sh` - Environment Configuration

**Purpose**: Automates development and production environment setup.

**Usage**:
```bash
./scripts/setup-env.sh development
# or
./scripts/setup-env.sh production
# or
npm run setup        # development
npm run setup:prod   # production
```

**What it does**:
1. **Creates** `.env` from `.env.example` if not exists
2. **Sets** secure file permissions (600 for .env)
3. **Creates** required directories:
   - `logs/` for error logging
   - `vendor/` for dependencies
4. **Initializes** error log file
5. **Checks** system requirements:
   - cURL availability
   - PHP installation
   - PHPMailer presence
6. **Configures** development-specific settings (if dev mode)
7. **Validates** setup completeness

**Development vs Production**:
- **Development**: 
  - More verbose output
  - Enables debug mode hints
  - Sets up local server configuration
- **Production**:
  - Minimal output
  - Production-safe defaults
  - Enhanced security checks

**Exit Codes**:
- `0`: Setup successful
- `1`: Setup failed (missing requirements)

---

### `update-content.sh` - Content Validation

**Purpose**: Validates JSON content files for syntax errors.

**Usage**:
```bash
./scripts/update-content.sh              # Validate all files
./scripts/update-content.sh artists.json # Validate specific file
# or
npm run content:validate
```

**What it does**:
1. **Lists** all JSON files in `/data` directory
2. **Validates** JSON syntax using `jq` (if available) or Python
3. **Reports** file sizes
4. **Displays** validation results with status icons

**Validated Files**:
- `data/artists.json` - Artist profiles and audio samples
- `data/services.json` - Service packages and pricing
- `data/about.json` - About page content
- `data/homepage.json` - Homepage dynamic content
- `data/booking-policies.json` - Booking terms and policies
- `data/events.json` - Event listings and calendar
- `data/gallery.json` - Gallery images and categories
- `data/contact.json` - Contact form configuration

**Exit Codes**:
- `0`: All files valid
- `1`: One or more files invalid

---

## Deployment Automation

### `deploy.sh` - Production Deployment

**Purpose**: Deploys the website to production server.

**Usage**:
```bash
./scripts/deploy.sh production
# or
npm run deploy
```

**What it does**:
1. **Builds** production artifact (calls build.sh)
2. **Runs** pre-deployment tests
3. **Creates** deployment package
4. **Uploads** to production server (via rsync or FTP)
5. **Verifies** deployment success
6. **Runs** post-deployment health check

**Prerequisites**:
- Production server credentials configured
- SSH access or FTP credentials
- Build passes all tests

**Configuration**:
Edit `.env` with:
```env
DEPLOY_HOST=your-server.com
DEPLOY_USER=username
DEPLOY_PATH=/var/www/html/aria-amore
```

**Safety Features**:
- Backup before deployment
- Rollback capability
- Deployment verification
- Automatic health check

---

### `siteground-deploy.sh` - SiteGround Package Creator

**Purpose**: Creates a deployment package optimized for SiteGround hosting.

**Usage**:
```bash
./scripts/siteground-deploy.sh
# or
npm run deploy:siteground
```

**What it does**:
1. **Builds** production artifact
2. **Optimizes** for SiteGround/cPanel:
   - LiteSpeed configuration
   - cPanel-friendly structure
   - SMTP settings for local mail
3. **Creates** timestamped ZIP archive
4. **Generates** deployment instructions
5. **Includes** SiteGround-specific documentation

**Output**:
```
aria-amore-siteground-YYYYMMDD_HHMMSS.zip
```

**Package Contents**:
- All website files
- SiteGround-optimized .htaccess
- README with upload instructions
- SMTP configuration guide

**Manual Upload Steps**:
1. Download the generated ZIP file
2. Log into SiteGround cPanel
3. Navigate to File Manager
4. Upload to `public_html`
5. Extract archive
6. Configure `.env` file
7. Test website

---

## Maintenance Scripts

### `backup.sh` - Automated Backup

**Purpose**: Creates compressed backups with integrity checks.

**Usage**:
```bash
./scripts/backup.sh [backup_directory]
# or
npm run backup
```

**What it does**:
1. **Creates** timestamped backup archive
2. **Includes**:
   - All website files
   - Configuration files (.env if exists)
   - Data files
   - Logs (recent)
3. **Compresses** with gzip
4. **Generates** SHA256 checksum
5. **Cleans** old backups (>30 days)
6. **Verifies** backup integrity

**Output**:
```
aria-amore-backup-YYYYMMDD_HHMMSS.tar.gz
aria-amore-backup-YYYYMMDD_HHMMSS.tar.gz.sha256
```

**Backup Location**:
Default: `/var/backups/aria-amore/` or specified directory

**Retention Policy**:
- Keeps backups for 30 days
- Automatically removes older backups
- Can be customized in script

**Restore Process**:
```bash
# Extract backup
tar -xzf aria-amore-backup-YYYYMMDD_HHMMSS.tar.gz

# Verify checksum
sha256sum -c aria-amore-backup-YYYYMMDD_HHMMSS.tar.gz.sha256
```

---

### `health-check.sh` - Site Health Monitor

**Purpose**: Monitors website health and alerts on issues.

**Usage**:
```bash
./scripts/health-check.sh --once      # Single check
./scripts/health-check.sh             # Continuous monitoring
# or
npm run health
```

**What it checks**:
1. **HTTP Status**: Site returns 200 OK
2. **SSL Certificate**: Valid and not expired soon (<30 days warning)
3. **Disk Space**: Adequate storage available (<90% warning)
4. **Critical Files**: All required files exist
5. **Response Time**: Page loads within acceptable time
6. **Database Connection**: If applicable
7. **Email Configuration**: SMTP settings valid

**Alert Channels**:
- Console output
- Log file (`logs/health-check.log`)
- Email notifications (if configured)
- Slack/Discord webhooks (if configured)

**Exit Codes**:
- `0`: All checks passed
- `1`: One or more checks failed

**Continuous Mode**:
Runs checks every 5 minutes and logs results.

---

### `security-check.sh` - Security Auditor

**Purpose**: Validates security configuration and identifies vulnerabilities.

**Usage**:
```bash
./scripts/security-check.sh           # Scan only
./scripts/security-check.sh --fix     # Scan and auto-fix
# or
npm run security          # Scan
npm run security:fix      # Scan and fix
```

**What it checks**:
1. **File Permissions**:
   - `.env` is 600
   - Directories are 755
   - Files are 644
   - Scripts are executable
2. **Environment Security**:
   - No hardcoded secrets in code
   - `.env` not in git
   - Sensitive files in .gitignore
3. **Security Headers**:
   - CSP configured
   - HSTS enabled
   - X-Frame-Options set
   - X-Content-Type-Options set
4. **Form Protection**:
   - Honeypot fields present
   - Input sanitization
   - CSRF tokens
5. **HTTPS Enforcement**:
   - Redirect rules in .htaccess
   - All links use HTTPS

**Auto-Fix Capabilities**:
- Corrects file permissions
- Adds missing security headers
- Updates .htaccess rules
- Removes debug code

**Report Output**:
```
🔒 Security Check Results:
✓ File permissions correct
✓ No exposed secrets
✓ Security headers present
⚠ SSL certificate expires in 25 days
✓ Form protection enabled
```

---

## Testing & Validation

### `test.sh` - Comprehensive Test Suite

**Purpose**: Runs all automated tests to verify functionality.

**Usage**:
```bash
./scripts/test.sh              # Full suite (50+ tests)
./scripts/test.sh --quick      # Quick tests only
# or
npm test                # Full suite
npm run test:quick      # Quick tests
```

**Test Suites**:

#### 1. File Structure Tests (8 tests)
- ✅ Index page exists
- ✅ About page exists
- ✅ Services page exists
- ✅ Artists page exists
- ✅ .htaccess exists
- ✅ sendmail.php exists
- ✅ robots.txt exists
- ✅ sitemap.xml exists

#### 2. Data Files Tests (6 tests)
- ✅ artists.json exists and is valid
- ✅ services.json exists and is valid
- ✅ about.json exists and is valid

#### 3. Assets Tests (5 tests)
- ✅ CSS directory exists
- ✅ JS directory exists
- ✅ Main CSS exists
- ✅ Main JS exists
- ✅ Form validation JS exists

#### 4. Security Tests (5 tests)
- ✅ .env not in public
- ✅ .env.example exists
- ✅ Security headers in .htaccess
- ✅ HTTPS redirect configured
- ✅ Directory listing disabled

#### 5. Configuration Tests (3 tests)
- ✅ composer.json exists
- ✅ package.json exists
- ✅ vendor/autoload.php exists

#### 6. Scripts Tests (6 tests)
- ✅ backup.sh exists
- ✅ deploy.sh exists
- ✅ health-check.sh exists
- ✅ security-check.sh exists
- ✅ setup-env.sh exists
- ✅ Scripts are executable

#### 7. HTML Validation Tests (12 tests, full mode only)
- DOCTYPE present
- Title tags exist
- Character encoding set
- Meta tags complete

#### 8. Email Configuration Tests (4 tests)
- ✅ sendmail.php uses environment variables
- ✅ Email validation present
- ✅ Honeypot protection
- ✅ Input sanitization

#### 9. Documentation Tests (4 tests)
- ✅ README.md exists
- ✅ docs directory exists
- ✅ DEPLOYMENT.md exists
- ✅ SECURITY.md exists

#### 10. Build System Tests (2 tests)
- ✅ build.sh exists and is executable

**Test Results Format**:
```
🧪 Aria Amore - Test Suite
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Index page exists... PASS
→ About page exists... PASS
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Test Results:
   Passed: 39
   Failed: 0
   Pass Rate: 100%

✅ All tests passed!
```

**Exit Codes**:
- `0`: All tests passed
- `1`: One or more tests failed

---

## NPM Scripts

All automation can be triggered via npm commands for convenience.

### Available Commands

```json
{
  "start": "http-server -p 8000 public",
  "build": "./scripts/build.sh",
  "test": "./scripts/test.sh",
  "test:quick": "./scripts/test.sh --quick",
  "deploy": "./scripts/deploy.sh production",
  "deploy:siteground": "./scripts/siteground-deploy.sh",
  "security": "./scripts/security-check.sh",
  "security:fix": "./scripts/security-check.sh --fix",
  "backup": "./scripts/backup.sh",
  "health": "./scripts/health-check.sh --once",
  "setup": "./scripts/setup-env.sh development",
  "setup:prod": "./scripts/setup-env.sh production",
  "content:validate": "./scripts/update-content.sh"
}
```

### Command Usage

**Development**:
```bash
npm start              # Start local dev server
npm test               # Run full test suite
npm run test:quick     # Run quick tests
npm run content:validate  # Validate JSON files
```

**Build & Deploy**:
```bash
npm run build          # Build production artifact
npm run deploy         # Deploy to production
npm run deploy:siteground  # Create SiteGround package
```

**Maintenance**:
```bash
npm run backup         # Create backup
npm run health         # Run health check
npm run security       # Security audit
npm run security:fix   # Fix security issues
```

**Setup**:
```bash
npm run setup          # Development environment
npm run setup:prod     # Production environment
```

---

## Cron Jobs & Scheduling

### Recommended Cron Schedule

Add these to your server's crontab for automated maintenance:

```bash
# Edit crontab
crontab -e

# Add these lines:

# Daily backup at 2 AM
0 2 * * * cd /var/www/html/aria-amore && ./scripts/backup.sh >> /var/log/aria-amore-backup.log 2>&1

# Health check every 5 minutes
*/5 * * * * cd /var/www/html/aria-amore && ./scripts/health-check.sh --once >> /var/log/aria-amore-health.log 2>&1

# Weekly security check on Sundays at 3 AM
0 3 * * 0 cd /var/www/html/aria-amore && ./scripts/security-check.sh >> /var/log/aria-amore-security.log 2>&1

# Monthly full test suite on 1st at 4 AM
0 4 1 * * cd /var/www/html/aria-amore && ./scripts/test.sh >> /var/log/aria-amore-test.log 2>&1
```

### Cron Job Best Practices

1. **Always use absolute paths**: `/var/www/html/aria-amore/scripts/backup.sh`
2. **Log output**: Redirect to log files for monitoring
3. **Set proper timing**: Avoid peak traffic hours
4. **Test first**: Run manually before scheduling
5. **Monitor logs**: Check for errors regularly

---

## CI/CD Integration

### GitHub Actions (Optional)

The scripts can be integrated into GitHub Actions workflows:

```yaml
name: Test and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: ./scripts/test.sh
      
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Security check
        run: ./scripts/security-check.sh
      
  build:
    runs-on: ubuntu-latest
    needs: [test, security]
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: ./scripts/build.sh
```

---

## Troubleshooting

### Common Issues

**Build fails with "missing required files"**:
- Ensure all HTML pages exist in `public/`
- Check that assets are properly linked
- Verify symlinks are resolved

**Tests fail with permission errors**:
- Run: `chmod +x scripts/*.sh`
- Check file ownership

**Deployment fails with connection error**:
- Verify `.env` has correct server credentials
- Check SSH key authentication
- Test manual connection first

**Health check reports SSL issues**:
- Verify SSL certificate is installed
- Check certificate expiration date
- Ensure HTTPS redirect works

**Backup script runs out of space**:
- Clean old backups manually
- Adjust retention policy
- Check disk space: `df -h`

---

## Script Maintenance

### Updating Scripts

All scripts follow these conventions:
- **Bash shebang**: `#!/usr/bin/env bash`
- **Error handling**: `set -euo pipefail`
- **Color output**: Green for success, red for errors
- **Exit codes**: 0 for success, 1 for failure
- **Logging**: All output to stdout/stderr

### Adding New Scripts

1. Create script in `/scripts` directory
2. Make executable: `chmod +x scripts/new-script.sh`
3. Add to npm scripts in `package.json`
4. Document in this file
5. Add test coverage if applicable

---

## Performance Optimization

### Build Optimization
- Minify CSS/JS in build process
- Optimize images before deployment
- Enable GZIP compression
- Use CDN for static assets

### Script Performance
- Cache validation results
- Parallel processing where possible
- Incremental backups
- Smart health checks (skip if recent)

---

## Security Considerations

### Script Security
- Never commit credentials
- Use environment variables
- Validate all input
- Log security events
- Restrict file permissions

### Automation Security
- Limit cron job permissions
- Secure log files
- Rotate credentials regularly
- Monitor script execution
- Alert on failures

---

## Support & Resources

### Documentation
- [Quick Start Guide](QUICK-START.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Security Policy](SECURITY.md)
- [Testing Guide](TESTING.md)

### Getting Help
- Check script output for error messages
- Review log files in `/var/log/`
- Consult relevant documentation
- Contact: info@ariaamore.com

---

**Last Updated**: January 29, 2026  
**Version**: 1.0.0  
**Maintainer**: Modern Warrior School LLC
