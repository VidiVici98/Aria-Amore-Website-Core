# 🎭 Aria Amore - Live Opera for Weddings & Celebrations

Transform your special day into an unforgettable performance with live opera music and entertainment.

## 🌟 Features

- **Live Opera Performances** - Professional singers and musicians for your special event
- **Customizable Packages** - Choose from various performance options
- **Professional Artists** - Meet our talented performers
- **Wedding & Event Services** - Perfect for ceremonies, receptions, and celebrations
- **Responsive Design** - Beautiful experience on all devices
- **Optimized Performance** - Fast loading and smooth interactions
- **SEO Ready** - Discoverable through search engines
- **Accessible** - WCAG 2.1 compliant
- **Production Ready** - Security, backups, monitoring, and testing

## 📸 Documentation & Screenshots

**NEW!** Comprehensive documentation with screenshots of all page features:
- **[FEATURES.md](docs/FEATURES.md)** - Detailed visual guide to all website features with screenshots
- **[MISSING-FEATURES-SUMMARY.md](docs/MISSING-FEATURES-SUMMARY.md)** - **NEW!** Top 10+ features to add to the website
- **[FEATURE-RECOMMENDATIONS.md](docs/FEATURE-RECOMMENDATIONS.md)** - **NEW!** Detailed feature analysis with 18 recommendations
- **[CURRENT-VS-MISSING.md](docs/CURRENT-VS-MISSING.md)** - **NEW!** Side-by-side comparison of what exists vs. what's missing
- **[FEATURE-IMPLEMENTATION-CHECKLIST.md](docs/FEATURE-IMPLEMENTATION-CHECKLIST.md)** - **NEW!** Actionable checklist for implementation
- **[AUTOMATION.md](docs/AUTOMATION.md)** - Complete automation and build scripts documentation
- **[docs/screenshots/](docs/screenshots/)** - Full-page screenshots of all primary pages

## 📋 Quick Links

