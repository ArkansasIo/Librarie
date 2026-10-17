USE librarie;

CREATE TABLE IF NOT EXISTS audit_log (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  entity_type VARCHAR(64) NOT NULL,
  entity_id BIGINT NULL,
  action VARCHAR(64) NOT NULL,
  details JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_audit_entity (entity_type,entity_id),
  INDEX idx_audit_created (created_at)
) ENGINE=InnoDB;
