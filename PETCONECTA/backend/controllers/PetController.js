const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {

    //create a pet
    static async create(req,res){

        const{nome, idade, peso, cor} = req.body

        const image = req.files

        const disponivel = true

        //images upload

        //validation
        if(!nome){
            res.status(422).json({message:'Nome obrigatório!'})
            return
        }

        if(!peso){
            res.status(422).json({message:'Peso obrigatório!'})
            return
        }

        if(image.length === 0){
            res.status(422).json({message:'Adicione pelo menos 1 foto!'})
            return
        }

        //get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        //create a pet
        const pet = new Pet({
            nome,
            idade,
            peso, 
            cor,  
            disponivel,
            image:[],
            user:{
                _id:user._id,
                nome:user.nome,
                image:user.image,
                telefone:user.telefone,
            }
        })

        image.map((image) => {
            pet.image.push(image.filename)
        })

        try {

            const newPet = await pet.save()
            res.status(201).json({message:'Pet cadastrado com sucesso!', newPet})
            
        } catch (error) {
            res.status(500).json({message:error})
        }

    }

    //get all pets
    static async getAll(req,res){

        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({ pets: pets,
        })

    }

    //get user pets
    static async getAllUserPets(req,res){

        //get user token

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id':user._id}).sort('-createAt')

        res.status(200).json({
            pets
        })

    }

    //get user adoptions
    static async getAllUserAdoptions(req,res){

         //get user token

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'adopter._id':user._id}).sort('-createAt')

        res.status(200).json({
            pets
        })

    }

    //get pet by id
    static async getPetById(req,res){

        const id = req.params.id

        //check if id is valid

        if(!ObjectId.isValid(id)){

            res.status(422).json({message: 'ID inválido!'})
            return

        }

        //check if pet exists
        const pet = await Pet.findOne({_id:id})

        if(!pet){

            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        res.status(200).json({pet : pet})


    }

    //remove pet
    static async removePetById(req,res){

        const id = req.params.id

        if(!ObjectId.isValid(id)){

            res.status(422).json({message: 'ID inválido!'})
            return

        }

        //check if pet exists
        const pet = await Pet.findOne({_id:id})

        if(!pet){

            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        //check if logged in user registered the pet

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
             res.status(422).json({message: 'Houve um problema em processar sua  informação, tente novamente mais tarde!'})
            return
        }

        await Pet.findByIdAndDelete(id)

        res.status(200).json({message: 'Pet removido com sucesso'})

    }

    //update pet
    static async updatePet(req,res){

        const id = req.params.id

        const{nome, idade, peso, cor, available} = req.body

        const image = req.files

        const updatedData = {}

        //check if pet exists
        const pet = await Pet.findOne({_id:id})

        if(!pet){

            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        //check if logged in user registered the pet

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
             res.status(422).json({message: 'Houve um problema em processar sua  informação, tente novamente mais tarde!'})
            return
        }


         //validation
        if(!nome){
            res.status(422).json({message:'Nome obrigatório!'})
            return
        } else {
            updatedData.nome = nome
        }

        if(!peso){
            res.status(422).json({message:'Peso obrigatório!'})
            return
        } else { 
            updatedData.peso = peso
        }

        if(!idade){
            res.status(422).json({message:'Idade obrigatória!'})
            return
        } else { 
            updatedData.idade = idade
        }

        if(!cor){
            res.status(422).json({message:'Cor obrigatória!'})
            return
        } else { 
            updatedData.cor = cor
        }


        if(image.length === 0){
            res.status(422).json({message:'Adicione pelo menos 1 foto!'})
            return
        } else {
            updatedData.image = []
            image.map((image)=> {
                updatedData.image.push(image.filename)
            }) 
        }

        await Pet.findByIdAndUpdate(id,updatedData)

        res.status(200).json({message:'Pet atualizado com sucesso!'})
    }

    static async schedule(req,res){

        const id = req.params.id

        const pet = await Pet.findOne({_id:id})

        if(!pet){

            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        //check if user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)){
             res.status(422).json({message: 'Não pode agendar uma visita para o próprio pet!'})
            return
        }

        //check if the user has already scheduled a visit
        if(pet.adopter){
            if(pet.adopter._id.equals(user._id)){
                res.status(422).json({message: 'Você já agendou uma visita para este pet!'})
            }
            return
        }
        //add user to pet
        pet.adopter = {
            _id: user._id,
            nome: user.nome,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.nome} pelo telefone ${pet.user.telefone}`})

    }

    static async concludeAdoption(req,res){

        const id = req.params.id

        const pet = await Pet.findOne({_id:id})

        if(!pet){

            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        

        const token = getToken(req)
        const user = await getUserByToken(token)

        //check if logged in user registered the pet

        if(pet.user._id.toString() !== user._id.toString()){
             res.status(422).json({message: 'Houve um problema em processar sua  informação, tente novamente mais tarde!'})
            return
        }

        pet.disponivel = false

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({message: 'Parabéns! o ciclo de adoção foi finalizado com sucesso!'})
    }
}