const mongoose = require('../db/conn')
const {Schema} = mongoose

const Pet = mongoose.model(
    'Pet',
    new Schema({
        nome: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
  },
  idade: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  peso: {
    type: Number,
    required: true
  },
  cor: {
    type: String,
    required: true
  },
  porte: {
    type: String,
    enum: ['P', 'M', 'G'],
    default: 'M'
  },
  genero: {
    type: String,
    enum: ['Macho', 'Fêmea'],
    default: 'Macho'
  },
  cuidados: {
    type: String,
  },
  descricao: {
    type: String,
  },
  image: {
    type: Array,
    required: true
  },
  user: Object,
  adopter: Object
    },
    {timestamps: true})
)

module.exports = Pet