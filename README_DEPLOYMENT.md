# Quick Deployment Guide

## 🚀 Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Sanesh764/Ai_for_socal_good.git
git branch -M main
git push -u origin main
```

## 🌐 Deploy to Render

1. **Go to Render.com** → Sign up with GitHub
2. **New Web Service** → Connect repository
3. **Settings:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
4. **Add Environment Variables:**
   - `GEMINI_API_KEY` = your API key
   - `NODE_ENV` = production
5. **Deploy!**

Your app will be live at: `https://your-app-name.onrender.com`

**Note:** Free tier sleeps after 15 min inactivity. First request may take 30-60 seconds.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
