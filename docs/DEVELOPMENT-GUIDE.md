# Development & Deployment Guide

## The Real Problem (And Solution)

Your project has a unique structure:
- **HTML files** are in `public/` folder
- **Assets** (CSS, JS, images) are in the root `assets/` folder
- **symlinks** connect them: `public/assets → ../assets`, etc.

When you use Live Server or http-server **from the wrong root**, symlinks break and assets can't load. Additionally, the curtain animation wasn't executing due to broken JavaScript event handling.

## Development Setup (Local Testing)

### Prerequisites
```bash
# Install npm dependencies (only needed once)
npm install
```

### Option 1: npm start (Recommended)
```bash
npm start
# Server runs on http://localhost:8000/
# Automatically serves from public/ folder
```

### Option 2: Live Server (VS Code Extension)
1. Install "Live Server" extension by Ritwick Dey
2. Right-click any HTML file in `public/` folder
3. Select "Open with Live Server"
4. Configuration is saved in `.vscode/settings.json`

### Option 3: Direct http-server
```bash
npx http-server public -p 8000
# Must specify public/ folder as root!
```

## What's Working Now

✅ **All pages load correctly**
- index.html, about.html, contact.html, events.html, gallery.html, artists.html, services.html, repertoire.html

✅ **Curtain animation works**
- Plays smoothly on page load
- Animates on page navigation
- No longer appears static/frozen

✅ **All assets load properly**
- CSS stylesheets
- JavaScript files  
- Images and icons
- JSON data files
- Components (header, footer, etc.)

## Technical Fixes Applied

### 1. JavaScript Event Handler (CRITICAL FIX)
**Problem**: The `DOMContentLoaded` event had TWO listeners. The second listener tried to chain `.then()` on an undefined return value, preventing the curtain animation code from executing.

**Solution**: Consolidated all code into a single `DOMContentLoaded` listener that properly executes the curtain animation setup.

**Files changed**:
- `assets/js/main.js` (lines 195-250)
- `public/assets/js/main.js` (lines 195-250)

### 2. CSS Animation States
**Problem**: Curtain folds had an infinite shimmer animation that visually masked the main curtain movement.

**Solution**: 
- Added explicit initial state: `.curtain.left { transform: translateX(0); }`
- Added animation stop rule: `.curtain-wrapper.open .fold { animation: none; }`

**Files changed**:
- `assets/css/styles.css` (lines 1490-1500)
- `public/assets/css/styles.css` (lines 1490-1500)

### 3. VS Code Live Server Configuration
**Files changed**:
- `.vscode/settings.json` - Added Live Server root directory settings

## Building for SiteGround

When you're ready to deploy to SiteGround:

```bash
./scripts/build.sh
```

This creates a `build/` directory with everything SiteGround needs:
- All HTML files
- All assets (resolved from symlinks → actual copies)
- All data files
- Security headers and configuration

The build output is production-ready and doesn't rely on symlinks.

## Testing Checklist

Before deploying to SiteGround:

```bash
# 1. Run the verification script
bash verify-setup.sh

# 2. Test all pages work locally
# Open http://localhost:8000 and visit each page

# 3. Test the build
./scripts/build.sh

# 4. Build should succeed with 108 files
# Check that all CSS/JS files are in build/assets/
```

## File Structure After Build

The `build/` directory becomes your deployment package:

```
build/
├── index.html              ← Homepage
├── about.html, contact.html, etc.  ← Other pages
├── assets/
│   ├── css/               ← All stylesheets (no symlinks!)
│   ├── js/                ← All scripts
│   └── media/             ← Images and icons
├── components/            ← Embedded components
├── data/                  ← JSON data files
└── .htaccess              ← Server configuration
```

## SiteGround Deployment

1. Build locally: `./scripts/build.sh`
2. Deploy the contents of the `build/` folder to SiteGround
3. No special configuration needed - it's a standard static website

## Troubleshooting

### Animation Still Not Working?
1. **Hard refresh browser**: Ctrl+Shift+R (Chrome) or Cmd+Shift+R (Mac)
2. **Clear cache**: Ctrl+Shift+Delete → "All Time" → Clear
3. **Check browser console**: Press F12, look for any red errors
4. **Verify server running**: Check `npm start` is actually running (look for port 8000)

### Pages Showing 404 Errors
1. **Wrong server root**: Make sure serving from `public/` folder, not workspace root
2. **Live Server misconfigured**: Check `.vscode/settings.json` has `"liveServer.settings.root": "/public"`
3. **Restart server**: Kill old process and start fresh

### Assets Not Loading
1. Verify symlinks exist: `ls -la public/assets/`
2. Should show: `assets -> ../assets` (with arrow)
3. If broken, recreate them: `cd public && ln -sf ../assets assets`

### npm start Fails
1. Install dependencies: `npm install`
2. Check http-server installed: `npm list http-server`
3. Try direct command: `npx http-server public -p 8000`

## Additional Resources

- `QUICK-START.md` - Quick reference guide
- `LIVE-SERVER-SETUP.md` - Detailed Live Server guide
- `FIX-SUMMARY.md` - Technical details of fixes
- `verify-setup.sh` - Automated verification script

## Key Takeaway

The website is designed to work in two modes:
1. **Development** (symlinks): Direct folder serving for fast iteration
2. **Production** (build): Resolved assets for hosting

Always use `npm start` or Live Server for development, and `./scripts/build.sh` for deployment.
