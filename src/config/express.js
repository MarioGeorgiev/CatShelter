const path = require('path')
const handlebars=  require('express-handlebars')
const fileUpload =  require('express-fileUpload')
const express = require('express')
const authMidalware = require('../midalwares/authMidalware')
const cookieParser = require('cookie-parser')
//const router = require('./routes')
module.exports = (app) =>{
    app.engine('hbs', handlebars.engine({
        extname: "hbs"
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
    app.use(cookieParser())
    app.use('/content', express.static(path.join(__dirname, '../content')))
    app.use('/pics', express.static(path.join(__dirname, '../pics')))
    
    app.use(express.urlencoded({extended : false}))
    app.use(authMidalware.authentication)
    app.use(fileUpload())
   // app.use(router)
}