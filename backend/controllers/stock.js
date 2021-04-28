
/* Variable donde se importa el modulo usuario */
let Stock = require("../modelo/stock");
/* Variable para importar la libreria encriptar pass */
let bcrypt = require("bcrypt-nodejs");

/* Funcion para registrar el usuario */
const registrarStock = (req, res) => {
  /* Sacamos los parametros del cuerpo de la API (ruta url) */
  let params = req.body;
  /* Utilizamos el modelo usuario */
  let stock = new Stock();
  /* Si llego el password procedemos hacer el hash (encriptar) */
  if (params.cantidad && params.idProducto) {
    /* Usamos el bcrypt para encriptar la contraseña */
    bcrypt.hash(params.pass, null, null, (err, hash) => {
      /* si se encripta registramos el usuario */
      if (hash) {
        stock.cantidad = params.cantidad;
        stock.idProducto = params.idProducto;
        /* Registramos los datos del usuario (los guardamos para enviarlos a mongo por el modelo) */
        stock.save((err, saveStock) => {
          if (err) {
            /* Si hay un error en el registro */
            res.status(500).send({ err: "No se registro el stock" });
          } else {
            /* Si el proceso se completo bien procedemos a guardar en el modelo los datos */
            res.status(200).send({ usuario: saveStock });
          }
        });
      }
    });
  } else {
    /* Damos respuesta con codigo HTTP de error y enviamos el error a consola */
    res.status(405).send({ err: "No se guardo un dato" });
  }
};
module.exports = {
registrarStock,
};