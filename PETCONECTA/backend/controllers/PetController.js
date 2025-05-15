const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController {

    //create a pet
    static async create(req,res){

        const{nome, idade, peso, cor} = req.body

        const image = req.files

        const available = true

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
            available,
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
}