#!/usr/bin/env bash
set -euo pipefail

# ====================================
# Aria Amore - Deploy Script
# ====================================
# Deploys the website to production or staging
# Usage: ./scripts/deploy.sh [production|staging]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

ENV="${1:-production}"

echo "🚀 Deploying Aria Amore to $ENV"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Validate environment
if [[ "$ENV" != "production" && "$ENV" != "staging" ]]; then
    echo "❌ Error: Environment must be 'production' or 'staging'"
    exit 1
fi

# Pre-deployment checks
echo "→ Running pre-deployment checks..."

# Check if .env exists
if [ ! -f "$REPO_ROOT/.env" ]; then
    echo "❌ Error: .env file not found. Copy .env.example to .env and configure it."
    exit 1
fi

# Check if build directory exists or create it
if [ ! -d "$REPO_ROOT/build" ]; then
    echo "→ Build directory not found, running build script..."
    if [ -f "$REPO_ROOT/scripts/build.sh" ]; then
        bash "$REPO_ROOT/scripts/build.sh"
    else
        echo "⚠️  Warning: build.sh not found, skipping build step"
    fi
fi

# Create logs directory
mkdir -p "$REPO_ROOT/logs"

# Run tests if available
if [ -f "$REPO_ROOT/scripts/test.sh" ]; then
    echo "→ Running tests..."
    bash "$REPO_ROOT/scripts/test.sh" || {
        echo "❌ Tests failed. Deployment aborted."
        exit 1
    }
else
    echo "⚠️  Warning: No test script found, skipping tests"
fi

# Create backup before deployment
echo "→ Creating backup..."
if [ -f "$REPO_ROOT/scripts/backup.sh" ]; then
    bash "$REPO_ROOT/scripts/backup.sh" "/tmp/pre-deployment-backup"
fi

# Set proper permissions
echo "→ Setting file permissions..."
find "$REPO_ROOT/public" -type f -exec chmod 644 {} \; 2>/dev/null || true
find "$REPO_ROOT/public" -type d -exec chmod 755 {} \; 2>/dev/null || true
find "$REPO_ROOT/scripts" -name "*.sh" -exec chmod +x {} \; 2>/dev/null || true

# Set secure permissions for .env
if [ -f "$REPO_ROOT/.env" ]; then
    chmod 600 "$REPO_ROOT/.env"
fi

# Deployment info
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Deployment Information:"
echo "   Environment: $ENV"
echo "   Timestamp: $(date)"
echo "   Git Commit: $(git rev-parse --short HEAD 2>/dev/null || echo 'N/A')"
echo ""
echo "📁 Next Steps:"
echo "   1. Upload files from the 'build' directory to your web server"
echo "   2. Ensure .env file is configured on the server"
echo "   3. Set up cron jobs for backup and health checks"
echo "   4. Verify SSL certificate is installed"
echo "   5. Test the deployed site"
echo ""
echo "🔗 Useful Commands:"
echo "   • Test health: ./scripts/health-check.sh --once"
echo "   • Create backup: ./scripts/backup.sh"
echo "   • View logs: tail -f logs/errors.log"
echo ""
echo "✅ Ready for deployment!"
