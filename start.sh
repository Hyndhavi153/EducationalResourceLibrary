#!/bin/bash
# Quick Start Script for Educational Resource Library

echo "🚀 Educational Resource Library - Quick Start"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
    echo ""
    echo "🎯 Starting development server..."
    echo "📱 The application will open at http://localhost:3000"
    echo ""
    echo "📝 Demo Credentials:"
    echo "   Admin: admin@example.com / admin123"
    echo "   Student: student@example.com / student123"
    echo ""
    npm run dev
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
