# Backend Setup & Database Connection Guide

## 🗄️ System Architecture

```
Frontend (Vite React)          Backend (Express.js)        Database (MongoDB)
Port: 5173        ←→        Port: 5001          ←→        Local or Cloud
Sign Up/Sign In                Auth Routes                 User Collection
API Requests                   Password Hashing
JWT Tokens                      JWT Auth
localStorage
```

---

## 📋 Prerequisites

Before starting, ensure you have:

1. **Node.js** (v14+) - [Download](https://nodejs.org/)
2. **MongoDB** - Option A or B:
   - **Option A:** MongoDB Community (local) - [Download](https://www.mongodb.com/try/download/community)
   - **Option B:** MongoDB Atlas (Cloud) - [Create Free Account](https://www.mongodb.com/cloud/atlas)
3. **Git** (already installed on macOS)

---

## 🚀 Option 1: MongoDB Local Installation

### Step 1: Install MongoDB Community Edition (macOS)

Using Homebrew:
```bash
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
mongosh
```

If successful, you'll see:
```
Current Mongosh Log ID: 6xxx
Connecting to:          mongodb://127.0.0.1:27017
```

Exit with `exit` or `Ctrl+C`.

### Step 2: Backend Environment Setup

```bash
# Navigate to backend folder
cd /Users/daivikpawar/crowd--local/backend

# Check .env file (already created)
cat .env
```

The `.env` should contain:
```properties
MONGODB_URI=mongodb://localhost:27017/crowdlocal
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5001
NODE_ENV=development
```

### Step 3: Install Backend Dependencies

```bash
# In /backend folder
npm install
```

Expected dependencies:
- express (server framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT tokens)
- cors (cross-origin requests)
- dotenv (environment variables)
- nodemon (auto-reload for development)

### Step 4: Start Backend Server

```bash
# In /backend folder
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5001
✅ MongoDB connected successfully
```

---

## ☁️ Option 2: MongoDB Atlas (Cloud)

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Start Free"
3. Create account with Google or email

### Step 2: Create a Cluster

1. Click "Create" under "Database"
2. Select "Shared" (Free tier)
3. Choose region closest to you
4. Click "Create Cluster"
5. Wait 5-10 minutes for cluster to deploy

### Step 3: Create Database User

1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Enter username: `crowdlocal`
4. Set password: (use strong password)
5. Click "Add User"

### Step 4: Get Connection String

1. Go to "Deployment" → "Database"
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Copy the connection string
5. Replace `<password>` with your user password

Should look like:
```
mongodb+srv://crowdlocal:PASSWORD@cluster0.xxxxx.mongodb.net/crowdlocal?retryWrites=true&w=majority
```

### Step 5: Update .env

```bash
# In /backend/.env
# Replace MONGODB_URI with your connection string:
MONGODB_URI=mongodb+srv://crowdlocal:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/crowdlocal?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5001
NODE_ENV=development
```

### Step 6: Start Backend

```bash
cd /Users/daivikpawar/crowd--local/backend
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5001
✅ MongoDB connected successfully
```

---

## 🎯 Running Both Frontend & Backend

### Terminal 1 - Backend Server

```bash
cd /Users/daivikpawar/crowd--local/backend
npm run dev
# Runs on http://localhost:5001
```

### Terminal 2 - Frontend Server

```bash
cd /Users/daivikpawar/crowd--local
npm run dev
# Runs on http://localhost:5173
```

---

## 🧪 Testing the Authentication Flow

### 1. Open Frontend
- Visit **http://localhost:5173/**

### 2. Create New Account (Sign Up)

Fill in the form:
- **Name:** John Doe
- **Email:** john@example.com
- **Password:** password123
- **Confirm:** password123

On success:
- ✅ Confetti animation displays
- ✅ User created in MongoDB
- ✅ JWT token generated
- ✅ Token stored in localStorage
- ✅ Redirected to Dashboard

### 3. Check Database (MongoDB Compass)

To verify user was created:

**For Local MongoDB:**
```bash
mongosh
use crowdlocal
db.users.find()
```

You should see:
```javascript
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$...",  // hashed password (not readable)
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

**For MongoDB Atlas:**
- Open MongoDB Compass
- Connect with your Atlas connection string
- Navigate to `crowdlocal` database → `users` collection

### 4. Sign Out & Sign In

- Click "Logout" button
- Try signing in with same email/password
- ✅ Login should succeed
- ✅ JWT token renewed
- ✅ Dashboard loads with user info

---

## 🔑 API Endpoints

All requests go to `http://localhost:5001/api/auth`

### Sign Up (Create Account)

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Account created successfully",
  "token": "eyJhbGc...",
  "user": {
    "_id": "6xxx",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Sign In (Login)

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "_id": "6xxx",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get Current User (Protected)

```bash
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "_id": "6xxx",
  "name": "John Doe",
  "email": "john@example.com",
  "createdProjects": [],
  "fundedProjects": []
}
```

---

## 📊 Project Structure

```
backend/
├── server.js              # Express server setup
├── db.js                  # MongoDB connection
├── .env                   # Environment variables
├── package.json           # Dependencies
├── models/
│   ├── User.js           # User schema & password hashing
│   └── Project.js        # Project schema (for future)
├── routes/
│   ├── auth.js           # Sign up, login, get user
│   └── projects.js       # Project routes (for future)
└── middleware/
    └── auth.js           # JWT verification middleware
```

---

## 🔐 Security Features

1. **Password Hashing:** bcryptjs with salt rounds = 10
2. **JWT Tokens:** Expire in 7 days
3. **CORS Protection:** Whitelist allowed origins
4. **MongoDB Validation:** Email unique index
5. **Error Handling:** No password in response

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
- Local: Make sure MongoDB is running: `brew services start mongodb-community`
- Atlas: Check connection string in `.env`
- Firewall: Allow connections through firewall

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5001`

**Solution:**
```bash
# Kill process on port 5001
lsof -ti:5001 | xargs kill -9
npm run dev
```

### JWT Token Errors

**Problem:** `Invalid or expired token`

**Solution:**
- Clear localStorage: Open DevTools → Application → localStorage → Clear All
- Sign out and sign back in
- Token expires in 7 days - create new account or wait

### CORS Errors

**Problem:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Verify frontend is on `http://localhost:5173`
- Check server.js has port 5173 in CORS origin list
- Restart backend server after CORS changes

---

## 📚 Frontend Integration

The frontend (`src/App.jsx`) automatically:

1. Calls `/api/auth/signup` with name, email, password
2. Calls `/api/auth/login` with email, password
3. Stores JWT token in localStorage
4. Sends token in Authorization header for protected routes
5. Persists login state across page refreshes
6. Auto-loads dashboard if token exists

---

## ✅ Checklist

- [ ] MongoDB installed or Atlas account created
- [ ] Backend `.env` configured
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend server running on port 5001
- [ ] Frontend running on port 5173
- [ ] Can create new account
- [ ] Can sign in with created account
- [ ] User data visible in database
- [ ] Dashboard displays user name
- [ ] Logout button works
- [ ] Returning to app shows dashboard (persisted login)

---

## 🚀 Next Steps

Once authentication is working:

1. **Add Profile Page:** Display user data and settings
2. **Create Projects:** Build project creation form
3. **Funding System:** Implement project funding logic
4. **User Search:** Search for other users/projects
5. **Comments:** Add discussion/comments on projects
6. **Notifications:** Real-time updates on project activity

---

## 📞 Support

If you encounter issues:

1. Check terminal output for error messages
2. Verify all ports are correct (5173 frontend, 5001 backend)
3. Ensure MongoDB is running
4. Check `.env` file configuration
5. Clear browser cache and localStorage
6. Restart both servers

---

**Status:** ✅ Ready to Connect!

Everything is set up and ready to use. Follow the steps above and you'll have a fully functional authentication system with database persistence! 🎉
