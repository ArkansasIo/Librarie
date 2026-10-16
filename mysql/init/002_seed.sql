USE librarie;
INSERT INTO books(isbn,title,description,published_year) VALUES('9780132350884','Clean Code','A Handbook of Agile Software Craftsmanship',2008),('9781449373320','Designing Data-Intensive Applications','Reliable, Scalable, and Maintainable Systems',2017),('9780262046305','Introduction to Algorithms','Algorithms reference',2022) ON DUPLICATE KEY UPDATE title=VALUES(title);
INSERT INTO members(member_number,first_name,last_name,email,status) VALUES('M-0001','Alex','Morgan','alex@example.com','ACTIVE'),('M-0002','Jordan','Lee','jordan@example.com','ACTIVE') ON DUPLICATE KEY UPDATE status=VALUES(status);
INSERT IGNORE INTO inventory(book_id,barcode,circulation_status,shelf_location) SELECT id,'BC-0001','AVAILABLE','A-01' FROM books WHERE isbn='9780132350884';
INSERT IGNORE INTO inventory(book_id,barcode,circulation_status,shelf_location) SELECT id,'BC-0002','AVAILABLE','A-02' FROM books WHERE isbn='9781449373320';
INSERT IGNORE INTO inventory(book_id,barcode,circulation_status,shelf_location) SELECT id,'BC-0003','AVAILABLE','A-03' FROM books WHERE isbn='9780262046305';
