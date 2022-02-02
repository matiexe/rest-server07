const bcryptjs = require('bcryptjs');
const {response} = require('express')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt')




const login = async (req,res = response) =>{

    const {correo , password} = req.body
    

    try {


        //Se verifica que el correo del usuario exista
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/password no son correctos'
            })
        }
        //Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'El usuario no existe'
            })
        }
        //Verificar la contrasenia
        const validPassword= bcryptjs.compareSync(password ,usuario.password) 
        if(!validPassword){
            return res.status(400).json({
                msg:'usuario /password incorrecto'
            })
        }

        //Generar jwt
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login ok',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }
}

module.exports  = {
    login
}