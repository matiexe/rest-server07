//users.routes

const {Router} = require('express');
const {check} = require('express-validator');
const { usersGet, usersDelete, usersPut, usersPost } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');
const role = require('../models/role');
const router = Router();

router.get('/',usersGet)
router.delete('/:id',usersDelete)
router.put('/:id',usersPut)
router.post('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener como minimo 6 caracteres').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(async(rol = '')=>{
        const existeRol = await role.findOne({rol});
        if(!existeRol){
            throw new Error('El rol no es valido')
        }
    }),
    validarCampos
],usersPost)





module.exports = router