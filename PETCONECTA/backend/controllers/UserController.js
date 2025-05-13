const createUsertoken = require('../helpers/create-user-token')
const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = class UserController{
    static async register(req,res) {

        const {nome, email, senha, telefone, confirmasenha} = req.body

        //validations
        if(!nome){
            res.status(422).json({message: 'O nome é obrigatório!'})
            return
        }

        if(!email){
            res.status(422).json({message: 'O email é obrigatório!'})
            return
        }

        if(!senha){
            res.status(422).json({message: 'A senha é obrigatória!'})
            return
        }

        if(!confirmasenha){
            res.status(422).json({message: 'A confirmação da senha é obrigatória!'})
            return
        }

        if(senha !== confirmasenha){
            res.status(422).json({message: 'A senha e a confirmação precisam ser iguais'})
            return
        }

        //check if user exists
        const userExists = await User.findOne({email : email})

        if (userExists){
              res.status(422).json({message: 'Email já está em uso!'})
            return
        }
        
        //create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha, salt)

        //create a user
        const user = new User({
            nome: nome,
            email: email,
            telefone: telefone,
            senha: passwordHash,
        })

        try {
        
            const newUser = await user.save()  

            await createUsertoken(newUser, req, res)

        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}