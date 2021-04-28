/* Variable donde se importa el modulo usuario */
let Usuario = require("../modelo/usuario");
/* Variable para importar la libreria encriptar pass */
let bcrypt = require("bcrypt-nodejs");
/* Importamos jwt */
let jwt = require("../libs/jwt");

/* Funcion para registrar el usuario */
const registrarUsuario = (req, res) => {
  /* Sacamos los parametros del cuerpo de la API (ruta url) */
  let params = req.body;
  /* Utilizamos el modelo usuario */
  let usuario = new Usuario();
  /* Si llego el password procedemos hacer el hash (encriptar) */
  if (params.nombres && params.apellidos && params.edad && params.rol) {
    /* Usamos el bcrypt para encriptar la contraseña */
    bcrypt.hash(params.pass, null, null, (err, hash) => {
      /* si se encripta registramos el usuario */
      if (hash) {
        usuario.nombres = params.nombres;
        usuario.apellidos = params.apellidos;
        usuario.edad = params.edad;
        usuario.rol = params.rol;
        /* Registramos los datos del usuario (los guardamos para enviarlos a mongo por el modelo) */
        usuario.save((err, saveUsuario) => {
          if (err) {
            /* Si hay un error en el registro */
            res.status(500).send({ err: "No se registro el usuario" });
          } else {
            /* Si el proceso se completo bien procedemos a guardar en el modelo los datos */
            res.status(200).send({ usuario: saveUsuario });
          }
        });
      }
    });
  } else {
    /* Damos respuesta con codigo HTTP de error y enviamos el error a consola */
    res.status(405).send({ err: "No se guardo un dato" });
  }
};
/* Login */
const login = (req, res) => {
  /* Variable para los parametros que llegan */
  let params = req.body;
  /* Buscamos el usuario en BD */
  Usuario.findOne({ correo: params.correo }),
    (err, datosUsuario) => {
      if (err) {
        res.status(500).send({ mensaje: "Error del servidor" });
      } else {
        if (datosUsuario) {
          bcrypt.compare(params.pass, datosUsuario.pass, (err, confirm) => {
            if (confirm) {
              if (data.gettoken) {
                res.status(200).send({
                  jwt: jwt.createToken(datosUsuario),
                  Usuario: datosUsuario,
                });
              } else {
                res
                  .status(200)
                  .send({ Usuario: datosUsuario, mensaje: "Sin token" });
              }
            } else {
              res
                .status(401)
                .send({ mensaje: "Correo o pasword incorrectos " });
            }
          });
        } else {
          res.status(401).send({ mensaje: "correo o password incorrectos" });
        }
      }
    };
};
/* Exportamos el modulo */
module.exports = {
  registrarUsuario,
  login,
};
