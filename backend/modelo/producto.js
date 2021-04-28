/* Variable Mongoose */
let mongoose = require("mongoose")
/* Metodo que permite crear esquemas desde node/express */
let Schema = mongoose.Schema;
/* Se crea el esquema */
let productoSchema = Schema({
    nombreProducto: String,
    descripcion: String,
    precio: Number,
})
/* Se exporta el modulo */
module.exports = mongoose.model("producto", productoSchema);