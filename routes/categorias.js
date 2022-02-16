const { Router } = require('express');
const { check } = require('express-validator');
const { JWT } = require('google-auth-library');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categoria');
const { existeCategoriaId } = require('../helpers/db.validators');


const { validarCampos , validarJWT } = require('../middlewares');

const router = Router();

//ENDPOINT QUE OBTIENE TODAS LAS CATEGORIAS --- NO REQUIERE TOKEN
router.get('/',obtenerCategorias)

//ENDPOINT QUE MUESTRA CATEGORIA POR ID --- NO  REQUIERE TOKEN
router.get('/:id',[

    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
],obtenerCategoria)

//ENDPOINT PARA CREAR CATEGORIA --- REQUIERE TOKEN 
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//ENDPOINT DE ACTUALIZACION DE CATEGORIA --- REQUIERE TOKEN
router.put('/:id',[
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
],actualizarCategoria)

//ENDPOINT PARA BORRAR CATEGORIA --- REQUIERE TOKEN
router.delete('/:id',[
    validarJWT,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
],eliminarCategoria)
module.exports = router;