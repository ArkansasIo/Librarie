import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER ?? 'librarie',
  password: process.env.MYSQL_PASSWORD ?? 'librarie',
  database: process.env.MYSQL_DATABASE ?? 'librarie',
  connectionLimit: 10
});

app.get('/api/health', async (_req,res) => {
  try { await pool.query('SELECT 1'); res.json({ok:true,service:'librarie-api'}); }
  catch { res.status(503).json({ok:false}); }
});

app.get('/api/books', async (req,res) => {
  const q = String(req.query.q ?? '').trim();
  const [rows] = await pool.query(
    `SELECT b.*, COUNT(i.id) total_copies,
       SUM(i.circulation_status='AVAILABLE') available_copies
     FROM books b LEFT JOIN inventory i ON i.book_id=b.id
     WHERE (?='' OR b.title LIKE CONCAT('%',?,'%') OR b.isbn LIKE CONCAT('%',?,'%'))
     GROUP BY b.id ORDER BY b.title`, [q,q,q]);
  res.json(rows);
});

app.post('/api/books', async (req,res) => {
  const {isbn,title,description,published_year} = req.body;
  if (!title) return res.status(400).json({error:'title is required'});
  const [result] = await pool.execute(
    'INSERT INTO books(isbn,title,description,published_year) VALUES (?,?,?,?)',
    [isbn ?? null,title,description ?? null,published_year ?? null]);
  res.status(201).json({id:(result as mysql.ResultSetHeader).insertId});
});

app.get('/api/members', async (_req,res) => {
  const [rows] = await pool.query('SELECT * FROM members ORDER BY last_name,first_name');
  res.json(rows);
});

app.post('/api/members', async (req,res) => {
  const {member_number,first_name,last_name,email,phone} = req.body;
  if (!member_number || !first_name || !last_name) return res.status(400).json({error:'member_number, first_name and last_name are required'});
  const [result] = await pool.execute(
    'INSERT INTO members(member_number,first_name,last_name,email,phone) VALUES (?,?,?,?,?)',
    [member_number,first_name,last_name,email ?? null,phone ?? null]);
  res.status(201).json({id:(result as mysql.ResultSetHeader).insertId});
});

app.get('/api/inventory', async (_req,res) => {
  const [rows] = await pool.query(`SELECT i.*,b.title FROM inventory i JOIN books b ON b.id=i.book_id ORDER BY b.title,i.barcode`);
  res.json(rows);
});

app.post('/api/inventory', async (req,res) => {
  const {book_id,barcode,shelf_location} = req.body;
  if (!book_id || !barcode) return res.status(400).json({error:'book_id and barcode are required'});
  const [result] = await pool.execute('INSERT INTO inventory(book_id,barcode,shelf_location) VALUES (?,?,?)',[book_id,barcode,shelf_location ?? null]);
  res.status(201).json({id:(result as mysql.ResultSetHeader).insertId});
});

app.get('/api/loans', async (_req,res) => {
  const [rows] = await pool.query(`SELECT l.*,i.barcode,b.title,m.member_number,m.first_name,m.last_name FROM loans l JOIN inventory i ON i.id=l.inventory_id JOIN books b ON b.id=i.book_id JOIN members m ON m.id=l.member_id ORDER BY l.checked_out_at DESC`);
  res.json(rows);
});

app.post('/api/loans/checkout', async (req,res) => {
  const {inventory_id,member_id,due_days=14} = req.body;
  if (!inventory_id || !member_id) return res.status(400).json({error:'inventory_id and member_id are required'});
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [invRows] = await conn.query('SELECT * FROM inventory WHERE id=? FOR UPDATE',[inventory_id]);
    const inv = (invRows as any[])[0];
    if (!inv) throw new Error('Inventory item not found');
    if (inv.circulation_status !== 'AVAILABLE') throw new Error('Inventory item is not available');
    const [memRows] = await conn.query('SELECT * FROM members WHERE id=? FOR UPDATE',[member_id]);
    const mem = (memRows as any[])[0];
    if (!mem || mem.status !== 'ACTIVE') throw new Error('Member is not active');
    const [result] = await conn.execute('INSERT INTO loans(inventory_id,member_id,due_at) VALUES(?,?,DATE_ADD(NOW(), INTERVAL ? DAY))',[inventory_id,member_id,Number(due_days)]);
    await conn.execute("UPDATE inventory SET circulation_status='ON_LOAN' WHERE id=?",[inventory_id]);
    await conn.commit();
    res.status(201).json({id:(result as mysql.ResultSetHeader).insertId});
  } catch (e) { await conn.rollback(); res.status(400).json({error:e instanceof Error ? e.message : 'Checkout failed'}); }
  finally { conn.release(); }
});

app.post('/api/loans/:id/return', async (req,res) => {
  const id = Number(req.params.id); const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [rows] = await conn.query('SELECT * FROM loans WHERE id=? FOR UPDATE',[id]);
    const loan = (rows as any[])[0];
    if (!loan || loan.returned_at) throw new Error('Loan not found or already returned');
    await conn.execute("UPDATE loans SET returned_at=NOW(), status='RETURNED' WHERE id=?",[id]);
    await conn.execute("UPDATE inventory SET circulation_status='AVAILABLE' WHERE id=?",[loan.inventory_id]);
    await conn.commit(); res.json({ok:true});
  } catch(e) { await conn.rollback(); res.status(400).json({error:e instanceof Error ? e.message : 'Return failed'}); }
  finally { conn.release(); }
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`Librarie API listening on ${port}`));
