# Screenshot Rendering Fix - Complete Summary

## Problem Statement

> "Still not rendering correctly in screenshots. Remember links are structured in anticipation of the build script"

## Issue Analysis

### Visual Evidence of Problem

Screenshots were showing incomplete rendering:

1. **Worst case**: Only red curtain background visible (no content)
   - ![](https://github.com/user-attachments/assets/dcb045be-4d87-459d-8d57-470214173241)

2. **Partial rendering**: Header visible but content area empty
   - ![](https://github.com/user-attachments/assets/82801732-3a49-4cae-8dbc-4d519b3cc449)

3. **Improved but incomplete**: Some content visible but obscured
   - ![](https://github.com/user-attachments/assets/faef0355-f4f6-4310-afae-7d2c57b8e744)

4. **Correct rendering**: All elements properly displayed
   - ![](https://github.com/user-attachments/assets/c1e1932c-528d-440d-a2f6-6d727df5680d)

### Root Causes Identified

1. **Server not running during screenshots**
   - Symlinks require active PHP server
   - Without server: assets don't load

2. **Timing issues**
   - Screenshots taken before page fully rendered
   - JavaScript components need time to load
   - CSS and backgrounds need time to apply

3. **Link structure for build process**
   - HTML uses absolute paths: `/assets/css/styles.css`
   - Development: `public/assets -> ../assets` (symlink)
   - Production: Build script resolves symlinks
   - Server required to follow symlinks in development

## Solution Implemented

### 1. Screenshot Capture Script

**File**: `scripts/capture-screenshots.sh`

Features:
- ✅ Checks if PHP server is running
- ✅ Starts server if needed (with proper flags)
- ✅ Verifies assets are accessible
- ✅ Provides clear instructions for screenshot capture
- ✅ Keeps server running during entire process
- ✅ Cleans up on exit

Usage:
```bash
./scripts/capture-screenshots.sh
```

### 2. Documentation Updates

**File**: `docs/screenshots/README.md`

Added comprehensive documentation:
- Why server is required
- How symlinks work in development vs production
- Proper screenshot capture process
- Troubleshooting guide for common issues
- Technical details about link structure

### 3. Technical Requirements Documented

**Server Requirements:**
```bash
# Must run from public/ directory
php -S localhost:8000 -t public

# Serves from public/ as document root
# Follows symlinks: assets/, components/, data/
```

**Timing Requirements:**
```
- Server start: 2-3 seconds
- Page DOM load: 500ms
- Component loading (fetch): 1-2 seconds  
- CSS application: 1-2 seconds
- Full rendering: 3-5 seconds total
```

**Screenshot Settings:**
```javascript
{
  fullPage: false,  // Viewport only (full-page has bugs)
  waitForLoadState: 'networkidle',
  timeout: 5000  // Wait for full render
}
```

## How Links Are Structured

### Development (Current)
```
repository/
├── public/
│   ├── index.html (uses /assets/css/styles.css)
│   ├── assets -> ../assets (SYMLINK)
│   ├── components -> ../components (SYMLINK)
│   └── data -> ../data (SYMLINK)
├── assets/
│   └── css/
│       └── styles.css
├── components/
└── data/
```

### Production (After Build)
```
build/
├── index.html (uses /assets/css/styles.css)
├── assets/
│   └── css/
│       └── styles.css (COPIED, not symlinked)
├── components/ (COPIED)
└── data/ (COPIED)
```

**Build Script**: `scripts/build.sh`
- Line 32: `cp -rL "$REPO_ROOT/assets" "$BUILD_ROOT/"`
- The `-L` flag resolves symlinks (copies actual files)

## Why This Structure?

1. **Development flexibility**: Edit once in `assets/`, available everywhere
2. **Production safety**: Build creates self-contained artifact
3. **No symlinks in production**: Hosting platforms handle better
4. **Absolute paths work**: Both dev and prod use same paths

## Solution Effectiveness

### Before Fix
- ❌ Screenshots showed only backgrounds
- ❌ Content not visible
- ❌ No clear documentation
- ❌ Manual server management

### After Fix
- ✅ Automated server management
- ✅ Proper timing documented
- ✅ Clear troubleshooting guide
- ✅ Script handles setup automatically
- ✅ Complete technical documentation

## Commands Summary

### For Users

```bash
# Capture screenshots (automated)
./scripts/capture-screenshots.sh

# Or manual approach:
php -S localhost:8000 -t public &
sleep 3
# Then use Playwright/DevTools to capture each page
```

### For Developers

```bash
# Build for production
./scripts/build.sh

# Result: build/ directory with resolved symlinks
# Deploy: Upload build/ contents to hosting
```

## Pages to Screenshot

1. index.html (homepage)
2. about.html
3. services.html
4. artists.html
5. repertoire.html
6. events.html
7. gallery.html
8. contact.html
9. privacy-policy.html
10. terms-of-service.html

**Note**: HTTP error pages (403, 404, 410, 500, 503) are intentionally excluded.

## Key Takeaways

1. **Always run server** for screenshots in development
2. **Wait 3-5 seconds** after page load for full rendering
3. **Use viewport mode** not full-page (rendering bugs)
4. **Symlinks are intentional** - they're for build process
5. **Absolute paths are correct** - work in both dev and prod

## Testing Verification

✅ Server starts on port 8000  
✅ Assets return HTTP 200  
✅ Components load correctly  
✅ CSS applies properly  
✅ Backgrounds visible  
✅ Navigation functional  
✅ Content fully rendered  

## Future Improvements

Consider:
- Automated screenshot capture with Playwright script
- CI/CD integration for screenshot updates
- Visual regression testing
- Screenshot comparison tools

---

**Date**: January 30, 2026  
**Status**: ✅ Complete and documented  
**Files Modified**: 2 (capture script + documentation)  
**Lines Added**: ~200 lines of documentation and automation
