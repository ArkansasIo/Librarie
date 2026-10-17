import mysql, { Pool } from 'mysql2/promise';

export const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER ?? 'librarie',
  password: process.env.MYSQL_PASSWORD ?? 'librarie',
  database: process.env.MYSQL_DATABASE ?? 'librarie',
  waitForConnections: true,
  connectionLimit: Number(process.env.MYSQL_POOL_SIZE ?? 10),
  queueLimit: 0
});

export async function pingDatabase(): Promise<void> {
  await pool.query('SELECT 1');
}
