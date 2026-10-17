USE librarie;

CREATE TABLE IF NOT EXISTS book_files (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  book_id BIGINT UNSIGNED NOT NULL,
  format ENUM('EPUB','PDF','HTML','TXT') NOT NULL,
  relative_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  access_level ENUM('PUBLIC','MEMBER','STAFF') NOT NULL DEFAULT 'PUBLIC',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_book_file_path (book_id, relative_path),
  INDEX idx_book_files_book_format (book_id, format),
  CONSTRAINT fk_book_files_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
) ENGINE=InnoDB;
