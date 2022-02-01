const role = require('../models/role')
const Usuario = require('../models/usuario')


const esRolValido = async( rol = '') =>{

        const existeRol = await role.findOne({rol});
        if(!existeRol){
            throw new Error('El rol no es valido')
        }

}
const existeEmail = async(correo = '')=>{
    const exisCorreo = await Usuario.findOne({correo});
    if(exisCorreo){
        throw new Error(`El correo : ${ correo }, ya esta registrado`);
    }

}
const esUsuarioId = async( id = '') =>{

    const existeId = await role.findById({id});
    if(!existeId){
        throw new Error('El id no existe')
    }

}
module.exports = {
    esRolValido,
    existeEmail,
    esUsuarioId
}