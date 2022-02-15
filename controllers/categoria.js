const { response } = require("express");
const { Categoria } = require('../models');


//obtener categorias - paginado - total - populate

const obtenerCategorias = async (req,res = response)=>{

    //paginado
    const {limite =5 ,desde =0} = req.query;
    const query = {estado : true}
    // Consulta a la base que trae todas las categorias con estado true
    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario','nombre')
        .skip(Number(desde))
        //.skip(Number(limite))
    ])
    res.json({
        total,
        categorias
    })
}

//Obtener categoria - populate

const obtenerCategoria = async (req , res = response) =>{

    const {id} = req.params;
    const categoria = await Categoria.findById(id)
    .populate('usuario','nombre')

    

    res.status(201).json({
        categoria,
    })

}

//Actualizar Categoria

//borrar categoria - cambia estado a false

const crearCategoria = async (req, res = response) =>{

    const nombre =req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre},ya existe`
        });
    }


    // Generar datos a guardar
    const data ={
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria( data );
    await categoria.save();

    res.status(201).json(categoria)

}



module.exports ={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria
}