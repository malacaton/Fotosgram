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

})