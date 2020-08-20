import Server from './classes/server';

const server = new Server;

server.app.use('/user', userRoutes); // Asocia la ruta /user con userRoutes

// Levantar express
server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});