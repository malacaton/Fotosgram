import {Response, Request, NextFunction} from 'express'
import Token from '../dist/classes/token';

export const verificaToken = (req: Request, res: Response, next: NextFunction) => {
  const userToken = req.get('x-token') || '';
  Token.comprobarToken(userToken)
    .then(decoded => {
      console.log('Decoded', decoded)
      req.usuario = decoded.usuario;
    });
}