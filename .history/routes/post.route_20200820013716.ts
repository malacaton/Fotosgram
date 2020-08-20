import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';


const postRloutss = Router();

postRoutes.post('/', verificaToken, (req: any, res: Response) => {
  res.json({
    ok: true
  });
});


export default postRoutes;