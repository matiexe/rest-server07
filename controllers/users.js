//users.controller

const {response} = require('express')

const bcrypt = require('bcryptjs')


const Usuario = require('../models/usuario');



const usersGet = async(req,res = response) =>{
    const { limite = 5, desde = 0} = req.query;
    const usuarios = await Usuario.find()
    .skip(Number(desde))
    .limit(Number(limite));
    res.json({
        usuarios
    })

}
const usersPost = async(req ,res = response) =>{
    
    const {nombre , correo, password, rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    //verificar si el correo existe
    /*const exisCorreo = await Usuario.findOne({correo});
    if(exisCorreo){
        return res.status(400).json({
            msg:"Correo registrado"
        })
    }*/

    
    //Encriptar
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt)
    //Guardar en bd
    await usuario.save()

    res.json({
        msg:'post API - controller',
        usuario
    })

}

const usersPut = async (req,res = response) =>{
    const id = req.params.id;
    const {_id,password, google,correo, ...resto} = req.body;

    // validar contra base de datos
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password,salt)
    }
    
    const usuariodb =  await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        usuariodb
    })

}

const usersDelete = (req,res = response) =>{
    const id = req.params.id;
    res.json({
        msg:'delete API - controller',
        id:id
    })

}




module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}