# Render Deployment - Step by Step

## Prerequisites
- GitHub repository: https://github.com/Sanesh764/Ai_for_socal_good
- Render account (free): https://render.com

## Step-by-Step Deployment

### 1. Push to GitHub First

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Campus Compass"

# Add remote
git remote add origin https://github.com/Sanesh764/Ai_for_socal_good.git

# Push
git branch -M main
git push -u origin main
```

### 2. Create Render Account

1. Go to: https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (recommended - easier connection)

### 3. Create New Web Service

1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Click **"Connect account"** if not connected to GitHub
4. Find and select: **`Sanesh764/Ai_for_socal_good`**

### 4. Configure Service

Render will auto-detect from `render.yaml`, but verify:

- **Name:** `campus-compass` (or your choice)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** (leave empty)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 5. Add Environment Variables

Click **"Environment"** tab, then **"Add Environment Variable"**:

**Required:**
```
GEMINI_API_KEY = your_actual_api_key_here
NODE_ENV = production
```

**Optional (but recommended):**
```
APP_NAME = Campus Compass
SUPPORT_EMAIL = support@campuscompass.edu
CRISIS_HOTLINE = 1800-HELP-NOW
```

**Note:** Do NOT add `PORT` - Render sets this automatically.

### 6. Deploy

1. Click **"Create Web Service"**
2. Wait for build to complete (2-5 minutes)
3. Watch the build logs for any errors

### 7. Get Your Live URL

Once deployed, Render provides:
- **URL:** `https://campus-compass.onrender.com` (or your service name)
- Your app is now live! 🎉

---

## Troubleshooting

### Build Fails

**Error:** "npm install failed"
- Check Node.js version (needs 18+)
- Verify package.json is correct
- Check build logs

**Error:** "Module not found"
- Ensure all dependencies are in package.json
- Run `npm install` locally to test

### App Crashes

**Error:** "Cannot find module"
- Check all files are committed to GitHub
- Verify file paths are correct

**Error:** "Port already in use"
- Don't set PORT manually - Render handles this
- Check server.js uses `process.env.PORT`

### Environment Variables Not Working

- Variables are case-sensitive
- Restart service after adding variables
- Check variable names match exactly

### Static Files Not Loading

- Verify `public` folder is in repository
- Check `express.static` in server.js
- Ensure files are committed

---

## Free Tier Notes

- **Sleep:** Services sleep after 15 min inactivity
- **Cold Start:** First request after sleep takes 30-60 seconds
- **Solution:** Use UptimeRobot to ping every 5 minutes (free)

---

## Quick Commands

### Update and Redeploy:
```bash
git add .
git commit -m "Update: description"
git push origin main
```
Render auto-deploys on push (if enabled).

### Manual Deploy:
- Go to Render dashboard
- Click "Manual Deploy" → "Deploy latest commit"

---

## Success Checklist

- [ ] GitHub repository has all files
- [ ] Render service created
- [ ] Environment variables set
- [ ] Build successful
- [ ] App loads at Render URL
- [ ] Chat works (test with API key)
- [ ] All pages accessible

---

**Your app is now live! Share the Render URL with judges and users.**
