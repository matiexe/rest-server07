//users.controller

const {response} = require('express')

const bcrypt = require('bcryptjs')


const Usuario = require('../models/usuario');



const usersGet = (req,res = response) =>{
    const {q,nombre,apikey} = req.query;
    res.json({
        msg:'get API - controller',
    })

}
const usersPost = async(req ,res = response) =>{
    
    const {nombre , correo, password, rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    //verificar si el correo existe
    const exisCorreo = await Usuario.findOne({correo});
    if(exisCorreo){
        return res.status(400).json({
            msg:"Correo registrado"
        })
    }
    
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

const usersPut = (req,res = response) =>{
    const id = req.params.id;
    
    
    res.json({
        msg:'put API - controller',
        id:id
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