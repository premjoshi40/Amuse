# Quick Start: Deploy Amuse to GitHub Pages

## ⚡ Fastest Way to Deploy

### If you have Emergent Standard Plan:

1. **Click "Save to GitHub"** button in Emergent
2. Select repository: `premjoshi40/Amuse`
3. On your computer, open terminal:
   ```bash
   git clone https://github.com/premjoshi40/Amuse.git
   cd Amuse/frontend
   yarn install
   yarn deploy
   ```
4. **Done!** Visit: https://premjoshi40.github.io/Amuse

---

### If you DON'T have Emergent Standard Plan:

1. **Create GitHub repo** at: https://github.com/new
   - Name: `Amuse`
   - Public repository
   - Don't initialize with README

2. **Download these files from Emergent:**
   - Entire `/app/frontend` folder

3. **On your computer:**
   ```bash
   cd path/to/downloaded/frontend
   
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/premjoshi40/Amuse.git
   git branch -M main
   git push -u origin main
   
   yarn install
   yarn deploy
   ```

4. **Done!** Visit: https://premjoshi40.github.io/Amuse

---

## ✅ What's Configured

- ✅ HashRouter (GitHub Pages compatible)
- ✅ Homepage: https://premjoshi40.github.io/Amuse
- ✅ Build scripts ready
- ✅ All features working (with mock data)
- ✅ Favorites using localStorage

---

## 🔄 To Update Your Site

Make changes, then:
```bash
yarn deploy
```

---

## 📖 Full Guide

See `GITHUB_PAGES_DEPLOYMENT.md` for complete instructions and troubleshooting.

---

**Your Live URL:** https://premjoshi40.github.io/Amuse
