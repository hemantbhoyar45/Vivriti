#!/bin/bash
# Start the KARTA frontend development server

set -e

# Get the frontend directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo "============================================================"
echo "Starting KARTA Frontend (React + Vite)"
echo "============================================================"
echo "Frontend directory: $FRONTEND_DIR"
echo "Dev server will be available at: http://localhost:5173"
echo "Backend API proxy: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "$FRONTEND_DIR"
npm run dev
