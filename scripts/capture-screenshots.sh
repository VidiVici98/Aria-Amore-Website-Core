#!/usr/bin/env bash
set -euo pipefail

# ================================
# Screenshot Capture Script
# ================================
# Ensures PHP server is running and captures screenshots of all pages
# Usage: ./scripts/capture-screenshots.sh

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVER_PORT=8000
SERVER_URL="http://localhost:$SERVER_PORT"

echo "📸 Aria Amore Screenshot Capture"
echo "================================"

# -------------------------------
# 1. Check if server is running
# -------------------------------
echo "→ Checking server status..."

if curl -s -o /dev/null -w "%{http_code}" "$SERVER_URL/index.html" | grep -q "200"; then
  echo "✓ Server is already running on port $SERVER_PORT"
  SERVER_WAS_RUNNING=1
else
  echo "→ Starting PHP development server..."
  cd "$REPO_ROOT"
  php -S localhost:$SERVER_PORT -t public > /tmp/php-screenshot-server.log 2>&1 &
  SERVER_PID=$!
  SERVER_WAS_RUNNING=0
  
  # Wait for server to start
  echo "→ Waiting for server to start..."
  sleep 3
  
  # Verify server started
  if curl -s -o /dev/null -w "%{http_code}" "$SERVER_URL/index.html" | grep -q "200"; then
    echo "✓ Server started successfully (PID: $SERVER_PID)"
  else
    echo "❌ ERROR: Server failed to start"
    cat /tmp/php-screenshot-server.log
    exit 1
  fi
fi

# -------------------------------
# 2. Verify symlinks and assets
# -------------------------------
echo "→ Verifying assets are accessible..."

ASSET_CHECK=$(curl -s -o /dev/null -w "%{http_code}" "$SERVER_URL/assets/css/styles.css")
if [ "$ASSET_CHECK" != "200" ]; then
  echo "❌ ERROR: Assets not accessible (HTTP $ASSET_CHECK)"
  echo "   Check that public/assets symlink exists and points to ../assets"
  [ "$SERVER_WAS_RUNNING" -eq 0 ] && kill $SERVER_PID
  exit 1
fi

echo "✓ Assets loading correctly"

# -------------------------------
# 3. Information for user
# -------------------------------
echo ""
echo "📋 Server Information:"
echo "   URL: $SERVER_URL"
echo "   Document Root: $REPO_ROOT/public"
echo "   Symlinks: assets, components, data"
echo ""
echo "✅ Server ready for screenshot capture!"
echo ""
echo "📸 To capture screenshots with Playwright:"
echo "   1. Navigate to: $SERVER_URL/index.html"
echo "   2. Wait for page load (2-3 seconds)"
echo "   3. Take viewport screenshot (not full-page)"
echo "   4. Repeat for all pages"
echo ""
echo "📄 Pages to capture:"
echo "   - index.html (homepage)"
echo "   - about.html"
echo "   - services.html"
echo "   - artists.html"
echo "   - repertoire.html"
echo "   - events.html"
echo "   - gallery.html"
echo "   - contact.html"
echo "   - privacy-policy.html"
echo "   - terms-of-service.html"
echo ""

# -------------------------------
# 4. Keep server running
# -------------------------------
if [ "$SERVER_WAS_RUNNING" -eq 0 ]; then
  echo "⚠️  Server is running in background (PID: $SERVER_PID)"
  echo "   Stop it with: kill $SERVER_PID"
  echo "   Or it will be stopped when this terminal session ends"
  echo ""
  echo "Press Ctrl+C to stop the server and exit"
  
  # Trap to clean up on exit
  trap "echo ''; echo '→ Stopping server...'; kill $SERVER_PID 2>/dev/null; echo '✓ Server stopped'; exit 0" INT TERM
  
  # Keep script running
  wait $SERVER_PID
fi
