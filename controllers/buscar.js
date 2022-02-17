const { response } = require("express");
const { Usuario, Producto, Categoria } = require("../models");
const categoria = require("../models/categoria");
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]
//METODO PARA BUSCAR USUARIOS
const buscarUsuarios = async (termino = ' ',res = response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        res.json({
            results : ( usuario ) ? [ usuario ]: []
        })
    }
    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    });
    res.json({
        results : ( usuarios ) ? [ usuarios ]: []
    })
}

//METODO PARA BUSCAR PRODUCTOS
const buscarProductos = async (termino = ' ' ,res = response)=>{
    const esMongoID = ObjectId.isValid(termino);
    if(esMongoID){
        const producto = await Producto.findById(termino);
        res.status(200).json({
            results : ( producto )?[ producto ]: []
        })
    }

    const regex = new RegExp(termino,'i');
    const productos = await Producto.find({nombre:regex})

    res.status(200).json({
        results:(productos)?[productos]:[]
    })
}

//METODO PARA BUSCAR CATGORIAS
const buscarCategorias = async ( termino = '' , res = response)=>{
    const esMongoID = ObjectId.isValid(termino);
    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        res.status(200).json({
            results : ( categoria )?[ categoria ]: []
        })
    }

    const regex = new RegExp(termino,'i');
    const categorias = await Categoria.find({nombre:regex})

    res.status(200).json({
        results:(categorias)?[categorias]:[]
    })
}



//METODO DE BUSQUEDA GENERAL
const buscar = (req, res = response)=>{
    const{ coleccion ,termino} =req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son : ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios':    
            buscarUsuarios(termino,res)
        break;
        case 'categorias':
            buscarCategorias(termino,res)
        break;
        case 'productos':
            buscarProductos(termino, res)
        break;
        case 'roles':
        break;
    
        default:
            res.status(500).json({
                msg:'Se le olvido realizar esta busqueda'
            })
            break;
    }

}


module.exports = buscar