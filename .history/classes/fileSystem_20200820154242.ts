import { FileUpload } from '../interfaces/file-upload';
import path from 'path'; // Es propio de Node, por lo que no hay que instalar nada más
import fs from 'fs'; // También viene con Node
import uniqid from 'uniqid'; // instalarlo con 'npm install uniqid'

export default class FileSystem {


  constructor() {};

  guardarImagenTemporal(file: FileUpload, userId: string) {
    // Crear una promesa. las promesas tienen dos parámetros, el 'resolve', que se lan<ará cuando todo vaya bien
    // y se recibe con el .then, y el reject, que se lanzará cuando algo falle (se recibe en el .catch)
    return new Promise((resolve, reject) => {
          // Crear carpetas
          const path = this.crearCarpetaUsuario(userId);
      
          // Nombre del archivo
          const nombreArchivo = this.generarNombreUnico(file.name);
      
          // Mover el archivo del temporal a nuestra parpeta /uploads/xxxxxxxxx/temp
          file.mv(`${path}/${nombreArchivo}`, (err: any) => {
            if (err) {
              // No se pudo mover
              reject(err);
            } else {
              // El fichero se movio bien
              resolve();
            }
          });
    });
  }

  private generarNombreUnico(nombreOriginal: string) {
    // Extraer extensión
    const nombreArr = nombreOriginal.split('.');
    const extension = nombreArr[nombreArr.length - 1]; //ultimo valor del array, que es lo que hay antes del último punto

    const idUnico = uniqid();

    return `${idUnico}.${extension}`;
  }

  private crearCarpetaUsuario(userId: string) {
    // __dirname es una propiedad de Node, que indica la ruta completa de la carpeta dónde está este archivo
    const pathUser = path.resolve(__dirname, '../uploads/', userId); // Si la barra separadora no se pone, '.resolve' ya la pone
    const pathUserTemp = `${pathUser}/temp`;
    console.log('pathUser', pathUser);
    console.log('pathUserTemp', pathUserTemp);

    const existe = fs.existsSync(pathUser);
    if (!existe) {
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathUserTemp);
    }

    return pathUserTemp;
  }

  imagenesDeTempHaciaPost(userId: string) {
    const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp'); // Concatena los parámetros en forma de ruta, separados por '/'
    const pathPost = path.resolve(__dirname, '../uploads', userId, 'posts'); // Si la barra separadora no se pone, '.resolve' ya la pone

    if (!fs.existsSync(pathTemp)) {
      return [];
    }

    if (!fs.existsSync(pathPost)) {
      fs.mkdirSync(pathPost);
    }

    const imagenesTemp = this.obtenerImagenesEnTemp(pathTemp);

    // Mover el archivo. Se hace cambiando el nomre
    imagenesTemp.forEach(imagen => {
      fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`)
    })

  }

  private obtenerImagenesEnTemp(pathTemp: string) {
    return fs.readdirSync(pathTemp) || [];
  }
}