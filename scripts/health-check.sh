#!/usr/bin/env bash
set -euo pipefail

# ====================================
# Aria Amore - Health Check Script
# ====================================
# Monitors website health and sends alerts if issues detected
# Usage: ./scripts/health-check.sh [--once]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load environment variables if .env exists
if [ -f "$REPO_ROOT/.env" ]; then
    set -a
    source "$REPO_ROOT/.env"
    set +a
fi

# Configuration
SITE_URL="${SITE_URL:-https://ariaamore.com}"
LOG_FILE="${LOG_FILE:-/var/log/aria-amore-health.log}"
ALERT_EMAIL="${SECURITY_EMAIL:-security@ariaamore.com}"
CHECK_INTERVAL="${CHECK_INTERVAL:-300}" # 5 minutes

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to check HTTP status
check_http_status() {
    local url="$1"
    local status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url" 2>/dev/null || echo "000")
    echo "$status"
}

# Function to check SSL certificate
check_ssl_cert() {
    local domain=$(echo "$SITE_URL" | sed -E 's/https?:\/\///' | sed 's/\/.*//')
    local expiry_date=$(echo | openssl s_client -servername "$domain" -connect "${domain}:443" 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
    
    if [ -n "$expiry_date" ]; then
        local expiry_epoch=$(date -d "$expiry_date" +%s 2>/dev/null || echo "0")
        local now_epoch=$(date +%s)
        local days_until_expiry=$(( ($expiry_epoch - $now_epoch) / 86400 ))
        echo "$days_until_expiry"
    else
        echo "-1"
    fi
}

# Function to check disk space
check_disk_space() {
    local usage=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
    echo "$usage"
}

# Function to send alert
send_alert() {
    local subject="$1"
    local message="$2"
    
    log "ALERT: $subject"
    
    # Try to send email if mail command is available
    if command -v mail &> /dev/null; then
        echo "$message" | mail -s "[Aria Amore] $subject" "$ALERT_EMAIL"
    fi
}

# Main health check function
perform_health_check() {
    log "Starting health check..."
    
    local issues=0
    
    # Check 1: HTTP Status
    log "→ Checking HTTP status..."
    local http_status=$(check_http_status "$SITE_URL")
    if [ "$http_status" == "200" ]; then
        log "  ✓ HTTP status OK (200)"
    else
        log "  ✗ HTTP status FAILED ($http_status)"
        send_alert "Website Down" "The website returned HTTP status $http_status"
        issues=$((issues + 1))
    fi
    
    # Check 2: SSL Certificate
    if [[ "$SITE_URL" == https* ]]; then
        log "→ Checking SSL certificate..."
        local days_until_expiry=$(check_ssl_cert)
        if [ "$days_until_expiry" -gt 30 ]; then
            log "  ✓ SSL certificate OK ($days_until_expiry days until expiry)"
        elif [ "$days_until_expiry" -gt 0 ]; then
            log "  ⚠ SSL certificate expires soon ($days_until_expiry days)"
            send_alert "SSL Certificate Expiring Soon" "SSL certificate expires in $days_until_expiry days"
            issues=$((issues + 1))
        else
            log "  ✗ SSL certificate check FAILED"
            issues=$((issues + 1))
        fi
    fi
    
    # Check 3: Disk Space
    log "→ Checking disk space..."
    local disk_usage=$(check_disk_space)
    if [ "$disk_usage" -lt 80 ]; then
        log "  ✓ Disk space OK (${disk_usage}% used)"
    elif [ "$disk_usage" -lt 90 ]; then
        log "  ⚠ Disk space WARNING (${disk_usage}% used)"
        send_alert "Disk Space Warning" "Disk usage is at ${disk_usage}%"
        issues=$((issues + 1))
    else
        log "  ✗ Disk space CRITICAL (${disk_usage}% used)"
        send_alert "Disk Space Critical" "Disk usage is at ${disk_usage}%"
        issues=$((issues + 1))
    fi
    
    # Check 4: Important files exist
    log "→ Checking critical files..."
    local critical_files=("index.html" ".htaccess" "sendmail.php")
    for file in "${critical_files[@]}"; do
        if [ -f "$REPO_ROOT/public/$file" ] || [ -f "$REPO_ROOT/$file" ]; then
            log "  ✓ $file exists"
        else
            log "  ✗ $file MISSING"
            issues=$((issues + 1))
        fi
    done
    
    # Summary
    log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    if [ $issues -eq 0 ]; then
        log "✅ Health check PASSED - All systems OK"
    else
        log "⚠️  Health check COMPLETED with $issues issue(s)"
    fi
    log ""
    
    return $issues
}

# Main execution
main() {
    # Create log directory if it doesn't exist
    mkdir -p "$(dirname "$LOG_FILE")"
    
    if [ "${1:-}" == "--once" ]; then
        # Run once and exit
        perform_health_check
        exit $?
    else
        # Run continuously
        log "Health monitoring started (checking every ${CHECK_INTERVAL} seconds)"
        log "Press Ctrl+C to stop"
        
        while true; do
            perform_health_check
            sleep "$CHECK_INTERVAL"
        done
    fi
}

main "$@"
