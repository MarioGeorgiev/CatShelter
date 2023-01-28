const Cat = require('../models/CatModel')
const fs = require('fs');
exports.IndexPage = async (req,res)=>{
    let cats = await Cat.find().populate('breed').lean()


    /*if(req.query.search){
      
      cats = catsDb.filter(c => c.name.toLowerCase() ==req.query.search.toLowerCase()|| c.breed.toLowerCase() ==req.query.search.toLowerCase() ||c.description.toLowerCase().includes(req.query.search.toLowerCase()))
       console.log(cats)
    }*/
  
    res.render('index',{cats : cats})
  }