const { response, request } = require('express');
const User = require('../models/usuario.js')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')



const mongoose = require('mongoose')
const RedirectionAuth = require('./prueba')
const { default: axios } = require("axios");

const usuariosGet = async (req = request, res = response) => {

    const { limit, from } = req.query;

    /* const users = await User.find()
        .skip(Number(from))
        .limit(Number(limit))
    
    const totalUsers = await User.countDocuments() */

    /* Para que las dos peticiones se hagan al mismo tiempo */
    const [users, totalUsers] = await Promise.all([
            User.find({"status": true})
                .skip(Number(from))
                .limit(Number(limit)),
            User.countDocuments({"status": true})
    ])
   
    res.json({
        limit,
        from,
        total : totalUsers,
        users: users,
    });
}

const usuariosPost = async (req, res) => {


    try {

        const {name, email, password,img, rol} = req.body;    
        const user = new User({name, email, password,img, rol})

         //encriptar la contraseña
        let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            msg: user
        });
    }catch(error){
        console.log(error)
    }
       


    }

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const {email, rol, password, ...moreInfo} = req.body

    //encriptar la contraseña
    let salt = bcrypt.genSaltSync(10);
    moreInfo.password = bcrypt.hashSync(password, salt);

    const usuario = await User.findByIdAndUpdate(id,moreInfo)

    res.json({
        msg: usuario,
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await User.findByIdAndUpdate(id,{"status": false})

    res.json({
        msg: usuario,
        id
    });
   
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}