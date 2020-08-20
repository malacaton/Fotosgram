import jwt from 'jsonwebtoken';

export default class Token {
  private static seed: string = 'este-es-el-seed-de-mi-app';
  private static caducidad: string = '30d';

  constructor() {

  }

  static getJwtToken(payload: any): string {
    return jwt.sign({
      usuario:   payload
    });
  }
}