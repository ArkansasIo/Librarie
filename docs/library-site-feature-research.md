# Librarie — Library Website Feature Research

Research date: 2026-10-17

## Reference products and systems

### Open Library / Internet Archive
- Universal book metadata/catalog model.
- Clear availability actions: Read, Borrow, or preview depending on rights/access.
- Browser-based BookReader for online reading.
- Search-inside for digital books.
- Reading Log, reading lists, notes, public profile, and reading statistics.
- Audio listening support.
- Links to trusted external providers when Open Library does not host the content.

Sources: https://openlibrary.org/help/faq/about, https://openlibrary.org/help/faq/reading, https://openlibrary.org/tour

### WorldCat Discovery
- One search across formats and collections.
- Filters by format, date, location, and other qualifiers.
- Relevance/sort controls.
- Open-access resources surfaced in discovery.
- Responsive access on phones and tablets.
- Staff-facing metadata and interlibrary-loan workflows.

Source: https://www.oclc.org/en/worldcat-discovery/features.html

### Libby
- Browse by new, popular, and available titles.
- Curated lists, staff picks, featured collections, and guides.
- Tags for saved titles.
- Holds/availability notifications.
- Separate reading and audiobook experiences.
- “Notify Me” workflow for titles not currently offered.

Source: https://help.libbyapp.com/en-us/6289.htm

### BiblioCommons-style catalogs
- Account login for holds, renewals, and interactive features.
- Usernames in addition to library-card credentials.
- Ratings/reviews and social discovery features.
- Search and recently acquired/reviewed discovery.

Sources: https://help.bibliocommons.com/hc/en-us/articles/31741227778196-Registration, https://help.bibliocommons.com/hc/en-us/articles/31741804526612-Logging-In

## Features to add to Librarie

### Priority 1 — Core discovery
1. Advanced search with title, author, ISBN, genre, subject, year, format, availability, and language.
2. Faceted filters and sorting.
3. Book detail pages with cover, description, authors, genres, editions, availability, and digital formats.
4. Read / Borrow / Preview actions based on rights and circulation state.
5. New, popular, staff picks, featured collections, and recently added shelves.

### Priority 2 — Reader experience
6. Full-screen responsive web reader.
7. EPUB, PDF, HTML, and TXT support.
8. Chapter/table-of-contents navigation.
9. Search inside book.
10. Reading progress and resume position.
11. Font size, line spacing, margins, and light/dark/sepia themes.
12. Keyboard and mobile navigation.
13. Text-to-speech/read-aloud integration where supported by the browser and content rights.
14. Accessibility: semantic HTML, keyboard navigation, focus states, reduced motion, high contrast, and screen-reader labels.

### Priority 3 — Personal library account
15. My Library dashboard.
16. Current loans, due dates, renewals, and returns.
17. Holds/reservations and queue position.
18. Reading list / wishlist.
19. Reading history and statistics.
20. Notes and bookmarks.
21. Saved searches.
22. Notifications for holds, due dates, new books, and requested titles.

### Priority 4 — Library operations
23. Barcode scanner workflow.
24. Checkout/return/renewal.
25. Automatic overdue/fine calculation.
26. Inventory status and shelf location.
27. Acquisition requests and purchase suggestions.
28. Interlibrary-loan request tracking.
29. Staff/admin dashboard.
30. Audit log and role-based permissions.

### Priority 5 — Digital collections and interoperability
31. Rights-aware digital content records.
32. External trusted-provider links for content Librarie does not own or license.
33. Public-domain/licensed collection flagging.
34. Audiobook metadata and audio player.
35. Accessible/DAISY-format metadata where applicable.
36. MARC/OCLC-style bibliographic metadata fields for future interoperability.
37. OpenAPI endpoints for catalog and circulation integrations.
38. Import/export for catalog and reading-list data.

### Priority 6 — Community and discovery
39. Ratings and reviews with moderation.
40. Author pages and related-book discovery.
41. Genre/subject landing pages.
42. “Readers also liked” recommendations.
43. Book clubs and reading challenges.
44. Events calendar and program listings.
45. Announcements/news/blog section.

## Recommended Librarie roadmap

### Release A
Catalog + advanced search + filters + book details + availability + responsive reader.

### Release B
Accounts + loans + renewals + holds + reading lists + notifications.

### Release C
Recommendations + reviews + audiobooks + events + digital collections.

### Release D
Interlibrary loan + metadata interoperability + external trusted providers + analytics.

## Important architecture decision

GitHub Pages remains the static frontend. Browser requests go to the HTTPS TypeScript API. The API owns authentication, authorization, catalog queries, circulation, and digital-content access. MySQL remains authoritative for structured catalog/circulation data. Digital files are stored separately and referenced by `book_files`; the browser never receives MySQL credentials.

For Librarie's original books, the full manuscripts can be stored in each book package. Third-party copyrighted books should only be linked or served when Librarie has the necessary rights.
