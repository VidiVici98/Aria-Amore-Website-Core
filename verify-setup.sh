#!/bin/bash

echo "=========================================="
echo "Aria Amore Development Setup Verification"
echo "=========================================="

# Check if npm packages are installed
echo ""
echo "1. Checking npm dependencies..."
if [ -d "node_modules" ] && [ -f "node_modules/.bin/http-server" ]; then
    echo "✓ npm dependencies installed"
else
    echo "✗ npm dependencies missing"
    exit 1
fi

# Check if http-server is running
echo ""
echo "2. Checking if development server is running..."
if netstat -tulpn 2>/dev/null | grep -q ":8000"; then
    echo "✓ Server running on port 8000"
    SERVER_PID=$(lsof -t -i :8000 2>/dev/null || echo "")
    if [ -n "$SERVER_PID" ]; then
        echo "  Process ID: $SERVER_PID"
    fi
else
    echo "✗ Server not running on port 8000"
    echo "  To start: npm start"
    exit 1
fi

# Check key files exist
echo ""
echo "3. Checking critical files..."
FILES_TO_CHECK=(
    "public/index.html"
    "public/assets/css/styles.css"
    "public/assets/js/main.js"
    ".vscode/settings.json"
)

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ $file missing"
    fi
done

# Check if curtain animation code exists
echo ""
echo "4. Checking curtain animation code..."
if grep -q "curtain-wrapper" public/assets/js/main.js && \
   grep -q "curtain.classList.add" public/assets/js/main.js && \
   grep -q "requestAnimationFrame" public/assets/js/main.js; then
    echo "✓ Curtain animation code present"
else
    echo "✗ Curtain animation code missing or incomplete"
fi

# Check if CSS has curtain styles
if grep -q "\.curtain-wrapper" public/assets/css/styles.css && \
   grep -q "\.curtain.left" public/assets/css/styles.css; then
    echo "✓ Curtain CSS styles present"
else
    echo "✗ Curtain CSS styles missing"
fi

# Test build process
echo ""
echo "5. Testing build script..."
if ./scripts/build.sh > /dev/null 2>&1; then
    echo "✓ Build script successful"
    if [ -d "build" ]; then
        echo "✓ Build directory created at: build/"
        BUILD_FILES=$(find build -type f | wc -l)
        echo "  Total files in build: $BUILD_FILES"
    fi
else
    echo "✗ Build script failed"
fi

# Test a simple curl to verify HTML is being served
echo ""
echo "6. Testing HTTP requests..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/index.html 2>/dev/null || echo "000")
if [ "$RESPONSE" == "200" ]; then
    echo "✓ index.html responds with HTTP 200"
else
    echo "✗ index.html responded with HTTP $RESPONSE"
fi

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/about.html 2>/dev/null || echo "000")
if [ "$RESPONSE" == "200" ]; then
    echo "✓ about.html responds with HTTP 200"
else
    echo "✗ about.html responded with HTTP $RESPONSE"
fi

echo ""
echo "=========================================="
echo "Setup Verification Complete!"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Open http://localhost:8000 in your browser"
echo "2. You should see the curtain animation on page load"
echo "3. The animation should NOT appear static/frozen"
echo "4. You can navigate between pages and see the animation again"
echo ""
echo "For Live Server in VS Code:"
echo "1. Right-click any HTML file in public/ folder"
echo "2. Select 'Open with Live Server'"
echo "3. Or click 'Go Live' button in status bar"
