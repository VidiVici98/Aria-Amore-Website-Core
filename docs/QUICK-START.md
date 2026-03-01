# Quick Start Guide

## Running the Website Locally

### Method 1: Live Server (Recommended)
```
1. Open VS Code
2. Right-click on any HTML file in the public/ folder
3. Select "Open with Live Server"
4. Visit http://localhost:5500/
```

### Method 2: npm start
```bash
npm start
# Visit http://localhost:8000/
```

### Method 3: Direct http-server
```bash
npx http-server public -p 8000
# Visit http://localhost:8000/
```

## What Should Work Now

✅ All pages load correctly:
- index.html (homepage with curtain animation)
- about.html
- contact.html
- events.html
- gallery.html
- artists.html
- services.html
- repertoire.html

✅ Curtain animation plays smoothly:
- On initial page load
- When navigating between pages
- Should NOT appear static/frozen

✅ All assets load correctly:
- CSS stylesheets
- JavaScript files
- Images and icons
- Data files (JSON)
- Components (header, footer, etc.)

## Troubleshooting

### Problem: Pages show 404 errors or no styling
**Solution**: Make sure you're using the correct root folder:
- Live Server should serve from `/public` folder (configured in `.vscode/settings.json`)
- If using http-server directly, make sure you specify the `public` folder

### Problem: Curtain animation doesn't play
**Solution**: 
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Check browser console for JavaScript errors
4. Make sure CSS file loaded (check Network tab in DevTools)

### Problem: Browser keeps serving old version
**Solution**:
1. Ctrl+Shift+Delete (open Clear Browsing Data)
2. Select "All Time"
3. Check "Cookies and other site data"
4. Refresh page

## Development Workflow

1. Make changes to HTML/CSS/JS files
2. Live Server auto-refreshes (if using Live Server extension)
3. Test in browser
4. Once happy with changes, you can commit to git

## Building for Production

To create a production-ready build:
```bash
./scripts/build.sh
```

This will create a `build/` directory with everything ready to deploy.

## Need More Help?

See these files for more details:
- `FIX-SUMMARY.md` - Technical details about what was fixed
- `LIVE-SERVER-SETUP.md` - Detailed Live Server configuration guide
- `docs/` folder - Project documentation
