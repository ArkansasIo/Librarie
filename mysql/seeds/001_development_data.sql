USE librarie;
INSERT IGNORE INTO books (isbn,title,description,published_year) VALUES
('9780132350884','Clean Code','A Handbook of Agile Software Craftsmanship',2008),
('9781449373320','Designing Data-Intensive Applications','The Big Ideas Behind Reliable, Scalable, and Maintainable Systems',2017),
('9780262046305','Introduction to Algorithms','Algorithms reference and textbook',2022);

INSERT IGNORE INTO members (member_number,first_name,last_name,email) VALUES
('M-0001','Alex','Morgan','alex@example.com'),
('M-0002','Jordan','Lee','jordan@example.com');

INSERT IGNORE INTO inventory (book_id,barcode,shelf_location)
SELECT id,'BC-0001','A-01' FROM books WHERE isbn='9780132350884';
INSERT IGNORE INTO inventory (book_id,barcode,shelf_location)
SELECT id,'BC-0002','A-02' FROM books WHERE isbn='9781449373320';
INSERT IGNORE INTO inventory (book_id,barcode,shelf_location)
SELECT id,'BC-0003','A-03' FROM books WHERE isbn='9780262046305';
