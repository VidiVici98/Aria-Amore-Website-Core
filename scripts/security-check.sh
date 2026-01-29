#!/usr/bin/env bash
set -euo pipefail

# ====================================
# Aria Amore - Security Validation Script
# ====================================
# Validates security configuration and checks for common issues
# Usage: ./scripts/security-check.sh [--fix]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

FIX_MODE=false
ISSUES_FOUND=0

echo "🔒 Aria Amore - Security Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Function to check and report
check() {
    local name="$1"
    local passed="$2"
    
    if [ "$passed" == "true" ]; then
        echo -e "${GREEN}✓${NC} $name"
    else
        echo -e "${RED}✗${NC} $name"
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
}

# Check 1: .env file security
echo -e "\n→ Checking environment file security..."
if [ -f "$REPO_ROOT/.env" ]; then
    PERMS=$(stat -c "%a" "$REPO_ROOT/.env" 2>/dev/null || stat -f "%Lp" "$REPO_ROOT/.env" 2>/dev/null)
    if [ "$PERMS" == "600" ]; then
        check ".env file permissions (600)" "true"
    else
        check ".env file permissions (currently $PERMS)" "false"
        if [ "$FIX_MODE" == "true" ]; then
            chmod 600 "$REPO_ROOT/.env"
            echo -e "  ${GREEN}→ Fixed: Set .env permissions to 600${NC}"
        fi
    fi
else
    check ".env file exists" "false"
    echo -e "  ${YELLOW}! Create .env from .env.example${NC}"
fi

# Check 2: Sensitive files not exposed
echo -e "\n→ Checking for exposed sensitive files..."
SENSITIVE_FILES=(".env" ".git" "composer.json" "package.json")
for file in "${SENSITIVE_FILES[@]}"; do
    if [ -f "$REPO_ROOT/public/$file" ] || [ -f "$REPO_ROOT/build/$file" ]; then
        check "$file not in public/build directory" "false"
    else
        check "$file not in public/build directory" "true"
    fi
done

# Check 3: .htaccess security headers
echo -e "\n→ Checking .htaccess security headers..."
if [ -f "$REPO_ROOT/.htaccess" ]; then
    REQUIRED_HEADERS=(
        "X-Frame-Options"
        "X-Content-Type-Options"
        "X-XSS-Protection"
        "Content-Security-Policy"
        "Strict-Transport-Security"
    )
    
    for header in "${REQUIRED_HEADERS[@]}"; do
        if grep -q "$header" "$REPO_ROOT/.htaccess"; then
            check "$header header present" "true"
        else
            check "$header header present" "false"
        fi
    done
else
    check ".htaccess file exists" "false"
fi

# Check 4: Secrets in code
echo -e "\n→ Checking for hardcoded secrets..."
PATTERNS=(
    "password\s*=\s*['\"][^'\"]{3,}"
    "api[_-]?key\s*=\s*['\"][^'\"]{3,}"
    "secret\s*=\s*['\"][^'\"]{3,}"
    "token\s*=\s*['\"][^'\"]{3,}"
)

SECRETS_FOUND=false
for pattern in "${PATTERNS[@]}"; do
    if grep -rE "$pattern" "$REPO_ROOT" \
        --exclude-dir=.git \
        --exclude-dir=node_modules \
        --exclude-dir=vendor \
        --exclude-dir=docs \
        --exclude="*.md" \
        --exclude="security-check.sh" \
        2>/dev/null | grep -v ".env.example" | grep -q .; then
        SECRETS_FOUND=true
        break
    fi
done

if [ "$SECRETS_FOUND" == "false" ]; then
    check "No hardcoded secrets found" "true"
else
    check "No hardcoded secrets found" "false"
    echo -e "  ${YELLOW}! Review code for hardcoded credentials${NC}"
fi

# Check 5: File permissions
echo -e "\n→ Checking file permissions..."
if [ -d "$REPO_ROOT/public" ]; then
    EXECUTABLE_HTML=$(find "$REPO_ROOT/public" -name "*.html" -perm -111 2>/dev/null | wc -l)
    if [ "$EXECUTABLE_HTML" -eq 0 ]; then
        check "HTML files not executable" "true"
    else
        check "HTML files not executable" "false"
        if [ "$FIX_MODE" == "true" ]; then
            find "$REPO_ROOT/public" -name "*.html" -exec chmod 644 {} \;
            echo -e "  ${GREEN}→ Fixed: Removed executable bit from HTML files${NC}"
        fi
    fi
fi

# Check 6: Logs directory permissions
echo -e "\n→ Checking logs directory..."
if [ -d "$REPO_ROOT/logs" ]; then
    LOGS_PERMS=$(stat -c "%a" "$REPO_ROOT/logs" 2>/dev/null || stat -f "%Lp" "$REPO_ROOT/logs" 2>/dev/null)
    if [ "$LOGS_PERMS" == "750" ] || [ "$LOGS_PERMS" == "700" ]; then
        check "Logs directory permissions secure" "true"
    else
        check "Logs directory permissions secure (currently $LOGS_PERMS)" "false"
        if [ "$FIX_MODE" == "true" ]; then
            chmod 750 "$REPO_ROOT/logs"
            echo -e "  ${GREEN}→ Fixed: Set logs directory to 750${NC}"
        fi
    fi
fi

# Check 7: PHPMailer configuration
echo -e "\n→ Checking PHPMailer security..."
if [ -f "$REPO_ROOT/sendmail.php" ]; then
    if grep -q "getenv" "$REPO_ROOT/sendmail.php"; then
        check "PHPMailer uses environment variables" "true"
    else
        check "PHPMailer uses environment variables" "false"
    fi
    
    if ! grep -E "Password.*=.*['\"][^'\"]{5,}['\"]" "$REPO_ROOT/sendmail.php" | grep -v getenv | grep -q .; then
        check "No hardcoded passwords in sendmail.php" "true"
    else
        check "No hardcoded passwords in sendmail.php" "false"
    fi
fi

# Check 8: HTTPS enforcement
echo -e "\n→ Checking HTTPS configuration..."
if [ -f "$REPO_ROOT/.htaccess" ]; then
    if grep -q "RewriteCond %{HTTPS} off" "$REPO_ROOT/.htaccess"; then
        check "HTTPS redirect configured" "true"
    else
        check "HTTPS redirect configured" "false"
    fi
fi

# Check 9: Directory listing disabled
echo -e "\n→ Checking directory listing..."
if [ -f "$REPO_ROOT/.htaccess" ]; then
    if grep -q "Options -Indexes" "$REPO_ROOT/.htaccess"; then
        check "Directory listing disabled" "true"
    else
        check "Directory listing disabled" "false"
    fi
fi

# Check 10: Form validation
echo -e "\n→ Checking form security..."
if [ -f "$REPO_ROOT/assets/js/form-validation.js" ]; then
    check "Form validation script present" "true"
else
    check "Form validation script present" "false"
fi

if [ -f "$REPO_ROOT/sendmail.php" ]; then
    if grep -q "honeypot\|extra_info" "$REPO_ROOT/sendmail.php"; then
        check "Honeypot protection in place" "true"
    else
        check "Honeypot protection in place" "false"
    fi
fi

# Summary
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ISSUES_FOUND -eq 0 ]; then
    echo -e "${GREEN}✅ All security checks passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Found $ISSUES_FOUND security issue(s)${NC}"
    if [ "$FIX_MODE" != "true" ]; then
        echo -e "\n💡 Run with --fix flag to automatically fix some issues:"
        echo -e "   ./scripts/security-check.sh --fix"
    fi
    exit 1
fi
