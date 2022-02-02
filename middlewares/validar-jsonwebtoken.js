const { response } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async(req , res = response,next) =>{
    const token = req.header('x-api-key')
    console.log(token);

    
    if(!token){

        return res.status(401).json({
            msg : 'no esta autorizado'
        })
    }
    try {

        const { uid } = jwt.verify(token,process.env.SECRETKEY)

        const usuario = await Usuario.findById( uid );

        //verificar que usuario que se logea no esta eliminado
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Usuario no encontrados'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
}



module.exports ={

    validarJWT
}