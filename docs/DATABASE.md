# Database

MySQL 8.4 is the supported database. The canonical Docker initialization is `mysql/init/001_schema.sql` plus `mysql/seeds/001_development.sql`.

The migration directory contains equivalent SQL for manual deployments. Backups are produced by the scheduled GitHub Actions workflow with `mysqldump --single-transaction --routines --triggers`.

Set these secrets for scheduled jobs: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`.
