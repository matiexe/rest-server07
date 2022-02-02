const validarCampos = require('../middlewares/validar-campos');
const validarJWT    = require('../middlewares/validar-jsonwebtoken');
const validarRoles  = require('../middlewares/validar-rol');



module.exports = {  
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
    
};
