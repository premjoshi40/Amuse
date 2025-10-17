# Merge Instructions: Add GitHub Pages to Your Existing Amuse Repo

## 📋 Files Modified for GitHub Pages

Here are the changes I made to enable GitHub Pages deployment:

### 1. `/app/frontend/package.json`
**Changes:**
- Added: `"homepage": "https://premjoshi40.github.io/Amuse"`
- Added dependency: `"gh-pages": "^6.3.0"` (devDependencies)
- Added scripts:
  - `"predeploy": "yarn build"`
  - `"deploy": "gh-pages -d build"`

### 2. `/app/frontend/src/App.js`
**Changes:**
- Changed: `import { BrowserRouter, ... }` → `import { HashRouter, ... }`
- Changed: `<BrowserRouter>` → `<HashRouter>` (and closing tag)

### 3. New Files Created
- `/app/GITHUB_PAGES_DEPLOYMENT.md` - Comprehensive deployment guide
- `/app/QUICK_START.md` - Quick reference guide
- `/app/MERGE_GUIDE.md` - This file

---

## 🔄 Step-by-Step Merge Process

### Step 1: Download Your Current Configured Code

From Emergent, you need to get these files from `/app/frontend`:
- `package.json` (updated)
- `src/App.js` (updated)
- All other files in `src/` folder (unchanged but needed)

**Easiest way:** Use Emergent's "Save to GitHub" to a temporary branch, or download the files manually.

---

### Step 2: Clone Your Existing Repo

On your local machine:

```bash
# Clone your existing repository
git clone https://github.com/premjoshi40/Amuse.git
cd Amuse

# Create a new branch for safety
git checkout -b github-pages-setup
```

---

### Step 3: Backup Your Current Frontend

```bash
# Create a backup of your existing frontend
cp -r frontend frontend_backup
```

---

### Step 4: Apply Changes

#### Option A: Use Emergent's "Save to GitHub"

1. In Emergent, click **"Save to GitHub"**
2. Choose to create a new branch: `github-pages-config`
3. On your local machine:
   ```bash
   git fetch origin
   git checkout github-pages-config
   
   # Review changes
   git diff main frontend/package.json
   git diff main frontend/src/App.js
   
   # If looks good, merge to main
   git checkout main
   git merge github-pages-config
   ```

#### Option B: Manual File Updates

If you can't use "Save to GitHub", manually update these files:

**1. Update `frontend/package.json`:**

Add/modify these sections:

```json
{
  "homepage": "https://premjoshi40.github.io/Amuse",
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@craco/craco": "^7.1.0",
    "@eslint/js": "9.23.0",
    "autoprefixer": "^10.4.20",
    "eslint": "9.23.0",
    "eslint-plugin-import": "2.31.0",
    "eslint-plugin-jsx-a11y": "6.10.2",
    "eslint-plugin-react": "7.37.4",
    "gh-pages": "^6.3.0",
    "globals": "15.15.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17"
  }
}
```

**2. Update `frontend/src/App.js`:**

Change the import line:
```javascript
// OLD:
import { BrowserRouter, Routes, Route } from "react-router-dom";

// NEW:
import { HashRouter, Routes, Route } from "react-router-dom";
```

Change the component usage:
```javascript
// OLD:
<BrowserRouter>
  <Routes>
    ...
  </Routes>
</BrowserRouter>

// NEW:
<HashRouter>
  <Routes>
    ...
  </Routes>
</HashRouter>
```

---

### Step 5: Install New Dependencies

```bash
cd frontend
yarn install
```

This will install the `gh-pages` package.

---

### Step 6: Test the Build

```bash
# Make sure everything builds correctly
yarn build
```

You should see:
```
Compiled successfully.
The project was built assuming it is hosted at /Amuse/.
```

---

### Step 7: Commit Changes

```bash
# Go back to root directory
cd ..

# Add all changes
git add .

# Commit
git commit -m "Configure GitHub Pages deployment with HashRouter"

# Push to GitHub
git push origin main
```

