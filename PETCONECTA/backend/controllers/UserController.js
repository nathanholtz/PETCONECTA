const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUsertoken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


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

    static async login(req,res){

        const {email,senha} = req.body

        if(!email){
            res.status(422).json({message: 'O email é obrigatório!'})
            return
        }

        if(!senha){
            res.status(422).json({message: 'A senha é obrigatória!'})
            return
        }

        const user = await User.findOne({email : email})

        if (!user){
              res.status(422).json({message: 'Não há usuário cadastrado com este e-mail!'})
            return
        }

        // check if password match

        const checkPassword = await bcrypt.compare(senha, user.senha)

        if (!checkPassword){
              res.status(422).json({message: 'Senha inválida!'})
            return
        }

        await createUsertoken(user, req, res)

    }

    static async checkUser(req,res){

        let currentUser

        if(req.headers.authorization){

            const token = getToken(req)

            const decoded = jwt.verify(token, 'nossosecret')

            currentUser =  await User.findById(decoded.id)

            currentUser.senha = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req,res){

        const id = req.params.id

        const user = await User.findById(id).select('-senha')

        if (!user){
              res.status(422).json({message: 'Usuário não encontrado!'})
            return
        }

        res.status(200).json({user})

    }

    static async editUser(req,res){
        
       const id = req.params.id

       const {nome, email, telefone, senha, confirmasenha} = req.body

        //check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(req.file){
            user.image = req.file.filename
        }

        //validations 
               
        if(!nome){
            res.status(422).json({message: 'O nome é obrigatório!'})
            return
        }

        user.nome = nome

        if(!email){
            res.status(422).json({message: 'O email é obrigatório!'})
            return
        }

        const userExists= await User.findOne({email : email})

        // check if email has already taken
       if(user.email !== email && userExists){

        res.status(422).json({message: 'Por favor, utilize outro email!'})
        return

       }

       user.email = email

       if(senha != confirmasenha){
         res.status(422).json({message: 'As senhas não são iguais!'})
        return
       }else if(senha === confirmasenha && senha != null){

        //creating password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha, salt)

        user.senha = passwordHash
       }
       
       
       try {

        //returns user updated data
        const updateUser = await User.findOneAndUpdate({_id:user._id},
         { $set: user} ,
         {new: true}, 
        )

        res.status(200).json({message:'Usuário atualizado com sucesso!'})
       } catch (error) {

        res.status(500).json({message: err})
        return
        
       }


    }
}