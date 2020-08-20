import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';

const userRoutes = Router();

// Crear un usuario
userRoutes.post('/create', (req: Request, res: Response) => {
  const user = {
    nombre   : req.body.nombre,
    email    : req.body.email,
    password : bcrypt.hashSync(req.body.password, 10), // Cifrar la contraseña
    avatar   : req.body.avatar
  };

  Usuario.create(user)
    .then(userDB => {
      res.json({
        ok: true,        
        user: userDB
      });
    }).catch(err => {
      res.json({
        ok: false,        
        err
      });
    });

});

export default userRoutes; // Indica que userRoutes será exportable y la podremos usar en otro módulo