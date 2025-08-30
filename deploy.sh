#!/bin/sh
export COMPOSE_BAKE=true

docker compose down -v
docker system prune -a --volumes -f
docker compose --build --no-cache
docker compose up -d
docker compose logs -f