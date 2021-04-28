/* Variable donde se importa el modulo usuario */
let Producto = require("../modelo/producto");
/* Variable para importar la libreria encriptar pass */
let bcrypt = require("bcrypt-nodejs");

/* Funcion para registrar el usuario */
const registrarProducto = (req, res) => {
    /* Sacamos los parametros del cuerpo de la API (ruta url) */
    let params = req.body;
    /* Utilizamos el modelo usuario */
    let producto = new Producto();
    /* Si llego el password procedemos hacer el hash (encriptar) */
    if (params.nombreProducto && params.descripcion && params.precio ) {
      /* Usamos el bcrypt para encriptar la contraseña */
      bcrypt.hash(params.pass, null, null, (err, hash) => {
        /* si se encripta registramos el usuario */
        if (hash) {
          producto.nombreProducto = params.nombreProducto;
          producto.descripcion = params.descripcion;
          producto.precio = params.precio;
          /* Registramos los datos del usuario (los guardamos para enviarlos a mongo por el modelo) */
          producto.save((err, saveProducto) => {
            if (err) {
              /* Si hay un error en el registro */
              res.status(500).send({ err: "No se registro el usuario" });
            } else {
              /* Si el proceso se completo bien procedemos a guardar en el modelo los datos */
              res.status(200).send({ usuario: saveProducto });
            }
          });
        }
      });
    } else {
      /* Damos respuesta con codigo HTTP de error y enviamos el error a consola */
      res.status(405).send({ err: "No se guardo un dato" });
    }
  };
/* Buscar producto */
const buscarProducto = (req, res) => {
    /* Obtenemos el id del producto */
    let id = req.params["id"];
    /* Buscamos la categoria por el ID */
    Producto.findById({_id:id}, (err, datosProducto) => {
        /* Si hay error al conectar con mongo*/
        if (err) {
            res.status(500).send({mensaje: "Error al conectar al servidor"});
        } else {
            if (datosProducto) {
                res.status(200).send({producto: datosProducto});
            } else {
                res.status(401).send({mensaje: "La categoria no existe"});
            }
        }
    });
};
/* Listar productos con o sin filtro  */
const listaProducto = (req, res) => {
    /* Si tenemos filtro nombre lo guardamos */
    let nombre = req.params["nombre"];
    /* Busqueda de los productos*/
    Producto.find({nombre: new RegExp(nombre, "i") }, (err, datosProducto) => {
        /* Si hay error al conectar en mongo */
        if (err) {
            res.status(500).send({
                mensaje: "Error al conectar al servidor"
            });
        } else {
            if (datosProducto) {
                res.status(200).send({
                    producto: datosProducto
                });
            } else {
                res.status(401).send({
                    mensaje: "No hay producto"
                });
            }
        }
   });
    };

    /* Editar producto. */
    const editarProducto = (req, res) => {
        /* Obtenemos el id de la categoria */
        let id = req.params["id"]
        /* Obtenemos los datos que llegan de la API */
        let params = req.body;
        /* Buscar la categoria por ID, y editarla */
        Producto.findByIdAndUpdate(
            {_id:id},
            {producto: params.producto},
            { nombreProducto: params.nombreProducto},
            {descripcion: params.descripcion},
            {precio: params.precio},
            (err, datosProducto) => {
                /* Si hay error al conectar en mongo */
                if (err) {
                    res.status(500).send({
                        mensaje: "Error al conectar al servidor"
                    });
                } else {
                    if (datosProducto) {
                        res.status(200).send({
                            categoria: datosProducto
                        });
                    } else {
                        res.status(401).send({
                            mensaje: "La categoria no se pudo editar"
                        })
                    }
                }
            }
        );
    };

    /* Eliminamos uan categoria */
    const eliminarProducto = (req, res) => {
        /* Obtener el id de la categoria */
        let id = req.params["id"];
        /* Eliminamos la categoria por el ID */
        Producto.findByIdAndDelete(
            {_id: id},
            (err, datosProducto) => {
                /* Si hay error al conectar en mongo */
                if (err) {
                    res.status(500).send({
                        mensaje: "Error al conectar al servidor"
                    });
                } else {
                    if (datosProducto) {
                        res.status(200).send({
                            producto: datosProducto
                        })
                    } else {
                        res.status(401).send({
                            mensaje: "El producto no se pudo editar"
                        })
                    }
                }
            }
        );
    };
    
    module.exports = {
        registrarProducto,
        buscarProducto,
        listaProducto,
        editarProducto,
        eliminarProducto,
    }
    
