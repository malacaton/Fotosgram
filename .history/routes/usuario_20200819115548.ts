import { Router, Request, Response } from "express";

const userRoutes = Router();

userRoutes.get('/prueba', (req: Request, resp: Response) => {
  resp.json({
    ok: true,
    mensaje: 'Todo funciona bien'
  });
});