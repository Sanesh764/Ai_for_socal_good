# Deployment Guide - Campus Compass

## Deploy to GitHub

### Step 1: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Campus Compass - AI for Social Good"

# Add remote repository
git remote add origin https://github.com/Sanesh764/Ai_for_socal_good.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Verify GitHub Repository

1. Go to: https://github.com/Sanesh764/Ai_for_socal_good
2. Verify all files are uploaded
3. Check that `.env` is NOT in the repository (it's in .gitignore)

---

## Deploy to Render

### Step 1: Create Render Account

1. Go to: https://render.com
2. Sign up with GitHub (recommended)
3. Connect your GitHub account

### Step 2: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Sanesh764/Ai_for_socal_good`
3. Render will auto-detect the settings from `render.yaml`

### Step 3: Configure Environment Variables

In Render dashboard, go to **Environment** tab and add:

**Required:**
- `GEMINI_API_KEY` - Your Gemini API key
- `NODE_ENV` - Set to `production`
- `PORT` - Render sets this automatically (don't override)

**Optional:**
- `MONGODB_URI` - MongoDB connection string (if using MongoDB)
- `APP_NAME` - Campus Compass
- `SUPPORT_EMAIL` - support@campuscompass.edu
- `CRISIS_HOTLINE` - 1800-HELP-NOW

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will:
   - Install dependencies (`npm install`)
   - Build the application
   - Start the server (`npm start`)
3. Wait for deployment to complete (2-5 minutes)

### Step 5: Get Your Live URL

- Render will provide a URL like: `https://campus-compass.onrender.com`
- Your app is now live!

---

## Render Configuration Files

### render.yaml
This file tells Render how to deploy your app:
- Service type: Web service
- Build command: `npm install`
- Start command: `npm start`
- Environment: Node.js
- Plan: Free tier

### Procfile
Backup start command for Render (if render.yaml doesn't work)

---

## Troubleshooting

### Issue: Build Fails
**Solution:**
- Check Node.js version (needs >= 18.0.0)
- Verify all dependencies in package.json
- Check build logs in Render dashboard

### Issue: App Crashes on Start
**Solution:**
- Verify `GEMINI_API_KEY` is set in environment variables
- Check server logs in Render dashboard
- Ensure PORT is not hardcoded (use `process.env.PORT`)

### Issue: Environment Variables Not Working
**Solution:**
- Make sure variables are set in Render dashboard
- Restart the service after adding variables
- Check variable names match exactly (case-sensitive)

### Issue: MongoDB Connection Fails
**Solution:**
- MongoDB is optional - app works without it
- If using MongoDB, verify connection string format
- Check MongoDB Atlas IP whitelist (if using Atlas)

### Issue: Static Files Not Loading
**Solution:**
- Verify `public` folder is in repository
- Check `express.static` path in server.js
- Ensure files are committed to Git

---

## Post-Deployment Checklist

- [ ] App loads at Render URL
- [ ] Navigation works
- [ ] Wellbeing chat works (test with API key)
- [ ] Accessibility features work
- [ ] Mobile responsive
- [ ] Environment variables set correctly
- [ ] No console errors

---

## Free Tier Limitations (Render)

- **Sleep after inactivity:** Free tier services sleep after 15 minutes of inactivity
- **Cold starts:** First request after sleep takes 30-60 seconds
- **Bandwidth:** 100GB/month
- **Build time:** 10 minutes max

**To avoid sleep:**
- Upgrade to paid plan ($7/month)
- Use a service like UptimeRobot to ping your app every 5 minutes

---

## Environment Variables Reference

```bash
# Required
GEMINI_API_KEY=your_api_key_here
NODE_ENV=production

# Optional
PORT=10000  # Render sets this automatically
MONGODB_URI=mongodb://...  # Optional
APP_NAME=Campus Compass
SUPPORT_EMAIL=support@campuscompass.edu
CRISIS_HOTLINE=1800-HELP-NOW
```

---

## Quick Deploy Commands

### GitHub:
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

### Render:
- Automatic deployment on git push (if auto-deploy enabled)
- Or manually deploy from Render dashboard

---

**Your app will be live at: `https://your-app-name.onrender.com`**
