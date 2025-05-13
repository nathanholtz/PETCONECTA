const jwt = require('jsonwebtoken')
const User = require('../models/User')

const createUsertoken = async (user, req, res) => {

    //create token
    const token = jwt.sign({
        nome: user.nome,
        id: user._id,
    //necessario usar alguma string complexa
    },"nossosecret")

    //return token
    res.status(200).json({message: 'Você está autenticado',
        token: token,
        userId: user._id
    })

}

module.exports = createUsertoken