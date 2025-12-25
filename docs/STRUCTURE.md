# 📁 Directory Structure Guide

## Final Organized Structure

```
Aria-Amore-Website-Core/
│
├── 📄 Root Configuration Files (Deployment & Environment)
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   ├── .htaccess                 # Apache security & performance config
│   ├── .well-known/
│   │   └── security.txt          # Standard security vulnerability reporting
│   ├── package.json              # Node.js project metadata
│   ├── README.md                 # Main project documentation
│   └── LICENSE.txt               # Project license
│
├── 📚 docs/ (Documentation & Guides)
│   ├── QUICK-START.md            # ⭐ START HERE - Deployment guide (9 phases)
│   ├── CHECKLIST.md              # Deployment verification checklist
│   ├── PRODUCTION-SETUP.md       # Server setup (Apache & Nginx)
│   ├── PRODUCTION-READY.md       # Production readiness summary
│   ├── DEPLOYMENT.md             # Pre-deployment checklist
│   ├── SECURITY.md               # Security policies & reporting
│   ├── TESTING.md                # Testing procedures
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   ├── CHANGELOG.md              # Version history
│   ├── RESOURCES.md              # External tools & references
│   ├── IMPLEMENTATION-SUMMARY.md # What was created & status
│   └── SEO-TAGS.html             # SEO meta tags reference
│
├── 📂 public/ (Web-Accessible Files - Served to Browsers)
│   ├── index.html                # Homepage
│   ├── about.html                # About page
│   ├── services.html             # Services page
│   ├── artists.html              # Artists/performers page
│   ├── privacy-policy.html       # Privacy policy (legal)
│   ├── terms-of-service.html     # Terms of service (legal)
│   ├── 404-page.html             # 404 error page
│   ├── maintenance-page.html     # Maintenance page
│   ├── robots.txt                # Search engine crawler rules
│   ├── sitemap.xml               # XML sitemap for SEO
│   ├── security.txt              # Vulnerability reporting endpoint
│   ├── humans.txt                # Human-readable team information
│   └── robots.txt (duplicate)    # Also in root for server config
│
├── 🔧 scripts/ (Automation & Deployment Scripts)
│   ├── backup.sh                 # Automated backup with retention
│   ├── deploy.sh                 # Production deployment script
│   ├── health-check.sh           # Site health monitoring
│   ├── test-site.sh              # Comprehensive testing suite
│   ├── start-dev-server.sh       # Local development server
│   └── pre-commit-hook.sh        # Git pre-commit security checks
│
├── 🎨 assets/ (Static Assets)
│   ├── css/                      # Stylesheets
│   │   ├── styles.css
│   │   ├── about.css
│   │   ├── services.css
│   │   ├── artists.css
│   │   └── maintenance-404.css
│   ├── js/                       # JavaScript files
│   │   ├── main.js
│   │   ├── about.js
│   │   ├── services.js
│   │   └── artists.js
│   └── media/                    # Media files
│       ├── images/               # Image files
│       ├── icons/                # Icon files & web manifest
│       └── audio/                # Audio files
│
├── 🧩 components/ (Reusable HTML Components)
│   ├── header.html               # Header component
│   └── footer.html               # Footer component
│
├── 📊 data/ (JSON Data Files)
│   ├── homepage.json             # Homepage content data
│   ├── about.json                # About page data
│   ├── services.json             # Services/packages data
│   ├── artists.json              # Artists/performers data
│   └── booking-policies.json     # Booking policies data
│
└── .git/                         # Git repository (not deployed)
```

---

## 📋 File Organization by Type

### Configuration Files (Root)
- `.env.example` - Environment template
- `.gitignore` - Git ignore patterns
- `.htaccess` - Apache configuration
- `.well-known/security.txt` - Security contact
- `package.json` - Node.js config
- `README.md` - Main docs
- `LICENSE.txt` - License

### Documentation Files (docs/)
- **Getting Started**: QUICK-START.md
- **Deployment**: CHECKLIST.md, DEPLOYMENT.md, PRODUCTION-SETUP.md, PRODUCTION-READY.md
- **Development**: CONTRIBUTING.md, TESTING.md
- **Operations**: SECURITY.md, RESOURCES.md
- **Reference**: IMPLEMENTATION-SUMMARY.md, SEO-TAGS.html, CHANGELOG.md

### Public Web Files (public/)
- **Pages**: *.html files (served to browsers)
- **SEO**: robots.txt, sitemap.xml, humans.txt
- **Security**: security.txt
- **Error Pages**: 404-page.html, maintenance-page.html

### Scripts (scripts/)
- **Deployment**: deploy.sh
- **Operations**: backup.sh, health-check.sh
- **Development**: start-dev-server.sh, test-site.sh
- **Git Hooks**: pre-commit-hook.sh

