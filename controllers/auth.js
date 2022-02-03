const bcryptjs = require('bcryptjs');
const {response} = require('express')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');




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


const googleSingIn = async (req, res = response) =>{
    const{ id_token } = req.body;


    try {

        const {correo, name , picture} = await googleVerify( id_token )
        //console.log(googleUSer)
        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            const data = {
                nombre :name,
                correo,
                password : ' ',
                img : picture,
                rol: 'ADMIN_ROLE',
                google :true
            }
            usuario = new Usuario(data)
            await usuario.save();
        }

        console.log(usuario)
        if(!usuario.estado){
            return res.status(401).json({
                msg:'hable con el administrador'
            })
        }

        //Generar jwt
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: 'el token no se pudo verificar'
        })
    }
    
}


module.exports  = {
    login,
    googleSingIn
}