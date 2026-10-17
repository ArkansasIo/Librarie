USE librarie;

CREATE INDEX idx_books_isbn_title ON books(isbn,title);
CREATE INDEX idx_members_name ON members(last_name,first_name);
CREATE INDEX idx_inventory_barcode_status ON inventory(barcode,circulation_status);
