const path = require('path')
const { v4: uuidv4 } = require('uuid');
uuidv4();

const subirArchivos = (files,extensionesValidaz =['jpg','png','gif','jpeg'],carpeta =' ') =>{

    return new Promise((reject,resolve)=>{
        
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1];
        console.log(extensionesValidaz,extension)
        if(!extensionesValidaz.includes(extension)){

            return reject(`La exstension ${extension} no es permitida`);
        
        }

        const nombreTemp = uuidv4() + '.'+ extension;
        uploadPath = path.join(__dirname ,'../uploads/',carpeta, nombreTemp);

        archivo.mv(uploadPath,(err)=>{
            if(err){
                reject(err)
            }

            resolve(nombreTemp)
        })
    })
    
}

module.exports={
    subirArchivos
}