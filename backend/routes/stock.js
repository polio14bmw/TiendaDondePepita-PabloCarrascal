/* Importamos express */
let express = require("express");
/* Importamos el controlador de categoria */
let Stock = require("../controllers/stock");
/* Creamos la api para controlar las rutas */
let api = express.Router();
/* Servicio POST (registrar) http://localhost:3001/api/registrarUsuario */
api.post("/registrarStock", Stock.registrarStock);
/* Exportamos el modulo */
module.exports = api;