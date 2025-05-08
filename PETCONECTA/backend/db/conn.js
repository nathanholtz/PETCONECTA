const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

async function main(){
   
    await mongoose.connect(process.env.MONGO_URI, { family: 4 })
    console.log('conectado')
}

main().catch((err) => console.log(err))


module.exports = mongoose