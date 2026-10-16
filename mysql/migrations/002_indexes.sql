CREATE DATABASE IF NOT EXISTS librarie;
USE librarie;

CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_inventory_book_status ON inventory(book_id, circulation_status);
CREATE INDEX idx_loans_member_status ON loans(member_id, status);
CREATE INDEX idx_loans_due_status ON loans(due_at, status);
CREATE INDEX idx_fines_member_status ON fines(member_id, status);
