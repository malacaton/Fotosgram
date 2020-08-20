import { Router, Request, Response } from "express";

const userRoutes = Router();

userRoutes.post('/create', (req: Request, resp: Response) => {
  const user = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password
  }

  resp.json({
    ok: true,
    mensaje: 'Usuario creado correctamente'
  });
});

export default userRoutes; // Indica que userRoutes será exportable y la podremos usar en otro módulo