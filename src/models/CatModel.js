const mongoose = require('mongoose')

const CatSchema = mongoose.Schema({
    name :{
        type : String,
        required: true
    },
    img:{
        type : String
    },
    description: {
        type : String,
        required: true
    },
    breed:{
        type : mongoose.Types.ObjectId,
        ref : 'Breed'
    },
    isForAdoption:{
        type: Boolean,
        default: false
    },
    isAdopted:{
        type : Boolean,
        default: false
    }


})

const Cat = mongoose.model('Cat', CatSchema)

module.exports = Cat;