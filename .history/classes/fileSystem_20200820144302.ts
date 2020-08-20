import { FileUpload } from '../interfaces/file-upload';
import path from 'path'; // Es propio de Node, por lo que no hay que instalar nada más
import fs from 'fs'; // También viene con Node
import uniqid from 'uniqid'; // instalarlo con 'npm install uniqid'

export default class FileSystem {


  constructor() {};

  guardarImagenTemporal(file: FileUpload, userId: string) {
    // Crear carpetas
    const path = this.crearCarpetaUsuario(userId);

    // Nombre del archivo
    const nombreArchivo = this.generarNombreUnico(file.name);
    console.log('file.name', file.name);
    console.log('nombreArchivo', nombreArchivo);
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
    const pathUser = path.resolve(__dirname, '../uploads/', userId);
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
}