"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const server = new server_1.default;
// Body parser: Configura como vendrá el body. En este caso indicamos que será un json. 'extended' no sé que hace
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload (Express)
server.app.use(express_fileupload_1.default({ useTempFiles: true })); // useTempFile es para cuando FileUpload crea ficheros xon 0 bytes
// Rutas de mi app
server.app.use('/user', usuario_route_1.default); // Asocia la ruta /user con userRoutes, que se ha importado arriba
server.app.use('/posts', post_route_1.default);
// Conectar con DB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    console.log('err', err);
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
