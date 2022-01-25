const express = require('express');
const cors = require('cors')
const routes = require('../routes/user');
const { dbConnection } = require('../database/db');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT 
        this.userPath = 'api/users' 

        //Conexion base de datos
        this.conexionDB();

        //rutas
        this.routes();
        
        //middlewares
        this.middlewares();


    }
    async conexionDB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.static('public'));

    }
    routes(){
        this.app.use('/api/users',require('../routes/user'))
    }
    
    listener(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en puerto',this.port)
        })
    }


}

module.exports =Server