#!/usr/bin/env bash
set -euo pipefail

echo "====================================================="
echo "[*] Maison Valencourt Atelier: Zero-Friction Redeployment"
echo "====================================================="

ACTIVE_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "[*] Current branch: ${ACTIVE_BRANCH}"

echo "[*] Tearing down running containers..."
docker compose down

echo "[*] Triggering fresh deploy pipeline..."
bash deploy.sh

echo "====================================================="
echo "[OK] Redeployment complete on branch ${ACTIVE_BRANCH}."
echo "====================================================="
