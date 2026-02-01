# Dependencies Management Guide

## 📦 Overview

This guide covers all dependency management for the Aria Amore website, including Node.js (npm), PHP (Composer), and best practices for keeping dependencies secure and up-to-date.

## 🎯 Quick Reference

| Package Manager | File | Lock File | Purpose |
|----------------|------|-----------|---------|
| npm | `package.json` | `package-lock.json` | JavaScript/Node.js dependencies |
| Composer | `composer.json` | `composer.lock` | PHP dependencies (email functionality) |

## 📋 Node.js Dependencies (npm)

### Current Dependencies

#### Production Dependencies
None - This is a static website with no Node.js runtime dependencies.

#### Development Dependencies

```json
{
  "devDependencies": {
    "http-server": "^14.1.1",    // Local development server
    "playwright": "^1.58.0"       // Browser automation for testing/screenshots
  }
}
```

### Installation

```bash
# Install all dependencies
npm install

# Install only production dependencies (none currently)
npm install --production

# Install specific dependency
npm install <package-name> --save-dev
```

### Common Commands

```bash
# Check for outdated packages
npm outdated

# Update all packages (respecting semver)
npm update

# Update specific package
npm update <package-name>

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities automatically
npm audit fix

# List all installed packages
npm list

# View package info
npm info <package-name>
```

### Version Management

We use semantic versioning (semver) with caret (^) ranges:
- `^14.1.1` = "Compatible with version 14.1.1"
- Allows updates: 14.1.x and 14.x.x (but not 15.x.x)
- Safe for automatic updates

### Adding New Dependencies

#### For Development Tools

```bash
# Add as dev dependency
npm install <package-name> --save-dev

# Example: Add a testing library
npm install jest --save-dev
```

#### For Production

```bash
# Add as production dependency (if needed in future)
npm install <package-name> --save
```

⚠️ **Security Check:** Always run security audit before adding:
```bash
npm audit
```

### Updating Dependencies Safely

```bash
# 1. Check current status
npm outdated

# 2. Test updates in development first
npm update

# 3. Run tests
npm test

# 4. Verify site works
npm start
# Visit http://localhost:8000 and test

# 5. Commit if everything works
git add package.json package-lock.json
git commit -m "chore: Update npm dependencies"
```

## 🐘 PHP Dependencies (Composer)

### Current Dependencies

#### Production Dependencies

```json
{
  "require": {
    "php": ">=7.4",
    "phpmailer/phpmailer": "^6.8"
  }
}
```

#### Development Dependencies

```json
{
  "require-dev": {
    "phpunit/phpunit": "^9.0"
  }
}
```

### Installation

```bash
# Install all dependencies
composer install

# Install only production dependencies
composer install --no-dev

# Update all dependencies
composer update

# Update specific package
composer update phpmailer/phpmailer
```

### Common Commands

```bash
# Check for outdated packages
composer outdated

# Show installed packages
composer show

# Validate composer.json
composer validate

# Show why a package is installed
composer why <package-name>

# Check security vulnerabilities
composer audit

# Install new package
composer require <package-name>

# Remove package
composer remove <package-name>
```

### PHPMailer Specific

**Current Version:** 6.8.x

**Update Strategy:**
```bash
# Check for updates
composer outdated phpmailer/phpmailer

# Update to latest 6.x version
composer update phpmailer/phpmailer

# Or update to specific version
composer require phpmailer/phpmailer:^6.9
```

