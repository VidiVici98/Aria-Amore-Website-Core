#!/bin/bash

# Aria Amore Website - Backup Script
# Creates automated backups of website files and databases
# Add to crontab with: 0 2 * * * /path/to/backup.sh

BACKUP_DIR="/backups/aria-amore"
SITE_ROOT="/var/www/html/aria-amore"
RETENTION_DAYS=30
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/aria-amore-backup.log"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to log messages
log_message() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log_message "🔄 Starting backup..."

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup website files
log_message "📦 Backing up website files..."
tar -czf "$BACKUP_DIR/site_$TIMESTAMP.tar.gz" \
  --exclude='.git' \
  --exclude='.env' \
  --exclude='node_modules' \
  --exclude='.DS_Store' \
  "$SITE_ROOT" 2>> "$LOG_FILE"

if [ $? -eq 0 ]; then
  log_message "✅ Website backup completed: site_$TIMESTAMP.tar.gz"
else
  log_message "❌ Website backup failed"
  exit 1
fi

# Backup database (if applicable)
# Uncomment and configure for your database
# DB_USER="dbuser"
# DB_PASS="dbpass"
# DB_NAME="dbname"
# log_message "💾 Backing up database..."
# mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > "$BACKUP_DIR/db_$TIMESTAMP.sql" 2>> "$LOG_FILE"
# gzip "$BACKUP_DIR/db_$TIMESTAMP.sql"
# log_message "✅ Database backup completed: db_$TIMESTAMP.sql.gz"

# Calculate backup size
SIZE=$(du -sh "$BACKUP_DIR/site_$TIMESTAMP.tar.gz" | cut -f1)
log_message "💾 Backup size: $SIZE"

# Remove old backups (older than RETENTION_DAYS)
log_message "🧹 Cleaning up old backups (keeping last $RETENTION_DAYS days)..."
find "$BACKUP_DIR" -name "site_*.tar.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "db_*.sql.gz" -mtime +$RETENTION_DAYS -delete 2>/dev/null

REMAINING=$(ls -1 "$BACKUP_DIR" | wc -l)
log_message "✅ Cleanup complete. $REMAINING backups remaining."

# Verify backup integrity
log_message "🔍 Verifying backup integrity..."
if tar -tzf "$BACKUP_DIR/site_$TIMESTAMP.tar.gz" > /dev/null 2>&1; then
  log_message "✅ Backup integrity verified"
else
  log_message "❌ Backup integrity check failed!"
  exit 1
fi

log_message "✅ Backup completed successfully"
