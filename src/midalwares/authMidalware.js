const jwt =  require('../lib/jswonwebtoken')
const secret  = 'ThisIsSecret'

exports.authentication = async(req,res,next) =>{
    const token = req.cookies['auth']
    if(token){
        try {
            const decondedToken = await jwt.verify(token,secret);
            req.user = decondedToken;
            req.isAuthenticated = true
            req.isAdmin = decondedToken.roles == "" ? false : true
            res.locals.username = decondedToken.user
            res.locals.isAdmin = decondedToken.roles == "" ? false : true
            res.locals.isAuthenticated = true           
        } catch (error) {
            console.log(error);
            res.clearCookie('auth')
            res.redirect('/')
        }
    }
    next();
}

exports.isAuthenticated = (req,res,next) =>{
    if(!req.isAuthenticated){
        return res.redirect('/login');
    }
    next()
}

exports.isAdmin = (req,res,next) =>{
    if(!req.isAdmin){
        return res.redirect('/login');
    }
    next()
}