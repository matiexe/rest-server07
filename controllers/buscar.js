const { response } = require("express");



const buscar = (req, res = response)=>{

    const{ coleccion ,termino} =req.params
    res.json({
        msg : `busca algo`
    })

}


module.exports = buscar