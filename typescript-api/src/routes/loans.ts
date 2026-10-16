import { Router } from 'express';
import { Pool } from 'mysql2/promise';
export function loansRouter(pool:Pool){const r=Router(); r.get('/',async(_req,res,next)=>{try{const [rows]=await pool.query('SELECT * FROM v_active_loans ORDER BY due_at');res.json(rows)}catch(e){next(e)}}); return r;}
