#!/bin/bash
# Bootstrap: installs Node.js via NVM and project npm dependencies.
# Run once when setting up a new dev environment.

set -e

NODE_VERSION="22"

# Install NVM (Node Version Manager)
if [ ! -d "$HOME/.nvm" ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

# Install Node.js
nvm install ${NODE_VERSION}
nvm use ${NODE_VERSION}

# Install Angular CLI globally
npm install -g @angular/cli

# Install project dependencies
npm install

echo "Dev environment ready. Run './dev-init.sh' to start the project."
