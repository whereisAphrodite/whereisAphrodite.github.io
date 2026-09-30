#!/bin/bash
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")/.."
if ! command -v npm >/dev/null; then
  printf 'Install Node.js from https://nodejs.org, then open this file again.\n'
  read -r -p 'Press Return to close. '
  exit 1
fi
if [ ! -d node_modules ]; then npm ci; fi
# ponytail: poll this small blog to avoid macOS watch limits; use native watching if the source tree grows large.
npm start -- --open
