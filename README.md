# Librarie — Library Management System

A mobile-friendly, full-stack library management system using TypeScript/Express, MySQL 8.4, Java/Spring Boot, Docker, GitHub Actions, and a browser/PWA frontend.

## Features

- Book catalog and search
- Physical inventory/barcodes
- Members
- Transaction-safe checkout and returns
- Overdue loan processing and fines
- MySQL views, procedures, triggers, indexes, and audit schema
- Hourly health and overdue jobs
- Daily compressed database backups
- OpenAPI specification
- Responsive mobile web UI and PWA service worker
- Development and production Docker Compose configurations
- Optional Java/Spring Boot service

## Quick start

```bash
docker compose up -d
```

The API is available at `http://localhost:3000/api/health` and the web application at `http://localhost:3000/` when served through the API container configuration.

For local TypeScript development:

```bash
cd typescript-api
npm install
npm run build
npm run dev
```

## Configuration

Copy `.env.example` to `.env` and replace development passwords. Never commit `.env`.

Scheduled GitHub Actions require these repository secrets:

- `MYSQL_HOST`
- `MYSQL_PORT`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`

## Operations

```bash
make build
make up
make health
make overdue
make backup
```

See `docs/API.md`, `docs/DATABASE.md`, `docs/ARCHITECTURE.md`, and `openapi.yaml` for details.

## Repository

`ArkansasIo/Librarie`
