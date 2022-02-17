const { Router } = require('express');
const { check  } = require('express-validator');
const { cargaDeArchivo } = require('../controllers/upload');

const router = Router()

router.post('/' , cargaDeArchivo);


module.exports = router