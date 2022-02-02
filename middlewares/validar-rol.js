const { response } = require("express");


const esAdminRol = (req,res= response , next)=>{

    if(!req.usuario){
        return req.status(500).json({
            msg :'Se quiere verificar el rol sin verificar el token'
        })
    }
    const {rol, nombre } = req.usuario

    if(rol!= 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador , no se puede realizar la accion`
        })
    }
    next();
}
const tieneRol =(...roles) =>{
    return (req,res=response ,next)=>{
        if(!roles.includes(req.usuario.rol)){
            return res.status(401),json({
                msg:'El rol de su usuario no puede acceder a la funcion'
            })
        }
        next();
    }
}

module.exports ={

    esAdminRol,
    tieneRol
}