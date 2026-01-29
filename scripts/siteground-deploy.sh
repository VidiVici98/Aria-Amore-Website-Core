#!/usr/bin/env bash
set -euo pipefail

# ====================================
# Aria Amore - SiteGround Deployment Package Creator
# ====================================
# Creates a deployment-ready package for SiteGround
# Usage: ./scripts/siteground-deploy.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DEPLOY_PACKAGE="aria-amore-siteground-${TIMESTAMP}.zip"
TEMP_DIR=$(mktemp -d)

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "🚀 SiteGround Deployment Package Creator"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Trap to cleanup temp directory
trap "rm -rf $TEMP_DIR" EXIT

# Step 1: Run build
echo -e "\n→ Building production files..."
if [ -f "$SCRIPT_DIR/build.sh" ]; then
    bash "$SCRIPT_DIR/build.sh"
    echo -e "${GREEN}✓ Build complete${NC}"
else
    echo -e "${YELLOW}⚠ build.sh not found, using existing files${NC}"
fi

# Step 2: Create deployment directory structure
echo -e "\n→ Creating deployment structure..."
mkdir -p "$TEMP_DIR/public_html"
mkdir -p "$TEMP_DIR/config"
mkdir -p "$TEMP_DIR/scripts"
mkdir -p "$TEMP_DIR/docs"

# Step 3: Copy files to deployment structure
echo -e "\n→ Copying files..."

# Copy public files
if [ -d "$REPO_ROOT/build" ]; then
    cp -r "$REPO_ROOT/build/"* "$TEMP_DIR/public_html/"
    echo -e "${GREEN}✓ Copied from build directory${NC}"
elif [ -d "$REPO_ROOT/public" ]; then
    cp -r "$REPO_ROOT/public/"* "$TEMP_DIR/public_html/"
    cp -r "$REPO_ROOT/assets" "$TEMP_DIR/public_html/"
    cp -r "$REPO_ROOT/data" "$TEMP_DIR/public_html/"
    cp -r "$REPO_ROOT/components" "$TEMP_DIR/public_html/"
    echo -e "${GREEN}✓ Copied from source directories${NC}"
fi

# Copy essential root files
cp "$REPO_ROOT/.htaccess" "$TEMP_DIR/public_html/" 2>/dev/null || true
cp "$REPO_ROOT/sendmail.php" "$TEMP_DIR/public_html/" 2>/dev/null || true

# Copy PHPMailer if it exists
if [ -d "$REPO_ROOT/PHPMailer" ]; then
    cp -r "$REPO_ROOT/PHPMailer" "$TEMP_DIR/public_html/"
    echo -e "${GREEN}✓ Copied PHPMailer${NC}"
fi

# Copy vendor directory if it exists
if [ -d "$REPO_ROOT/vendor" ]; then
    cp -r "$REPO_ROOT/vendor" "$TEMP_DIR/public_html/"
    echo -e "${GREEN}✓ Copied vendor directory${NC}"
fi

# Copy configuration examples
cp "$REPO_ROOT/.env.example" "$TEMP_DIR/config/" 2>/dev/null || true

# Copy documentation
cp "$REPO_ROOT/docs/SITEGROUND-DEPLOYMENT.md" "$TEMP_DIR/docs/" 2>/dev/null || true
cp "$REPO_ROOT/README.md" "$TEMP_DIR/docs/" 2>/dev/null || true

# Step 4: Create SiteGround-specific .htaccess adjustments
echo -e "\n→ Optimizing for SiteGround..."

# Check if we need to add any SiteGround-specific directives
cat >> "$TEMP_DIR/public_html/.htaccess" << 'EOF'

# SiteGround-specific optimizations
<IfModule LiteSpeed>
    # LiteSpeed Cache configuration
    CacheLookup on
</IfModule>

# Prevent access to sensitive files on SiteGround
<FilesMatch "^(composer\.json|composer\.lock|package\.json|package-lock\.json)$">
    Order allow,deny
    Deny from all
