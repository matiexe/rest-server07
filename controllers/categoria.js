const { response } = require("express");
const { Categoria } = require('../models');


// METODO DE CREACION  DE CATEGORIAS
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

//METODO DE OBTENCION DE CATEGORIAS CON PAGINADO Y RELACION DE USUARIO QUE LA CREO
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

//METODO DE OBTENCION DE CATEGORIA POR ID CON RELACION DE USUARIO QUE CREO LA CATEGORIA
const obtenerCategoria = async (req , res = response) =>{

    const {id} = req.params;
    const categoria = await Categoria.findById(id)
    .populate('usuario','nombre')

    

    res.status(201).json({
        categoria,
    })

}

//METODO DE ACTUALIZACION DE CATEGORIA POR ID
const actualizarCategoria = async (req , res = response) =>{

    const { id } = req.params;
    const {estado,usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    //console.log(data)
    const categoriaDB = await Categoria.findByIdAndUpdate(id,data,{new:true});
    res.status(201).json({
        msg: `Categoria ${id} modificada correctamente`,
        categoriaDB
    })
}

//METODO DE ELIMINACION DE CATEGORIA NO FISICA
const eliminarCategoria = async (req, res = response) =>{
    const {id} = req.params;
    const categoriaDB = await Categoria.findByIdAndUpdate(id,{estado:false})
    res.status(201).json({
        msg:`Categoria ${categoriaDB.nombre} eliminada correctamente`,
        categoriaDB
    })

}

module.exports ={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}