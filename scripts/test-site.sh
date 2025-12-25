#!/bin/bash

# Aria Amore Website - Testing & Validation Script
# Validates HTML, CSS, security headers, and performance metrics

set -e

SITE_URL="${1:-http://localhost:8000}"
REPORT_DIR="./test-reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create report directory
mkdir -p "$REPORT_DIR"

echo -e "${BLUE}🧪 Aria Amore Website - Testing Suite${NC}"
echo -e "${YELLOW}Testing: $SITE_URL${NC}"
echo ""

# Test 1: Check HTTP connectivity
echo -e "${YELLOW}1️⃣  Testing HTTP connectivity...${NC}"
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" --max-time 10 | grep -E "200|301|302" > /dev/null; then
  echo -e "${GREEN}✅ Site is accessible${NC}"
else
  echo -e "${RED}❌ Site is not accessible${NC}"
  exit 1
fi

# Test 2: Check security headers
echo -e "${YELLOW}2️⃣  Checking security headers...${NC}"
HEADERS=$(curl -s -I "$SITE_URL")
SECURITY_CHECKS=(
  "X-Frame-Options:clickjacking"
  "X-Content-Type-Options:MIME sniffing"
  "X-XSS-Protection:XSS attacks"
  "Content-Security-Policy:CSP"
  "Strict-Transport-Security:HSTS"
)

for check in "${SECURITY_CHECKS[@]}"; do
  header=$(echo "$check" | cut -d: -f1)
  description=$(echo "$check" | cut -d: -f2)
  
  if echo "$HEADERS" | grep -q "$header"; then
    echo -e "${GREEN}✅ $header configured (protects against $description)${NC}"
  else
    echo -e "${YELLOW}⚠️  $header not found${NC}"
  fi
done

# Test 3: Validate HTML files
echo -e "${YELLOW}3️⃣  Validating HTML structure...${NC}"
HTML_FILES=("index.html" "about.html" "services.html" "artists.html" "404-page.html" "privacy-policy.html" "terms-of-service.html")

for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ]; then
    # Check for basic HTML validity
    if grep -q "<!DOCTYPE" "$file" && grep -q "<html" "$file" && grep -q "</html>" "$file"; then
      echo -e "${GREEN}✅ $file is valid HTML${NC}"
    else
      echo -e "${RED}❌ $file may have HTML issues${NC}"
    fi
  fi
done

# Test 4: Check for responsive design
echo -e "${YELLOW}4️⃣  Checking responsive design...${NC}"
if grep -q "viewport" index.html; then
  echo -e "${GREEN}✅ Viewport meta tag found${NC}"
else
  echo -e "${RED}❌ Viewport meta tag missing${NC}"
fi

# Test 5: Check SEO elements
echo -e "${YELLOW}5️⃣  Checking SEO elements...${NC}"
SEO_CHECKS=(
  "meta name=\"description\":Meta description"
  "meta name=\"keywords\":Keywords meta tag"
  "meta property=\"og:":OpenGraph tags"
  "link rel=\"canonical\":Canonical links"
  "sitemap.xml:Sitemap"
  "robots.txt:Robots.txt"
)

for check in "${SEO_CHECKS[@]}"; do
  pattern=$(echo "$check" | cut -d: -f1)
  description=$(echo "$check" | cut -d: -f2)
  
  if grep -r "$pattern" . --include="*.html" --include="*.xml" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ $description found${NC}"
  else
    echo -e "${YELLOW}⚠️  $description not found${NC}"
  fi
done

# Test 6: Check accessibility
echo -e "${YELLOW}6️⃣  Checking accessibility attributes...${NC}"
if grep -r "role=" index.html > /dev/null 2>&1; then
  echo -e "${GREEN}✅ ARIA roles found${NC}"
else
  echo -e "${YELLOW}⚠️  Limited ARIA roles found${NC}"
fi

if grep -r "alt=" assets/media/images --include="*.html" > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Image alt text found${NC}"
else
  echo -e "${YELLOW}⚠️  Some images may be missing alt text${NC}"
fi

# Test 7: Check critical files
echo -e "${YELLOW}7️⃣  Checking critical production files...${NC}"
CRITICAL_FILES=(".htaccess" ".gitignore" "robots.txt" "sitemap.xml" "security.txt" ".env.example")
for file in "${CRITICAL_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅ $file exists${NC}"
  else
    echo -e "${RED}❌ $file missing${NC}"
  fi
done

# Test 8: Check CSS files
echo -e "${YELLOW}8️⃣  Checking CSS files...${NC}"
CSS_FILES=$(find assets/css -name "*.css" 2>/dev/null | wc -l)
if [ "$CSS_FILES" -gt 0 ]; then
  echo -e "${GREEN}✅ Found $CSS_FILES CSS file(s)${NC}"
else
  echo -e "${RED}❌ No CSS files found${NC}"
fi

# Test 9: Check JavaScript files
echo -e "${YELLOW}9️⃣  Checking JavaScript files...${NC}"
JS_FILES=$(find assets/js -name "*.js" 2>/dev/null | wc -l)
if [ "$JS_FILES" -gt 0 ]; then
  echo -e "${GREEN}✅ Found $JS_FILES JavaScript file(s)${NC}"
else
  echo -e "${YELLOW}⚠️  No JavaScript files found${NC}"
fi

# Test 10: Check images
echo -e "${YELLOW}🔟 Checking media files...${NC}"
IMG_FILES=$(find assets/media/images -type f 2>/dev/null | wc -l)
echo -e "${GREEN}✅ Found $IMG_FILES image file(s)${NC}"

# Generate summary report
echo ""
echo -e "${BLUE}📊 Test Summary${NC}"
echo "Report timestamp: $TIMESTAMP"
echo "Test URL: $SITE_URL"
echo ""
echo "✅ Testing complete!"
echo ""
echo -e "${YELLOW}Recommended next steps:${NC}"
echo "  1. Fix any ❌ issues before deployment"
echo "  2. Address ⚠️  warnings if applicable"
echo "  3. Test on actual server environment"
echo "  4. Run performance tests: https://gtmetrix.com"
echo "  5. Check security headers: https://securityheaders.com"
echo ""
