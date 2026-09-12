#!/usr/bin/env bash
set -euo pipefail

echo "====================================================="
echo "[*] Maison Valencourt Atelier: Test Suite Runner"
echo "====================================================="

echo "[*] Checking TypeScript compilation..."
npx tsc --noEmit

echo "[*] Running Node test runner..."
npm test

echo "====================================================="
echo "[OK] All checks passed successfully."
echo "====================================================="
