import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
  nombre: {
    type: String, // En mayúsculas porque esto no es javascript, es Mongoose, y así lo define Mongoose
    required: [ true, 'El nombre es requerido' ]
  },
  avatar: {
    type: String,
    default: 'av-1.png'
  },
  email: {
    type: String,
    unique: true,
    required: [ true, 'El correo es requerido' ]
  },
  password: {
    type: String,
    required: [ true, 'La contraseña es requerida' ]
  }
});

usuarioSchema.method('compararPassword', function(password: string = ''): boolean {
  if (bcrypt.compareSync(password, this.password)) {
    return true;    
  } else {
    return false;
  }

interface IUsuario extends Document {
    nombre   : string;
    avatar?  : string;
    email    : string,
    password : string
};

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);