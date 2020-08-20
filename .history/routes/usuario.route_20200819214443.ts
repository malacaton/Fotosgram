import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../dist/classes/token';

const userRoutes = Router();

// Login
userRoutes.post('/login', (req: Request, res: Response) => {
  const body = req.body;
  Usuario.findOne({email: body.email}, (err, userDb) => {
    if (err) throw err;

    if (!userDb) {
      return res.json({
        ok: false,
        mensaje: 'Usuario/contraseña inválido   *(email)*'
      });
    }

    if (userDb.compararPassword(body.password)) {
      const tokenUser = Token.getJwtToken({
        _id: uderDB._id,
        nombre: userDb.compararPassword,
        email: userDb.email,
        avatar: userDb.avatar
      })

      res.json({
        ok: true,
        token: 'ABCDEFAFADSFASDFASDFAWEFAWEFAWE'
      })
    } else {
      res.json({
        ok: true,
        mensaje: 'Usuario/contraseña inválido   *(password)*'
      })
    }
    

  });
});


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