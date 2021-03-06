/* Importamos express */
let express = require("express");
/* Importamos el controlador de categoria */
let Usuario = require("../controllers/usuario");
/* Creamos la api para controlar las rutas */
let api = express.Router();
/* Servicio POST (registrar) http://localhost:3001/api/registrarUsuario */
api.post("/registrarUsuario", Usuario.registrarUsuario);
// Servicio para el login
api.post("/login", Usuario.login);
/* Exportamos el modulo */
module.exports = api;