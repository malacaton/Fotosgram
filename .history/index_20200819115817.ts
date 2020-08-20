import Server from './classes/server';
import userRoutes from './routes/usuario';

const server = new Server;

server.app.use('/user', userRoutes); // Asocia la ruta /user con userRoutes, que se ha importado arriba

// Levantar express
server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});