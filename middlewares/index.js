const validarCampos = require('../middlewares/validar-campos');
const validarJWT    = require('../middlewares/validar-jsonwebtoken');
const validarRoles  = require('../middlewares/validar-rol');
const validarArchivosubir = require('../middlewares/validar-archivo')



module.exports = {  
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivosubir
    
};
