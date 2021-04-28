/* Importamos express */
let express = require("express");
/* Importamos el controlador de categoria */
let Producto = require("../controllers/producto");

/* Creamos la api para controlar las rutas */
let api = express.Router();
/* Servicio POST (registrar) http://localhost:3001/api/registrarUsuario */
api.post("/registrarProducto", Producto.registrarProducto);
api.get("/buscarProducto/:id", Producto.buscarProducto);
api.get("/listaProducto/:nombre?", Producto.listaProducto);
api.post("/listaProducto/:nombre?", Producto.listaProducto);
api.put("/producto/editarProducto/:id", Producto.editarProducto);
api.delete("/producto/eliminarProducto/:id", Producto.eliminarProducto);
/* Exportamos el modulo */
module.exports = api;