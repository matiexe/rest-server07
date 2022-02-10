const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


//obtener todas las categorias -- publico
router.get('/',(req,res)=>{
    res.json('todo ok')
})
//Obtener una categoria especifica --publico
router.get('/:id',(req,res)=>{
    res.json('post')
})
//agregar una categoria -- privado
router.post('/',(req,res)=>{
    res.json('post')
})
//Modificar una categoria --privado
router.put('/:id',(req,res)=>{
    res.json('put')
})

//Eliminar categoria admin
router.delete('/:id',(req,res)=>{
    res.json('delete')
})
module.exports = router;