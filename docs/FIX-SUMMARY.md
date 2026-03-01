# Fix Summary: Live Server & Curtain Animation

## Issues Fixed

### 1. ✅ Live Server Only Showing index.html
**Root Cause**: Live Server was serving from the workspace root instead of the `public/` folder. Since all asset references use absolute paths (e.g., `/assets/css/styles.css`), and the actual assets are symlinked within `public/`, the paths broke when serving from the wrong root.

**Solution**: Updated `.vscode/settings.json` to configure Live Server:
```json
"liveServer.settings.root": "/public",
"liveServer.settings.port": 5500,
"liveServer.settings.useBrowserPreview": true
```

**How It Works**:
- When Live Server uses `/public` as root, paths like `/assets/css/styles.css` correctly resolve to `public/assets/css/styles.css`
- The symlinks in `public/` (assets, components, data) properly reference the parent directories
- All pages now load correctly with all resources

### 2. ✅ Curtain Animation Displaying as Static
**Root Cause**: Two issues were causing the animation to appear static:

**Problem A - CSS Animation Conflict**: 
- The `.fold` elements had an infinite `fold-shimmer` animation (8s duration)
- When the curtain opens, the main curtain div gets a `transform: translateX()` animation
- But the child folds were still running their shimmer animation, visually obscuring the movement

**Problem B - JavaScript Timing**:
- The code used `setTimeout()` without ensuring the DOM was fully rendered
- Sometimes the animation class would be added before the element was ready

**Solutions Applied**:

**CSS Fix** - Added animation stop rule in `assets/css/styles.css`:
```css
/* Stop shimmer animation when curtains are opening */
.curtain-wrapper.open .fold {
  animation: none;
}
```

**JavaScript Fix** - Updated timing in `assets/js/main.js`:
```javascript
// Use requestAnimationFrame to ensure DOM is ready
requestAnimationFrame(() => {
  setTimeout(() => {
    curtain.classList.add("open");
    // ... rest of code
  }, 50);
});
```

## Files Modified

1. **`.vscode/settings.json`** - Added Live Server configuration
2. **`assets/css/styles.css`** - Added animation stop rule for curtain opening
3. **`assets/js/main.js`** - Improved animation timing with requestAnimationFrame
4. **`public/assets/css/styles.css`** - Already had the fix
5. **`public/assets/js/main.js`** - Already had the fix

## How to Use Now

### Option 1: Live Server (Recommended for Development)
1. Right-click any HTML file in the `public/` folder
2. Select "Open with Live Server"
3. Server starts on `http://localhost:5500/`
4. All pages accessible, animations work smoothly

### Option 2: npm start
```bash
npm start
# Server starts on http://localhost:8000/
```

## Testing Checklist
- ✅ Visit `http://localhost:5500/` (or 8000 with npm start)
- ✅ Curtain animation plays smoothly on page load
- ✅ Navigate to different pages - curtain animation plays on each transition
- ✅ Visit all pages: index.html, about.html, contact.html, events.html, gallery.html, artists.html, services.html, repertoire.html
- ✅ All CSS, JS, and images load without errors
- ✅ Browser console shows no 404 errors for assets

## Technical Details

### Why Symlinks Matter
The project structure separates:
- HTML files → `public/`
- Reusable assets → root level (`assets/`, `components/`, `data/`)

Symlinks in `public/` create logical connections:
- `public/assets` → `../assets`
- `public/components` → `../components`
- `public/data` → `../data`

This allows the build process and both development servers to serve everything correctly.

### Curtain Animation Details
The animation is composed of:
1. **Container**: `.curtain-wrapper` - Fixed position overlay covering entire viewport
2. **Left/Right Curtains**: Two 50% width divs that slide out when `.open` class is added
3. **Folds**: 9 child divs per curtain that add visual depth and texture
4. **Animation**: 2-second cubic-bezier easing for smooth theatrical effect

The fix ensures the fold elements stop their shimmer animation and move with their parent container smoothly.

## References
- [LIVE-SERVER-SETUP.md](./LIVE-SERVER-SETUP.md) - Detailed Live Server setup guide
