# ✅ Deployment Checklist

## Before Deploying

### 1. Verify Files Are Ready
- [x] `render.yaml` - Render configuration
- [x] `Procfile` - Backup start command
- [x] `package.json` - Has engines field
- [x] `.gitignore` - Excludes .env and node_modules
- [x] `server.js` - Uses `process.env.PORT`

### 2. Test Locally
```bash
npm install
npm start
```
- [ ] App runs without errors
- [ ] All pages load
- [ ] Chat works (with API key)

### 3. Prepare GitHub
- [ ] All files committed
- [ ] `.env` is NOT in repository (check .gitignore)
- [ ] Repository is public or connected to Render

---

## Deploy to GitHub

```bash
# If first time
git init
git add .
git commit -m "Initial commit: Campus Compass"
git remote add origin https://github.com/Sanesh764/Ai_for_socal_good.git
git branch -M main
git push -u origin main

# If updating
git add .
git commit -m "Update: description"
git push origin main
```

**Verify:** Check https://github.com/Sanesh764/Ai_for_socal_good - all files should be there

---

## Deploy to Render

### Step 1: Create Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub

### Step 2: Create Web Service
- [ ] Click "New +" → "Web Service"
- [ ] Connect repository: `Sanesh764/Ai_for_socal_good`
- [ ] Render auto-detects settings from `render.yaml`

### Step 3: Environment Variables
Add in Render dashboard:
- [ ] `GEMINI_API_KEY` = your API key
- [ ] `NODE_ENV` = production
- [ ] (Optional) `MONGODB_URI` = if using MongoDB

### Step 4: Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for build (2-5 minutes)
- [ ] Check build logs for errors

### Step 5: Verify
- [ ] App loads at Render URL
- [ ] No errors in logs
- [ ] Chat works
- [ ] All pages accessible

---

## Common Issues & Solutions

### ❌ Build Fails
- Check Node.js version (needs 18+)
- Verify package.json
- Check build logs

### ❌ App Crashes
- Verify GEMINI_API_KEY is set
- Check server logs
- Ensure PORT uses process.env.PORT

### ❌ Environment Variables Not Working
- Restart service after adding
- Check variable names (case-sensitive)
- Verify in Render dashboard

---

## Post-Deployment

- [ ] Test all features
- [ ] Share Render URL
- [ ] Monitor for errors
- [ ] Set up uptime monitoring (optional)

---

## Your Live URL

Once deployed, your app will be at:
**`https://your-service-name.onrender.com`**

---

**Ready to deploy! Follow the steps above. 🚀**
