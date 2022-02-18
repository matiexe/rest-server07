const { Router } = require('express');
const { check  } = require('express-validator');
const { cargaDeArchivo, actualizarArchivo } = require('../controllers/upload');
const { validarColecciones } = require('../helpers');
const { validarCampos } = require('../middlewares');

const router = Router()

router.post('/' , cargaDeArchivo);

router.put('/:coleccion/:id',[
    check('id','El id deber ser valido').isMongoId(),
    check('coleccion').custom(c=>validarColecciones(c,['usuarios','productos'])),
    validarCampos

],actualizarArchivo)


module.exports = router