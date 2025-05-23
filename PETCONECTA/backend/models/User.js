const mongoose = require('../db/conn')
const {Schema} = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        nome:{ 
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        senha:{
            type: String,
            required: true
        },
        image:{
            type:String,
        },
        telefone:{
            type:String,
            required:true
        },  
    },{timestamps: true})
)

module.exports = User