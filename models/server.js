const express = require('express');
const cors = require('cors')
const routes = require('../routes/user');
const { dbConnection } = require('../database/db');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT 
        this.paths ={
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/users',
            buscar:'/api/buscar',
            uploads :'/api/uploads'
        }

        //Conexion base de datos
        this.conexionDB();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
        
        


    }
    async conexionDB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json())
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles :true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }))

    }
    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.categorias,require('../routes/categorias'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.usuarios,require('../routes/user'))
        this.app.use(this.paths.buscar,require('../routes/buscar'))
        this.app.use(this.paths.uploads,require('../routes/uploads'))

    
        
    }
    
    listener(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en puerto',this.port)
        })
    }


}

module.exports =Server