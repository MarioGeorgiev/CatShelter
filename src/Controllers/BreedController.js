const Breed = require('../models/Breed')
const errorUtil = require('../lib/errorUtil')
exports.GetAddBreed = (req, res) => {
  res.render('addBreed')
}

exports.PostAddBreed =async (req, res) => {
  try{
    const breed = new Breed({ name: req.body.breed });
    await breed.save();

  }catch(error){
    return res.render('addBreed', { error: errorUtil.getErrorMessage(error)})
  }
  res.redirect('/')
}
