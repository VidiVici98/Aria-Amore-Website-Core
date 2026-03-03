# 🚀 VS Code & Copilot Quick Start for Site Owners

**No programming experience needed!** This guide shows you how to use VS Code and GitHub Copilot to easily edit your website content.

---

## Table of Contents

1. [What is VS Code?](#what-is-vs-code)
2. [What is Copilot?](#what-is-copilot)
3. [Getting Started](#getting-started)
4. [Opening Your Project](#opening-your-project)
5. [Editing Content with Copilot](#editing-content-with-copilot)
6. [Common Site Owner Tasks](#common-site-owner-tasks)
7. [Troubleshooting](#troubleshooting)
8. [Pro Tips](#pro-tips)

---

## What is VS Code?

**VS Code** (Visual Studio Code) is a free text editor for editing code and files on your computer. Think of it like Microsoft Word, but for code and text files.

### Why Use It?
- **Free** - No cost
- **Easy** - Simple interface, not complicated
- **Smart** - Shows you errors before you upload
- **Powerful** - Has AI assistant built-in (Copilot)
- **Saves time** - Copilot can help you edit files quickly

### What VS Code Looks Like

When you open VS Code, you'll see:
- **Left sidebar** - File browser (your website files)
- **Center area** - Editor (where you make changes)
- **Right side** - Copilot chat panel (AI assistant)

---

## What is Copilot?

**Copilot** is an AI assistant built into VS Code. It's like having a helpful developer sitting next to you who can:

- ✅ Explain what things do
- ✅ Help you edit files
- ✅ Answer questions about your website
- ✅ Suggest changes and improvements
- ✅ Fix mistakes

### How It Works
1. You ask Copilot a question in plain English
2. Copilot understands your project and helps
3. You review the changes
4. You accept or modify them

**Important:** We have custom instructions set up for Copilot specifically for this website. These instructions help Copilot understand your project better and give you more accurate help.

---

## Getting Started

### Step 1: Download VS Code

1. Go to https://code.visualstudio.com/
2. Click the big blue **Download** button
3. Run the installer and follow the steps
4. Open VS Code when done

### Step 2: Install GitHub Copilot

VS Code comes with Copilot support, but you need to activate it:

1. Open VS Code
2. Click the **Extensions icon** on the left sidebar (looks like 4 squares)
3. Search for "**GitHub Copilot**"
4. Click **Install** (it's the official one by GitHub)
5. Follow the prompts to log in with your GitHub account
   - If you don't have GitHub, click "Create a new account" (free)

**Wait:** After installing, **restart VS Code** by closing and opening it again.

### Step 3: Enable Custom Instructions

Your project has custom Copilot instructions that help Copilot understand your website better.

**Copilot will automatically use these instructions** when you open the project folder. Nothing extra needed!

---

## Opening Your Project

### Step 1: Open the Project Folder

1. In VS Code, click **File** → **Open Folder**
2. Navigate to your website folder: `/home/jon/Desktop/Aria_Amore/Aria-Amore-Website-Core`
3. Click **Select Folder**
4. VS Code shows "Do you trust this folder?" → Click **Yes, I trust the authors**

### Step 2: View Your Files

On the left sidebar, you'll see:
```
📁 Aria-Amore-Website-Core
  ├── 📁 data/              ← Your content files (JSON)
  ├── 📁 docs/              ← Documentation
  ├── 📁 assets/            ← Photos, CSS, JavaScript
  ├── 📁 public/            ← Website pages (HTML)
  ├── 📄 README.md          ← Project info
  └── ... other files
```

**The `data/` folder is where you'll spend most time.**

---

## Editing Content with Copilot

### The Easy Way: Ask Copilot

**Step 1: Open the Chat Panel**
- Click the **Copilot icon** on the left sidebar (speech bubble), or
- Press `Ctrl+Shift+I` (Windows) or `Cmd+Shift+I` (Mac)

**Step 2: Ask a Question**
Type what you want to do in plain English:

```
"I want to update the homepage hero title to 'Live Opera for Your Perfect Day'"
```

**Step 3: Follow Copilot's Help**
Copilot will:
- Show you which file to edit
- Suggest the exact changes
- Guide you through the changes

**Step 4: Make the Change**
Either:
- Click the **Apply** button if Copilot offers it
- Or copy-paste the suggested text into the file yourself

### The Manual Way: Edit Directly

**If you prefer to edit files yourself:**

1. **Open a file** in the left sidebar by clicking on it
   - Example: Click `data/homepage.json`
2. **Find the text** you want to change
3. **Edit it** (Copilot shows suggestions as you type)
4. **Save** with `Ctrl+S` (Windows) or `Cmd+S` (Mac)

---

## Common Site Owner Tasks

### Task 1: Change Homepage Title

**What you'll do:** Update the main "Aria Amore" title on your homepage

**Ask Copilot:**
```
"Help me change the homepage hero title from 'Aria Amore' to 'Aria Amore - Charleston Opera'"

Where should I make this change?
```

**Expected response:** Copilot tells you to edit `data/homepage.json` and shows you where

---

### Task 2: Update an Artist's Bio

**What you'll do:** Change a performer's biography

**Ask Copilot:**
```
"I need to update Xavier Williams' bio in the artists list. 
His new bio is: 'A versatile tenor with 10 years of international experience'

How do I do this?"
```

**Expected response:** Copilot shows you the exact location in `data/artists.json` and what to change

---

### Task 3: Change Service Prices

**What you'll do:** Update package pricing

**Ask Copilot:**
```
"Update the Serenade package price to $600 and the Aria package price to $1800.

Where are these prices in the files?"
```

**Expected response:** Copilot shows you `data/services.json` with the prices and tells you exactly which lines to change

---

### Task 4: Add a New Performer

**What you'll do:** Add a new artist to your website

**Ask Copilot:**
```
"I want to add a new performer:
- Name: Maria Rossi
- Bio: Award-winning soprano from Italy
- Instagram: @mariarossi
- Audio file: maria-ave-maria.mp3

How do I add her to the artists page?"
```

**Expected response:** Copilot shows you the exact JSON structure to add and where to paste it in `data/artists.json`

---

### Task 5: Update Contact Information

**What you'll do:** Change your phone number, email, or address

**Ask Copilot:**
```
"My new phone number is (843) 555-9876. 
Where do I update this on the website?"
```

**Expected response:** Copilot points you to `data/contact.json` and shows the exact location

---

### Task 6: Add an Event

**What you'll do:** Add a past or upcoming performance to your events page

**Ask Copilot:**
```
"Add a new event:
- Date: May 15, 2026
- Title: Romantic Garden Wedding
- Location: Magnolia Gardens, Charleston, SC
- Description: Beautiful evening ceremony with full ensemble
- Status: past

How do I add this?"
```

**Expected response:** Shows you the structure in `data/events.json`

---

## Copilot Custom Instructions for Your Project

Your project has **special Copilot instructions** built-in to help you better. These instructions:

✅ Tell Copilot about your project structure  
✅ Remind Copilot to edit JSON files, not HTML  
✅ Help Copilot understand your naming conventions  
✅ Guide Copilot to preserve your existing styles  
✅ Tell Copilot to follow existing patterns  

**Location:** These instructions are in `.github/COPILOT_INSTRUCTIONS.md`

**What this means for you:** When you ask Copilot for help, it already knows:
- Where your content files are (`data/` folder)
- How your website is structured
- What conventions to follow
- How to make changes safely

**You don't need to do anything!** Copilot automatically uses these instructions.

---

## Basic VS Code Skills

### Opening a File

**Option 1: Click in the sidebar**
- Left sidebar shows all files
- Click on any file to open it

**Option 2: Use keyboard shortcut**
- Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
- Type the filename: `homepage.json`
- Click the result

### Finding Text in a File

**Option 1: Use Find**
- Press `Ctrl+F` (Windows) or `Cmd+F` (Mac)
- Type what you're looking for
- VS Code highlights all matches

**Option 2: Ask Copilot**
- Open Copilot chat
- Ask: "Where is the price field in services.json?"

### Saving a File

**Auto-save (Recommended):**
- Files save automatically (look for white dot next to filename)

**Manual save:**
- Press `Ctrl+S` (Windows) or `Cmd+S` (Mac)
- Or use: **File** → **Save**

### Undoing Changes

Made a mistake?
- Press `Ctrl+Z` (Windows) or `Cmd+Z` (Mac) to undo
- Press multiple times to undo multiple changes

---

## Understanding JSON Files

**JSON** is the format your website uses for content. It looks like this:

```json
{
  "name": "Aria Amore",
  "phone": "(843) 555-1234",
  "email": "info@ariaamore.com"
}
```

### JSON Rules (Important!)

✅ **DO** use double quotes around text: `"name": "Aria Amore"`  
✅ **DO** use commas between items: `"name": "Aria", "phone": "123"`  
✅ **DO** use proper formatting with colons: `"name": "value"`  

❌ **DON'T** add commas after the last item: `"phone": "123",` ← NO COMMA  
❌ **DON'T** use single quotes: `'name': 'value'` ← WRONG  
❌ **DON'T** forget commas between items  

### Copilot Helps With This!

If you make a mistake, VS Code shows a red squiggly line. Ask Copilot:
```
"Is this JSON correct? How do I fix it?"
```

---

## Troubleshooting

### Problem: "I don't see Copilot chat panel"

**Solution:**
- Look at left sidebar and click the speech bubble icon
- Or press `Ctrl+Shift+I` (Windows) or `Cmd+Shift+I` (Mac)
- If still missing: Click **Extensions**, search "Copilot", and click **Install**

### Problem: "Copilot says it needs to be signed in"

**Solution:**
- Click **Sign in** when prompted
- If no prompt: Click **Accounts** icon (bottom left) → **Sign in with GitHub**
- Create free GitHub account if you don't have one

### Problem: "I can't find the file I need"

**Solution:**
- Open Copilot chat and ask: "Which file controls the homepage?"
- Or use keyboard shortcut `Ctrl+P` and type filename

### Problem: "I made changes and now something looks wrong"

**Solution:**
- Press `Ctrl+Z` (or `Cmd+Z` on Mac) to undo
- Ask Copilot: "What went wrong with my edits?"
- Check the troubleshooting in [📘 Site Owner Manual](SITE-OWNER-MANUAL.md)

### Problem: "I'm confused about what to edit"

**Solution - Ask Copilot directly:**
```
"I want to [describe what you want to change]

Which file should I edit? Show me the exact location."
```

---

## Pro Tips

### Tip 1: Use Descriptive Prompts

✅ **Good prompt:** 
```
"Update the artist named 'Xavier Williams' bio to say 
'Award-winning tenor performing internationally'"
```

❌ **Vague prompt:** 
```
"Change the artist"
```

### Tip 2: Ask Follow-Up Questions

After Copilot suggests changes, you can ask:
- "Show me this change in context"
- "Is this the right location?"
- "What else might I need to change?"

### Tip 3: Copy the Exact Text

When Copilot shows changes:
1. Read what it says carefully
2. If it looks right, select and copy the exact text
3. Paste it into your file in the right location
4. Save the file

### Tip 4: Use "Show in File"

When Copilot references a file:
- Click **Show in File** to go directly to that location
- This saves time vs. searching manually

### Tip 5: Test Small Changes First

Don't make 10 changes at once:
1. Make one small change
2. Save it
3. Test it (upload and check your website)
4. If it works, make the next change

### Tip 6: Always Ask Before Deleting

Before deleting anything, ask Copilot:
```
"Is it safe to delete this section? 
What depends on it?"
```

---

## Workflow: Your Daily Process

Here's how you'll typically work:

1. **Open VS Code** and your project folder
2. **Identify what you need to change** via Copilot chat
3. **Navigate to the right file** (Copilot helps)
4. **Make the edit** (manually or copy-paste from Copilot)
5. **Save** with `Ctrl+S`
6. **Upload to your server** via FTP
7. **Refresh your website** in browser to see changes

---

## When to Use vs Manual Editing

### Use Copilot Chat When:
- You're unsure which file to edit
- You need to format something correctly
- You want to add several items
- You want explanations of what changed
- You're confused about JSON structure

### Edit Manually When:
- You know exactly what to change
- It's a simple one-word change
- You're changing one field
- You want to do it fast without explaining

---

## Keyboard Shortcuts (Most Used)

| Shortcut | Windows | Mac | What It Does |
|----------|---------|-----|--------------|
| Save | `Ctrl+S` | `Cmd+S` | Saves your file |
| Undo | `Ctrl+Z` | `Cmd+Z` | Undo last change |
| Find | `Ctrl+F` | `Cmd+F` | Search in current file |
| Open File | `Ctrl+P` | `Cmd+P` | Quick file search |
| Copilot Chat | `Ctrl+Shift+I` | `Cmd+Shift+I` | Open AI assistant |

---

## Understanding Error Messages

VS Code sometimes shows error messages. Here are common ones:

### "Expected comma"
**Means:** You forgot a comma between items
**Fix:** Ask Copilot or add a comma after the item

### "Unexpected character"
**Means:** Something is formatted wrong (wrong quote, typo, etc.)
**Fix:** Click the error and ask Copilot to fix it

### "Cannot find module"
**Means:** Something is broken and needs a developer
**Fix:** Don't worry about this; ask your developer

---

## Next Steps

1. **Install VS Code** from https://code.visualstudio.com/
2. **Install Copilot** extension
3. **Open your project** folder
4. **Try a simple edit** using Copilot
5. **Save and preview** your changes
6. **Refer back to this guide** whenever you forget something

---

## Quick Reference: Your Most Needed Files

| File | What It Controls | Edit How |
|------|------------------|----------|
| `data/homepage.json` | Homepage title, featured performers | Use Copilot or Section 2 of [Site Owner Manual](SITE-OWNER-MANUAL.md) |
| `data/services.json` | Service packages and pricing | Use Copilot or Section 3 of [Site Owner Manual](SITE-OWNER-MANUAL.md) |
| `data/artists.json` | Artist/performer information | Use Copilot or Section 2 of [Site Owner Manual](SITE-OWNER-MANUAL.md) |
| `data/contact.json` | Contact info and social links | Use Copilot or Section 5 of [Site Owner Manual](SITE-OWNER-MANUAL.md) |
| `data/about.json` | About page content | Use Copilot or [Site Owner Manual](SITE-OWNER-MANUAL.md) |
| `data/events.json` | Events history | Use Copilot or Section 4 of [Site Owner Manual](SITE-OWNER-MANUAL.md) |
| `data/gallery.json` | Gallery photos | Use Copilot or Section 4 of [Site Owner Manual](SITE-OWNER-MANUAL.md) |

---

## Get Help

**Quick questions about VS Code:**
- Ask Copilot directly in the chat panel

**Questions about editing content:**
- Refer to [📘 Site Owner Manual](SITE-OWNER-MANUAL.md)

**Questions about your website:**
- Check [🎭 Visual Feature Guide](VISUAL-GUIDE.md)

**Technical issues:**
- Contact your developer

---

## You've Got This! 🎭

VS Code and Copilot are powerful tools that will save you lots of time. Start with simple changes, get comfortable with the tool, and soon you'll be updating your website with confidence!

**Remember:**
- You can always undo changes with `Ctrl+Z`
- Ask Copilot anything - it's here to help
- Your custom instructions make Copilot extra helpful for your project
- Save often with `Ctrl+S`

---

**Last Updated:** March 3, 2026  
**For:** Site Owners (Non-Technical Users)  
**Related:** [📘 Site Owner Manual](SITE-OWNER-MANUAL.md) | [🎭 Visual Feature Guide](VISUAL-GUIDE.md) | [📚 Documentation Index](README.md)
