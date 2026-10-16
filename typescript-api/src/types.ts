export type Book = { id:number; isbn:string; title:string; description?:string|null; published_year?:number|null };
export type Member = { id:number; member_number:string; first_name:string; last_name:string; email:string; phone?:string|null; status:'ACTIVE'|'SUSPENDED'|'CLOSED' };
export type InventoryItem = { id:number; book_id:number; barcode:string; circulation_status:'AVAILABLE'|'ON_LOAN'|'LOST'|'DAMAGED'; shelf_location?:string|null };
export type Loan = { id:number; inventory_id:number; member_id:number; checked_out_at:string; due_at:string; returned_at?:string|null; status:'OPEN'|'RETURNED'|'OVERDUE' };
