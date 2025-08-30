#!/bin/sh
set -e

docker compose down -v || true
docker system prune -af --volumes

docker compose build --no-cache
docker compose up -d
docker compose logs -f frontend
