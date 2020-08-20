"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes = express_1.Router();
userRoutes.get('/prueba', (req, resp) => {
    resp.json({
        ok: true,
        mensaje: 'Todo funciona bien'
    });
});
exports.default = userRoutes; // Indica que userRoutes será exportable y la podremos usar en otro módulo
