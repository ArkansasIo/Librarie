.PHONY: install build dev up down logs health overdue backup
install:
	cd typescript-api && npm install
build:
	cd typescript-api && npm run build

dev:
	cd typescript-api && npm run dev
up:
	docker compose up -d

down:
	docker compose down
logs:
	docker compose logs -f
health:
	cd typescript-api && npm run job:health
overdue:
	cd typescript-api && npm run job:overdue
backup:
	mkdir -p backups
	docker compose exec -T mysql sh -c 'mysqldump -u"$$MYSQL_USER" -p"$$MYSQL_PASSWORD" "$$MYSQL_DATABASE"' > backups/librarie.sql
