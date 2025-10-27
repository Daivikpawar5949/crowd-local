# 🚀 Deploy CrowdLocal to Netlify - Complete Guide

## Overview

Your CrowdLocal app has two parts:
1. **Frontend** (React + Vite) → Deploy to Netlify
2. **Backend** (Express + MongoDB) → Deploy to Heroku/Railway/Render

This guide covers both!

---

## Part 1: Prepare Frontend for Deployment

### Step 1: Update Environment Configuration

Create a `.env.production` file for production variables:

```bash
# /Users/daivikpawar/crowd--local/.env.production
VITE_API_URL=https://your-backend-url.com
```

### Step 2: Update API Calls

We need to update all API calls to use the environment variable. Let me provide the pattern:

**File: `/src/App.jsx`**

Replace all `http://localhost:5001` with:

```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

// Then use:
fetch(`${API_BASE}/api/auth/signup`, ...)
```

### Step 3: Build the App Locally

```bash
cd /Users/daivikpawar/crowd--local
npm run build
```

This creates a `/dist` folder ready for deployment.

---

## Part 2: Deploy Frontend to Netlify

### Option A: Using Netlify CLI (Recommended)

**Step 1: Install Netlify CLI**
```bash
npm install -g netlify-cli
```

**Step 2: Build your app**
```bash
npm run build
```

**Step 3: Deploy**
```bash
netlify deploy --prod --dir=dist
```

**Step 4: Follow the prompts:**
- Connect to your GitHub account
- Create a new site
- Set build command: `npm run build`
- Set publish directory: `dist`

### Option B: GitHub + Automatic Deployment

**Step 1: Push to GitHub**
```bash
cd /Users/daivikpawar/crowd--local
git init
git add .
git commit -m "Initial CrowdLocal commit"
git remote add origin https://github.com/YOUR_USERNAME/crowd-local.git
git push -u origin main
```

**Step 2: Connect to Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub
4. Select your `crowd-local` repository
5. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

**Step 3: Add Environment Variables**
1. Go to Site Settings → Build & Deploy → Environment
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

---

## Part 3: Deploy Backend to Heroku/Railway/Render

### Option 1: Deploy to Railway (Easiest)

**Step 1: Create Railway Account**
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

**Step 2: Deploy Backend**
```bash
cd /Users/daivikpawar/crowd--local/backend
npm install -g @railway/cli
railway login
railway init
railway up
```

**Step 3: Configure Environment Variables**
1. In Railway dashboard, go to Variables
2. Add:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   NODE_ENV=production
   ```

**Step 4: Get Your Backend URL**
- Railway provides a URL like: `https://your-app.railway.app`
- Use this in frontend `VITE_API_URL`

### Option 2: Deploy to Render

**Step 1: Push backend to GitHub**
```bash
cd /Users/daivikpawar/crowd--local
git add .
git commit -m "Add backend code"
git push
```

**Step 2: Deploy on Render**
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Settings:
   - **Name**: crowdlocal-api
   - **Environment**: Node
   - **Build command**: `npm install`
   - **Start command**: `node server.js`
   - **Root directory**: `backend`
5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   ```
6. Click "Create Web Service"

### Option 3: Deploy to Heroku

**Step 1: Install Heroku CLI**
```bash
brew tap heroku/brew && brew install heroku
```

**Step 2: Create Heroku App**
```bash
cd /Users/daivikpawar/crowd--local/backend
heroku login
heroku create your-app-name
```

**Step 3: Add Environment Variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret_key
heroku config:set NODE_ENV=production
```

**Step 4: Deploy**
```bash
git push heroku main
```

---

## Part 4: Setup MongoDB Atlas (Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up (free tier available)

### Step 2: Create a Cluster
1. Click "Create" → Choose free tier
2. Create a database user and password
3. Whitelist IP address (or allow all: 0.0.0.0/0)

### Step 3: Get Connection String
1. Click "Connect"
2. Copy connection string: `mongodb+srv://user:password@cluster.mongodb.net/crowdlocal`

### Step 4: Update Environment Variables
In your backend's environment variables, use this MongoDB URI.

---

## Part 5: Complete Deployment Checklist

### Frontend (Netlify)
- [ ] Environment variable set: `VITE_API_URL`
- [ ] API calls updated to use environment variable
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Site deployed and accessible

### Backend (Railway/Render/Heroku)
- [ ] Environment variables configured:
  - [ ] `MONGODB_URI` → MongoDB Atlas connection
  - [ ] `JWT_SECRET` → Strong secret key
  - [ ] `PORT` → 5001 or default
  - [ ] `NODE_ENV` → production
- [ ] Backend deployed and accessible
- [ ] API health check working: `https://your-backend.com/api/health`

### Connection
- [ ] Frontend `VITE_API_URL` points to backend
- [ ] Backend CORS includes frontend domain
- [ ] Test signup/login flow end-to-end

---

## Configuration Changes Needed

### Update `/src/App.jsx`

Replace all instances of hardcoded `http://localhost:5001` with:

```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

// Example:
const response = await fetch(`${API_BASE}/api/auth/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password }),
})
```

### Update `backend/server.js`

Add production CORS configuration:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'http://localhost:5173'
  ],
  credentials: true,
}))
```

---

## Deployment Steps Summary

### Quick Deploy (5 minutes)

**Frontend:**
```bash
cd /Users/daivikpawar/crowd--local
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Backend:**
```bash
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
```

**Then:**
1. Get backend URL from Railway/Render
2. Add to Netlify environment: `VITE_API_URL=your-backend-url`
3. Redeploy frontend
4. Test at your-site.netlify.app

---

## Testing After Deployment

### 1. Test Frontend
```bash
# Open in browser
https://your-site.netlify.app
```

### 2. Test Backend
```bash
curl https://your-backend.com/api/health
# Should return: {"message":"✅ Server is running"}
```

### 3. Test Full Flow
1. Sign up with new account
2. Log in
3. Create a project
4. Check dashboard shows new project

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API calls fail | Check `VITE_API_URL` environment variable in Netlify |
| CORS errors | Update backend CORS to include your frontend domain |
| Login not working | Verify JWT_SECRET is same in all environments |
| MongoDB connection fails | Check connection string and IP whitelist in Atlas |
| Build fails on Netlify | Check `npm run build` works locally first |

---

## Production Environment Variables

### Frontend (.env.production or Netlify)
```
VITE_API_URL=https://your-backend-api.com
```

### Backend
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/crowdlocal
JWT_SECRET=your-super-secret-key-change-this
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://your-site.netlify.app
```

---

## Next Steps

1. ✅ Update code for environment variables
2. ✅ Create MongoDB Atlas account & cluster
3. ✅ Deploy backend to Railway/Render
4. ✅ Deploy frontend to Netlify
5. ✅ Connect frontend to backend
6. ✅ Test complete flow
7. ✅ Monitor logs and errors

---

## Useful Links

- Netlify: https://netlify.com
- Railway: https://railway.app
- Render: https://render.com
- MongoDB Atlas: https://mongodb.com/cloud/atlas
- Heroku: https://heroku.com

---

**Your app will be live on the internet! 🎉**

Need help with any specific step? Let me know!
