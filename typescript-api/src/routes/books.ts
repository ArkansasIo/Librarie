import { Router } from 'express';
import { ResultSetHeader } from 'mysql2';
import { pool } from '../db';
import { requiredString } from '../validation';

export const booksRouter = Router();

booksRouter.get('/', async (req, res, next) => {
  try {
    const q = String(req.query.q ?? '').trim();
    const [rows] = await pool.query(`SELECT b.*,COUNT(i.id) total_copies,COALESCE(SUM(i.circulation_status='AVAILABLE'),0) available_copies
      FROM books b LEFT JOIN inventory i ON i.book_id=b.id
      WHERE (?='' OR b.title LIKE CONCAT('%',?,'%') OR b.isbn LIKE CONCAT('%',?,'%'))
      GROUP BY b.id ORDER BY b.title`, [q,q,q]);
    res.json(rows);
  } catch (e) { next(e); }
});

booksRouter.post('/', async (req, res, next) => {
  try {
    const title = requiredString(req.body.title, 'title');
    const isbn = req.body.isbn == null ? null : requiredString(req.body.isbn, 'isbn');
    const [result] = await pool.execute<ResultSetHeader>('INSERT INTO books(isbn,title,description,published_year) VALUES(?,?,?,?)', [isbn,title,req.body.description ?? null,req.body.published_year ?? null]);
    res.status(201).json({ id: result.insertId });
  } catch (e) { next(e); }
});
