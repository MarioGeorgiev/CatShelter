const User = require('../')
const bcrypt = require('bcrypt')
const jwt =  require('../lib/jswonwebtoken')
const secret  = 'ThisIsSecret'


exports.getUserByUsername = (username) => User.findOne({username})

exports.register = async (username,password,phone,location) =>{
    let hashPassword = await bcrypt.hash(password,10)
    const userRegister = new User({username,password : hashPassword,phone,location})
    const user = await userRegister.save();
    return user;
}
/*
exports.login = async (username,password) => {
        const user = await this.getUserByUsername(username)
        const isValidPassword =await bcrypt.compare(password,user.password)
        if(!user || !isValidPassword){
            
            throw 'No such username or password'
        }

        const payload = {_id: user._id,user : user.username}
        const token = await jwt.sign(payload,secret,{expiresIn:'1h'})

        return token

        
}*/