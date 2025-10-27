# 🔧 Fix "Failed to Fetch" Error on Netlify

## The Problem

Your frontend is deployed on Netlify but the backend isn't deployed yet. When users try to sign up/login, the app can't reach your backend API.

---

## ✅ The Solution

### Step 1: Deploy Your Backend

You **must** deploy your backend first! Choose one:

#### Option A: Railway (Easiest) ⭐
```bash
# 1. Sign up at railway.app
# 2. Install Railway CLI
npm install -g @railway/cli

# 3. Login
railway login

# 4. Deploy backend
cd backend
railway init
railway deploy
```

#### Option B: Render.com
```bash
# 1. Sign up at render.com
# 2. Connect GitHub repo
# 3. Create new Web Service
# 4. Select backend folder
# 5. Build command: npm install
# 6. Start command: node server.js
```

#### Option C: Heroku
```bash
npm install -g heroku
heroku login
cd backend
heroku create your-app-name
git push heroku main
```

---

### Step 2: Get Your Backend URL

After deployment, you'll get a URL like:
```
https://your-backend-name.railway.app
or
https://your-backend-name.onrender.com
```

---

### Step 3: Add Environment Variable to Netlify

1. Go to **netlify.com** → Your site
2. Click **Site Settings** → **Build & Deploy** → **Environment**
3. Add new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-name.railway.app`
4. Click **Save**

---

### Step 4: Redeploy Frontend

1. Go back to **Deploys**
2. Click **Trigger Deploy** → **Deploy Site**
3. Wait for build to complete

---

### Step 5: Verify Backend Environment Variables

Make sure your backend has these environment variables set:

```
MONGODB_URI = your-mongodb-connection-string
JWT_SECRET = your-secret-key
NODE_ENV = production
FRONTEND_URL = https://your-netlify-site.netlify.app
```

**On Railway:** Settings → Variables  
**On Render:** Environment tab  
**On Heroku:** Settings → Config Vars

---

## 🧪 Test It

1. Visit your Netlify site
2. Sign up with test email
3. Should work now! ✅

---

## 🚨 Still Getting "Failed to Fetch"?

### Check Browser Console (F12)
Look for detailed error messages

### Check Your Backend URL
```bash
curl https://your-backend-name.railway.app/api/health
```
Should return `200 OK`

### Check CORS
Your backend should have CORS enabled for your Netlify domain:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}))
```

### Check Netlify Build Logs
1. Go to **Deploys**
2. Click latest deploy
3. Scroll to **Build log**
4. Look for errors

---

## 📋 Quick Checklist

- [ ] Backend deployed to Railway/Render/Heroku
- [ ] Backend URL working (test in browser)
- [ ] Netlify env var `VITE_API_URL` set
- [ ] Netlify redeployed after env change
- [ ] MongoDB connection string set on backend
- [ ] JWT_SECRET set on backend
- [ ] FRONTEND_URL set on backend
- [ ] CORS enabled on backend for your domain

---

## 💡 Pro Tips

**Tip 1:** Your backend needs to be publicly accessible
```bash
# Test if backend is reachable
curl https://your-backend-name.railway.app
```

**Tip 2:** Environment variables take effect after rebuild
- Change var on Netlify → Click "Trigger Deploy"
- Change var on Railway → Redeploy service

**Tip 3:** Check logs to debug
- Netlify: Deploy logs
- Railway: Logs tab
- Render: Logs tab

---

## 🆘 Need Help?

Common issues:

1. **"Connection refused"** = Backend not running
2. **"CORS error"** = FRONTEND_URL not set correctly on backend
3. **"Invalid token"** = JWT_SECRET mismatch between frontend & backend
4. **"MongoDB error"** = MONGODB_URI incorrect

Check backend logs to see exact error!

---

**Next Step:** Deploy your backend, set env var, redeploy frontend. Your app will work! 🚀
