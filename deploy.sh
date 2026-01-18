#!/bin/bash
# Deployment script for Campus Compass

echo "🚀 Deploying Campus Compass to GitHub and Render..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "Deploy: Campus Compass - Production ready" || echo "No changes to commit"

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/Sanesh764/Ai_for_socal_good.git
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git branch -M main
git push -u origin main || git push origin main

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://render.com"
echo "2. Create new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Add environment variables (GEMINI_API_KEY, etc.)"
echo "5. Deploy!"
echo ""
echo "Your app will be live at: https://your-app-name.onrender.com"
