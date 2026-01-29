#!/usr/bin/env bash
set -euo pipefail

# ====================================
# Aria Amore - Backup Script
# ====================================
# Creates timestamped backups of the website files
# Usage: ./scripts/backup.sh [backup_dir]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKUP_DIR="${1:-/var/backups/aria-amore}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="aria-amore-backup-${TIMESTAMP}"

echo "🗄️  Creating backup: ${BACKUP_NAME}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create temporary working directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

echo "→ Copying files to temporary directory..."
cp -r "$REPO_ROOT" "$TEMP_DIR/$BACKUP_NAME"

# Remove unnecessary files from backup
echo "→ Cleaning backup (removing development files)..."
cd "$TEMP_DIR/$BACKUP_NAME"
rm -rf .git .github node_modules vendor build logs tmp *.log 2>/dev/null || true

# Create compressed archive
echo "→ Creating compressed archive..."
cd "$TEMP_DIR"
tar -czf "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" "$BACKUP_NAME"

# Create checksum
echo "→ Creating checksum..."
cd "$BACKUP_DIR"
sha256sum "${BACKUP_NAME}.tar.gz" > "${BACKUP_NAME}.tar.gz.sha256"

# Get backup size
BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" | cut -f1)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Backup created successfully!"
echo "   File: ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
echo "   Size: ${BACKUP_SIZE}"
echo "   Checksum: ${BACKUP_NAME}.tar.gz.sha256"

# Optional: Remove old backups (keep last 30 days)
echo ""
echo "→ Cleaning old backups (keeping last 30 days)..."
find "$BACKUP_DIR" -name "aria-amore-backup-*.tar.gz" -type f -mtime +30 -delete
find "$BACKUP_DIR" -name "aria-amore-backup-*.tar.gz.sha256" -type f -mtime +30 -delete

echo ""
echo "📋 Recent backups:"
ls -lht "$BACKUP_DIR" | head -6

echo ""
echo "✅ Backup complete!"
