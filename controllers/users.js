//users.controller

const {response} = require('express')

const bcrypt = require('bcryptjs')


const Usuario = require('../models/usuario');



const usersGet = async(req,res = response) =>{
    const { limite = 5, desde = 0} = req.query;
   

    const [total, usuario] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado :true})
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        usuario
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

const usersDelete = async (req,res = response) =>{
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({
        usuario
    })

}




module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}