#!/bin/bash

# CrowdLocal - Quick Start Script
# Starts both frontend and backend servers

echo "🚀 CrowdLocal Quick Start"
echo "========================"
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Function to start backend
start_backend() {
    echo "🔧 Starting Backend Server..."
    echo "   - MongoDB connection: localhost:27017/crowdlocal"
    echo "   - API endpoint: http://localhost:5001"
    echo ""
    cd backend
    npm run dev
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting Frontend Server..."
    echo "   - Dev server: http://localhost:5173"
    echo ""
    npm run dev
}

# Start backend in background
start_backend &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
start_frontend

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
