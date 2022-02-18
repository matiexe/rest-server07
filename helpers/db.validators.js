const { Categoria, Producto } = require('../models');
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

const existeCategoriaId = async (id) =>{

    const categoria = await Categoria.findById(id)
    if(!categoria){
       throw new Error(`El id no existe ${ id }`);
    }

} 

const existeProductoId = async (id) =>{

    const producto = await Producto.findById(id)
    if(!producto){
        throw new Error(`El id no existe ${ id }`);
    }
}

const validarColecciones =  (coleccion = ' ',colecciones = []) =>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`la coleccion ${coleccion} no esta permitida`);
    }
    return true;
}


module.exports = {
    esRolValido,
    existeEmail,
    esUsuarioId,
    existeCategoriaId,
    existeProductoId,
    validarColecciones
}