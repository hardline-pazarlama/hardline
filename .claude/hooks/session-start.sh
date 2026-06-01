#!/bin/bash
set -euo pipefail

# SessionStart hook: install the Firecrawl CLI so it is available in
# Claude Code on the web sessions.
#
# The Firecrawl API key is a secret and is NOT stored in the repo.
# Configure FIRECRAWL_API_KEY as an environment variable / secret in your
# Claude Code on the web environment settings. This hook only reads it.

# Only run in the remote (Claude Code on the web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install the Firecrawl CLI globally (idempotent).
if ! command -v firecrawl >/dev/null 2>&1; then
  npm install -g firecrawl-cli
fi

# Surface the API key to the session if it was provided as a secret.
if [ -n "${FIRECRAWL_API_KEY:-}" ]; then
  echo "export FIRECRAWL_API_KEY=\"${FIRECRAWL_API_KEY}\"" >> "$CLAUDE_ENV_FILE"
  echo "Firecrawl CLI ready (FIRECRAWL_API_KEY detected)."
else
  echo "Firecrawl CLI installed, but FIRECRAWL_API_KEY is not set." >&2
  echo "Add it as a secret in your Claude Code on the web environment settings." >&2
fi
