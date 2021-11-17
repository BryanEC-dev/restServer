const Role = require ('../models/role')
const User = require ('../models/usuario')


const isValidRol = async(rol = '') => {
    const existRol = await Role.findOne({"name":rol});
    console.log(rol,existRol)
    if(!existRol){
        throw new Error(`El rol ${rol} no se encuentra configurado`)
    }
}

const checkEmail = async(email = '') => {
    const existEmail = await User.findOne({email})
    if(existEmail){
        throw new Error(`El email ${email} ya se encuentra registrado`)
    }
} 

const existsId = async(id) => {
    const exists = await User.findById(id)
    console.log(exists)
    if(!exists){
        throw new Error(`No existe el usuario que desea actualizar`)
    }
} 


module.exports = {
    isValidRol,
    checkEmail,
    existsId,
}