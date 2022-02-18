
const { response } = require("express");
const { subirArchivos } = require("../helpers");

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

module.exports={
    cargaDeArchivo
}