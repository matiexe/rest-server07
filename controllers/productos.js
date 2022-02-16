const { response } = require("express");
const { Producto } = require("../models");

//METODO DE CREACION DE PRODUCTOS
const crearProductos = async(req,res = response)=>{

    const {estado,usuario,...body} = req.body
    const nombre = req.body.nombre
    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg:`el producto ${productoDb.nombre} ya existe`
        })
    }
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const producto = await new Producto(data);
    await producto.save();

    res.status(201).json({producto})
}

//METODO DE CONSULTA DE TODOS LOS PRODUCTOS
const obtenerProductos = async (req,res = response)=>{

    //PAGINADO
    const{limite = 5 ,desde =0} = req.query;
    const query =  {estado:true};

    const[total,productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario','nombre')
        .skip(Number(desde))
        //.skip(Number(limite))
    ])
    res.status(201).json({
        total,
        productos
    })

}

//METODO DE CONSULTA DE PROUDCTO POR ID
const obtenerProducto = async (req,res = response)=>{

    const { id }  = req.params
    const producto = await Producto.findById(id)
    .populate('usuario','nombre')

    res.status(201).json({
        producto
    })

}

//METODO DE ACTUALIZACION DE PRODUCTO
const actualizarProducto = async (req, res = response) =>{

    const { id } = req.params
    const  data  = req.body

    const producto = await Producto.findByIdAndUpdate(id,data)

    res.status(201).json({
        msg:`el producto con ${ id } ha sido modificado`
    })
}

//METODO DE ELIMINACION DE PRODUCTO
const eliminarProducto = async (req, res = response) =>{

    const { id } = req.params
    
    const producto = await Producto.findByIdAndUpdate(id,{estado:false})

    res.status(201).json({

        msg: `El Producto ${producto.nombre} ha sido elimnado correctamente`

    })
}


module.exports = {

    crearProductos,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}
