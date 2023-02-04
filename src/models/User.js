const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username :{
        type: String,
        required : true,
    },
    password :{
        type : String,
        required: true
    },
    phone :{
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    roles :{
        type : String
    }
})

const User = mongoose.model('Users', UserSchema)

module.exports = User