### Static Assets (assets/)
- **CSS**: Stylesheets in assets/css/
- **JavaScript**: Scripts in assets/js/
- **Media**: Images, icons, audio in assets/media/

### Components (components/)
- **Reusable HTML**: header.html, footer.html

### Content (data/)
- **JSON Data**: Homepage, about, services, artists, policies

---

## 🚀 Deployment Configuration

### For Apache (VirtualHost)
```apache
<VirtualHost *:443>
  ServerName ariaamore.com
  DocumentRoot /var/www/html/aria-amore/public
  
  <Directory /var/www/html/aria-amore/public>
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

### For Nginx
```nginx
server {
  listen 443 ssl http2;
  server_name ariaamore.com;
  root /var/www/html/aria-amore/public;
  index index.html;
}
```

---

## 📂 Directory Purposes

### Root Directory
**Purpose**: Configuration, documentation, and project management
**Serve**: Not directly served (configured in Apache/Nginx to serve public/)
**Contains**: Config files, docs, scripts, non-public assets

### public/ Directory
**Purpose**: Web-accessible files served to visitors
**Serve**: Set as DocumentRoot in server config
**Contains**: HTML pages, CSS, JS, images, robots.txt, sitemap.xml

### docs/ Directory
**Purpose**: Documentation for development and deployment teams
**Serve**: Not served (internal use only)
**Contains**: Setup guides, checklists, policies, references

### scripts/ Directory
**Purpose**: Automation and maintenance scripts
**Serve**: Not served (execute from command line)
**Contains**: Backup, deploy, test, monitor scripts

### assets/ Directory
**Purpose**: Shared static assets for all pages
**Serve**: Served (referenced in HTML pages)
**Contains**: CSS, JavaScript, images, media

### components/ Directory
**Purpose**: Reusable HTML templates
**Serve**: Included in pages (not directly served)
**Contains**: header, footer, and other partials

### data/ Directory
**Purpose**: Content data in JSON format
**Serve**: Used by JavaScript (AJAX requests or includes)
**Contains**: JSON files for page content

---

## 🔒 Security Implications

### What Gets Served
✅ `public/` - All files are served
✅ `assets/` - CSS, JS, images served
✅ `components/` - Included in HTML (not directly)
✅ `data/` - Served if publicly accessible data

### What Doesn't Get Served
❌ `docs/` - Documentation (internal use)
❌ `scripts/` - Deployment scripts (not executable via browser)
❌ `.env` - Environment variables (NOT in .gitignore, keep locally)
❌ `.git/` - Git repository metadata
❌ `components/` - Not directly served (included server-side)

### Protective Rules (in .htaccess)
```apache
# Block access to sensitive files
<FilesMatch "^\.">
  Order allow,deny
  Deny from all
</FilesMatch>

# Block access to scripts directory
<Directory scripts>
  Order allow,deny
  Deny from all
</Directory>

# Block access to docs
<Directory docs>
  Order allow,deny
  Deny from all
</Directory>
```

---

## 🔄 Deployment Steps

### 1. Upload Structure
```bash
# Upload public/ as DocumentRoot
# Upload assets/ separately or as part of public/
# Upload scripts/ for cron jobs
# Keep docs/ for reference
```

### 2. Directory Permissions
```bash
# DocumentRoot
chmod 755 public/
chmod 644 public/*

# Scripts (executable)
chmod 755 scripts/*.sh

# Data & components
chmod 755 data/ components/
chmod 644 data/* components/*

# Protect .env
chmod 600 .env
```

### 3. Server Configuration
```bash
# For Apache: Point DocumentRoot to public/
# For Nginx: Set root to public/
# For .htaccess: Keep in root or public/ root
```

---

## 📊 File Count Summary

- **Root Config Files**: 7
- **Documentation Files**: 12
- **Public HTML Pages**: 8
- **Automation Scripts**: 6
- **CSS Files**: 5
- **JavaScript Files**: 4
- **JSON Data Files**: 5
- **Other Assets**: 10+

**Total Production Files**: 60+

---

## ✅ Final Checklist

- [x] Configuration files in root
- [x] Documentation in docs/
- [x] Public pages in public/
- [x] Scripts in scripts/
- [x] Static assets organized
- [x] Components separated
- [x] Data in JSON format
- [x] .gitignore configured
- [x] .htaccess in root
- [x] Security properly set up

---

## 🎯 Next Steps

1. **Verify**: Check all files are in correct locations
2. **Deploy**: Follow QUICK-START.md in docs/
3. **Configure**: Set Apache/Nginx DocumentRoot to public/
4. **Test**: Run test-site.sh from scripts/
5. **Monitor**: Use health-check.sh from scripts/

---

**Last Updated**: December 25, 2025
**Status**: ✅ Properly Organized
