import jwt from 'jsonwebtoken';

export default class Token {
  private static seed: string = 'este-es-el-seed-de-mi-app';
  private static caducidad: string = '30d'; // En la documentación de JWT se indica el formato de estos datos

  constructor() {

  }

  static getJwtToken(payload: any): string {
    return jwt.sign(
                    {usuario: payload}, 
                    this.seed, 
                    {expiresIn: this.caducidad}
    );
  }

  static comprobarToken(userToken: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(userToken, this.seed, (err, decoded) => {
        if (err) {
          // No confiar
          reject();
        } else {
          // Token válido
          resolve(decoded);
        }
      });
    });
  }
}