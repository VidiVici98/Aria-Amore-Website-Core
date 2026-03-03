# 🎭 Aria Amore - Live Opera for Weddings & Celebrations

Transform your special day into an unforgettable performance with live opera music and entertainment. A complete, production-ready website with built-in analytics, social media integration, and comprehensive documentation.

---

## 📖 Documentation Overview

Pick your role below to find the right documentation:

### 👤 **I'm a Site Owner**
You want to manage content, update performers, change prices, and add photos?

**Start here:** [📘 Site Owner Manual](docs/SITE-OWNER-MANUAL.md)
- Edit website content easily (no coding required!)
- Manage performers, packages, and pricing
- Add photos and events to your gallery
- Troubleshoot common issues
- Simple, non-technical language with examples

### 👨‍💻 **I'm a Developer**
You want to set up, deploy, or extend the codebase?

**Start here:** [🚀 Getting Started Guide](docs/GETTING-STARTED.md)
- Local development setup
- Deployment instructions
- Architecture and file structure
- Scripts and automation tools
- Testing and security validation

### 🔧 **I'm Running the Operations**
You need to maintain the server, manage backups, and monitor performance?

**Start here:** [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md)
- Deployment & maintenance checklists
- Security configuration
- Analytics setup
- Backup and health monitoring
- Social media integration

---

## 🌟 Website Features

**For Your Visitors:**
- ✅ Beautiful, responsive design (mobile and desktop)
- ✅ Live chat widget for instant inquiries
- ✅ Interactive availability calendar
- ✅ Photo and video gallery showcase
- ✅ Complete repertoire/song catalog
- ✅ Artist profiles with audio clips
- ✅ Event history and upcoming shows
- ✅ Newsletter subscription
- ✅ Social media integration (Instagram, TikTok)
- ✅ Fully accessible (WCAG 2.1 compliant)

**For Your Business:**
- ✅ Customizable service packages and pricing
- ✅ Contact form with email notifications
- ✅ Built-in analytics (Google Analytics 4)
- ✅ Social media campaign tracking
- ✅ SEO optimized for search engines
- ✅ Security headers and HTTPS enforcement
- ✅ Performance optimized (fast loading)
- ✅ Automated backups available
- ✅ Production-ready infrastructure

---

## 📸 Website Pages & Screenshots

Your website includes 8 main pages. Here's what each does:

| Page | Purpose | Edit File |
|------|---------|-----------|
| **Homepage** | Hero section, featured performers, service packages | `data/homepage.json` |
| **About** | Company mission, story, and FAQ | `data/about.json` |
| **Services** | Service packages and pricing | `data/services.json` |
| **Artists** | Performer profiles with audio samples | `data/artists.json` |
| **Repertoire** | Searchable catalog of available songs | `data/repertoire.json` |
| **Events** | Upcoming and past performances | `data/events.json` |
| **Gallery** | Photos and videos from past events | `data/gallery.json` |
| **Contact** | Contact form and information | `data/contact.json` |

**Want to see what the site looks like?** Professional screenshots are available in the [docs/screenshots/](docs/screenshots/) folder showing all pages on desktop and mobile.

---

## 🎯 Quick Start Guide

### For Site Owners

**To edit your website content:**

1. Open the `data/` folder and find the JSON file you want to edit
2. Open it with a text editor (Notepad++, VS Code, or even Notepad)
3. Edit the text between the quotes
4. Save and upload the file to your server
5. Refresh your browser—changes appear instantly!

**For detailed instructions:** See the [📘 Site Owner Manual](docs/SITE-OWNER-MANUAL.md)

### For Developers

**To set up locally:**

```bash
# Clone the repository
git clone https://github.com/VidiVici98/Aria-Amore-Website-Core.git
cd Aria-Amore-Website-Core

# Run automated setup
npm run setup
# or manually: ./scripts/setup-env.sh development

# Start development server
npm start

# Open http://localhost:8000
```

