const mongoose = require('mongoose')
function getMongooseError(error){
    return Object.keys(error.errors).map(key => error.errors[key].message)
}
exports.getErrorMessage = (error) =>{
    let message = ""
    console.log(error)
    if(error instanceof TypeError){
        if(error.message == "Cannot destructure property 'upload' of 'req.files' as it is null."){
            message = "Picture is required"
        }
    }else if(error instanceof mongoose.Error){
        message = getMongooseError(error)
    }else if(error instanceof Error){
        if(error.message == "connect ECONNREFUSED 127.0.0.1:25"){
            message = "Cat can't be shelter now. Please try again later or contact the admin at admin@admin.com"
        }
    }
    else{
        return error.message
    }

    return message
}