</FilesMatch>
EOF

# Step 5: Create deployment instructions
cat > "$TEMP_DIR/DEPLOYMENT-INSTRUCTIONS.txt" << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║      SITEGROUND DEPLOYMENT INSTRUCTIONS                       ║
║                 Aria Amore Website                           ║
╚══════════════════════════════════════════════════════════════╝

📦 QUICK START (File Manager Method)
────────────────────────────────────────────────────────────────
1. Login to SiteGround cPanel
2. Open File Manager
3. Navigate to public_html directory
4. Delete any existing default files (index.html, etc.)
5. Upload ALL files from the "public_html" folder in this package
6. Set permissions:
   - Files: 644
   - Directories: 755

📧 EMAIL CONFIGURATION
────────────────────────────────────────────────────────────────
1. Create .env file in public_html:
   - Copy config/.env.example to public_html/.env
   - Edit with your settings:
   
     SMTP_HOST=localhost
     SMTP_USER=your-email@yourdomain.com
     SMTP_PASS=your-email-password
     SMTP_PORT=465
     SMTP_SECURE=ssl

2. Create email account in cPanel → Email Accounts

🔒 SSL/HTTPS SETUP
────────────────────────────────────────────────────────────────
1. Install free Let's Encrypt SSL:
   - cPanel → Let's Encrypt
   - Select domain → Install
2. The .htaccess will automatically redirect HTTP to HTTPS

⚙️ OPTIONAL: CRON JOBS (GrowBig/GoGeek plans)
────────────────────────────────────────────────────────────────
Set up in cPanel → Cron Jobs:

Daily Backup (2 AM):
  0 2 * * * cd /home/USERNAME && ./scripts/backup.sh

Note: Replace USERNAME with your cPanel username

🎯 VERIFY DEPLOYMENT
────────────────────────────────────────────────────────────────
1. Visit: https://yourdomain.com
2. Test contact form
3. Check email delivery
4. Verify all pages load correctly

📚 DETAILED INSTRUCTIONS
────────────────────────────────────────────────────────────────
See docs/SITEGROUND-DEPLOYMENT.md for complete guide

💡 TROUBLESHOOTING
────────────────────────────────────────────────────────────────
- Email not working? Check cPanel → Error Log
- 404 errors? Verify .htaccess uploaded correctly
- Permission errors? Set files=644, folders=755

🆘 SUPPORT
────────────────────────────────────────────────────────────────
- SiteGround: 24/7 chat/phone support
- Project: security@ariaamore.com

✅ DEPLOYMENT CHECKLIST
────────────────────────────────────────────────────────────────
□ All files uploaded to public_html
□ .env file configured
□ SSL certificate installed
□ Email accounts created
□ Contact form tested
□ All pages verified working
□ Performance checked (GTmetrix)
□ Security headers verified (securityheaders.com)

═══════════════════════════════════════════════════════════════
EOF

# Step 6: Create .env template
cat > "$TEMP_DIR/public_html/.env.example" << 'EOF'
# Aria Amore - SiteGround Configuration

# Site Configuration
SITE_NAME=Aria Amore
SITE_URL=https://yourdomain.com
SITE_EMAIL=info@yourdomain.com
SECURITY_EMAIL=security@yourdomain.com

# SiteGround Email Configuration (Option 1: Local)
SMTP_HOST=localhost
SMTP_USER=no-reply@yourdomain.com
SMTP_PASS=your-email-password
SMTP_PORT=465
SMTP_SECURE=ssl
FROM_EMAIL=no-reply@yourdomain.com
FROM_NAME=Aria Amore

# Or use Gmail (Option 2: External)
# SMTP_HOST=smtp.gmail.com
# SMTP_USER=your-gmail@gmail.com
# SMTP_PASS=your-app-password
# SMTP_PORT=587
# SMTP_SECURE=tls

