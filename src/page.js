const catsDb = require('./db/cat.json')
const fs = require('fs');
const breedsDb = require('./db/breeds.json')

function IndexPage(req,res){
  let cats = catsDb;
  console.log()
  if(req.query.search){
    
    cats = catsDb.filter(c => c.name.toLowerCase() ==req.query.search.toLowerCase()|| c.breed.toLowerCase() ==req.query.search.toLowerCase() ||c.description.toLowerCase().includes(req.query.search.toLowerCase()))
     console.log(cats)
  }

  res.render('index',{cats : cats})
}
function GetAddBreed(req,res) {
    res.render('addBreed')
}
function GetAddCat(req,res) {
  res.render('addCat',{breeds : breedsDb})
}
function PostAddCat(req,res) {

    const { upload } = req.files;
    const {name, description, breed } = req.body
    if (!upload) return res.sendStatus(400);
    upload.mv(__dirname + '/pics/' + upload.name);    
    console.log(req.body)
    let id = (Number(catsDb[catsDb.length - 1].id) + 1).toString();
    let img = ('/pics/' + upload.name).toString();
    let catToAdd ={id,name, description, breed,img}

    catsDb.push(catToAdd)
  fs.writeFile('./src/db/cat.json', JSON.stringify(catsDb,null,2), err => {
    if (err) {
      console.log(err);
      return;
    }
  });
  res.redirect('/')
}

function PostAddBreed(req,res) {
  console.log(req.body)
  const {breed} = req.body

  let id = (Number(breedsDb[breedsDb.length - 1]== undefined ? '1' : breedsDb[breedsDb.length - 1].id) + 1).toString();
  const breedToAdd = {id, breed}
  breedsDb.push(breedToAdd)
  fs.writeFile('./src/db/breeds.json', JSON.stringify(breedsDb,null,2), err => {
    if (err) {
      console.log(err);
      return;
    }
  });
  res.redirect('/')
}

function GetEditCat(req,res) {
  let catView =catsDb.find(cat =>cat.id == req.params.catId) 
   res.render('editCat', {cat :catView, breeds : breedsDb})
}

function PostEditCat(req, res) {
  let catToEdit = catsDb.find(cat =>cat.id == req.params.catId);
  catToEdit.name = req.body.name;
  catToEdit.description = req.body.description;
  catToEdit.breed =breedsDb.find(breed =>breed.id ==  req.body.breed).breed;  
  catsDb.splice(catsDb.findIndex(cats => cats.id == req.params.catId), 1, catToEdit)

  fs.writeFile('./src/db/cat.json', JSON.stringify(catsDb,null,2), err => {
    if (err) {
      console.log(err);
      return;
    }
  });

  res.redirect('/')
}

function ShelterCat(req,res){
  console.log(req.params.catId)
  let catView =catsDb.find(cat =>cat.id == req.params.catId)
  console.log(catView)
  res.render('catShelter',{cat : catView})

}

function DeleteCat(req,res) {
    console.log(req.params.catId)
   catsDb.splice(catsDb.findIndex(cats => cats.id == req.params.catId), 1)

  fs.writeFile('./src/db/cat.json', JSON.stringify(catsDb,null,2), err => {
    if (err) {
      console.log(err);
      return;
    }
  });
  res.redirect('/')
}


module.exports = {

  IndexPage,
  GetAddBreed,
  GetAddCat,
  PostAddCat,
  PostAddBreed,
  GetEditCat,
  PostEditCat,
  ShelterCat,
  DeleteCat
}
