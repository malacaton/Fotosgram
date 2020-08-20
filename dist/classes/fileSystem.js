"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path")); // Es propio de Node, por lo que no hay que instalar nada más
const fs_1 = __importDefault(require("fs")); // También viene con Node
const uniqid_1 = __importDefault(require("uniqid")); // instalarlo con 'npm install uniqid'
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file, userId) {
        // Crear una promesa. las promesas tienen dos parámetros, el 'resolve', que se lan<ará cuando todo vaya bien
        // y se recibe con el .then, y el reject, que se lanzará cuando algo falle (se recibe en el .catch)
        return new Promise((resolve, reject) => {
            // Crear carpetas
            const path = this.crearCarpetaUsuario(userId);
            // Nombre del archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // Mover el archivo del temporal a nuestra parpeta /uploads/xxxxxxxxx/temp
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    // No se pudo mover
                    reject(err);
                }
                else {
                    // El fichero se movio bien
                    resolve();
                }
            });
        });
    }
    generarNombreUnico(nombreOriginal) {
        // Extraer extensión
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1]; //ultimo valor del array, que es lo que hay antes del último punto
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userId) {
        // __dirname es una propiedad de Node, que indica la ruta completa de la carpeta dónde está este archivo
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userId); // Si la barra separadora no se pone, '.resolve' ya la pone
        const pathUserTemp = `${pathUser}/temp`;
        console.log('pathUser', pathUser);
        console.log('pathUserTemp', pathUserTemp);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    imagenesDeTempHaciaPost(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp'); // Concatena los parámetros en forma de ruta, separados por '/'
        const pathPost = path_1.default.resolve(__dirname, '../uploads', userId, 'posts'); // Si la barra separadora no se pone, '.resolve' ya la pone
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(pathTemp);
        // Mover el archivo. Se hace cambiando el nomre
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(pathTemp) {
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getImagenUrl(userId, img) {
        // Apuntar el path de la imagen en los posts
        const pathImagen = path_1.default.resolve(__dirname, '../uploads', userId, 'posts', img);
        // Verificar si la imagen existe
        const existe = fs_1.default.existsSync(pathImagen);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        ;
        return pathImagen;
    }
}
exports.default = FileSystem;
