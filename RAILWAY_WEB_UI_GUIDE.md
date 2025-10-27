# 🎯 QUICK: Deploy Backend to Railway (Web UI Method)

Since Railway CLI can be finicky, let's use the web UI directly!

---

## ✅ STEP 1: Go to Your Railway Project

URL: https://railway.com/project/ebd5a039-c331-402f-9f9a-f917927a0045

---

## ✅ STEP 2: Add a Service

1. In Railway dashboard, click **+ New**
2. Choose **GitHub Repo**
3. Search for: `crowd-local`
4. Click on it to select
5. Railway will auto-detect backend folder
6. Click **Deploy**

**Wait 3-5 minutes for build to complete...**

---

## ✅ STEP 3: Get Your Backend URL

After deployment:
1. Click on the `backend` service
2. Go to **Settings** tab
3. Look for **Domains** or **URL**
4. You'll see: `https://crowdlocal-production-xxxx.railway.app`

**Copy this URL!**

---

## ✅ STEP 4: Add Environment Variables

1. Still in Railway backend service
2. Click **Variables** tab
3. Add each of these:

```
Name: MONGODB_URI
Value: mongodb+srv://your-user:your-password@cluster.mongodb.net/crowdlocal
```

```
Name: JWT_SECRET
Value: your-super-secret-key-xyz-123
```

```
Name: NODE_ENV
Value: production
```

```
Name: FRONTEND_URL
Value: https://your-netlify-site.netlify.app
```

(Replace the values with your actual credentials!)

4. Click **Save** or **Add** for each one
5. **Redeploy** (Railway may auto-redeploy)

---

## ✅ STEP 5: Tell Netlify About Your Backend

1. Go to **netlify.com** → Your site → **Settings**
2. **Build & Deploy** → **Environment**
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://crowdlocal-production-xxxx.railway.app`
4. **Save**

---

## ✅ STEP 6: Redeploy Frontend

1. Go to Netlify **Deploys**
2. Click **Trigger Deploy** → **Deploy Site**
3. Wait for build (1-2 min)

---

## 🧪 TEST IT

1. Visit your Netlify URL
2. Open console (F12)
3. Look for: `📡 API Base: https://crowdlocal-production...`
4. Try signing up
5. Should work! ✅

---

## 📱 MongoDB Connection String

If you don't have one yet:

1. Go to **mongodb.com/cloud/atlas**
2. Sign up (free tier available)
3. Create a cluster
4. Click **Connect**
5. Choose **Drivers**
6. Copy the connection string
7. Replace `<password>` with your password
8. Use as `MONGODB_URI` on Railway

Example format:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/crowdlocal?retryWrites=true&w=majority
```

---

**That's it! Your app will be live! 🚀**
