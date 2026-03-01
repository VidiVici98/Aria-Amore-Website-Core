# Live Server Configuration

## The Problem
The project uses symlinks in the `public/` folder to reference assets, components, and data from the root directories. When Live Server is run from the workspace root, these symlinks break, making all pages except index.html fail to load assets.

## The Solution
VS Code is now configured to use Live Server with the `public/` folder as the root directory.

### Quick Start
1. **Install Live Server Extension** (if not already installed)
   - Open VS Code Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

2. **Start Live Server**
   - Right-click on any HTML file in the `public/` folder
   - Select "Open with Live Server"
   - OR use the "Go Live" button in the status bar (bottom-right corner)

3. **Expected Behavior**
   - Server will start on `http://localhost:5500/`
   - You should be able to navigate to any page (index.html, about.html, contact.html, etc.)
   - The curtain animation should animate smoothly on page load and page navigation

## Why This Works
- **Live Server Root**: Set to `/public` in `.vscode/settings.json`
- **Symlinks**: The `public/` folder contains symlinks:
  - `public/assets` → `../assets`
  - `public/components` → `../components`
  - `public/data` → `../data`
- **Paths**: All HTML files reference assets using absolute paths like `/assets/css/styles.css`
- When Live Server serves from `public/` as root, these paths correctly resolve to the actual asset files

## Alternative: Using npm start
You can also run the development server using npm:
```bash
npm start
```
This will start an `http-server` on port 8000 serving from the `public/` folder.

## Curtain Animation Fix
The curtain animation was not executing because:
1. **CSS Issue**: The fold shimmer animation was running infinitely, obscuring the main curtain movement
2. **JS Timing**: The animation trigger was using a fixed timeout without ensuring the DOM was ready

### What Was Fixed
1. Added `animation: none;` for `.curtain-wrapper.open .fold` to stop the shimmer effect when curtains open
2. Improved JavaScript timing using `requestAnimationFrame()` to ensure the DOM is fully rendered before adding the animation class

## Testing
To verify everything is working:
1. Start Live Server from any HTML file in `public/`
2. You should see the curtain animation play smoothly on page load
3. Navigate to different pages and you should see the curtain animation again
4. All assets (CSS, JS, images) should load correctly

## Troubleshooting
- **"Cannot find assets"**: Make sure Live Server is serving from `public/` folder
- **Curtains not animating**: Clear browser cache (Ctrl+Shift+Delete) and reload
- **Symlinks broken**: Run `npm start` instead, which properly handles symlink resolution
