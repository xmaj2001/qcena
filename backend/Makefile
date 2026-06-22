COMPOSE_FILE=docker-compose.yml

all: build up

build:
	docker compose -f $(COMPOSE_FILE) build

infra:
	docker compose -f $(COMPOSE_FILE) up -d redis

up:
	docker compose -f $(COMPOSE_FILE) up -d

clean:
	docker compose -f $(COMPOSE_FILE) down

mata:
	docker compose -f $(COMPOSE_FILE) down -v

fclean:
	docker compose -f $(COMPOSE_FILE) down -v --rmi all --remove-orphans

logs:
	docker compose -f $(COMPOSE_FILE) logs -f backend

redis-logs:
	docker compose -f $(COMPOSE_FILE) logs -f redis

nginx-certs:
	@bash ./nginx/tools/generate-certs.sh

re: clean build up

database-studio:
	docker compose -f $(COMPOSE_FILE) exec backend npx prisma studio