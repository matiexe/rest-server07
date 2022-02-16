//PRODUCTOS.ROUTES

const { Router } = require('express');
const { check  } = require('express-validator');
const { obtenerProductos, crearProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeCategoriaId, existeProductoId } = require('../helpers/db.validators');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');


const router = Router();


//ENDPOINT PARA OBTENER TODOS LOS PRODUCTOS --- PUBLICO
router.get('/',obtenerProductos);

//ENDPOINT PARA OBTBER UN PRODUCTO POR SU ID
router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
],obtenerProducto);

//ENDPOINT PARA CREAR PRODUCTOS --- REQUIERE TOKEN
router.post('/',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('categoria').custom(existeCategoriaId),
    validarCampos
],crearProductos);

//ENDPOINT PARA ACTUALIZAR UN PRODUCTO
router.put('/:id',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoId),
    validarCampos
],actualizarProducto);

//ENDPOINT PARA ELIMINAR UN PRODUCTO
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id').custom(existeProductoId),
    validarCampos
],eliminarProducto);


module.exports = router;