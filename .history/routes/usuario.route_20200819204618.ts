import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';

const userRoutes = Router();

userRoutes.post('/create', (req: Request, resp: Response) => {
  const user = {
    nombre   : req.body.nombre,
    email    : req.body.email,
    password : req.body.password
  };

  Usuario.create(user)
    .then(userDB => {
      resp.json({
        ok: true,        
        user
      });
    });

});

export default userRoutes; // Indica que userRoutes será exportable y la podremos usar en otro módulo