**For detailed setup:** See the [🚀 Getting Started Guide](docs/GETTING-STARTED.md)


---

## 📋 Essential Links

### For Site Owners
- **[📘 Site Owner Manual](docs/SITE-OWNER-MANUAL.md)** — How to edit content, manage performers, update pricing
- **[🔗 Data File Reference](#data-file-reference)** — Quick reference of all editable files
- **[❓ Troubleshooting Guide](docs/SITE-OWNER-MANUAL.md#troubleshooting)** — Fix common issues

### For Developers
- **[🚀 Getting Started Guide](docs/GETTING-STARTED.md)** — Setup and deployment
- **[⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md)** — Server maintenance and monitoring
- **[📸 Screenshots Guide](docs/screenshots/)** — Visual documentation with site screenshots
- **[🔒 Security Policy](docs/SECURITY.md)** — Vulnerability reporting and security info

### For Technical Questions
- **[📚 Full Documentation Index](#documentation-index)** — Complete list of all guides
- **[🐛 Issues & Support](#support--resources)** — How to get help

---

## 🗂️ Data File Reference

All your editable website content lives in the `data/` folder:

```
data/
├── homepage.json       → Hero title, featured performers, events
├── artists.json        → Performer profiles, bios, audio
├── services.json       → Service packages and pricing
├── about.json          → About page, mission, FAQs
├── contact.json        → Contact info and social links
├── events.json         → Upcoming and past events
├── gallery.json        → Photo gallery
└── repertoire.json     → Song catalog
```

**Quick edit example:**
```json
// In data/services.json
"price": "$500"  →  "price": "$550"  // Save and done!
```

---

## 💻 Project Structure

```
aria-amore/
├── public/                 # Website pages
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── artists.html
│   ├── events.html
│   ├── gallery.html
│   ├── contact.html
│   └── repertoire.html
│
├── assets/                 # Styles, scripts, media
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── media/
│       ├── images/        # Upload photos here
│       └── audio/         # Upload audio here
│
├── data/                   # Editable content (JSON)
│   ├── homepage.json
│   ├── artists.json
│   ├── services.json
│   └── ... (other content files)
│
├── components/             # Shared header/footer
│   ├── header.html
│   └── footer.html
│
├── scripts/               # Automation scripts
│   ├── backup.sh
│   ├── health-check.sh
│   └── deploy.sh
│
└── docs/                  # Documentation (you are here!)
    ├── SITE-OWNER-MANUAL.md
    ├── GETTING-STARTED.md
    ├── OPERATIONS-GUIDE.md
    └── screenshots/
```

---

## 📊 Documentation Index

### 🎯 By Role

| Role | Read This |
|------|-----------|
| **Site Owner** | [📘 Site Owner Manual](docs/SITE-OWNER-MANUAL.md) |
| **Developer** | [🚀 Getting Started Guide](docs/GETTING-STARTED.md) |
| **Operations** | [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md) |
| **Security** | [🔒 Security Policy](docs/SECURITY.md) |

### 🎯 By Task

| Task | Read This |
|------|-----------|
| Edit website content | [📘 Site Owner Manual](docs/SITE-OWNER-MANUAL.md) |
| Set up locally | [🚀 Getting Started Guide](docs/GETTING-STARTED.md) |
| Deploy to production | [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md) |
| Manage analytics | [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md#analytics-setup) |
| Setup social media | [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md#social-media-integration) |
| Troubleshoot issues | [📘 Site Owner Manual - Troubleshooting](docs/SITE-OWNER-MANUAL.md#troubleshooting) |

### 📚 All Documentation Files

```
docs/
├── SITE-OWNER-MANUAL.md       # ⭐ Start here if you manage content
├── GETTING-STARTED.md         # Setup and development
├── OPERATIONS-GUIDE.md        # Deployment, analytics, security
├── SECURITY.md                # Security policies & reporting
├── SOCIAL-MEDIA-GUIDE.md      # Social media best practices
├── CHANGELOG.md               # Version history
└── screenshots/               # Website screenshots
    ├── README.md
    ├── 01-homepage-hero.png
    ├── 02-about-page.png
    └── ... (all page screenshots)
```

---

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
npm run screenshots       # Capture screenshots (requires server running)
```

### Prerequisites

- Web server (Apache/LiteSpeed with mod_rewrite, mod_headers, mod_deflate)
- PHP 7.4+ (for email)
- Node.js 14+ (for development)
- SiteGround hosting (or similar cPanel-based hosting)

### Quick Setup

```bash
# Clone repository
git clone https://github.com/VidiVici98/Aria-Amore-Website-Core.git
cd Aria-Amore-Website-Core

# Automated setup
npm run setup

# Start development server
npm start

# Open http://localhost:8000
```

### Available NPM Scripts

```bash
npm start              # Start development server
npm run setup          # Setup environment and permissions
npm test               # Run full test suite
npm run backup         # Create backup
npm run deploy         # Deploy to production
npm run health         # Health check
npm run security       # Security validation
npm run screenshots    # Capture website screenshots
```

**Full setup instructions:** [🚀 Getting Started Guide](docs/GETTING-STARTED.md)

---

## 🛠️ Common Tasks

### Editing Website Content

See [📘 Site Owner Manual](docs/SITE-OWNER-MANUAL.md) for detailed instructions with examples.

**Quick steps:**
1. Edit a JSON file in the `data/` folder
2. Save with UTF-8 encoding
3. Upload to your server
4. Refresh browser

### Deploying to Production

```bash
# Create deployment package
npm run deploy:siteground

# Or standard deployment
npm run deploy
```

**Full deployment guide:** [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md#deployment--maintenance)

### Setting Up Analytics

1. Get Google Analytics ID from analytics.google.com
2. Add to `.env`: `GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`
3. Deploy changes

**Full analytics guide:** [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md#analytics-setup)

### Monitoring Your Site

```bash
# One-time health check
./scripts/health-check.sh --once

# Continuous monitoring
./scripts/health-check.sh

# Security validation
./scripts/security-check.sh
```

---

## 📧 Email & Contact Forms

Contact form submissions are handled by `/sendmail.php` and sent to the email configured in your `.env` file.

**To configure email:**
1. Set `SITE_EMAIL` in your `.env` file
2. Configure SMTP settings (your hosting provider can help)
3. Test the contact form

**Email configuration options:**
- SiteGround SMTP (recommended)
- Gmail SMTP
- SendGrid API
- Standard PHP mail()

---

## 🔒 Security Features

✅ **Built-in:** HTTPS enforcement, security headers, input validation  
✅ **Form Protection:** Honeypot, bot detection, spam prevention  
✅ **File Security:** Secure permissions (644/755), .env protection  
✅ **Monitoring:** Automated health checks and security scans  

Run security validation:
```bash
npm run security        # Check for issues
npm run security:fix    # Auto-fix issues
```

**Full security info:** [🔒 Security Policy](docs/SECURITY.md)

---

## 📊 Performance & Analytics

### Page Speed
- Optimized images (WebP format)
- Minified CSS and JavaScript
- Browser caching enabled
- GZIP compression
- CDN ready

### Analytics
- Google Analytics 4 tracking
- Conversion tracking
- UTM campaign tracking
- Social media attribution
- Event tracking (CTAs, forms, videos)

**Setup guide:** [⚙️ Operations Guide - Analytics](docs/OPERATIONS-GUIDE.md#analytics-setup)

---

## 🧪 Testing & Quality Assurance

Run the test suite:
```bash
npm test              # Full test suite (50+ tests)
npm run test:quick    # Quick tests only
```

Tests validate:
- File structure integrity
- Data file syntax (JSON validation)
- Asset availability
- Security configuration
- Build system health

---

## 🌐 Deployment Options

### SiteGround (Recommended)

SiteGround hosting is fully supported with optimized configuration:

```bash
npm run deploy:siteground
```

Includes:
- LiteSpeed optimization
- cPanel integration
- SuperCacher compatibility
- One-click deployment

**Full guide:** [⚙️ Operations Guide - SiteGround](docs/OPERATIONS-GUIDE.md#deployment--maintenance)

### Other Hosting

Works with any hosting provider that supports:
- PHP 7.4+
- Apache with mod_rewrite
- cPanel or SSH access

---

## 📸 Website Content Overview

### Homepage (`data/homepage.json`)
- Hero title and tagline
- Featured performers carousel
- Event type overview
- Call-to-action buttons

### Services (`data/services.json`)
- Service package names
- Pricing
- Feature lists
- Package images

### Artists (`data/artists.json`)
- Performer profiles
- Bio and description
- Agent contact
- Audio samples
- Social media links

### Other Pages
- About (`data/about.json`) - Company story, mission, FAQs
- Contact (`data/contact.json`) - Email, phone, address, social links
- Events (`data/events.json`) - Upcoming and past performances
- Gallery (`data/gallery.json`) - Event photos and videos
- Repertoire (`data/repertoire.json`) - Available songs and arias

**Detailed editing guide:** [📘 Site Owner Manual](docs/SITE-OWNER-MANUAL.md)

---

## 🔄 Backups & Recovery

### Automatic Backups

```bash
./scripts/backup.sh
```

Creates timestamped, compressed backups with checksums:
- `aria-amore-backup-20260303_143022.tar.gz`
- Auto-cleanup (removes backups older than 30 days)

### Manual Backups

1. Connect via FTP or file manager
2. Download the entire `data/` folder
3. Save locally or to cloud storage

**Disaster recovery plan:** [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md)

---

## 🐛 Troubleshooting

### Quick Fixes

| Problem | Solution |
|---------|----------|
| Changes don't appear | Clear browser cache (Ctrl+F5 or Cmd+Shift+R) |
| JSON validation error | Check for missing commas or quotes → use jsonlint.com |
| Images not showing | Verify file path is correct (case-sensitive) |
| Forms not sending | Check .env email config; contact hosting provider |
| Site is slow | Optimize images, clear old files, check server load |

**Complete troubleshooting guide:** [📘 Site Owner Manual - Troubleshooting](docs/SITE-OWNER-MANUAL.md#troubleshooting)

---

## 💬 Support & Resources

### Getting Help

1. **For content editing questions:** See [📘 Site Owner Manual](docs/SITE-OWNER-MANUAL.md)
2. **For technical issues:** Check [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md)
3. **For security concerns:** Email security@ariaamore.com
4. **For general questions:** info@ariaamore.com

### Useful Links

- **GitHub Repository:** https://github.com/VidiVici98/Aria-Amore-Website-Core
- **JSON Validator:** https://jsonlint.com
- **Google Analytics:** https://analytics.google.com
- **Domain/Hosting Support:** Contact your provider

### Reporting Issues

- **Bugs/Features:** GitHub Issues
- **Security Issues:** security@ariaamore.com
- **Website Down:** Contact hosting provider immediately

---

## 📜 License & Legal

- **License:** See [LICENSE.txt](LICENSE.txt)
- **Privacy Policy:** [docs/SECURITY.md](docs/SECURITY.md)
- **Terms of Service:** Included in website (terms-of-service.html)

---

## 🎓 Learning Resources

### For Site Owners
- [📘 Site Owner Manual](docs/SITE-OWNER-MANUAL.md) — Everything you need
- [JSON Basics](https://jsoncrack.com) — Visual JSON editor and validator

### For Developers
- [🚀 Getting Started Guide](docs/GETTING-STARTED.md)
- [⚙️ Operations Guide](docs/OPERATIONS-GUIDE.md)
- [📸 Screenshots](docs/screenshots/)
- [🔒 Security Policy](docs/SECURITY.md)

---

## 🎯 Next Steps

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