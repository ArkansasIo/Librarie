import { Router } from 'express';
import { ResultSetHeader } from 'mysql2';
import { pool } from '../db';
import { requiredString } from '../validation';

export const membersRouter = Router();
membersRouter.get('/', async (_req,res,next)=>{try{const [rows]=await pool.query('SELECT * FROM members ORDER BY last_name,first_name');res.json(rows)}catch(e){next(e)}});
membersRouter.post('/', async (req,res,next)=>{try{const member_number=requiredString(req.body.member_number,'member_number');const first_name=requiredString(req.body.first_name,'first_name');const last_name=requiredString(req.body.last_name,'last_name');const [result]=await pool.execute<ResultSetHeader>('INSERT INTO members(member_number,first_name,last_name,email,phone) VALUES(?,?,?,?,?)',[member_number,first_name,last_name,req.body.email??null,req.body.phone??null]);res.status(201).json({id:result.insertId});}catch(e){next(e)}});
