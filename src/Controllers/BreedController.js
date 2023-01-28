const Breed = require('../models/Breed')

exports.GetAddBreed = (req, res) => {
  res.render('addBreed')
}

exports.PostAddBreed =async (req, res) => {
  const breed = new Breed({ name: req.body.breed });
  await breed.save();
  res.redirect('/')
}
