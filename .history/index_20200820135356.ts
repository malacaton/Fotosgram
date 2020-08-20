import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario.route';
import postRoutes from './routes/post.route';

const server = new Server;

// Body parser: Configura como vendrá el body. En este caso indicamos que será un json. 'extended' no sé que hace
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json() );

// Rutas de mi app
server.app.use('/user', userRoutes); // Asocia la ruta /user con userRoutes, que se ha importado arriba
server.app.use('/posts', postRoutes); 

// Conectar con DB
mongoose.connect('mongodb://localhost:27017/fotosgram',
  { useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    console.log('err', err);
    if (err) throw err;
    console.log('Base de datos ONLINE');
  }
)

// Levantar express
server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});