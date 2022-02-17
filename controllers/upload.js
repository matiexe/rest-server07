const path = require('path')
const { v4: uuidv4 } = require('uuid');
uuidv4();
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
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length-1];
    const extensionesValidaz =[
        'jpg',
        'png',
        'gif',
        'jpeg'
    ]
    if(extensionesValidaz.includes(extension)){
        res.status(400).json({
            msg :`La exstension ${extension} no es permitida`
        })
    }

    const nombreTemp = uuidv4() + '.'+ extension;
    uploadPath = path.join(__dirname ,'../uploads/', nombreTemp);

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