#!/bin/bash
# Start: loads Node via NVM, exports env vars, and launches the Angular dev server.
# Run after bootstrap to start working locally.

set -e

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

# Start dev server (uses environment.development.ts via fileReplacements)
echo "Starting Angular development server..."
ng serve --open
