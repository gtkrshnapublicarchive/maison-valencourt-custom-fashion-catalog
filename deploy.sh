#!/usr/bin/env bash
set -euo pipefail

echo "====================================================="
echo "[*] Maison Valencourt Atelier: Initial Deployment"
echo "====================================================="

# 1. Environment file check
if [ ! -f .env ]; then
  echo "[*] Preparing .env from .env.example..."
  cp .env.example .env
fi

# 2. Build and start containers
echo "[*] Building and starting containerized services..."
docker compose up -d --build

# 3. Wait for PostgreSQL readiness
echo "[*] Awaiting PostgreSQL health readiness..."
until docker compose exec -T postgres pg_isready -U valencourt_user -d valencourt_db; do
  echo "[*] Waiting for database..."
  sleep 2
done
echo "[OK] PostgreSQL is healthy and accepting connections."

# 4. Prisma database schema push and migrations
echo "[*] Applying Prisma database schema..."
docker compose exec -T web npx prisma db push

# 5. Database seed execution
echo "[*] Seeding artisan catalog, textiles, and initial admin..."
docker compose exec -T web node prisma/seed.mjs || true

echo "====================================================="
echo "[OK] Maison Valencourt Atelier is successfully deployed!"
echo "     URL: http://localhost:3000"
echo "     Admin Portal: http://localhost:3000/admin"
echo "====================================================="
