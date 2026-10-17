import { Router } from 'express';
import { ResultSetHeader } from 'mysql2';
import { pool } from '../db';
import { requiredString, positiveInt } from '../validation';
export const inventoryRouter=Router();
inventoryRouter.get('/',async(_req,res,next)=>{try{const [rows]=await pool.query('SELECT i.*,b.title,b.isbn FROM inventory i JOIN books b ON b.id=i.book_id ORDER BY b.title,i.barcode');res.json(rows)}catch(e){next(e)}});
inventoryRouter.post('/',async(req,res,next)=>{try{const book_id=positiveInt(req.body.book_id,'book_id');const barcode=requiredString(req.body.barcode,'barcode');const [result]=await pool.execute<ResultSetHeader>('INSERT INTO inventory(book_id,barcode,shelf_location) VALUES(?,?,?)',[book_id,barcode,req.body.shelf_location??null]);res.status(201).json({id:result.insertId});}catch(e){next(e)}});
