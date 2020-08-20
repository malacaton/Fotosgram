import { Schema, Document, model } from 'mongoose'

interface IPost extends Document {
  created: Date;
  mensaje: string;
  img: string[];
  coords: string;
  usuario: string;
}

const postSchema = new Schema({
  created: {
    type: Date
  },
  mensaje: {
    type: String
  },
  imgs: [{
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
postSchema.pre<IPost>('save', function( next)  {
  this.created = new Date();
  next();
});

export const Post = model<IPost>('Post', postSchema);