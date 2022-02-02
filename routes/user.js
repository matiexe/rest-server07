//users.routes

const {Router} = require('express');
const {check} = require('express-validator');


const { usersGet, usersDelete, usersPut, usersPost } = require('../controllers/users');
const { esRolValido, existeEmail, esUsuarioId } = require('../helpers/db.validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jsonwebtoken');
// const { esAdminRol, tieneRol } = require('../middlewares/validar-rol');
const {validarCampos,validarJWT,esAdminRol,tieneRol} = require('../middlewares')
const router = Router();

router.get('/',usersGet)
router.delete('/:id',[
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROLE','VENTA_ROL'),
    check('id', 'No es un id valido').isMongoId(),
    
    validarCampos
],usersDelete)
router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(esUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos
],usersPut)
router.post('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener como minimo 6 caracteres').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],usersPost)





module.exports = router