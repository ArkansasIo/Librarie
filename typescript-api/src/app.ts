import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'node:path';
import { pool } from './db';

export const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, service: 'librarie-api' });
  } catch {
    res.status(503).json({ ok: false, service: 'librarie-api' });
  }
});

app.get('/api/books', async (req, res, next) => {
  try {
    const q = String(req.query.q ?? '').trim();
    const [rows] = await pool.query(
      `SELECT b.*, COUNT(i.id) AS total_copies,
              COALESCE(SUM(i.circulation_status='AVAILABLE'),0) AS available_copies
       FROM books b LEFT JOIN inventory i ON i.book_id=b.id
       WHERE (?='' OR b.title LIKE CONCAT('%',?,'%') OR b.isbn LIKE CONCAT('%',?,'%'))
       GROUP BY b.id ORDER BY b.title`, [q, q, q]
    );
    res.json(rows);
  } catch (e) { next(e); }
});

app.get('/api/members', async (_req, res, next) => {
  try { const [rows] = await pool.query('SELECT * FROM members ORDER BY last_name, first_name'); res.json(rows); }
  catch (e) { next(e); }
});

app.get('/api/inventory', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(`SELECT i.*, b.title FROM inventory i JOIN books b ON b.id=i.book_id ORDER BY b.title,i.barcode`);
    res.json(rows);
  } catch (e) { next(e); }
});

app.get('/api/loans', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(`SELECT l.*,i.barcode,b.title,m.member_number,m.first_name,m.last_name
      FROM loans l JOIN inventory i ON i.id=l.inventory_id JOIN books b ON b.id=i.book_id JOIN members m ON m.id=l.member_id
      ORDER BY l.checked_out_at DESC`);
    res.json(rows);
  } catch (e) { next(e); }
});

app.use(express.static(path.resolve(process.env.WEB_ROOT ?? '../web')));

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
