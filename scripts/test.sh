#!/usr/bin/env bash
set -euo pipefail

# ====================================
# Aria Amore - Test Suite
# ====================================
# Runs comprehensive tests on the website
# Usage: ./scripts/test.sh [--quick]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

QUICK_MODE=false
if [ "${1:-}" == "--quick" ]; then
    QUICK_MODE=true
fi

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

TESTS_PASSED=0
TESTS_FAILED=0

echo "🧪 Aria Amore - Test Suite"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Function to run a test
run_test() {
    local name="$1"
    local command="$2"
    
    echo -n "→ $name... "
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}PASS${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo -e "${RED}FAIL${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

# Test Suite 1: File Structure
echo -e "\n📁 Test Suite: File Structure"
run_test "Index page exists" "test -f $REPO_ROOT/public/index.html"
run_test "About page exists" "test -f $REPO_ROOT/public/about.html"
run_test "Services page exists" "test -f $REPO_ROOT/public/services.html"
run_test "Artists page exists" "test -f $REPO_ROOT/public/artists.html"
run_test ".htaccess exists" "test -f $REPO_ROOT/.htaccess"
run_test "sendmail.php exists" "test -f $REPO_ROOT/sendmail.php"
run_test "robots.txt exists" "test -f $REPO_ROOT/public/robots.txt"
run_test "sitemap.xml exists" "test -f $REPO_ROOT/public/sitemap.xml"

# Test Suite 2: Data Files
echo -e "\n📊 Test Suite: Data Files"
run_test "artists.json exists" "test -f $REPO_ROOT/data/artists.json"
run_test "services.json exists" "test -f $REPO_ROOT/data/services.json"
run_test "about.json exists" "test -f $REPO_ROOT/data/about.json"

if ! $QUICK_MODE; then
    # Validate JSON files if jq is available
    if command -v jq &> /dev/null; then
        run_test "artists.json is valid" "jq empty $REPO_ROOT/data/artists.json"
        run_test "services.json is valid" "jq empty $REPO_ROOT/data/services.json"
        run_test "about.json is valid" "jq empty $REPO_ROOT/data/about.json"
    fi
fi

# Test Suite 3: Assets
echo -e "\n🎨 Test Suite: Assets"
run_test "CSS directory exists" "test -d $REPO_ROOT/assets/css"
run_test "JS directory exists" "test -d $REPO_ROOT/assets/js"
run_test "Main CSS exists" "test -f $REPO_ROOT/assets/css/styles.css"
run_test "Main JS exists" "test -f $REPO_ROOT/assets/js/main.js"
run_test "Form validation JS exists" "test -f $REPO_ROOT/assets/js/form-validation.js"

# Test Suite 4: Security
echo -e "\n🔒 Test Suite: Security"
run_test ".env not in public" "! test -f $REPO_ROOT/public/.env"
run_test ".env.example exists" "test -f $REPO_ROOT/.env.example"
run_test "Security headers in .htaccess" "grep -q 'X-Frame-Options' $REPO_ROOT/.htaccess"
run_test "HTTPS redirect in .htaccess" "grep -q 'RewriteCond.*HTTPS.*off' $REPO_ROOT/.htaccess"
run_test "Directory listing disabled" "grep -q 'Options -Indexes' $REPO_ROOT/.htaccess"

if ! $QUICK_MODE; then
    # Check for sensitive patterns
    run_test "No hardcoded passwords" "! grep -r 'password.*=.*[\"\\'][^\"\\']\\{5,\\}' $REPO_ROOT --exclude-dir=.git --exclude-dir=node_modules --exclude=*.md 2>/dev/null | grep -v getenv | grep -q ."
fi

# Test Suite 5: Configuration
echo -e "\n⚙️  Test Suite: Configuration"
run_test "composer.json exists" "test -f $REPO_ROOT/composer.json"
run_test "package.json exists" "test -f $REPO_ROOT/package.json"
run_test "vendor/autoload.php exists" "test -f $REPO_ROOT/vendor/autoload.php"

# Test Suite 6: Scripts
echo -e "\n📜 Test Suite: Scripts"
run_test "backup.sh exists" "test -f $REPO_ROOT/scripts/backup.sh"
run_test "deploy.sh exists" "test -f $REPO_ROOT/scripts/deploy.sh"
run_test "health-check.sh exists" "test -f $REPO_ROOT/scripts/health-check.sh"
run_test "security-check.sh exists" "test -f $REPO_ROOT/scripts/security-check.sh"
run_test "setup-env.sh exists" "test -f $REPO_ROOT/scripts/setup-env.sh"
run_test "Scripts are executable" "test -x $REPO_ROOT/scripts/backup.sh"

# Test Suite 7: HTML Validation (Basic)
if ! $QUICK_MODE; then
    echo -e "\n🌐 Test Suite: HTML Validation"
    
    HTML_FILES=("index.html" "about.html" "services.html" "artists.html")
    for file in "${HTML_FILES[@]}"; do
        if [ -f "$REPO_ROOT/public/$file" ]; then
            run_test "$file has DOCTYPE" "grep -q '<!DOCTYPE' $REPO_ROOT/public/$file"
            run_test "$file has title tag" "grep -q '<title>' $REPO_ROOT/public/$file"
            run_test "$file has charset" "grep -q 'charset' $REPO_ROOT/public/$file"
        fi
    done
fi

# Test Suite 8: Email Configuration
echo -e "\n📧 Test Suite: Email Configuration"
run_test "sendmail.php uses env vars" "grep -q 'getenv' $REPO_ROOT/sendmail.php"
run_test "sendmail.php has validation" "grep -q 'FILTER_VALIDATE_EMAIL' $REPO_ROOT/sendmail.php"
run_test "sendmail.php has honeypot" "grep -q 'extra_info\|honeypot' $REPO_ROOT/sendmail.php"
run_test "sendmail.php sanitizes input" "grep -q 'htmlspecialchars' $REPO_ROOT/sendmail.php"

# Test Suite 9: Documentation
echo -e "\n📚 Test Suite: Documentation"
run_test "README.md exists" "test -f $REPO_ROOT/README.md"
run_test "docs directory exists" "test -d $REPO_ROOT/docs"

if [ -d "$REPO_ROOT/docs" ]; then
    run_test "DEPLOYMENT.md exists" "test -f $REPO_ROOT/docs/DEPLOYMENT.md"
    run_test "SECURITY.md exists" "test -f $REPO_ROOT/docs/SECURITY.md"
fi

# Test Suite 10: Build System
echo -e "\n🔨 Test Suite: Build System"
run_test "build.sh exists" "test -f $REPO_ROOT/scripts/build.sh"

if ! $QUICK_MODE; then
    # Try running a dry-run build
    if [ -f "$REPO_ROOT/scripts/build.sh" ]; then
        run_test "build.sh is executable" "test -x $REPO_ROOT/scripts/build.sh"
    fi
fi

# Summary
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "📊 Test Results:"
echo -e "   ${GREEN}Passed: $TESTS_PASSED${NC}"
if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "   ${RED}Failed: $TESTS_FAILED${NC}"
else
    echo -e "   ${GREEN}Failed: 0${NC}"
fi

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
PASS_RATE=$(( TESTS_PASSED * 100 / TOTAL_TESTS ))
echo -e "   Pass Rate: ${PASS_RATE}%"

echo ""
if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Review the output above.${NC}"
    exit 1
fi
