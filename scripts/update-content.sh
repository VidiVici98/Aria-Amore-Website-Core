#!/usr/bin/env bash
set -euo pipefail

# ====================================
# Aria Amore - Content Update Helper
# ====================================
# Helps validate and update content JSON files
# Usage: ./scripts/update-content.sh [file] [--validate-only]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DATA_DIR="$REPO_ROOT/data"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📝 Aria Amore - Content Update Helper"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Function to validate JSON file
validate_json() {
    local file="$1"
    echo -e "\n→ Validating: ${file}"
    
    if [ ! -f "$file" ]; then
        echo -e "${RED}✗ File not found: $file${NC}"
        return 1
    fi
    
    # Check if jq is available for JSON validation
    if command -v jq &> /dev/null; then
        if jq empty "$file" 2>/dev/null; then
            echo -e "${GREEN}✓ Valid JSON${NC}"
            return 0
        else
            echo -e "${RED}✗ Invalid JSON${NC}"
            jq empty "$file" 2>&1 | head -5
            return 1
        fi
    else
        # Fallback to Python if jq not available
        if command -v python3 &> /dev/null; then
            if python3 -m json.tool "$file" > /dev/null 2>&1; then
                echo -e "${GREEN}✓ Valid JSON${NC}"
                return 0
            else
                echo -e "${RED}✗ Invalid JSON${NC}"
                python3 -m json.tool "$file" 2>&1 | head -5
                return 1
            fi
        else
            echo -e "${YELLOW}⚠ Cannot validate JSON (jq or python3 not found)${NC}"
            return 0
        fi
    fi
}

# Function to create backup
create_backup() {
    local file="$1"
    local backup="${file}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$file" "$backup"
    echo -e "${GREEN}✓ Backup created: $backup${NC}"
}

# Function to list content files
list_content_files() {
    echo -e "\n📁 Content files in $DATA_DIR:"
    if [ -d "$DATA_DIR" ]; then
        find "$DATA_DIR" -name "*.json" -type f | while read -r file; do
            local basename=$(basename "$file")
            local size=$(du -h "$file" | cut -f1)
            echo "  • $basename ($size)"
        done
    else
        echo -e "${RED}✗ Data directory not found${NC}"
    fi
}

# Function to validate all content files
validate_all() {
    echo -e "\n🔍 Validating all content files..."
    local errors=0
    
    if [ ! -d "$DATA_DIR" ]; then
        echo -e "${RED}✗ Data directory not found${NC}"
        return 1
    fi
    
    find "$DATA_DIR" -name "*.json" -type f | while read -r file; do
        if ! validate_json "$file"; then
            errors=$((errors + 1))
        fi
    done
    
    if [ $errors -eq 0 ]; then
        echo -e "\n${GREEN}✅ All content files are valid!${NC}"
        return 0
    else
        echo -e "\n${RED}⚠️  Found $errors error(s)${NC}"
        return 1
    fi
}

# Function to show file info
show_file_info() {
    local file="$1"
    echo -e "\n📄 File Information:"
    echo "  Path: $file"
    echo "  Size: $(du -h "$file" | cut -f1)"
    echo "  Modified: $(stat -c %y "$file" 2>/dev/null || stat -f %Sm "$file" 2>/dev/null)"
    
    if command -v jq &> /dev/null; then
        echo -e "\n📊 Content Summary:"
        
        # Detect file type and show relevant info
        case "$(basename "$file")" in
            artists.json)
                local count=$(jq 'length' "$file" 2>/dev/null || echo "?")
                echo "  Artists: $count"
                ;;
            services.json)
                local count=$(jq 'length' "$file" 2>/dev/null || echo "?")
                echo "  Services: $count"
                ;;
            *)
                echo "  Keys: $(jq 'keys | length' "$file" 2>/dev/null || echo "?")"
                ;;
        esac
    fi
}

# Main execution
main() {
    local file="${1:-}"
    local validate_only=false
    
    # Check for flags
    for arg in "$@"; do
        if [ "$arg" == "--validate-only" ]; then
            validate_only=true
        fi
    done
    
    # If no file specified, validate all
    if [ -z "$file" ]; then
        list_content_files
        validate_all
        exit $?
    fi
    
    # Resolve file path
    if [[ "$file" != /* ]]; then
        # Relative path - try data directory first
        if [ -f "$DATA_DIR/$file" ]; then
            file="$DATA_DIR/$file"
        elif [ -f "$REPO_ROOT/$file" ]; then
            file="$REPO_ROOT/$file"
        fi
    fi
    
    # Validate the file
    if ! validate_json "$file"; then
        exit 1
    fi
    
    # Show file info
    show_file_info "$file"
    
    if [ "$validate_only" == false ]; then
        echo -e "\n${GREEN}✅ File is valid and ready for use!${NC}"
        echo -e "\n💡 Tips:"
        echo "  • Always backup before making changes"
        echo "  • Validate after editing: ./scripts/update-content.sh $file --validate-only"
        echo "  • Use an editor with JSON syntax highlighting"
        echo "  • Test changes locally before deploying"
    fi
}

# Show usage if help requested
if [ "${1:-}" == "--help" ] || [ "${1:-}" == "-h" ]; then
    echo "Usage: ./scripts/update-content.sh [file] [options]"
    echo ""
    echo "Options:"
    echo "  --validate-only    Only validate, don't show tips"
    echo "  --help, -h         Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./scripts/update-content.sh                    # Validate all files"
    echo "  ./scripts/update-content.sh artists.json       # Validate specific file"
    echo "  ./scripts/update-content.sh data/about.json    # Validate with path"
    echo ""
    exit 0
fi

main "$@"
