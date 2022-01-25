const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParseer:true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexion de la base de datos')
    }

}

module.exports ={

    dbConnection
}