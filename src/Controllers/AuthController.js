const Cat = require('../models/User')

exports.GetRegister =  (req,res)=>{
    res.render('register')
}

exports.GetLogin =  (req,res)=>{
    res.render('login')
}