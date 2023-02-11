const mongoose = require('mongoose')

const BreedSchema = mongoose.Schema({
    name :{
        type : String,
        required : [true, "Breed is required"]
    }
})

const Breed  = mongoose.model('Breed', BreedSchema);

module.exports = Breed