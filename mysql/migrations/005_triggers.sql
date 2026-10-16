USE librarie;

DROP TRIGGER IF EXISTS trg_loan_return;
DELIMITER $$
CREATE TRIGGER trg_loan_return AFTER UPDATE ON loans
FOR EACH ROW
BEGIN
  IF NEW.returned_at IS NOT NULL AND OLD.returned_at IS NULL THEN
    UPDATE inventory SET circulation_status='AVAILABLE' WHERE id=NEW.inventory_id;
  END IF;
END$$
DELIMITER ;
