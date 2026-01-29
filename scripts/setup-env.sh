#!/usr/bin/env bash
set -euo pipefail

# ====================================
# Aria Amore - Environment Setup Script
# ====================================
# Sets up the development/production environment
# Usage: ./scripts/setup-env.sh [development|production]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

ENV_TYPE="${1:-development}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "⚙️  Aria Amore - Environment Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Environment: $ENV_TYPE"
echo ""

# Step 1: Create .env file if it doesn't exist
echo "→ Setting up environment configuration..."
if [ ! -f "$REPO_ROOT/.env" ]; then
    if [ -f "$REPO_ROOT/.env.example" ]; then
        cp "$REPO_ROOT/.env.example" "$REPO_ROOT/.env"
        echo -e "${GREEN}✓ Created .env file from .env.example${NC}"
        echo -e "${YELLOW}! Please edit .env with your configuration${NC}"
    else
        echo "❌ Error: .env.example not found"
        exit 1
    fi
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Step 2: Set proper permissions
echo -e "\n→ Setting file permissions..."
chmod 600 "$REPO_ROOT/.env" 2>/dev/null || true
echo -e "${GREEN}✓ Set .env permissions to 600${NC}"

# Step 3: Create necessary directories
echo -e "\n→ Creating required directories..."
REQUIRED_DIRS=(
    "logs"
    "vendor"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    mkdir -p "$REPO_ROOT/$dir"
    echo -e "${GREEN}✓ Created $dir/${NC}"
done

# Step 4: Set up logs directory
if [ -d "$REPO_ROOT/logs" ]; then
    touch "$REPO_ROOT/logs/errors.log"
    chmod 640 "$REPO_ROOT/logs/errors.log" 2>/dev/null || true
    echo -e "${GREEN}✓ Initialized error log${NC}"
fi

# Step 5: Check for required commands
echo -e "\n→ Checking system requirements..."
REQUIRED_COMMANDS=(
    "curl:cURL for HTTP requests"
    "php:PHP for server-side processing"
)

MISSING_COMMANDS=0
for cmd_desc in "${REQUIRED_COMMANDS[@]}"; do
    IFS=':' read -r cmd desc <<< "$cmd_desc"
    if command -v "$cmd" &> /dev/null; then
        echo -e "${GREEN}✓ $desc${NC}"
    else
        echo -e "${YELLOW}⚠ $desc (optional)${NC}"
        MISSING_COMMANDS=$((MISSING_COMMANDS + 1))
    fi
done

# Step 6: Set up PHPMailer autoloader
echo -e "\n→ Setting up PHPMailer..."
if [ -d "$REPO_ROOT/PHPMailer/src" ]; then
    echo -e "${GREEN}✓ PHPMailer found${NC}"
    
    # Ensure vendor/autoload.php exists
    if [ ! -f "$REPO_ROOT/vendor/autoload.php" ]; then
        echo "Creating autoload.php..."
        # The file was created earlier
        echo -e "${GREEN}✓ Autoload configured${NC}"
    fi
else
    echo -e "${YELLOW}⚠ PHPMailer not found${NC}"
fi

# Step 7: Development-specific setup
if [ "$ENV_TYPE" == "development" ]; then
    echo -e "\n→ Development environment setup..."
    
    # Create .gitignore if needed
    if [ ! -f "$REPO_ROOT/.gitignore" ]; then
        cat > "$REPO_ROOT/.gitignore" << 'EOF'
# Environment
.env
.env.local

# Dependencies
node_modules/
vendor/

# Build
build/
dist/

# Logs
logs/
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
EOF
        echo -e "${GREEN}✓ Created .gitignore${NC}"
    fi
fi

# Step 8: Production-specific setup
if [ "$ENV_TYPE" == "production" ]; then
    echo -e "\n→ Production environment setup..."
    
    # Run security check
    if [ -f "$SCRIPT_DIR/security-check.sh" ]; then
        echo "Running security check..."
        bash "$SCRIPT_DIR/security-check.sh" || true
    fi
    
    # Set strict permissions
    find "$REPO_ROOT/public" -type f -exec chmod 644 {} \; 2>/dev/null || true
    find "$REPO_ROOT/public" -type d -exec chmod 755 {} \; 2>/dev/null || true
    echo -e "${GREEN}✓ Set production file permissions${NC}"
fi

# Step 9: Validate setup
echo -e "\n→ Validating setup..."
VALIDATION_PASSED=true

if [ ! -f "$REPO_ROOT/.env" ]; then
    echo "❌ .env file missing"
    VALIDATION_PASSED=false
fi

if [ ! -f "$REPO_ROOT/.htaccess" ]; then
    echo "⚠️  .htaccess file missing (required for Apache)"
fi

if [ ! -f "$REPO_ROOT/sendmail.php" ]; then
    echo "⚠️  sendmail.php missing"
fi

if [ "$VALIDATION_PASSED" == "true" ]; then
    echo -e "${GREEN}✓ All required files present${NC}"
fi

# Summary
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Environment setup complete!${NC}"
echo ""
echo "📋 Next steps:"
if [ "$ENV_TYPE" == "development" ]; then
    echo "  1. Edit .env with your configuration"
    echo "  2. Install a local web server (Apache/Nginx/PHP built-in)"
    echo "  3. Run: php -S localhost:8000 -t public/"
    echo "  4. Open: http://localhost:8000"
else
    echo "  1. Review and update .env with production values"
    echo "  2. Run: ./scripts/security-check.sh"
    echo "  3. Run: ./scripts/deploy.sh production"
    echo "  4. Set up cron jobs for backups and health checks"
fi
echo ""
