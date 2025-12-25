#!/bin/bash

# Aria Amore Website - Local Testing Server
# This script starts a simple HTTP server for local testing

PORT=${1:-8000}
BROWSER="${2:-}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Aria Amore Website - Local Testing Server${NC}"
echo -e "${YELLOW}Starting server on http://localhost:$PORT${NC}"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
  echo -e "${GREEN}✅ Using Python3${NC}"
  python3 -m http.server $PORT
elif command -v python &> /dev/null; then
  echo -e "${GREEN}✅ Using Python${NC}"
  python -m SimpleHTTPServer $PORT
elif command -v npx &> /dev/null; then
  echo -e "${GREEN}✅ Using http-server (Node.js)${NC}"
  npx http-server -p $PORT
else
  echo -e "${YELLOW}⚠️  No suitable server found${NC}"
  echo "Please install Python 3, Node.js, or http-server"
  exit 1
fi

echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
