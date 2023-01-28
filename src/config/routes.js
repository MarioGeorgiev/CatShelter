const HomeControler = require('../Controllers/HomeControler')
const BreedController = require('../Controllers/BreedController')
const CatController = require('../Controllers/CatController')
module.exports = (app)=>{
app.get('/',HomeControler.IndexPage)

app.get('/cats/add-breed',BreedController.GetAddBreed)
app.post('/cats/add-breed',BreedController.PostAddBreed)

app.get('/cats/add-cat', CatController.GetAddCat)
app.get('/edit/:catId', CatController.GetEditCat)
app.get('/shelter/:catId', CatController.ShelterCat)

app.post('/cats/add-cat', CatController.PostAddCat)
app.post('/edit/:catId',CatController.PostEditCat)

app.get('/shelter/delete/:catId',CatController.DeleteCat)
}