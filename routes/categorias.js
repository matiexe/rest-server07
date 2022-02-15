const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria } = require('../controllers/categoria');
const { existeCategoriaId } = require('../helpers/db.validators');


const { validarCampos , validarJWT } = require('../middlewares');

const router = Router();

//midleware persnaliado id check(id).custom(existeCategoria)
//obtener todas las categorias -- publico
router.get('/',obtenerCategorias)
//Obtener una categoria especifica --publico
router.get('/:id',[

    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
    

],obtenerCategoria)
//agregar una categoria -- privado
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos

],crearCategoria)
//Modificar una categoria --privado
router.put('/:id',(req,res)=>{
    res.json('put')
})

//Eliminar categoria admin
router.delete('/:id',(req,res)=>{
    res.json('delete')
})
module.exports = router;