import 'dotenv/config';
import { pingDatabase, pool } from '../db';

async function run(): Promise<void> {
  const started = Date.now();
  await pingDatabase();
  const [rows] = await pool.query('SELECT COUNT(*) AS books FROM books');
  console.log(JSON.stringify({ job:'health', ok:true, duration_ms:Date.now()-started, result:rows }));
  await pool.end();
}
run().catch(async error => { console.error(error); await pool.end(); process.exit(1); });
