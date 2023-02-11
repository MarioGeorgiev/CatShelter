const Cat = require('../models/CatModel')
const Breed = require('../models/Breed')
const User = require('../models/User')
const mail = require('../services/mailService')
const errorUtil = require('../lib/errorUtil')
const fs = require('fs');
exports.GetAddCat = async (req, res) => {
    let breeds = await Breed.find().lean();

    res.render('addCat', { breeds })
}
exports.PostAddCat = async (req, res) => {
    try {
        const { upload } = req.files;
        const { name, description, breed } = req.body
        if (!upload) return res.sendStatus(400);
        upload.mv(__dirname + '/../pics/' + upload.name);
        let img = ('/pics/' + upload.name).toString();
        let cat = new Cat({ name, description, breed, img })
        await cat.save();
    } catch (error) {
        let breeds = await Breed.find().lean();
        console.log(error)
        return res.render('addCat', { error: errorUtil.getErrorMessage(error), breeds: breeds })
    }

    res.redirect('/')
}

exports.GetEditCat = async (req, res) => {
    let catView = await Cat.findById(req.params.catId).lean()
    let breedsView = await Breed.find().lean()
    res.render('editCat', { cat: catView, breeds: breedsView })
}
exports.PostEditCat = async (req, res) => {
    try {
        const catToEdit = await Cat.findById(req.params.catId);
        catToEdit.name = req.body.name;
        catToEdit.description = req.body.description;
        catToEdit.breed = await Breed.findById(req.body.breed);
        catToEdit.save()
    } catch (error) {
        let breeds = await Breed.find().lean()
        return res.render('editCat', { error: errorUtil.getErrorMessage(error), breeds: breeds })
    }
    res.redirect('/')
}

exports.ShelterCat = async (req, res) => {

    let catView = await Cat.findById(req.params.catId).lean()
    res.render('catShelter', { cat: catView })

}

exports.ShelterCatPost = async (req, res) => {
    try {
        const user = await User.findOne({ username: res.locals.username }).lean()
        let catShelter = await Cat.findById(req.params.catId)
        catShelter.isForAdoption = true
        await mail.sendMail(user)
        catShelter.save();
    }catch(error){

        return res.render('index', { error: errorUtil.getErrorMessage(error) })
    }
    res.redirect('/')
}

exports.AdoptedCatGet = async (req, res) => {
    let catShelter = await Cat.findById(req.params.catId)
    catShelter.isAdopted = true
    catShelter.save();
    res.redirect('/adopted')
}
exports.BackedCatGet = async (req, res) => {
    let catShelter = await Cat.findById(req.params.catId)
    catShelter.isAdopted = false
    catShelter.save();
    res.redirect('/adopted')
}
exports.ReturnedCatGet = async (req, res) => {
    let catShelter = await Cat.findById(req.params.catId)
    catShelter.isForAdoption = false
    catShelter.save();
    res.redirect('/')
}