
const { response } = require("express");
const { subirArchivos } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargaDeArchivo = async (req , res = response)=>{


    if(!req.files || Object.keys(req.files).length === 0){
        res.status(400).json({msg:'No hay archivos para subir'});
        return;
    }
    if(!req.files.archivo || Object.keys(req.files).length === 0){
        res.status(400).json({msg:'No hay archivos para subir'});
        return;
    }

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

    const nombre = await subirArchivos(req.files,undefined,coleccion);
    modelo.img =  nombre;
    await modelo.save()
    res.json({modelo})
}
module.exports={
    cargaDeArchivo,
    actualizarArchivo
}