# 🔍 Debugging "Failed to Fetch"

## Step 1: Check What API URL Your Frontend Is Using

Open your browser's Developer Console (F12) and look for:
```
📡 API Base: https://...
📡 Environment: production
```

If you see `http://localhost:5001`, that means the environment variable wasn't set on Netlify!

---

## Step 2: Verify Backend is Deployed and Running

Open your browser and test directly:
```
https://your-backend-url.railway.app
```

You should see the homepage or a response. If you get a blank page or error, the backend isn't deployed yet.

---

## Step 3: Check Netlify Environment Variables

1. Go to **netlify.com** → Your site
2. Click **Site Settings**
3. Go to **Build & Deploy** → **Environment**
4. Make sure you see:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-name.railway.app` (not localhost!)

If it's missing or says localhost, that's the problem!

---

## Step 4: Force Rebuild on Netlify

After adding/changing the env var:

1. Go to **Deploys** tab
2. Click **Trigger Deploy** → **Deploy Site**
3. Wait for build to finish
4. Refresh your app

---

## Step 5: Common Issues & Fixes

### Issue: "Failed to fetch" on signup
**Cause:** Backend not deployed or unreachable
**Fix:** Deploy backend first, then add URL to Netlify

### Issue: Env var shows in Netlify but not used
**Cause:** Build cache
**Fix:** Clear cache: Click **Trigger Deploy** → **Deploy Site** (fresh rebuild)

### Issue: Backend URL works but still fails
**Cause:** CORS issue
**Fix:** Make sure your backend has:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}))
```

### Issue: See "http://localhost:5001" in console
**Cause:** Environment variable not set
**Fix:** Add to Netlify → Redeploy → Check console again

---

## 🧪 Test Command

In browser console (F12), type:
```javascript
const apiUrl = 'https://your-backend-url.railway.app';
fetch(`${apiUrl}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test123' })
}).then(r => r.json()).then(d => console.log('Response:', d))
```

This will show you exactly what error your backend returns!

---

## 📋 Pre-Deployment Checklist

- [ ] Backend deployed to Railway/Render/Heroku
- [ ] Backend URL is accessible in browser
- [ ] Netlify has `VITE_API_URL` environment variable set
- [ ] Netlify env var contains correct backend URL (not localhost)
- [ ] Netlify site was redeployed after setting env var
- [ ] Backend has CORS enabled
- [ ] Backend has `FRONTEND_URL` environment variable set

---

## 🎯 What Should Happen

1. You visit your Netlify app
2. Console shows: `📡 API Base: https://your-backend-url...`
3. You click Sign Up
4. App talks to backend
5. Success! ✅

---

**Still stuck?** Share the exact error message from the browser console!