- [Getting Started](#-getting-started)
- [Development](#-development)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Security](#-security)
- [📸 Page Features Documentation](docs/FEATURES.md) - Screenshots and detailed feature descriptions
- [🎯 Missing Features Summary](docs/MISSING-FEATURES-SUMMARY.md) - **NEW!** Top 10+ features to add
- [📊 Feature Recommendations](docs/FEATURE-RECOMMENDATIONS.md) - **NEW!** Detailed 18-feature analysis
- [✅ Current vs. Missing Features](docs/CURRENT-VS-MISSING.md) - **NEW!** What you have vs. what's missing
- [☑️ Implementation Checklist](docs/FEATURE-IMPLEMENTATION-CHECKLIST.md) - **NEW!** Actionable task list
- [🤖 Automation & Build Scripts](docs/AUTOMATION.md) - Complete automation guide

## 🚀 Getting Started

### Prerequisites

- Web server (Apache/LiteSpeed with mod_rewrite, mod_headers, mod_deflate, mod_expires)
- PHP 7.4+ (for email functionality)
- Node.js 14+ (for local development)
- SiteGround hosting (or similar cPanel-based hosting)

### Quick Setup

```bash
# Clone repository
git clone https://github.com/VidiVici98/Aria-Amore-Website-Core.git
cd Aria-Amore-Website-Core

# Automated setup (creates .env, sets permissions, etc.)
npm run setup
# or
./scripts/setup-env.sh development

# Start development server
npm start
# or
php -S localhost:8000 -t public/

# Open http://localhost:8000 in your browser
```

### Available NPM Scripts

```bash
npm start              # Start development server
npm run build          # Build production files
npm test               # Run full test suite
npm run test:quick     # Run quick tests
npm run deploy         # Deploy to production
npm run deploy:siteground  # Create SiteGround deployment package
npm run security       # Run security checks
npm run security:fix   # Fix security issues automatically
npm run backup         # Create backup
npm run health         # Run health check
npm run content:validate  # Validate JSON content files
```

## 💻 Development

### Making Changes

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make changes and test locally
   ```bash
   ./test-site.sh http://localhost:8000
   ```

3. Commit and push
   ```bash
   git commit -m "feat: Add your feature description"
   git push origin feature/your-feature-name
   ```

### Project Structure

```
aria-amore/
├── index.html              # Home page
├── about.html              # About us
├── services.html           # Services & packages
├── artists.html            # Our performers
├── privacy-policy.html     # Privacy policy
├── terms-of-service.html   # Terms of service
├── 404.html          # 404 error page
├── robots.txt             # Search engine rules
├── sitemap.xml            # XML sitemap
├── security.txt           # Vulnerability reporting
├── .htaccess              # Apache configuration
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── package.json           # Node.js config
├── assets/
│   ├── css/
│   │   └── [All site CSS files]
│   ├── js/
│   │   └── [All JavaScript files]
│   └── media/
│       ├── audio/
│       │   └── [All audio files]
│       └── images/
│           └── [All images and video files]
│
├── data/
│   └── [All page content JSON files]
│
├── public/
│   ├── components/
│   │   ├── header.html
│   │   └── footer.html
│   ├── index.html [Homepage]
│   ├── about.html
│   ├── services.html
│   └── [Other HTML pages]
│
├── .env.example
├── LICENSE.txt
└── README.md
```

`/assets/`

Holds all design and functional assets for the website, divided into three subfolders:

- `css/` – Contains all stylesheet files (.css).
These define how your website looks and adapts across devices.

- `js/` – Contains all JavaScript files (.js).
These add interactivity and dynamic features to your pages.

- `media/` – Stores all visual and audio media used on the site.

  - `audio/` – Sound or music files used on the site.

  - `images/` – All image and video content.

<hr>

`/data/`

Contains all JSON files that hold editable content for your pages.
These are the files you’ll modify when you want to update text, titles, bios, or other page content — without directly editing HTML.

<hr>

`/`

This is where all your HTML files live — the actual pages of your site.

 - `components/` – Contains header.html and footer.html, which are dynamically loaded into each page.
If you need to update the header or footer (e.g., navigation links, copyright text), make those edits here — not on every page individually.

 - Other HTML files – These represent each page on your site (e.g., index.html, about.html, etc.).
Each one automatically loads the shared header and footer components.

<hr>

`.env.example`

A sample environment configuration file.
This is typically used to store project-specific settings or variables securely (for example, API keys or deployment paths).
Developers can duplicate this as .env and fill in their own values.

<hr>

`LICENSE.txt`

Contains licensing information and legal terms regarding the use, distribution, and modification of this project.

<hr>

`README.md`

The document you’re currently reading.
It explains how the project is structured, how to edit content, and how to maintain the site moving forward.

<hr>

All editable site content lives inside the `/data/` folder:

| File | Purpose |
|------|----------|
| `artists.json` | Controls all performer bios, portraits, audio clips, and social links. |
| `services.json` | Controls the “Packages” or “Plans” section (the carousel of services). |
| `about.json` | Holds text for the About page. |

Each of these files can be opened and edited in a **plain text editor** like:  
🟢 VS Code, Notepad++, or even basic Notepad (on Windows).

---

## ✍️ How to Edit Safely

### 1. Always Make a Backup First
Before making changes, copy the JSON file somewhere safe.  
If something looks wrong after saving, you can restore it.

### 2. Follow JSON Format Rules
JSON files are very strict about punctuation.

✅ **Good example:**
```json
{
  "name": "Aria Amore",
  "bio": "A celebrated soprano who performs worldwide."
}
```
❌ Bad example (notice the missing comma):
```
{
  "name": "Aria Amore"
  "bio": "A celebrated soprano who performs worldwide."
}
```
Tips:

- Strings (text) must always use double quotes "

- Separate each key/value pair with a comma

- Don’t leave a trailing comma at the end of a list

If unsure, you can validate your JSON using https://jsonlint.com

## Editing Artists (artists.json)

Each artist has their own object inside the list, like this:
```
[
  {
    "id": "aria-amore",
    "name": "Aria Amore",
    "portrait": "/images/artists/aria.jpg",
    "bio": "A luminous soprano known for her emotional performances.",
    "tracks": [
      {
        "id": "aria-track1",
        "title": "O Mio Babbino Caro",
        "sub": "Puccini – Gianni Schicchi",
        "src": "/audio/aria1.mp3"
      },
      {
        "id": "aria-track2",
        "title": "Ave Maria",
        "sub": "Schubert",
        "src": "/audio/aria2.mp3"
      }
    ],
    "social": {
      "instagram": "https://instagram.com/ariaamore",
      "youtube": "https://youtube.com/@ariaamore",
      "facebook": "https://facebook.com/ariaamore"
    }
  }
]
```
You can:

- Change the name, bio, or portrait path

- Add or remove audio tracks

- Update social media links

When you save and refresh the page, the website will automatically load the updated info.

## Editing Services / Packages (services.json)

Each package or plan has its own entry:

```
[
  {
    "id": "serenade",
    "name": "The Serenade Package",
    "price": "$500",
    "features": [
      "One professional opera singer",
      "Performance of two carefully selected songs",
      "Perfect for romantic dinners or proposals"
    ],
    "image": "/images/packages/serenade.jpg"
  },
  {
    "id": "grand-opera",
    "name": "The Grand Opera Experience",
    "price": "$2500",
    "features": [
      "Full cast of four performers",
      "Tailored program for your event",
      "Professional audio and staging"
    ],
    "image": "/images/packages/grand-opera.jpg"
  }
]
```
You can:

- Rename a package

- Adjust pricing or features

- Change the featured image

The site automatically rebuilds the carousel with your new data.

## How the Site Uses These Files
When someone visits the page:

1. The HTML provides the structure only.

2. JavaScript (artists.js, services.js, etc.) uses fetch() to load the matching JSON file.

3. The script inserts the JSON data into the page — images, text, and audio — in the right places.

So when you update a JSON file, you’re updating the website content directly — no need to touch the layout or code.

---

## ⚙️ Common Pitfalls

Below are some common issues you might run into when editing your JSON files, along with quick fixes.

| 🧩 Issue | ⚠️ Likely Cause | 💡 How to Fix |
|----------|----------------|---------------|
| The page looks empty | JSON syntax error (missing comma, quote, etc.) | Validate your file at [jsonlint.com](https://jsonlint.com) and correct any syntax errors. |
| Audio buttons don’t work | The `src` link for a track is missing or incorrect | Make sure each audio file path is correct and the file exists in `/audio/`. |
| Images not showing | Wrong file path or missing image | Double-check that your image is inside `/images/` and that the filename matches exactly (case-sensitive). |
| Layout looks broken | Edited or deleted HTML tags | Don’t edit HTML. Only change JSON content. The HTML structure is handled automatically. |
| New item not showing up | Missing comma or invalid array syntax | Check that every item (artist, package, etc.) in the JSON list is separated by a comma. |

---

## Pro Tip

If you want to temporarily **hide** an item (like an artist or a package),  
just add `"hidden": true` inside that object.  

The site’s JavaScript will skip any item with that flag.

Example:
```json
{
  "id": "aria-amore",
  "name": "Aria Amore",
  "hidden": true
}
```
When you’re ready to show it again, just remove the "hidden": true line.

## Saving Your Changes

After editing a JSON file:

1. Save your changes using UTF-8 encoding (this is the default in most text editors).

2. Upload the updated file to your site’s /data/ folder, replacing the old version.

3. Refresh your browser — your new content should appear immediately.

If you don’t see updates:

- Try clearing your browser cache (press `Ctrl + F5` or `Cmd + Shift + R` on Mac).

- Make sure the filename and folder match exactly.

## Troubleshooting Tips

If something still doesn’t look right:

1. Validate the JSON syntax at jsonlint.com

2. Open your browser console (press `F12` → Console) and check for any red error messages.

3. Restore your backup file if needed — just replace the broken JSON with your saved copy.

If all else fails, send the broken JSON file to your developer for a quick fix.

## 🛠️ Production Scripts & Maintenance

The project includes comprehensive scripts for server maintenance and deployment:

### Backup Script
Create timestamped backups with compression and checksums:
```bash
./scripts/backup.sh [backup_directory]
# Creates: aria-amore-backup-YYYYMMDD_HHMMSS.tar.gz
# With: SHA256 checksum
# Auto-cleanup: Removes backups older than 30 days
```

### Health Check Script
Monitor website health and send alerts:
```bash
./scripts/health-check.sh --once     # Run once
./scripts/health-check.sh             # Continuous monitoring
```
Checks:
- HTTP status (200 OK)
- SSL certificate expiry
- Disk space usage
- Critical files existence

### Security Check Script
Validate security configuration:
```bash
./scripts/security-check.sh           # Scan for issues
./scripts/security-check.sh --fix     # Auto-fix issues
```
Validates:
- File permissions
- Environment security
- Security headers
- Hardcoded secrets
- Form protection
- HTTPS enforcement

### Deployment Scripts
Deploy to production or create SiteGround packages:
```bash
./scripts/deploy.sh production        # Standard deployment
./scripts/siteground-deploy.sh        # SiteGround-specific package
```

### Content Management
Validate and manage JSON content files:
```bash
./scripts/update-content.sh           # Validate all files
./scripts/update-content.sh artists.json  # Validate specific file
```

### Environment Setup
Automated environment configuration:
```bash
./scripts/setup-env.sh development    # Dev environment
./scripts/setup-env.sh production     # Production environment
```

### Test Suite
Comprehensive testing:
```bash
./scripts/test.sh                     # Full test suite (50+ tests)
./scripts/test.sh --quick             # Quick tests only
```

## 🌐 SiteGround Deployment

This site is optimized for SiteGround hosting. See the complete deployment guide:

### Quick SiteGround Deployment

1. **Create Deployment Package**
   ```bash
   npm run deploy:siteground
   ```
   Creates: `aria-amore-siteground-YYYYMMDD_HHMMSS.zip`

2. **Upload to SiteGround**
   - Login to cPanel
   - Open File Manager
   - Go to `public_html`
   - Upload files from the package

3. **Configure Email**
   - Create `.env` file with SiteGround SMTP settings
   - Set up email accounts in cPanel

4. **Enable SSL**
   - Install Let's Encrypt certificate via cPanel
   - HTTPS redirect is automatic

### SiteGround Features Supported
✅ cPanel integration
✅ LiteSpeed optimization
✅ Local SMTP support
✅ SuperCacher compatibility
✅ Cloudflare CDN ready
✅ Automated backups
✅ SSH/Git deployment (GrowBig/GoGeek)

**Full Guide:** See [docs/SITEGROUND-DEPLOYMENT.md](docs/SITEGROUND-DEPLOYMENT.md)

## 📧 Email & Form Configuration

### Email Setup Options

**Option 1: SiteGround SMTP (Recommended)**
```env
SMTP_HOST=localhost
SMTP_USER=no-reply@yourdomain.com
SMTP_PASS=your-password
SMTP_PORT=465
SMTP_SECURE=ssl
```

**Option 2: Gmail SMTP**
```env
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
SMTP_PORT=587
SMTP_SECURE=tls
```

**Option 3: SendGrid**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=your-api-key
SMTP_PORT=587
SMTP_SECURE=tls
```

### Form Validation

Client-side validation with security features:
- Real-time field validation
- Honeypot spam protection
- Bot detection (time-based)
- Input sanitization
- XSS prevention

Include in your HTML:
```html
<script src="/assets/js/form-validation.js"></script>
<script>
  FormValidator.init('your-form-id', {
    realTimeValidation: true,
    honeypot: true,
    preventDoubleSubmit: true,
    submitHandler: function(form, data) {
      // Custom submit logic
    }
  });
</script>
```

## 🔒 Security Features

### Built-in Security
- **HTTPS enforcement** - Automatic HTTP to HTTPS redirect
- **Security headers** - CSP, HSTS, X-Frame-Options, etc.
- **Input sanitization** - XSS and injection prevention
- **Form protection** - Honeypot and bot detection
- **File permissions** - Secure defaults (644/755)
- **Secrets management** - Environment variables only

### Security Validation
Run regular security checks:
```bash
npm run security
```

### Monitoring
Set up automated health checks:
```bash
# Add to crontab (every 5 minutes)
*/5 * * * * /path/to/scripts/health-check.sh --once
```

## 📊 Testing

### Test Coverage
- ✅ File structure validation
- ✅ Data file integrity (JSON validation)
- ✅ Asset existence checks
- ✅ Security configuration
- ✅ Email configuration
- ✅ Build system validation
- ✅ Documentation completeness

### Running Tests
```bash
npm test              # Full suite (50+ tests)
npm run test:quick    # Quick tests only
```

## 🔧 Maintenance

### Daily Tasks (Automated)
- Automated backups (via cron)
- Health monitoring
- Error log monitoring

### Weekly Tasks
- Review error logs: `tail -f logs/errors.log`
- Check backup status
- Verify SSL certificate validity
- Monitor site performance

### Monthly Tasks
- Security audit: `npm run security`
- Content validation: `npm run content:validate`
- Performance testing (GTmetrix, PageSpeed)
- Backup restoration test

### Cron Job Setup
```bash
# Daily backup at 2 AM
0 2 * * * cd /path/to/site && ./scripts/backup.sh

# Health check every 5 minutes
*/5 * * * * cd /path/to/site && ./scripts/health-check.sh --once
```