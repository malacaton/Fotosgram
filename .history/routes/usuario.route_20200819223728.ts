import { Router, Request, Response, request } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../dist/classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

// Login
userRoutes.post('/login', (req: Request, res: Response) => {
  const body = req.body;

  // Función de Mongoose que busca un objeto dentro de la colección 'Usuario'
  Usuario.findOne({email: body.email}, (err, userDB) => {
    if (err) throw err;

    if (!userDB) {
      return res.json({
        ok: false,
        mensaje: 'Usuario/contraseña inválido   *(email)*'
      });
    }

    if (userDB.compararPassword(body.password)) {
      // Crear token con los datos en la BD
      const tokenUser = Token.getJwtToken({
        _id: userDB._id,
        nombre: userDB.nombre,
        email: userDB.email,
        avatar: userDB.avatar
      });

      res.json({
        ok: true,
        token: tokenUser // retornar token creado
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

  // Función de Mongoose que crea un objeto dentro de la colección Usuario
  Usuario.create(user)
    .then(userDB => {
      // Crear token con los datos recibidos
      const tokenUser = Token.getJwtToken({
        _id: userDB._id,
        nombre: userDB.nombre,
        email: userDB.email,
        avatar: userDB.avatar
      });

      res.json({
        ok: true,
        token: tokenUser // retornar token creado
      })
    }).catch(err => {
      res.json({
        ok: false,        
        err
      });
    });

});

// Actualizar usuario
// 'verificaToken' es un middleware. Si hay varios, se ponen entre [] así: [verificaToken, middleware2, ...]
userRoutes.post('/update', verificaToken, (req: any, res: Response) => {
  const user = {
    nombre: req.body.nombre,
    email: req.body.email,
    avatar: req.body.avatar
  }

  // Función de Mongoose para actualizar. Primero lo busca y si lo encuentra lo modifica:
  //   - 'req.usuario' lo ha establecido el middleware 'vefificaToken', y retorna un objeto
  //     de la colección 'Usuario' que tiene un '_id'
  //   - '{new: true} hace que la llamada retorne el nuevo registro ya modificado'
  Usuario.findByIdAndUpdate(req.usuario._id, user, {new: true}, (err, userDB) => {
    if (err) throw err;

    if (!userDB) {
      return res.json({
        ok: false, 
        mensaje: 
      });
    }
  });

  res.json({
    ok: true,
    usuario: req.usuario
  });
});

export default userRoutes; // Indica que userRoutes será exportable y la podremos usar en otro módulo