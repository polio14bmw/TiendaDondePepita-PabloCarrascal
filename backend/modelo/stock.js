/* Variable Mongoose */
let mongoose = require("mongoose")
/* Metodo que permite crear esquemas desde node/express */
let Schema = mongoose.Schema;
/* Se crea el esquema */
let stockSchema = Schema({
cantidad: Number,
idProducto:String
})
/* Se exporta el modulo */
module.exports = mongoose.model("stock", stockSchema);