const mongoose = require("mongoose")

const RolesSchema = new mongoose.Schema({
    rol : {
        type: String,
        required : [true, 'El rol es obligatorio'],
    }
})

let Roles =  mongoose.model("Role",RolesSchema)


module.exports = Roles;
