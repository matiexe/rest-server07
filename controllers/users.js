//users.controller

const{ response } = require('express')


const usersGet = (req,res = response) =>{
    const params = req.query;
    res.json({
        msg:'get API - controller',
        params:params
    })

}
const usersPost = (req,res = response) =>{

    const body = req.body;

    res.json({
        msg:'post API - controller',
        bdoy
    })

}

const usersPut = (req,res = response) =>{
    const id = req.params.id;
    
    
    res.json({
        msg:'put API - controller',
        id:id
    })

}

const usersDelete = (req,res = response) =>{
    const id = req.params.id;
    res.json({
        msg:'delete API - controller',
        id:id
    })

}




module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}