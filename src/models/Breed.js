const mongoose = require('mongoose')

const BreedSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    }
})

const Breed  = mongoose.model('Breed', BreedSchema);

module.exports = Breed