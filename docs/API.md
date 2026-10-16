# API

Base URL: `http://localhost:3000/api`

- `GET /health`
- `GET /books?q=term`
- `GET /members`
- `GET /inventory`
- `GET /loans`
- `POST /books`
- `POST /members`
- `POST /inventory`
- `POST /loans/checkout` body `{inventory_id,member_id,due_days}`
- `POST /loans/:id/return`

All JSON errors should be treated as non-2xx API failures. Keep database credentials in environment variables or GitHub Actions secrets; never commit them.
