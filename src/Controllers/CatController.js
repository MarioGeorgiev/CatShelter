const Cat = require('../models/CatModel')
const Breed = require('../models/Breed')
const User = require('../models/User')
const mail = require('../services/mailService')

const fs = require('fs');
exports.GetAddCat = async (req, res) => {
    let breeds = await Breed.find().lean();

    res.render('addCat', { breeds })
}
exports.PostAddCat = async (req, res) => {

    const { upload } = req.files;
    const { name, description, breed } = req.body
    if (!upload) return res.sendStatus(400);
    upload.mv(__dirname + '/../pics/' + upload.name);
    console.log(req.body)
    let img = ('/pics/' + upload.name).toString();
    let cat = new Cat({ name, description, breed, img })

    await cat.save();
    res.redirect('/')
}

exports.GetEditCat = async (req, res) => {
    let catView = await Cat.findById(req.params.catId).lean()
    let breedsView = await Breed.find().lean()
    res.render('editCat', { cat: catView, breeds: breedsView })
}
exports.PostEditCat = async (req, res) => {
    const catToEdit = await Cat.findById(req.params.catId);
    catToEdit.name = req.body.name;
    catToEdit.description = req.body.description;
    catToEdit.breed = await Breed.findById(req.body.breed);
    catToEdit.save()
    res.redirect('/')
}

exports.ShelterCat = async (req, res) => {
    
    let catView = await Cat.findById(req.params.catId).lean()
    res.render('catShelter', { cat: catView })

}

exports.ShelterCatPost = async (req, res) => {
    const user = await User.findOne({username : res.locals.username}).lean()
    console.log(user)
    let catShelter = await Cat.findById(req.params.catId)
    catShelter.isForAdoption = true
    mail.sendMail(user)
    catShelter.save();
    res.redirect('/')
}
