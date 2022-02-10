const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    nombre:{
        type: String,
        required: [true,'El nombre es olbligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true,
    },
    

})


module.exports = model('Categoria',CategoriaSchema);