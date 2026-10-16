USE librarie;

DROP PROCEDURE IF EXISTS sp_mark_overdue;
DELIMITER $$
CREATE PROCEDURE sp_mark_overdue()
BEGIN
  UPDATE loans SET status='OVERDUE' WHERE status='OPEN' AND due_at < NOW();
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_create_overdue_fines;
DELIMITER $$
CREATE PROCEDURE sp_create_overdue_fines()
BEGIN
  INSERT INTO fines(member_id, loan_id, amount, status)
  SELECT l.member_id, l.id,
         GREATEST(DATEDIFF(NOW(), l.due_at), 0) * 1.00,
         'OPEN'
  FROM loans l
  WHERE l.status='OVERDUE'
    AND NOT EXISTS (SELECT 1 FROM fines f WHERE f.loan_id=l.id AND f.status='OPEN');
END$$
DELIMITER ;
