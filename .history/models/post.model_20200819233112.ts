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
  }]

})