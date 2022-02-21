const {path} = require('path')
const fs = require('fs')
const { response } = require("express");
const { model } = require("mongoose");
const { subirArchivos } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargaDeArchivo = async (req , res = response)=>{


    try {

        const nombre = await subirArchivos(req.files,['png','jpg'],'imagenes')
        res.json({nombre})
        
    } catch (msg) {
        res.status(400).json({msg});
    }
    
}

const actualizarArchivo = async(req, res = response)=>{

    const{id, coleccion}= req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un usuario con el id ${id}`
                })
            }
        
        break;
        case 'producto':
            modelo = Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un producto con el id ${id}`
                })
            }
        
        break;
    
        default:
            return res.status(500).json({msg:'se me olvido validar esto'});
    }

    // Limpiar imagenes previas

    try {
        if(model.img){
            const pathImagen =  path.join( __dirname,'../uploads,',coleccion,model.img);
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen)
            }
        }
    } catch (error) {
        console.log(error)
    }
    try {
        const nombre = await subirArchivos(req.files,undefined,coleccion);
        modelo.img =  nombre;
        await modelo.save()
        res.json({modelo})
    } catch (error) {
        res.status(500).json({error})
    }
    
}

const mostrarImagen = async(req, res = response) =>{
    
    const{id, coleccion}= req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un usuario con el id ${id}`
                })
            }
        
        break;
        case 'producto':
            modelo = Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un producto con el id ${id}`
                })
            }
        
        break;
    
        default:
            return res.status(500).json({msg:'se me olvido validar esto'});
    }

    // Limpiar imagenes previas

    try {
        if(model.img){
            const pathImagen =  path.join( __dirname,'../uploads,',coleccion,model.img);
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen)
            }
        }
    } catch (error) {
        console.log(error)
    }
    res.sendFile(__dirname,'../assets/no-image.jpg');
}

module.exports={
    cargaDeArchivo,
    actualizarArchivo,
    mostrarImagen
}