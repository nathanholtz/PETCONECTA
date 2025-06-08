const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
  'User',
  new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    image: { type: String },
    telefone: { type: String, required: true },
    endereco: { type: String, required: true },
    complemento: { type: String },
    tipo: { type: String, required: true },
    cidade: { type: String},
    cep: { type: String, required: true },
    uf: { type: String},
  }, { timestamps: true })
);

module.exports = User;
