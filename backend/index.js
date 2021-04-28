/* Variables de modulos (importamos librerias) */
let express = require("express")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")
/* Variable para puerto de conexion del servidor */
let port = process.env.PORT || 3001;
/* Variable de la aplicacion que ejecuta el server */
let app = express();

/* Routes */
let usuarioRoutes = require("./routes/usuario");
let productoRoutes = require("./routes/producto");
let stockRoutes = require("./routes/stock")


// Conexion a DB
mongoose.connect(
    "mongodb://localhost:27017/TiendaDondePepita",
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, res) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        console.log("Servidor DB: ON");
        app.listen(port, function () {
          console.log("Servidor Backend funcionando en el puerto :" + port);
        });
      }
    }
  );
/* Analizar la codificacion de la url */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/* Usar las rutas */
app.use("/api",usuarioRoutes)
app.use("/api",productoRoutes)
app.use("/api",stockRoutes)

/* Creamos modulo para importar */
module.exports = app;