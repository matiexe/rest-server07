const express = require('express');
const cors = require('cors')
const routes = require('../routes/user');
const { dbConnection } = require('../database/db');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT 
        this.paths ={
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/users'
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

    }
    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.categorias,require('../routes/categorias'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.usuarios,require('../routes/user'))
    
        
    }
    
    listener(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en puerto',this.port)
        })
    }


}

module.exports =Server