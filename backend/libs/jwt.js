/*Variable donde importamos el jwt */
let jwt = require("jwt-simple");
/* Importamos librerias para fechas */
let moment = require("moment");
/* Clave secreta */
let secret = "bit21store"
/* Exportamos el token generado enviando los datos de usuario */
exports.createToken = (usuario) => {
    let payload = {
        _id: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        edad: usuario.edad,
        rol: usuario.rol,
        iat: moment().unix(),
        /* Exp: moment.add(10, "days").unix() */
    };
    /* Se retorna el token codificado */
    return jwt.encode(payload, secret);
};
