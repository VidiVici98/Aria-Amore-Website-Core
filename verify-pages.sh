#!/bin/bash

echo "=================================================="
echo "  Aria Amore - Page Verification Report"
echo "=================================================="

PAGES=(
  "index.html"
  "about.html"
  "artists.html"
  "contact.html"
  "events.html"
  "gallery.html"
  "repertoire.html"
  "services.html"
)

echo ""
echo "Checking all pages for required components..."
echo ""

for page in "${PAGES[@]}"; do
  echo "Testing: $page"
  
  # Check HTTP status
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/$page 2>/dev/null)
  
  if [ "$STATUS" != "200" ]; then
    echo "  ✗ HTTP $STATUS (should be 200)"
    continue
  fi
  
  # Check for components
  CONTENT=$(curl -s http://localhost:8000/$page 2>/dev/null)
  
  HEADER=$(echo "$CONTENT" | grep -c "site-header-container")
  FOOTER=$(echo "$CONTENT" | grep -c "site-footer-container")
  CURTAIN=$(echo "$CONTENT" | grep -c "curtain-wrapper")
  EVENT_BANNER=$(echo "$CONTENT" | grep -c "event-banner-container")
  
  # Report results
  printf "  ✅ HTTP $STATUS"
  [ "$HEADER" -eq 1 ] && printf " | Header✓" || printf " | Header✗"
  [ "$FOOTER" -eq 1 ] && printf " | Footer✓" || printf " | Footer✗"
  [ "$EVENT_BANNER" -eq 1 ] && printf " | Banner✓" || printf " | Banner✗"
  [ "$CURTAIN" -eq 1 ] && printf " | Curtain✓" || printf " | Curtain✗"
  echo ""
done

echo ""
echo "=================================================="
echo "  Navigation System Check"
echo "=================================================="
echo ""

echo "Checking main.js for navigation code..."
if grep -q "Skip external links" /home/jon/Aria-Amore-Website-Core/public/assets/js/main.js; then
  echo "✓ Enhanced navigation handler found"
else
  echo "✗ Navigation handler missing"
fi

if grep -q "\.html" /home/jon/Aria-Amore-Website-Core/public/assets/js/main.js; then
  echo "✓ .html extension handling found"
else
  echo "✗ .html extension handling missing"
fi

if grep -q "startsWith.*http" /home/jon/Aria-Amore-Website-Core/public/assets/js/main.js; then
  echo "✓ External link detection found"
else
  echo "✗ External link detection missing"
fi

echo ""
echo "=================================================="
echo "  Development Environment Status"
echo "=================================================="
echo ""

if lsof -i :8000 > /dev/null 2>&1; then
  echo "✓ Server running on port 8000"
  PID=$(lsof -t -i :8000)
  echo "  Process: $PID (http-server)"
else
  echo "✗ Server NOT running"
fi

echo ""
echo "=================================================="
echo "Done! All pages should now have:"
echo "  • Header and footer components"
echo "  • Curtain animation"
echo "  • Event banner"
echo "  • Working navigation"
echo "=================================================="
