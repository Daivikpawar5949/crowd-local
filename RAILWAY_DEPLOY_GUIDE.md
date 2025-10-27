# 🚀 Deploy Backend to Railway - Complete Guide

## ✅ You're Already Started!

You can see your project at:
https://railway.com/project/ebd5a039-c331-402f-9f9a-f917927a0045

---

## 📋 STEP 1: Add Services (Do This in Railway UI)

### Option A: Connect GitHub (Recommended)
1. In Railway dashboard, click **+ New**
2. Select **GitHub Repo**
3. Find and select: `Daivikpawar5949/crowd-local`
4. Click **Deploy**
5. Wait for it to auto-detect the `backend` folder

### Option B: Deploy from Railway CLI (You're using this)
```bash
cd /Users/daivikpawar/crowd--local/backend
railway link  # If not already linked
railway deploy
```

---

## 🔧 STEP 2: Configure Environment Variables in Railway

In the Railway dashboard for your `backend` service:

1. Click on the **Variables** tab
2. Add these environment variables:

```
MONGODB_URI = mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster.mongodb.net/crowdlocal
JWT_SECRET = your-super-secret-jwt-key-123!@#
NODE_ENV = production
FRONTEND_URL = https://your-netlify-site.netlify.app
PORT = 5001
```

**IMPORTANT:** Replace these values:
- `YOUR_USER` and `YOUR_PASSWORD` - MongoDB Atlas credentials
- `your-netlify-site` - Your actual Netlify domain

---

## 📱 STEP 3: Get Your Backend URL

After deployment completes:
1. In Railway, go to your backend service
2. Click **Settings**
3. Look for **URL** or **Domain**
4. You'll see something like: `https://crowdlocal-production-xxxx.railway.app`

**Copy this URL!** You'll need it for Netlify.

---

## 🔗 STEP 4: Connect to Netlify

Once you have your backend URL:

1. Go to **netlify.com** → Your site
2. **Settings** → **Build & Deploy** → **Environment**
3. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://crowdlocal-production-xxxx.railway.app`
4. Click **Save**

---

## 🔄 STEP 5: Redeploy Frontend on Netlify

1. Go to **Netlify Deploys**
2. Click **Trigger Deploy** → **Deploy Site**
3. Wait for build to complete

---

## ✅ FINAL CHECKLIST

Before testing:
- [ ] Backend deployed to Railway
- [ ] Environment variables set on Railway (all 4)
- [ ] MongoDB connection string is correct
- [ ] Frontend URL set on Railway
- [ ] Netlify has `VITE_API_URL` environment variable
- [ ] Netlify redeployed

After testing:
- [ ] Visit your Netlify app
- [ ] Open console (F12)
- [ ] Check: `📡 API Base: https://crowdlocal-production...`
- [ ] Try to sign up
- [ ] Should work! ✅

---

## 🆘 Troubleshooting

### Backend won't start
Check Railway logs:
1. Click your backend service
2. Go to **Logs** tab
3. Look for error messages
4. Common issues:
   - Missing environment variables
   - MongoDB connection string wrong
   - Port issue

### Still getting "Failed to fetch"
1. Verify backend URL is accessible in browser
2. Check Netlify environment variable is set
3. Redeploy Netlify (sometimes needs 2x)
4. Check browser console for exact error

### Backend URL shows but still fails
1. Make sure `FRONTEND_URL` is set on Railway
2. Make sure it matches your Netlify domain exactly
3. Restart the service in Railway

---

## 💡 MongoDB Setup (If Not Done Yet)

If you need to create MongoDB connection string:

1. Go to **mongodb.com/cloud/atlas**
2. Sign up or login
3. Create a free cluster
4. Get connection string
5. Use that as `MONGODB_URI` on Railway

---

## 🎉 Success Indicators

When everything works:
✅ Sign up form works
✅ Login works
✅ Dashboard loads
✅ Can create projects
✅ No "Failed to fetch" errors
✅ Projects save to database

---

**You're almost there! Deploy and set those env vars! 🚀**
