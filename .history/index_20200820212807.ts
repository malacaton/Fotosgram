import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario.route';
import postRoutes from './routes/post.route';

import cors from 'cors';

const server = new Server;


// Body parser: Configura como vendrá el body. En este caso indicamos que será un json. 'extended' no sé que hace
server.app.use( bodyParser.urlencoded( {extended: true}) );
server.app.use( bodyParser.json() );


// FileUpload (Express)
server.app.use( fileUpload({ useTempFiles: true }) ); // useTempFile es para cuando FileUpload crea ficheros xon 0 bytes


// Para CORS
server.app.use(cors({ origin: true, credentials: true }) );

// -- ALTERNATIVA SIN IMPORTAR NI USAR CORS
// ------------------------------------------------
// server.app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


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