import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';


const postRoutes = Router();

postRoutes.post('/', verificaToken, (req: any, res: Response) => {
  const body = req.body;
  
  res.json({
    ok: true
  });
});


export default postRoutes;