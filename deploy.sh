#!/bin/bash
# Quick Deployment Script for CrowdLocal

set -e

echo "🚀 CrowdLocal Deployment Script"
echo "================================"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run from project root!"
    exit 1
fi

echo "✅ Building frontend..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist folder not created"
    exit 1
fi

echo "✅ Frontend built successfully!"
echo ""
echo "📦 Build artifacts ready in /dist"
echo ""
echo "Next steps:"
echo "1. Install Netlify CLI: npm install -g netlify-cli"
echo "2. Deploy: netlify deploy --prod --dir=dist"
echo "3. Or push to GitHub and connect to Netlify for auto-deploy"
echo ""
echo "For backend deployment:"
echo "1. Set up MongoDB Atlas cluster"
echo "2. Deploy to Railway/Render/Heroku"
echo "3. Set environment variables"
echo ""
echo "See DEPLOY_TO_NETLIFY.md for detailed instructions"
