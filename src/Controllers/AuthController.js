const Cat = require('../models/User')
const authService = require('../services/authService')
exports.GetRegister =  (req,res)=>{
    res.render('register')
}
exports.PostRegiester = async(req,res) =>{
    const {username,password,rePass,phone,location} = req.body
    if (rePass !=  password){
        console.log('Different passwords');
        return res.redirect('/register')
    }
    const existingUser = await authService.getUserByUsername(username)
    if(existingUser){
        console.log('User already exists');
        return res.redirect('/register')
    }
    await authService.register(username,password,phone,location)
    res.redirect('/')

}

exports.GetLogin =  (req,res)=>{
    res.render('login')
}

exports.PostLogin = async (req,res)=>{
    const{username,password} = req.body
    const token = await authService.login(username,password)
    res.cookie('auth', token)
    res.redirect('/')
}