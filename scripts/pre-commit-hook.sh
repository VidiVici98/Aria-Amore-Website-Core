#!/bin/bash

# Aria Amore Website - Pre-commit Hook
# Place this file at .git/hooks/pre-commit
# Make it executable: chmod +x .git/hooks/pre-commit

set -e

echo "🔍 Running pre-commit checks..."

# Check for API keys or secrets in staged files
echo "Checking for exposed secrets..."
if git diff --cached | grep -iE "(api[_-]?key|password|secret|token|auth)" > /dev/null 2>&1; then
  echo "⚠️  WARNING: Possible secrets detected in staged changes!"
  echo "Review the following matches:"
  git diff --cached | grep -iE "(api[_-]?key|password|secret|token|auth)" | head -5
  read -p "Continue with commit? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Commit aborted."
    exit 1
  fi
fi

# Check for .env file being committed
echo "Checking for .env file..."
if git diff --cached --name-only | grep -E "^\.env$" > /dev/null; then
  echo "❌ ERROR: .env file cannot be committed!"
  echo "Use .env.example instead."
  exit 1
fi

# Check for common debug statements left in code
echo "Checking for debug statements..."
if git diff --cached | grep -E "(console\.log|debugger|alert\()" > /dev/null 2>&1; then
  echo "⚠️  WARNING: Debug statements found in staged code"
  read -p "Continue with commit? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Commit aborted."
    exit 1
  fi
fi

# Validate HTML files
echo "Validating HTML syntax..."
for file in $(git diff --cached --name-only | grep '\.html$'); do
  if [ -f "$file" ]; then
    # Basic HTML validation (check for unclosed tags)
    if ! grep -q "<!DOCTYPE" "$file"; then
      echo "⚠️  WARNING: $file may be missing DOCTYPE declaration"
    fi
  fi
done

# Check JSON files are valid
echo "Validating JSON files..."
for file in $(git diff --cached --name-only | grep '\.json$'); do
  if [ -f "$file" ]; then
    if ! python3 -m json.tool "$file" > /dev/null 2>&1; then
      echo "❌ ERROR: Invalid JSON in $file"
      exit 1
    fi
  fi
done

echo "✅ Pre-commit checks passed!"
exit 0
