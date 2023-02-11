const mongoose = require('mongoose')

const CatSchema = mongoose.Schema({
    name :{
        type : String,
        required: [true, "Name is required"]
    },
    img:{
        type : String
    },
    description: {
        type : String,
        required: [true,"Description is required"]
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