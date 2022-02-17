const path = require('path')

const { response } = require("express");

const cargaDeArchivo = (req , res = response)=>{


    if(!req.files || Object.keys(req.files).length === 0){
        res.status(400).json({msg:'No hay archivos para subir'});
        return;
    }
    if(!req.files.archivo || Object.keys(req.files).length === 0){
        res.status(400).json({msg:'No hay archivos para subir'});
        return;
    }


    const { archivo } = req.files;

    uploadPath = path.join(__dirname ,'../uploads/', archivo.name);

    archivo.mv(uploadPath,(err)=>{
        if(err){
            return res.status(500).json(err);
        }

        res.json({msg:'Archivo cargado en' + uploadPath})
    })

}

module.exports={
    cargaDeArchivo
}