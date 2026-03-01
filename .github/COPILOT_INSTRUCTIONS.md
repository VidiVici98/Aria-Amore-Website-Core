
# Aria Amore Opera Site – Copilot Instructions

## 1. Project Overview
**Purpose:**  
The Aria Amore Opera site is a marketing and informational site designed to be easy to update without touching raw HTML. Most content changes are done via JSON files in `data/`, keeping HTML, CSS, and JS reusable and consistent.

**Tech Stack:**  
- **Frontend:** HTML, CSS, JavaScript  
- **Content Management:** JSON files under `data/`  
- **Components:** `header.html` and `footer.html`  
- **Build Script:** `scripts/build.sh` packages repo files into `build/` for deployment  
- **Deployment:** Upload `build/` contents to SiteGround via web interface or SSH. Production may include extra libraries like PHPMailer.  

---

## 2. Folder Structure

```
.
├── assets
│   ├── css
│   │   ├── about.css
│   │   ├── artists.css
│   │   ├── services.css
│   │   └── styles.css
│   ├── js
│   │   ├── about.js
│   │   ├── artists.js
│   │   ├── main.js
│   │   └── services.js
│   └── media
│       ├── audio
│       │   ├── xavier-ave-verum.mp4
│       │   └── xavier-night-price.mp3
│       ├── icons
│       │   ├── apple-touch-icon.png
│       │   ├── favicon-96x96.png
│       │   ├── favicon.ico
│       │   ├── favicon.svg
│       │   ├── site.webmanifest
│       │   ├── web-app-manifest-192x192.png
│       │   └── web-app-manifest-512x512.png
│       └── images
│           ├── aria-amore-transparent.png
│           ├── divider.svg
│           ├── events-icon.png
│           ├── floral-background.png
│           ├── floral-stem.svg
│           ├── floral-swirl-complex.svg
│           ├── floral-swirl-simple.svg
│           ├── floral-top-right.svg
│           ├── holiday-icon.png
│           ├── instagram-icon.svg
│           ├── latoya.webp
│           ├── parchment-background.webp
│           ├── placeholder.webp
│           ├── preview-image.jpg
│           ├── share-icon.svg
│           ├── star.svg
│           ├── tiktok-icon.svg
│           ├── victorian-separator.svg
│           ├── wedding-rings-icon.png
│           ├── xavier-williams-transparent.webp
│           └── xavier-williams.webp
├── components
│   ├── footer.html
│   └── header.html
├── data
│   ├── about.json
│   ├── artists.json
│   ├── booking-policies.json
│   ├── homepage.json
│   └── services.json
├── docs
│   ├── CHANGELOG.md
│   ├── CHECKLIST.md
│   ├── DEPLOYMENT.md
│   ├── ERROR-PAGES.md
│   ├── IMPLEMENTATION-SUMMARY.md
│   ├── PRODUCTION-READY.md
│   ├── PRODUCTION-SETUP.md
│   ├── QUICK-START.md
│   ├── RESOURCES.md
│   ├── SECURITY.md
│   ├── STRUCTURE.md
│   ├── STRUCTURE-SUMMARY.txt
│   └── TESTING.md
├── .env.example
├── .github
│   └── dependabot.yml
├── .gitignore
├── .htaccess
├── LICENSE.txt
├── package.json
├── public
│   ├── about.html
│   ├── artists.html
│   ├── errors
│   │   ├── 403.html
│   │   ├── 404.html
│   │   ├── 410.html
│   │   ├── 500.html
│   │   └── 503.html
│   ├── humans.txt
│   ├── index.html
│   ├── maintenance-page.html
│   ├── privacy-policy.html
│   ├── robots.txt
│   ├── security.txt
│   ├── services.html
│   ├── sitemap.xml
│   └── terms-of-service.html
├── README.md
├── scripts
│   └── build.sh
├── .vscode
│   └── settings.json
└── .well-known
    └── security.txt
````

**Notes:**  
- JSON files in `data/` are the primary content source. Edit these whenever possible.  
- JS/CSS files under `assets/` follow page-specific or global conventions.  
- HTML in `public/` is generated; do **not edit manually**.  
- New pages require JSON, JS, and optional CSS following existing patterns.

---

## 3. Local Development

1. **Clone the repository:**  
```bash
git clone <repo-url>
cd Aria-Amore-Website-Core
````

