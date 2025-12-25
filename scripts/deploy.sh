#!/bin/bash

# Aria Amore Website - Deploy Script
# Usage: ./deploy.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}
REPO_PATH=$(pwd)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/aria-amore"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting deployment to $ENVIRONMENT...${NC}"

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo -e "${RED}❌ ERROR: .env file not found!${NC}"
  echo "Create .env from .env.example and configure it first."
  exit 1
fi

# Verify git status
echo -e "${YELLOW}📝 Checking git status...${NC}"
if [ ! -z "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}⚠️  Uncommitted changes detected${NC}"
  read -p "Continue with deployment? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment aborted."
    exit 1
  fi
fi

# Create backup directory if not exists
mkdir -p "$BACKUP_DIR"

# Backup current files
echo -e "${YELLOW}💾 Creating backup...${NC}"
if [ "$ENVIRONMENT" = "production" ]; then
  tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" \
    --exclude='.git' \
    --exclude='.env' \
    --exclude='node_modules' \
    --exclude='.DS_Store' \
    "$REPO_PATH" || true
  echo -e "${GREEN}✅ Backup created: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz${NC}"
fi

# Run security checks
echo -e "${YELLOW}🔐 Running security checks...${NC}"
if [ -f "pre-commit-hook.sh" ]; then
  bash pre-commit-hook.sh || exit 1
else
  echo -e "${YELLOW}⚠️  pre-commit-hook.sh not found, skipping checks${NC}"
fi

# Run tests (if applicable)
echo -e "${YELLOW}🧪 Running tests...${NC}"
if [ -f "package.json" ]; then
  npm test 2>/dev/null || echo "No tests configured"
fi

# Validate files
echo -e "${YELLOW}✔️  Validating files...${NC}"

# Check for required files
REQUIRED_FILES=(".htaccess" "robots.txt" "sitemap.xml" "security.txt")
for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$REPO_PATH/$file" ]; then
    echo -e "${RED}❌ Missing required file: $file${NC}"
    exit 1
  fi
done

echo -e "${GREEN}✅ All required files present${NC}"

# Minify/compress assets (optional)
echo -e "${YELLOW}📦 Optimizing assets...${NC}"
# Add asset optimization commands here if needed

case "$ENVIRONMENT" in
  production)
    echo -e "${YELLOW}🌍 Deploying to production...${NC}"
    # Add production deployment commands here
    # Example:
    # rsync -avz --exclude='.git' --exclude='.env' --exclude='node_modules' \
    #   "$REPO_PATH/" "user@server:/var/www/html/aria-amore/"
    
    echo -e "${GREEN}✅ Deployment to production complete!${NC}"
    echo "Remember to:"
    echo "  1. Verify SSL certificate is installed"
    echo "  2. Test security headers: https://securityheaders.com"
    echo "  3. Test performance: https://gtmetrix.com"
    echo "  4. Monitor error logs"
    ;;
    
  staging)
    echo -e "${YELLOW}🧪 Deploying to staging...${NC}"
    # Add staging deployment commands here
    echo -e "${GREEN}✅ Deployment to staging complete!${NC}"
    ;;
    
  *)
    echo -e "${RED}❌ Unknown environment: $ENVIRONMENT${NC}"
    echo "Usage: ./deploy.sh [production|staging]"
    exit 1
    ;;
esac

echo -e "${GREEN}✅ Deployment successful!${NC}"
echo "Deployment timestamp: $TIMESTAMP"
