#!/bin/bash

# Aria Amore - Path Validation Script
# Checks that all HTML files have correct asset references

set -e

ERRORS=0
WARNINGS=0

echo "🔍 Validating HTML asset paths..."
echo ""

# Check each HTML file in public/
for html_file in public/*.html; do
  if [ -f "$html_file" ]; then
    filename=$(basename "$html_file")
    
    # Check for common incorrect paths
    if grep -q "href=\"/assets/" "$html_file"; then
      echo "❌ $filename: Found absolute path '/assets/' (should be relative 'assets/')"
      ((ERRORS++))
    fi
    
    if grep -q "src=\"/assets/" "$html_file"; then
      echo "❌ $filename: Found absolute path '/assets/' (should be relative 'assets/')"
      ((ERRORS++))
    fi
    
    # Check for correct relative paths
    if grep -q "href=\"assets/" "$html_file" || grep -q "src=\"assets/" "$html_file"; then
      echo "✓ $filename: Relative asset paths correct"
    fi
    
    # Warn about absolute external paths (for CDN/external resources, which are OK)
    if grep -q "href=\"https://" "$html_file" || grep -q "src=\"https://" "$html_file"; then
      # This is OK for external resources
      :
    fi
  fi
done

echo ""
echo "🔗 Checking for broken internal links..."

# Check for common broken reference patterns
for html_file in public/*.html; do
  if [ -f "$html_file" ]; then
    filename=$(basename "$html_file")
    
    # Check for references to non-existent files
    if grep -q 'href="components/' "$html_file"; then
      echo "❌ $filename: References components/ directly (should load via JS)"
      ((WARNINGS++))
    fi
  fi
done

echo ""
echo "📊 Asset File Existence Check..."

# Check that all referenced asset directories exist
if [ -d "assets/css" ]; then
  echo "✓ assets/css/ exists"
else
  echo "❌ assets/css/ NOT FOUND"
  ((ERRORS++))
fi

if [ -d "assets/js" ]; then
  echo "✓ assets/js/ exists"
else
  echo "❌ assets/js/ NOT FOUND"
  ((ERRORS++))
fi

if [ -d "assets/media" ]; then
  echo "✓ assets/media/ exists"
else
  echo "❌ assets/media/ NOT FOUND"
  ((ERRORS++))
fi

echo ""
echo "📝 Summary:"
echo "  Errors: $ERRORS"
echo "  Warnings: $WARNINGS"

if [ $ERRORS -eq 0 ]; then
  echo ""
  echo "✅ All paths validated successfully!"
  exit 0
else
  echo ""
  echo "❌ Path validation failed. Please fix the errors above."
  exit 1
fi
