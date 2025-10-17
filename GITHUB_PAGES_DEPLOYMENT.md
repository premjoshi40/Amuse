# GitHub Pages Deployment Guide for Amuse Museum App

## 🎯 What You Have Now

Your Amuse museum application has been configured for **GitHub Pages deployment** (frontend-only, static version).

**Configured Settings:**
- Homepage: `https://premjoshi40.github.io/Amuse`
- Repository: `premjoshi40/Amuse`
- Router: HashRouter (GitHub Pages compatible)
- Favorites: Using localStorage (works without backend)
- Build: Optimized production build ✅

---

## 📋 Prerequisites

1. **GitHub Account** - You have one (premjoshi40)
2. **Git Installed** - On your local machine
3. **Repository Created** - Create repo named "Amuse" at github.com/new

---

## 🚀 Deployment Steps

### Step 1: Save Your Code to GitHub

In Emergent platform:
1. Look for the **"Save to GitHub"** button in your interface
2. Click it and follow the prompts
3. Select repository: `premjoshi40/Amuse`
4. This will push all your code to GitHub

**Note:** "Save to GitHub" requires Standard Plan subscription ($20/month)

### Step 2: Deploy to GitHub Pages

Once your code is on GitHub, you have **two options**:

#### Option A: Deploy from Your Local Machine (Recommended)

1. Clone the repository to your computer:
   ```bash
   git clone https://github.com/premjoshi40/Amuse.git
   cd Amuse
   ```

2. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Deploy to GitHub Pages:
   ```bash
   yarn deploy
   ```

5. Wait for deployment to complete (1-2 minutes)

6. Visit your live site:
   ```
   https://premjoshi40.github.io/Amuse
   ```

#### Option B: Deploy via GitHub Actions (Advanced)

1. In your GitHub repository, go to **Settings** → **Pages**
2. Under "Source", select **gh-pages** branch
3. Click Save
4. Your site will be published at `https://premjoshi40.github.io/Amuse`

---

## 🔧 Manual Deployment (Without Emergent "Save to GitHub")

If you don't have Standard Plan, you can manually deploy:

### Step 1: Download Your Code

1. In Emergent, download these folders:
   - `/app/frontend/src`
   - `/app/frontend/public`
   - `/app/frontend/package.json`
   - `/app/frontend/tailwind.config.js`
   - `/app/frontend/craco.config.js`

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Amuse`
3. Keep it **Public**
4. **DO NOT** initialize with README
5. Click "Create repository"

### Step 3: Initialize and Push

On your local machine:

```bash
# Navigate to your downloaded frontend folder
cd path/to/frontend

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Amuse Museum App"

# Add remote repository
git remote add origin https://github.com/premjoshi40/Amuse.git

# Push to GitHub
git branch -M main
git push -u origin main

# Deploy to GitHub Pages
yarn deploy
```

---

## ✅ Verification

After deployment, check:

1. **GitHub Pages URL**: https://premjoshi40.github.io/Amuse
2. **All pages work**: Home, Gallery, Tours, Scanner, AR, Favorites
3. **Images load**: All artwork images should be visible
4. **Navigation works**: All links and buttons functional
5. **Favorites work**: Save/remove favorites (stored in browser)

---

## 🎨 What's Included in Your Deployment

✅ **Full UI/UX**
- Vibrant color theme (coral, emerald, turquoise, purple)
- All pages: Home, Gallery, Tours, Scanner, AR Viewer, Favorites
- Responsive design
- Smooth animations

✅ **Features**
- Museum sections (Paintings, Sculptures, Historical Artifacts)
- Artwork details and information
- Virtual tours
- QR code scanning simulation
- AR viewer simulation
- Favorites collection (localStorage)

✅ **Mock Data**
- 3 Paintings (Mona Lisa, Starry Night, Girl with Pearl Earring)
- 3 Sculptures (Venus de Milo, The Thinker, Pietà)
- 3 Historical Artifacts (Rosetta Stone, Mask of Tutankhamun, Parthenon Marbles)
- Tour information

---

## ⚠️ Limitations (Frontend-Only)

❌ **No Backend**
- No real database
- No user authentication
- No persistent data storage

❌ **Temporary Storage**
- Favorites saved in browser only (localStorage)
- Clearing browser data = losing favorites

❌ **Static Content**
- All artwork data is hardcoded
- Cannot add new artworks without code changes

---

## 🔄 Updating Your Deployed Site

Whenever you make changes:

```bash
# Make your changes in code
# Then run:
yarn deploy
```

This will rebuild and redeploy your site automatically.

---

## 🆘 Troubleshooting

### Issue: Site shows 404 error
**Solution:** 
- Check GitHub Settings → Pages
- Ensure source is set to `gh-pages` branch
- Wait 2-3 minutes after first deployment

### Issue: Routes don't work (404 on page refresh)
**Solution:** 
- Already handled! We're using HashRouter
- URLs will have `#` (e.g., `.../#/gallery/paintings`)

### Issue: Images not loading
**Solution:** 
- All images are using external URLs (Wikimedia, Unsplash, placehold.co)
- Check your internet connection
- Images should load automatically

### Issue: Favorites not saving
**Solution:** 
- Favorites use localStorage (browser-only)
- They should persist until you clear browser data
- Different browsers = different favorites

---

## 📈 Next Steps (Optional)

If you want to add backend functionality later:

1. Use **Emergent's Deploy** feature for full-stack hosting
2. Or deploy backend separately (Heroku, Railway, Vercel)
3. Connect frontend to live backend API
4. Add real database (MongoDB Atlas)
5. Implement user authentication

---

## 📞 Support

- **GitHub Pages Docs**: https://pages.github.com
- **Emergent Support**: Use the support agent in chat
- **Repository**: https://github.com/premjoshi40/Amuse

---

## 🎉 Success Checklist

- [ ] Code saved to GitHub
- [ ] Repository created: premjoshi40/Amuse
- [ ] Deployed using `yarn deploy`
- [ ] Site accessible at https://premjoshi40.github.io/Amuse
- [ ] All pages working correctly
- [ ] Images loading properly
- [ ] Navigation functional
- [ ] Favorites saving in browser

---

**Deployment configured by Emergent AI Agent**  
*Your Amuse Museum App is ready for the world! 🎨🏛️*
