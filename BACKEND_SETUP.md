# CrowdLocal Backend Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)

## Installation Steps

### 1. Install MongoDB Locally (macOS)
Using Homebrew:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

To verify MongoDB is running:
```bash
mongosh
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Start the Backend Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## MongoDB Setup

### Create Database & Collections
The database and collections are created automatically when you run the server.

Database name: `crowdlocal`
Collections:
- `users` - User accounts with hashed passwords
- `projects` - Crowdfunding projects

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Projects
- `GET /api/projects` - Get all active projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)
- `POST /api/projects/:id/fund` - Fund a project (requires auth)

## Example API Calls

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "AI Fashion Scanner",
    "tagline": "Smart outfit recommender",
    "description": "An AI app for fashion recommendations",
    "goal": 50000,
    "daysRemaining": 30,
    "category": "Tech"
  }'
```

## Environment Variables (.env)
```
MONGODB_URI=mongodb://localhost:27017/crowdlocal
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

## Troubleshooting

### MongoDB Connection Issues
1. Verify MongoDB is running: `brew services list`
2. Check connection string in `.env`
3. Ensure port 27017 is not blocked

### Port Already in Use
```bash
lsof -i :5000  # Find process on port 5000
kill -9 <PID>   # Kill the process
```

## Next Steps
- Integrate React frontend with these API endpoints
- Add payment processing
- Implement WebSocket for real-time updates
- Add email notifications
