import { Schema, Document, model } from 'mongoose'

const postSchema = new Schema({
  created: {
    type: Date
  },
  mensaje: {
    type: String
  },
  img: [{
    type: String
  }],
  coords: {
    type: String // 'lat, lon'
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'Debe existir una relación con un usuario']
  }
});

// Sería como un trigger que se dispara antes del 'save' en el Schema
postSchema.pre('save', function() {
  this.created = new Date();
  next();
});

interface IPost extends Document {
  created: Date;
  mensaje: string;
  img: string;
  coords: string;
  usuario: string;
}