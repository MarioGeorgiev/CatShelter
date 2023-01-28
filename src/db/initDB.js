const mongoose = require('mongoose')

async function DBinit(){
    await mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/CatShelter')
    console.log('DB is connected')
}

module.exports = DBinit