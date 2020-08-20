import { FileUpload } from '../interfaces/file-upload';
import path from 'path'; // Es propio de Node, por lo que no hay que instalar nada más
import fs from 'fs'; // También viene con Node

export default class FileSystem {


  constructor() {};

  guardarImagenTemporal(file: FileUpload, userId: string) {
    const path = 
  }

  private crearCarpetaUsuario(userId: string) {
    // __dirname es una propiedad de Node, que indica la ruta completa de la carpeta dónde está este archivo
    const pathUser = path.resolve(__dirname, '../uploads/', userId);
    const pathUserTemp = `${pathUser}/temp`;
    console.log('pathUser', pathUser);
    console.log('pathUserTemp', pathUserTemp);
  }
}