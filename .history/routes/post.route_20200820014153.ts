import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';


const postRoutes = Router();

postRoutes.post('/', verificaToken, (req: any, res: Response) => {
  const body = req.body;
  body.usuario = req.usuario._id;
  
  res.json({
    ok: true,
    body
  });
});


export default postRoutes;