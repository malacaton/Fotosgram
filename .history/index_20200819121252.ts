import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongose';

const server = new Server;

// Rutas de mi app
server.app.use('/user', userRoutes); // Asocia la ruta /user con userRoutes, que se ha importado arriba

// Conectar con DB


// Levantar express
server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});