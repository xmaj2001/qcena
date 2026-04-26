COMPOSE_FILE=docker-compose.yml

all: build up

build: nginx-certs
	docker compose -f $(COMPOSE_FILE) build

up:
	docker compose -f $(COMPOSE_FILE) up -d

clean:
	docker compose -f $(COMPOSE_FILE) down

mata:
	docker compose -f $(COMPOSE_FILE) down

fclean:
	docker compose -f $(COMPOSE_FILE) down -v --rmi all --remove-orphans
	docker image prune -af

logs:
	docker compose -f $(COMPOSE_FILE) logs -f web-backend

frontend-logs:
	docker compose -f $(COMPOSE_FILE) logs -f web-client

nginx-logs:
	docker compose -f $(COMPOSE_FILE) logs -f nginx

nginx-certs:
	@bash ./nginx/tools/generate-certs.sh

re: clean build

database-studio:
	docker compose -f $(COMPOSE_FILE) exec web-backend npx prisma studio
