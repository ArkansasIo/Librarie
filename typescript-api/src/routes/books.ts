import { Router } from 'express';
import { Pool } from 'mysql2/promise';
export function booksRouter(pool:Pool){const r=Router(); r.get('/',async(req,res,next)=>{try{const q=String(req.query.q||'').trim();const [rows]=await pool.query('SELECT * FROM books WHERE title LIKE ? OR isbn LIKE ? ORDER BY title',[`%${q}%`,`%${q}%`]);res.json(rows)}catch(e){next(e)}}); return r;}
