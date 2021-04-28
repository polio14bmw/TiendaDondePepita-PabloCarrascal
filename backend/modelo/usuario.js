/* Variable Mongoose */
let mongoose = require("mongoose")
/* Metodo que permite crear esquemas desde node/express */
let Schema = mongoose.Schema;

/* Se crea el esquema */
let usuarioSchema = Schema({
    nombres: String,
    apellidos: String,
    edad: Number,
    rol: String
})
/* Se exporta el modulo */
module.exports = mongoose.model("usuario", usuarioSchema);