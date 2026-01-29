#!/usr/bin/env bash
set -euo pipefail

# ================================
# Production Build Script
# ================================

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_ROOT="$REPO_ROOT/build"

echo "🏗  Building production artifact..."
echo "Repo:   $REPO_ROOT"
echo "Build:  $BUILD_ROOT"

# -------------------------------
# 1. Clean build directory
# -------------------------------
rm -rf "$BUILD_ROOT"
mkdir -p "$BUILD_ROOT"

# -------------------------------
# 2. Copy public web root (excluding symlinks)
# -------------------------------
echo "→ Copying public/ contents..."
# Copy all files and directories except symlinks
rsync -a --no-links "$REPO_ROOT/public/" "$BUILD_ROOT/"

# -------------------------------
# 3. Copy runtime directories (resolving symlinks)
# -------------------------------
echo "→ Copying assets/"
cp -rL "$REPO_ROOT/assets" "$BUILD_ROOT/"

echo "→ Copying data/"
cp -rL "$REPO_ROOT/data" "$BUILD_ROOT/"

echo "→ Copying components/"
cp -rL "$REPO_ROOT/components" "$BUILD_ROOT/"

# -------------------------------
# 4. Copy root-level production files
# -------------------------------
echo "→ Copying .htaccess"
cp "$REPO_ROOT/.htaccess" "$BUILD_ROOT/"

if [ -d "$REPO_ROOT/.well-known" ]; then
  echo "→ Copying .well-known/"
  cp -R "$REPO_ROOT/.well-known" "$BUILD_ROOT/"
else
  echo "❌ ERROR: .well-known missing"
  exit 1
fi
# -------------------------------
# 5. Full Production Validation
# -------------------------------
echo "🔍 Validating full production contract..."

# ---- Required root files ----
REQUIRED_ROOT_FILES=(
  "index.html"
  "about.html"
  "artists.html"
  "services.html"
  "privacy-policy.html"
  "terms-of-service.html"
  "maintenance-page.html"
  "robots.txt"
  "humans.txt"
  "security.txt"
  "sitemap.xml"
  ".htaccess"
)

# ---- Required error pages ----
REQUIRED_ERROR_FILES=(
  "errors/403.html"
  "errors/404.html"
  "errors/410.html"
  "errors/500.html"
  "errors/503.html"
)

# ---- Required directories ----
REQUIRED_DIRECTORIES=(
  "assets"
  "assets/css"
  "assets/js"
  "assets/media"
  "assets/media/audio"
  "assets/media/icons"
  "assets/media/images"
  "data"
  "components"
  ".well-known"
)

# ---- Required asset files ----
REQUIRED_ASSET_FILES=(
  "assets/css/styles.css"
  "assets/css/about.css"
  "assets/css/artists.css"
  "assets/css/services.css"
  "assets/js/main.js"
  "assets/js/about.js"
  "assets/js/artists.js"
  "assets/js/services.js"
)

# ---- Required data files ----
REQUIRED_DATA_FILES=(
  "data/homepage.json"
  "data/about.json"
  "data/artists.json"
  "data/services.json"
  "data/booking-policies.json"
)

# ---- Required components ----
REQUIRED_COMPONENT_FILES=(
  "components/header.html"
  "components/footer.html"
)

# ---- Security files ----
REQUIRED_SECURITY_FILES=(
  ".well-known/security.txt"
)

# ---- Validation execution ----
for file in "${REQUIRED_ROOT_FILES[@]}" \
            "${REQUIRED_ERROR_FILES[@]}" \
            "${REQUIRED_ASSET_FILES[@]}" \
            "${REQUIRED_DATA_FILES[@]}" \
            "${REQUIRED_COMPONENT_FILES[@]}" \
            "${REQUIRED_SECURITY_FILES[@]}"; do
  if [ ! -f "$BUILD_ROOT/$file" ]; then
    echo "❌ ERROR: Missing required file: build/$file"
    exit 1
  fi
done

for dir in "${REQUIRED_DIRECTORIES[@]}"; do
  if [ ! -d "$BUILD_ROOT/$dir" ]; then
    echo "❌ ERROR: Missing required directory: build/$dir"
    exit 1
  fi
done
for critical_dir in "components" "data"; do
  if [ -z "$(ls -A "$BUILD_ROOT/$critical_dir")" ]; then
    echo "❌ ERROR: $critical_dir exists but is empty"
    exit 1
  fi
done
if ! grep -q "RewriteEngine On" "$BUILD_ROOT/.htaccess"; then
  echo "❌ ERROR: .htaccess missing RewriteEngine directive"
  exit 1
fi
if [ "$(find "$BUILD_ROOT" -type f | wc -l)" -lt 10 ]; then
  echo "❌ ERROR: Build artifact suspiciously small"
  exit 1
fi

# -------------------------------
# 6. Forbidden Content Check
# -------------------------------
echo "🔒 Checking for forbidden content..."

FORBIDDEN_PATTERNS=(
  "docs"
  "scripts"
  ".env"
  ".env.example"
  "package.json"
  ".vscode"
  "*.py"
  "*.sh"
  "*.md"
)

for pattern in "${FORBIDDEN_PATTERNS[@]}"; do
if find "$BUILD_ROOT" -maxdepth 2 -name "$pattern" | grep -q .; then
    echo "❌ ERROR: Forbidden content detected in build: $pattern"
    exit 1
  fi
done

echo "✅ Full production validation passed."

# -------------------------------
# 7. Done
# -------------------------------
echo "✅ Build complete and production-safe."
echo
tree -L 3 "$BUILD_ROOT"
