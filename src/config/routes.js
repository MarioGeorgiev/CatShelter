const router = require('express').Router();
const HomeControler = require('../Controllers/HomeControler')
const BreedController = require('../Controllers/BreedController')
const CatController = require('../Controllers/CatController')
const AuthController = require('../Controllers/AuthController.js')
const authMidaware = require('../midalwares/authMidalware')

router.get('/',HomeControler.indexPage)

router.get('/cats/add-breed',authMidaware.isAdmin,BreedController.GetAddBreed)
router.post('/cats/add-breed',authMidaware.isAdmin,BreedController.PostAddBreed)

router.get('/cats/add-cat',authMidaware.isAdmin, CatController.GetAddCat)
router.get('/edit/:catId',authMidaware.isAdmin, CatController.GetEditCat)

router.get('/shelter/:catId',authMidaware.isAuthenticated, CatController.ShelterCat)
router.post('/shelter/:catId',authMidaware.isAuthenticated,CatController.ShelterCatPost)

router.post('/cats/add-cat',authMidaware.isAdmin, CatController.PostAddCat)
router.post('/edit/:catId',authMidaware.isAdmin,CatController.PostEditCat)

router.get('/adopted',authMidaware.isAuthenticated, HomeControler.adoptionPage)

router.get('/logout', AuthController.GetLogout)

router.get('/register', AuthController.GetRegister)
router.post('/register', AuthController.PostRegiester)

router.get('/login', AuthController.GetLogin)
router.post('/login', AuthController.PostLogin)
//}

module.exports = router