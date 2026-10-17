# Architecture

## Runtime

- Browser/PWA frontend: `web/`
- TypeScript API: `typescript-api/`
- MySQL 8.4 persistence: `mysql/`
- Optional Java/Spring Boot integration: `java-service/`
- CI and scheduled operations: `.github/workflows/`

## Data flow

Browser -> Express API -> MySQL.

The API uses transactions for checkout and return operations. Inventory rows are locked during checkout to prevent two concurrent checkouts from acquiring the same copy.

## Operations

The hourly overdue job marks expired loans and creates open fines. The hourly health workflow checks database connectivity. The daily backup workflow creates a compressed `mysqldump` artifact.