2. **Install dependencies (if any):**

```bash
npm install
```

3. **Edit content:**

* Update JSON in `data/` for textual or media content.
* Update JS in `assets/js/` for interactive behavior.
* Update CSS in `assets/css/` for styling changes.

4. **Build the site locally:**

```bash
bash scripts/build.sh
```

This creates a `build/` folder ready for preview or deployment.

5. **Preview locally:**
   Open `build/index.html` (or other pages) in a browser.

---

## 4. Using Copilot Effectively

### A. Updating Existing Pages

* **Prompt example:**

  > "Update the text on the 'About' page using the structure in `about.json`, keeping existing styles intact."
* **Guidelines:**

  * Modify JSON content, not HTML directly.
  * Copilot can automatically sync JSON updates to generated HTML.
  * JS updates go in `assets/js/<page>.js`.

### B. Creating a New Page

1. **Create a new JSON file** in `data/`, e.g., `gallery.json`, following structure of existing pages (`title`, `content`, `images`, etc.).
2. **Create a JS file** in `assets/js/` if page interactivity is needed.
3. **Create a CSS file** in `assets/css/` if styling differs.
4. **Run `build.sh`** to generate `public/<page>.html`.

* **Prompt example:**

  > "Generate a new 'Gallery' page that uses the existing header/footer, grid layout similar to 'Artists' page, and pulls content from `gallery.json`."

### C. Following Conventions

* **HTML:** Use `header.html` and `footer.html` on all pages.
* **CSS:** Use page-specific CSS; for global changes, edit `styles.css`.
* **JS:** Keep behavior isolated per page in `assets/js/<page>.js`.
* **Assets:** Place images under `assets/media/images` and audio/video under `assets/media/audio`.
* **Naming:** Follow existing file naming patterns to maintain consistency.

---

## 5. Maintenance & Common Tasks

* **Updating content:**
  Edit `data/*.json` → run `build.sh` → preview in `build/`.

* **Adding media:**
  Upload new images or audio into `assets/media/...` and reference them in JSON.

* **Debugging HTML/CSS:**
  Always check generated `public/*.html`; do not edit directly.

* **Deployment:**
  After building, upload `build/` contents to SiteGround via FTP, SSH, or web interface.

* **Updating dependencies:**
  If using Node or other tools, run:

  ```bash
  npm update
  ```

---

## 6. Advanced Copilot Prompts

* **JS refactoring:**

  > "Refactor JS for page X to match `main.js` conventions without breaking existing functionality."

* **Adding sections/content:**

  > "Add a new section to the 'Services' page JSON, and automatically include it in `services.html` using current templates."

* **Responsive styling:**

  > "Create responsive CSS for a new component that matches existing floral elements."

**Tip:** Always instruct Copilot to **follow existing naming, folder structure, and CSS/JS conventions**.

---

## 7. Resources & References

* `docs/` folder contains older documentation (CHANGELOG.md, STRUCTURE.md, etc.)
* Main CSS conventions: `assets/css/styles.css`
* Main JS patterns: `assets/js/main.js`
* Email features (PHPMailer) are configured on the server (SiteGround)
* `README.md` contains general project information

---

## 8. Best Practices

1. **JSON first:** Always use `data/*.json` for content changes.
2. **Build, don’t edit HTML:** Never edit generated HTML directly.
3. **Keep styling consistent:** Use existing CSS classes for new content or components.
4. **Test locally:** Verify changes in `build/` before deployment.
5. **Version control:** Commit changes frequently with clear messages.

---

This file should live at the **root of the repo** as `COPILOT_INSTRUCTIONS.md`. It serves as a complete guide for using Copilot to update, maintain, and expand the Aria Amore Opera site while respecting existing patterns and conventions.

```