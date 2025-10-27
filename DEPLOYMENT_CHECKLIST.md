# ✅ DEPLOYMENT CHECKLIST - "Failed to Fetch" Fix

## THE PROBLEM
Your frontend is on Netlify but backend is still local. When you try to sign up/login, the frontend can't reach the backend.

---

## THE SOLUTION: 3 STEPS

### ✅ STEP 1: Deploy Your Backend (REQUIRED FIRST!)

Pick ONE platform:

#### Option A: Railway.app (Recommended - Easiest)
```bash
# 1. Visit railway.app and sign up (can use GitHub)
# 2. In your project, install Railway CLI
npm install -g @railway/cli

# 3. Go to backend folder
cd backend

# 4. Login to Railway
railway login

# 5. Initialize and deploy
railway init
railway deploy
```

After deployment, you'll get a URL like: `https://crowd-local-production.railway.app`

#### Option B: Render.com
1. Go to https://render.com
2. Sign up (use GitHub)
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Fill in settings:
   - **Name**: `crowd-local-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Click "Advanced" and add environment variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
   - `FRONTEND_URL` = your Netlify URL
7. Deploy!

#### Option C: Heroku (Free tier ending, but still works)
```bash
npm install -g heroku
heroku login
cd backend
heroku create crowd-local-backend
heroku config:set MONGODB_URI="..." JWT_SECRET="..." FRONTEND_URL="..."
git push heroku main
```

**IMPORTANT:** Write down your backend URL!
```
Backend URL: https://________________________
```

---

### ✅ STEP 2: Set Netlify Environment Variable

1. Go to **netlify.com** → Sign in
2. Find your site (crowd-local)
3. Click **Site Settings** (or **Settings**)
4. Go to **Build & Deploy**
5. Click **Environment** (or **Environment Variables**)
6. Click **Add Environment Variable**
7. Fill in:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-name.railway.app` (paste your backend URL)
8. Click **Save** or **Add**

✅ **DONE!** Don't forget to save!

---

### ✅ STEP 3: Redeploy Frontend on Netlify

1. Go back to your site
2. Click **Deploys** tab
3. Click **Trigger Deploy** → **Deploy Site**
4. Watch the build progress (should take 2-3 minutes)
5. Once it says "Published", you're done!

---

## 🧪 TEST IT

1. Visit your Netlify site
2. Open Developer Console (F12)
3. Look for this in console:
   ```
   📡 API Base: https://your-backend-name.railway.app
   ```
4. Try to sign up
5. Should work! ✅

---

## ❌ IF STILL NOT WORKING

### Check #1: Is Backend Running?
Test your backend URL directly:
```
https://your-backend-name.railway.app
```
Should return something (not a 404 or timeout)

### Check #2: Is Env Var Set?
- Open browser console (F12)
- Look for: `📡 API Base: ...`
- If it says `http://localhost:5001`, the env var wasn't picked up!
- **Fix:** Redeploy again on Netlify (sometimes takes 2x)

### Check #3: Backend Environment Variables
Make sure your backend has:
```
MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/crowdlocal
JWT_SECRET = your-secret-key
NODE_ENV = production
FRONTEND_URL = https://your-netlify-site.netlify.app
```

### Check #4: CORS Configuration
Make sure `backend/server.js` has:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}))
```

---

## 🆘 ERROR MESSAGES & FIXES

| Error | Cause | Fix |
|-------|-------|-----|
| "Failed to fetch" | Backend not deployed | Deploy backend first |
| "Failed to fetch" | Wrong backend URL | Check env var is correct |
| "Failed to fetch" | Env var not set | Add to Netlify, redeploy |
| "cors error" | CORS not configured | Set FRONTEND_URL on backend |
| "Invalid token" | JWT_SECRET mismatch | Use same secret on both |
| Blank page, endless loading | Backend timeout | Check backend logs |

---

## 📋 FINAL CHECKLIST

Before testing:
- [ ] Backend is deployed to Railway/Render/Heroku
- [ ] I have the backend URL written down
- [ ] Backend URL works when I visit it
- [ ] Netlify has `VITE_API_URL` environment variable
- [ ] Netlify env var contains correct backend URL
- [ ] Netlify has been redeployed (Trigger Deploy)
- [ ] Redeployment is complete (says "Published")

After testing:
- [ ] Console shows correct API Base URL
- [ ] Sign up form works
- [ ] Can create projects
- [ ] Backend logs show requests coming through

---

## 🎉 SUCCESS!

When it's working, you'll see:
1. ✅ Console shows: `📡 API Base: https://your-backend...`
2. ✅ Sign up completes
3. ✅ Dashboard loads
4. ✅ Can create projects
5. ✅ No more "Failed to fetch" errors

---

## 📞 NEED HELP?

If you're still stuck:
1. Read [DEBUG_FETCH_ERROR.md](./DEBUG_FETCH_ERROR.md)
2. Check browser console (F12) for exact error
3. Check backend logs on Railway/Render
4. Verify all environment variables are set

**You've got this! 🚀**