# Or use SendGrid (Option 3: Service)
# SMTP_HOST=smtp.sendgrid.net
# SMTP_USER=apikey
# SMTP_PASS=your-sendgrid-api-key
# SMTP_PORT=587
# SMTP_SECURE=tls

# Google Analytics (optional)
GOOGLE_ANALYTICS_ID=
GTAG_ID=
EOF

# Step 7: Create README for the package
cat > "$TEMP_DIR/README-FIRST.txt" << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║             ARIA AMORE - SITEGROUND DEPLOYMENT               ║
╚══════════════════════════════════════════════════════════════╝

👋 Welcome!

This is your complete deployment package for SiteGround hosting.

📁 PACKAGE CONTENTS:
────────────────────────────────────────────────────────────────
├── public_html/          ← Upload these files to your public_html
│   ├── index.html
│   ├── sendmail.php
│   ├── .htaccess
│   ├── assets/
│   ├── data/
│   └── ...
├── config/
│   └── .env.example      ← Configuration template
├── docs/
│   └── SITEGROUND-DEPLOYMENT.md  ← Full deployment guide
└── DEPLOYMENT-INSTRUCTIONS.txt   ← Quick start guide

🚀 QUICK START:
────────────────────────────────────────────────────────────────
1. Read: DEPLOYMENT-INSTRUCTIONS.txt
2. Upload: All files from public_html/ to your SiteGround public_html
3. Configure: Create .env file with your settings
4. Test: Visit your domain and test functionality

📖 NEED HELP?
────────────────────────────────────────────────────────────────
→ Read docs/SITEGROUND-DEPLOYMENT.md for detailed instructions
→ Contact SiteGround support (24/7 available)
→ Email: security@ariaamore.com

✨ That's it! Your site is ready to deploy.
EOF

# Step 8: Set proper permissions
echo -e "\n→ Setting permissions..."
find "$TEMP_DIR/public_html" -type f -exec chmod 644 {} \;
find "$TEMP_DIR/public_html" -type d -exec chmod 755 {} \;
chmod 600 "$TEMP_DIR/public_html/.env.example" 2>/dev/null || true

# Step 9: Create deployment package
echo -e "\n→ Creating deployment package..."
cd "$TEMP_DIR"
if command -v zip &> /dev/null; then
    zip -r "$REPO_ROOT/$DEPLOY_PACKAGE" . > /dev/null
    echo -e "${GREEN}✓ Created ZIP package${NC}"
else
    tar -czf "$REPO_ROOT/${DEPLOY_PACKAGE%.zip}.tar.gz" .
    DEPLOY_PACKAGE="${DEPLOY_PACKAGE%.zip}.tar.gz"
    echo -e "${GREEN}✓ Created TAR.GZ package${NC}"
fi

# Step 10: Calculate package size
PACKAGE_SIZE=$(du -h "$REPO_ROOT/$DEPLOY_PACKAGE" | cut -f1)

# Summary
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ SiteGround deployment package created!${NC}"
echo -e "\n📦 Package Details:"
echo -e "   File: ${BLUE}$DEPLOY_PACKAGE${NC}"
echo -e "   Size: ${BLUE}$PACKAGE_SIZE${NC}"
echo -e "   Location: ${BLUE}$REPO_ROOT/${NC}"

echo -e "\n📋 Next Steps:"
echo -e "   1. Download: $DEPLOY_PACKAGE"
echo -e "   2. Extract package locally"
echo -e "   3. Read: README-FIRST.txt"
echo -e "   4. Follow: DEPLOYMENT-INSTRUCTIONS.txt"
echo -e "   5. Upload to SiteGround cPanel"

echo -e "\n💡 Quick Upload Methods:"
echo -e "   • File Manager (easiest)"
echo -e "   • FTP/SFTP (recommended)"
echo -e "   • SSH (advanced, requires GrowBig/GoGeek)"

echo -e "\n✨ Ready for SiteGround deployment!"
