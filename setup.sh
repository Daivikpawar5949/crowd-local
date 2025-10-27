#!/bin/bash

# CrowdLocal Quick Start Script
# This script sets up the development environment

echo "🚀 Starting CrowdLocal Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 14+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo "✅ npm $(npm --version) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "💡 The app will open automatically at http://localhost:5173"
echo ""
echo "📖 For more information, see README.md"
