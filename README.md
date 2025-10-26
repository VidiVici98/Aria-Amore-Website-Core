# Aria Amore Website – Content Management Guide

Welcome!  
This guide will show you how to **update the text, images, and media** on your website — without touching any HTML code.

Your site is designed to load most of its content from **JSON files**, which makes updates fast, safe, and easy.

---

## 📁 Where to Find the Editable Files

Below is an overview of how the website’s files and folders are organized within the main repository.
This structure helps keep everything modular, easy to maintain, and clearly separated by purpose.

```
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

``

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