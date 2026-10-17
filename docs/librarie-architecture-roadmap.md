# Librarie Architecture & Feature Roadmap

## Product scope
Librarie is a full library-management and digital-library platform, not only a catalog.

## Frontend
- GitHub Pages static frontend
- Responsive Facebook-inspired light-blue/white design
- Catalog discovery and faceted search
- Book detail pages
- Online reader
- My Library
- Accessibility controls
- Collections, recommendations, reviews, and notifications

## API
TypeScript + Express is the secure application boundary between browsers and MySQL.

Core API areas:
- `/api/books`
- `/api/books/:id`
- `/api/books/:id/content`
- `/api/authors`
- `/api/genres`
- `/api/members`
- `/api/loans`
- `/api/reservations`
- `/api/fines`
- `/api/inventory`
- `/api/notifications`
- `/api/reviews`
- `/api/recommendations`
- `/api/acquisitions`
- `/api/reports`

The browser never connects directly to MySQL.

## Digital book packages
Each original book uses a stable package ID:

```text
books/
  BK-000001/
    metadata.json
    cover.jpg
    documents/
      book.html
      book.txt
      book.epub
      book.pdf
```

The same pattern continues through `BK-000050`.

## Original collection
Exactly 50 original books are planned:
- 10 Fantasy
- 10 Science Fiction
- 10 Mystery/Thriller
- 10 Adventure
- 10 Horror

Writing style: a blend of classic atmosphere and modern, cinematic readability. All manuscripts will be original Librarie content rather than copies of copyrighted works.

## Core database domains
- Books and editions
- Authors
- Genres and subjects
- Digital files and access levels
- Inventory and barcodes
- Members
- Loans, returns, renewals
- Reservations/holds
- Fines
- Reviews and ratings
- Reading progress/bookmarks
- Notifications
- Acquisitions
- Audit records
- Reports

## Feature roadmap
### Discovery
Advanced search, filters, sorting, availability, collections, featured/popular titles, related books, author and genre pages.

### Circulation
Checkout, return, renew, holds, due dates, fines, barcode workflows, member history.

### Digital library
EPUB/PDF/HTML/TXT delivery, browser reader, chapters, search-inside, font controls, themes, bookmarks, progress, accessibility, and controlled downloads.

### Member experience
Accounts, My Library, reading history, lists, reviews, recommendations, notifications, and saved searches.

### Library operations
Acquisitions, purchase requests, inventory, reporting, staff administration, permissions, and audit logs.

### Interoperability
MARC/OCLC-style metadata import/export and external trusted-provider links for content Librarie is not authorized to host.

## Security
- No database credentials in GitHub Pages
- API-mediated content access
- CORS allow-list
- HTTPS in production
- Authentication and role-based authorization
- Rate limiting and audit logging
- Digital-content access policy

## Deployment
GitHub Pages serves the static frontend. The TypeScript API and MySQL service run separately. Docker Compose remains available for local development and integration testing.
