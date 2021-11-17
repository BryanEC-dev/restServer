const mongoose = require('mongoose')

const Userschema =  new mongoose.Schema(
    { 
      name: {
          type : String,
          required : [true, 'El nombre es obligatorio']
      },
      email: {
        type : String,
        required : [true, 'El correo es obligatorio'],
        unique : true
        },
        password: {
            type : String,
            required : [true, 'El password es obligatorio'],
        },
        img : {
            type : String
        },
        rol:{
            type: String,
            required: true,
            enum: ['ADMIN_ROLE', 'USER_ROLE']
        },
        status: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        }
    

    });

Userschema.methods.toJSON = function() {
    const {__v, password, ...users} = this.toObject()
    return users
}

let Users =  mongoose.model('User',Userschema)
module.exports =Users;