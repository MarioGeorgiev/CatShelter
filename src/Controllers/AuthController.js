const authService = require('../services/authService')
const errorUtil = require('../lib/errorUtil')
exports.GetRegister =  (req,res)=>{
    res.render('register')
}
exports.PostRegiester = async(req,res) =>{
    const {username,password,rePass,phone,location} = req.body
    if (rePass !=  password){
        return res.render('register', {error : errorUtil.getErrorMessage(new Error('Different passwords'))})
    }
    const existingUser = await authService.getUserByUsername(username)
    if(existingUser){
        return res.render('register', {error : errorUtil.getErrorMessage(new Error('User already exists'))})
    }
    await authService.register(username,password,phone,location)
    res.redirect('/')

}

exports.GetLogin =  (req,res)=>{
    res.render('login')
}

exports.PostLogin = async (req,res)=>{
    const{username,password} = req.body
    try{

        const token = await authService.login(username,password)
        res.cookie('auth', token)
    }catch(error){
        return res.render('login', {error : errorUtil.getErrorMessage(error)})
    }
    res.redirect('/')
}

exports.GetLogout = async (req,res)=>{
    res.clearCookie('auth')
    res.redirect('/')
}

