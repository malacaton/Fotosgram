import { Router, Request, Response } from "express";

const userRoutes = Router();

userRoutes.post('/create', (req: Request, resp: Response) => {
    

  resp.json({
    ok: true,
    mensaje: 'Usuario creado correctamente'
  });
});

export default userRoutes; // Indica que userRoutes será exportable y la podremos usar en otro módulo