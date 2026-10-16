import { Router } from 'express';
import { Pool } from 'mysql2/promise';
export function membersRouter(pool:Pool){const r=Router(); r.get('/',async(_req,res,next)=>{try{const [rows]=await pool.query('SELECT * FROM members ORDER BY last_name,first_name');res.json(rows)}catch(e){next(e)}}); return r;}
