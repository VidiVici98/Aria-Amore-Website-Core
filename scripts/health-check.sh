#!/bin/bash

# Aria Amore Website - Health Check Script
# Monitors website health and uptime

SITE_URL="https://ariaamore.com"
CHECK_INTERVAL=300  # 5 minutes
LOG_FILE="/var/log/aria-amore-health.log"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to log messages
log_message() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Function to send alert
send_alert() {
  local subject="$1"
  local message="$2"
  # Configure this to send emails to your monitoring service
  # echo "$message" | mail -s "$subject" security@ariaamore.com
  log_message "🚨 ALERT: $subject - $message"
}

# Function to check HTTP status
check_http_status() {
  local response=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" --max-time 10)
  
  if [ "$response" = "200" ] || [ "$response" = "301" ] || [ "$response" = "302" ]; then
    log_message "✅ HTTP Status: $response"
    return 0
  else
    log_message "❌ HTTP Status: $response"
    send_alert "HTTP Status Error" "Received HTTP $response for $SITE_URL"
    return 1
  fi
}

# Function to check SSL certificate
check_ssl() {
  local expiry=$(echo | openssl s_client -servername ariaamore.com -connect ariaamore.com:443 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
  local expiry_epoch=$(date -d "$expiry" +%s)
  local current_epoch=$(date +%s)
  local days_left=$(( ($expiry_epoch - $current_epoch) / 86400 ))
  
  if [ "$days_left" -lt 30 ]; then
    log_message "🚨 SSL Certificate expires in $days_left days"
    send_alert "SSL Certificate Expiring Soon" "Certificate expires in $days_left days"
  else
    log_message "✅ SSL Certificate valid for $days_left more days"
  fi
}

# Function to check disk space
check_disk_space() {
  local usage=$(df /var/www/html | awk 'NR==2 {print $5}' | sed 's/%//')
  
  if [ "$usage" -gt 90 ]; then
    log_message "🚨 Disk usage critical: $usage%"
    send_alert "Disk Space Critical" "Disk usage is $usage%"
  elif [ "$usage" -gt 80 ]; then
    log_message "⚠️  Disk usage warning: $usage%"
  else
    log_message "✅ Disk usage: $usage%"
  fi
}

# Function to check memory
check_memory() {
  local usage=$(free | grep Mem | awk '{print int($3/$2 * 100)}')
  
  if [ "$usage" -gt 90 ]; then
    log_message "🚨 Memory usage critical: $usage%"
    send_alert "Memory Critical" "Memory usage is $usage%"
  elif [ "$usage" -gt 80 ]; then
    log_message "⚠️  Memory usage warning: $usage%"
  else
    log_message "✅ Memory usage: $usage%"
  fi
}

# Function to check response time
check_response_time() {
  local response_time=$(curl -s -o /dev/null -w "%{time_total}" "$SITE_URL" --max-time 10)
  local response_ms=$(echo "$response_time * 1000" | bc)
  
  if (( $(echo "$response_time > 3" | bc -l) )); then
    log_message "⚠️  Slow response time: ${response_ms}ms"
    send_alert "Slow Response Time" "Response time is ${response_ms}ms"
  else
    log_message "✅ Response time: ${response_ms}ms"
  fi
}

# Main health check
run_health_check() {
  log_message "🔍 Running health check..."
  
  check_http_status
  check_ssl
  check_disk_space
  check_memory
  check_response_time
  
  log_message "✅ Health check completed"
}

# Display usage
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
  echo "Aria Amore Website - Health Check Script"
  echo ""
  echo "Usage: ./health-check.sh [--once]"
  echo ""
  echo "Options:"
  echo "  --once    Run health check once and exit"
  echo "  --help    Show this help message"
  echo ""
  echo "Add to crontab for continuous monitoring:"
  echo "  */5 * * * * /path/to/health-check.sh --once"
  exit 0
fi

# Run once or continuously
if [ "$1" = "--once" ]; then
  run_health_check
  exit 0
else
  echo "🔄 Starting continuous health monitoring (interval: ${CHECK_INTERVAL}s)"
  while true; do
    run_health_check
    sleep "$CHECK_INTERVAL"
  done
fi
