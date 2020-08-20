import Server from './classes/server';
import userRouter from './routes/usuario';

const server = new Server;

server.app.use('/user', userRouter); // Asocia la ruta /user con userRoutes

// Levantar express
server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});