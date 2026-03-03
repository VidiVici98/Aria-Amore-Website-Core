# Getting Started with Aria Amore

Quick setup guide for developing locally and deploying the website.

## 📋 Prerequisites

- Git installed
- Node.js (v14+) and npm installed
- Code editor (VS Code recommended)
- Basic command line knowledge
- Server access (for production deployment)

## 🚀 Local Development Setup

**You'll be developing the site you see here:**
![Development Site Homepage](../docs/screenshots/01-homepage-hero.png)
![Homepage Packages](../docs/screenshots/01-homepage-packages.png)

### 1. Clone the Repository

```bash
git clone https://github.com/VidiVici98/Aria-Amore-Website-Core.git
cd Aria-Amore-Website-Core
```

### 2. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` with your values (at minimum):
```
SITE_EMAIL=your-email@example.com
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX  (optional)
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm start
```

The website is now available at `http://localhost:8000/`

## 📝 Project Structure

```
public/                 # Website HTML pages
├── index.html
├── about.html
├── contact.html
├── services.html
├── artists.html
├── events.html
├── gallery.html
├── repertoire.html
└── assets → ../assets  # Symlink to assets folder

assets/                 # CSS, JavaScript, Images
├── css/               # Stylesheets
├── js/                # JavaScript files
└── media/             # Images and icons

data/                  # Content (JSON files)
├── homepage.json
├── about.json
├── services.json
├── artists.json
├── contact.json
├── events.json
├── gallery.json
└── repertoire.json

components/            # Reusable HTML
├── header.html
└── footer.html
```

## 🗂️ Updating Content

All content is in JSON files in the `data/` folder. Edit any JSON file and refresh your browser to see changes immediately.

**Files to edit:**
- `data/homepage.json` - Homepage content, packages, pricing
- `data/about.json` - Company info and team
- `data/services.json` - Service descriptions
- `data/artists.json` - Artist/performer profiles
- `data/contact.json` - Contact page info
- `data/events.json` - Past/upcoming events
- `data/gallery.json` - Gallery images
- `data/repertoire.json` - Song catalog

## 🔧 Customization

### Update Contact Email
Edit `.env`:
```
SITE_EMAIL=your-email@ariaamore.com
```

### Add Google Analytics
1. Create account at analytics.google.com
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `.env`:
```
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Update Phone & Email Throughout Site
Search and replace in HTML files:
- `(843) 555-ARIA` → your phone
- `info@ariaamore.com` → your email

### Update Social Media Links
Edit `components/header.html` and `components/footer.html`:
- Instagram URL: `https://www.instagram.com/your-handle`
- TikTok URL: `https://www.tiktok.com/@your-handle`

## 🚀 Deploying to Production

### On Your Server (Siteground or similar)

1. **Upload files** via SFTP/FTP:
   - Upload all files to `public_html/`
   - Ensure `.env` file is uploaded
   - **Do NOT commit `.env` to git**

2. **Verify Setup:**
   ```bash
   # SSH into server
   ssh user@yourdomain.com
   cd public_html
   
   # Check symlinks exist
   ls -la public/assets
   
   # Test PHP mail
   php -r "mail('test@example.com', 'Test', 'Test'); echo 'Done';"
   ```

3. **Enable HTTPS:**
   - Most hosts provide free SSL (Let's Encrypt)
   - Enable in hosting control panel
   - Force HTTPS in `.htaccess`

4. **Test Site:**
   - Visit https://yourdomain.com
   - Verify all pages load
   - Test contact form
   - Check Google Analytics (if enabled)

## 🧪 Testing Locally

### Test All Pages
```bash
# With dev server running, visit:
- http://localhost:8000/          # Homepage
- http://localhost:8000/about.html         # About
- http://localhost:8000/contact.html       # Contact
- http://localhost:8000/services.html      # Services
- http://localhost:8000/artists.html       # Artists
- http://localhost:8000/events.html        # Events
- http://localhost:8000/gallery.html       # Gallery
- http://localhost:8000/repertoire.html    # Repertoire
```

### Test on Mobile
1. Find your computer's local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On mobile device, visit: `http://YOUR_IP:8000`
3. Verify responsive design works

**Mobile responsive examples:**
![Mobile Homepage](../docs/screenshots/mobile/01-homepage-mobile.png)
![Mobile Contact](../docs/screenshots/mobile/02-contact-mobile.png)
![Mobile Artists](../docs/screenshots/mobile/03-artists-mobile.png)

### Check for Errors
1. Open Developer Tools (F12)
2. Go to Console tab
3. Verify no red error messages

## 📚 Additional Resources

- **[OPERATIONS-GUIDE.md](OPERATIONS-GUIDE.md)** - Site management, deployment, security, analytics
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[SECURITY.md](../SECURITY.md)** - Reporting vulnerabilities
- **GitHub:** https://github.com/VidiVici98/Aria-Amore-Website-Core

## ❓ Troubleshooting

### Dev server won't start
```bash
# Kill anything using port 8000
lsof -i :8000
kill -9 PID

# Try starting again
npm start
```

### Pages won't load
- Verify dev server is running: `npm start`
- Clear browser cache (Ctrl+Shift+Del)
- Check console for errors (F12)
- Verify symlinks: `ls -la public/assets`

### Assets (CSS/images) not loading
- Ensure `public/assets` symlink exists
- Check file paths in HTML
- Verify symlink points to correct directory
- Restart dev server

### Changes not showing
- Hard refresh browser (Ctrl+Shift+R)
- Clear cache
- Restart dev server
- Check JSON syntax is valid

## 📞 Support

- **Email:** info@ariaamore.com
- **Security:** security@ariaamore.com
- **GitHub Issues:** https://github.com/VidiVici98/Aria-Amore-Website-Core/issues

Last Updated: March 3, 2026
