#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
export PYTHONDONTWRITEBYTECODE=1

python3 -m unittest discover \
  --start-directory "$repo_root/tests/content" \
  --pattern 'test_*.py' \
  --verbose

if command -v node >/dev/null 2>&1; then
  node --check "$repo_root/src/guide-center/assets/app.js"
  node --check "$repo_root/src/guide-center/data/guides.js"
  node --check "$repo_root/src/guide-center/data/tools.js"
  node --check "$repo_root/src/guide-center/data/glossary.js"
  node --check "$repo_root/src/guide-center/data/intake.js"
else
  printf '%s\n' 'WARNING: node is unavailable; JavaScript syntax checks were not run.' >&2
fi
