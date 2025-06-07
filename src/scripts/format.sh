#!/bin/sh

# Run formatting and linting tools
# In CI mode, we only check without making changes
# In local mode, we fix issues where possible

set -e

if [ "$CI" = "true" ]; then
  # CI mode: check only
  prettier --log-level=error . && \
  knip && \
  madge --circular --extensions ts,tsx . && \
  git ls-files -co --exclude-standard -- '*.sh' | xargs -r shellcheck && \
  sherif
else
 # Local mode: fix issues
  prettier --write --cache --log-level=error . && \
  knip && \
  madge --circular --extensions ts,tsx . && \
  git ls-files -co --exclude-standard -- '*.sh' | xargs -r shellcheck && \
  sherif --fix
fi 
