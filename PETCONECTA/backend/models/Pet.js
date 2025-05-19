const mongoose = require('../db/conn')
const {Schema} = mongoose

const Pet = mongoose.model(
    'Pet',
    new Schema({
        nome:{ 
            type: String,
            required: true
        },
        idade:{
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
        image:{
            type:Array,
            required:true
        },  
        disponivel:{
            type: Boolean,
            //required: true
        },
        user: Object,
        adopter: Object
    },
    {timestamps: true})
)

module.exports = Pet