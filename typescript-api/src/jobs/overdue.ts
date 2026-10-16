import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool=mysql.createPool({host:process.env.MYSQL_HOST||'localhost',port:Number(process.env.MYSQL_PORT||3306),user:process.env.MYSQL_USER||'librarie',password:process.env.MYSQL_PASSWORD||'librarie',database:process.env.MYSQL_DATABASE||'librarie',connectionLimit:4});

async function run(){
  await pool.query('UPDATE loans SET status=\'OVERDUE\' WHERE status=\'OPEN\' AND due_at < NOW()');
  await pool.query(`INSERT INTO fines(member_id,loan_id,amount,status)
    SELECT l.member_id,l.id,GREATEST(DATEDIFF(NOW(),l.due_at),0)*1.00,'OPEN'
    FROM loans l WHERE l.status='OVERDUE'
    AND NOT EXISTS(SELECT 1 FROM fines f WHERE f.loan_id=l.id AND f.status='OPEN')`);
  const [rows]=await pool.query('SELECT COUNT(*) AS overdue FROM loans WHERE status=\'OVERDUE\'');
  console.log(JSON.stringify({job:'overdue-loans',at:new Date().toISOString(),result:rows}));
  await pool.end();
}
run().catch(async e=>{console.error(e);await pool.end();process.exit(1)});