**Security Notes:**
- PHPMailer has had security issues in the past
- Always keep updated to latest 6.x version
- Monitor [PHPMailer Security Advisories](https://github.com/PHPMailer/PHPMailer/security)

### Adding New PHP Dependencies

```bash
# Add package
composer require <vendor>/<package>

# Example: Add a utility library
composer require symfony/validator
```

⚠️ **Security Check:** Always audit after adding:
```bash
composer audit
```

## 🔒 Security Best Practices

### Regular Maintenance Schedule

#### Weekly
- [ ] Check for security advisories
- [ ] Monitor npm/composer audit output

#### Monthly
- [ ] Run `npm audit`
- [ ] Run `composer audit`
- [ ] Review dependency update notifications
- [ ] Update patch versions (x.x.X)

#### Quarterly
- [ ] Update minor versions (x.X.x)
- [ ] Test all functionality after updates
- [ ] Review and remove unused dependencies

#### Annually
- [ ] Consider major version updates (X.x.x)
- [ ] Review all dependencies for alternatives
- [ ] Clean up package.json/composer.json

### Security Audit Process

```bash
# 1. Check for vulnerabilities
npm audit
composer audit

# 2. Review findings
# Read severity levels: critical, high, moderate, low

# 3. Attempt automatic fix
npm audit fix
# (Composer doesn't have auto-fix - update manually)

# 4. For remaining issues, update manually
npm update <vulnerable-package>
composer update <vulnerable-package>

# 5. If no fix available, consider:
# - Finding alternative package
# - Accepting risk (document in SECURITY.md)
# - Waiting for patch
# - Implementing workaround
```

### Lock Files

**Always commit lock files:**
- ✅ `package-lock.json`
- ✅ `composer.lock`

**Why?**
- Ensures consistent installations across environments
- Locks exact dependency versions
- Prevents "works on my machine" issues

```bash
# Commit lock files
git add package-lock.json composer.lock
git commit -m "chore: Update dependency lock files"
```

## 📊 Dependency Analysis

### Check Bundle Size (for any future client-side deps)

```bash
# Install analyzer
npm install -g webpack-bundle-analyzer

# For future use if we add bundled JavaScript
```

### Find Unused Dependencies

```bash
# Install depcheck
npm install -g depcheck

# Run analysis
depcheck

# Remove unused dependencies
npm uninstall <unused-package>
```

## 🌐 Environment-Specific Dependencies

### Development Only

These should be in `devDependencies`:
- Testing frameworks (Jest, PHPUnit)
- Build tools (Webpack, Babel)
- Linters (ESLint, PHPStan)
- Development servers (http-server)

### Production

These should be in `dependencies`:
- Runtime libraries (currently none for frontend)
- PHP packages needed in production (PHPMailer)

### Verify Environment

```bash
# Check what's installed
npm list --depth=0

# Production install (skips devDependencies)
npm install --production
composer install --no-dev
```

## 🔄 Continuous Integration

### Automated Dependency Checks

Add to your CI/CD pipeline:

```yaml
# .github/workflows/dependencies.yml
name: Dependency Check

on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly on Monday
  pull_request:
    paths:
      - 'package.json'
      - 'composer.json'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14'
      
      - name: npm audit
        run: |
          npm install
          npm audit
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '7.4'
      
      - name: composer audit
        run: |
          composer install
          composer audit
```

## 📝 Documenting Dependencies

### Why Each Dependency Exists

#### http-server
**Purpose:** Local development web server  
**Why:** Enables testing locally without Apache/Nginx  
**Alternative:** Any static server (Python's http.server, Live Server VS Code extension)

#### playwright
**Purpose:** Browser automation for screenshots and testing  
**Why:** Automated screenshot capture for documentation  
**Alternative:** Puppeteer, Selenium

#### phpmailer/phpmailer
**Purpose:** Send emails via SMTP  
**Why:** Contact form and booking emails  
**Alternative:** Native PHP mail() (less reliable), SendGrid SDK

#### phpunit/phpunit
**Purpose:** PHP testing framework  
**Why:** Test email functionality and form processing  
**Alternative:** Codeception, Pest

### Adding Documentation

When adding new dependency, document:

1. **What it does**
2. **Why it's needed**
3. **Alternatives considered**
4. **Security implications**

Example:
```json
{
  "dependencies": {
    "new-package": "^1.0.0"  // Used for XYZ feature, chosen over ABC because...
  }
}
```

## 🚨 Troubleshooting

### Common Issues

#### "Cannot find module"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### "Composer version conflict"
```bash
# Solution: Clear cache and reinstall
composer clear-cache
composer install
```

#### "npm audit found vulnerabilities"
```bash
# Try automatic fix
npm audit fix

# If that doesn't work, update specific packages
npm update <package-name>

# Force update (use carefully)
npm audit fix --force
```

#### "Composer memory limit"
```bash
# Increase PHP memory limit
php -d memory_limit=2G /usr/local/bin/composer install
```

### Version Conflicts

If you encounter version conflicts:

1. **Check compatibility:**
   ```bash
   npm info <package-name> versions
   composer show <package-name> --all
   ```

2. **Try updating other packages:**
   ```bash
   npm update
   composer update
   ```

3. **Check for known issues:**
   - GitHub Issues
   - Stack Overflow
   - Package documentation

4. **Consider alternatives:**
   - Different version
   - Different package
   - Remove dependency

## 📦 Package Management Tools

### npm

**Config file:** `.npmrc`

```ini
# Recommended settings
save-exact=false          # Use semver ranges (^)
package-lock=true         # Always create lock file
audit-level=moderate      # Alert on moderate+ vulnerabilities
fund=false                # Disable funding messages
```

### Composer

**Config file:** `composer.json` config section

```json
{
  "config": {
    "optimize-autoloader": true,
    "preferred-install": "dist",
    "sort-packages": true
  }
}
```

## 🎓 Best Practices Checklist

- [ ] Always use lock files (package-lock.json, composer.lock)
- [ ] Run security audits before deploying
- [ ] Keep dependencies up to date (monthly at minimum)
- [ ] Use semantic versioning with appropriate ranges
- [ ] Document why each dependency exists
- [ ] Remove unused dependencies
- [ ] Test after updates
- [ ] Use specific versions in production
- [ ] Monitor security advisories
- [ ] Have rollback plan for updates

## 📚 Additional Resources

### npm
- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)

### Composer
- [Composer Documentation](https://getcomposer.org/doc/)
- [Packagist](https://packagist.org/) - PHP package repository
- [Composer Security](https://getcomposer.org/doc/articles/security.md)

### Security
- [GitHub Security Advisories](https://github.com/advisories)
- [Snyk Vulnerability Database](https://snyk.io/vuln/)
- [CVE Details](https://www.cvedetails.com/)

## 🔧 Automation Scripts

### Check All Dependencies

Create `scripts/check-dependencies.sh`:

```bash
#!/bin/bash
echo "Checking npm dependencies..."
npm outdated

echo "\nChecking for npm vulnerabilities..."
npm audit

echo "\nChecking Composer dependencies..."
composer outdated

echo "\nChecking for Composer vulnerabilities..."
composer audit

echo "\nDependency check complete!"
```

Make executable:
```bash
chmod +x scripts/check-dependencies.sh
```

Run:
```bash
./scripts/check-dependencies.sh
```

### Update All Dependencies

Create `scripts/update-dependencies.sh`:

```bash
#!/bin/bash
echo "Updating npm dependencies..."
npm update

echo "\nUpdating Composer dependencies..."
composer update

echo "\nRunning tests..."
npm test

echo "\nUpdate complete! Review changes before committing."
```

## 📞 Support

Need help with dependencies?
- Check package documentation first
- Search GitHub issues
- Ask on Stack Overflow
- Email: info@ariaamore.com

## ✅ Implementation Checklist

- [ ] npm dependencies installed
- [ ] Composer dependencies verified
- [ ] Lock files committed to git
- [ ] Security audit run and passed
- [ ] Documentation updated
- [ ] Team trained on update process
- [ ] Automated checks configured
- [ ] Update schedule established
- [ ] Rollback procedure documented
