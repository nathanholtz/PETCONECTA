const mongoose = require('../db/conn')
const {Schema} = mongoose

const Pet = mongoose.model(
    'Pet',
    new Schema({
        nome:{ 
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true
        },
        peso:{
            type: Number,
            required: true
        },
        cor:{
            type: String,
            required: true

        },
        imagem:{
            type:Array,
            required:true
        },  
        status:{
            Type: Boolean,
            required: true
        },
        User: Object,
        adopter: Object
    },
    {timestamps: true})
)

module.exports = Pet