#!/bin/bash
# Verification Script - Run this to check if everything is working

echo "🔍 CrowdLocal System Health Check"
echo "=================================="
echo ""

# Check Node version
echo "✓ Node.js Version:"
node --version
echo ""

# Check if backend is running
echo "✓ Checking Backend Server (Port 5001)..."
if lsof -i :5001 > /dev/null 2>&1; then
  echo "  ✅ Backend is RUNNING"
  BACKEND_RUNNING=true
else
  echo "  ⚠️  Backend is NOT running"
  BACKEND_RUNNING=false
fi
echo ""

# Check if frontend is running
echo "✓ Checking Frontend Server (Port 5173)..."
if lsof -i :5173 > /dev/null 2>&1; then
  echo "  ✅ Frontend is RUNNING"
  FRONTEND_RUNNING=true
else
  echo "  ⚠️  Frontend is NOT running"
  FRONTEND_RUNNING=false
fi
echo ""

# Check MongoDB connection (if backend is running)
if [ "$BACKEND_RUNNING" = true ]; then
  echo "✓ Testing API Health Endpoint..."
  HEALTH=$(curl -s http://localhost:5001/api/health)
  if [[ $HEALTH == *"Server is running"* ]]; then
    echo "  ✅ Backend API is RESPONDING"
    echo "     Response: $HEALTH"
  else
    echo "  ⚠️  Backend API not responding properly"
    echo "     Response: $HEALTH"
  fi
  echo ""
fi

# Summary
echo "=================================="
echo "📊 Summary:"
echo "=================================="
if [ "$BACKEND_RUNNING" = true ] && [ "$FRONTEND_RUNNING" = true ]; then
  echo "✅ All systems operational!"
  echo ""
  echo "🌐 Access the app at: http://localhost:5173"
  echo "🔗 Backend API at: http://localhost:5001"
  echo "📱 Ready for testing!"
else
  echo "⚠️  Some services are not running."
  echo ""
  if [ "$BACKEND_RUNNING" = false ]; then
    echo "To start backend:"
    echo "  cd backend && npm run dev"
  fi
  if [ "$FRONTEND_RUNNING" = false ]; then
    echo "To start frontend:"
    echo "  npm run dev"
  fi
fi
echo ""
