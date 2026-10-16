import { Router } from 'express';
export function createIndexRouter(){const r=Router(); r.get('/health',(_req,res)=>res.json({ok:true,service:'librarie-api'})); return r;}
