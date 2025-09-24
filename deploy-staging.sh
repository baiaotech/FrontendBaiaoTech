#!/bin/sh
export COMPOSE_BAKE=true
docker compose -f docker-compose-staging.yml up --build -d && docker compose -f docker-compose-staging.yml logs -f
