"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../dist/classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = express_1.Router();
// Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    // Función de Mongoose que busca un objeto dentro de la colección 'Usuario'
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña inválido   *(email)*'
            });
        }
        if (userDB.compararPassword(body.password)) {
            // Crear token con los datos en la BD
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser // retornar token creado
            });
        }
        else {
            res.json({
                ok: true,
                mensaje: 'Usuario/contraseña inválido   *(password)*'
            });
        }
    });
});
// Crear un usuario
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    // Función de Mongoose que crea un objeto dentro de la colección Usuario
    usuario_model_1.Usuario.create(user)
        .then(userDB => {
        // Crear token con los datos recibidos
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUser // retornar token creado
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// Actualizar usuario
// 'verificaToken' es un middleware. Si hay varios, se ponen entre [] así: [verificaToken, middleware2, ...]
userRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    // Función de Mongoose para actualizar. Primero lo busca y si lo encuentra lo modifica:
    //   - 'req.usuario' lo ha establecido el middleware 'vefificaToken', y retorna un objeto
    //     de la colección 'Usuario' que tiene un '_id'
    //   - '{new: true} hace que la llamada retorne el nuevo registro ya modificado'
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'El usuario con ese ID no existe'
            });
        }
        // Crear token con los mnuevos datos ya que el anterior ya no debería ser válido
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUser // retornar el nuevo token
        });
    });
});
userRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});
exports.default = userRoutes; // Indica que userRoutes será exportable y la podremos usar en otro módulo
