# Librarie — Library Management System

Full-stack library management foundation using TypeScript/Express, MySQL, Java/Spring Boot, and a browser AJAX frontend.

## Components
- TypeScript REST API
- MySQL schema, migrations, views, procedures, triggers, and development seed data
- Book/catalog and inventory management
- Members and loans with checkout/return workflows
- Java Spring Boot integration service
- Browser admin/login pages
- Docker Compose development database

## API
- `GET /api/health`
- `GET /api/books`
- `POST /api/books`
- `GET /api/members`
- `POST /api/members`
- `GET /api/inventory`
- `POST /api/inventory`
- `GET /api/loans`
- `POST /api/loans/checkout`
- `POST /api/loans/:id/return`

## Database
Run the MySQL initialization scripts in `mysql/migrations` followed by `mysql/seeds/001_development_data.sql`.

## Status
Initial project structure committed to GitHub. Additional application modules can be added incrementally.