---

### Step 8: Deploy to GitHub Pages

```bash
cd frontend
yarn deploy
```

This will:
1. Build your production app
2. Create/update `gh-pages` branch
3. Push the build to GitHub Pages

---

### Step 9: Enable GitHub Pages (First Time Only)

1. Go to https://github.com/premjoshi40/Amuse/settings/pages
2. Under "Source", select **gh-pages** branch
3. Click **Save**
4. Wait 2-3 minutes for deployment

---

### Step 10: Visit Your Live Site! 🎉

```
https://premjoshi40.github.io/Amuse
```

---

## 🔍 What Changed and Why

### HashRouter vs BrowserRouter

**Why change?**
- GitHub Pages serves static files and doesn't support server-side routing
- BrowserRouter needs server configuration for clean URLs
- HashRouter uses `#` in URLs (e.g., `/#/gallery`) - works perfectly with GitHub Pages

**Example URLs:**
- Home: `https://premjoshi40.github.io/Amuse/#/`
- Gallery: `https://premjoshi40.github.io/Amuse/#/gallery/paintings`
- Tours: `https://premjoshi40.github.io/Amuse/#/tours`

### Homepage Field

The `"homepage"` field tells React where the app will be hosted, so it can correctly generate asset paths in the build.

---

## 🆘 Troubleshooting

### Issue: Merge Conflicts

If you get merge conflicts:

```bash
# See which files have conflicts
git status

# For each conflicting file, choose:
# - Keep yours: git checkout --ours <file>
# - Keep incoming: git checkout --theirs <file>
# - Manually edit to merge both

# After resolving
git add .
git commit -m "Resolved merge conflicts"
```

### Issue: yarn deploy fails

```bash
# Make sure you're in the frontend directory
cd frontend

# Make sure dependencies are installed
yarn install

# Try deploy again
yarn deploy
```

### Issue: Site shows blank page

- Check browser console for errors
- Verify the homepage URL in package.json matches your repo name exactly
- Clear browser cache and reload

### Issue: Routes show 404

- This shouldn't happen with HashRouter
- Check that App.js is using `<HashRouter>` not `<BrowserRouter>`
- Redeploy: `yarn deploy`

---

## 📦 Alternative: Download Complete Frontend

If you prefer to start fresh with the configured version:

1. Download entire `/app/frontend` folder from Emergent
2. Replace your existing `frontend` folder with this one
3. Run:
   ```bash
   cd frontend
   yarn install
   yarn deploy
   ```

---

## 🎯 Quick Command Summary

```bash
# Clone and setup
git clone https://github.com/premjoshi40/Amuse.git
cd Amuse
git checkout -b github-pages-setup

# Make the changes (manual or via Save to GitHub)
# Then:

cd frontend
yarn install
yarn build  # Test build
cd ..

git add .
git commit -m "Add GitHub Pages deployment"
git push origin main

cd frontend
yarn deploy

# Visit: https://premjoshi40.github.io/Amuse
```

---

## ✅ Verification Checklist

After deployment:

- [ ] Site loads at https://premjoshi40.github.io/Amuse
- [ ] Homepage displays correctly
- [ ] Navigation works (all menu items)
- [ ] Gallery pages load (Paintings, Sculptures, Historical)
- [ ] Artwork details page works
- [ ] Tours section works
- [ ] Scanner page loads
- [ ] AR viewer page loads
- [ ] Favorites page works
- [ ] Can add/remove favorites
- [ ] All images display correctly
- [ ] Mobile responsive works

---

## 🔄 Future Updates

To update your deployed site after making changes:

```bash
# Make your code changes
# Then:

cd frontend
yarn deploy
```

That's it! Changes will be live in 1-2 minutes.

---

**Need Help?** 
- Full guide: See `GITHUB_PAGES_DEPLOYMENT.md`
- Quick start: See `QUICK_START.md`

Your configured homepage: **https://premjoshi40.github.io/Amuse**
