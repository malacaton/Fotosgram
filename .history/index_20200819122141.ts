import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';

const server = new Server;

// Rutas de mi app
server.app.use('/user', userRoutes); // Asocia la ruta /user con userRoutes, que se ha importado arriba

// Conectar con DB
mongoose.connect('mongodb://localhost:27017/fotosgram',
  { useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;
    console.log('Base de datos online');
  }
)

// Levantar express
server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});