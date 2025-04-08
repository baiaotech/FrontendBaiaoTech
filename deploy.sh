#!/bin/sh
export COMPOSE_BAKE=true
docker compose up --build -d && docker compose logs -f
