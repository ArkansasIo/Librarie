import { Router } from 'express';
import { Pool } from 'mysql2/promise';
export function inventoryRouter(pool:Pool){const r=Router(); r.get('/',async(_req,res,next)=>{try{const [rows]=await pool.query(`SELECT i.*,b.title,b.isbn FROM inventory i JOIN books b ON b.id=i.book_id ORDER BY b.title`);res.json(rows)}catch(e){next(e)}}); return r;}
