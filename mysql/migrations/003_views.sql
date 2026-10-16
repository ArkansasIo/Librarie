USE librarie;

CREATE OR REPLACE VIEW v_book_catalog AS
SELECT b.id, b.isbn, b.title, b.description, b.published_year,
       COUNT(i.id) AS copies,
       SUM(i.circulation_status = 'AVAILABLE') AS available_copies
FROM books b LEFT JOIN inventory i ON i.book_id=b.id
GROUP BY b.id, b.isbn, b.title, b.description, b.published_year;

CREATE OR REPLACE VIEW v_active_loans AS
SELECT l.id, l.member_id, m.member_number, m.first_name, m.last_name,
       l.inventory_id, b.title, i.barcode, l.checked_out_at, l.due_at,
       CASE WHEN l.due_at < NOW() THEN 'OVERDUE' ELSE l.status END AS current_status
FROM loans l
JOIN members m ON m.id=l.member_id
JOIN inventory i ON i.id=l.inventory_id
JOIN books b ON b.id=i.book_id
WHERE l.status='OPEN';
